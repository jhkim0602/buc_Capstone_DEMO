import { BaseAdapter } from '../base-adapter';
import { LinearItem } from '@/components/features/ctp/common/types';

export class ArrayAdapter extends BaseAdapter {
    parse(globals: any): LinearItem[] {
        // Heuristic: Look for a list named 'arr', 'nums', 'data', or just the first list found
        // For CTP prototype, we often bind the main list to a specific variable or just use the first list.
        // Let's stick to the convention: Check for specific Array-like variables.

        let startList = globals['arr'] || globals['nums'] || globals['items'] || globals['data'];

        // Fallback: Scan for the first generic array in globals
        if (!startList || !Array.isArray(startList)) {
            for (const [key, val] of Object.entries(globals)) {
                if (key.startsWith('__')) continue;
                if (Array.isArray(val) && val.length > 0) {
                    startList = val;
                    break;
                }
            }
        }

        if (!Array.isArray(startList)) return [];

        return startList.map((val: any, idx: number) => ({
            id: `item-${idx}`,
            value: this.cleanValue(val),
            label: idx.toString()
        }));
    }

    // Static helper for direct usage if needed
    static toLinearItems(pyList: any[]): LinearItem[] {
        if (!Array.isArray(pyList)) return [];
        return pyList.map((val, idx) => ({
            id: `item-${idx}`,
            value: val
        }));
    }
}
