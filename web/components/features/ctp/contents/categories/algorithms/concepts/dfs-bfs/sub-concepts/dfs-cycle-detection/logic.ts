import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDfsCycleDetectionSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
