import { printedToOutline } from "../printedToOutline/printedToOutline";
import { getIndexOfLastImmediateChild } from "./getIndexOfImmediateLastChild";

describe(getIndexOfLastImmediateChild.name, () => {
    it("returns the index of the last immediate child of the specified outline node", () => {
        expect(
            getIndexOfLastImmediateChild(
                printedToOutline(`
					0||Title1
                    1|-|Title1
                    2|--|Title2
                    3|--|Title3
                    4|--|Title4
                    5|-|Title5
            	`),
                1
            )
        ).toEqual(4);
        expect(
            getIndexOfLastImmediateChild(
                printedToOutline(`
					0||Title1
                    1|-|Title1
                    2|--|Title2
                    3|--|Title3
                    4|--|Title4
                    5|-|Title5
            	`),
                0
            )
        ).toEqual(5);
    });
});
