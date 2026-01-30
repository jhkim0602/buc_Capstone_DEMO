import { CTPModule } from "@/components/features/ctp/common/types";
import { StackGraphVisualizer } from "@/components/features/ctp/playground/visualizers/stack/graph/stack-graph-visualizer";

// 1. LIFO Basics
import { STACK_LIFO_CONFIG } from "./sub-concepts/lifo-basics/config";
import { useStackLifoSimulation } from "./sub-concepts/lifo-basics/logic";

// 2. Array Stack
import { STACK_ARRAY_CONFIG } from "./sub-concepts/array-stack/config";
import { useArrayStackSimulation } from "./sub-concepts/array-stack/logic";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";

// 3. Linked Stack
import { STACK_LINKED_CONFIG } from "./sub-concepts/linked-stack/config";
import { useLinkedStackSimulation } from "./sub-concepts/linked-stack/logic";
import { VerticalLinkedStackVisualizer } from "./sub-concepts/linked-stack/visualizer";

// 4. Monotonic Stack
import { STACK_MONOTONIC_CONFIG } from "./sub-concepts/monotonic-stack/config";
import { useMonotonicStackSimulation } from "./sub-concepts/monotonic-stack/logic";
import { MonotonicStackVisualizer } from "./sub-concepts/monotonic-stack/visualizer";

export const STACK_MODULES: Record<string, CTPModule> = {
    'lifo-basics': {
        config: STACK_LIFO_CONFIG,
        useSim: useStackLifoSimulation,
        Visualizer: StackGraphVisualizer
    },
    'array-stack': {
        config: STACK_ARRAY_CONFIG,
        useSim: useArrayStackSimulation,
        Visualizer: ArrayGraphVisualizer
    },
    'linked-stack': {
        config: STACK_LINKED_CONFIG,
        useSim: useLinkedStackSimulation,
        Visualizer: VerticalLinkedStackVisualizer
    },
    'monotonic': {
        config: STACK_MONOTONIC_CONFIG,
        useSim: useMonotonicStackSimulation,
        Visualizer: MonotonicStackVisualizer
    }
};
