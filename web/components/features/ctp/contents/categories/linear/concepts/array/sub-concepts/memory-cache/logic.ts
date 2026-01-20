import { useCTPStore, VisualStep } from "@/components/features/ctp/store/use-ctp-store";
import { useCallback } from "react";

// Cache Line Size = 4 elements
const CACHE_LINE_SIZE = 4;
const GRID_SIZE = 8;

interface CacheSimState {
    mode: "row-major" | "col-major";
    hits: number;
    misses: number;
    activeRow: number;
    activeCol: number;
    highlightedBlock?: number;
}

export function useMemorySimulation() {
  const setSteps = useCTPStore((state) => state.setSteps);
  const setPlayState = useCTPStore((state) => state.setPlayState);

  const runSimulation = useCallback((codeInput: string) => {
    const lines = codeInput.split('\n');
    const newSteps: VisualStep[] = [];

    // Determine Mode based on code analysis
    let mode: "row-major" | "col-major" = "row-major";
    if (codeInput.includes("Col Major") || codeInput.includes("col-major")) {
        mode = "col-major";
    }

    // Simulation State
    let hits = 0;
    let misses = 0;
    let lastLoadedBlock: number | null = null;
    let stepCount = 0;

    const generateAccessStep = (r: number, c: number, line: number) => {
        const addr = r * GRID_SIZE + c;
        const blockId = Math.floor(addr / CACHE_LINE_SIZE);

        const isHit = lastLoadedBlock === blockId;
        if (isHit) hits++;
        else {
            misses++;
            lastLoadedBlock = blockId;
        }

        const state: CacheSimState = {
            mode,
            hits,
            misses,
            activeRow: r,
            activeCol: c,
            highlightedBlock: blockId
        };

        newSteps.push({
            id: `step-${stepCount++}`,
            description: `Access [${r}][${c}] -> ${isHit ? "HIT 🟢" : "MISS 🔴 (Load Block)"}`,
            data: state,
            activeLine: line
        });
    };

    // Find the loop start line for visual aid
    const loopStartLine = lines.findIndex(l => l.includes("for"));

    if (mode === 'row-major') {
        for(let r=0; r<GRID_SIZE; r++) {
            for(let c=0; c<GRID_SIZE; c++) {
                 generateAccessStep(r, c, loopStartLine >= 0 ? loopStartLine + 2 : 1);
            }
        }
    } else {
        // Col Major
        for(let c=0; c<GRID_SIZE; c++) {
            for(let r=0; r<GRID_SIZE; r++) {
                generateAccessStep(r, c, loopStartLine >= 0 ? loopStartLine + 2 : 1);
            }
        }
    }

    if (newSteps.length === 0) {
        newSteps.push({
            id: 'init',
            description: "Ready to Simulate Cache Locality",
            data: { mode, hits: 0, misses: 0, activeRow: -1, activeCol: -1 } as CacheSimState,
            activeLine: 0
        });
    }

    setSteps(newSteps);
    setPlayState('playing');
  }, [setSteps, setPlayState]);

  return { runSimulation };
}
