import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useGridTraversalSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "grid" });

  return { runSimulation: run };
};
