import { CTPModule } from "@/components/features/ctp/common/types";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";
import { GraphSvgVisualizer } from "@/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer";
import React from "react";
import { BFS_BASICS_CONFIG } from "../dfs-bfs/sub-concepts/bfs-basics/config";
import { useBfsBasicsSimulation } from "../dfs-bfs/sub-concepts/bfs-basics/logic";
import { GRID_TRAVERSAL_CONFIG } from "../dfs-bfs/sub-concepts/grid-traversal/config";
import { useGridTraversalSimulation } from "../dfs-bfs/sub-concepts/grid-traversal/logic";
import { BFS_MULTI_SOURCE_CONFIG } from "../dfs-bfs/sub-concepts/bfs-multi-source/config";
import { useBfsMultiSourceSimulation } from "../dfs-bfs/sub-concepts/bfs-multi-source/logic";
import { BFS_ZERO_ONE_CONFIG } from "../dfs-bfs/sub-concepts/bfs-zero-one/config";
import { useBfsZeroOneSimulation } from "../dfs-bfs/sub-concepts/bfs-zero-one/logic";
import { BFS_PATH_RECONSTRUCTION_CONFIG } from "../dfs-bfs/sub-concepts/bfs-path-reconstruction/config";
import { useBfsPathReconstructionSimulation } from "../dfs-bfs/sub-concepts/bfs-path-reconstruction/logic";

export const BFS_MODULES: Record<string, CTPModule> = {
  "bfs-basics": {
    config: BFS_BASICS_CONFIG,
    useSim: useBfsBasicsSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  "grid-traversal": {
    config: GRID_TRAVERSAL_CONFIG,
    useSim: useGridTraversalSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "bfs-multi-source": {
    config: BFS_MULTI_SOURCE_CONFIG,
    useSim: useBfsMultiSourceSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  "bfs-zero-one": {
    config: BFS_ZERO_ONE_CONFIG,
    useSim: useBfsZeroOneSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  "bfs-path-reconstruction": {
    config: BFS_PATH_RECONSTRUCTION_CONFIG,
    useSim: useBfsPathReconstructionSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  }
};
