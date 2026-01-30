import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useBfsBasicsSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
