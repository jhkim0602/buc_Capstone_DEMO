import { useCallback } from "react";
import { useCTPStore } from "@/components/features/ctp/store/use-ctp-store";
import { LinkedListSimulator } from "../../common/linked-list-simulator";

export function useCircularLinkedListSim() {
    const { setSteps } = useCTPStore();

    const runSimulation = useCallback((code: string) => {
        const simulator = new LinkedListSimulator('circular');
        const steps = simulator.parseAndRun(code);
        setSteps(steps);
    }, [setSteps]);

    return { runSimulation };
}
