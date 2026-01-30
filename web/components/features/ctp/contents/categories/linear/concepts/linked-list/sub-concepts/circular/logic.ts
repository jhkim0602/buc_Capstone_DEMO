
import { useCallback } from "react";
import { useSkulptEngine } from "@/hooks/use-skulpt-engine";


export function useCircularLinkedListSim() {
    // [Refactor] Use 'circular-linked-list' adapter
    const { run } = useSkulptEngine({ adapterType: 'circular-linked-list' });

    return { runSimulation: run };
}
