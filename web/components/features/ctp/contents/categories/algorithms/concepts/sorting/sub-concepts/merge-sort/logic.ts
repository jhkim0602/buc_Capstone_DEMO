import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useMergeSortSimulation = () => {
  const { run } = useSkulptEngine({ adapterType: "merge-sort" });

  return { runSimulation: run };
};
