import { CellValue, Coordinate, Coordinates } from "./models";

export interface BoardProps {
    data: CellValue[][]
}

export interface CellProps {
    value: CellValue;
    coordinates: Coordinates;
}