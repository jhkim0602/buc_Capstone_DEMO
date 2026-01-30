import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export class UnionFindAdapter extends BaseAdapter {
  parse(globals: any): { nodes: VisualItem[]; edges: GraphEdge[] } {
    const parent = globals['parent'] ?? globals['arr'];
    const rank = globals['rank'] ?? globals['ranks'];
    const size = globals['size'] ?? globals['sizes'];
    if (!Array.isArray(parent)) return { nodes: [], edges: [] };

    const nodes: VisualItem[] = [];
    const edges: GraphEdge[] = [];

    const activeIndex = Number.isInteger(globals['active_index']) ? globals['active_index'] : null;
    const toIndexList = (val: any) => (Array.isArray(val) ? val.filter(Number.isInteger) : []);
    const compareIndices = toIndexList(globals['compare_indices']);
    const pathNodes = [
      ...toIndexList(globals['path_nodes']),
      ...toIndexList(globals['find_path']),
      ...toIndexList(globals['visited_nodes']),
      ...toIndexList(globals['visited_indices']),
    ];

    parent.forEach((p: any, i: number) => {
      let status: VisualItem['status'];
      if (activeIndex === i) status = 'active';
      else if (compareIndices.includes(i)) status = 'comparing';
      else if (pathNodes.includes(i)) status = 'visited';

      let label = String(i);
      if (Array.isArray(rank) && Number.isInteger(rank[i])) {
        label = `${label} (r=${rank[i]})`;
      }
      if (Array.isArray(size) && Number.isInteger(size[i])) {
        label = `${label} (s=${size[i]})`;
      }

      nodes.push({
        id: `node-${i}`,
        value: this.cleanValue(i),
        label,
        status,
      });
      if (p !== i && p !== undefined && p !== null) {
        edges.push({ source: `node-${p}`, target: `node-${i}` });
      }
    });

    return { nodes, edges };
  }
}
