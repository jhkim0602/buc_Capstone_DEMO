import { useCallback } from "react";

export const useStackLifoSimulation = () => {
    // Interactive mode manages state locally in CTPInteractivePlayground.
    // This hook is just a placeholder to satisfy CTPModule interface.

    // Use useCallback to ensure the function reference remains stable
    const runSimulation = useCallback((code: string) => {
        console.log("Interactive Mode: Simulation skipped");
    }, []);

    return { runSimulation };
};
