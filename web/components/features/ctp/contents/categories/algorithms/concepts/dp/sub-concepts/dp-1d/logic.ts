import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDp1DSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "array" });

  return { runSimulation: run };
};
