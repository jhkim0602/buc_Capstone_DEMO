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

        const toIndex = (val: any) => (Number.isInteger(val) ? val : null);
        const toIndexList = (val: any) => {
            if (!Array.isArray(val)) return [] as number[];
            return val.filter((v) => Number.isInteger(v)) as number[];
        };

        const activeIndex =
            toIndex(globals['active_index']) ??
            toIndex(globals['current_index']) ??
            toIndex(globals['pivot_index']) ??
            toIndex(globals['mid']);

        const successIndex =
            toIndex(globals['found_index']) ??
            toIndex(globals['target_index']);

        const comparingIndices = [
            ...toIndexList(globals['compare_indices']),
            ...toIndexList(globals['active_indices']),
            ...toIndexList(globals['pivot_indices']),
        ];

        const highlightIndices = [
            ...toIndexList(globals['visited_indices']),
            ...toIndexList(globals['highlight_indices']),
        ];

        const lowIndex = toIndex(globals['low']);
        const highIndex = toIndex(globals['high']);

        return startList.map((val: any, idx: number) => {
            let status: LinearItem['status'];
            if (successIndex === idx) status = 'success';
            else if (activeIndex === idx) status = 'active';
            else if (comparingIndices.includes(idx) || lowIndex === idx || highIndex === idx) status = 'comparing';

            return {
                id: `item-${idx}`,
                value: this.cleanValue(val),
                label: idx.toString(),
                status,
                isHighlighted: !status && highlightIndices.includes(idx) ? true : undefined,
            };
        });
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
