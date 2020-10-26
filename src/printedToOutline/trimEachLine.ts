export function trimEachLine(string: string): string {
    return string
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
}
