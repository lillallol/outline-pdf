import * as fs from "fs";
import * as path from "path";
import * as pdfLib from "pdf-lib";
import { outlinePdfFactory, _errorMessages, IOutlinePdf } from "./outlinePdfFactory";

let outlinedPdfFileName: string;
let outlinePdf: IOutlinePdf;

beforeAll(() => {
    outlinedPdfFileName = "test.outline.pdf";
    try {
        fs.unlinkSync(path.resolve(__dirname, outlinedPdfFileName));
    } catch (e) {
        //file does not exist so no problem
    }
});

beforeEach(() => {
    outlinePdf = outlinePdfFactory(pdfLib);
});

jest.setTimeout(60 * 1e3);

describe(outlinePdfFactory.name, () => {
    it("throws error when someone gets the outline without having it set first", () => {
        expect(() => outlinePdf.outline).toThrow(_errorMessages.thereIsNoOutlineToGet);
    });
    it("return a rejected promise when someone tries to save a pdf without loading it first", async () => {
        await expect(outlinePdf.savePdf()).rejects.toThrow(_errorMessages.thereIsNoPdfToSave);
    });
    it("throws error when someone tries to add an outline to a pdf without providing the outline", () => {
        outlinePdf.outline = "whatever";
        outlinePdf.loadPdf(fs.readFileSync(path.resolve(__dirname, "test.pdf")));
        expect(() => outlinePdf.applyOutlineToPdf()).toThrow(_errorMessages.thereIsNoPdfToAddOutline);
    });
    it("adds the provided outline to the loaded pdf", async () => {
        await outlinePdf.loadPdf(fs.readFileSync(path.resolve(__dirname, "test.pdf")));
        outlinePdf.outline = `
            1||Some random title 1
            2|-|Some random title 2
           -3|--|Some random title 3
            4|---|Some random title 4
            5|---|Some random title 5
            6|-|Some random title 6
            7||Some random title 7
        `;
        outlinePdf.applyOutlineToPdf();
        fs.writeFileSync(path.resolve(__dirname, outlinedPdfFileName), await outlinePdf.savePdf());
        //@TODO this test just checks whether the function produces a new pdf
        //it does not check whether the created pdf has the expected outline
        //to improve this test I should read the outline from a pdf
        await expect(fs.promises.access(path.resolve(__dirname, outlinedPdfFileName))).resolves.toBeUndefined();
    });
});
