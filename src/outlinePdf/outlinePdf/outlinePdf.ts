import { PDFDict, PDFName, PDFNumber, PDFRef, PDFString, PDFArray, PDFNull } from "pdf-lib";
import { createOutlineDict } from "../createOutlineDict";
import { createOutlineNode } from "../createOutlineNode";
import { getPageRefs } from "../getPageRefs";

import { readPdf } from "../../readPdf/readPdf";
import { savePdf } from "../../savePdf/savePdf";
import { pseudoOutline } from "../../pseudoOutline/pseudoOutline";
import { printedToOutline } from "../printedToOutline";

/**
 * @description Adds outline to an outline-less pdf.
 * @example
 * (async () => {
 *     await outlinePdf({
 *         loadPath: "absolute/or/relative/path/to/pdf/to/outline.pdf",
 *         savePath: "absolute/or/relative/path/to/save/outlined.pdf",
 *         // first column  : page number
 *         //                 negative for collapsing outline
 *         // second column : outline depth
 *         // third column  : outline title
 *         outline: `
 *               1||some title
 *              12|-|some title
 *             -30|--|some title
 *              34|---|some title
 *              35|---|some title
 *              60|--|some title
 *              67|-|some title
 *              80||some title
 *         `,
 *     });
 * })();
*/
export async function outlinePdf(_: {
    /**
     * @description Absolute or relative path to the outline-less pdf you want to add outline.
     */
    loadPath: string;
    /**
     * @description Absolute or relative path to where the newly created outlined pdf will be saved.
     */
    savePath: string;
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
}): Promise<void> {
	const { outline: inputOutline, loadPath: loadPath, savePath: savePath } = _;
	
    
    const doc = await readPdf(loadPath);

    const pageRefs = getPageRefs(doc);
	const outline = printedToOutline(inputOutline,pageRefs.length);
    const outlinesDictRef = doc.context.nextRef();
    //Pointing the "Outlines" property of the PDF "Catalog" to the first object of your outlines
    doc.catalog.set(PDFName.of("Outlines"), outlinesDictRef);

    const outlineItemRef: PDFRef[] = [];
    const outlineItem: PDFDict[] = [];

    outline.forEach(() => {
        outlineItemRef.push(doc.context.nextRef());
    });

    const currentParentRef = outlinesDictRef;
    const { outlineItems: pseudoOutlineItems, outlineRootCount } = pseudoOutline(outline, currentParentRef);

    for (let i = 0; i < outline.length; i++) {
        const { Title, Dest, Parent, Count, First, Last, Next, Prev } = pseudoOutlineItems[i];
        outlineItem[i] = createOutlineNode(doc, {
            Title: PDFString.of(Title),
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
                const array: PDFArray = PDFArray.withContext(doc.context);
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

    await savePdf(savePath, doc);
}
