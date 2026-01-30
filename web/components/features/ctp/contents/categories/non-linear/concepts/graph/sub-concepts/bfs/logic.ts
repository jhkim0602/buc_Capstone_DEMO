import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useGraphBfsSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
