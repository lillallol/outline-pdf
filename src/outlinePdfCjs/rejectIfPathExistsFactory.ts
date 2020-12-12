import type { access as _access } from "fs/promises";

/**
 * @description It returns a rejected promise if the provided path corresponds to a file or directory,
 * otherwise it returns a void fulfilled promise.
 */
export function rejectIfPathExistsFactory(fs: { promises: { access: typeof _access } }) {
    return async function rejectIfPathExists(path: string): Promise<void> {
        const pathExist: boolean = await fs.promises
            .access(path)
            .then(() => true)
            .catch(() => false);
        if (pathExist) throw Error(_errorMessages.pathExist(path));
        else return undefined;
    };
}

export const _errorMessages = {
    pathExist: (path: string): string =>
        `
	    	The is already a file or directory for the provided path "${path}".
	    `.trim(),
};
