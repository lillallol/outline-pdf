import type { PDFDocument } from "pdf-lib";
import * as fs from "fs/promises";
import { throwIfPathDoesNotEndWithPdf } from "../common/throwIfPathDoesNotEndWithPdf";
import { rejectIfPathExists } from "../rejectIfPathExists/rejectIfPathExists";

export async function savePdf(path: string, pdf: PDFDocument): Promise<void> {
    throwIfPathDoesNotEndWithPdf(path);
    try {
        await rejectIfPathExists(path);
    } catch (e) {
        throw Error();
	}
	await fs.writeFile(path, await pdf.save());
}

