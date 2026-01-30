import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useBfsMultiSourceSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
