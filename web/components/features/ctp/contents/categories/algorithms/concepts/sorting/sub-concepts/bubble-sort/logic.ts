import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useBubbleSortSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "array" });

  return { runSimulation: run };
};
