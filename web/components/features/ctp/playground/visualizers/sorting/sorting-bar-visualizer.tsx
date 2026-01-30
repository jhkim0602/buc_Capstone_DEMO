"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";
import { CTPEmptyState } from "@/components/features/ctp/common/components/ctp-empty-state";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SortingBarVisualizerProps {
  data: VisualItem[];
  emptyMessage?: string;
}

const STATUS_CLASS: Record<string, string> = {
  active: "bg-blue-500/80 ring-2 ring-blue-400",
  comparing: "bg-amber-400 ring-2 ring-amber-300",
  success: "bg-emerald-500/80 ring-2 ring-emerald-400",
  found: "bg-emerald-500/80 ring-2 ring-emerald-400",
  visited: "bg-slate-300",
};

export function SortingBarVisualizer({ data, emptyMessage = "데이터가 없습니다." }: SortingBarVisualizerProps) {
  const items = Array.isArray(data) ? data : [];
  const [zoom, setZoom] = useState(1);
  const idPoolRef = useRef<Record<string, string[]>>({});
  const idCounterRef = useRef(0);

  const { maxValue, bars, nextPool } = useMemo(() => {
    const values = items.map((item) => {
      const num = typeof item.value === "number" ? item.value : Number(item.value);
      return Number.isFinite(num) ? Math.abs(num) : 0;
    });
    const maxValue = Math.max(1, ...values);
    const prevPool = idPoolRef.current ?? {};
    const nextPool: Record<string, string[]> = {};

    const bars = items.map((item, idx) => {
      const raw = typeof item.value === "number" ? item.value : Number(item.value);
      const safe = Number.isFinite(raw) ? raw : 0;
      const valueKey = String(item.value ?? safe);
      const pool = prevPool[valueKey];
      const existingId = pool && pool.length > 0 ? pool.shift() : undefined;
      const id = existingId ?? `bar-${idCounterRef.current++}`;

      if (!nextPool[valueKey]) nextPool[valueKey] = [];
      nextPool[valueKey].push(id);

      return {
        id,
        value: safe,
        label: item.label ?? String(idx),
        status: item.status,
      };
    });
    return { maxValue, bars, nextPool };
  }, [items]);

  useEffect(() => {
    if (!items || items.length === 0) {
      idPoolRef.current = {};
      return;
    }
    idPoolRef.current = nextPool ?? {};
  }, [items, nextPool]);

  const clampZoom = (value: number) => Math.max(0.6, Math.min(1.4, value));

  if (!items || items.length === 0) {
    return <CTPEmptyState message={emptyMessage} />;
  }

  return (
    <div className="h-full w-full min-h-[260px] self-stretch rounded-md bg-muted/5 p-4 relative overflow-hidden">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2 py-1 text-[10px] text-muted-foreground">
        <button
          className="h-5 w-5 rounded border border-border bg-muted/30 text-xs hover:bg-muted"
          onClick={() => setZoom((prev) => clampZoom(prev - 0.1))}
          aria-label="Zoom out"
        >
          -
        </button>
        <span>{Math.round(zoom * 100)}%</span>
        <button
          className="h-5 w-5 rounded border border-border bg-muted/30 text-xs hover:bg-muted"
          onClick={() => setZoom((prev) => clampZoom(prev + 0.1))}
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          className="h-5 rounded border border-border bg-muted/30 px-1.5 text-[9px] hover:bg-muted"
          onClick={() => setZoom(1)}
        >
          Reset
        </button>
      </div>

      <div className="h-full w-full overflow-auto">
        <div
          className="h-[280px] w-full flex items-end gap-2"
          style={{ transform: `scale(${zoom})`, transformOrigin: "bottom center" }}
        >
          {bars.map((bar) => {
            const heightPct = Math.max(6, Math.round((Math.abs(bar.value) / maxValue) * 100));
            const statusClass = bar.status ? STATUS_CLASS[bar.status] ?? "bg-slate-400" : "bg-slate-400";
            return (
              <motion.div
                key={bar.id}
                layout="position"
                transition={{ type: "spring", damping: 24, stiffness: 220 }}
                className="flex-1 min-w-[12px] h-full flex flex-col items-center justify-end gap-2"
              >
                <div
                  className={cn("w-full rounded-none", statusClass)}
                  style={{ height: `${heightPct}%`, minHeight: "12px" }}
                  title={`${bar.value}`}
                />
                <div className="text-[10px] text-muted-foreground font-mono">{bar.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
