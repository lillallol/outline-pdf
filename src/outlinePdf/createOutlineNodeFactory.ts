import type {
    PDFDocument,
    PDFNumber,
    PDFRef,
    PDFHexString,
    PDFArray,
    PDFName as _PDFName,
    PDFDict as _PDFDict,
} from "pdf-lib";

export function createOutlineNodeFactory(_: { PDFName: typeof _PDFName; PDFDict: typeof _PDFDict }): (
    doc: PDFDocument,
    _: {
        Title: PDFHexString;
        Parent: PDFRef;
        Prev?: PDFRef;
        Next?: PDFRef;
        First?: PDFRef;
        Last?: PDFRef;
        Count?: PDFNumber;
        Dest: PDFArray;
    }
) => _PDFDict {
    const { PDFDict, PDFName } = _;
    return function createOutlineNode(doc, _) {
        const map = new Map();

        map.set(PDFName.Title, _.Title);
        map.set(PDFName.Parent, _.Parent);
        if (_.Prev !== undefined) map.set(PDFName.of("Prev"), _.Prev);
        if (_.Next !== undefined) map.set(PDFName.of("Next"), _.Next);
        if (_.First !== undefined) map.set(PDFName.of("First"), _.First);
        if (_.Last !== undefined) map.set(PDFName.of("Last"), _.Last);
        if (_.Count !== undefined) map.set(PDFName.of("Count"), _.Count);
        map.set(PDFName.of("Dest"), _.Dest);

        return PDFDict.fromMapWithContext(map, doc.context);
    };
}
