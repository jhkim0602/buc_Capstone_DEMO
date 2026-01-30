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
    direction?: "horizontal" | "vertical";
    emptyMessage?: string;
}

interface LLNodeData extends Record<string, unknown> {
    label?: string;
    value: any;
    isHighlighted?: boolean;
    isNull?: boolean;
    id: string | number;
    direction?: "horizontal" | "vertical";
}

// Custom Node Component
const CustomNode = ({ data }: NodeProps<Node<LLNodeData>>) => {
    return (
        <div className="relative group">
            {/* Label (Head/Tail etc) */}
            {data.label && (
                <div className={cn(
                    "absolute text-xs font-bold text-primary animate-bounce whitespace-nowrap",
                    data.direction === 'vertical'
                        ? "-left-12 top-1/2 -translate-y-1/2" // Label on left for vertical
                        : "-top-8 left-1/2 -translate-x-1/2" // Label on top for horizontal
                )}>
                    {data.label as string}
                    {data.direction === 'vertical' && <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 text-primary">→</div>}
                    {data.direction !== 'vertical' && <div className="w-0.5 h-2 bg-primary mx-auto mt-0.5"></div>}
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
    direction = "horizontal",
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
            const x = direction === 'horizontal' ? index * spacing : 0;
            const y = direction === 'vertical' ? index * spacing : 0;

            flowNodes.push({
                id: node.id.toString(),
                type: 'custom',
                position: { x, y },
                data: {
                    value: node.value,
                    label: node.label,
                    isHighlighted: node.isHighlighted,
                    id: node.id,
                    isNull: node.isNull,
                    direction: direction // Pass direction to node
                }
            });

            // 2. Create Next Edge
            if (node.nextId !== null && node.nextId !== undefined) {
                const targetIndex = idToIndex.get(node.nextId);

                // Check if it's a Circular Link (Back to Head)
                const isCircularLink = targetIndex !== undefined && targetIndex <= index;

                // Determine handles based on direction
                // Vertical: Source=Bottom, Target=Top
                // Horizontal: Source=Right, Target=Left
                let sourceHandle = direction === 'vertical' ? 'bottom-src' : undefined;
                let targetHandle = direction === 'vertical' ? 'top' : undefined;

                if (isCircularLink) {
                    // Start from Top, Loop around to Top (or Left/Top for horizontal)
                    // For vertical circular: Source=Right(or Top), Target=Right(or Top) with curve
                    // Keeping simple logic for now: reuse existing logic for circular if horizontal
                    if (direction === 'horizontal') {
                        sourceHandle = 'top-src';
                        targetHandle = 'top';
                    } else {
                        // Vertical Circular (e.g. Tail points to Head at top)
                        // Source: Right, Target: Right?
                        sourceHandle = 'right-src'; // Need to ensure these exist
                        targetHandle = 'right-target';
                        // Check CustomNode for available handles. 
                        // It has: Left, Right, Top(id=top, id=top-src), Bottom(id=bottom, id=bottom-src)
                        // Let's use Right for vertical loop
                        sourceHandle = 'right-src'; // CustomNode needs this?
                        targetHandle = 'right-target'; // CustomNode does NOT have named Right handles with IDs yet.

                        // Fallback for vertical circular: Use existing Top/Bottom logic but with curve?
                        // Actually, let's just use the Top handles for loop regardless?
                        // If Vertical: Head is at Y=0, Tail at Y=100. Tail.Next -> Head.
                        // Edge from Tail(Bottom) to Head(Top) is a straight line upwards overlapping nodes.
                        // We want a curve.
                        // Let's stick to standard logic for now and refine if circular needed for stack (unlikely for basic stack).
                        sourceHandle = 'bottom-src';
                        targetHandle = 'top';
                    }
                }

                flowEdges.push({
                    id: `e-${node.id}-next`,
                    source: node.id.toString(),
                    target: node.nextId.toString(),
                    animated: isCircularLink, // Animate loop
                    type: isCircularLink ? 'default' : 'smoothstep', // Curve for loop
                    sourceHandle: sourceHandle,
                    targetHandle: targetHandle,
                    label: isCircularLink ? 'Next (Loop)' : (type === 'doubly' ? 'Next' : undefined),
                    style: { strokeWidth: 2, stroke: '#888' },
                    markerEnd: { type: MarkerType.ArrowClosed },
                });
            }

            // 3. Create Prev Edge (Doubly Only)
            if (type === 'doubly' && node.prevId !== null && node.prevId !== undefined) {
                // Vertical: Prev is "Up". Source=Top, Target=Bottom of Prev Node.
                const sourceHandle = direction === 'vertical' ? 'top-src' : 'bottom-src'; // or Left/Right?
                // Horizontal default: Source=Bottom-src, Target=Bottom.
                // Let's stick to simple pair.
                // Horizontal: Next(Right->Left), Prev(Left->Right) -- or simpler bottom connections.
                // The current code used bottom-src -> bottom for Prev.

                const targetHandle = direction === 'vertical' ? 'bottom' : 'bottom';

                flowEdges.push({
                    id: `e-${node.id}-prev`,
                    source: node.id.toString(),
                    target: node.prevId.toString(),
                    type: 'smoothstep',
                    sourceHandle: sourceHandle,
                    targetHandle: targetHandle,
                    label: 'Prev',
                    style: { strokeWidth: 1.5, stroke: '#aaa', strokeDasharray: '4 4' },
                    markerEnd: { type: MarkerType.ArrowClosed },
                });
            }
        });

        return { nodes: flowNodes, edges: flowEdges };
    }, [data, type, direction]);

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
