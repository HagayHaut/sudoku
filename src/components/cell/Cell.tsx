import { CellProps } from "../../types/props";
import { CellService } from "../../services/CellService";
import { useState } from "react";

function Cell({ value, coordinates }: CellProps) {
    const [borderStyle, _] = useState<string>(CellService.getBorderClass(coordinates));


    

    return <div className={"w-9 h-9 border border-slate" + borderStyle}>
        <p className="pl-3 pt-1">{value || ''}</p>
    </div>;
}

export default Cell;
