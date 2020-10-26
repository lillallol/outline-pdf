import { printedToOutline } from "../printedToOutline/printedToOutline";
import { hasChild } from "./hasChild";

describe(hasChild.name, () => {
    test.each([
		[0, false],
		[1, false],
        [2, true],
        [3, true],
        [4, true],
        [5, true],
        [6, true],
        [7, false],
        [8, false],
        [9, false],
    ])("it works as expected", (i, predicate) => {
        expect(
            hasChild(
				printedToOutline(`
					 1||my title 1
					 2||my title 2
                     3||Title1
                     4|-|Title2
                     5|--|Title3
                     6|---|Title4
                     7|----|Title5
                     8|-----|Title6
                     9|----|Title7
                    10|--|Title8
                `),
                i
            )
        ).toBe(predicate);
    });
});
