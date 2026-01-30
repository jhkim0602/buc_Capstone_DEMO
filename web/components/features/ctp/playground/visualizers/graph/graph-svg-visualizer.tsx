"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";
import { CTPEmptyState } from "@/components/features/ctp/common/components/ctp-empty-state";

interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

interface GraphSvgVisualizerProps {
  data?: VisualItem[];
  nodes?: VisualItem[];
  edges?: GraphEdge[];
  emptyMessage?: string;
  layoutMode?: "graph" | "polygon" | "trie" | "union-find" | "order" | "mst";
  rootId?: string | null;
  events?: any[];
  traceOnly?: boolean;
}

type Point = { x: number; y: number };

const STATUS_STYLE: Record<string, { fill: string; stroke: string; text: string }> = {
  active: { fill: "#3b82f6", stroke: "#2563eb", text: "#ffffff" },
  comparing: { fill: "#f59e0b", stroke: "#d97706", text: "#0f172a" },
  visited: { fill: "#e5e7eb", stroke: "#9ca3af", text: "#6b7280" },
  found: { fill: "#22c55e", stroke: "#16a34a", text: "#ffffff" },
};

const DEFAULT_STYLE = { fill: "#e2e8f0", stroke: "#94a3b8", text: "#0f172a" };
const EDGE_COLORS = {
  active: "#3b82f6",
  consider: "#f59e0b",
  relax: "#22c55e",
  default: "#94a3b8",
};

export function GraphSvgVisualizer({
  data,
  nodes,
  edges = [],
  emptyMessage = "그래프가 비어있습니다.",
  layoutMode = "graph",
  rootId,
  events = [],
  traceOnly = false,
}: GraphSvgVisualizerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, translateX: 0, translateY: 0 });
  const pointerMapRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef({ distance: 0, center: { x: 0, y: 0 }, scale: 1, translate: { x: 0, y: 0 } });
  const [userScale, setUserScale] = useState(1);
  const [userTranslate, setUserTranslate] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 800, height: 500 });
  const inputNodes = data ?? nodes ?? [];

  const { derivedNodes, derivedEdges } = useMemo(() => {
    if (!traceOnly && inputNodes.length > 0) {
      return { derivedNodes: inputNodes, derivedEdges: edges };
    }
    if (!events || events.length === 0) {
      return { derivedNodes: inputNodes, derivedEdges: edges };
    }

    const nodeIds = new Set<string>();
    const edgesList: GraphEdge[] = [];
    const edgeKeys = new Set<string>();

    const pushNode = (id: any) => {
      if (id === undefined || id === null) return;
      nodeIds.add(String(id));
    };

    const pushEdge = (u: any, v: any, label?: string) => {
      if (u === undefined || v === undefined) return;
      const su = String(u);
      const sv = String(v);
      const key = `${su}->${sv}`;
      if (edgeKeys.has(key)) return;
      edgeKeys.add(key);
      edgesList.push({ source: su, target: sv, label });
    };

    events.forEach((event) => {
      const type = event?.type;
      if (!type) return;
      if (type === "node_active" || type === "node_finalize" || type === "dist_update") {
        pushNode(event.id);
      }
      if (type === "node_visit" || type === "node_compare") {
        (event.ids || []).forEach((id: any) => pushNode(id));
      }
      if (type === "edge_active" || type === "edge_consider" || type === "edge_relax") {
        pushNode(event.u);
        pushNode(event.v);
        pushEdge(event.u, event.v, event.w !== undefined ? String(event.w) : undefined);
      }
      if (type === "dist_update") {
        if (event.id !== undefined && event.id !== null) {
          pushNode(event.id);
        }
        const parent = event.parent ?? event.from ?? event.u;
        if (parent !== undefined && parent !== null && event.id !== undefined && event.id !== null) {
          pushNode(parent);
          pushEdge(parent, event.id);
        }
      }
      if (type === "trie_step" || type === "trie_prefix" || type === "trie_insert") {
        const pathRaw = event.path ?? event.paths ?? event.word ?? event.prefix;
        const pathList = Array.isArray(pathRaw)
          ? pathRaw
          : typeof pathRaw === "string"
          ? pathRaw.split(" ").filter(Boolean)
          : [];
        let prev = rootId ?? "root";
        pushNode(prev);
        pathList.forEach((p: any) => {
          pushNode(p);
          pushEdge(prev, p);
          prev = p;
        });
      }
      if (type === "trie_mark_end") {
        pushNode(event.nodeId ?? event.id);
      }
    });

    const nodesList: VisualItem[] = Array.from(nodeIds).map((id) => ({
      id,
      value: id,
      label: id === (rootId ?? "root") ? "root" : id,
      status: undefined,
      isHighlighted: false,
    }));

    return { derivedNodes: nodesList, derivedEdges: edgesList };
  }, [edges, events, inputNodes, rootId, traceOnly]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      if (rect.width > 0 && rect.height > 0) {
        setSize({ width: rect.width, height: rect.height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { positions, orderedNodes } = useMemo(() => {
    const nodeList = derivedNodes;
    const nodeIds = nodeList.map((n) => String(n.id));
    const nodeById = new Map<string, VisualItem>();
    nodeList.forEach((n) => nodeById.set(String(n.id), n));
    const adjacency = new Map<string, Set<string>>();
    nodeIds.forEach((id) => adjacency.set(id, new Set()));

    derivedEdges.forEach((edge) => {
      const source = String(edge.source);
      const target = String(edge.target);
      if (!adjacency.has(source)) adjacency.set(source, new Set());
      if (!adjacency.has(target)) adjacency.set(target, new Set());
      adjacency.get(source)!.add(target);
    });

    const paddingX = 48;
    const paddingY = 48;
    const width = Math.max(size.width, 360);
    const height = Math.max(size.height, 260);

    const positions = new Map<string, Point>();

    const applyLevelsLayout = (levelsMap: Map<number, string[]>) => {
      const levelCount = Math.max(1, levelsMap.size);
      const levelSpacing = levelCount === 1 ? 0 : (height - paddingY * 2) / (levelCount - 1);
      Array.from(levelsMap.entries()).forEach(([level, ids]) => {
        const row = ids;
        const rowCount = row.length;
        const spacing = rowCount === 1 ? 0 : (width - paddingX * 2) / (rowCount - 1);
        row.forEach((id, idx) => {
          positions.set(id, {
            x: paddingX + idx * spacing,
            y: paddingY + level * levelSpacing,
          });
        });
      });
    };

    const applyPolygonLayout = () => {
      const center = { x: width / 2, y: height / 2 };
      const radius = Math.min(width, height) * 0.35;
      const ids = [...nodeIds].sort();
      if (ids.length === 1) {
        positions.set(ids[0], center);
        return;
      }

      const degree = new Map<string, number>();
      ids.forEach((id) => degree.set(id, 0));
      derivedEdges.forEach((edge) => {
        const s = String(edge.source);
        const t = String(edge.target);
        degree.set(s, (degree.get(s) ?? 0) + 1);
        degree.set(t, (degree.get(t) ?? 0) + 1);
      });

      let centerId: string | null = null;
      if (rootId && ids.includes(String(rootId))) {
        centerId = String(rootId);
      } else {
        const sorted = [...ids].sort((a, b) => (degree.get(b) ?? 0) - (degree.get(a) ?? 0));
        const candidate = sorted[0];
        const maxDeg = degree.get(candidate) ?? 0;
        if (maxDeg >= Math.max(2, Math.floor((ids.length - 1) * 0.5))) {
          centerId = candidate;
        }
      }

      const outerIds = centerId ? ids.filter((id) => id !== centerId) : ids;
      const count = outerIds.length;
      const step = count > 0 ? (Math.PI * 2) / count : 0;
      outerIds.forEach((id, idx) => {
        const angle = idx * step - Math.PI / 2;
        positions.set(id, {
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle),
        });
      });
      if (centerId) {
        positions.set(centerId, center);
      }
    };

    if (layoutMode === "polygon") {
      applyPolygonLayout();
      return { positions, orderedNodes: nodeList };
    }

    if (layoutMode === "order") {
      const order: string[] = [];
      const seen = new Set<string>();
      const valueToId = new Map<string, string>();
      nodeList.forEach((node) => {
        const id = String(node.id);
        if (node.value !== undefined && node.value !== null) {
          valueToId.set(String(node.value), id);
        }
        if (node.label) valueToId.set(String(node.label), id);
      });
      const resolveId = (val: any) => {
        const key = String(val);
        if (nodeById.has(key)) return key;
        if (valueToId.has(key)) return valueToId.get(key)!;
        return key;
      };
      events.forEach((event) => {
        const type = event?.type;
        if (!type) return;
        if (type === "node_visit" || type === "node_finalize") {
          const ids = event.ids ?? [event.id];
          ids.filter(Boolean).forEach((id: any) => {
            const resolved = resolveId(id);
            if (seen.has(resolved)) return;
            seen.add(resolved);
            order.push(resolved);
          });
        }
      });
      if (order.length === 0) {
        order.push(...nodeIds);
      }
      const spacing = order.length === 1 ? 0 : (width - paddingX * 2) / (order.length - 1);
      order.forEach((id, idx) => {
        positions.set(id, {
          x: paddingX + idx * spacing,
          y: height / 2,
        });
      });
      return { positions, orderedNodes: nodeList };
    }

    if (layoutMode === "trie") {
      const levelsMap = new Map<number, string[]>();
      nodeIds.forEach((id) => {
        const level = id === (rootId ?? "root") ? 0 : id.length;
        if (!levelsMap.has(level)) levelsMap.set(level, []);
        levelsMap.get(level)!.push(id);
      });
      levelsMap.forEach((ids, level) => {
        ids.sort();
        levelsMap.set(level, ids);
      });
      applyLevelsLayout(levelsMap);
      return { positions, orderedNodes: nodeList };
    }

    if (layoutMode === "union-find") {
      const indegree = new Map<string, number>();
      nodeIds.forEach((id) => indegree.set(id, 0));
      derivedEdges.forEach((edge) => {
        const target = String(edge.target);
        indegree.set(target, (indegree.get(target) ?? 0) + 1);
      });
      const roots = nodeIds.filter((id) => (indegree.get(id) ?? 0) === 0);
      const rootCount = Math.max(1, roots.length);
      const regionWidth = (width - paddingX * 2) / rootCount;
      let globalMaxDepth = 0;

      const componentLevels = new Map<string, number>();
      const componentByRoot = new Map<string, Set<string>>();

      roots.forEach((root) => {
        const queue: string[] = [root];
        const component = new Set<string>();
        componentLevels.set(root, 0);
        component.add(root);
        while (queue.length > 0) {
          const current = queue.shift()!;
          const level = componentLevels.get(current) ?? 0;
          globalMaxDepth = Math.max(globalMaxDepth, level);
          (adjacency.get(current) ?? new Set()).forEach((child) => {
            if (component.has(child)) return;
            component.add(child);
            componentLevels.set(child, level + 1);
            queue.push(child);
          });
        }
        componentByRoot.set(root, component);
      });

      roots.forEach((root, rootIdx) => {
        const regionStart = paddingX + rootIdx * regionWidth;
        const regionEnd = regionStart + regionWidth;
        const levelsMap = new Map<number, string[]>();
        (componentByRoot.get(root) ?? new Set()).forEach((id) => {
          const level = componentLevels.get(id) ?? 0;
          if (!levelsMap.has(level)) levelsMap.set(level, []);
          levelsMap.get(level)!.push(id);
        });
        levelsMap.forEach((ids, level) => {
          ids.sort();
          const rowCount = ids.length;
          const spacing = rowCount === 1 ? 0 : (regionEnd - regionStart - paddingX) / (rowCount - 1);
          ids.forEach((id, idx) => {
            positions.set(id, {
              x: regionStart + paddingX / 2 + idx * spacing,
              y: paddingY + level * ((height - paddingY * 2) / Math.max(1, globalMaxDepth)),
            });
          });
        });
      });

      return { positions, orderedNodes: nodeList };
    }

    if (layoutMode === "mst") {
      const relaxEdges = new Set<string>();
      events.forEach((event) => {
        if (event?.type === "edge_relax") {
          relaxEdges.add(`${String(event.u)}->${String(event.v)}`);
          relaxEdges.add(`${String(event.v)}->${String(event.u)}`);
        }
      });
      const treeAdj = new Map<string, Set<string>>();
      nodeIds.forEach((id) => treeAdj.set(id, new Set()));
      derivedEdges.forEach((edge) => {
        const key = `${String(edge.source)}->${String(edge.target)}`;
        if (relaxEdges.size === 0 || relaxEdges.has(key)) {
          treeAdj.get(String(edge.source))?.add(String(edge.target));
          treeAdj.get(String(edge.target))?.add(String(edge.source));
        }
      });
      const levels = new Map<string, number>();
      const visited = new Set<string>();
      const queue: string[] = [];
      const root = nodeIds[0];
      if (root !== undefined) {
        levels.set(root, 0);
        queue.push(root);
        visited.add(root);
      }
      while (queue.length > 0) {
        const current = queue.shift()!;
        const level = levels.get(current) ?? 0;
        const neighbors = Array.from(treeAdj.get(current) ?? []);
        neighbors.forEach((next) => {
          if (visited.has(next)) return;
          visited.add(next);
          levels.set(next, level + 1);
          queue.push(next);
        });
      }
      const maxLevel = Math.max(0, ...Array.from(levels.values()));
      nodeIds.forEach((id) => {
        if (!levels.has(id)) levels.set(id, maxLevel + 1);
      });
      const levelsMap = new Map<number, string[]>();
      nodeIds.forEach((id) => {
        const level = levels.get(id) ?? 0;
        if (!levelsMap.has(level)) levelsMap.set(level, []);
        levelsMap.get(level)!.push(id);
      });
      applyLevelsLayout(levelsMap);
      return { positions, orderedNodes: nodeList };
    }

    const levels = new Map<string, number>();
    const visited = new Set<string>();
    const queue: string[] = [];
    const root = nodeIds[0];
    if (root !== undefined) {
      levels.set(root, 0);
      queue.push(root);
      visited.add(root);
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      const level = levels.get(current) ?? 0;
      const neighbors = Array.from(adjacency.get(current) ?? []);
      neighbors.forEach((next) => {
        if (visited.has(next)) return;
        visited.add(next);
        levels.set(next, level + 1);
        queue.push(next);
      });
    }

    const maxLevel = Math.max(0, ...Array.from(levels.values()));
    nodeIds.forEach((id) => {
      if (!levels.has(id)) levels.set(id, maxLevel + 1);
    });

    const levelsMap = new Map<number, string[]>();
    nodeIds.forEach((id) => {
      const level = levels.get(id) ?? 0;
      if (!levelsMap.has(level)) levelsMap.set(level, []);
      levelsMap.get(level)!.push(id);
    });
    applyLevelsLayout(levelsMap);

    return { positions, orderedNodes: nodeList };
  }, [derivedNodes, derivedEdges, size.height, size.width, layoutMode, rootId, events]);

  const nodesWithEvents = useMemo(() => {
    if (!events || events.length === 0) return orderedNodes;
    const statusMap = new Map<string, VisualItem["status"]>();
    const labelMap = new Map<string, string>();
    const idSet = new Set(orderedNodes.map((n) => String(n.id)));
    const valueToId = new Map<string, string>();
    orderedNodes.forEach((node) => {
      if (node.value !== undefined && node.value !== null) {
        valueToId.set(String(node.value), String(node.id));
      }
      if (node.label) valueToId.set(String(node.label), String(node.id));
    });

    const resolveId = (val: any) => {
      const key = String(val);
      if (idSet.has(key)) return key;
      if (valueToId.has(key)) return valueToId.get(key)!;
      return key;
    };

    events.forEach((event) => {
      const type = event?.type;
      if (!type) return;
      if (type === "node_active") statusMap.set(resolveId(event.id), "active");
      if (type === "node_compare") (event.ids || []).forEach((id: any) => statusMap.set(resolveId(id), "comparing"));
      if (type === "node_visit") (event.ids || [event.id]).filter(Boolean).forEach((id: any) => statusMap.set(resolveId(id), "visited"));
      if (type === "node_finalize") statusMap.set(resolveId(event.id), "found");
      if (type === "trie_step" || type === "trie_prefix" || type === "trie_insert") {
        const pathRaw = event.path ?? event.paths ?? event.word ?? event.prefix;
        const pathList = Array.isArray(pathRaw)
          ? pathRaw
          : typeof pathRaw === "string"
          ? pathRaw.split(" ").filter(Boolean)
          : [];
        pathList.forEach((p: any) => statusMap.set(resolveId(p), "visited"));
        if (pathList.length > 0) statusMap.set(resolveId(pathList[pathList.length - 1]), "active");
      }
      if (type === "trie_mark_end") statusMap.set(resolveId(event.nodeId ?? event.id), "found");
    });

    return orderedNodes.map((node) => ({
      ...node,
      status: statusMap.get(String(node.id)) ?? node.status,
      label: labelMap.get(String(node.id)) ?? node.label,
    }));
  }, [orderedNodes, events]);

  const { offsetX, offsetY, scale } = useMemo(() => {
    const points = Array.from(positions.values());
    if (points.length === 0) return { offsetX: 0, offsetY: 0, scale: 1 };
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    points.forEach((p) => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });
    const contentWidth = Math.max(1, maxX - minX);
    const contentHeight = Math.max(1, maxY - minY);
    const padding = 48;
    const availableWidth = Math.max(1, size.width - padding * 2);
    const availableHeight = Math.max(1, size.height - padding * 2);
    const fitScale = Math.min(
      1,
      availableWidth / contentWidth,
      availableHeight / contentHeight
    );
    const targetX = (size.width - contentWidth * fitScale) / 2;
    const targetY = (size.height - contentHeight * fitScale) / 2;
    return {
      offsetX: targetX - minX * fitScale,
      offsetY: targetY - minY * fitScale,
      scale: fitScale,
    };
  }, [positions, size.height, size.width]);

  useEffect(() => {
    setUserScale(1);
    setUserTranslate({ x: 0, y: 0 });
  }, [layoutMode, derivedNodes.length, derivedEdges.length, size.width, size.height]);

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  const handleWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sx = event.clientX - rect.left;
    const sy = event.clientY - rect.top;
    const baseX = (sx - offsetX) / scale;
    const baseY = (sy - offsetY) / scale;
    const contentX = (baseX - userTranslate.x) / userScale;
    const contentY = (baseY - userTranslate.y) / userScale;
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    const nextScale = clamp(userScale * delta, 0.35, 2.5);
    const nextTranslateX = baseX - nextScale * contentX;
    const nextTranslateY = baseY - nextScale * contentY;
    setUserScale(nextScale);
    setUserTranslate({ x: nextTranslateX, y: nextTranslateY });
  };

  const handlePointerDown = (event: React.PointerEvent<SVGSVGElement>) => {
    pointerMapRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    (event.target as Element).setPointerCapture?.(event.pointerId);
    if (pointerMapRef.current.size === 2) {
      const [a, b] = Array.from(pointerMapRef.current.values());
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      pinchRef.current = {
        distance: Math.hypot(dx, dy),
        center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
        scale: userScale,
        translate: { ...userTranslate },
      };
      isPanningRef.current = false;
      return;
    }
    if (pointerMapRef.current.size === 1) {
      isPanningRef.current = true;
      panStartRef.current = {
        x: event.clientX,
        y: event.clientY,
        translateX: userTranslate.x,
        translateY: userTranslate.y,
      };
    }
  };

  const handlePointerMove = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    if (pointerMapRef.current.has(event.pointerId)) {
      pointerMapRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    if (pointerMapRef.current.size === 2) {
      const [a, b] = Array.from(pointerMapRef.current.values());
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const nextDistance = Math.hypot(dx, dy);
      if (pinchRef.current.distance <= 0) return;
      const scaleFactor = nextDistance / pinchRef.current.distance;
      const nextScale = clamp(pinchRef.current.scale * scaleFactor, 0.35, 2.5);

      const centerX = (a.x + b.x) / 2;
      const centerY = (a.y + b.y) / 2;
      const rect = containerRef.current.getBoundingClientRect();
      const sx = centerX - rect.left;
      const sy = centerY - rect.top;
      const baseX = (sx - offsetX) / scale;
      const baseY = (sy - offsetY) / scale;
      const contentX = (baseX - pinchRef.current.translate.x) / pinchRef.current.scale;
      const contentY = (baseY - pinchRef.current.translate.y) / pinchRef.current.scale;
      const nextTranslateX = baseX - nextScale * contentX;
      const nextTranslateY = baseY - nextScale * contentY;
      setUserScale(nextScale);
      setUserTranslate({ x: nextTranslateX, y: nextTranslateY });
      return;
    }
    if (!isPanningRef.current) return;
    const dx = event.clientX - panStartRef.current.x;
    const dy = event.clientY - panStartRef.current.y;
    setUserTranslate({
      x: panStartRef.current.translateX + dx / scale,
      y: panStartRef.current.translateY + dy / scale,
    });
  };

  const handlePointerUp = (event: React.PointerEvent<SVGSVGElement>) => {
    pointerMapRef.current.delete(event.pointerId);
    if (pointerMapRef.current.size < 2) {
      isPanningRef.current = false;
    }
    (event.target as Element).releasePointerCapture?.(event.pointerId);
  };

  const mergeEdgeLabel = (base?: string, next?: string) => {
    if (!base) return next;
    if (!next) return base;
    const parts: Record<string, string> = {};
    const apply = (label: string) => {
      label.split(" ").forEach((chunk) => {
        const trimmed = chunk.trim();
        if (!trimmed) return;
        if (trimmed.startsWith("w=")) parts.w = trimmed;
        else if (trimmed.startsWith("d=")) parts.d = trimmed;
        else parts[trimmed] = trimmed;
      });
    };
    apply(base);
    apply(next);
    return [parts.w, parts.d]
      .filter(Boolean)
      .concat(Object.keys(parts).filter((k) => k !== "w" && k !== "d"))
      .join(" ");
  };

  const { edgeClassByKey, edgeLabelByKey, relaxKeys } = useMemo(() => {
    if (!events || events.length === 0) {
      return { edgeClassByKey: new Map<string, string>(), edgeLabelByKey: new Map<string, string>(), relaxKeys: new Set<string>() };
    }
    const idSet = new Set(orderedNodes.map((n) => String(n.id)));
    const valueToId = new Map<string, string>();
    orderedNodes.forEach((node) => {
      if (node.value !== undefined && node.value !== null) {
        valueToId.set(String(node.value), String(node.id));
      }
      if (node.label) valueToId.set(String(node.label), String(node.id));
    });
    const resolveId = (val: any) => {
      const key = String(val);
      if (idSet.has(key)) return key;
      if (valueToId.has(key)) return valueToId.get(key)!;
      return key;
    };

    const edgeKeys = new Set(derivedEdges.map((e) => `${String(e.source)}->${String(e.target)}`));
    const classMap = new Map<string, string>();
    const labelMap = new Map<string, string>();
    const relaxSet = new Set<string>();
    const setEdge = (u: any, v: any, cls?: string, label?: string) => {
      const su = resolveId(u);
      const sv = resolveId(v);
      const key = `${su}->${sv}`;
      if (edgeKeys.has(key)) {
        if (cls) classMap.set(key, cls);
        if (label) {
          const merged = mergeEdgeLabel(labelMap.get(key), label);
          if (merged) labelMap.set(key, merged);
        }
        return key;
      }
      const reverse = `${sv}->${su}`;
      if (edgeKeys.has(reverse)) {
        if (cls) classMap.set(reverse, cls);
        if (label) {
          const merged = mergeEdgeLabel(labelMap.get(reverse), label);
          if (merged) labelMap.set(reverse, merged);
        }
        return reverse;
      }
      return null;
    };

    events.forEach((event) => {
      const type = event?.type;
      if (!event || typeof event !== "object") return;

      const labelParts: string[] = [];
      if (event.w !== undefined && event.w !== null) labelParts.push(`w=${event.w}`);
      if (event.dist !== undefined && event.dist !== null) labelParts.push(`d=${event.dist}`);
      const label = labelParts.length > 0 ? labelParts.join(" ") : undefined;
      if (type === "edge_active") setEdge(event.u, event.v, "active", label);
      if (type === "edge_consider") setEdge(event.u, event.v, "consider", label);
      if (type === "edge_relax") {
        const edgeKey = setEdge(event.u, event.v, "relax", label);
        if (edgeKey) relaxSet.add(edgeKey);
      }
      if (type === "dist_update") {
        const parent = event.parent ?? event.from ?? event.u;
        if (parent !== undefined && event.id !== undefined) {
          setEdge(parent, event.id, undefined, label);
        }
      }
    });
    return { edgeClassByKey: classMap, edgeLabelByKey: labelMap, relaxKeys: relaxSet };
  }, [events, derivedEdges, orderedNodes]);

  if (!derivedNodes || derivedNodes.length === 0) {
    return <CTPEmptyState message={emptyMessage} />;
  }

  return (
    <div ref={containerRef} className="h-full w-full rounded-md bg-muted/5 relative overflow-hidden">
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-md border border-border bg-background/80 px-2 py-1 text-xs text-muted-foreground shadow-sm">
        <span>Zoom {Math.round(userScale * 100)}%</span>
        <button
          className="rounded bg-muted/60 px-2 py-0.5 text-[11px] text-foreground hover:bg-muted"
          onClick={() => {
            setUserScale(1);
            setUserTranslate({ x: 0, y: 0 });
          }}
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="absolute left-3 top-3 z-10 rounded-md border border-border bg-background/90 px-2 py-1 text-[11px] text-muted-foreground shadow-sm">
        <div className="font-semibold text-[11px] mb-1 text-foreground">범례</div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: STATUS_STYLE.active.fill }} />
            활성 노드
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: STATUS_STYLE.visited.fill }} />
            방문 완료
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: STATUS_STYLE.found.fill }} />
            확정/도달
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-3 rounded-sm" style={{ background: EDGE_COLORS.consider }} />
            간선 고려
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-3 rounded-sm" style={{ background: EDGE_COLORS.relax }} />
            간선 갱신
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="text-[10px] font-mono">w=가중치</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="text-[10px] font-mono">d=거리</span>
          </span>
        </div>
      </div>
      <svg
        width={size.width}
        height={size.height}
        className="h-full w-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
          </marker>
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale}) translate(${userTranslate.x}, ${userTranslate.y}) scale(${userScale})`}>
          {derivedEdges.map((edge, idx) => {
            const source = positions.get(String(edge.source));
            const target = positions.get(String(edge.target));
            if (!source || !target) return null;
            const key = `${String(edge.source)}->${String(edge.target)}`;
            const edgeStyle = edgeClassByKey.get(key);
            const edgeLabel = mergeEdgeLabel(edge.label, edgeLabelByKey.get(key));
            const stroke =
              edgeStyle === "active"
                ? EDGE_COLORS.active
                : edgeStyle === "consider"
                ? EDGE_COLORS.consider
                : edgeStyle === "relax"
                ? EDGE_COLORS.relax
                : EDGE_COLORS.default;
            const isRelax = relaxKeys.has(key);
            const edgeAnimationClass =
              edgeStyle === "active"
                ? "ctp-edge-active"
                : edgeStyle === "consider"
                ? "ctp-edge-consider"
                : edgeStyle === "relax"
                ? "ctp-edge-relax"
                : "";
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const sx = source.x + (dx === 0 ? 0 : dx * 0.12);
            const sy = source.y + (dy === 0 ? 0 : dy * 0.12);
            const tx = target.x - (dx === 0 ? 0 : dx * 0.12);
            const ty = target.y - (dy === 0 ? 0 : dy * 0.12);
            return (
              <g key={`${edge.source}-${edge.target}-${idx}`}>
                <line
                  x1={sx}
                  y1={sy}
                  x2={tx}
                  y2={ty}
                  stroke={stroke}
                  strokeWidth={isRelax ? 3 : 2}
                  markerEnd="url(#arrow)"
                  className={edgeAnimationClass}
                />
                {edgeLabel && (
                  <text x={(sx + tx) / 2} y={(sy + ty) / 2 - 6} fontSize="10" fill={isRelax ? EDGE_COLORS.relax : "#64748b"}>
                    {edgeLabel}
                  </text>
                )}
              </g>
            );
          })}

          {nodesWithEvents.map((node) => {
            const pos = positions.get(String(node.id));
            if (!pos) return null;
            const style = node.status ? STATUS_STYLE[node.status] ?? DEFAULT_STYLE : DEFAULT_STYLE;
            const nodeAnimationClass =
              node.status === "active"
                ? "ctp-node-active"
                : node.status === "found"
                ? "ctp-node-found"
                : node.status === "visited"
                ? "ctp-node-visited"
                : "";
            return (
              <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle
                  r="18"
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="2"
                  className={nodeAnimationClass}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fill={style.text}
                  fontWeight="600"
                >
                  {node.label ?? node.value ?? node.id}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      <style jsx global>{`
        @keyframes ctpNodePulse {
          0% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 0.95; }
        }
        @keyframes ctpNodeGlow {
          0% { filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0)); }
          50% { filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.6)); }
          100% { filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0)); }
        }
        @keyframes ctpNodeFade {
          0% { opacity: 0.35; }
          100% { opacity: 1; }
        }
        @keyframes ctpEdgeDash {
          to { stroke-dashoffset: -10; }
        }
        @keyframes ctpEdgeGlow {
          0% { filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0)); }
          50% { filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.6)); }
          100% { filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0)); }
        }
        .ctp-node-active {
          transform-box: fill-box;
          transform-origin: center;
          animation: ctpNodePulse 1.1s ease-in-out infinite;
        }
        .ctp-node-found {
          transform-box: fill-box;
          transform-origin: center;
          animation: ctpNodeGlow 1.4s ease-in-out infinite;
        }
        .ctp-node-visited {
          animation: ctpNodeFade 0.4s ease-out;
        }
        .ctp-edge-active {
          stroke-dasharray: 4 4;
          animation: ctpEdgeDash 0.8s linear infinite;
        }
        .ctp-edge-consider {
          stroke-dasharray: 2 6;
          animation: ctpEdgeDash 1s linear infinite;
        }
        .ctp-edge-relax {
          animation: ctpEdgeGlow 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
