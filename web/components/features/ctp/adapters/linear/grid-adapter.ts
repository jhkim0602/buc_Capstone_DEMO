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

        return gridData.map((row: any[], rIdx: number) => {
            if (!Array.isArray(row)) return [];
            return row.map((val: any, cIdx: number) => ({
                id: `cell-${rIdx}-${cIdx}`,
                value: this.cleanValue(val),
                label: `${rIdx},${cIdx}`
            }));
        });
    }
}
