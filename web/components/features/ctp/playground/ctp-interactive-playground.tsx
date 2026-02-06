"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Eye, RotateCcw } from "lucide-react";
import { StackGraphVisualizer } from "./visualizers/stack/graph/stack-graph-visualizer";
import { VisualItem } from "../common/types";

interface CTPInteractivePlaygroundProps {
    config: {
<<<<<<< HEAD
        components: ('push' | 'pop' | 'peek' | 'reset' | 'pushFront' | 'pushRear' | 'popFront' | 'popRear')[];
=======
        components: ('push' | 'pop' | 'peek')[];
>>>>>>> origin/feature/interview
        maxSize?: number;
    };
}

export function CTPInteractivePlayground({ config }: CTPInteractivePlaygroundProps) {
    const [stack, setStack] = useState<number[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

    const maxSize = config.maxSize || 8;

    const addLog = (msg: string) => {
        setLogs(prev => [`> ${msg}`, ...prev]);
    };

    const handlePush = () => {
        if (stack.length >= maxSize) {
            addLog("❌ Stack Overflow! (꽉 찼습니다)");
            return;
        }
        const val = Math.floor(Math.random() * 100);
        setStack(prev => [...prev, val]);
        setHighlightIndex(stack.length); // Highlight new item
        addLog(`✅ Pushed: ${val}`);

        // Remove highlight after animation
        setTimeout(() => setHighlightIndex(null), 1000);
    };

    const handlePop = () => {
        if (stack.length === 0) {
            addLog("❌ Stack Underflow! (비어있습니다)");
            return;
        }
        const popped = stack[stack.length - 1];
        setStack(prev => prev.slice(0, -1));
        addLog(`📤 Popped: ${popped}`);
    };

    const handlePeek = () => {
        if (stack.length === 0) {
            addLog("❌ Empty! Nothing to peek.");
            return;
        }
        setHighlightIndex(stack.length - 1);
        addLog(`👀 Peek: ${stack[stack.length - 1]}`);
        setTimeout(() => setHighlightIndex(null), 1000);
    };

    const handleClear = () => {
        setStack([]);
        setLogs([]);
        addLog("Stack Cleared");
    };

    // Convert number[] to VisualItem[] for Visualizer
    const visualData: VisualItem[] = stack.map((val, idx) => ({
        id: idx,
        value: val,
        isHighlighted: idx === highlightIndex
    }));

    return (
        <>
            <div className="flex flex-col lg:flex-row h-[600px] border rounded-xl overflow-hidden shadow-sm bg-background">
                {/* Left: Visualizer Area */}
                <div className="flex-1 bg-muted/10 relative border-r">
                    <StackGraphVisualizer
                        data={visualData}
                        maxSize={maxSize}
                        emptyMessage="비어있는 스택 (Empty)"
                    />
                </div>

                {/* Right: Control Panel */}
                <div className="w-full lg:w-[320px] bg-card p-6 flex flex-col gap-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Operation Panel</h3>
                        <p className="text-sm text-muted-foreground">버튼을 눌러 스택을 조작해보세요.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {config.components.includes('push') && (
                            <Button onClick={handlePush} className="w-full justify-start text-base" size="lg">
                                <Plus className="mr-2 h-5 w-5" /> Push (Insert)
                            </Button>
                        )}
                        {config.components.includes('pop') && (
                            <Button onClick={handlePop} variant="secondary" className="w-full justify-start text-base" size="lg">
                                <Trash2 className="mr-2 h-5 w-5" /> Pop (Remove)
                            </Button>
                        )}
                        {config.components.includes('peek') && (
                            <Button onClick={handlePeek} variant="outline" className="w-full justify-start text-base" size="lg">
                                <Eye className="mr-2 h-5 w-5" /> Peek (Top)
                            </Button>
                        )}
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold">Console Log</span>
                            <Button variant="ghost" size="sm" onClick={handleClear} className="h-6 text-xs text-muted-foreground hover:text-destructive">
                                <RotateCcw className="w-3 h-3 mr-1" /> Reset
                            </Button>
                        </div>
                        <Card className="bg-slate-950 text-slate-300 font-mono text-xs p-3 h-40 overflow-hidden shadow-inner border-0">
                            <div className="h-full pr-3 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                                {logs.length === 0 ? (
                                    <span className="text-slate-600 italic">Ready...</span>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        {logs.map((log, i) => (
                                            <div key={i} className="break-all">{log}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

        </>
    );
}
