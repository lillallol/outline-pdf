import { printedToOutline } from "../outlinePdf/printedToOutline";
import { hasImmediateNextSibling } from "./hasImmediateNextSibling";

describe("hasImmediateNextSibling(outline: IOutline, i: number)", () => {
    it.each([
        [0, false],
        [1, false],
        [2, true],
        [3, false],
        [4, true],
        [5, false],
        [6, false],
        [7, false],
    ])("returns a predicate on whether the provided node has an immediate next sibling", (i, predicate) => {
        expect(
            hasImmediateNextSibling(
                printedToOutline(
                    `
			1||Title1
			2|-|Title2
			3|--|Title3
			4|---|Title4
			5|----|Title5
			6|-----|Title6
			7|----|Title7
			8|--|Title8
		`,
                    8
                ),
                i
            )
        ).toBe(predicate);
    });
});
