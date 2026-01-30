import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDpBasicsSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "array" });

  return { runSimulation: run };
};
