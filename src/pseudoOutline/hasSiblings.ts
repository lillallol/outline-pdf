import { getIndexOfImmediateNextSibling } from "./getIndexOfImmediateNextSibling";
import { getIndexOfImmediatePreviousSibling } from "./getIndexOfImmediatePreviousSibling";
import { IOutline } from "../common/types";

/**
 * @description It returns a predicate on whether the provided node has a sibling.
*/
export function hasSiblings(outline: IOutline, i: number): boolean {
    try {
        getIndexOfImmediateNextSibling(outline, i);
        return true;
    } catch (e) {
        try {
            getIndexOfImmediatePreviousSibling(outline, i);
            return true;
        } catch (e) {
            return false;
        }
    }
}