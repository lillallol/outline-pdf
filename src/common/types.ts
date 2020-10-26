export type IOutline = IOutlineNode[];

export type IOutlineNode = {
    depth: number;
    pageNumber: number;
    title: string;
    collapse: boolean;
    count?: number;
    line: string;
};
