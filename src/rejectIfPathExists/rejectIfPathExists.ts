import * as fs from "fs/promises";

/**
 * @description It returns a rejected promise if the provided path corresponds to a file or directory,
 * otherwise it returns a void fulfilled promise.
 */
export async function rejectIfPathExists(path: string): Promise<void> {
    const pathExist: boolean = await fs
        .access(path)
        .then(() => true)
        .catch(() => false);
    if (pathExist) throw Error(_errorMessages.pathExist(path));
    else return undefined;
}

export const _errorMessages = {
    pathExist: (path: string): string =>
        `
		The is already a file or directory for the provided path "${path}".
	`.trim(),
};
