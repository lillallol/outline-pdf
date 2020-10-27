import * as fs from "fs/promises";
import * as path from "path";
import { PDFDocument } from "pdf-lib";
import { savePdf } from "./savePdf";

let pdfToSaveFileName: string;

beforeAll(async () => {
    pdfToSaveFileName = "test.pdf";
    try {
        await fs.unlink(path.resolve(__dirname, "test.pdf"));
    } catch (e) {
        //no problem if file does not exist
    }
});

describe("savePdf(path: string, pdf: PDFDocument)", () => {
	//@TODO
	// it("calls throwIfPathDoesNotEndWithPdf",() => {
		
	// })
	// it("calls rejectIfPathExists",() => {

	// })
    it("saves the pdf to the provided path", async () => {
        const pdf = await PDFDocument.create();
        await savePdf(path.resolve(__dirname, pdfToSaveFileName), pdf);
        await expect(fs.access(path.resolve(__dirname, pdfToSaveFileName))).resolves.toBeUndefined();
    });
});
