import { useCallback, useState } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";

const BASE_HEAP = [3, 5, 7, 9, 11, 13];

const buildVisual = (
  heap: number[],
  activeIndex: number | null
): { nodes: VisualItem[]; edges: { source: string; target: string }[] } => {
  const nodes: VisualItem[] = heap.map((val, idx) => ({
    id: String(idx),
    value: val,
    label: `[${idx}]`,
    status: activeIndex === idx ? "active" : undefined,
  }));

  const edges: { source: string; target: string }[] = [];
  heap.forEach((_, idx) => {
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;
    if (left < heap.length) edges.push({ source: String(idx), target: String(left) });
    if (right < heap.length) edges.push({ source: String(idx), target: String(right) });
  });

  return { nodes, edges };
};

export const useHeapBasicsSimulation = () => {
  const [heap, setHeap] = useState<number[]>(BASE_HEAP);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((p) => [`> ${msg}`, ...p]);

  const highlightRoot = () => {
    setActiveIndex(0);
    addLog("루트 노드를 강조 표시합니다.");
  };

  const reset = () => {
    setHeap(BASE_HEAP);
    setActiveIndex(null);
    setLogs([]);
    addLog("초기 힙으로 되돌립니다.");
  };

  const { nodes, edges } = buildVisual(heap, activeIndex);
  const runSimulation = useCallback((code: string) => {
    console.log("Interactive Mode: code ignored", code);
  }, []);

  return {
    runSimulation,
    interactive: {
      visualData: nodes,
      edges,
      logs,
      handlers: {
        peek: highlightRoot,
        clear: reset,
      },
    },
  };
};
