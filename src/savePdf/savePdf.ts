import type { PDFDocument } from "pdf-lib";
import * as fs from "fs/promises";
import { throwIfPathDoesNotEndWithPdf } from "../common/throwIfPathDoesNotEndWithPdf";
import { rejectIfPathExists } from "../rejectIfPathExists/rejectIfPathExists";

/**
 * @description It saves the provided pdf to the provided path.
 * It throws if for the provided path there is already a file/directory.
 * @example
 * (async () => {
 * 	await savePdf("path/to/save/my.pdf",pdfDocumentInstance);
 * })()
 *
 */
export async function savePdf(path: string, pdf: PDFDocument): Promise<void> {
    throwIfPathDoesNotEndWithPdf(path);
    await rejectIfPathExists(path);
    await fs.writeFile(path, await pdf.save());
}
