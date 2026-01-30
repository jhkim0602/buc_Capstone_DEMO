import { useCallback, useState } from "react";
import { VisualItem } from "@/components/features/ctp/common/types";

// Factory Mode: Reusing Array logic manually for now
export const useLinearQueueSimulation = () => {
    // Local state for interactive mode (Factory Mode shortcut)
    const [queue, setQueue] = useState<(number | null)[]>(Array(8).fill(null));
    const [front, setFront] = useState(0);
    const [rear, setRear] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(p => [`> ${msg}`, ...p]);

    // Handlers
    const handlePush = () => {
        if (rear >= 8) {
            addLog("❌ Queue Overflow! (꽉 찼습니다)");
            return;
        }
        const val = Math.floor(Math.random() * 100);
        const newQueue = [...queue];
        newQueue[rear] = val;
        setQueue(newQueue);
        setRear(p => p + 1);
        addLog(`✅ Enqueue: ${val} (Rear: ${rear + 1})`);
    };

    const handlePop = () => {
        if (front === rear) {
            addLog("❌ Queue Underflow! (비어있습니다)");
            return;
        }
        const val = queue[front];

        // [Fix] Visually remove the item by setting to null
        const newQueue = [...queue];
        newQueue[front] = null;
        setQueue(newQueue);

        setFront(p => p + 1);
        addLog(`📤 Dequeue: ${val} (Front: ${front + 1})`);
    };

    const handlePeek = () => {
        if (front === rear) {
            addLog("❌ Queue is empty");
            return;
        }
        addLog(`👀 Front [${front}]: ${queue[front]}`);
    };

    const handleClear = () => {
        setQueue(Array(8).fill(null));
        setFront(0);
        setRear(0);
        setLogs([]);
        addLog("Queue Cleared");
    };

    // Code input is ignored in 'interactive' mode for now
    const runSimulation = useCallback((code: string) => {
        // Not used in interactive mode
    }, []);

    // Helper to format for Visualizer
    const getVisualItems = (): VisualItem[] => {
        return queue.map((val, idx) => {
            let label = idx.toString();
            let status: VisualItem['status'] = undefined;

            const isFront = idx === front;
            const isRear = idx === rear;

            // Logic state debugging
            if (isFront && isRear) {
                 label = "Front/Rear";
                 status = 'comparing'; // Yellow
            } else if (isFront) {
                label = "Front";
                status = 'active'; // Blue
            } else if (isRear) {
                label = "Rear";
                status = 'success'; // Green
            } else if (idx === 7 && rear === 8) {
                // If Full, handle visual cue
                label = "Rear(Full)";
                status = 'pop';
            }

            return {
                id: idx,
                // Ensure null renders properly or remains null.
                // Visualizer likely renders null as empty.
                value: val,
                label: label,
                // Only highlight valid range. Nulls are outside valid range.
                isHighlighted: idx >= front && idx < rear,
                status: status
            };
        });
    };

    return {
        runSimulation,
        interactive: {
            visualData: getVisualItems(),
            logs,
            handlers: {
                push: handlePush,
                pop: handlePop,
                peek: handlePeek,
                clear: handleClear
            }
        }
    };
};
