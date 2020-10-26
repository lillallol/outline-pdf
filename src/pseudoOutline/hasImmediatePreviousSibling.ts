import { getIndexOfImmediatePreviousSibling } from "./getIndexOfImmediatePreviousSibling";
import type { IOutline } from "../common/types";

export function hasImmediatePreviousSibling(outline: IOutline, i: number): boolean {
    try {
        getIndexOfImmediatePreviousSibling(outline, i);
        return true;
    } catch (e) {
        return false;
    }
}
