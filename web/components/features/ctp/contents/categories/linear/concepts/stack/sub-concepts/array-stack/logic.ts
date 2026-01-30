import { useSkulptEngine } from "@/hooks/use-skulpt-engine";
import { useCallback } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";

export function useArrayStackSimulation() {
    const dataMapper = useCallback((globals: any) => {
        // 1. Find 'stack' object
        const stackObj = globals['stack'];

        // Default empty state
        if (!stackObj || !stackObj.array) {
            // Fallback: If user wrote simple global variables without class
            // check for 'array' and 'top' globals
            if (globals['array'] && Array.isArray(globals['array'])) {
                const arr = globals['array'];
                const top = globals['top'] || 0;
                return arr.map((val: any, idx: number) => ({
                    id: idx,
                    value: val,
                    label: idx === top ? `${idx} (Top)` : `${idx}`,
                    isHighlighted: idx === top,
                    isGhost: val === null || val === undefined
                }));
            }
            return [];
        }

        // 2. Extract fields from Class Instance
        const array = stackObj.array;
        const top = stackObj.top ?? 0;

        if (!Array.isArray(array)) return [];

        const visualItems: VisualItem[] = [];

        // iterate array
        array.forEach((val: any, idx: number) => {
            let label = idx.toString();

            // Mark Top
            if (idx === top) {
                label = `${idx} (Top)`;
            } else if (idx === top - 1) {
                // Maybe mark the last element?
            }

            visualItems.push({
                id: `cell-${idx}`,
                value: val === null ? "" : val,
                label: label,
                isHighlighted: idx === top, // Highlight where Top is pointing (next insert slot)
                isGhost: val === null // Visually deemphasize empty slots
            });
        });

        return visualItems;
    }, []);

    const { run } = useSkulptEngine({ dataMapper });

    return { runSimulation: run };
}
