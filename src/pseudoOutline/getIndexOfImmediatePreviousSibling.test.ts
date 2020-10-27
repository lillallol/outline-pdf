import { printedToOutline } from "../outlinePdf/printedToOutline";
import { getIndexOfImmediatePreviousSibling, _errorMessages } from "./getIndexOfImmediatePreviousSibling";

describe("getIndexOfImmediatePreviousSibling(outline: IOutline, i: number)", () => {
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
    it("throws error if there is no immediate previous sibling for the provided outline node", () => {
        const i = 1;
        expect(() =>
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
                i
            )
        ).toThrow(_errorMessages.thereIsNoImmediatePreviousSibling(i));
    });
});
