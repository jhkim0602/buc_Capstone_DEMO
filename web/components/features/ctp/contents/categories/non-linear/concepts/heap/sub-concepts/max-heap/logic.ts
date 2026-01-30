import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useMaxHeapSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "heap" });

  return { runSimulation: run };
};
