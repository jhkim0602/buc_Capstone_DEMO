"use client";

import React, { useEffect, useRef, useState } from "react";
import cytoscape, { Core, ElementDefinition, Stylesheet } from "cytoscape";
import { VisualItem } from "@/components/features/ctp/common/types";
import { CTPEmptyState } from "@/components/features/ctp/common/components/ctp-empty-state";

interface CytoscapeGraphVisualizerProps {
  data?: VisualItem[];
  nodes?: VisualItem[];
  edges?: { source: string; target: string; label?: string }[];
  emptyMessage?: string;
  layout?: "breadthfirst" | "grid" | "circle" | "cose";
  events?: any[];
}

const BASE_STYLE: Stylesheet[] = [
  {
    selector: "node",
    style: {
      "background-color": "#e2e8f0",
      "border-color": "#94a3b8",
      "border-width": 2,
      label: "data(label)",
      "font-size": 12,
      color: "#0f172a",
      "text-valign": "center",
      "text-halign": "center",
      width: 36,
      height: 36,
    },
  },
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "line-color": "#94a3b8",
      "target-arrow-color": "#94a3b8",
      width: 2,
      label: "data(label)",
      "font-size": 10,
      "text-rotation": "autorotate",
    },
  },
  {
    selector: ".status-active",
    style: {
      "background-color": "#3b82f6",
      "border-color": "#2563eb",
      color: "#ffffff",
    },
  },
  {
    selector: ".status-comparing",
    style: {
      "background-color": "#f59e0b",
      "border-color": "#d97706",
      color: "#0f172a",
    },
  },
  {
    selector: ".status-visited",
    style: {
      "background-color": "#e5e7eb",
      "border-color": "#9ca3af",
      color: "#6b7280",
    },
  },
  {
    selector: ".status-found",
    style: {
      "background-color": "#22c55e",
      "border-color": "#16a34a",
      color: "#ffffff",
    },
  },
  {
    selector: ".edge-active",
    style: {
      "line-color": "#3b82f6",
      "target-arrow-color": "#3b82f6",
      width: 3,
    },
  },
  {
    selector: ".edge-consider",
    style: {
      "line-color": "#f59e0b",
      "target-arrow-color": "#f59e0b",
      width: 3,
    },
  },
  {
    selector: ".edge-relax",
    style: {
      "line-color": "#22c55e",
      "target-arrow-color": "#22c55e",
      width: 3,
    },
  },
];

export function CytoscapeGraphVisualizer({
  data,
  nodes,
  edges = [],
  emptyMessage = "그래프가 비어있습니다.",
  layout = "breadthfirst",
  events = [],
}: CytoscapeGraphVisualizerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);
  const [isReady, setIsReady] = useState(false);
  const inputNodes = data ?? nodes ?? [];

  useEffect(() => {
    if (!containerRef.current || cyRef.current) return;

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: [],
      style: BASE_STYLE,
      layout: { name: layout },
    });
    setIsReady(true);

    return () => {
      cyRef.current?.destroy();
      cyRef.current = null;
      setIsReady(false);
    };
  }, [layout]);

  const runLayout = () => {
    const cy = cyRef.current;
    const container = containerRef.current;
    if (!cy || !container) return;

    const tryLayout = (attempt: number) => {
      if (!cyRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        if (attempt < 5) requestAnimationFrame(() => tryLayout(attempt + 1));
        return;
      }
      if (process.env.NODE_ENV !== "production") {
        console.debug("[Cytoscape] layout", {
          nodes: cyRef.current.nodes().length,
          edges: cyRef.current.edges().length,
          width: rect.width,
          height: rect.height,
        });
      }
      try {
        cyRef.current.resize();
        cyRef.current.layout({ name: layout, animate: false }).run();
        cyRef.current.fit(undefined, 40);
      } catch (err) {
        if (attempt < 3) requestAnimationFrame(() => tryLayout(attempt + 1));
      }
    };

    tryLayout(0);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (!cyRef.current) return;
      runLayout();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !isReady) return;

    if (!inputNodes || inputNodes.length === 0) {
      cy.elements().remove();
      return;
    }

    const nodeStatusMap = new Map<string, string>();
    const nodeLabelMap = new Map<string, string>();
    const edgeClassMap = new Map<string, string>();
    const nodeById = new Map<string, VisualItem>();
    const valueToId = new Map<string, string>();
    const nodeIdSet = new Set<string>();

    inputNodes.forEach((node) => {
      const id = String(node.id);
      nodeById.set(id, node);
      nodeIdSet.add(id);
      if (node.value !== undefined && node.value !== null) {
        valueToId.set(String(node.value), id);
      }
      if (node.label) {
        valueToId.set(String(node.label), id);
      }
    });

    const resolveNodeId = (id: any) => {
      if (id === undefined || id === null) return null;
      const key = String(id);
      if (nodeIdSet.has(key)) return key;
      if (valueToId.has(key)) return valueToId.get(key) ?? null;
      return key;
    };

    const setNodeStatus = (id: any, status: string) => {
      const resolved = resolveNodeId(id);
      if (!resolved) return;
      nodeStatusMap.set(resolved, status);
    };

    const setEdgeClass = (u: any, v: any, cls: string) => {
      const ru = resolveNodeId(u);
      const rv = resolveNodeId(v);
      if (!ru || !rv) return;
      edgeClassMap.set(`${ru}->${rv}`, cls);
    };

    events.forEach((event) => {
      const type = event?.type;
      if (!type) return;
      if (type === "trie_step" || type === "trie_prefix" || type === "trie_insert") {
        const pathRaw = event.path ?? event.paths ?? event.word ?? event.prefix;
        const pathList = Array.isArray(pathRaw)
          ? pathRaw
          : typeof pathRaw === "string"
          ? pathRaw.split(" ").filter(Boolean)
          : [];
        if (pathList.length > 0) {
          pathList.forEach((p: any) => setNodeStatus(p, "visited"));
          setNodeStatus(pathList[pathList.length - 1], "active");
        }
        return;
      }
      if (type === "trie_mark_end") {
        const nodeId = event.nodeId ?? event.id;
        setNodeStatus(nodeId, "found");
        return;
      }
      if (type === "node_active") setNodeStatus(event.id, "active");
      if (type === "node_compare") (event.ids || []).forEach((id: any) => setNodeStatus(id, "comparing"));
      if (type === "node_visit") (event.ids || [event.id]).filter(Boolean).forEach((id: any) => setNodeStatus(id, "visited"));
      if (type === "node_finalize") setNodeStatus(event.id, "found");
      if (type === "edge_active") setEdgeClass(event.u, event.v, "edge-active");
      if (type === "edge_consider") setEdgeClass(event.u, event.v, "edge-consider");
      if (type === "edge_relax") setEdgeClass(event.u, event.v, "edge-relax");
      if (type === "dist_update" && event.id !== undefined) {
        const resolved = resolveNodeId(event.id);
        if (!resolved) return;
        const node = nodeById.get(resolved);
        const base = node?.value ?? event.id;
        nodeLabelMap.set(resolved, `${base} (d=${event.dist})`);
      }
    });

    const elements: ElementDefinition[] = [
      ...inputNodes.map((node) => {
        const id = String(node.id);
        const status = nodeStatusMap.get(id) ?? node.status;
        const label = nodeLabelMap.get(id) ?? node.label ?? String(node.value ?? node.id);
        return {
          data: {
            id,
            label,
          },
          classes: status ? `status-${status}` : "",
        };
      }),
      ...edges.map((edge) => {
        const key = `${String(edge.source)}->${String(edge.target)}`;
        const edgeClass = edgeClassMap.get(key) ?? "";
        return {
          data: {
            id: `e-${edge.source}-${edge.target}`,
            source: String(edge.source),
            target: String(edge.target),
            label: edge.label,
          },
          classes: edgeClass,
        };
      }),
    ];

    cy.elements().remove();
    cy.add(elements);
    runLayout();
  }, [inputNodes, edges, layout, events, isReady]);

  if (!inputNodes || inputNodes.length === 0) {
    return <CTPEmptyState message={emptyMessage} />;
  }

  return <div ref={containerRef} className="h-full w-full min-h-[320px] rounded-md bg-muted/5" />;
}
