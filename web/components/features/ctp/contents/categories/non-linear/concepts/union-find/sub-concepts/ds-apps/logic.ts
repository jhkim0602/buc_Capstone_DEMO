import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDsAppsSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "union-find" });

  return { runSimulation: run };
};
