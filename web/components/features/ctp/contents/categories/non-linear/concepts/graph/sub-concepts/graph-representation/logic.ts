import { useCallback, useState } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";

const BASE_NODES: VisualItem[] = [
  { id: "A", value: "A" },
  { id: "B", value: "B" },
  { id: "C", value: "C" },
];

const BASE_EDGES = [
  { source: "A", target: "B" },
  { source: "A", target: "C" },
];

export const useGraphRepresentationSimulation = () => {
  const [nodes, setNodes] = useState<VisualItem[]>(BASE_NODES);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((p) => [`> ${msg}`, ...p]);

  const peek = () => {
    setNodes(BASE_NODES.map((n) => ({ ...n, status: n.id === "A" ? "active" : undefined })));
    addLog("핵심 노드를 강조 표시합니다.");
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
        peek,
        clear: reset,
      },
    },
  };
};
