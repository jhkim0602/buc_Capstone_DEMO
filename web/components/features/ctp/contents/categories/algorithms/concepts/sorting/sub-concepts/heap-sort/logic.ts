import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useHeapSortSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "heap-sort" });

  return { runSimulation: run };
};
