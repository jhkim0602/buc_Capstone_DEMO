import { CTPModule } from "@/components/features/ctp/common/types";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";
import { DFS_BASICS_CONFIG } from "./sub-concepts/dfs-basics/config";
import { useDfsBasicsSimulation } from "./sub-concepts/dfs-basics/logic";
import { BFS_BASICS_CONFIG } from "./sub-concepts/bfs-basics/config";
import { useBfsBasicsSimulation } from "./sub-concepts/bfs-basics/logic";
import { GRID_TRAVERSAL_CONFIG } from "./sub-concepts/grid-traversal/config";
import { useGridTraversalSimulation } from "./sub-concepts/grid-traversal/logic";

export const DFS_BFS_MODULES: Record<string, CTPModule> = {
  "dfs-basics": {
    config: DFS_BASICS_CONFIG,
    useSim: useDfsBasicsSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "bfs-basics": {
    config: BFS_BASICS_CONFIG,
    useSim: useBfsBasicsSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "grid-traversal": {
    config: GRID_TRAVERSAL_CONFIG,
    useSim: useGridTraversalSimulation,
    Visualizer: ArrayGraphVisualizer,
  }
};
