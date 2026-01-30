"use client";

import { ReactNode } from "react";
import { useCTPStore } from "../store/use-ctp-store";
import { CTPPlayground } from "./ctp-playground";
import { VisualItem } from "../common/types";

interface CTPSortingPlaygroundProps {
  initialCode: string;
  visualizer: ReactNode;
  onRun?: (code: string) => void;
}

const legend = [
  { label: "활성", color: "bg-blue-500/80 ring-blue-400" },
  { label: "비교", color: "bg-amber-400 ring-amber-300" },
  { label: "완료", color: "bg-emerald-500/80 ring-emerald-400" },
  { label: "기본", color: "bg-slate-400 ring-slate-300" },
];

export function CTPSortingPlayground({ initialCode, visualizer, onRun }: CTPSortingPlaygroundProps) {
  const { steps, currentStepIndex } = useCTPStore();
  const stepData = steps[currentStepIndex]?.data;
  const items = Array.isArray(stepData) ? (stepData as VisualItem[]) : [];

  const activeIndex = items.findIndex((item) => item.status === "active");
  const comparingIndices = items.reduce<number[]>((acc, item, idx) => {
    if (item.status === "comparing") acc.push(idx);
    return acc;
  }, []);
  const successIndices = items.reduce<number[]>((acc, item, idx) => {
    if (item.status === "success") acc.push(idx);
    return acc;
  }, []);

  const visualWithLegend = (
    <div className="h-full w-full flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ring-1 ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
        <span>active: {activeIndex >= 0 ? activeIndex : "-"}</span>
        <span>comparing: {comparingIndices.length ? comparingIndices.join(", ") : "-"}</span>
        <span>sorted: {successIndices.length ? successIndices.join(", ") : "-"}</span>
      </div>
      <div className="flex-1 min-h-0">{visualizer}</div>
    </div>
  );

  return <CTPPlayground initialCode={initialCode} visualizer={visualWithLegend} onRun={onRun} />;
}
