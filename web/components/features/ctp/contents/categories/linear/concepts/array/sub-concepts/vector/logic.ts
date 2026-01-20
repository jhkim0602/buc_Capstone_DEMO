import { useCTPStore, VisualStep } from "@/components/features/ctp/store/use-ctp-store";
import { useCallback } from "react";

// For chart
interface CostData {
    step: number;
    cost: number;
    isResize: boolean;
    capacity: number;
}

// Helper to create visual items with Capacity (Ghosts)
const toVectorItems = (arr: number[], capacity: number) => {
    const items = arr.map((val, idx) => ({
        id: `item-${idx}`,
        value: val,
        label: idx.toString(),
        isGhost: false
    }));

    // Fill remaining capacity with ghosts
    for (let i = arr.length; i < capacity; i++) {
        items.push({
            id: `ghost-${i}`,
            value: null as any,
            label: i.toString(),
            isGhost: true
        });
    }
    return items;
};

export function useVectorSimulation() {
    const setSteps = useCTPStore((state) => state.setSteps);
    const setPlayState = useCTPStore((state) => state.setPlayState);

    const runSimulation = useCallback((codeInput: string) => {
        const lines = codeInput.split('\n');
        const newSteps: VisualStep[] = [];

        // Simulation State
        let simulatedArr: number[] = [];
        let capacity = 2; // Demo default (Python impl detail varies, but 2 is good for demo)
        const costHistory: CostData[] = [];
        let stepCounter = 0;

        // Initial state

        lines.forEach((line, lineIdx) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) return;

            // Python: append(x)
            let pushVal: number | null = null;
            if (trimmed.includes('.append(')) {
                const match = trimmed.match(/\((\d+)\)/);
                if (match) pushVal = parseInt(match[1]);
                else pushVal = stepCounter * 10;
            }

            if (pushVal !== null) {
                stepCounter++;
                let currentCost = 1;

                // Check Resize need
                if (simulatedArr.length >= capacity) {
                    // Resize Event!
                    // Python growth is approx 1.125 + const, but simplistic 2x is easier for algo visualization
                    capacity *= 2;
                    currentCost = simulatedArr.length; // Cost is N

                    costHistory.push({
                        step: stepCounter,
                        cost: currentCost,
                        isResize: true,
                        capacity
                    });

                    newSteps.push({
                        id: `step-${lineIdx}-resize`,
                        description: `⚠️ Resize Triggered! New Capacity ${capacity}. Cost: O(N)`,
                        data: {
                            data: toVectorItems([...simulatedArr], capacity),
                            costHistory: [...costHistory], // snapshot
                            capacity,
                            size: simulatedArr.length
                        },
                        activeLine: lineIdx + 1
                    });
                } else {
                    costHistory.push({
                        step: stepCounter,
                        cost: 1,
                        isResize: false,
                        capacity
                    });
                }

                simulatedArr.push(pushVal);

                newSteps.push({
                    id: `step-${lineIdx}`,
                    description: `append(${pushVal}). Size: ${simulatedArr.length}/${capacity}. Cost: O(1)`,
                    data: {
                        data: toVectorItems([...simulatedArr], capacity),
                        costHistory: [...costHistory],
                        capacity,
                        size: simulatedArr.length
                    },
                    activeLine: lineIdx + 1
                });
            }
        });

        setSteps(newSteps);
        setPlayState('playing');

    }, [setSteps, setPlayState]);

    return { runSimulation };
}
