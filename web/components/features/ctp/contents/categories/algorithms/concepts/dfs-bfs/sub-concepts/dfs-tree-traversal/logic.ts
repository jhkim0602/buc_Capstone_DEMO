import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDfsTreeTraversalSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
