import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useTreeTraversalSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
