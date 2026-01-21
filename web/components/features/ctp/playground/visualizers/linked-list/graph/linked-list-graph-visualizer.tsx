"use client";

import React, { useMemo, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    MarkerType,
    Handle,
    Position,
    NodeProps,
    Edge,
    Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from "@/lib/utils";
import { LinkedListNode } from '@/components/features/ctp/common/types';
import { CTPEmptyState } from '@/components/features/ctp/common/components/ctp-empty-state';

interface LinkedListGraphVisualizerProps {
    data: LinkedListNode[];
    type?: "singly" | "doubly" | "circular";
    emptyMessage?: string;
}

interface LLNodeData extends Record<string, unknown> {
    label?: string;
    value: any;
    isHighlighted?: boolean;
    isNull?: boolean;
    id: string | number;
}

// Custom Node Component
const CustomNode = ({ data }: NodeProps<Node<LLNodeData>>) => {
    return (
        <div className="relative group">
            {/* Label (Head/Tail etc) */}
            {data.label && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-primary animate-bounce whitespace-nowrap">
                    {data.label as string}
                    <div className="w-0.5 h-2 bg-primary mx-auto mt-0.5"></div>
                </div>
            )}

            <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-md border-2 transition-colors z-10 relative bg-background",
                data.isHighlighted
                    ? "border-primary text-primary ring-4 ring-primary/20"
                    : "border-border text-foreground",
                data.isNull && "bg-muted text-muted-foreground w-12 h-12 border-dashed text-sm"
            )}>
                {data.isNull ? "NULL" : data.value as string}

                {/* Handles for connections */}
                <Handle type="target" position={Position.Left} className="opacity-0" />
                <Handle type="source" position={Position.Right} className="opacity-0" />
                {/* Helper handles for Doubly/Circular complex routes */}
                <Handle type="target" position={Position.Top} id="top" className="opacity-0" />
                <Handle type="source" position={Position.Top} id="top-src" className="opacity-0" />
                <Handle type="target" position={Position.Bottom} id="bottom" className="opacity-0" />
                <Handle type="source" position={Position.Bottom} id="bottom-src" className="opacity-0" />
            </div>

            {/* ID hint */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono opacity-50 whitespace-nowrap">
                {typeof data.id === 'string' && data.id.startsWith('node-') ? '' : data.id}
            </div>
        </div>
    );
};

const nodeTypes = { custom: CustomNode };

import { useCTPStore } from '@/components/features/ctp/store/use-ctp-store';

export function LinkedListGraphVisualizer({
    data,
    type = "singly",
    emptyMessage = "리스트가 비어있습니다."
}: LinkedListGraphVisualizerProps) {
    const playState = useCTPStore(state => state.playState);
    const isLoading = playState === 'playing';

    // Auto-Layout Logic: Convert LinkedListNode[] -> React Flow Nodes/Edges
    const { nodes, edges } = useMemo(() => {
        // [Safety Guard] Ensure data is strictly an array before proceeding
        if (!data || !Array.isArray(data)) return { nodes: [], edges: [] };
        if (data.length === 0) return { nodes: [], edges: [] };

        const flowNodes: Node[] = [];
        const flowEdges: Edge[] = [];
        const spacing = 180; // Distance between nodes

        // Map ID to Index for easy lookup
        const idToIndex = new Map<string | number, number>();
        data.forEach((node, idx) => {
            idToIndex.set(node.id, idx);
        });

        data.forEach((node, index) => {
            // 1. Create Node
            flowNodes.push({
                id: node.id.toString(),
                type: 'custom',
                position: { x: index * spacing, y: 0 }, // Linear Layout
                data: {
                    value: node.value,
                    label: node.label,
                    isHighlighted: node.isHighlighted,
                    id: node.id,
                    isNull: node.isNull
                }
            });

            // 2. Create Next Edge
            if (node.nextId !== null && node.nextId !== undefined) {
                const targetIndex = idToIndex.get(node.nextId);

                // Check if it's a Circular Link (Back to Head)
                const isCircularLink = targetIndex !== undefined && targetIndex <= index;

                flowEdges.push({
                    id: `e-${node.id}-next`,
                    source: node.id.toString(),
                    target: node.nextId.toString(),
                    animated: isCircularLink, // Animate loop
                    type: isCircularLink ? 'default' : 'smoothstep', // Curve for loop
                    sourceHandle: isCircularLink ? 'top-src' : undefined,
                    targetHandle: isCircularLink ? 'top' : undefined,
                    label: isCircularLink ? 'Next (Loop)' : (type === 'doubly' ? 'Next' : undefined),
                    style: { strokeWidth: 2, stroke: '#888' },
                    markerEnd: { type: MarkerType.ArrowClosed },
                });
            }

            // 3. Create Prev Edge (Doubly Only)
            if (type === 'doubly' && node.prevId !== null && node.prevId !== undefined) {
                flowEdges.push({
                    id: `e-${node.id}-prev`,
                    source: node.id.toString(),
                    target: node.prevId.toString(),
                    type: 'smoothstep',
                    sourceHandle: 'bottom-src',
                    targetHandle: 'bottom',
                    label: 'Prev',
                    style: { strokeWidth: 1.5, stroke: '#aaa', strokeDasharray: '4 4' },
                    markerEnd: { type: MarkerType.ArrowClosed },
                });
            }
        });

        return { nodes: flowNodes, edges: flowEdges };
    }, [data, type]);

    if (!data || data.length === 0) {
        return <CTPEmptyState message={emptyMessage} isLoading={isLoading} />;
    }

    return (
        <div className="h-full w-full bg-muted/5 p-6 relative overflow-hidden flex flex-col">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="bottom-right"
                minZoom={0.5}
                maxZoom={1.5}
                className="bg-transparent"
            >
                <Background gap={20} size={1} className="opacity-50" />
            </ReactFlow>
        </div>
    );
}

// Wrapper Components
export const SinglyLinkedListGraphVisualizer = (props: any) => <LinkedListGraphVisualizer {...props} type="singly" />;
export const DoublyLinkedListGraphVisualizer = (props: any) => <LinkedListGraphVisualizer {...props} type="doubly" />;
export const CircularLinkedListGraphVisualizer = (props: any) => <LinkedListGraphVisualizer {...props} type="circular" />;
