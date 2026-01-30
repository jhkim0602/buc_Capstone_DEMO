import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useUnionRankSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "union-find" });

  return { runSimulation: run };
};
