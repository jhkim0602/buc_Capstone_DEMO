import { useSkulptEngine } from "@/hooks/use-skulpt-engine";
import { SkulptAdapter } from "@/components/features/ctp/common/skulpt-adapter";
import { VisualItem } from "@/components/features/ctp/common/types";

export interface MonotonicStackVisualData {
    input: VisualItem[];
    stack: VisualItem[]; // Horizontal Array (1D)
    result: VisualItem[];
}

import { useCallback } from "react";

export const useMonotonicStackSimulation = () => {
    // [FIX] Stabilize dataMapper with useCallback to prevent Worker Re-initialization Loop
    const dataMapper = useCallback((globals: any) => {
        // 1. Extract Variables
        const numsRaw = globals["nums"] || [];
        const stackIndices = globals["stack"] || [];
        const resultRaw = globals["result"] || [];

        // Loop variable 'i'
        const iVal = globals["i"];
        const currentIndex = (typeof iVal === 'number') ? iVal : -1;

        // 2. Map Input Array (nums)
        const inputItems = SkulptAdapter.toLinearItems(numsRaw);
        inputItems.forEach((item, idx) => {
            if (idx === currentIndex) {
                item.isHighlighted = true;
                item.status = 'active'; // BLUE (Scanning)
                item.label = "i";
            }
        });

        // 3. Map Stack (Horizontal Array)
        // 1D structure: [{...}, {...}] -> Visualized Left to Right
        const stackItems: VisualItem[] = stackIndices.map((idx: any, sIdx: number) => {
            const val = numsRaw[idx];
            let status: 'default' | 'comparing' | 'pop' = 'default';

            // Logic: Determine Status based on current 'i'
            // Only valid if 'i' is within bounds
            if (currentIndex >= 0 && currentIndex < numsRaw.length) {
                // If this item is the TOP of the stack (last element)
                if (sIdx === stackIndices.length - 1) {
                    const currentVal = numsRaw[currentIndex];
                    // Condition: check if pop is needed (val < currentVal)
                    if (val < currentVal) {
                        status = 'pop'; // RED (About to pop)
                    } else {
                        status = 'comparing'; // YELLOW (Comparing)
                    }
                }
            }

            return {
                id: `stack-${idx}`,
                value: val,
                label: `Idx: ${idx}`,
                isHighlighted: false,
                status: status
            };
        });
        // No reverse needed for horizontal growth (Bottom -> Top corresponds to Left -> Right)

        // 4. Map Result Array
        // Map filled results as GREEN
        const resultItems = SkulptAdapter.toLinearItems(resultRaw);
        resultItems.forEach((item) => {
            if (item.value !== -1) {
                item.status = 'success'; // GREEN (Result Found)
            }
        });

        return {
            input: inputItems,
            stack: stackItems,
            result: resultItems
        };
    }, []); // No dependencies (pure transformation)

    const engine = useSkulptEngine({
        dataMapper
    });

    return {
        runSimulation: engine.run,
        reset: engine.reset,
        status: engine.status,
        error: engine.error,
    };
};
