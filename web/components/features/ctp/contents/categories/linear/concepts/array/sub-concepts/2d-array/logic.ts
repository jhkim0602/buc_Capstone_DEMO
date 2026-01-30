
import { useSkulptEngine } from "@/hooks/use-skulpt-engine";
import { GridItem } from "@/components/features/ctp/common/types";

export function useArray2DSimulation() {
    // [Refactor] Use 'grid' adapter
    const { run } = useSkulptEngine({ adapterType: 'grid' });

    return { runSimulation: run };
}
