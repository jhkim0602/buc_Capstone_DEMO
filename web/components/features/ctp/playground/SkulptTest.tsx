import React, { useState } from 'react';
import { useSkulptEngine } from '@/hooks/use-skulpt-engine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCTPStore } from '@/components/features/ctp/store/use-ctp-store';

export default function SkulptTest() {
    const [code, setCode] = useState(`print("Hello Skulpt")\nx = 10\nfor i in range(3):\n    x += i\n    print(f"Step {i}: x={x}")\nprint("Done")`);
    const { run, next, reset, status, error } = useSkulptEngine();
    const steps = useCTPStore(state => state.steps);

    return (
        <div className="p-4 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Skulpt Engine Prototype (Status: {status})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Button onClick={() => run(code)} disabled={status === 'running' || status === 'paused'}>Run</Button>
                        <Button onClick={next} disabled={status !== 'paused'} variant="secondary">Next Step</Button>
                        <Button onClick={reset} variant="destructive">Reset</Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 h-96">
                        <textarea
                            className="w-full h-full p-2 border rounded font-mono text-sm bg-slate-950 text-slate-50"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <div className="border rounded p-2 overflow-auto bg-slate-100 dark:bg-slate-900">
                            <h3 className="font-bold mb-2">Live Steps ({steps.length})</h3>
                            {error && <div className="text-red-500 font-bold">{error}</div>}
                            {steps.map((step, idx) => (
                                <div key={idx} className={`p-2 border-b text-sm ${idx === steps.length - 1 ? 'bg-yellow-100 dark:bg-yellow-900' : ''}`}>
                                    <div className="font-semibold">Line {step.activeLine}</div>
                                    <pre className="text-xs">{JSON.stringify(step.data, null, 2)}</pre>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
