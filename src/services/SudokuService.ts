import { Data } from "../types/models";
import jsonData from '../assets/data.json';
import { SolvedAndRawData } from "../types/props";

export class SudokuService {
    public static generateEmptyBoard(): Data {
        return Array(9).fill([]).map(_ => Array(9).fill(0));
    }

    public static getSolvableGameWithSolution(): SolvedAndRawData {
        const NUMBER_OF_OPTIONS = 27;
        const randomIndex = this.generateRandomZeroTo(NUMBER_OF_OPTIONS);
        return {
          solved: jsonData.SolvedSudoku[randomIndex],
          raw: jsonData.RawSudoku[randomIndex],  
        };
    }

    public static generateSolvableGame(): Data {
        const fullySolvedBoard = this.generateFullySolvedBoard();
        return this.removeKDigits(20, fullySolvedBoard);
    }

    private static generateFullySolvedBoard(): Data {
        let data = this.generateEmptyBoard();
        data = this.fillDiagonalBoxes(data);
        return this.fillRemaining(data);
    }

    private static fillRemaining(data: Data): Data {

        const solve = (r: number, c: number): boolean => {
            if (r === 8 && c === 9) return true; // fully solved (base case)
            if (c === 9) r++, c = 0; // reset to next row
            if (data[r][c]) return solve(r, c + 1); // skip already filled cells

            // try all possible values for current cell 
            for (let num = 1; num <= 9; num++) {
                if (this.isValid(r, c, num, data)) {
                    data[r][c] = num;
                    if (solve(r, c + 1)) return true;
                    data[r][c] = 0; // backtrack
                }
            }

            return false; // no valid solution
        }

        solve(0, 3);

        return data;
    }

    private static removeKDigits(k: number, data: Data): Data {
        while (k) {
            const r = this.generateRandomZeroTo(9);
            const c = this.generateRandomZeroTo(9);
            if (data[r][c]) {
                data[r][c] = 0;
                k--;
            }
        }
        return data;
    }

    private static fillDiagonalBoxes(data: Data): Data {
        for (let i = 0; i < 9; i += 3) {
            data = this.fillBox(i, i, data);
        }
        return data;
    }

    private static fillBox(row: number, col: number, data: Data): Data {
        let num = 0;

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    num = (this.generateRandomZeroTo(9) + 1);
                    if (this.isUnusedInBox(row, col, data, num)) {
                        break;
                    }
                }
                data[row + r][col + c] = num;
            }
        }
        return data;
    }

    private static isUnusedInBox(row: number, col: number, data: Data, num: number): boolean {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (data[row + r][col + c] === num) return false;
            }
        }
        return true;
    }

    private static isUnusedInRow(r: number, num: number, data: Data): boolean {
        for (let c = 0; c < 9; c++) {
            if (data[r][c] === num) return false;
        }
        return true;
    }

    private static isUnusedInCol(c: number, num: number, data: Data): boolean {
        for (let r = 0; r < 9; r++) {
            if (data[r][c] === num) return false;
        }
        return true;
    }

    private static isValid(r: number, c: number, num: number, data: Data) {
        return (
            this.isUnusedInRow(r, num, data) &&
            this.isUnusedInCol(c, num, data) &&
            this.isUnusedInBox(r, c, data, num)
        );
    }
    
    private static generateRandomZeroTo(ceiling: number) {
        return ~~(Math.random() * ceiling);
    }
}