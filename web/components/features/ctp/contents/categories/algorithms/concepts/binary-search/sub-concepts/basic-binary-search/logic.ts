import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useBasicBinarySearchSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "array" });

  return { runSimulation: run };
};
