"use client";

import React, { useMemo } from 'react';
import {
    ReactFlow,
    Background,
    NodeProps,
    Node,
    Handle,
    Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from "@/lib/utils";
import { VisualItem } from "@/components/features/ctp/common/types";
import { CTPEmptyState } from '@/components/features/ctp/common/components/ctp-empty-state';

// --- Custom Stack Node ---
interface StackNodeData extends Record<string, unknown> {
    value: any;
    label?: string;
    isHighlighted?: boolean;
    isGhost?: boolean;
}

const StackNode = ({ data }: NodeProps<Node<StackNodeData>>) => {
    return (
        <div className="relative group">
            <div className={cn(
                "w-48 h-12 flex items-center justify-center text-lg font-bold shadow-sm border-2 rounded-md transition-all duration-300",
                data.isHighlighted
                    ? "border-blue-500 bg-blue-100/50 text-blue-700 ring-4 ring-blue-500/20"
                    : "border-slate-300 bg-white text-slate-700",
                data.isGhost && "opacity-50 border-dashed"
            )}>
                {data.value}
                <Handle type="target" position={Position.Bottom} className="opacity-0" />
                <Handle type="source" position={Position.Top} className="opacity-0" />
            </div>
            {/* Index Label */}
            <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                {data.label}
            </div>
        </div>
    );
};

const nodeTypes = { stackNode: StackNode };

interface StackGraphVisualizerProps {
    data: VisualItem[];
    maxSize?: number;
    emptyMessage?: string;
}

export function StackGraphVisualizer({
    data,
    maxSize = 5,
    emptyMessage = "스택이 비어있습니다."
}: StackGraphVisualizerProps) {
    const { nodes } = useMemo(() => {
        if (!data || !Array.isArray(data)) return { nodes: [] };

        const flowNodes: Node[] = [];
        const spacingY = 60; // Height + Gap

        // Stack grows UPWARDS visually for the user (index 0 at bottom)
        // React Flow Y increases downwards.
        // So Step 0 (Base) should be at Y = Large, Step N (Top) at Y = Small.
        // Let's fix the base at Y=500 and go up.
        const baseY = 8000;

        data.forEach((item, idx) => {
            flowNodes.push({
                id: `node-${idx}`,
                type: 'stackNode',
                // Stack items: Index 0 is bottom.
                position: { x: 0, y: -(idx * spacingY) },
                data: {
                    value: item.value,
                    label: `[${idx}]`,
                    isHighlighted: item.isHighlighted,
                    isGhost: item.isGhost,
                },
                draggable: false,
            });
        });

        // We reverse to ensure rendering order if needed, but position is absolute.
        return { nodes: flowNodes };
    }, [data]);

    return (
        <div className="h-full w-full bg-slate-50/50 flex flex-col items-center justify-center relative p-8">
            {/* Visual Container (The "Cup") */}
            <div className="relative w-[300px] h-[500px] border-l-4 border-r-4 border-b-4 border-slate-300 rounded-b-xl bg-slate-100/50 overflow-hidden shadow-inner">
                <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden">
                    <ReactFlow
                        nodes={nodes}
                        nodeTypes={nodeTypes}
                        defaultViewport={{ x: 54, y: 420, zoom: 1 }}
                        panOnDrag={false}
                        zoomOnScroll={false}
                        zoomOnPinch={false}
                        zoomOnDoubleClick={false}
                        minZoom={0.5}
                        maxZoom={1.5}
                        className="bg-transparent"
                        proOptions={{ hideAttribution: true }}
                    >
                        <Background gap={20} size={1} className="opacity-20" />
                    </ReactFlow>
                </div>

                {/* Empty State Overlay inside the cup */}
                {(!data || data.length === 0) && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50 font-medium pointer-events-none">
                        {emptyMessage}
                    </div>
                )}
            </div>
            <div className="mt-4 text-sm text-muted-foreground font-medium">Stack Container (Max Size: {maxSize})</div>
        </div>
    );
}
