import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";
import { CTPModule } from "@/components/features/ctp/common/types";

// Modules
import { ARRAY_1D_CONFIG } from "./sub-concepts/1d-array/config";
import { useArray1DSimulation } from "./sub-concepts/1d-array/logic";

import { ARRAY_2D_CONFIG } from "./sub-concepts/2d-array/config";
import { useArray2DSimulation } from "./sub-concepts/2d-array/logic";

import { STRING_CONFIG } from "./sub-concepts/string/config";
import { useStringSimulation } from "./sub-concepts/string/logic";

import { VECTOR_CONFIG } from "./sub-concepts/vector/config";
import { useVectorSimulation } from "./sub-concepts/vector/logic";

import { StringGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/string-graph-visualizer";
import { VectorGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/vector-graph-visualizer";
import { CacheGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/cache-graph-visualizer";

import { MEMORY_CACHE_CONFIG } from "./sub-concepts/memory-cache/config";
import { useMemorySimulation } from "./sub-concepts/memory-cache/logic";

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
  },
  // Vector
  'vector': {
    config: VECTOR_CONFIG,
    useSim: useVectorSimulation,
    Visualizer: VectorGraphVisualizer
  },
  // Memory & Cache
  'memory-cache': {
    config: MEMORY_CACHE_CONFIG,
    useSim: useMemorySimulation,
    Visualizer: CacheGraphVisualizer
  }
};
