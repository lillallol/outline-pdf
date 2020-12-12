import { printedToOutline } from "../outlinePdf/printedToOutline";
import { getIndexOfImmediateNextSibling, _errorMessages } from "./getIndexOfImmediateNextSibling";

describe(getIndexOfImmediateNextSibling.name, () => {
    it("returns the index of the immediate next sibling of the provided outline node", () => {
        expect(
            getIndexOfImmediateNextSibling(
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
                4
            )
        ).toBe(6);
    });
    it("throws error if the provided outline node has no immediate next sibling", () => {
        const i = 5;
        expect(() =>
            getIndexOfImmediateNextSibling(
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
        ).toThrow(_errorMessages.noImmediateNextSiblingForTheGivenIndex(i));
    });
});
