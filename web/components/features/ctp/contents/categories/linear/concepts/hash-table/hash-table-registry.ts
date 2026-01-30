import { CTPModule } from "@/components/features/ctp/common/types";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";
import { HASH_BASICS_CONFIG } from "./sub-concepts/hash-basics/config";
import { useHashBasicsSimulation } from "./sub-concepts/hash-basics/logic";
import { COLLISION_CONFIG } from "./sub-concepts/collision/config";
import { useCollisionSimulation } from "./sub-concepts/collision/logic";
import { HASH_IMPLEMENT_CONFIG } from "./sub-concepts/hash-implement/config";
import { useHashImplementSimulation } from "./sub-concepts/hash-implement/logic";

export const HASH_TABLE_MODULES: Record<string, CTPModule> = {
  "hash-basics": {
    config: HASH_BASICS_CONFIG,
    useSim: useHashBasicsSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "collision": {
    config: COLLISION_CONFIG,
    useSim: useCollisionSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "hash-implement": {
    config: HASH_IMPLEMENT_CONFIG,
    useSim: useHashImplementSimulation,
    Visualizer: ArrayGraphVisualizer,
  }
};
