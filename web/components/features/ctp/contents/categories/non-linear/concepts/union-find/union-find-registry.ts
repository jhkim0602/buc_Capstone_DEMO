import { CTPModule } from "@/components/features/ctp/common/types";
import React from "react";
import { GraphSvgVisualizer } from "@/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer";
import { DS_BASICS_CONFIG } from "./sub-concepts/ds-basics/config";
import { useDsBasicsSimulation } from "./sub-concepts/ds-basics/logic";
import { UNION_RANK_CONFIG } from "./sub-concepts/union-rank/config";
import { useUnionRankSimulation } from "./sub-concepts/union-rank/logic";
import { PATH_COMPRESSION_CONFIG } from "./sub-concepts/path-compression/config";
import { usePathCompressionSimulation } from "./sub-concepts/path-compression/logic";
import { DS_APPS_CONFIG } from "./sub-concepts/ds-apps/config";
import { useDsAppsSimulation } from "./sub-concepts/ds-apps/logic";

export const UNION_FIND_MODULES: Record<string, CTPModule> = {
  "ds-basics": {
    config: DS_BASICS_CONFIG,
    useSim: useDsBasicsSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "union-find", traceOnly: true }),
  },
  "union-rank": {
    config: UNION_RANK_CONFIG,
    useSim: useUnionRankSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "union-find", traceOnly: true }),
  },
  "path-compression": {
    config: PATH_COMPRESSION_CONFIG,
    useSim: usePathCompressionSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "union-find", traceOnly: true }),
  },
  "ds-apps": {
    config: DS_APPS_CONFIG,
    useSim: useDsAppsSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "union-find", traceOnly: true }),
  }
};
