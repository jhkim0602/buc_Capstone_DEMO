import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useHashImplementSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: 'hash-table' });
  return { runSimulation: run };
};
