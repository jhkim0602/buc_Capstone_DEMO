
import { useCallback } from "react";
import { useSkulptEngine } from "@/hooks/use-skulpt-engine";


export function useTwoPointersSim() {
    // [Refactor] Use 'linked-list' adapter (Standard Traversal)
    const { run } = useSkulptEngine({ adapterType: 'linked-list' });

    return { runSimulation: run };
}
