import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useMstSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
