import * as fs from "fs";
import * as pdfLib from "pdf-lib";
import * as path from "path";
import { outlinePdfCjsFactory } from "./outlinePdfCjsFactory";

let outlinedPdfFileName: string;

beforeAll(async () => {
    outlinedPdfFileName = "test.outline.pdf";
    try {
        await fs.promises.unlink(path.resolve(__dirname, outlinedPdfFileName));
    } catch (e) {
        //file does not exist so no problem
    }
});

jest.setTimeout(60 * 1e3);

describe(outlinePdfCjsFactory.name, () => {
    it("works as expected", async () => {
        const outlinePdfCjs = outlinePdfCjsFactory(fs, pdfLib);
        await outlinePdfCjs({
            loadPath: path.resolve(path.resolve(__dirname, "test.pdf")),
            savePath: path.resolve(path.resolve(__dirname, outlinedPdfFileName)),
            outline: `
				 1||Title 1
				 2|-|Title 2
				-3|--|Title 3
				 4|---|Title 4
				 5|---|Title 5
				 6|-|Title 6
				 7||Title 7
			`,
        });
        //@TODO this test just checks whether the function produces a new pdf
        //it does not check whether the created pdf has the expected outline
        //to improve this test I should read the outline from a pdf
        await expect(fs.promises.access(path.resolve(__dirname, outlinedPdfFileName))).resolves.toBeUndefined();
    });
});
