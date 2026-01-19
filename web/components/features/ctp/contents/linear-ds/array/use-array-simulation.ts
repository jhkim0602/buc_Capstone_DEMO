import { useCTPStore, VisualStep } from "@/components/features/ctp/store/use-ctp-store";

// Helper to convert array to visual items
const toLinearItems = (arr: number[], activeIndex?: number) =>
  arr.map((val, idx) => ({
    id: `item-${idx}`,
    value: val,
    isHighlighted: idx === activeIndex,
    label: idx.toString()
  }));

export function useArraySimulation() {
  const language = useCTPStore((state) => state.language);
  const setSteps = useCTPStore((state) => state.setSteps);
  const setPlayState = useCTPStore((state) => state.setPlayState);

  const runSimulation = (codeInput: string) => {
    const lines = codeInput.split('\n');
    const newSteps: VisualStep[] = [];

    // Initial Simulation State
    let simulatedArr = [10, 25, 30];

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('#')) return;

      // 1. Initialization
      let initMatch = null;
      if (language === 'python') {
         initMatch = trimmed.match(/arr\s*=\s*\[(.*?)\]/);
      } else if (language === 'javascript') {
         initMatch = trimmed.match(/(?:const|let|var)?\s*arr\s*=\s*\[(.*?)\]/);
      } else if (language === 'cpp') {
         // vector<int> arr = {1, 2, 3};
         initMatch = trimmed.match(/vector<int>\s*arr\s*=\s*\{(.*?)\}/);
      } else if (language === 'java') {
         // simplified match
         initMatch = trimmed.match(/Arrays\.asList\((.*?)\)/);
      }

      if (initMatch) {
         const content = initMatch[1];
         if (content) {
            simulatedArr = content.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
         } else {
            simulatedArr = [];
         }
         newSteps.push({
            id: `step-${lineIdx}`,
            description: `Initialize Array: [${simulatedArr.join(', ')}]`,
            data: toLinearItems([...simulatedArr]),
            activeLine: lineIdx + 1
         });
         return;
      }

      // 2. Append/Push/Add logic
      let pushVal: number | null = null;
      let pushCmd = '';

      if (language === 'python') {
         const match = trimmed.match(/arr\.append\(\s*(\d+)\s*\)/);
         if (match) { pushVal = parseInt(match[1]); pushCmd = 'append'; }
      } else if (language === 'javascript') {
         const match = trimmed.match(/arr\.push\(\s*(\d+)\s*\)/);
         if (match) { pushVal = parseInt(match[1]); pushCmd = 'push'; }
      } else if (language === 'cpp') {
         const match = trimmed.match(/arr\.push_back\(\s*(\d+)\s*\)/);
         if (match) { pushVal = parseInt(match[1]); pushCmd = 'push_back'; }
      } else if (language === 'java') {
         const match = trimmed.match(/arr\.add\(\s*(\d+)\s*\)/);
         if (match) { pushVal = parseInt(match[1]); pushCmd = 'add'; }
      }

      if (pushVal !== null) {
         simulatedArr.push(pushVal);
         newSteps.push({
            id: `step-${lineIdx}`,
            description: `arr.${pushCmd}(${pushVal}) - Add ${pushVal}`,
            data: toLinearItems([...simulatedArr], simulatedArr.length - 1),
            activeLine: lineIdx + 1
         });
         return;
      }

      // 3. Update: arr[i] = x OR arr.set(i, x)
      let updateMatch = null;
      if (language === 'java') {
         const match = trimmed.match(/arr\.set\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
         if (match) {
             const idx = parseInt(match[1]);
             const val = parseInt(match[2]);
             updateMatch = [match[0], idx, val] as any;
         }
      } else {
         const match = trimmed.match(/arr\[\s*(\d+)\s*\]\s*=\s*(\d+)/);
         if (match) {
             const idx = parseInt(match[1]);
             const val = parseInt(match[2]);
             updateMatch = [match[0], idx, val] as any;
         }
      }

      if (updateMatch) {
         const idx = updateMatch[1];
         const val = updateMatch[2];
         if (idx >= 0 && idx < simulatedArr.length) {
            simulatedArr[idx] = val;
            newSteps.push({
               id: `step-${lineIdx}`,
               description: `Update index ${idx} to ${val}`,
               data: toLinearItems([...simulatedArr], idx),
               activeLine: lineIdx + 1
            });
         }
         return;
      }

      // 4. Pop/Remove Logic
      let isPop = false;
      let popCmd = '';
      if (language === 'python' && trimmed.includes('arr.pop()')) { isPop = true; popCmd = 'pop()'; }
      else if (language === 'javascript' && trimmed.includes('arr.pop()')) { isPop = true; popCmd = 'pop()'; }
      else if (language === 'cpp' && trimmed.includes('arr.pop_back()')) { isPop = true; popCmd = 'pop_back()'; }
      else if (language === 'java' && trimmed.includes('arr.remove(arr.size()')) { isPop = true; popCmd = 'remove()'; }

      if (isPop) {
         const val = simulatedArr.pop();
         newSteps.push({
            id: `step-${lineIdx}`,
            description: `arr.${popCmd} - Remove ${val ?? 'last element'}`,
            data: toLinearItems([...simulatedArr]),
            activeLine: lineIdx + 1
         });
         return;
      }
    });

    if (newSteps.length === 0) {
        let msg = '';
        if (language === 'python') msg = 'Try arr.append(x), arr[i]=x, or arr.pop()';
        else if (language === 'javascript') msg = 'Try arr.push(x), arr[i]=x, or arr.pop()';
        else if (language === 'cpp') msg = 'Try arr.push_back(x), arr[i]=x, or arr.pop_back()';
        else if (language === 'java') msg = 'Try arr.add(x), arr.set(i, x), or arr.remove(...)';

       newSteps.push({
          id: 'error',
          description: `No valid operations found. ${msg}`,
          data: toLinearItems([...simulatedArr]),
       });
    }

    setSteps(newSteps);
    setPlayState('playing');
  };

  return { runSimulation };
}
