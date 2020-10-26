import { hasChild } from "./hasChild";

import { getIndexOfLastImmediateChild } from "./getIndexOfImmediateLastChild";
import { getIndexOfImmediateNextSibling } from "./getIndexOfImmediateNextSibling";
import { getIndexOfImmediatePreviousSibling } from "./getIndexOfImmediatePreviousSibling";
import { hasImmediatePreviousSibling } from "./hasImmediatePreviousSibling";
import { hasImmediateNextSibling } from "./hasImmediateNextSibling";
import { getIndexOfImmediateParentFactory } from "./getIndexOfImmediateParentFactory";
import { calculateCount } from "./calculateCount";

import type { IOutline } from "../common/types";
import type { PDFRef } from "pdf-lib";

type outlineItem = {
    Title: string;
    Parent: number | PDFRef;
    Prev?: number;
    Next?: number;
    First?: number;
    Last?: number;
    Count?: number;
    Dest: number;
};

export function pseudoOutline(
    outline: IOutline,
    parent: PDFRef
): { outlineItems: outlineItem[]; outlineRootCount: number } {
    const outlineItems: outlineItem[] = [];
    const getIndexOfImmediateParent = getIndexOfImmediateParentFactory(parent);
    const outlineRootCount = calculateCount(outline, -1);
    for (let i = 0; i < outline.length; i++) {
        outlineItems[i] = {
            Title: outline[i].title,
            Parent: getIndexOfImmediateParent(outline, i),
            ...(hasImmediatePreviousSibling(outline, i) && {
                Prev: getIndexOfImmediatePreviousSibling(outline, i),
            }),
            ...(hasImmediateNextSibling(outline, i) && {
                Next: getIndexOfImmediateNextSibling(outline, i),
            }),
            ...(hasChild(outline, i) && {
                First: i + 1,
                Last: getIndexOfLastImmediateChild(outline, i),
                Count: outline[i].count,
            }),
            Dest: outline[i].pageNumber - 1,
        };
    }
    return {
        outlineItems: outlineItems,
        outlineRootCount: outlineRootCount,
    };
}
