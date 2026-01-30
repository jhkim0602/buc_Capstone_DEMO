import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useParametricSearchSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "array" });

  return { runSimulation: run };
};
