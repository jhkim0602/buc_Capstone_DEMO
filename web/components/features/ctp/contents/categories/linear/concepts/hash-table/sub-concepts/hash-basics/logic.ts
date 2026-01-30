import { useCallback, useState } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";

const BASE_ITEMS: VisualItem[] = [
  { id: 0, value: 3, label: "A" },
  { id: 1, value: 7, label: "B" },
  { id: 2, value: 9, label: "C" },
  { id: 3, value: 12, label: "D" },
];

export const useHashBasicsSimulation = () => {
  const [items, setItems] = useState<VisualItem[]>(BASE_ITEMS);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((p) => [`> ${msg}`, ...p]);

  const peek = () => {
    setItems(BASE_ITEMS.map((n, idx) => ({ ...n, status: idx === 0 ? "active" : undefined })));
    addLog("첫 번째 항목을 강조 표시합니다.");
  };

  const reset = () => {
    setItems(BASE_ITEMS);
    setLogs([]);
    addLog("초기 상태로 되돌립니다.");
  };

  const runSimulation = useCallback((code: string) => {
    console.log("Interactive Mode: code ignored", code);
  }, []);

  return {
    runSimulation,
    interactive: {
      visualData: items,
      logs,
      handlers: {
        peek,
        clear: reset,
      },
    },
  };
};
