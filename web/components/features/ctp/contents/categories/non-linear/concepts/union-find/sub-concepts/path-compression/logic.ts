import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const usePathCompressionSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "union-find" });

  return { runSimulation: run };
};
