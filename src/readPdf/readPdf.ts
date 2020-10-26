import { PDFDocument } from "pdf-lib";

import * as fs from "fs/promises";
import { throwIfPathDoesNotEndWithPdf } from "../common/throwIfPathDoesNotEndWithPdf";

export async function readPdf(path: string): Promise<PDFDocument> {
    throwIfPathDoesNotEndWithPdf(path);
    return PDFDocument.load(await fs.readFile(path));
}
