import { IOutline } from "../common/types";

export function getNumberOfDescendants(outline: IOutline, i: number): number {
    let count = 0;
    const contextDepth = outline[i].depth;
    for (let ii = i + 1; ii < outline.length; ii++) {
        if (contextDepth < outline[ii].depth) {
            count++;
        } else {
            break;
        }
    }
    return count;
}
