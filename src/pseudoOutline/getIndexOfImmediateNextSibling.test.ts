import { printedToOutline } from "../printedToOutline/printedToOutline";
import { getIndexOfImmediateNextSibling } from "./getIndexOfImmediateNextSibling";

describe(getIndexOfImmediateNextSibling.name, () => {
    it("works as expected from its name", () => {
        expect(
            getIndexOfImmediateNextSibling(
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
                4
            )
        ).toBe(6);
    });
});
