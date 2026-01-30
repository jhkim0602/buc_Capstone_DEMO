import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useBfsZeroOneSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
