import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDfsBasicsSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
