import type { PDFDocument, PDFNumber, PDFRef, PDFName as _PDFName, PDFDict as _PDFDict } from "pdf-lib";

export function createOutlineDictFactory(_: { PDFName: typeof _PDFName; PDFDict: typeof _PDFDict }): (
    doc: PDFDocument,
    _: {
        First: PDFRef;
        Last: PDFRef;
        Count: PDFNumber;
    }
) => _PDFDict {
    const { PDFDict, PDFName } = _;
    return function createOutlineDict(doc, _) {
        const outlinesDictMap = new Map();

        outlinesDictMap.set(PDFName.Type, PDFName.of("Outlines"));
        outlinesDictMap.set(PDFName.of("First"), _.First);
        outlinesDictMap.set(PDFName.of("Last"), _.Last);
        outlinesDictMap.set(PDFName.of("Count"), _.Count);

        return PDFDict.fromMapWithContext(outlinesDictMap, doc.context);
    };
}
