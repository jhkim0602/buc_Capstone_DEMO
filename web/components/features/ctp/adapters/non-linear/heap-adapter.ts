import { BaseAdapter } from '../base-adapter';
import { VisualItem } from '@/components/features/ctp/common/types';

interface HeapEdge {
  source: string;
  target: string;
  label?: string;
}

export class HeapAdapter extends BaseAdapter {
  parse(globals: any): { nodes: VisualItem[]; edges: HeapEdge[] } {
    const heap =
      globals['heap'] ??
      globals['arr'] ??
      globals['nums'] ??
      globals['data'] ??
      globals['values'];

    if (!Array.isArray(heap)) {
      return { nodes: [], edges: [] };
    }

    const toIndex = (val: any) => (Number.isInteger(val) ? val : null);
    const toIndexList = (val: any) => (Array.isArray(val) ? val.filter(Number.isInteger) : []);

    const activeIndex =
      toIndex(globals['active_index']) ??
      toIndex(globals['current_index']);

    const compareIndices = [
      ...toIndexList(globals['compare_indices']),
      ...toIndexList(globals['swap_indices']),
    ];

    const highlightIndices = [
      ...toIndexList(globals['highlight_indices']),
      ...toIndexList(globals['visited_indices']),
    ];

    const idFor = (idx: number) => `node-${idx}`;

    const nodes: VisualItem[] = heap.map((val: any, idx: number) => {
      let status: VisualItem['status'];
      if (activeIndex === idx) status = 'active';
      else if (compareIndices.includes(idx)) status = 'comparing';
      else if (highlightIndices.includes(idx)) status = 'visited';

      return {
        id: idFor(idx),
        value: this.cleanValue(val),
        label: `[${idx}]`,
        status,
      };
    });

    const edges: HeapEdge[] = [];
    for (let i = 0; i < heap.length; i += 1) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < heap.length) edges.push({ source: idFor(i), target: idFor(left) });
      if (right < heap.length) edges.push({ source: idFor(i), target: idFor(right) });
    }

    return { nodes, edges };
  }
}
