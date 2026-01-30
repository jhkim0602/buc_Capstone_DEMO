import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useQuickSortSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "array" });

  return { runSimulation: run };
};
