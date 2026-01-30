import { CTPModule } from "@/components/features/ctp/common/types";
import React from "react";
import { GraphSvgVisualizer } from "@/components/features/ctp/playground/visualizers/graph/graph-svg-visualizer";
import { TRIE_BASICS_CONFIG } from "./sub-concepts/trie-basics/config";
import { useTrieBasicsSimulation } from "./sub-concepts/trie-basics/logic";
import { PREFIX_SEARCH_CONFIG } from "./sub-concepts/prefix-search/config";
import { usePrefixSearchSimulation } from "./sub-concepts/prefix-search/logic";
import { TRIE_APPS_CONFIG } from "./sub-concepts/trie-apps/config";
import { useTrieAppsSimulation } from "./sub-concepts/trie-apps/logic";

export const TRIE_MODULES: Record<string, CTPModule> = {
  "trie-basics": {
    config: TRIE_BASICS_CONFIG,
    useSim: useTrieBasicsSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "trie", traceOnly: true }),
  },
  "prefix-search": {
    config: PREFIX_SEARCH_CONFIG,
    useSim: usePrefixSearchSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "trie", traceOnly: true }),
  },
  "trie-apps": {
    config: TRIE_APPS_CONFIG,
    useSim: useTrieAppsSimulation,
    Visualizer: (props: any) => React.createElement(GraphSvgVisualizer, { ...props, layoutMode: "trie", traceOnly: true }),
  }
};
