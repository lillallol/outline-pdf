import * as fs from "fs";
import * as path from "path";
import { rejectIfPathExistsFactory, _errorMessages } from "./rejectIfPathExistsFactory";

describe(rejectIfPathExistsFactory.name, () => {
    it("returns a rejected promise when the provided path is a file/directory", async () => {
        const rejectIfPathExists = rejectIfPathExistsFactory(fs);
        const _path = path.resolve(__dirname);
        await expect(rejectIfPathExists(_path)).rejects.toThrow(_errorMessages.pathExist(_path));
    });
    it("fulfils to void when for the provided path is not a file/directory", async () => {
        const rejectIfPathExists = rejectIfPathExistsFactory(fs);
        await expect(rejectIfPathExists(path.resolve(__dirname, "./test"))).resolves.toBe(undefined);
    });
});
