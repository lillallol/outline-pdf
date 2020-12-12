/**
 * @description It throws error if the provided path does not end with `.pdf`.
*/
export function throwIfPathDoesNotEndWithPdf(path: string):void {
    if (!/\.pdf$/.test(path)) throw Error(_errorMessages.pathDoesNotEndWithPdf(path));
}

export const _errorMessages = {
    pathDoesNotEndWithPdf: (path: string): string => `Given path : ${path} does not end with ".pdf".`,
};
