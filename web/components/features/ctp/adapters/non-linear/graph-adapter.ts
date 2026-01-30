import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export class GraphAdapter extends BaseAdapter {
  parse(globals: any): { nodes: VisualItem[]; edges: GraphEdge[] } {
    const graph = globals['graph'] ?? globals['adj'] ?? globals['adj_list'] ?? globals['adjList'];
    const edgesInput = globals['edges'];
    const nodesInput = globals['nodes'] ?? globals['vertices'] ?? globals['verts'];
    const dist = globals['dist'] ?? globals['distance'] ?? globals['distances'];
    const stateArray = globals['state'] ?? globals['color'] ?? globals['colors'];

    const nodes: VisualItem[] = [];
    const edges: GraphEdge[] = [];
    const idMap = new Map<string, string>();
    const valueMap = new Map<string, any>();

    const addNode = (val: any) => {
      const key = String(val);
      if (idMap.has(key)) return idMap.get(key)!;
      const id = `node-${idMap.size}`;
      idMap.set(key, id);
      valueMap.set(id, val);
      return id;
    };

    const pushEdge = (u: any, v: any, label?: any) => {
      const source = addNode(u);
      const target = addNode(v);
      edges.push({ source, target, label: label !== undefined ? String(label) : undefined });
    };

    const isMatrix = (g: any) => Array.isArray(g) && g.length > 0 && Array.isArray(g[0]);
    const isAdjList = (g: any) => Array.isArray(g) && (g.length === 0 || Array.isArray(g[0]) || typeof g[0] === 'object');
    const isObjectAdj = (g: any) => g && typeof g === 'object' && !Array.isArray(g);

    if (Array.isArray(nodesInput)) {
      nodesInput.forEach((n: any) => addNode(n));
    }

    if (Array.isArray(edgesInput)) {
      edgesInput.forEach((e: any) => {
        if (Array.isArray(e)) {
          if (e.length >= 2) pushEdge(e[0], e[1], e[2]);
        } else if (e && typeof e === 'object') {
          const u = e.from ?? e.u ?? e.source;
          const v = e.to ?? e.v ?? e.target;
          if (u !== undefined && v !== undefined) pushEdge(u, v, e.w ?? e.weight ?? e.label);
        }
      });
    } else if (isObjectAdj(graph)) {
      Object.keys(graph).forEach((key) => {
        const neighbors = graph[key] || [];
        if (Array.isArray(neighbors)) {
          neighbors.forEach((item: any) => {
            if (Array.isArray(item)) {
              pushEdge(key, item[0], item[1]);
            } else {
              pushEdge(key, item);
            }
          });
        }
      });
    } else if (isAdjList(graph)) {
      (graph || []).forEach((neighbors: any, u: number) => {
        if (Array.isArray(neighbors)) {
          neighbors.forEach((item: any) => {
            if (Array.isArray(item)) {
              pushEdge(u, item[0], item[1]);
            } else {
              pushEdge(u, item);
            }
          });
        }
      });
    } else if (isMatrix(graph)) {
      const INF = 10 ** 9;
      graph.forEach((row: any[], i: number) => {
        row.forEach((val: any, j: number) => {
          if (val === 0 || val === INF || val === undefined || val === null) return;
          pushEdge(i, j, val);
        });
      });
    }

    const activeNode = globals['active_node'] ?? globals['current_node'];
    const activeIndex = Number.isInteger(globals['active_index']) ? globals['active_index'] : null;
    const foundNode = globals['found_node'] ?? globals['target_node'];
    const visitedNodes = globals['visited_nodes'] ?? globals['visited'];
    const compareNodes = globals['compare_nodes'];

    const isValidNode = (val: any) => {
      if (val === undefined || val === null) return false;
      if (typeof val === 'number' && Number.isInteger(val) && val < 0) return false;
      return true;
    };

    let activeId: string | undefined;
    if (isValidNode(activeNode)) {
      activeId = addNode(activeNode);
    } else if (activeIndex !== null && activeIndex >= 0) {
      const key = String(activeIndex);
      if (!idMap.has(key)) addNode(activeIndex);
      activeId = idMap.get(key);
    }

    const foundId = isValidNode(foundNode) ? addNode(foundNode) : undefined;
    const visitedSet = new Set<string>();
    if (Array.isArray(visitedNodes)) {
        if (visitedNodes.length > 0 && typeof visitedNodes[0] === 'boolean') {
            visitedNodes.forEach((flag: boolean, idx: number) => {
                if (flag) visitedSet.add(addNode(idx));
            });
        } else {
            visitedNodes.forEach((node: any) => visitedSet.add(addNode(node)));
        }
    }

    const compareSet = new Set<string>();
    if (Array.isArray(compareNodes)) {
        compareNodes.forEach((node: any) => compareSet.add(addNode(node)));
    }

    const stateStatusById = new Map<string, VisualItem['status']>();
    if (Array.isArray(stateArray)) {
      stateArray.forEach((state: any, idx: number) => {
        let status: VisualItem['status'] | undefined;
        if (state === 1 || state === 'gray' || state === 'visiting') status = 'comparing';
        if (state === 2 || state === 'black' || state === 'done' || state === 'visited') status = 'visited';
        if (status) stateStatusById.set(addNode(idx), status);
      });
    }

    idMap.forEach((id, key) => {
      const val = valueMap.get(id) ?? key;
      const status =
        foundId === id
          ? 'found'
          : activeId === id
          ? 'active'
          : compareSet.has(id)
          ? 'comparing'
          : visitedSet.has(id)
          ? 'visited'
          : stateStatusById.get(id);

      let label = String(val);
      if (Array.isArray(dist)) {
        const idx = Number.isInteger(val)
          ? (val as number)
          : typeof val === 'string' && /^\d+$/.test(val)
          ? Number(val)
          : null;
        if (idx !== null && idx >= 0 && idx < dist.length) {
          label = `${val} (d=${dist[idx]})`;
        }
      }
      nodes.push({ id, value: this.cleanValue(val), label, status });
    });

    return { nodes, edges };
  }
}
