
import { useSkulptEngine } from "@/hooks/use-skulpt-engine";
import { useCallback } from "react";

export function useArray1DSimulation() {
   // [Refactor] Use 'array' adapter via Factory
   const { run } = useSkulptEngine({ adapterType: 'array' });

   return { runSimulation: run };
}
