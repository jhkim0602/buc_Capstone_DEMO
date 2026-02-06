import { useCallback, useState } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";

const BASE_NODES: VisualItem[] = [
  { id: "A", value: "A", label: "d0 루트" },
  { id: "B", value: "B", label: "d1 내부" },
  { id: "C", value: "C", label: "d1 내부" },
  { id: "D", value: "D", label: "d1 내부" },
  { id: "E", value: "E", label: "d2 리프" },
  { id: "F", value: "F", label: "d2 리프" },
  { id: "G", value: "G", label: "d2 리프" },
  { id: "H", value: "H", label: "d2 내부" },
  { id: "I", value: "I", label: "d2 리프" },
  { id: "J", value: "J", label: "d3 리프" },
];

const BASE_EDGES = [
  { source: "A", target: "B", label: "1" },
  { source: "A", target: "C", label: "2" },
  { source: "A", target: "D", label: "3" },
  { source: "B", target: "E", label: "1" },
  { source: "B", target: "F", label: "2" },
  { source: "C", target: "G", label: "1" },
  { source: "D", target: "H", label: "1" },
  { source: "D", target: "I", label: "2" },
  { source: "H", target: "J", label: "1" },
];

const STAGES = ["structure", "distance", "size"] as const;
type StageKey = (typeof STAGES)[number];

const NODE_META: Record<string, { degree: number; level: number; type: string }> = {
  A: { degree: 3, level: 0, type: "root" },
  B: { degree: 2, level: 1, type: "internal" },
  C: { degree: 1, level: 1, type: "internal" },
  D: { degree: 2, level: 1, type: "internal" },
  E: { degree: 0, level: 2, type: "leaf" },
  F: { degree: 0, level: 2, type: "leaf" },
  G: { degree: 0, level: 2, type: "leaf" },
  H: { degree: 1, level: 2, type: "internal" },
  I: { degree: 0, level: 2, type: "leaf" },
  J: { degree: 0, level: 3, type: "leaf" },
};

const STAGE_MESSAGES: Record<StageKey, string> = {
  structure: `1/3 구조(차수·레벨·너비)
핵심값: degree(D)=2, tree degree=3, width=5.
포인트: level2(E,F,G,H,I)가 가장 넓습니다.`,
  distance: `2/3 거리
핵심값: distance(E,J)=5.
경로: E→B→A→D→H→J`,
  size: `3/3 크기(노드·트리·서브트리)
핵심값: node size(D)=4, tree size=10.
서브트리: {D,H,I,J}`,
};

const decorateByStage = (stage: StageKey): VisualItem[] =>
  BASE_NODES.map((node) => {
    if (stage === "structure") {
      if (node.id === "A") return { ...node, status: "active" };
      if (node.id === "B" || node.id === "C" || node.id === "D") return { ...node, status: "success" };
      if (node.id === "E" || node.id === "F" || node.id === "G" || node.id === "H" || node.id === "I") {
        return { ...node, status: "visited" };
      }
      return { ...node, status: "visited" };
    }

    if (stage === "distance") {
      if (node.id === "D" || node.id === "H") return { ...node, status: "comparing" };
      if (node.id === "E" || node.id === "B" || node.id === "A") return { ...node, status: "visited" };
      if (node.id === "J") return { ...node, status: "found" };
      return { ...node, status: undefined };
    }

    if (stage === "size") {
      if (node.id === "D") return { ...node, status: "active" };
      if (node.id === "H" || node.id === "I" || node.id === "J") return { ...node, status: "success" };
      if (node.id === "A") return { ...node, status: "comparing" };
      return { ...node, status: "visited" };
    }

    return node;
  });

export const useTreePropertiesSimulation = () => {
  const [nodes, setNodes] = useState<VisualItem[]>(BASE_NODES);
  const [logs, setLogs] = useState<string[]>([]);
  const [stageCursor, setStageCursor] = useState<number>(-1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<string[]>([
    "노드를 클릭하면 차수/레벨 정보를 확인할 수 있습니다.",
  ]);

  const addLog = (msg: string) => setLogs((prev) => [msg, ...prev]);

  const highlightNext = () => {
    setStageCursor((prev) => {
      const next = (prev + 1) % STAGES.length;
      const stage = STAGES[next];
      setNodes(decorateByStage(stage));
      addLog(STAGE_MESSAGES[stage]);
      return next;
    });
  };

  const reset = () => {
    setNodes(BASE_NODES);
    setLogs([]);
    setStageCursor(-1);
    setSelectedNodeId(null);
    setSelectedSummary(["노드를 클릭하면 차수/레벨 정보를 확인할 수 있습니다."]);
    addLog(`초기화 완료
안내: Peek 버튼으로 구조 → 거리 → 크기를 순서대로 확인하세요.`);
  };

  const selectNode = (nodeId: string | number) => {
    const id = String(nodeId);
    const meta = NODE_META[id];
    if (!meta) return;

    setSelectedNodeId(id);
    setSelectedSummary([
      `선택 노드: ${id}`,
      `차수: ${meta.degree}`,
      `레벨: ${meta.level}`,
      `유형: ${meta.type}`,
    ]);
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
      selectedNodeId,
      selectedSummary,
      onNodeSelect: selectNode,
      handlers: {
        peek: highlightNext,
        clear: reset,
        reset,
      },
    },
  };
};
