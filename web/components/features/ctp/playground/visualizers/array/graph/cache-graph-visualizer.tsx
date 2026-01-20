"use client";

import React, { useMemo } from 'react';
import {
    ReactFlow,
    Background,
    NodeProps,
    Node,
    NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { cn } from "@/lib/utils";

interface CacheSimState {
    mode: "row-major" | "col-major";
    hits: number;
    misses: number;
    activeRow: number;
    activeCol: number;
    highlightedBlock?: number; // Cache Line Block ID
}

interface CacheGraphVisualizerProps {
    data: CacheSimState;
}

// Byte Node (Individual Memory Cell)
const ByteNode = ({ data }: NodeProps<Node<{ label: string, isActive: boolean }>>) => {
    return (
        <div className={cn(
            "w-10 h-10 flex items-center justify-center border rounded shadow-sm text-xs font-mono transition-transform duration-200",
            data.isActive
                ? "bg-yellow-400 border-yellow-600 scale-125 z-10 font-bold"
                : "bg-background border-border"
        )}>
            {data.label}
        </div>
    );
};

// Cache Line Group Node
const LineGroupNode = ({ data, selected }: NodeProps<Node<{ label: string, isCached: boolean }>>) => {
    return (
        <div className={cn(
            "h-full w-full rounded-md border-2 transition-colors duration-300 relative",
            data.isCached
                ? "bg-blue-100/50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-600"
                : "bg-muted/10 border-dashed border-border"
        )}>
            <div className={cn(
                "absolute -top-3 left-2 px-1 text-[8px] font-bold uppercase rounded",
                data.isCached ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"
            )}>
                {data.label}
            </div>
        </div>
    );
};

const nodeTypes: NodeTypes = {
    byte: ByteNode,
    line: LineGroupNode
};

export function CacheGraphVisualizer({ data }: CacheGraphVisualizerProps) {
    const gridSize = 8;
    const cacheLineSize = 4;

    // Auto-Layout Logic
    const { nodes } = useMemo(() => {
        const flowNodes: Node[] = [];

        // 1. Create Cache Lines (Groups)
        // 8x8 = 64 cells. 64 / 4 = 16 blocks.
        // Layout: 4 blocks per row? Or keeping the 8x8 grid structure visual?
        // 4 cells per block.
        // Row 0 has cells 0..7. That's Block 0 (0-3) and Block 1 (4-7).
        // So visually 2 blocks per row. Total 8 rows. -> 16 blocks.

        const blockWidth = 180; // Enough for 4 cells (40px * 4 + gap)
        const blockHeight = 70;
        const gap = 20;

        for (let b = 0; b < 16; b++) {
            const isCached = data.highlightedBlock === b;
            const row = Math.floor(b / 2); // 2 blocks per row visually to match 8x8 grid
            const col = b % 2;

            flowNodes.push({
                id: `block-${b}`,
                type: 'line',
                position: { x: col * (blockWidth + gap), y: row * (blockHeight + gap) },
                style: { width: blockWidth, height: blockHeight },
                data: { label: `Line ${b}`, isCached: !!isCached },
            });
        }

        // 2. Create Byte Nodes (Children)
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                const addr = r * gridSize + c;
                const blockId = Math.floor(addr / cacheLineSize);
                const isActive = (r === data.activeRow && c === data.activeCol);

                // Position relative to Parent Block
                // A block contains 4 cells: [0,1,2,3] relative offset
                const offsetInBlock = addr % 4;

                flowNodes.push({
                    id: `byte-${addr}`,
                    type: 'byte',
                    data: { label: `${addr}`, isActive },
                    position: { x: 20 + (offsetInBlock * 40), y: 20 },
                    parentId: `block-${blockId}`,
                    extent: 'parent',
                });
            }
        }

        return { nodes: flowNodes };
    }, [data.activeRow, data.activeCol, data.highlightedBlock]);

    // Safety check
    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-full gap-4">
            {/* HUD */}
            <div className="flex justify-between items-center px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg border">
                <div className="flex gap-4 text-sm font-bold">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase text-muted-foreground">Hits</span>
                        <span className="text-green-600 text-lg">{data.hits}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase text-muted-foreground">Misses</span>
                        <span className="text-red-500 text-lg">{data.misses}</span>
                    </div>
                </div>
                <div className="text-xs text-muted-foreground font-mono bg-background px-2 py-1 rounded border">
                    Mode: {data.mode}
                </div>
            </div>

            {/* Graph */}
            <div className="flex-1 bg-muted/5 rounded-lg overflow-hidden relative">
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="bottom-right"
                    minZoom={0.5}
                >
                    <Background gap={20} size={1} className="opacity-50" />
                </ReactFlow>
            </div>

            <div className="text-center text-[10px] text-muted-foreground">
                {data.mode === 'row-major'
                    ? "🚀 순차 접근: 한 번 로드된 캐시 라인(파란 박스)을 계속 재사용합니다."
                    : "⚠️ 도약 접근: 매번 새로운 캐시 라인을 불러와야 해서(Miss) 비효율적입니다."}
            </div>
        </div>
    );
}
