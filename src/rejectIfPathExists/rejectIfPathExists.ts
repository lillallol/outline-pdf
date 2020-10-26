import * as fs from "fs/promises";

export async function rejectIfPathExists(path: string): Promise<void> {
    const pathExist: boolean = await fs
        .access(path)
        .then(() => true)
        .catch(() => false);
    if (pathExist) throw Error();
    else return undefined;
}
