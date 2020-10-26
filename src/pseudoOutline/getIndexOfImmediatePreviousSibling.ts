import { IOutline } from "../common/types";

/**
 * @description It returns the index of the immediate previous sibling, or throws error if
 * there is none.
 */
export function getIndexOfImmediatePreviousSibling(outline: IOutline, i: number): number {
    const contextDepth: number = outline[i].depth;
    for (let ii = i - 1; ii > -1; ii--) {
        if (outline[ii].depth < contextDepth) break;
        if (outline[ii].depth === contextDepth) return ii;
    }
    throw Error(_errorMessages.thereIsNoImmediatePreviousSibling(i));
}

export const _errorMessages = {
    thereIsNoImmediatePreviousSibling: (i: number): string =>
        `
		There is no immediate previous sibling for the node with index ${i}.
	`.trim(),
};
