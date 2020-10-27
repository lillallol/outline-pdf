import { printedToOutline } from "../outlinePdf/printedToOutline";
import { getIndexOfLastImmediateChild } from "./getIndexOfImmediateLastChild";

describe("getIndexOfLastImmediateChild(outline: IOutline, i: number)", () => {
    it.each([
		[1,4],
		[0,5]
	])("returns the index of the last immediate child of the specified outline node", (i,ii) => {
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
                i
            )
        ).toEqual(ii);
    });
});
