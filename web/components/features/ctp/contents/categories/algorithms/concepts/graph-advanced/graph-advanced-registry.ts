import { CTPModule } from "@/components/features/ctp/common/types";
import React from "react";
import { GraphSvgVisualizer } from "@/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer";
import { TOPOLOGICAL_SORT_CONFIG } from "./sub-concepts/topological-sort/config";
import { useTopologicalSortSimulation } from "./sub-concepts/topological-sort/logic";
import { MST_CONFIG } from "./sub-concepts/mst/config";
import { useMstSimulation } from "./sub-concepts/mst/logic";

export const GRAPH_ADVANCED_MODULES: Record<string, CTPModule> = {
  "topological-sort": {
    config: TOPOLOGICAL_SORT_CONFIG,
    useSim: useTopologicalSortSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "order", traceOnly: true }),
  },
  "mst": {
    config: MST_CONFIG,
    useSim: useMstSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "mst", traceOnly: true }),
  }
};
