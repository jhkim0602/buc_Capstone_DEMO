import { CTPModule } from "@/components/features/ctp/common/types";
import { TreeGraphVisualizer } from "@/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer";

import { HEAP_BASICS_CONFIG } from "./sub-concepts/heap-basics/config";
import { useHeapBasicsSimulation } from "./sub-concepts/heap-basics/logic";

import { HEAP_MIN_CONFIG } from "./sub-concepts/min-heap/config";
import { useMinHeapSimulation } from "./sub-concepts/min-heap/logic";

import { HEAP_MAX_CONFIG } from "./sub-concepts/max-heap/config";
import { useMaxHeapSimulation } from "./sub-concepts/max-heap/logic";

export const HEAP_MODULES: Record<string, CTPModule> = {
  "heap-basics": {
    config: HEAP_BASICS_CONFIG,
    useSim: useHeapBasicsSimulation,
    Visualizer: TreeGraphVisualizer,
  },
  "min-heap": {
    config: HEAP_MIN_CONFIG,
    useSim: useMinHeapSimulation,
    Visualizer: TreeGraphVisualizer,
  },
  "max-heap": {
    config: HEAP_MAX_CONFIG,
    useSim: useMaxHeapSimulation,
    Visualizer: TreeGraphVisualizer,
  },
};
