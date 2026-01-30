"use client";

import { ReactNode } from "react";
import { useCTPStore } from "../store/use-ctp-store";
import { CTPPlayground } from "./ctp-playground";

interface CTPHeapSortPlaygroundProps {
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

export function CTPHeapSortPlayground({ initialCode, visualizer, onRun }: CTPHeapSortPlaygroundProps) {
  const { steps, currentStepIndex } = useCTPStore();
  const payload = steps[currentStepIndex]?.data as any;
  const heapSize = payload?.heapSize ?? "-";
  const activeIndex = payload?.activeIndex ?? "-";
  const compareIndices = Array.isArray(payload?.compareIndices) ? payload.compareIndices.join(", ") : "-";
  const swapIndices = Array.isArray(payload?.swapIndices) ? payload.swapIndices.join(", ") : "-";

  const header = (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
        {legend.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ring-1 ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
        <span className="rounded-md border border-border bg-muted/40 px-2 py-1">heapSize: {heapSize}</span>
        <span className="rounded-md border border-border bg-muted/40 px-2 py-1">active: {activeIndex}</span>
        <span className="rounded-md border border-border bg-muted/40 px-2 py-1">compare: {compareIndices || "-"}</span>
        <span className="rounded-md border border-border bg-muted/40 px-2 py-1">swap: {swapIndices || "-"}</span>
      </div>
    </div>
  );

  return (
    <CTPPlayground
      initialCode={initialCode}
      onRun={onRun}
      visualizer={
        <div className="h-full w-full flex flex-col gap-3">
          {header}
          <div className="flex-1 min-h-0">{visualizer}</div>
        </div>
      }
    />
  );
}
