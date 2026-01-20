import { useCTPStore, VisualStep } from "@/components/features/ctp/store/use-ctp-store";
import { useCallback } from "react";

const toGridItems = (matrix: number[][], highlightPos?: {r: number, c: number}) => {
    return matrix.map((row, rIdx) =>
        row.map((val, cIdx) => ({
            id: `cell-${rIdx}-${cIdx}`,
            value: val,
            isHighlighted: highlightPos ? (highlightPos.r === rIdx && highlightPos.c === cIdx) : false,
            label: `${rIdx},${cIdx}`
        }))
    );
};

export function useArray2DSimulation() {
  const setSteps = useCTPStore((state) => state.setSteps);
  const setPlayState = useCTPStore((state) => state.setPlayState);

  const runSimulation = useCallback((codeInput: string) => {
    const lines = codeInput.split('\n');
    const newSteps: VisualStep[] = [];

    // Initial Simulation State (3x3 default)
    let matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) return;

      // 1. Initialization: matrix = [[...], [...]]
      if (trimmed.includes('[[')) {
          try {
             const startIdx = trimmed.indexOf('[[');
             const sub = trimmed.substring(startIdx);
             // Simple python list parser (replace python syntax if needed, but JSON.parse works for [[1,2]])
             const cleanStr = sub.replace(/;/g, '');
             const parsed = JSON.parse(cleanStr);
             if (Array.isArray(parsed) && Array.isArray(parsed[0])) {
                 matrix = parsed;
                 newSteps.push({
                    id: `step-${lineIdx}`,
                    description: `Initialize Matrix ${matrix.length}x${matrix[0].length}`,
                    data: toGridItems([...matrix]) as any,
                    activeLine: lineIdx + 1
                 });
                 return;
             }
          } catch (e) {
             // parsing failed
          }
      }

      // 2. Update Cell: matrix[r][c] = val
      // Python style: matrix[0][0] = 99
      const updateMatch = trimmed.match(/(\w+)\[(\d+)\]\[(\d+)\]\s*=\s*(\d+)/);
      if (updateMatch) {
          const r = parseInt(updateMatch[2]);
          const c = parseInt(updateMatch[3]);
          const val = parseInt(updateMatch[4]);

          if (r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length) {
              const newMatrix = matrix.map(row => [...row]); // Deep copy-ish
              newMatrix[r][c] = val;
              matrix = newMatrix;
              newSteps.push({
                  id: `step-${lineIdx}`,
                  description: `Update matrix[${r}][${c}] = ${val}`,
                  data: toGridItems(matrix, {r, c}) as any,
                  activeLine: lineIdx + 1
              });
              return;
          }
      }
    });

    if (newSteps.length === 0) {
        newSteps.push({
            id: 'init',
            description: 'Initialized 3x3 Matrix',
            data: toGridItems(matrix) as any
        });
    }

    setSteps(newSteps);
    setPlayState('playing');
  }, [setSteps, setPlayState]);

  return { runSimulation };
}
