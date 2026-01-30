import { useSkulptEngine } from "@/hooks/use-skulpt-engine";

export const useDequeSimulation = () => {
    const { run } = useSkulptEngine({ adapterType: 'deque' });
    return { runSimulation: run };
};
