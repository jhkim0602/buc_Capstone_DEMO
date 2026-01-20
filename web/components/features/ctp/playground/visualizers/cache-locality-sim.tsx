"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CacheSimState {
    mode: "row-major" | "col-major";
    hits: number;
    misses: number;
    activeRow: number;
    activeCol: number;
    highlightedBlock?: number; // Cache Line Block ID
}

interface CacheLocalitySimProps {
    data: CacheSimState;
}

export function CacheLocalitySim({ data }: CacheLocalitySimProps) {
    // 8x8 Grid
    const gridSize = 8;
    const cacheLineSize = 4; // 1 block = 4 cells

    const renderCell = (row: number, col: number) => {
        const addr = row * gridSize + col;
        const blockId = Math.floor(addr / cacheLineSize);
        const isActive = row === data.activeRow && col === data.activeCol;
        const isBlockCached = data.highlightedBlock === blockId;

        // Visual State
        let bgClass = "bg-white dark:bg-slate-800";
        if (isActive) {
             // Hit or Miss?
             // Logic doesn't tell us directly "isHit" for *this* frame, but highlightedBlock implies it's loaded.
             bgClass = "bg-yellow-400 border-yellow-600 scale-110 shadow-lg z-10";
        } else if (isBlockCached) {
             bgClass = "bg-blue-100 dark:bg-blue-900/40";
        }

        return (
            <motion.div
                key={`${row}-${col}`}
                layout
                className={cn(
                    "w-8 h-8 rounded border text-[10px] flex items-center justify-center font-mono transition-colors duration-200",
                    bgClass
                )}
            >
                {addr}
            </motion.div>
        );
    };

    return (
        <div className="flex flex-col gap-6 h-full p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
             <div className="flex justify-between items-center px-4">
                 <div className="flex gap-4 text-sm font-bold">
                     <div className="text-green-600">Hits: {data.hits}</div>
                     <div className="text-red-500">Misses: {data.misses}</div>
                 </div>
                 <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                     Mode: {data.mode}
                 </div>
             </div>

             <div className="flex justify-center items-center flex-1">
                 <div className="grid grid-cols-8 gap-1">
                     {Array.from({ length: gridSize }).map((_, row) =>
                         Array.from({ length: gridSize }).map((_, col) => renderCell(row, col))
                     )}
                 </div>
             </div>

             <div className="mt-2 text-center text-xs text-muted-foreground">
                 {data.mode === 'row-major'
                    ? "🚀 순차 접근: 캐시 라인을 최대한 활용합니다."
                    : "⚠️ 도약 접근: 매번 다른 캐시 라인을 호출하여 Miss가 발생합니다."}
             </div>
        </div>
    );
}
