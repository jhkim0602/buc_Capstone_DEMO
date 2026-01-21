
import { useCallback } from "react";
import { useSkulptEngine } from "@/hooks/use-skulpt-engine";


export function useDoublyLinkedListSim() {
    // [Refactor] Use 'doubly-linked-list' adapter
    const { run } = useSkulptEngine({ adapterType: 'doubly-linked-list' });

    return { runSimulation: run };
}
