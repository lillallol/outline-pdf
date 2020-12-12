import { IOutline } from "../types";
import { getIndexesOfImmediateChildren } from "./getIndexesOfImmediateChildren";
import { hasChild } from "./hasChild";
/**
 * @description Mutates in place the provided outline subtree by adding count to each node that has each count undefined.
 * It returns the count of the root of the subtree.
 * Take notice that nodes that have no children have count 1 (something that is not valid according to pdf documentation).
 * Nodes that are collapsed have negative count (as pdf documentation dictates).
 * For `i` being `-1` it calculates the count for all outline and
 * returns the count to be added to the parent pdf object of outline.
 */
export function calculateCount(outline: IOutline, i: number): number {
    if (i > 0) {
        const { count } = outline[i];
        if (/*count is already calculated return it*/ typeof count === "number") return count;
        //else calculate it and return it
    }

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    let contextCount: number = 0;
    for (const ii of getIndexesOfImmediateChildren(outline, i)) {
        const currentIndexCount = calculateCount(outline, ii);

        if (currentIndexCount < 0) {
            contextCount++;
        } else {
            contextCount = contextCount + currentIndexCount + (hasChild(outline, ii) ? 1 : 0);
        }
    }

    if (i === -1) {
        return contextCount;
    } else if (/*node that has no children*/ contextCount === 0) {
        return (outline[i].count = 1);
    } else if (outline[i].collapse) {
        return (outline[i].count = -1 * contextCount);
    } /* (!outline[i].collapse)*/ else {
        return (outline[i].count = contextCount);
    }
}
