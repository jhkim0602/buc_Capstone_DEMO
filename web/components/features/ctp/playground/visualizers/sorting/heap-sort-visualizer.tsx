"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { CTPEmptyState } from "@/components/features/ctp/common/components/ctp-empty-state";
import { VisualItem } from "@/components/features/ctp/common/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface HeapSortVisualizerProps {
  data: {
    array?: VisualItem[];
    heapSize?: number;
    activeIndex?: number;
    compareIndices?: number[];
    swapIndices?: number[];
  };
  emptyMessage?: string;
}

const STATUS_CLASS: Record<string, string> = {
  active: "border-blue-500 bg-blue-500/10 text-blue-700",
  comparing: "border-amber-400 bg-amber-200/40 text-amber-700",
  success: "border-emerald-500 bg-emerald-200/40 text-emerald-700",
};

const BarStrip = ({ items }: { items: VisualItem[] }) => {
  const idPoolRef = useRef<Record<string, string[]>>({});
  const idCounterRef = useRef(0);

  const values = items.map((item) => {
    const num = typeof item.value === "number" ? item.value : Number(item.value);
    return Number.isFinite(num) ? Math.abs(num) : 0;
  });
  const maxValue = Math.max(1, ...values);

  const { bars, nextPool } = useMemo(() => {
    const prevPool = idPoolRef.current ?? {};
    const nextPool: Record<string, string[]> = {};

    const bars = items.map((item, idx) => {
      const valueKey = String(item.value ?? idx);
      const pool = prevPool[valueKey];
      const existingId = pool && pool.length > 0 ? pool.shift() : undefined;
      const id = existingId ?? `bar-${idCounterRef.current++}`;
      if (!nextPool[valueKey]) nextPool[valueKey] = [];
      nextPool[valueKey].push(id);
      return { ...item, __stableId: id };
    });

    return { bars, nextPool };
  }, [items]);

  useEffect(() => {
    idPoolRef.current = nextPool;
  }, [nextPool]);

  return (
    <div className="h-[240px] w-full flex items-end gap-2 rounded-md border border-border bg-background/70 p-3">
      {bars.map((item, idx) => {
        const raw = typeof item.value === "number" ? item.value : Number(item.value);
        const safe = Number.isFinite(raw) ? raw : 0;
        const heightPct = Math.max(6, Math.round((Math.abs(safe) / maxValue) * 100));
        const statusClass = item.status ? STATUS_CLASS[item.status] ?? "bg-slate-400" : "bg-slate-400";
        const sorted = item.status === "success";
        return (
          <motion.div
            key={(item as any).__stableId ?? item.id ?? `bar-${idx}`}
            layout="position"
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            className="flex-1 min-w-[10px] h-full flex flex-col items-center justify-end gap-2"
          >
            <div
              className={cn(
                "w-full rounded-none transition-all duration-200",
                statusClass,
                sorted && "opacity-70"
              )}
              style={{ height: `${heightPct}%`, minHeight: "10px" }}
              title={`${safe}`}
            />
            <div className="text-[9px] text-muted-foreground font-mono">{item.label ?? idx}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

export function HeapSortVisualizer({ data, emptyMessage = "코드를 실행하여 시각화를 시작해보세요!" }: HeapSortVisualizerProps) {
  const payload = Array.isArray(data) ? { array: data } : data;

  if (!payload || !payload.array || payload.array.length === 0) {
    return <CTPEmptyState message={emptyMessage} />;
  }

  const heapSize = payload.heapSize ?? payload.array.length;

  const levels = useMemo(() => {
    const rows: Array<{ idx: number; item: VisualItem }[]> = [];
    payload.array?.forEach((item, idx) => {
      const level = Math.floor(Math.log2(idx + 1));
      if (!rows[level]) rows[level] = [];
      rows[level].push({ idx, item });
    });
    return rows;
  }, [payload.array]);

  return (
    <div className="h-full w-full rounded-md bg-muted/5 p-4 flex flex-col gap-4 overflow-auto">
      <div className="flex flex-col gap-4">
        <div className="rounded-md border border-border bg-background/70 p-3">
          <div className="text-xs font-semibold text-muted-foreground mb-2">
            Heap Tree (size={heapSize})
          </div>
          <div className="flex flex-col gap-4">
            {levels.map((row, levelIdx) => (
              <div key={`level-${levelIdx}`} className="flex justify-center gap-4">
                {row.map(({ idx, item }) => {
                  const statusClass = item.status ? STATUS_CLASS[item.status] ?? "border-border" : "border-border";
                  const isSorted = idx >= heapSize;
                  return (
                    <div key={item.id ?? `heap-node-${idx}`} className="flex flex-col items-center gap-1">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-full border text-xs font-semibold flex items-center justify-center",
                          statusClass,
                          isSorted && "opacity-40"
                        )}
                      >
                        {item.value}
                      </div>
                      <div className="text-[9px] text-muted-foreground font-mono">{idx}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border bg-background/70 p-3">
          <div className="text-xs font-semibold text-muted-foreground mb-2">Array View</div>
          <BarStrip items={payload.array} />
        </div>
      </div>
    </div>
  );
}
