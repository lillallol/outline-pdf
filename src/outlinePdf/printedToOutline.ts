import { IOutline, IOutlineNode } from "../types";

/**
 * @description Converts the outline string representation to its programmatic representation.
 * It throws if the outline string representation is not valid.
 * @example
 * //input
 * printedToOutline(`
 * 	 1||Document
 * 	 2|-|Section 1
 * 	-3|-|Section 2
 * 	 4|--|Subsection 1
 * 	 5|-|Section 3
 * 	 6||Summary
 * `,6)
 * //output
 * [
 * 	{ pageNumber: 1, depth: 0, title: "Document" , collapse : false , line : "1||Document"},
 * 	{ pageNumber: 2, depth: 1, title: "Section 1" , collapse : false , line : "2|-|Section 1"},
 * 	{ pageNumber: 3, depth: 1, title: "Section 2" , collapse : true , line : "-3|-|Section 2"},
 * 	{ pageNumber: 4, depth: 2, title: "Subsection 1" , collapse : false , line : "4|--|Subsection 1"},
 * 	{ pageNumber: 5, depth: 1, title: "Section 3" , collapse : false , line : "5|-|Section 3"},
 * 	{ pageNumber: 6, depth: 0, title: "Summary" , collapse : false , line : "6||Summary"},
 * ]
 */
export function printedToOutline(inputOutline: string, totalNumberOfPages: number): IOutline {
    if (inputOutline.trim() === "") throw Error(_errorMessages.emptyOutline);

    let lastNode: IOutlineNode;
    const toReturn: IOutline = inputOutline
        .trim()
        .split("\n")
        .map((untrimmedLine, i) => {
            const line = untrimmedLine.trim();
            // eslint-disable-next-line no-useless-escape
            const match = line.match(/^([+\-]?\d+)\|(-*)\|(.*)$/);
            if (match === null) throw Error(_errorMessages.wrongPatternInLine(line));

            const nodeToReturn: IOutlineNode = {
                pageNumber: Math.abs(Number(match[1])),
                depth: match[2].length,
                title: match[3],
                collapse: Number(match[1]) < 0,
                line: line,
            };
            if (nodeToReturn.pageNumber === 0) throw Error(_errorMessages.zeroPageInOutlineIsNotAllowed(line));
            if (nodeToReturn.pageNumber > totalNumberOfPages)
                throw Error(_errorMessages.pageNumberInOutlineExceedsMaximum(line, totalNumberOfPages));

            if (i === 0 && nodeToReturn.depth !== 0) throw Error(_errorMessages.depthOfOutlineHasToStartWithZero);
            if (i !== 0) {
                if (!(nodeToReturn.depth <= lastNode.depth + 1)) {
                    throw Error(_errorMessages.wrongDepthDisplacement(lastNode.line, nodeToReturn.line));
                }

                if (nodeToReturn.pageNumber < lastNode.pageNumber) {
                    throw Error(_errorMessages.invalidDisplacementOfPage(lastNode.line, nodeToReturn.line));
                }

                if (lastNode.collapse && lastNode.depth >= nodeToReturn.depth) {
                    throw Error(_errorMessages.nodeIsCollapsedWithoutChildren(lastNode.line));
                }
            }

            lastNode = nodeToReturn;
            return nodeToReturn;
        });

    return toReturn;
}

export const _errorMessages = {
    emptyOutline: "no outline has been provided",
    wrongDepthDisplacement: (oldLine: string, newLine: string): string =>
        `
Wrong depth displacement for the following part of the outline :
${oldLine}
${newLine}
`.trim(),
    zeroPageInOutlineIsNotAllowed: (line: string): string => `Zero page number is not allowed in outline : ${line}`,
    pageNumberInOutlineExceedsMaximum: (line: string, max: number): string =>
        `Pdf file has ${max} number of pages and outline points out of this range : ${line}`,
    depthOfOutlineHasToStartWithZero: `The outline should start with zero depth.`,
    wrongPatternInLine: (line: string): string => `The line "${line}" has wrong pattern.`,
    invalidDisplacementOfPage: (oldLine: string, newLine: string): string =>
        `
	The page is not displaced correctly :
	${oldLine}
	${newLine}
`.trim(),
    nodeIsCollapsedWithoutChildren: (line: string): string =>
        `Outline node : "${line}" has no children and it is collapsed. You have to un collapse it or add children.`,
};
