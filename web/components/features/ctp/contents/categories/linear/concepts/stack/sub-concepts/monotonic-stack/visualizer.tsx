import React from 'react';
import { ArrayGraphVisualizer } from '@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer';
import { MonotonicStackVisualData } from './logic';
import { CTPEmptyState } from '@/components/features/ctp/common/components/ctp-empty-state';
import { cn } from "@/lib/utils";

import { createPortal } from 'react-dom';

interface MonotonicStackVisualizerProps {
    data: MonotonicStackVisualData | null;
}

export function MonotonicStackVisualizer({ data }: MonotonicStackVisualizerProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!data) {
        return <CTPEmptyState message="시뮬레이션을 시작해주세요." />;
    }

    // Helper to safely get the 1D input array (in case it's wrapped or undefined)
    const rawInput = data.input || [];
    const inputArray = (rawInput.length > 0 && Array.isArray(rawInput[0]))
        ? (rawInput as any)[0]
        : rawInput;

    // Portal Content: Input Array (Compact Strip)
    const inputBox = (
        <div className="w-full flex items-center justify-between gap-4 p-4 min-h-[80px]">
            <span className="text-xs font-bold text-muted-foreground bg-background/80 px-2 py-1 rounded shadow-sm border whitespace-nowrap">
                Input Array (입력)
            </span>
            <div className="flex-1 flex gap-2 overflow-x-auto items-center pb-2 custom-scrollbar">
                {inputArray.map((item: any, idx: number) => (
                    <div
                        key={idx}
                        className={cn(
                            "w-10 h-10 flex-none flex items-center justify-center text-sm font-bold shadow-sm border-2 rounded-lg transition-all duration-300 select-none",
                            item.isHighlighted
                                ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20 scale-110 z-10"
                                : item.isGhost
                                    ? "border-dashed border-muted-foreground/30 bg-muted/10 text-muted-foreground/30"
                                    : "border-border bg-card text-foreground"
                        )}
                    >
                        {item.value}
                    </div>
                ))}
            </div>
        </div>
    );

    const footerTarget = mounted ? document.getElementById('ctp-playground-footer') : null;

    // Helper for compact empty state
    const CompactEmptyState = ({ label }: { label: string }) => (
        <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground gap-2 opacity-50">
            <div className="text-xs font-mono border border-dashed border-border px-3 py-2 rounded-md bg-muted/30">
                {label} 대기 중...
            </div>
        </div>
    );

    const isResultEmpty = !data.result || data.result.length === 0;
    const isStackEmpty = !data.stack || data.stack.length === 0;

    return (
        <div className="flex flex-col h-full w-full relative bg-muted/5 font-sans">

            {/* 1. Result Array Section (Top) */}
            <div className="flex-none h-[25%] min-h-[160px] p-2 z-10 relative">
                <div className="w-full h-full border rounded-xl bg-card relative overflow-hidden shadow-sm">
                    <div className="absolute top-2 left-3 z-10 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-card/70 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm ring-1 ring-border/50">
                        Result Array (오큰수 정답)
                    </div>
                    {/* Controls disabled + Compact Empty State */}
                    {isResultEmpty ? (
                        <CompactEmptyState label="Result Array" />
                    ) : (
                        <ArrayGraphVisualizer data={data.result} withControls={false} />
                    )}
                </div>
            </div>

            {/* 2. Monotonic Stack Section (Member, Center, Full Remaining) */}
            <div className="flex-1 w-full relative min-h-0">
                <div className="absolute inset-0 p-2 pt-0 pb-2">
                    {/* Full height container for Stack */}
                    <div className="w-full h-full border rounded-xl bg-card relative overflow-hidden shadow-sm">
                        {/* Centered Label */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                            <span className="text-sm font-bold text-foreground bg-background/80 px-4 py-1.5 rounded-full backdrop-blur-md shadow-sm border ring-1 ring-border/50">
                                Monotonic Stack
                            </span>
                        </div>
                        {isStackEmpty ? (
                            <CompactEmptyState label="Monotonic Stack" />
                        ) : (
                            <ArrayGraphVisualizer data={data.stack} withControls={false} />
                        )}
                    </div>
                </div>

                {/* 3. Input Array Section (Portaled to Bottom Footer) */}
                {/* Visualizer logic decides: if footer exists, render there. */}
                {footerTarget && createPortal(inputBox, footerTarget)}
            </div>
        </div>
    );
}
