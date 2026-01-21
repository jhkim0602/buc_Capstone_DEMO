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

         // 1. Initialization: arr = [...]
         // Supported formats: arr = [1, 2, 3] or arr=[1,2,3]
         const initMatch = trimmed.match(/arr\s*=\s*\[(.*?)\]/);
         if (initMatch) {
            const content = initMatch[1];
            if (content && content.trim().length > 0) {
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

         // 2. Append: arr.append(x)
         const appendMatch = trimmed.match(/arr\.append\(\s*(-?\d+)\s*\)/);
         if (appendMatch) {
            const pushVal = parseInt(appendMatch[1]);
            simulatedArr.push(pushVal);
            newSteps.push({
               id: `step-${lineIdx}`,
               description: `arr.append(${pushVal}) - Add ${pushVal}`,
               data: toLinearItems([...simulatedArr], simulatedArr.length - 1),
               activeLine: lineIdx + 1
            });
            return;
         }

         // 3. Update: arr[i] = x
         const updateMatch = trimmed.match(/arr\[\s*(\d+)\s*\]\s*=\s*(-?\d+)/);
         if (updateMatch) {
            const idx = parseInt(updateMatch[1]);
            const val = parseInt(updateMatch[2]);

            if (idx >= 0 && idx < simulatedArr.length) {
               simulatedArr[idx] = val;
               newSteps.push({
                  id: `step-${lineIdx}`,
                  description: `Update index ${idx} to ${val}`,
                  data: toLinearItems([...simulatedArr], idx),
                  activeLine: lineIdx + 1
               });
            } else {
               // Error step for out of bounds? 
               // Currently just ignoring or letting it crash could be bad.
               // Let's at least show a visual step with error description?
               // For now, consistent behavior: ignore invalid ops logic-wise
            }
            return;
         }

         // 4. Pop: arr.pop()
         if (trimmed.includes('arr.pop()')) {
            if (simulatedArr.length > 0) {
               const val = simulatedArr.pop();
               newSteps.push({
                  id: `step-${lineIdx}`,
                  description: `arr.pop() - Remove ${val}`,
                  data: toLinearItems([...simulatedArr]),
                  activeLine: lineIdx + 1
               });
            } else {
               // Removing from empty array
               newSteps.push({
                  id: `step-${lineIdx}`,
                  description: `arr.pop() - Error: Index out of range`,
                  data: toLinearItems([...simulatedArr]),
                  activeLine: lineIdx + 1
               });
            }
            return;
         }
      });

      if (newSteps.length === 0) {
         newSteps.push({
            id: 'error',
            description: `No valid operations found. Try arr.append(x), arr[i]=x, or arr.pop()`,
            data: toLinearItems([...simulatedArr]),
         });
      }

      setSteps(newSteps);
      setPlayState('playing');
   };

   return { runSimulation };
}
