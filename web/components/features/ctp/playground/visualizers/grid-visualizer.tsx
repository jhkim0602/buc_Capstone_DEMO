"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GridItem {
  id: string; // "row-col"
  row: number;
  col: number;
  value: number;
  isHighlighted?: boolean;
  color?: string; // Tailwind color class
}

interface GridVisualizerProps {
  data: GridItem[]; // Flat list of grid items
  rows: number;
  cols: number;
  emptyMessage?: string;
}

export function GridVisualizer({ data, rows, cols, emptyMessage }: GridVisualizerProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-foreground/50 text-sm font-mono">
        {emptyMessage || "No data to visualize"}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 overflow-auto">
      {/* Column Indices */}
      <div className="flex gap-2 ml-8 mb-[-8px]">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={`col-${c}`} className="w-12 text-center text-[10px] text-muted-foreground font-mono">
            {c}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {/* Row Indices */}
        <div className="flex flex-col gap-2 mt-2">
           {Array.from({ length: rows }).map((_, r) => (
             <div key={`row-${r}`} className="h-12 flex items-center justify-center text-[10px] text-muted-foreground font-mono w-6">
               {r}
             </div>
           ))}
        </div>

        {/* Matrix Grid */}
        <div
           className="grid gap-2 p-2 bg-background/50 border border-border/50 rounded-lg shadow-sm"
           style={{
             gridTemplateColumns: `repeat(${cols}, minmax(3rem, 1fr))`,
             gridTemplateRows: `repeat(${rows}, minmax(3rem, 1fr))`
           }}
        >
          <AnimatePresence mode="popLayout">
            {data.map((item) => (
              <motion.div
                key={item.id} // stable id "r-c"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  backgroundColor: item.isHighlighted ? "var(--primary)" : "var(--muted)",
                  color: item.isHighlighted ? "var(--primary-foreground)" : "var(--foreground)",
                  borderColor: item.isHighlighted ? "var(--primary)" : "var(--border)"
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                  "flex items-center justify-center rounded-md border text-sm font-bold font-mono shadow-sm z-10",
                  item.color // Custom override
                )}
              >
                {item.value}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
