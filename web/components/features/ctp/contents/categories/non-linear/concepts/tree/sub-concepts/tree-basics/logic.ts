import { useCallback, useState } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";

const BASE_NODES: VisualItem[] = [
  { id: "A", value: "A", label: "Root" },
  { id: "B", value: "B", label: "Child" },
  { id: "C", value: "C", label: "Child" },
  { id: "D", value: "D", label: "Leaf" },
  { id: "E", value: "E", label: "Leaf" },
  { id: "F", value: "F", label: "Leaf" },
];

const BASE_EDGES = [
  { source: "A", target: "B" },
  { source: "A", target: "C" },
  { source: "B", target: "D" },
  { source: "B", target: "E" },
  { source: "C", target: "F" },
];

export const useTreeBasicsSimulation = () => {
  const [nodes, setNodes] = useState<VisualItem[]>(BASE_NODES);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((p) => [`> ${msg}`, ...p]);

  const highlightRoot = () => {
    setNodes(BASE_NODES.map((n) => ({ ...n, status: n.id === "A" ? "active" : undefined })));
    addLog("루트 노드(A)를 강조 표시합니다.");
  };

  const reset = () => {
    setNodes(BASE_NODES);
    setLogs([]);
    addLog("초기 상태로 되돌립니다.");
  };

  const runSimulation = useCallback((code: string) => {
    console.log("Interactive Mode: code ignored", code);
  }, []);

  return {
    runSimulation,
    interactive: {
      visualData: nodes,
      edges: BASE_EDGES,
      logs,
      handlers: {
        peek: highlightRoot,
        clear: reset,
      },
    },
  };
};
