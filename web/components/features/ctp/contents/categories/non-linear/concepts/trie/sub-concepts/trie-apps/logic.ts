import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useTrieAppsSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "trie" });

  return { runSimulation: run };
};
