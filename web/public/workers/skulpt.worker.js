/* eslint-disable no-restricted-globals */
// Web Worker for Skulpt Engine (Strict Isolation)

// Import Scripts (Simulated for Worker Environment)
// In a real app, these paths are relative to the worker file or public root
// We assume they are served from /libs/
importScripts('/libs/skulpt.min.js');
importScripts('/libs/skulpt-stdlib.js');

const ctx = self;

// --- 1. Worker State ---
let isRunning = false;
let nextResolver = null; // Promise resolve function to resume execution
let stepsBuffer = []; // Global buffer to avoid closure issues

// --- 2. Message Handler ---
ctx.onmessage = async (e) => {
    const { type, code, input } = e.data;

    switch (type) {
        case 'RUN_CODE':
            await runSkulpt(code);
            break;
        case 'NEXT_STEP':
            if (nextResolver) {
                const resolve = nextResolver;
                nextResolver = null;
                resolve(); // Resume Skulpt
            }
            break;
        case 'INPUT_RESPONSE':
            // Handle input() if we ever support it
            break;
    }
};

// --- 3. Core Engine Logic ---
async function runSkulpt(pythonCode) {
    if (isRunning) return; // Prevent double run
    isRunning = true;

    // Reset State
    ctx.postMessage({ type: 'STATUS', status: 'running' });
    let stepCount = 0;
    const MAX_STEPS = 500; // Safety limit

    // Mock "output" handler
    const outputBuffer = [];
    stepsBuffer = []; // Reset global buffer
    function outf(text) {
        outputBuffer.push(text);
        ctx.postMessage({ type: 'STDOUT', text });
    }

    // Configure Skulpt
    // @ts-ignore
    Sk.configure({
        output: outf,
        read: builtinRead,
        __future__: Sk.python3, // Enable Python 3 features

        // --- THE MAGIC: Custom Suspension for Debugging ---
        // This function is called by Skulpt at every line if 'debugging' is true
        breakpoints: function (filename, lineno, colno) {
            // 1. Capture State (Deep Copy needed to avoid mutation during pause)
            const snapshot = captureGlobals(Sk.globals);

            // 2. Buffer "Step" 
            stepsBuffer.push({
                line: lineno,
                col: colno,
                variables: snapshot,
                stdout: [...outputBuffer]
            });

            // 3. NO PAUSE - Continuous Execution for CTP Prototype
            // To prevent UI freezing in heavy loops, we could await a tiny delay every N steps
            // But for now, let's just run. 
            // We rely on Sk.execLimit (default) or our own counter to stop infinite loops

            stepCount++;
            if (stepCount > MAX_STEPS) {
                throw new Error("Execution Time Limit Exceeded (Infinite Loop Reference?)");
            }
        },
        debugging: true // Enable Step-Debugging
    });

    try {
        // Run Code
        // @ts-ignore
        await Sk.misceval.asyncToPromise(() => {
            // @ts-ignore
            return Sk.importMainWithBody("<stdin>", false, pythonCode, true);
        });

        // SEND ALL STEPS AT ONCE
        ctx.postMessage({ type: 'BATCH_STEPS', steps: stepsBuffer });
        ctx.postMessage({ type: 'STATUS', status: 'completed' });
    } catch (e) {
        ctx.postMessage({ type: 'ERROR', message: e.toString() });
    } finally {
        isRunning = false;
        nextResolver = null;
    }
}

// --- 4. Helper: Builtin Read ---
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// --- 5. Helper: State Capture (Serializer) ---
// Converts Skulpt's complex internal objects into JSON-friendly format
// --- 5. Helper: State Capture (Serializer) ---
// Converts Skulpt's complex internal objects into JSON-friendly format
// Preserves object identity/cycles for graph structures (Linked Lists)

function captureGlobals(globals) {
    const visited = new Map(); // Map<SkulptObject, JSObject>

    function serialize(val) {
        // 1. Primitive handling (return raw value)
        if (val === undefined || val === null) return null;

        // 2. Already visited (Cycle detection / Shared Reference)
        if (visited.has(val)) {
            return visited.get(val);
        }

        // 3. Skulpt Primitives
        // Sk.builtin.int, float, str, bool, none...
        // We can use Sk.ffi.remapToJs for simple types, but need to be careful not to recurse into complex ones.
        // Helper: check type name
        const typeName = val.tp$name;

        if (!typeName) {
            // Raw JS values (shouldn't happen often in Sk.globals but possible)
            return val;
        }

        if (typeName === 'int' || typeName === 'float' || typeName === 'str' || typeName === 'bool') {
            return Sk.ffi.remapToJs(val);
        }
        if (typeName === 'NoneType') return null;

        // 4. Complex Types (Create placeholder -> Register execution -> Fill content)
        let result;

        if (typeName === 'list' || typeName === 'tuple') {
            result = [];
            visited.set(val, result); // Register before recursion
            // Iterate Skulpt list
            // val.v is the internal array
            if (val.v && Array.isArray(val.v)) {
                val.v.forEach(item => {
                    result.push(serialize(item));
                });
            }
        }
        else if (typeName === 'dict') {
            result = {};
            visited.set(val, result);
            // Iterate keys
            // dict uses internal combination of keys/values
            // simpler to use Sk.builtin.dict methods or iterate internal items if accessible
            // accessing internal .entries() or similar is safest if exposed, else remapToJs might be easier but risky

            // Fallback: Sk.ffi.remapToJs works well for dicts usually, but we want our recursion.
            // Manual iteration:
            if (val.tp$iter) {
                const it = val.tp$iter(val);
                let item;
                while ((item = it.tp$iternext()) !== undefined) {
                    const jsKey = Sk.ffi.remapToJs(item); // keys are usually strings/ints
                    const skVal = val.mp$subscript(item);
                    result[jsKey] = serialize(skVal);
                }
            }
        }
        else {
            // 5. Custom Objects / Instances (e.g. Node)

            // STABLE ID GENERATION
            // We attach a unique ID to the Skulpt object itself so it persists across steps
            if (!val._ctp_id) {
                val._ctp_id = 'obj-' + Math.random().toString(36).substr(2, 9);
            }

            // Captured as Generic Object with type info
            result = { __type: typeName, __id: val._ctp_id };
            visited.set(val, result);

            // Inspect attributes (stored in $d)
            if (val.$d) {
                // Check if $d is a Skulpt Dict (Python 3)
                if (val.$d.tp$name === 'dict') {
                    const dict = val.$d;
                    if (dict.tp$iter) {
                        const it = dict.tp$iter(dict);
                        let item;
                        while ((item = it.tp$iternext()) !== undefined) {
                            const jsKey = Sk.ffi.remapToJs(item);
                            const skVal = dict.mp$subscript(item);
                            if (typeof jsKey === 'string' && jsKey.startsWith('__')) continue;
                            result[jsKey] = serialize(skVal);
                        }
                    }
                } else {
                    // Legacy Object Behavior
                    for (const key in val.$d) {
                        if (key.startsWith('__')) continue;
                        result[key] = serialize(val.$d[key]);
                    }
                }
            }
        }

        return result;
    }

    const result = {};
    for (const key in globals) {
        if (key.startsWith('__')) continue;
        result[key] = serialize(globals[key]);
    }
    return result;
}
