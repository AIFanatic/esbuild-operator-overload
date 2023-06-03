import { Point } from "./Point";

declare global {
    interface Number extends Point {}
}