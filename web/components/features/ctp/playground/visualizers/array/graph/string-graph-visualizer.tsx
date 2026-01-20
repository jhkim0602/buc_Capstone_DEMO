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
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from "@/lib/utils";

// Data Structure from Logic
interface MemoryNode extends Record<string, unknown> {
    id: string;
    value: string;
    type: "stack" | "heap" | "pool";
    address?: string;
    label?: string; // Variable name
    targetAddress?: string; // pointer
}

interface StringGraphVisualizerProps {
    data: MemoryNode[];
}

// Custom Node: Variable (Stack)
const VariableNode = ({ data }: NodeProps<Node<MemoryNode>>) => {
    return (
        <div className="bg-background border-2 border-primary rounded-lg p-3 shadow-md min-w-[120px] flex items-center justify-between">
            <div className="flex flex-col">
                <span className="font-bold text-primary text-sm">{data.label}</span>
                <span className="text-[10px] text-muted-foreground">ref: {data.targetAddress}</span>
            </div>
            <Handle type="source" position={Position.Right} className="!bg-primary" />
        </div>
    );
};

// Custom Node: String Object (Heap/Pool)
const StringObjNode = ({ data }: NodeProps<Node<MemoryNode>>) => {
    const isPool = data.type === 'pool';
    return (
        <div className={cn(
            "rounded-md px-4 py-2 border-2 shadow-sm min-w-[80px] text-center relative",
            isPool ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700" : "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700"
        )}>
            <span className="font-serif text-lg font-medium">"{data.value}"</span>
            <div className={cn(
                "absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap",
                isPool ? "text-blue-500" : "text-amber-500"
            )}>
                {data.address} ({isPool ? 'Pool' : 'Heap'})
            </div>
            <Handle type="target" position={Position.Left} className="!opacity-0" />
        </div>
    );
};

const nodeTypes = {
    stackVar: VariableNode,
    stringObj: StringObjNode
};

export function StringGraphVisualizer({ data }: StringGraphVisualizerProps) {

    // Auto-Layout
    const { nodes, edges } = useMemo(() => {
        if (!data || !Array.isArray(data)) return { nodes: [], edges: [] };

        const flowNodes: Node[] = [];
        const flowEdges: Edge[] = [];

        // Filter types
        const stackItems = data.filter(d => d.type === 'stack');
        // Group Heap/Pool by Address to avoid duplicates if logic sends multiple? Logic sends unique nodes usually.
        // But logic seems to send all nodes flat.
        const memItems = data.filter(d => d.type === 'pool' || d.type === 'heap');

        // 1. Stack Nodes (Left Column)
        stackItems.forEach((item, idx) => {
            flowNodes.push({
                id: item.id,
                type: 'stackVar',
                position: { x: 50, y: 50 + (idx * 100) },
                data: { ...item } as any
            });

            // Edge to Target
            if (item.targetAddress) {
                // Find target node ID. Logic uses `pool-${addr}` or `heap-${addr}` Ids.
                // We need to match targetAddress to the correct Node ID.
                const targetNode = memItems.find(m => m.address === item.targetAddress);
                if (targetNode) {
                    flowEdges.push({
                        id: `e-${item.id}-${targetNode.id}`,
                        source: item.id,
                        target: targetNode.id,
                        animated: true,
                        style: { stroke: '#888', strokeWidth: 2 },
                        markerEnd: { type: MarkerType.ArrowClosed },
                    });
                }
            }
        });

        // 2. Memory Nodes (Right Area)
        // Group by type for visual separation?
        memItems.forEach((item, idx) => {
            // Stack them or grid them? Grid is better.
            const col = idx % 2;
            const row = Math.floor(idx / 2);

            flowNodes.push({
                id: item.id,
                type: 'stringObj',
                position: { x: 400 + (col * 200), y: 50 + (row * 100) },
                data: { ...item } as any
            });
        });

        return { nodes: flowNodes, edges: flowEdges };
    }, [data]);

    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg bg-muted/20 text-muted-foreground">
                Initializing...
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-muted/5 p-6 relative overflow-hidden flex flex-col">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-right"
                className="bg-transparent"
            >
                <Background gap={20} size={1} className="opacity-50" />
            </ReactFlow>
        </div>
    );
}
