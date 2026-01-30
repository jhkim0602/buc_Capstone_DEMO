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
    Controls,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { cn } from "@/lib/utils";
import { VisualItem } from "../../../common/types";
import { CTPEmptyState } from '@/components/features/ctp/common/components/ctp-empty-state';

// --- Types ---
interface TreeVisualizerProps {
    data: VisualItem[]; // We expect a flat list of nodes with pointers (children/left/right)
    edges?: { source: string; target: string; label?: string }[];
    rootId?: string | null;
    emptyMessage?: string;
    orientation?: 'TB' | 'LR'; // Top-to-Bottom or Left-to-Right
}

interface TreeNodeData extends Record<string, unknown> {
    value: any;
    label?: string;
    isHighlighted?: boolean;
    status?: 'active' | 'comparing' | 'visited' | 'found' | 'success';
}

// --- Custom Node ---
const TreeNode = ({ data }: NodeProps<Node<TreeNodeData>>) => {
    return (
        <div className="relative group">
             {/* Label/Index helper */}
             {data.label && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground opacity-70 whitespace-nowrap">
                    {data.label}
                </div>
            )}

            <div className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full border-2 text-sm font-bold shadow-md transition-all duration-500",
                // Status Layer
                data.status === 'active' && "bg-blue-500 text-white border-blue-600 scale-110 shadow-blue-200 ring-4 ring-blue-100",
                data.status === 'comparing' && "bg-yellow-100 text-yellow-700 border-yellow-500 scale-105 animate-pulse",
                data.status === 'visited' && "bg-gray-100 text-gray-400 border-gray-300",
                data.status === 'found' && "bg-green-500 text-white border-green-600 scale-125 ring-4 ring-green-100",

                // Default
                !data.status && "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
            )}>
                {data.value}
            </div>

            <Handle type="target" position={Position.Top} className="opacity-0" />
            <Handle type="source" position={Position.Bottom} className="opacity-0" />
        </div>
    );
};

const nodeTypes = { treeNode: TreeNode };

// --- Layout Logic (Dagre) ---
const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        // Node size + spacing
        dagreGraph.setNode(node.id, { width: 60, height: 60 });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        // Dagre returns center point, ReactFlow needs top-left
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - 30, // half width
                y: nodeWithPosition.y - 30, // half height
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};


export function TreeGraphVisualizer({
    data,
    edges: initialEdges = [],
    emptyMessage = "트리가 비어있습니다.",
    orientation = 'TB'
}: TreeVisualizerProps) {

    const { nodes, edges } = useMemo(() => {
        if (!data || data.length === 0) return { nodes: [], edges: [] };

        const flowNodes: Node[] = data.map(item => ({
            id: String(item.id),
            type: 'treeNode',
            position: { x: 0, y: 0 },
            data: {
                value: item.value,
                label: item.label,
                status: item.status
            }
        }));

        const flowEdges: Edge[] = initialEdges.map(edge => ({
            id: `e${edge.source}-${edge.target}`,
            source: edge.source,
            target: edge.target,
            label: edge.label,
            type: 'smoothstep',
            animated: true,
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
            style: { stroke: '#b1b1b7', strokeWidth: 2 },
        }));

        return getLayoutedElements(flowNodes, flowEdges, orientation);
    }, [data, initialEdges, orientation]);


    if (!data || data.length === 0) {
        return <CTPEmptyState message={emptyMessage} />;
    }

    return (
        <div className="h-full w-full bg-muted/5 p-4 relative rounded-md overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2, duration: 800 }} // Smooth zoom
                className="bg-transparent"
                minZoom={0.2}
                maxZoom={2.0}
            >
                <Background gap={20} size={1} className="opacity-30" />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}
