import { trimEachLine } from "./trimEachLine";

describe(trimEachLine.name, () => {
    it("works as described by its name", () => {
        expect(
            trimEachLine(`
			x-y
			z-t
		`)
        ).toBe("x-y" + "\n" + "z-t");
        expect(
            trimEachLine(`
		
		`)
        ).toBe("");
    });
});
