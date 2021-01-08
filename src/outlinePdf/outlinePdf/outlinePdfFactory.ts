import type {
    PDFDict as _PDFDict,
    PDFName as _PDFName,
    PDFNumber as _PDFNumber,
    PDFRef as _PDFRef,
    PDFArray as _PDFArray,
    PDFNull as _PDFNull,
    PDFDocument as _PDFDocument,
    PDFPageLeaf as _PDFPageLeaf,
    PDFHexString as _PDFHexString,
} from "pdf-lib";
import { createOutlineDictFactory } from "../createOutlineDictFactory";
import { createOutlineNodeFactory } from "../createOutlineNodeFactory";
import { getPageRefsFactory } from "../getPageRefsFactory";

import { pseudoOutline } from "../../pseudoOutline/pseudoOutline";
import { printedToOutline } from "../printedToOutline";

export type IOutlinePdf = {
    _pdfDocument?: _PDFDocument;
    _outline?: string;
    /**
     * @description Returns the loaded pdf.
     */
    savePdf: _PDFDocument["save"];
    /**
     * @description Loads the provided pdf.
     */
    loadPdf: typeof _PDFDocument["load"];
    /**
     * @description A string representation of the outline.
     * @example
     * // first column  : page number
     * //                 negative for collapsing outline
     * // second column : outline depth
     * // third column  : outline title
     * `
     * 	  1||some title
     * 	 12|-|some title
     * 	-30|--|some title
     * 	 34|---|some title
     * 	 35|---|some title
     * 	 60|--|some title
     * 	 67|-|some title
     * 	 80||some title
     * `
     */
    outline: string;
    /**
     * @description Adds the outline to the loaded pdf.
     */
    applyOutlineToPdf(): void;
};

export function outlinePdfFactory(_: {
    PDFDict: typeof _PDFDict;
    PDFName: typeof _PDFName;
    PDFNumber: typeof _PDFNumber;
    PDFRef: typeof _PDFRef;
    PDFArray: typeof _PDFArray;
    PDFNull: typeof _PDFNull;
    PDFDocument: typeof _PDFDocument;
    PDFPageLeaf: typeof _PDFPageLeaf;
    PDFHexString: typeof _PDFHexString;
}): IOutlinePdf {
    const { PDFArray, PDFDocument, PDFName, PDFNull, PDFNumber, PDFHexString } = _;

    const getPageRefs = getPageRefsFactory(_);
    const createOutlineNode = createOutlineNodeFactory(_);
    const createOutlineDict = createOutlineDictFactory(_);

    return {
        async savePdf(...args) {
            const { _pdfDocument } = this;
            if (_pdfDocument === undefined) throw Error(_errorMessages.thereIsNoPdfToSave);
            return _pdfDocument.save(...args);
        },
        async loadPdf(...args) {
            this._pdfDocument = await PDFDocument.load(...args);
            return this._pdfDocument;
        },
        set outline(s: string) {
            this._outline = s;
        },
        get outline(): string {
            const { _outline } = this;
            if (_outline === undefined) throw Error(_errorMessages.thereIsNoOutlineToGet);
            return _outline;
        },
        applyOutlineToPdf(): void {
            const { outline: inputOutline, _pdfDocument: doc } = this;
            if (doc === undefined) throw Error(_errorMessages.thereIsNoPdfToAddOutline);
            // const { outline: inputOutline, pdf: doc } = _;
            const pageRefs = getPageRefs(doc);
            const outline = printedToOutline(inputOutline, pageRefs.length);
            const outlinesDictRef = doc.context.nextRef();
            //Pointing the "Outlines" property of the PDF "Catalog" to the first object of your outlines
            doc.catalog.set(PDFName.of("Outlines"), outlinesDictRef);

            const outlineItemRef: _PDFRef[] = [];
            const outlineItem: _PDFDict[] = [];

            outline.forEach(() => {
                outlineItemRef.push(doc.context.nextRef());
            });

            const currentParentRef = outlinesDictRef;
            const { outlineItems: pseudoOutlineItems, outlineRootCount } = pseudoOutline(outline, currentParentRef);

            for (let i = 0; i < outline.length; i++) {
                const { Title, Dest, Parent, Count, First, Last, Next, Prev } = pseudoOutlineItems[i];
                outlineItem[i] = createOutlineNode(doc, {
                    Title: PDFHexString.fromText(Title),
                    Parent: typeof Parent === "number" ? outlineItemRef[Parent] : Parent,
                    ...(Prev !== undefined && {
                        Prev: outlineItemRef[Prev],
                    }),
                    ...(Next !== undefined && {
                        Next: outlineItemRef[Next],
                    }),
                    ...(First !== undefined && { First: outlineItemRef[First] }),
                    ...(Last !== undefined && { Last: outlineItemRef[Last] }),
                    ...(Count !== undefined && { Count: PDFNumber.of(Count) }),
                    Dest: (() => {
                        const array: _PDFArray = PDFArray.withContext(doc.context);
                        array.push(pageRefs[Dest]);
                        array.push(PDFName.of("XYZ"));
                        array.push(PDFNull);
                        array.push(PDFNull);
                        array.push(PDFNull);
                        return array;
                    })(),
                });
            }

            const outlinesDict = createOutlineDict(doc, {
                // /Type /Outline  ???
                First: outlineItemRef[0],
                Last: outlineItemRef[outline.length - 1],
                Count: PDFNumber.of(outlineRootCount),
            });

            //First 'Outline' object. Refer to table H.3 in Annex H.6 of PDF Specification doc.
            doc.context.assign(outlinesDictRef, outlinesDict);

            //Actual outline items that will be displayed
            outline.forEach((_l, i) => {
                doc.context.assign(outlineItemRef[i], outlineItem[i]);
            });
        },
    };
}

export const _errorMessages = {
    thereIsNoPdfToSave: "There is no pdf to save.",
    thereIsNoOutlineToGet: "There is not outline to get.",
    thereIsNoPdfToAddOutline: "There is no pdf to add outline.",
};
