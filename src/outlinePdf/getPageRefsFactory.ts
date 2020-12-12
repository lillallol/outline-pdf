import type { PDFDocument, PDFPageLeaf as _PDFPageLeaf, PDFRef } from "pdf-lib";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getPageRefsFactory(_: { PDFPageLeaf: typeof _PDFPageLeaf }) {
    const { PDFPageLeaf } = _;
    return function getPageRefs(pdfDoc: PDFDocument): PDFRef[] {
        const refs: PDFRef[] = [];
        pdfDoc.catalog.Pages().traverse((kid, ref) => {
            if (kid instanceof PDFPageLeaf) refs.push(ref);
        });
        return refs;
    };
}
