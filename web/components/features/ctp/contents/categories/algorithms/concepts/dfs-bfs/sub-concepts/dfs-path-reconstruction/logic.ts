import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDfsPathReconstructionSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
