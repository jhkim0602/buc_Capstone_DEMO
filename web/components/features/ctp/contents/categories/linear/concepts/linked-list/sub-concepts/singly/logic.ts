
import { useCallback } from "react";
import { useSkulptEngine } from "@/hooks/use-skulpt-engine";


export function useSinglyLinkedListSim() {
    // [Refactor] Use 'linked-list' adapter
    const { run } = useSkulptEngine({ adapterType: 'linked-list' });

    return { runSimulation: run };
}
