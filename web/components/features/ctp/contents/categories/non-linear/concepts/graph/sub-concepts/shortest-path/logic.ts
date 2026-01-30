import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useShortestPathSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
