import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDijkstraSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
