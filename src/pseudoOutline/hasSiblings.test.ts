import { hasSiblings } from "./hasSiblings";
import { printedToOutline } from "../outlinePdf/printedToOutline";

describe("hasSiblings(outline: IOutline, i: number)", () => {
    it.each([
		[0,false],
		[1,false],
		[2,true],
		[3,false],
		[4,true],
		[5,false],
		[6,true],
		[7,true]
	])("returns a predicate on whether the provided node has a sibling", (i, predicate) => {
        expect(
            hasSiblings(
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
        ).toBe(predicate);
    });
});
