"use client";

import { ArrayGraphVisualizer } from "./array-graph-visualizer";
import { AmortizedCostChart } from "../amortized-cost-chart";
import { cn } from "@/lib/utils";

interface VectorGraphVisualizerProps {
    data: any;
}

export function VectorGraphVisualizer({ data: inputData }: VectorGraphVisualizerProps) {
    // Unpack data based on structure
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
            {/* 1. Main Array View (Graph-based) */}
            <div className="flex-1 relative min-h-[300px] flex flex-col border rounded-lg overflow-hidden">
                {/* HUD: Size / Capacity */}
                <div className="absolute top-4 left-4 z-10 flex gap-4 text-xs font-mono bg-background/80 p-2 rounded border backdrop-blur-sm">
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

                {/* Use the new ArrayGraphVisualizer for the actual nodes */}
                <div className="flex-1">
                    <ArrayGraphVisualizer data={data || []} />
                </div>
            </div>

            {/* 2. Cost Chart */}
            <div className="h-1/3 bg-background border rounded-lg p-4 shadow-sm min-h-[150px]">
                <AmortizedCostChart data={costHistory || []} />
            </div>
        </div>
    );
}
