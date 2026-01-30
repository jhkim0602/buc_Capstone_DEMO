import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useTopologicalSortSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
