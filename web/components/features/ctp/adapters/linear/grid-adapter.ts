import { BaseAdapter } from '../base-adapter';
import { GridItem } from '@/components/features/ctp/common/types';

export class GridAdapter extends BaseAdapter {
    parse(globals: any): GridItem[][] {
        // [Smart Detection]
        // 1. Priority: Check known keys first
        let gridData = globals['grid'] || globals['matrix'] || globals['board'];

        // 2. Fallback: Scan all globals for any 2D Array
        if (!gridData) {
            for (const key in globals) {
                if (key.startsWith('__')) continue;
                const val = globals[key];
                // Check if 2D Array (Array of Arrays)
                if (Array.isArray(val) && val.length > 0 && Array.isArray(val[0])) {
                    gridData = val;
                    //console.log(`[GridAdapter] Auto-detected grid variable: ${key}`);
                    break;
                }
            }
        }

        if (!gridData || !Array.isArray(gridData)) return [];

<<<<<<< HEAD
        const toCell = (val: any) => {
            if (!Array.isArray(val) || val.length < 2) return null;
            const r = val[0];
            const c = val[1];
            if (!Number.isInteger(r) || !Number.isInteger(c)) return null;
            return { r, c };
        };

        const toCellList = (val: any) => {
            if (!Array.isArray(val)) return [] as { r: number; c: number }[];
            return val.map(toCell).filter(Boolean) as { r: number; c: number }[];
        };

        const activeCells = [
            ...toCellList(globals['active_cells']),
            ...toCellList(globals['frontier_cells']),
        ];
        const activeCell = toCell(globals['active_cell']) || toCell(globals['frontier_cell']);
        if (activeCell) activeCells.push(activeCell);

        const successCells = toCellList(globals['path_cells']);
        const highlightCells = toCellList(globals['visited_cells']);

        const visitedGrid = globals['visited'];
        const hasVisitedGrid =
            Array.isArray(visitedGrid) &&
            visitedGrid.length === gridData.length &&
            Array.isArray(visitedGrid[0]);

        return gridData.map((row: any[], rIdx: number) => {
            if (!Array.isArray(row)) return [];
            return row.map((val: any, cIdx: number) => {
                let status: GridItem['status'];
                if (successCells.some((cell) => cell.r === rIdx && cell.c === cIdx)) {
                    status = 'success';
                } else if (activeCells.some((cell) => cell.r === rIdx && cell.c === cIdx)) {
                    status = 'active';
                }

                const visited =
                    highlightCells.some((cell) => cell.r === rIdx && cell.c === cIdx) ||
                    (hasVisitedGrid && visitedGrid[rIdx]?.[cIdx]);

                return {
                    id: `cell-${rIdx}-${cIdx}`,
                    value: this.cleanValue(val),
                    label: `${rIdx},${cIdx}`,
                    status,
                    isHighlighted: !status && visited ? true : undefined,
                };
            });
=======
        return gridData.map((row: any[], rIdx: number) => {
            if (!Array.isArray(row)) return [];
            return row.map((val: any, cIdx: number) => ({
                id: `cell-${rIdx}-${cIdx}`,
                value: this.cleanValue(val),
                label: `${rIdx},${cIdx}`
            }));
>>>>>>> origin/feature/interview
        });
    }
}
