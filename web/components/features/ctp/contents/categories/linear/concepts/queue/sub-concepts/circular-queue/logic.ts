import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useCircularQueueSimulation = () => {
    const { run } = useSkulptEngine({ adapterType: 'queue' });
    return { runSimulation: run };
};
