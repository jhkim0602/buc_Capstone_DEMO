import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export class TrieAdapter extends BaseAdapter {
  parse(globals: any): { nodes: VisualItem[]; edges: GraphEdge[]; rootId: string } {
    const words = globals['words'] ?? globals['strings'] ?? globals['inserted'] ?? [];
    const prefix = globals['prefix'];
    const activePrefix = globals['active_prefix'] ?? globals['active_node'] ?? globals['active_path'];
    const pathNodes = globals['path_nodes'] ?? globals['visited_nodes'] ?? globals['highlight_nodes'];
    const nodesMap = new Map<string, VisualItem>();
    const edges: GraphEdge[] = [];
    const edgeSet = new Set<string>();
    const rootId = 'root';

    const ensureNode = (id: string, char: string, label?: string) => {
      if (!nodesMap.has(id)) {
        nodesMap.set(id, {
          id,
          value: char,
          label: label ?? char,
        });
      }
    };

    const addEdge = (from: string, to: string, label?: string) => {
      const key = `${from}->${to}`;
      if (edgeSet.has(key)) return;
      edgeSet.add(key);
      edges.push({ source: from, target: to, label });
    };

    ensureNode(rootId, '•', 'root');

    if (Array.isArray(words)) {
      words.forEach((w: any) => {
        if (typeof w !== 'string') return;
        let prev = rootId;
        for (let i = 0; i < w.length; i += 1) {
          const prefixKey = w.slice(0, i + 1);
          const ch = w[i];
          ensureNode(prefixKey, ch);
          addEdge(prev, prefixKey, ch);
          prev = prefixKey;
        }
      });
    }

    const highlightSet = new Set<string>();
    let activeId: string | null = null;

    const markPrefixPath = (value: string) => {
      if (!value) return null;
      highlightSet.add(rootId);
      for (let i = 0; i < value.length; i += 1) {
        const prefixKey = value.slice(0, i + 1);
        if (nodesMap.has(prefixKey)) {
          highlightSet.add(prefixKey);
        }
      }
      return value;
    };

    if (typeof prefix === 'string' && prefix.length > 0) {
      markPrefixPath(prefix);
    }

    if (Array.isArray(pathNodes)) {
      pathNodes.forEach((p: any) => {
        if (typeof p === 'string') markPrefixPath(p);
      });
    }

    if (typeof activePrefix === 'string' && activePrefix.length > 0) {
      activeId = markPrefixPath(activePrefix);
    } else if (typeof prefix === 'string' && prefix.length > 0) {
      activeId = markPrefixPath(prefix);
    }

    const nodes = Array.from(nodesMap.values()).map((node) => {
      const status = node.id === activeId ? 'active' : highlightSet.has(node.id) ? 'visited' : undefined;
      return { ...node, status };
    });

    return { nodes, edges, rootId };
  }
}
