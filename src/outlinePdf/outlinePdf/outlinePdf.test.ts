import * as fs from "fs/promises";
import * as path from "path";
import { outlinePdf } from "./outlinePdf";

let outlinedPdfFileName: string;

beforeAll(async () => {
    outlinedPdfFileName = "test.outline.pdf";
    try {
        await fs.unlink(path.resolve(__dirname, outlinedPdfFileName));
    } catch (e) {
        //file does not exist so no problem
    }
});

jest.setTimeout(60 * 1e3);

describe(outlinePdf.name, () => {
    it("works as expected", async () => {
        await outlinePdf({
            loadPath: path.resolve(path.resolve(__dirname, "test.pdf")),
            savePath: path.resolve(path.resolve(__dirname, outlinedPdfFileName)),
            outline: `
				 1||Page 1
				 2|-|Page 2
				-3|--|Page 3
				 4|---|Page 4
				 5|---|Page 5
				 6|-|Page 6
				 7||Page 7
			`,
        });
        //@TODO this test just checks whether the function produces a new pdf
        //it does not check whether the created pdf has the expected outline
        //to improve this test I should read the outline from a pdf
        await expect(fs.access(path.resolve(__dirname, outlinedPdfFileName))).resolves.toBeUndefined();
    });
});
