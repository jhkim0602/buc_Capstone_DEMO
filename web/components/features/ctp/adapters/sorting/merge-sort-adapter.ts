import { BaseAdapter } from "../base-adapter";
import { VisualItem } from "@/components/features/ctp/common/types";

type MergeSortPayload = {
  array: VisualItem[];
  left: VisualItem[];
  right: VisualItem[];
  merged: VisualItem[];
  range?: [number, number];
  pointers?: {
    l?: number;
    m?: number;
    r?: number;
    i?: number;
    j?: number;
    k?: number;
    kIndex?: number;
  };
};

const toIndex = (val: any) => (Number.isInteger(val) ? (val as number) : null);
const toIndexList = (val: any) => (Array.isArray(val) ? val.filter((v) => Number.isInteger(v)) : []);

const mapArray = (
  arr: any[],
  prefix: string,
  options: {
    activeIndex?: number | null;
    comparingIndices?: number[];
    highlightRange?: [number, number] | null;
  } = {}
): VisualItem[] => {
  const compareSet = new Set(options.comparingIndices ?? []);
  const [start, end] = options.highlightRange ?? [];
  return (arr ?? []).map((val, idx) => {
    const isHighlighted =
      start !== undefined && end !== undefined ? idx >= start && idx <= end : undefined;
    const status = options.activeIndex === idx ? "active" : compareSet.has(idx) ? "comparing" : undefined;
    return {
      id: `${prefix}-${idx}`,
      value: val,
      label: idx.toString(),
      status,
      isHighlighted,
    };
  });
};

export class MergeSortAdapter extends BaseAdapter {
  parse(globals: any): MergeSortPayload {
    const arr = globals["arr"] ?? globals["nums"] ?? globals["data"] ?? [];
    const left = globals["left"] ?? [];
    const right = globals["right"] ?? [];
    const merged = globals["merged"] ?? [];

    const l = toIndex(globals["l"]);
    const m = toIndex(globals["m"]);
    const r = toIndex(globals["r"]);
    const i = toIndex(globals["i"]);
    const j = toIndex(globals["j"]);
    const k = toIndex(globals["k"]);
    const kIndex = toIndex(globals["k_index"]);

    const range =
      Array.isArray(globals["active_range"]) && globals["active_range"].length === 2
        ? ([Number(globals["active_range"][0]), Number(globals["active_range"][1])] as [number, number])
        : l !== null && r !== null
        ? ([l, r] as [number, number])
        : undefined;

    const compareIndices = toIndexList(globals["compare_indices"]);
    const activeIndex = toIndex(globals["active_index"]) ?? k ?? null;

    const arrayItems = mapArray(arr, "arr", {
      activeIndex,
      comparingIndices: compareIndices,
      highlightRange: range ?? null,
    });

    const leftItems = mapArray(left, "left", {
      activeIndex: i,
      comparingIndices: [],
    });

    const rightItems = mapArray(right, "right", {
      activeIndex: j,
      comparingIndices: [],
    });

    const mergedItems = mapArray(merged, "merged", {
      activeIndex: kIndex ?? (merged?.length ? merged.length - 1 : null),
      comparingIndices: [],
    });

    return {
      array: arrayItems,
      left: leftItems,
      right: rightItems,
      merged: mergedItems,
      range,
      pointers: { l: l ?? undefined, m: m ?? undefined, r: r ?? undefined, i: i ?? undefined, j: j ?? undefined, k: k ?? undefined, kIndex: kIndex ?? undefined },
    };
  }
}
