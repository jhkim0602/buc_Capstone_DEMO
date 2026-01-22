import { useEffect, useRef, useCallback, useState } from 'react';
import { useCTPStore, VisualStep } from '@/components/features/ctp/store/use-ctp-store';

type EngineStatus = 'idle' | 'running' | 'paused' | 'completed' | 'error';

interface SkulptEngine {
    run: (code: string) => void;
    next: () => void;
    reset: () => void;
    status: EngineStatus;
    error: string | null;
}

import { AdapterFactory, AdapterType } from '@/components/features/ctp/adapters';

interface UseSkulptEngineProps {
    dataMapper?: (globals: any) => any; // Legacy support
    adapterType?: AdapterType; // New modular support
}

export function useSkulptEngine(props: UseSkulptEngineProps = {}): SkulptEngine {
    const { dataMapper: legacyMapper, adapterType } = props;

    // Resolve Mapper: Preference given to AdapterFactory if type is provided
    const dataMapper = useCallback((globals: any) => {
        if (adapterType) {
            const adapter = AdapterFactory.getAdapter(adapterType);
            return adapter.parse(globals);
        }
        if (legacyMapper) {
            return legacyMapper(globals);
        }
        return globals; // Raw fallback
    }, [adapterType, legacyMapper]);

    const workerRef = useRef<Worker | null>(null);
    const [status, setStatus] = useState<EngineStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const setSteps = useCTPStore(state => state.setSteps);
    const addStep = useCTPStore(state => state.addStep);
    const setPlayState = useCTPStore(state => state.setPlayState);

    // Initialize Worker
    useEffect(() => {
        // In Next.js, workers need to be handled carefully. 
        // For now, we assume public/workers/skulpt.worker.js is accessible
        // Or we might need to use standard "new Worker(new URL(...))" pattern if using bundler
        // Since we created it in 'web/workers/skulpt.worker.js', we might need to move it to 'public' or configure build.
        // Let's assume for this "Infrastructure Phase" that we point to the public path we will set up.

        // Wait: The file was written to `web/workers/skulpt.worker.js`. 
        // Direct import in Next.js usually requires valid bundling. 
        // A safe bet for "Infrastructure Phase" without webpack config changes is serving it as static file.
        // I will plan to move it to public/workers/ later or use the relative path if supported.

        // Fix: Load from public static assets to avoid Webpack/Next.js bundling issues
        // The worker is now located at /public/workers/skulpt.worker.js
        // Fix: Add cache busting to ensure latest worker code is loaded
        console.log("[Skulpt] Initializing Worker...");
        const worker = new Worker(`/workers/skulpt.worker.js?v=${Date.now()}`);
        workerRef.current = worker;

        worker.onmessage = (e) => {
            console.log("[Skulpt] Message from Worker:", e.data.type);
            const { type, line, variables, status: workerStatus, message } = e.data;

            if (type === 'STATUS') {
                setStatus(workerStatus);
                if (workerStatus === 'running') setPlayState('playing');
                if (workerStatus === 'completed') setPlayState('paused');
            } else if (type === 'ERROR') {
                setStatus('error');
                setError(message);
                console.error("Skulpt Error:", message);
            } else if (type === 'BATCH_STEPS') {
                // Optimization: Receive all steps at once
                const { steps: rawSteps } = e.data;

                const processedSteps: VisualStep[] = rawSteps.map((s: any, idx: number) => {
                    const visualData = dataMapper ? dataMapper(s.variables) : s.variables;
                    return {
                        id: `step-${Date.now()}-${idx}`,
                        description: `Line ${s.line}`,
                        activeLine: s.line,
                        data: visualData,
                        stdout: s.stdout // [NEW] Pass captured stdout
                    };
                });

                setStatus('paused');
                setSteps(processedSteps);
            }
        };

        worker.onerror = (err) => {
            console.error("Worker Script Error:", err);
            setError("Simulation Engine Failed to Load (Network/Path Error). Please refresh.");
            setStatus('error');
        };

        return () => {
            worker.terminate();
        };
    }, [setSteps, addStep, setPlayState, dataMapper]);

    const run = useCallback((code: string) => {
        if (!workerRef.current) return;
        setSteps([]); // Clear previous
        setError(null);
        workerRef.current.postMessage({ type: 'RUN_CODE', code });
    }, [setSteps]);

    const next = useCallback(() => {
        if (workerRef.current) {
            workerRef.current.postMessage({ type: 'NEXT_STEP' });
        }
    }, []);

    const reset = useCallback(() => {
        if (workerRef.current) {
            workerRef.current.terminate();
            // Re-init logic would be needed here or just reload
            // simplified:
            window.location.reload(); // naive reset for prototype
        }
    }, []);

    return { run, next, reset, status, error };
}
