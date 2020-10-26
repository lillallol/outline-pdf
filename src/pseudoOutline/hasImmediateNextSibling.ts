import { getIndexOfImmediateNextSibling } from "./getIndexOfImmediateNextSibling";
import { IOutline } from "../common/types";

export function hasImmediateNextSibling(outline: IOutline, i: number): boolean {
    try {
        getIndexOfImmediateNextSibling(outline, i);
        return true;
    } catch (e) {
        return false;
    }
}
