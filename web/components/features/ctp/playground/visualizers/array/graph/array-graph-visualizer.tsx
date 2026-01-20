"use client";

import React, { useMemo } from 'react';
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

export function ArrayGraphVisualizer({
    data,
    emptyMessage = "데이터가 없습니다."
}: ArrayGraphVisualizerProps) {

    // Auto-Layout: Grid System
    // [Safety Check]
    // When navigating between chapters, the store might still hold data from the previous module (e.g. object from Linked List) 
    // before the useEffect reset triggers. We must ensure data is an array before processing.
    if (!data || !Array.isArray(data)) {
        return <div className="flex h-full items-center justify-center text-muted-foreground">Initializing...</div>;
    }

    const { nodes, edges } = useMemo(() => {
        const flowNodes: Node[] = []; // Changed from 'nodes' to 'flowNodes'
        const edges: Edge[] = []; // Although currently unused, kept for structural consistency

        // Ensure data is treated as array safely
        if (!Array.isArray(data)) return { nodes: [], edges: [] };

        const spacingX = 80; // Defined spacingX
        const spacingY = 80; // Defined spacingY

        // Helper to add node
        const addNode = (item: VisualItem, r: number, c: number) => {
            flowNodes.push({ // Pushing to flowNodes
                id: `cell-${r}-${c}`,
                type: 'arrayNode',
                position: { x: c * spacingX, y: r * spacingY },
                data: {
                    value: item.value,
                    label: item.label ?? (Array.isArray(data[0]) ? undefined : `${c}`), // Auto-index for 1D
                    isHighlighted: item.isHighlighted,
                    isGhost: (item as any).isGhost,
                    row: r,
                    col: c
                },
                draggable: false, // Grid usually fixed
            });
        };

        if (Array.isArray(data[0])) {
            // 2D Array
            (data as VisualItem[][]).forEach((row, rIdx) => {
                row.forEach((item, cIdx) => {
                    addNode(item, rIdx, cIdx);
                });
            });
        } else {
            // 1D Array
            (data as VisualItem[]).forEach((item, idx) => {
                addNode(item, 0, idx);
            });
        }

        return { nodes: flowNodes, edges }; // Returned flowNodes and edges
    }, [data]);

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return (
            <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg bg-muted/20 text-muted-foreground">
                {emptyMessage}
            </div>
        );
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
