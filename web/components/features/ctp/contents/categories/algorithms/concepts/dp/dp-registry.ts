import { CTPModule } from "@/components/features/ctp/common/types";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";
import { DP_BASICS_CONFIG } from "./sub-concepts/dp-basics/config";
import { useDpBasicsSimulation } from "./sub-concepts/dp-basics/logic";
import { DP_1D_CONFIG } from "./sub-concepts/dp-1d/config";
import { useDp1DSimulation } from "./sub-concepts/dp-1d/logic";
import { DP_2D_CONFIG } from "./sub-concepts/dp-2d/config";
import { useDp2DSimulation } from "./sub-concepts/dp-2d/logic";
import { DP_PATTERNS_CONFIG } from "./sub-concepts/dp-patterns/config";
import { useDpPatternsSimulation } from "./sub-concepts/dp-patterns/logic";

export const DP_MODULES: Record<string, CTPModule> = {
  "dp-basics": {
    config: DP_BASICS_CONFIG,
    useSim: useDpBasicsSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "dp-1d": {
    config: DP_1D_CONFIG,
    useSim: useDp1DSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "dp-2d": {
    config: DP_2D_CONFIG,
    useSim: useDp2DSimulation,
    Visualizer: ArrayGraphVisualizer,
  },
  "dp-patterns": {
    config: DP_PATTERNS_CONFIG,
    useSim: useDpPatternsSimulation,
    Visualizer: ArrayGraphVisualizer,
  }
};
