import { BaseAdapter } from "../base-adapter";
import { VisualItem } from "@/components/features/ctp/common/types";

type HeapSortPayload = {
  array: VisualItem[];
  heapSize?: number;
  activeIndex?: number;
  compareIndices?: number[];
  swapIndices?: number[];
};

const toIndex = (val: any) => (Number.isInteger(val) ? (val as number) : null);
const toIndexList = (val: any) => (Array.isArray(val) ? val.filter((v) => Number.isInteger(v)) : []);

export class HeapSortAdapter extends BaseAdapter {
  parse(globals: any): HeapSortPayload {
    const arr = globals["arr"] ?? globals["nums"] ?? globals["data"] ?? [];
    const heapSize = toIndex(globals["heap_size"]) ?? toIndex(globals["size"]) ?? (Array.isArray(arr) ? arr.length : 0);
    const activeIndex = toIndex(globals["active_index"]);
    const compareIndices = toIndexList(globals["compare_indices"]);
    const swapIndices = toIndexList(globals["swap_indices"]);

    const compareSet = new Set(compareIndices);
    const swapSet = new Set(swapIndices);

    const arrayItems: VisualItem[] = (Array.isArray(arr) ? arr : []).map((val, idx) => {
      let status: VisualItem["status"];
      if (heapSize !== null && idx >= heapSize) status = "success";
      else if (activeIndex === idx) status = "active";
      else if (swapSet.has(idx)) status = "active";
      else if (compareSet.has(idx)) status = "comparing";

      return {
        id: `heap-${idx}`,
        value: this.cleanValue(val),
        label: idx.toString(),
        status,
      };
    });

    return {
      array: arrayItems,
      heapSize: heapSize ?? undefined,
      activeIndex: activeIndex ?? undefined,
      compareIndices,
      swapIndices,
    };
  }
}
