import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const usePQBasicsSimulation = () => {
    const { run } = useSkulptEngine({ adapterType: 'queue' });
    return { runSimulation: run };
};
