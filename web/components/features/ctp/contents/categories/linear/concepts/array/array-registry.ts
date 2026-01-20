import { LinearVisualizer } from "@/components/features/ctp/playground/visualizers/linear-visualizer";
import { GridVisualizer } from "@/components/features/ctp/playground/visualizers/grid-visualizer";
import { MemoryLayoutVisualizer } from "@/components/features/ctp/playground/visualizers/memory-layout-visualizer";
import { StringInternVisualizer } from "@/components/features/ctp/playground/visualizers/string-intern-visualizer";
import { VectorVisualizer } from "@/components/features/ctp/playground/visualizers/vector-visualizer";
import { CacheLocalitySim } from "@/components/features/ctp/playground/visualizers/cache-locality-sim";
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

import { MEMORY_CACHE_CONFIG } from "./sub-concepts/memory-cache/config";
import { useMemorySimulation } from "./sub-concepts/memory-cache/logic";

export const ARRAY_MODULES: Record<string, CTPModule> = {
  // 1D Array
  '1d-array': {
    config: ARRAY_1D_CONFIG,
    useSim: useArray1DSimulation,
    Visualizer: LinearVisualizer
  },
  // 2D Array
  '2d-array': {
    config: ARRAY_2D_CONFIG,
    useSim: useArray2DSimulation,
    Visualizer: GridVisualizer
  },
  // String
  'string': {
    config: STRING_CONFIG,
    useSim: useStringSimulation,
    Visualizer: StringInternVisualizer
  },
  // Vector
  'vector': {
    config: VECTOR_CONFIG,
    useSim: useVectorSimulation,
    Visualizer: VectorVisualizer
  },
  // Memory & Cache
  'memory-cache': {
    config: MEMORY_CACHE_CONFIG,
    useSim: useMemorySimulation,
    Visualizer: CacheLocalitySim
  }
};
