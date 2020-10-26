import { PDFRef } from "pdf-lib";
import { printedToOutline } from "../printedToOutline/printedToOutline";
import { getIndexOfImmediateParentFactory } from "./getIndexOfImmediateParentFactory";

describe(getIndexOfImmediateParentFactory.name,() => {
	it("works as described by its name",() => {
		const pdfRef = PDFRef.of(-10);
		const getIndexOfImmediateParent = getIndexOfImmediateParentFactory(pdfRef);
		expect(
            getIndexOfImmediateParent(
				printedToOutline(`
					0||Title0
                    1|-|Title1
                    2|--|Title2
                    3|--|Title3
                    4|--|Title4
                    5|-|Title5
                `),
                3
            )
		).toEqual(1);
		expect(
            getIndexOfImmediateParent(
				printedToOutline(`
					0||Title0
                    1|-|Title1
                    2|--|Title2
                    3|--|Title3
                    4|--|Title4
                    5|-|Title5
                `),
                0
            )
        ).toEqual(pdfRef);
	})
});