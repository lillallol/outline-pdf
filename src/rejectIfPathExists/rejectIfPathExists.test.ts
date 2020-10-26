import { rejectIfPathExists } from "./rejectIfPathExists";

describe(rejectIfPathExists.name, () => {
    it("returns a rejected promise with void message for the case that path does exist", async () => {
        await expect(rejectIfPathExists("./")).rejects.toThrow(undefined);
    });
    it("fulfils to void when the path does not exist", async () => {
        await expect(rejectIfPathExists("./test")).resolves.toBe(undefined);
    });
});
