import { throwIfPathDoesNotEndWithPdf, _errorMessages } from "./throwIfPathDoesNotEndWithPdf";

describe("throwIfPathDoesNotEndWithPdf(path: string)", () => {
    it("throws error when the provided path does not end with .pdf", () => {
        const path = "./test";
        expect(() => throwIfPathDoesNotEndWithPdf(path)).toThrow(_errorMessages.pathDoesNotEndWithPdf(path));
    });
    it("does not throws error when the provided path does end with .pdf", () => {
        expect(() => throwIfPathDoesNotEndWithPdf("./test.pdf")).not.toThrow();
    });
});
