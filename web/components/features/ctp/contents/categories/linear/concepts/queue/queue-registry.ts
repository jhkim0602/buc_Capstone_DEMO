import { CTPModule } from "@/components/features/ctp/common/types";
import { ArrayGraphVisualizer } from "@/components/features/ctp/playground/visualizers/array/graph/array-graph-visualizer";

// 1. Linear Queue
import { QUEUE_LINEAR_CONFIG } from "./sub-concepts/linear-queue/config";
import { useLinearQueueSimulation } from "./sub-concepts/linear-queue/logic";

// 2. Circular Queue
import { QUEUE_CIRCULAR_CONFIG } from "./sub-concepts/circular-queue/config";
import { useCircularQueueSimulation } from "./sub-concepts/circular-queue/logic";

// 3. Deque
import { QUEUE_DEQUE_CONFIG } from "./sub-concepts/deque/config";
import { useDequeSimulation } from "./sub-concepts/deque/logic";

import { QUEUE_PQ_BASICS_CONFIG } from "./sub-concepts/pq-basics/config";
import { usePQBasicsSimulation } from "./sub-concepts/pq-basics/logic";

export const QUEUE_MODULES: Record<string, CTPModule> = {
    'linear-queue': {
        config: QUEUE_LINEAR_CONFIG,
        useSim: useLinearQueueSimulation,
        Visualizer: ArrayGraphVisualizer
    },
    'circular-queue': {
        config: QUEUE_CIRCULAR_CONFIG,
        useSim: useCircularQueueSimulation,
        Visualizer: ArrayGraphVisualizer
    },
    'deque': {
        config: QUEUE_DEQUE_CONFIG,
        useSim: useDequeSimulation,
        Visualizer: ArrayGraphVisualizer
    },
    'pq-basics': {
        config: QUEUE_PQ_BASICS_CONFIG,
        useSim: usePQBasicsSimulation,
        Visualizer: ArrayGraphVisualizer // Factory Mode: The Final Use
    }
};
