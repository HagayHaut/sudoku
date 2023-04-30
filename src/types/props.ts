import { Coordinates, Data } from "./models";

export interface BoardProps {
    data: Data
}

export interface CellProps {
    value: number;
    coordinates: Coordinates;
}

export interface SolvedAndStartingData {
    solved: Data;
    starting: Data;
}