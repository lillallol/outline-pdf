import type { PDFDocument, PDFRef } from "pdf-lib";
import { PDFPageLeaf } from "pdf-lib";

export function getPageRefs(pdfDoc: PDFDocument): PDFRef[] {
    const refs: PDFRef[] = [];
    pdfDoc.catalog.Pages().traverse((kid, ref) => {
        if (kid instanceof PDFPageLeaf) refs.push(ref);
    });
    return refs;
}
