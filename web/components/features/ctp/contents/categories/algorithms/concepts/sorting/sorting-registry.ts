import { CTPModule } from "@/components/features/ctp/common/types";
import { SortingBarVisualizer } from "@/components/features/ctp/playground/visualizers/sorting/sorting-bar-visualizer";
import { MergeSortVisualizer } from "@/components/features/ctp/playground/visualizers/sorting/merge-sort-visualizer";
import { HeapSortVisualizer } from "@/components/features/ctp/playground/visualizers/sorting/heap-sort-visualizer";
import { BUBBLE_SORT_CONFIG } from "./sub-concepts/bubble-sort/config";
import { useBubbleSortSimulation } from "./sub-concepts/bubble-sort/logic";
import { SELECTION_SORT_CONFIG } from "./sub-concepts/selection-sort/config";
import { useSelectionSortSimulation } from "./sub-concepts/selection-sort/logic";
import { INSERTION_SORT_CONFIG } from "./sub-concepts/insertion-sort/config";
import { useInsertionSortSimulation } from "./sub-concepts/insertion-sort/logic";
import { MERGE_SORT_CONFIG } from "./sub-concepts/merge-sort/config";
import { useMergeSortSimulation } from "./sub-concepts/merge-sort/logic";
import { QUICK_SORT_CONFIG } from "./sub-concepts/quick-sort/config";
import { useQuickSortSimulation } from "./sub-concepts/quick-sort/logic";
import { HEAP_SORT_CONFIG } from "./sub-concepts/heap-sort/config";
import { useHeapSortSimulation } from "./sub-concepts/heap-sort/logic";

export const SORTING_MODULES: Record<string, CTPModule> = {
  "bubble-sort": {
    config: BUBBLE_SORT_CONFIG,
    useSim: useBubbleSortSimulation,
    Visualizer: SortingBarVisualizer,
  },
  "selection-sort": {
    config: SELECTION_SORT_CONFIG,
    useSim: useSelectionSortSimulation,
    Visualizer: SortingBarVisualizer,
  },
  "insertion-sort": {
    config: INSERTION_SORT_CONFIG,
    useSim: useInsertionSortSimulation,
    Visualizer: SortingBarVisualizer,
  },
  "merge-sort": {
    config: MERGE_SORT_CONFIG,
    useSim: useMergeSortSimulation,
    Visualizer: MergeSortVisualizer,
  },
  "quick-sort": {
    config: QUICK_SORT_CONFIG,
    useSim: useQuickSortSimulation,
    Visualizer: SortingBarVisualizer,
  },
  "heap-sort": {
    config: HEAP_SORT_CONFIG,
    useSim: useHeapSortSimulation,
    Visualizer: HeapSortVisualizer,
  }
};
