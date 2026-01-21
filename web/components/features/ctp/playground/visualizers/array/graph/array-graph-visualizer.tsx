"use client";

import React, { useMemo } from 'react';
import { CTPEmptyState } from '@/components/features/ctp/common/components/ctp-empty-state';
import {
    ReactFlow,
    Background,
    NodeProps,
    Node,
    Edge,
    Handle,
    Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from "@/lib/utils";
import { VisualItem } from "../../../../common/types";

interface ArrayGraphVisualizerProps {
    data: VisualItem[] | VisualItem[][]; // 1D or 2D
    emptyMessage?: string;
}

interface ArrayNodeData extends Record<string, unknown> {
    value: any;
    label?: string; // index or variable
    isHighlighted?: boolean;
    isGhost?: boolean;
    row?: number;
    col?: number;
}

// Custom Node for Array Cell
const ArrayNode = ({ data }: NodeProps<Node<ArrayNodeData>>) => {
    return (
        <div className="relative group">
            {/* Index/Label Marker */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground opacity-60 whitespace-nowrap">
                {data.label ?? `${data.row !== undefined ? `[${data.row},${data.col}]` : ''}`}
            </div>

            <div className={cn(
                "w-14 h-14 flex items-center justify-center text-lg font-bold shadow-sm border-2 rounded-md transition-colors duration-300",
                data.isHighlighted
                    ? "border-primary bg-primary/10 text-primary ring-2 ring-primary/20"
                    : data.isGhost
                        ? "border-dashed border-muted-foreground/30 bg-muted/10 text-muted-foreground/30"
                        : "border-border bg-card text-foreground"
            )}>
                {data.value}

                {/* Invisible handles for potential future edges (pointers) */}
                <Handle type="target" position={Position.Top} className="opacity-0" />
                <Handle type="source" position={Position.Bottom} className="opacity-0" />
            </div>
        </div>
    );
};

const nodeTypes = { arrayNode: ArrayNode };

import { useCTPStore } from '@/components/features/ctp/store/use-ctp-store';

export function ArrayGraphVisualizer({
    data,
    emptyMessage = "데이터가 없습니다."
}: ArrayGraphVisualizerProps) {
    const playState = useCTPStore(state => state.playState);
    const isLoading = playState === 'playing';

    // Auto-Layout: Grid System
    // [Safety Check]
    if (!data || !Array.isArray(data)) {
        return <CTPEmptyState isLoading={true} message="초기화 중..." />;
    }

    const { nodes, edges } = useMemo(() => {
        // ... (existing memo logic remains)
        const flowNodes: Node[] = [];
        const edges: Edge[] = [];
        // Ensure data is treated as array safely
        if (!Array.isArray(data)) return { nodes: [], edges: [] };

        const spacingX = 80;
        const spacingY = 80;

        const addNode = (item: VisualItem, r: number, c: number) => {
            flowNodes.push({
                id: `cell-${r}-${c}`,
                type: 'arrayNode',
                position: { x: c * spacingX, y: r * spacingY },
                data: {
                    value: item.value,
                    label: item.label ?? (Array.isArray(data[0]) ? undefined : `${c}`),
                    isHighlighted: item.isHighlighted,
                    isGhost: (item as any).isGhost,
                    row: r,
                    col: c
                },
                draggable: false,
            });
        };

        if (Array.isArray(data[0])) {
            (data as VisualItem[][]).forEach((row, rIdx) => {
                row.forEach((item, cIdx) => {
                    addNode(item, rIdx, cIdx);
                });
            });
        } else {
            (data as VisualItem[]).forEach((item, idx) => {
                addNode(item, 0, idx);
            });
        }

        return { nodes: flowNodes, edges };
    }, [data]);

    if (!data || data.length === 0) {
        return <CTPEmptyState message={emptyMessage} isLoading={isLoading} />;
    }

    return (
        <div className="h-full w-full bg-muted/5 p-6 relative overflow-hidden flex flex-col">
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-right"
                minZoom={0.5}
                maxZoom={2.0}
                className="bg-transparent"
            >
                <Background gap={20} size={1} className="opacity-50" />
            </ReactFlow>
        </div>
    );
}
