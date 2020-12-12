import type { PDFRef } from "pdf-lib";
import type { IOutline } from "../types";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getIndexOfImmediateParentFactory(v: PDFRef) {
	/**
	 * @description It returns the index of the parent of the provided outline node.
	 * It returns the PDFRef of the pdf outline root object when the provided outline node has zero depth.
	*/
    function getIndexOfParent(outline: IOutline, i: number): number | PDFRef {
        const contextDepth = outline[i].depth;
        for (let ii = i; ii > -1; ii--) {
            if (contextDepth - 1 === outline[ii].depth) return ii;
        }
        return v;
	}
	return getIndexOfParent;
}
