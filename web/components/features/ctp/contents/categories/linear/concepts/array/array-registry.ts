import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";
import { StringGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/string-graph-visualizer";
import { CTPModule } from "@/components/features/ctp/common/types";

// Modules
import { ARRAY_1D_CONFIG } from "./sub-concepts/1d-array/config";
import { useArray1DSimulation } from "./sub-concepts/1d-array/logic";

import { ARRAY_2D_CONFIG } from "./sub-concepts/2d-array/config";
import { useArray2DSimulation } from "./sub-concepts/2d-array/logic";

import { STRING_CONFIG } from "./sub-concepts/string/config";
import { useStringSimulation } from "./sub-concepts/string/logic";

export const ARRAY_MODULES: Record<string, CTPModule> = {
  // 1D Array
  '1d-array': {
    config: ARRAY_1D_CONFIG,
    useSim: useArray1DSimulation,
    Visualizer: ArrayGraphVisualizer
  },
  // 2D Array
  '2d-array': {
    config: ARRAY_2D_CONFIG,
    useSim: useArray2DSimulation,
    Visualizer: ArrayGraphVisualizer
  },
  // String
  'string': {
    config: STRING_CONFIG,
    useSim: useStringSimulation,
    Visualizer: StringGraphVisualizer
  }
};
