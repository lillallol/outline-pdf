import { printedToOutline } from "./printedToOutline";
import { throwWhenCollapsedWithoutChildren, _errorMessages } from "./throwWhenCollapsedWithoutChildren";

describe(throwWhenCollapsedWithoutChildren.name, () => {
    it("throw when there is a collapsed node without children", () => {
        const line = "-4||my title 1";
        expect(() =>
            throwWhenCollapsedWithoutChildren(
                printedToOutline(`
				 ${line}
				 5||my title 2
				`)
            )
        ).toThrow(_errorMessages.nodeIsCollapsedWithoutChildren(line));
    });
    it("does not throw when there are no collapsed nodes without children", () => {
        expect(() =>
            throwWhenCollapsedWithoutChildren(
                printedToOutline(`
					-4||my title 1
					 5|-|my title 2
				`)
            )
        ).not.toThrow();
    });
});
