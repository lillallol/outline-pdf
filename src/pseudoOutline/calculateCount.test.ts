import { printedToOutline } from "../outlinePdf/printedToOutline";
import { IOutline } from "../common/types";
import { calculateCount } from "./calculateCount";

describe("calculateCount(outline: IOutline, i: number)", () => {
    it("mutates in place the provided outline by adding count to each node", () => {
        const outline: IOutline = printedToOutline(`
			1||Document
			2|-|Section 1
	       -3|-|Section 2
			4|--|Subsection 1
			5|-|Section 3
			6||Summary
		`);
        expect(calculateCount(outline, 0)).toBe(3);
        expect(outline).toEqual([
            {
                pageNumber: 1,
                depth: 0,
                title: "Document",
                collapse: false,
                count: 3,
                line: "1||Document",
            },
            {
                pageNumber: 2,
                depth: 1,
                title: "Section 1",
                collapse: false,
                count: 1,
                line: "2|-|Section 1",
            },
            {
                pageNumber: 3,
                depth: 1,
                title: "Section 2",
                collapse: true,
                count: -1,
                line: "-3|-|Section 2",
            },
            {
                pageNumber: 4,
                depth: 2,
                title: "Subsection 1",
                collapse: false,
                count: 1,
                line: "4|--|Subsection 1",
            },
            {
                pageNumber: 5,
                depth: 1,
                title: "Section 3",
                collapse: false,
                count: 1,
                line: "5|-|Section 3",
            },
            {
                pageNumber: 6,
                depth: 0,
                title: "Summary",
                collapse: false,
                line: "6||Summary",
            },
        ]);
    });
    it("works for i being -1", () => {
        const outline: IOutline = printedToOutline(`
			1||Document
			2|-|Section 1
	       -3|-|Section 2
			4|--|Subsection 1
			5|-|Section 3
			6||Summary
		`);
        expect(calculateCount(outline, -1)).toBe(5);
        expect(outline).toEqual([
            {
                pageNumber: 1,
                depth: 0,
                title: "Document",
                collapse: false,
                count: 3,
                line: "1||Document",
            },
            {
                pageNumber: 2,
                depth: 1,
                title: "Section 1",
                collapse: false,
                count: 1,
                line: "2|-|Section 1",
            },
            {
                pageNumber: 3,
                depth: 1,
                title: "Section 2",
                collapse: true,
                count: -1,
                line: "-3|-|Section 2",
            },
            {
                pageNumber: 4,
                depth: 2,
                title: "Subsection 1",
                collapse: false,
                count: 1,
                line: "4|--|Subsection 1",
            },
            {
                pageNumber: 5,
                depth: 1,
                title: "Section 3",
                collapse: false,
                count: 1,
                line: "5|-|Section 3",
            },
            {
                pageNumber: 6,
                depth: 0,
                title: "Summary",
                collapse: false,
                count: 1,
                line: "6||Summary",
            },
        ]);
    });
});