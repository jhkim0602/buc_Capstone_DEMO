import { CTPModule } from "@/components/features/ctp/common/types";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";
import { GraphSvgVisualizer } from "@/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer";
import React from "react";
import { DIJKSTRA_CONFIG } from "./sub-concepts/dijkstra/config";
import { useDijkstraSimulation } from "./sub-concepts/dijkstra/logic";
import { FLOYD_WARSHALL_CONFIG } from "./sub-concepts/floyd-warshall/config";
import { useFloydWarshallSimulation } from "./sub-concepts/floyd-warshall/logic";

export const SHORTEST_PATH_MODULES: Record<string, CTPModule> = {
  "dijkstra": {
    config: DIJKSTRA_CONFIG,
    useSim: useDijkstraSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "polygon", traceOnly: true }),
  },
  "floyd-warshall": {
    config: FLOYD_WARSHALL_CONFIG,
    useSim: useFloydWarshallSimulation,
    Visualizer: ArrayGraphVisualizer,
  }
};
