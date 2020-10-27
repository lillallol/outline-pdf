import * as path from "path";
import { PDFDocument } from "pdf-lib";

import { readPdf } from "./readPdf";

describe("readPdf(path: string)", () => {
	// //@TODO
	// it("calls throwIfPathDoesNotEndWithPdf") {

	// }
    it("reads the pdf file to return a PDFDocument instance of it", async () => {
        const _path = path.resolve(__dirname, "./test.pdf");
        await expect(readPdf(_path)).resolves.toBeInstanceOf(PDFDocument);
    });
});
