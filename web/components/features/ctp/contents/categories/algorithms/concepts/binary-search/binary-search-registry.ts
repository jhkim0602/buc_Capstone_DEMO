import { CTPModule } from "@/components/features/ctp/common/types";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";
import { BASIC_BINARY_SEARCH_CONFIG } from "./sub-concepts/basic-binary-search/config";
import { useBasicBinarySearchSimulation } from "./sub-concepts/basic-binary-search/logic";
import { PARAMETRIC_SEARCH_CONFIG } from "./sub-concepts/parametric-search/config";
import { useParametricSearchSimulation } from "./sub-concepts/parametric-search/logic";

export const BINARY_SEARCH_MODULES: Record<string, CTPModule> = {
  "basic-binary-search": {
    config: BASIC_BINARY_SEARCH_CONFIG,
    useSim: useBasicBinarySearchSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "parametric-search": {
    config: PARAMETRIC_SEARCH_CONFIG,
    useSim: useParametricSearchSimulation,
    Visualizer: ArrayGraphVisualizer,
  }
};
