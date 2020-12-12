import { IOutline } from "../types";

/**
 * @description Returns the index of the last immediate child for the provided outline node.
 * It throws if there is no child.
 */
export function getIndexOfLastImmediateChild(outline: IOutline, i: number): number {
    let candidateIndex;
    const parentDepth = outline[i].depth;
    for (let ii = i + 1; ii < outline.length; ii++) {
        if (outline[ii].depth <= parentDepth) break;
        if (outline[ii].depth === parentDepth + 1) candidateIndex = ii;
    }
    if (candidateIndex === undefined) throw Error(_errorMessages.thereIsNoLastImmediateChildForTheGivenIndex(i));
    return candidateIndex;
}

export const _errorMessages = {
    thereIsNoLastImmediateChildForTheGivenIndex: (i: number): string =>
        `
		There is no last immediate child for the given index : ${i}.
	`.trim(),
};
