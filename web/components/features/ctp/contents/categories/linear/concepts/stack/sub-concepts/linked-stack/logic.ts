import { useSkulptEngine } from "@/hooks/use-skulpt-engine";
import { SkulptAdapter } from "@/components/features/ctp/common/skulpt-adapter";
import { useCallback } from "react";

export function useLinkedStackSimulation() {
    const dataMapper = useCallback((globals: any) => {
        // 1. Try to find 'stack' object and its 'top' pointer
        const stackObj = globals['stack'];

        if (stackObj && stackObj.top) {
            // Found a LinkedStack instance.
            // We want to visualize the list starting from 'stack.top'.
            // To reuse SkulptAdapter.toLinkedListItems (which scans globals for variables),
            // we create a synthetic globals object where 'Top' points to the first node.
            const syntheticGlobals = {
                // Label the pointer "Top" for visualization
                "Top": stackObj.top
            };
            return SkulptAdapter.toLinkedListItems(syntheticGlobals);
        }

        // 2. Fallback: If user didn't use the class but just made a list with 'head' or 'top'
        // Pass original globals so Adapter can find 'head', 'top', 'curr', etc.
        return SkulptAdapter.toLinkedListItems(globals);
    }, []);

    const { run } = useSkulptEngine({ dataMapper });

    return { runSimulation: run };
}
