import { Point as __Point } from "./Point";

export function Point(x, y): number {
    // @ts-ignore
    return new __Point(x, y);
}

export type Point = number;