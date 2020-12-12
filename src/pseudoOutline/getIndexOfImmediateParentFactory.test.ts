import { PDFRef } from "pdf-lib";
import { printedToOutline } from "../outlinePdf/printedToOutline";
import { getIndexOfImmediateParentFactory } from "./getIndexOfImmediateParentFactory";

describe(getIndexOfImmediateParentFactory.name, () => {
    let getIndexOfImmediateParent: ReturnType<typeof getIndexOfImmediateParentFactory>;
    let pdfRef: PDFRef;
    beforeEach(() => {
        pdfRef = PDFRef.of(-10);
        getIndexOfImmediateParent = getIndexOfImmediateParentFactory(pdfRef);
    });
    describe("getIndexOfParent(outline: IOutline, i: number)", () => {
        it("returns the index of the immediate parent node of the provided outline node", () => {
            expect(
                getIndexOfImmediateParent(
                    printedToOutline(
                        `
						1||Title0
						1|-|Title1
						2|--|Title2
						3|--|Title3
						4|--|Title4
						5|-|Title5
					`,
                        5
                    ),
                    3
                )
            ).toEqual(1);
        });
        it("returns the pdf object of the outline root for i being 0", () => {
            expect(
                getIndexOfImmediateParent(
                    printedToOutline(
                        `
						1||Title0
						1|-|Title1
						2|--|Title2
						3|--|Title3
						4|--|Title4
						5|-|Title5
					`,
                        5
                    ),
                    0
                )
            ).toEqual(pdfRef);
        });
    });
});
