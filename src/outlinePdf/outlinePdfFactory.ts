import type { IOutlinePdfFactory } from "../publicApi";
import type { PDFArray, PDFDict, PDFRef } from "pdf-lib";

import { createOutlineDictFactory } from "./createOutlineDictFactory";
import { createOutlineNodeFactory } from "./createOutlineNodeFactory";
import { getPageRefsFactory } from "./getPageRefsFactory";
import { outlinePdfDataStructure } from "@lillallol/outline-pdf-data-structure";

type _PDFRef = PDFRef;
type _PDFDict = PDFDict;
type _PDFArray = PDFArray;

export const outlinePdfFactory: IOutlinePdfFactory = function outlinePdfFactory(pdfLib) {
    const { PDFArray, PDFDocument, PDFName, PDFNull, PDFNumber, PDFHexString } = pdfLib;

    const getPageRefs = getPageRefsFactory(pdfLib);
    const createOutlineNode = createOutlineNodeFactory(pdfLib);
    const createOutlineDict = createOutlineDictFactory(pdfLib);

    return async function outlineToPdf(parameters) {
        const { outline: inputOutline, pdf: inputPdf } = parameters;

        const doc = await (() => {
            if (inputPdf instanceof PDFDocument) return inputPdf;
            return PDFDocument.load(inputPdf);
        })();

        const pageRefs = getPageRefs(doc);
        const pageRefsLength = pageRefs.length;
        const outlineRootRef = doc.context.nextRef();
        //Pointing the "Outlines" property of the PDF "Catalog" to the first object of your outlines
        doc.catalog.set(PDFName.of("Outlines"), outlineRootRef);

        const outlineItemRef: _PDFRef[] = [];
        const outlineItem: _PDFDict[] = [];

        // const outlineRootRef = outlinesDictRef;
        const { outlineItems: pseudoOutlineItems, outlineRootCount } = outlinePdfDataStructure(
            inputOutline,
            pageRefsLength
        );

        for (let i = 0; i < pseudoOutlineItems.length; i++) {
            outlineItemRef.push(doc.context.nextRef());
        }

        for (let i = 0; i < pseudoOutlineItems.length; i++) {
            const { Title, Dest, Parent, Count, First, Last, Next, Prev } = pseudoOutlineItems[i];
            outlineItem[i] = createOutlineNode(doc, {
                Title: PDFHexString.fromText(Title),
                Parent: Parent !== -1 ? outlineItemRef[Parent] : outlineRootRef,
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
            First: outlineItemRef[0],
            Last: outlineItemRef[pseudoOutlineItems.length - 1],
            Count: PDFNumber.of(outlineRootCount),
        });

        //First 'Outline' object. Refer to table H.3 in Annex H.6 of PDF Specification doc.
        doc.context.assign(outlineRootRef, outlinesDict);

        //Actual outline items that will be displayed
        for (let i = 0; i < pseudoOutlineItems.length; i++) {
            doc.context.assign(outlineItemRef[i], outlineItem[i]);
        }

        return doc;
    };
};
