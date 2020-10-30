import { printedToOutline } from "../outlinePdf/printedToOutline";
import { getNumberOfDescendants } from "./getNumberOfDescendants";

describe("getNumberOfDescendants(outline: IOutline, i: number)", () => {
    it("returns the number of the descendant outline nodes of the provided outline node", () => {
        expect(
            getNumberOfDescendants(
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
                2
            )
        ).toBe(4);
    });
});
