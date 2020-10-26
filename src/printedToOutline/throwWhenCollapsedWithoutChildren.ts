import { hasChild } from "../pseudoOutline/hasChild";
import { IOutline } from "../common/types";

export function throwWhenCollapsedWithoutChildren(outline: IOutline): void {
    outline.forEach(({ collapse, line }, i) => {
        if (collapse && !hasChild(outline, i)) throw Error(_errorMessages.nodeIsCollapsedWithoutChildren(line));
    });
}

export const _errorMessages = {
    nodeIsCollapsedWithoutChildren: (line: string): string =>
        `Outline node : "${line}" has no children and it is collapsed. You have to un collapse it or add children.`,
};
