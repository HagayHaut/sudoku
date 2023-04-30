import { Data } from "../types/models";
import { SolvedAndStartingData } from "../types/props";

export class SudokuGenerator {
    private data: Data;
    private n: number;
    private k: number;
    private sqrt: number;
    private solved: Data = [];
    private puzzle: Data = [];

    constructor(n: number, k: number) {
        this.n = n;
        this.k = k;
        this.sqrt = Math.sqrt(n);
        this.data = Array(n)
            .fill([])
            .map((_) => {
                return Array(n)
                    .fill(0)
                    .map((_) => 0);
            });
    }

    public generate(): void {
        this.fillDiagonal();
        this.fillRemaining(0, this.sqrt);
        this.solved = this.copyData();
        this.removeKDigits();
        this.puzzle = this.copyData();
    }

    public getSolvedAndStartingData(): SolvedAndStartingData {
        console.log(this.solved)
        return {
            solved: this.solved,
            starting: this.puzzle
        }
    }

    private copyData(): Data {
        const copy = [];
        for (let i = 0; i < this.n; i++) {
            copy.push([...this.data[i]]);
        }
        return copy;
    }

    fillDiagonal(): void {
        for (let i = 0; i < this.n; i += this.sqrt) {
            this.fillBox(i, i);
        }
    }

    fillBox(startRow: number, startCol: number): void {
        const shuffledValues = this.getShuffledValues();
        let curIndex = 0;
        for (let i = 0; i < this.sqrt; i++) {
            for (let j = 0; j < this.sqrt; j++) {
                this.data[startRow + i][startCol + j] = shuffledValues[curIndex++];
            }
        }
    }

    getShuffledValues(): number[] {
        const values = Array(this.n).fill(0).map((_, i) => i + 1);
        let curIndex = this.n;

        while (curIndex) {
            const randomIndex = ~~(Math.random() * curIndex);
            curIndex--;
            [values[curIndex], values[randomIndex]] = [values[randomIndex], values[curIndex]];
        }

        return values;
    }

    randomGenerator(): number {
        return ~~(Math.random() * this.n) + 1;
    }

    isValidInBox(rowStart: number, colStart: number, num: number): boolean {
        for (let i = 0; i < this.sqrt; i++) {
            for (let j = 0; j < this.sqrt; j++) {
                if (this.data[rowStart + 1][colStart + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    isValidInRow(i: number, num: number): boolean {
        return !this.data[i].some(n => n === num);
    }

    isValidInCol(j: number, num: number): boolean {
        for (let i = 0; i < this.n; i++) {
            if (this.data[i][j] === num) return false;
        }
        return true;
    }

    isValid(i: number, j: number, num: number): boolean {
        return (
            this.isValidInBox(i - i % this.sqrt, j - j % this.sqrt, num)
            && this.isValidInRow(i, num)
            && this.isValidInCol(j, num)
        )
    }

    fillRemaining(i: number, j: number): boolean {
        if (i === this.n - 1 && j === this.n) return true;
        if (j === this.n) {
            i++;
            j = 0;
        }
        if (this.data[i][j] !== 0) return this.fillRemaining(i, j + 1);
        for (let num = 1; num <= this.n; num++) {
            if (this.isValid(i, j, num)) {
                this.data[i][j] = num;
                if (this.fillRemaining(i, j + 1)) return true;
                this.data[i][j] = 0;
            }
        }
        return false;
    }

    removeKDigits(): void {
        let k = this.k;

        while (k) {
            const i = this.randomGenerator() - 1;
            const j = this.randomGenerator() - 1;
            if (this.data[i][j] !== 0) {
                k--;
                this.data[i][j] = 0;
            }
        }
    }

    printSudoku() {
        this.data.forEach(row =>console.log(`${row.join(' ')}\n`));
    }
}
