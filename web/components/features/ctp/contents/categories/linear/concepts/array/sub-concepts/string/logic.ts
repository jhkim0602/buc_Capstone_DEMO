import { useCTPStore, VisualStep } from "@/components/features/ctp/store/use-ctp-store";
import { useCallback } from "react";

// For visualization data structure
interface MemoryNode {
    id: string;
    value: string;
    type: "stack" | "heap" | "pool";
    address?: string;
    label?: string;
    targetAddress?: string;
}

export function useStringSimulation() {
  const setSteps = useCTPStore((state) => state.setSteps);
  const setPlayState = useCTPStore((state) => state.setPlayState);

  const runSimulation = useCallback((codeInput: string) => {
    const lines = codeInput.split('\n');
    const newSteps: VisualStep[] = [];

    // Mock Memory System
    const pool: Record<string, string> = {}; // value -> address
    const heapItems: MemoryNode[] = [];
    const stackItems: MemoryNode[] = [];

    // Address Generator
    let poolAddrCounter = 1000;
    let heapAddrCounter = 5000;

    const getPoolAddress = (val: string) => {
        if (!pool[val]) {
            pool[val] = `@${poolAddrCounter++}`;
        }
        return pool[val];
    };

    // Helper to generate current snapshot
    const getSnapshot = () => {
        const nodes: MemoryNode[] = [];
        // Stack Nodes
        nodes.push(...stackItems);
        // Pool Nodes
        Object.entries(pool).forEach(([val, addr]) => {
            nodes.push({ id: `pool-${addr}`, value: val, type: 'pool', address: addr });
        });
        // Heap Nodes
        nodes.push(...heapItems);
        return nodes;
    };

    lines.forEach((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) return;

        // 1. Literal Declaration: a = "Hello"
        const literalMatch = trimmed.match(/(\w+)\s*=\s*["']([^"']+)["']/);
        // Exclude .join case (handled below)
        if (literalMatch && !trimmed.includes('.join') && !trimmed.includes('sys.intern')) {
            const varName = literalMatch[1];
            const val = literalMatch[2];
            const addr = getPoolAddress(val);

            const existStack = stackItems.find(s => s.label === varName);
            if (existStack) {
                existStack.targetAddress = addr;
            } else {
                stackItems.push({
                    id: `stack-${varName}`,
                    value: '',
                    type: 'stack',
                    label: varName,
                    targetAddress: addr
                });
            }

            newSteps.push({
                id: `step-${lineIdx}`,
                description: `Assign "${val}" to ${varName} (Pointing to Pool ${addr})`,
                data: getSnapshot(),
                activeLine: lineIdx + 1
            });
            return;
        }

        // 2. Heap Alloc via "".join() or operations
        // c = "".join(["He", "llo"])
        if (trimmed.includes('.join')) {
             const assignMatch = trimmed.match(/(\w+)\s*=\s*.*\.join/);
             if (assignMatch) {
                 const varName = assignMatch[1];
                 // Mock value, hardcoded or simple parse (too complex to run real python)
                 // Let's assume demo code produces "Hello"
                 const val = "Hello";
                 const addr = `@${heapAddrCounter++}`;

                 heapItems.push({
                    id: `heap-${addr}`,
                    value: val,
                    type: 'heap',
                    address: addr
                 });

                 const existStack = stackItems.find(s => s.label === varName);
                 if (existStack) {
                    existStack.targetAddress = addr;
                 } else {
                    stackItems.push({
                        id: `stack-${varName}`,
                        value: '',
                        type: 'stack',
                        label: varName,
                        targetAddress: addr
                    });
                 }

                 newSteps.push({
                    id: `step-${lineIdx}`,
                    description: `Runtime Join -> Created "${val}" in Heap (${addr})`,
                    data: getSnapshot(),
                    activeLine: lineIdx + 1
                 });
             }
             return;
        }

        // 3. sys.intern
        if (trimmed.includes('sys.intern')) {
            // c = sys.intern(c)
             newSteps.push({
                id: `step-${lineIdx}-intern`,
                description: `sys.intern() called -> Moved to Pool`,
                data: getSnapshot(),
                activeLine: lineIdx + 1
            });
        }
    });

    if (newSteps.length === 0) {
        newSteps.push({
            id: 'init',
            description: 'Start Simulation',
            data: [],
            activeLine: 0
        });
    }

    setSteps(newSteps);
    setPlayState('playing');
  }, [setSteps, setPlayState]);

  return { runSimulation };
}
