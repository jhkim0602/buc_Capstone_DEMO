import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDp2DSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "grid" });

  return { runSimulation: run };
};
