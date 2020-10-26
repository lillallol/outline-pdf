import * as path from "path";
import { PDFDocument } from "pdf-lib";

import { readPdf } from "./readPdf";

describe(readPdf.name, () => {
    it("reads the pdf file", async () => {
        const _path = path.resolve(__dirname, "./test.pdf");
        await expect(readPdf(_path)).resolves.toBeInstanceOf(PDFDocument);
    });
});
