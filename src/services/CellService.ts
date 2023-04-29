import { Coordinate } from "../types/models";

export class CellService {
    public static getBorderClass([r, c]: Coordinate[]): string {
        const rightBorderIsDark = [2, 5].includes(c);
        const bottomBorderIsDark = [2, 5].includes(r);
        
        if (!rightBorderIsDark && !bottomBorderIsDark) return 'border-default';
        if (rightBorderIsDark && bottomBorderIsDark) return 'border-both';
        if (rightBorderIsDark) return 'border-right';
        return 'border-bottom';
    }
}