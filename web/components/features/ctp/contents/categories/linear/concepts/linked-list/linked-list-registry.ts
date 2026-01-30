// Configs
import { SINGLY_LL_CONFIG } from "./sub-concepts/singly/config";
import { DOUBLY_LL_CONFIG } from "./sub-concepts/doubly/config";
import { CIRCULAR_LL_CONFIG } from "./sub-concepts/circular/config";
import { TWO_POINTERS_LL_CONFIG } from "./sub-concepts/two-pointers/config";

// Simulation Hooks
import { useSinglyLinkedListSim } from "./sub-concepts/singly/logic";
import { useDoublyLinkedListSim } from "./sub-concepts/doubly/logic";
import { useCircularLinkedListSim } from "./sub-concepts/circular/logic";
import { useTwoPointersSim } from "./sub-concepts/two-pointers/logic";

// Visualizers
import {
  SinglyLinkedListGraphVisualizer as SinglyLinkedListVisualizer,
  DoublyLinkedListGraphVisualizer as DoublyLinkedListVisualizer,
  CircularLinkedListGraphVisualizer as CircularLinkedListVisualizer
} from "@/components/features/ctp/playground/visualizers/linked-list/graph/linked-list-graph-visualizer";

import { CTPModule } from "@/components/features/ctp/common/types";

export const LINKED_LIST_MODULES: Record<string, CTPModule> = {
  'singly': {
    config: SINGLY_LL_CONFIG,
    useSim: useSinglyLinkedListSim,
    Visualizer: SinglyLinkedListVisualizer
  },
  'doubly': {
    config: DOUBLY_LL_CONFIG,
    useSim: useDoublyLinkedListSim,
    Visualizer: DoublyLinkedListVisualizer
  },
  'circular': {
    config: CIRCULAR_LL_CONFIG,
    useSim: useCircularLinkedListSim,
    Visualizer: CircularLinkedListVisualizer
  },
  'two-pointers': {
    config: TWO_POINTERS_LL_CONFIG,
    useSim: useTwoPointersSim,
    Visualizer: SinglyLinkedListVisualizer // Two pointers usually happen on singly lists
  }
};
