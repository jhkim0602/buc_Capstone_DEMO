import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const usePrefixSearchSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "trie" });

  return { runSimulation: run };
};
