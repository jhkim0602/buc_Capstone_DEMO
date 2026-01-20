"use client";

import { LinearVisualizer } from "./linear-visualizer";
import { AmortizedCostChart } from "./amortized-cost-chart";
import { cn } from "@/lib/utils";

interface VectorVisualizerProps {
    data: any; // Can be array or object containing state
}

export function VectorVisualizer({ data: inputData }: VectorVisualizerProps) {
    // Unpack data based on structure
    // If inputData is our State Object { data, costHistory, ... }
    const { data, costHistory, capacity, size } = (inputData && !Array.isArray(inputData) && inputData.data)
        ? inputData
        : {
            data: Array.isArray(inputData) ? inputData : [],
            costHistory: [],
            capacity: 0,
            size: 0
        };

    return (
        <div className="flex flex-col h-full gap-4">
            {/* 1. Main Array View */}
            <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-border p-4 relative min-h-[200px] flex flex-col justify-center">
                 <div className="absolute top-3 left-4 flex gap-4 text-xs font-mono">
                     <div className="flex flex-col">
                         <span className="text-muted-foreground uppercase text-[10px]">Size</span>
                         <span className="font-bold text-lg">{size}</span>
                     </div>
                     <div className="flex flex-col">
                         <span className="text-muted-foreground uppercase text-[10px]">Capacity</span>
                         <span className={cn("font-bold text-lg transition-colors", size === capacity ? "text-red-500" : "text-foreground")}>
                            {capacity}
                         </span>
                     </div>
                 </div>

                 <LinearVisualizer data={data || []} orientation="horizontal" />
            </div>

            {/* 2. Cost Chart */}
            <div className="h-1/3 bg-background border rounded-lg p-4 shadow-sm">
                <AmortizedCostChart data={costHistory || []} />
            </div>
        </div>
    );
}
