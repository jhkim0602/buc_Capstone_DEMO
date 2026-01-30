import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useCollisionSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: 'hash-table' });
  return { runSimulation: run };
};
