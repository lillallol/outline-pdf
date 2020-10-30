import { printedToOutline, _errorMessages } from "./printedToOutline";

describe(printedToOutline.name, () => {
    it("throws when empty outline is provided", () => {
        expect(() =>
            printedToOutline(
                `

				`,
                6
            )
        ).toThrow(_errorMessages.emptyOutline);
    });
    it("throws when the outline string representation is of not valid pattern", () => {
        expect(() =>
            printedToOutline(
                `
					1||Document
					2|-|Section 1
					3|-|Section 2
					4--|Subsection 1
					5|-|Section 3
					6||Summary
				`,
                6
            )
        ).toThrow(_errorMessages.wrongPatternInLine("4--|Subsection 1"));
    });
    it("throws when zero is provided as page number in outline", () => {
        const line = "0||Document";
        expect(() =>
            printedToOutline(
                `
					${line}
					2|-|Section 1
					3|-|Section 2
					4|--|Subsection 1
					5|-|Section 3
					6||Summary
				`,
                6
            )
        ).toThrow(_errorMessages.zeroPageInOutlineIsNotAllowed(line));
    });
    it("throws when page number provided in outline exceeds the total number of pages of the pdf", () => {
        const line = "7||Summary";
        const max = 6;
        expect(() =>
            printedToOutline(
                `
					1||Document
					2|-|Section 1
					3|-|Section 2
					4|--|Subsection 1
					5|-|Section 3
					${line}
				`,
                max
            )
        ).toThrow(_errorMessages.pageNumberInOutlineExceedsMaximum(line, max));
    });
    it("does not throw when the outline string representation is of valid pattern", () => {
        expect(() =>
            printedToOutline(
                `
					1||Document
					2|-|Section 1
					3|-|Section 2
					4|--|Subsection 1
					5|-|Section 3
					6||Summary
				`,
                6
            )
        ).not.toThrow();
    });
    it("does not throw for a one line outline string representation", () => {
        expect(() =>
            printedToOutline(
                `
					1||Document
				`,
                6
            )
        ).not.toThrow();
    });
    it("throws when the outline starts with non zero depth", () => {
        expect(() => printedToOutline(`1|---|Document`, 6)).toThrow(_errorMessages.depthOfOutlineHasToStartWithZero);
    });
    it("throws for invalid depth displacement", () => {
        expect(() =>
            printedToOutline(
                `
					1||Document
					2|---|Document
				`,
                6
            )
        ).toThrow(_errorMessages.wrongDepthDisplacement("1||Document", "2|---|Document"));
    });
    it("works as its name implies", () => {
        const oldLine = "-3|--|Page 3";
        const newLine = "2|---|Page 4";
        expect(() =>
            printedToOutline(
                `
					 1||Page 1
					 2|-|Page 2
					-3|--|Page 3
					 2|---|Page 4
					 5|---|Page 5
					 6|-|Page 6
					 7||Page 7
				`,
                6
            )
        ).toThrow(_errorMessages.invalidDisplacementOfPage(oldLine, newLine));
    });
    it("throws when there is a collapsed node without children", () => {
        const line = "-4||my title 1";
        expect(() =>
            printedToOutline(
                `
					${line}
					5||my title 2
				`,
                6
            )
        ).toThrow(_errorMessages.nodeIsCollapsedWithoutChildren(line));
    });
    it("does not throw when there are no collapsed nodes without children", () => {
        expect(() =>
            printedToOutline(
                `
					-4||my title 1
					 5|-|my title 2
				`,
                6
            )
        ).not.toThrow();
    });
    it("returns the expected programmatic representation that corresponds to the provided outline string", () => {
        expect(
            printedToOutline(
                `
			
					-1||Document
					 2|-|Section 1
					 3|-|Section 2
					 4|--|Subsection 1
					 5|-|Section 3
					 6||Summary
				 
				`,
                6
            )
        ).toEqual([
            { pageNumber: 1, depth: 0, title: "Document", collapse: true, line: "-1||Document" },
            { pageNumber: 2, depth: 1, title: "Section 1", collapse: false, line: "2|-|Section 1" },
            { pageNumber: 3, depth: 1, title: "Section 2", collapse: false, line: "3|-|Section 2" },
            { pageNumber: 4, depth: 2, title: "Subsection 1", collapse: false, line: "4|--|Subsection 1" },
            { pageNumber: 5, depth: 1, title: "Section 3", collapse: false, line: "5|-|Section 3" },
            { pageNumber: 6, depth: 0, title: "Summary", collapse: false, line: "6||Summary" },
        ]);
    });
});
