import { CTPModule } from "@/components/features/ctp/common/types";
import { GraphSvgVisualizer } from "@/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer";
import React from "react";
import { DFS_BASICS_CONFIG } from "../dfs-bfs/sub-concepts/dfs-basics/config";
import { useDfsBasicsSimulation } from "../dfs-bfs/sub-concepts/dfs-basics/logic";
import { DFS_BACKTRACKING_CONFIG } from "../dfs-bfs/sub-concepts/dfs-backtracking/config";
import { useDfsBacktrackingSimulation } from "../dfs-bfs/sub-concepts/dfs-backtracking/logic";
import { DFS_TREE_TRAVERSAL_CONFIG } from "../dfs-bfs/sub-concepts/dfs-tree-traversal/config";
import { useDfsTreeTraversalSimulation } from "../dfs-bfs/sub-concepts/dfs-tree-traversal/logic";
import { DFS_CYCLE_DETECTION_CONFIG } from "../dfs-bfs/sub-concepts/dfs-cycle-detection/config";
import { useDfsCycleDetectionSimulation } from "../dfs-bfs/sub-concepts/dfs-cycle-detection/logic";
import { DFS_PATH_RECONSTRUCTION_CONFIG } from "../dfs-bfs/sub-concepts/dfs-path-reconstruction/config";
import { useDfsPathReconstructionSimulation } from "../dfs-bfs/sub-concepts/dfs-path-reconstruction/logic";

export const DFS_MODULES: Record<string, CTPModule> = {
  "dfs-basics": {
    config: DFS_BASICS_CONFIG,
    useSim: useDfsBasicsSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  "dfs-backtracking": {
    config: DFS_BACKTRACKING_CONFIG,
    useSim: useDfsBacktrackingSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  "dfs-tree-traversal": {
    config: DFS_TREE_TRAVERSAL_CONFIG,
    useSim: useDfsTreeTraversalSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props }),
  },
  "dfs-cycle-detection": {
    config: DFS_CYCLE_DETECTION_CONFIG,
    useSim: useDfsCycleDetectionSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  "dfs-path-reconstruction": {
    config: DFS_PATH_RECONSTRUCTION_CONFIG,
    useSim: useDfsPathReconstructionSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
};
