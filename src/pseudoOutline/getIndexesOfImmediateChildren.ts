import { IOutline } from "../types";

/**
 * @description Returns the indexes that correspond to the immediate children of the specified outline node.
 * You can provide `i` as `-1` to get the indexes of all the `0` depth siblings.
 */
export function getIndexesOfImmediateChildren(outline: IOutline, i: number): number[] {
    const toReturn: number[] = [];
    const initialDepth: number = i === -1 ? -1 : outline[i].depth;
    for (let ii = i + 1; ii < outline.length; ii++) {
        if (outline[ii].depth === initialDepth + 1) toReturn.push(ii);
        if (outline[ii].depth <= initialDepth) break;
    }
    return toReturn;
}
