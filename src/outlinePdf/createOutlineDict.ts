import type { PDFDocument, PDFNumber, PDFRef } from "pdf-lib";

import { PDFName, PDFDict } from "pdf-lib";

export function createOutlineDict(
    doc: PDFDocument,
    _: {
        First: PDFRef;
        Last: PDFRef;
        Count: PDFNumber;
    }
): PDFDict {
    const outlinesDictMap = new Map();

    outlinesDictMap.set(PDFName.Type, PDFName.of("Outlines"));
    outlinesDictMap.set(PDFName.of("First"), _.First);
    outlinesDictMap.set(PDFName.of("Last"), _.Last);
    outlinesDictMap.set(PDFName.of("Count"), _.Count);

    return PDFDict.fromMapWithContext(outlinesDictMap, doc.context);
}
