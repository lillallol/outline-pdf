import { printedToOutline } from "../printedToOutline/printedToOutline";
import { getNumberOfDescendants } from "./getNumberOfDescendants";

describe(getNumberOfDescendants.name, () => {
    it("works as described by its name", () => {
        expect(
            getNumberOfDescendants(
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
                2
            )
        ).toBe(4);
    });
});
