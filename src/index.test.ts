import * as fs from "fs";
import * as path from "path";
import * as pdfLib from "pdf-lib";

import { outlinePdfFactory } from ".";

jest.setTimeout(60 * 10e3);

describe(outlinePdfFactory.name, () => {
    it("adds the provided outline to the loaded pdf", async () => {
        const outlinePdf = outlinePdfFactory(pdfLib);
        const absolutePathToPdfToOutline = path.resolve(__dirname, "test.pdf");
        const absolutePathToSaveOutlinedPdf = path.resolve(__dirname, "test.outline.pdf");
        try {
            fs.unlinkSync(absolutePathToSaveOutlinedPdf);
        } catch (e) {
            //file does not exist so no problem
        }
        const pdf = fs.readFileSync(absolutePathToPdfToOutline, { encoding: "base64" });
        const outline: string = `
             1||Some random title 1
             2|-|Some random title 2
            -3|--|Some random title 3
             4|---|Some random title 4
             5|---|Some random title 5
             6|-|Some random title 6
             7||Some random title 7
        `;
        const outlinedPdf = await outlinePdf({ outline, pdf }).then((pdfDocument) => pdfDocument.save());
        fs.writeFileSync(absolutePathToSaveOutlinedPdf, outlinedPdf);
    });
});
