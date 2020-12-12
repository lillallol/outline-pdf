import { printedToOutline } from "../outlinePdf/printedToOutline";
import { getIndexesOfImmediateChildren } from "./getIndexesOfImmediateChildren";

describe(getIndexesOfImmediateChildren.name, () => {
    it("returns the indexes of the immediate children of the provided outline node", () => {
        expect(
            getIndexesOfImmediateChildren(
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
                1
            )
        ).toEqual([2, 7]);
    });
    it("returns the indexes of the outline nodes with 0 depth for i being -1", () => {
        expect(
            getIndexesOfImmediateChildren(
                printedToOutline(
                    `
                    1||Title1
                    2||Title2
                    3|-|Title3
                    4|--|Title4
                    5|---|Title5
                    6|----|Title6
                    7||Title7
                    8|-|Title8
                `,
                    8
                ),
                -1
            )
        ).toEqual([0, 1, 6]);
    });
});
