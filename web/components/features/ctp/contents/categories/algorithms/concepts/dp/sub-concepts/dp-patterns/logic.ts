import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDpPatternsSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "array" });

  return { runSimulation: run };
};
