import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useCycleDetectionSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
