import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useFloydWarshallSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "grid" });

  return { runSimulation: run };
};
