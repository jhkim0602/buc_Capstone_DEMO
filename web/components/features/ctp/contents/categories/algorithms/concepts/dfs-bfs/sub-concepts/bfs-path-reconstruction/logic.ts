import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useBfsPathReconstructionSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "graph" });

  return { runSimulation: run };
};
