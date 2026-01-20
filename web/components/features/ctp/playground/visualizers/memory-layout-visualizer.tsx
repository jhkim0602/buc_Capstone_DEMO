"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MemoryCell {
  address: string; // e.g., "0x0004"
  value: any;      // e.g., "A", 65, or 0x41
  isHighlighted?: boolean;
  isCached?: boolean; // Part of active cache line
}

interface MemoryLayoutVisualizerProps {
  data: MemoryCell[];
  cacheLineSize?: number; // e.g., 4 or 8 bytes
}

export function MemoryLayoutVisualizer({
    data,
    cacheLineSize = 4
}: MemoryLayoutVisualizerProps) {

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-border">
       <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 font-mono text-sm">

          {/* Header */}
          <div className="text-muted-foreground text-right border-b pb-2">Address</div>
          <div className="text-muted-foreground border-b pb-2">Value (Memory Block)</div>

          {/* Rows */}
          <div className="contents">
             {data.map((cell, idx) => {
                 // Group by rows just for layout if needed, but here using CSS Grid simple row
                 // Actually for "Memory View", we often want 8 bytes per row.
                 // Let's stick to simple list for now, or grid of boxes.
                 return (
                     <motion.div
                        key={cell.address}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={cn(
                            "contents group",
                            cell.isCached ? "text-blue-600 dark:text-blue-400 font-bold" : "text-muted-foreground"
                        )}
                     >
                        {/* Address Column */}
                        <div className={cn(
                            "py-1 px-2 text-right border-r border-border/50",
                            cell.isHighlighted && "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 font-bold"
                        )}>
                            {cell.address}
                        </div>

                        {/* Value Column */}
                        <div className={cn(
                            "py-1 px-3 flex items-center gap-4 transition-colors",
                            cell.isCached && "bg-blue-50 dark:bg-blue-900/20",
                            cell.isHighlighted && "bg-yellow-100 dark:bg-yellow-900/30 ring-1 ring-yellow-500"
                        )}>
                            <span className="w-8 text-center">{cell.value}</span>

                            {cell.isCached && (
                                <span className="text-[10px] ml-auto uppercase tracking-wide opacity-70 bg-blue-100 dark:bg-blue-800 px-1.5 rounded">
                                    Cache Line
                                </span>
                            )}
                        </div>
                     </motion.div>
                 );
             })}
          </div>
       </div>
    </div>
  );
}
