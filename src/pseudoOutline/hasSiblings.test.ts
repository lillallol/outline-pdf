import { hasSiblings } from "./hasSiblings";
import { IOutline } from "../common/types";
import { printedToOutline } from "../printedToOutline/printedToOutline";

describe(hasSiblings.name, () => {
    it("works as suggested by the its name", () => {
        const outline: IOutline = printedToOutline(`
            1||Title1
            2|-|Title2
            3|--|Title3
            4|---|Title4
            5|----|Title5
            6|-----|Title6
            7|----|Title7
            8|--|Title8
		`);
		expect(hasSiblings(outline,5)).toBe(false);
		expect(hasSiblings(outline,4)).toBe(true);
    });
});
