import { getIndexOfImmediateNextSibling } from "./getIndexOfImmediateNextSibling";
import { IOutline } from "../common/types";

/**
 * @description It returns a predicate on whether the provided outline node has an immediate next sibling.
 */
export function hasImmediateNextSibling(outline: IOutline, i: number): boolean {
    try {
        getIndexOfImmediateNextSibling(outline, i);
        return true;
    } catch (e) {
        return false;
    }
}
