import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useSelectionSortSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "array" });

  return { runSimulation: run };
};
