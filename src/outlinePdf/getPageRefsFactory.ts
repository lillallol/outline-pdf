import type { PDFDocument, PDFPageLeaf as _PDFPageLeaf, PDFRef } from "pdf-lib";

export function getPageRefsFactory(_: { PDFPageLeaf: typeof _PDFPageLeaf }): (pdfDoc: PDFDocument) => PDFRef[] {
    const { PDFPageLeaf } = _;
    return function getPageRefs(pdfDoc) {
        const refs: PDFRef[] = [];
        pdfDoc.catalog.Pages().traverse((kid, ref) => {
            if (kid instanceof PDFPageLeaf) refs.push(ref);
        });
        return refs;
    };
}
