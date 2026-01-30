"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { CTPEmptyState } from "@/components/features/ctp/common/components/ctp-empty-state";
import { VisualItem } from "@/components/features/ctp/common/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MergeSortVisualizerProps {
  data: {
    array?: VisualItem[];
    left?: VisualItem[];
    right?: VisualItem[];
    merged?: VisualItem[];
    range?: [number, number];
    pointers?: {
      l?: number;
      m?: number;
      r?: number;
      i?: number;
      j?: number;
      k?: number;
      kIndex?: number;
    };
  };
  emptyMessage?: string;
}

const STATUS_CLASS: Record<string, string> = {
  active: "bg-blue-500/80 ring-2 ring-blue-400",
  comparing: "bg-amber-400 ring-2 ring-amber-300",
  success: "bg-emerald-500/80 ring-2 ring-emerald-400",
  found: "bg-emerald-500/80 ring-2 ring-emerald-400",
  visited: "bg-slate-300",
};

const BarRow = ({
  title,
  items,
  height = 160,
}: {
  title: string;
  items?: VisualItem[];
  height?: number;
}) => {
  const idPoolRef = useRef<Record<string, string[]>>({});
  const idCounterRef = useRef(0);
  const itemsList = items ?? [];

  const values = itemsList.map((item) => {
    const num = typeof item.value === "number" ? item.value : Number(item.value);
    return Number.isFinite(num) ? Math.abs(num) : 0;
  });
  const maxValue = Math.max(1, ...values);

  const { bars, nextPool } = useMemo(() => {
    const prevPool = idPoolRef.current ?? {};
    const nextPool: Record<string, string[]> = {};

    const bars = itemsList.map((item, idx) => {
      const valueKey = String(item.value ?? idx);
      const pool = prevPool[valueKey];
      const existingId = pool && pool.length > 0 ? pool.shift() : undefined;
      const id = existingId ?? `bar-${idCounterRef.current++}`;
      if (!nextPool[valueKey]) nextPool[valueKey] = [];
      nextPool[valueKey].push(id);
      return { ...item, __stableId: id };
    });

    return { bars, nextPool };
  }, [itemsList]);

  useEffect(() => {
    idPoolRef.current = nextPool;
  }, [nextPool]);

  if (!itemsList || itemsList.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold text-muted-foreground">{title}</div>
        <div className="h-10 rounded-md border border-dashed border-border/70 bg-muted/20 flex items-center justify-center text-xs text-muted-foreground">
          데이터 없음
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold text-muted-foreground">{title}</div>
      <div className="w-full rounded-md border border-border bg-background/70 p-3">
        <div className="flex items-end gap-2" style={{ height }}>
          {bars.map((item, idx) => {
            const raw = typeof item.value === "number" ? item.value : Number(item.value);
            const safe = Number.isFinite(raw) ? raw : 0;
            const heightPct = Math.max(6, Math.round((Math.abs(safe) / maxValue) * 100));
            const statusClass = item.status ? STATUS_CLASS[item.status] ?? "bg-slate-400" : "bg-slate-400";
            return (
              <motion.div
                key={(item as any).__stableId ?? item.id ?? `${title}-${idx}`}
                layout="position"
                transition={{ type: "spring", damping: 24, stiffness: 220 }}
                className="flex-1 min-w-[10px] h-full flex flex-col items-center justify-end gap-2"
              >
                <div
                  className={cn("w-full rounded-none transition-all duration-200", statusClass)}
                  style={{ height: `${heightPct}%`, minHeight: "10px" }}
                  title={`${safe}`}
                />
                <div className="text-[9px] text-muted-foreground font-mono">{item.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export function MergeSortVisualizer({ data, emptyMessage = "코드를 실행하여 시각화를 시작해보세요!" }: MergeSortVisualizerProps) {
  const payload = Array.isArray(data) ? { array: data } : data;

  if (!payload || !payload.array || payload.array.length === 0) {
    return <CTPEmptyState message={emptyMessage} />;
  }

  const { range, pointers } = payload;
  const l = pointers?.l ?? (range ? range[0] : undefined);
  const r = pointers?.r ?? (range ? range[1] : undefined);
  const m = pointers?.m;

  return (
    <div className="h-full w-full rounded-md bg-muted/5 p-4 flex flex-col gap-4 overflow-auto">
      <div className="flex flex-col gap-2 rounded-md border border-border bg-background/70 p-3">
        <div className="text-xs font-semibold text-muted-foreground">현재 분할 구간</div>
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <span className="rounded-md border border-border bg-muted/40 px-2 py-1">
            [{l ?? "-"}..{r ?? "-"}]
          </span>
          <span className="text-muted-foreground">mid</span>
          <span className="rounded-md border border-border bg-muted/40 px-2 py-1">
            {m ?? "-"}
          </span>
          <span className="text-muted-foreground">포인터</span>
          <span className="rounded-md border border-border bg-muted/40 px-2 py-1">i={pointers?.i ?? "-"}</span>
          <span className="rounded-md border border-border bg-muted/40 px-2 py-1">j={pointers?.j ?? "-"}</span>
          <span className="rounded-md border border-border bg-muted/40 px-2 py-1">k={pointers?.k ?? "-"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BarRow title="Left (분할된 왼쪽)" items={payload.left} height={140} />
        <BarRow title="Right (분할된 오른쪽)" items={payload.right} height={140} />
      </div>

      <BarRow title="Merged (병합 결과)" items={payload.merged} height={160} />
      <BarRow title="Array (전체)" items={payload.array} height={200} />
    </div>
  );
}
