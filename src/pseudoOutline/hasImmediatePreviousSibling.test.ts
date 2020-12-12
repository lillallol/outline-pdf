import { printedToOutline } from "../outlinePdf/printedToOutline";
import { hasImmediatePreviousSibling } from "./hasImmediatePreviousSibling";

describe(hasImmediatePreviousSibling.name, () => {
    it.each([
        [0, false],
        [1, false],
        [2, false],
        [3, false],
        [4, false],
        [5, false],
        [6, true],
        [7, true],
    ])("returns a predicate on whether the provided node has an immediate previous sibling", (i, predicate) => {
        expect(
            hasImmediatePreviousSibling(
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
