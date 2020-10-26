import type { PDFRef } from "pdf-lib";
import type { IOutline } from "../common/types";

export function getIndexOfImmediateParentFactory(v: PDFRef) {
    return function getIndexOfParent(outline: IOutline, i: number): number | PDFRef {
        const contextDepth = outline[i].depth;
        for (let ii = i; ii > -1; ii--) {
            if (contextDepth - 1 === outline[ii].depth) return ii;
        }
        return v;
    };
}
export const _errorMessages = {};
