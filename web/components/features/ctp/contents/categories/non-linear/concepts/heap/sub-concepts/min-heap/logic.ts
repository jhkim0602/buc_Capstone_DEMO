import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useMinHeapSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "heap" });

  return { runSimulation: run };
};
