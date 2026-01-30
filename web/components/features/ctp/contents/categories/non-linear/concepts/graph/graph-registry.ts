import { CTPModule } from "@/components/features/ctp/common/types";
import React from "react";
import { GRAPH_REPRESENTATION_CONFIG } from "./sub-concepts/graph-representation/config";
import { useGraphRepresentationSimulation } from "./sub-concepts/graph-representation/logic";
import { GRAPH_DFS_CONFIG } from "./sub-concepts/dfs/config";
import { useGraphDfsSimulation } from "./sub-concepts/dfs/logic";
import { GRAPH_BFS_CONFIG } from "./sub-concepts/bfs/config";
import { useGraphBfsSimulation } from "./sub-concepts/bfs/logic";
import { CYCLE_DETECTION_CONFIG } from "./sub-concepts/cycle-detection/config";
import { useCycleDetectionSimulation } from "./sub-concepts/cycle-detection/logic";
import { SHORTEST_PATH_CONFIG } from "./sub-concepts/shortest-path/config";
import { useShortestPathSimulation } from "./sub-concepts/shortest-path/logic";
import { MST_CONFIG } from "./sub-concepts/mst/config";
import { useMstSimulation } from "./sub-concepts/mst/logic";
import { GraphSvgVisualizer } from "@/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer";

export const GRAPH_MODULES: Record<string, CTPModule> = {
  "graph-representation": {
    config: GRAPH_REPRESENTATION_CONFIG,
    useSim: useGraphRepresentationSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  dfs: {
    config: GRAPH_DFS_CONFIG,
    useSim: useGraphDfsSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  bfs: {
    config: GRAPH_BFS_CONFIG,
    useSim: useGraphBfsSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  "cycle-detection": {
    config: CYCLE_DETECTION_CONFIG,
    useSim: useCycleDetectionSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  },
  "shortest-path": {
    config: SHORTEST_PATH_CONFIG,
    useSim: useShortestPathSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props }),
  },
  "mst": {
    config: MST_CONFIG,
    useSim: useMstSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon" }),
  }
};
