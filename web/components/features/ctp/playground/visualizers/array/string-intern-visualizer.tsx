"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MemoryNode {
  id: string;
  value: string;
  type: "stack" | "heap" | "pool";
  address?: string; // e.g. @1004
  label?: string; // Variable name
  targetAddress?: string; // optimizing refs
}

interface StringInternVisualizerProps {
  data: MemoryNode[];
}

export function StringInternVisualizer({ data }: StringInternVisualizerProps) {
  // Defensive check: Prevent crash if store holds previous page's object state
  if (!Array.isArray(data)) return <div className="p-4 text-xs text-muted-foreground">Initializing Visualization...</div>;

  const stackItems = data.filter((d) => d.type === "stack");
  const poolItems = data.filter((d) => d.type === "pool");
  const heapItems = data.filter((d) => d.type === "heap");

  return (
    <div className="flex h-full w-full gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg font-mono text-sm overflow-hidden relative">

      {/* 1. Stack / References Area */}
      <div className="w-1/3 flex flex-col gap-4 border-r pr-4 border-dashed border-border/50">
        <h3 className="text-muted-foreground font-bold text-xs uppercase tracking-wider text-center">Stack (References)</h3>
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {stackItems.map((item) => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="bg-background border rounded-lg p-3 shadow-sm flex items-center justify-between"
              >
                <div className="flex flex-col">
                   <span className="font-bold text-primary">{item.label}</span>
                   <span className="text-[10px] text-muted-foreground">ref: {item.targetAddress}</span>
                </div>
                {/* Arrow head indicator */}
                <div className="text-muted-foreground">→</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Memory Area (Pool + Heap) */}
      <div className="flex-1 flex flex-col gap-6 relative">

          {/* String Constant Pool */}
          <div className="flex-1 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30 p-4 relative">
             <div className="absolute top-2 left-2 text-[10px] uppercase font-bold text-blue-500/70">String Constant Pool</div>
             <div className="flex flex-wrap gap-4 mt-6 content-start">
                <AnimatePresence>
                    {poolItems.map((item) => (
                        <motion.div
                           key={item.id}
                           layoutId={`mem-${item.address}`}
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           className="bg-white dark:bg-slate-800 shadow-sm border border-blue-200 dark:border-blue-700 px-3 py-2 rounded-md flex flex-col items-center min-w-[60px]"
                        >
                            <span className="text-lg font-serif">"{item.value}"</span>
                            <span className="text-[9px] text-muted-foreground mt-1 text-blue-400">{item.address}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
             </div>
          </div>

          {/* Heap Area */}
          <div className="flex-1 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800/30 p-4 relative">
            <div className="absolute top-2 left-2 text-[10px] uppercase font-bold text-amber-600/70">Heap Memory (Non-Pool)</div>
            <div className="flex flex-wrap gap-4 mt-6 content-start">
                <AnimatePresence>
                     {heapItems.map((item) => (
                         <motion.div
                            key={item.id}
                            layoutId={`mem-${item.address}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-white dark:bg-slate-800 shadow-sm border border-amber-200 dark:border-amber-700 px-3 py-2 rounded-md flex flex-col items-center min-w-[60px]"
                         >
                             <span className="text-lg font-serif">"{item.value}"</span>
                             <span className="text-[9px] text-muted-foreground mt-1 text-amber-500">{item.address}</span>
                         </motion.div>
                     ))}
                 </AnimatePresence>
            </div>
          </div>
      </div>

    </div>
  );
}
