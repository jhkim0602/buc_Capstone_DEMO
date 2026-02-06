import { CTPModule } from "@/components/features/ctp/common/types";
import { TreeGraphVisualizer } from "@/components/features/ctp/playground/visualizers/tree/tree-graph-visualizer";

import { TREE_BASICS_CONFIG } from "./sub-concepts/tree-basics/config";
import { useTreeBasicsSimulation } from "./sub-concepts/tree-basics/logic";

import { TREE_PROPERTIES_CONFIG } from "./sub-concepts/tree-properties/config";
import { useTreePropertiesSimulation } from "./sub-concepts/tree-properties/logic";

import { TREE_TRAVERSAL_CONFIG } from "./sub-concepts/binary-traversal/config";
import { useTreeTraversalSimulation } from "./sub-concepts/binary-traversal/logic";

// Binary Search Tree (BST)
import { TREE_BST_CONFIG } from "./sub-concepts/bst/config";
import { useBSTSimulation } from "./sub-concepts/bst/logic";

export const TREE_MODULES: Record<string, CTPModule> = {
    'tree-basics': {
        config: TREE_BASICS_CONFIG,
        useSim: useTreeBasicsSimulation,
        Visualizer: TreeGraphVisualizer
    },
    'tree-properties': {
        config: TREE_PROPERTIES_CONFIG,
        useSim: useTreePropertiesSimulation,
        Visualizer: TreeGraphVisualizer
    },
    'binary-traversal': {
        config: TREE_TRAVERSAL_CONFIG,
        useSim: useTreeTraversalSimulation,
        Visualizer: TreeGraphVisualizer
    },
    'bst': {
        config: TREE_BST_CONFIG,
        useSim: useBSTSimulation,
        Visualizer: TreeGraphVisualizer
    }
};
