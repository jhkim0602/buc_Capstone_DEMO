import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDfsBacktrackingSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
