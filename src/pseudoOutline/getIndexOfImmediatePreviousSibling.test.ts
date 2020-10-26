import { printedToOutline } from "../printedToOutline/printedToOutline";
import { getIndexOfImmediatePreviousSibling } from "./getIndexOfImmediatePreviousSibling";

describe(getIndexOfImmediatePreviousSibling.name, () => {
    it("works as described by its name", () => {
        expect(
            getIndexOfImmediatePreviousSibling(
                printedToOutline(`
                    1||Title1
                    2|-|Title2
                    3|--|Title3
                    4|---|Title4
                    5|----|Title5
                    6|-----|Title6
                    7|----|Title7
                    8|--|Title8
                `),
                6
            )
        ).toBe(4);
    });
});
