import { Range } from "./util-types";

export type CellValue = Range<0, 10>;
export type Coordinate = Range<0, 9>;
export type Coordinates = [Coordinate, Coordinate];
export type Data = CellValue[][];