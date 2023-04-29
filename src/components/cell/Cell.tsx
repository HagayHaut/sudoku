import { CellProps } from "../../types/props";
import { CellService } from "../../services/CellService";

function Cell({ value, coordinates }: CellProps) {
    return <div className={"w-9 h-9" + CellService.getBorderClass(coordinates)}>
        <p className="pl-3 pt-1">{value}</p>
    </div>;
}

export default Cell;
