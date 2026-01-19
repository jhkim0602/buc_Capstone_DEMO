"use client";

import { useEffect } from "react";
import { useCTPStore, VisualStep } from "@/components/features/ctp/store/use-ctp-store";
import { CTPPlayground } from "@/components/features/ctp/playground/ctp-playground";
import { LinearVisualizer } from "@/components/features/ctp/playground/visualizers/linear-visualizer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const INITIAL_CODE = `# Python 배열 (List) 기본 연산
arr = [10, 25, 30]

# 요소 추가 (Append)
arr.append(45)

# 요소 수정 (Update)
arr[1] = 99

# 마지막 요소 제거 (Pop)
arr.pop()`;

const toLinearItems = (arr: number[], activeIndex?: number) =>
  arr.map((val, idx) => ({
    id: `item-${idx}`, // simple stable id for demo
    value: val,
    isHighlighted: idx === activeIndex,
    label: idx.toString()
  }));

export default function ArrayContent() {
  const { setSteps, reset, steps, currentStepIndex, language, setCode } = useCTPStore();

  // Reset store on mount
  useEffect(() => {
    reset();
    setSteps([{
      id: 'init',
      description: 'Initial State',
      data: toLinearItems([10, 25, 30]),
    }]);
  }, [reset, setSteps]);

  // Handle Language Change
  useEffect(() => {
     if (language === 'javascript') {
        setCode(`// JavaScript 배열 기본 연산
const arr = [10, 25, 30];

// 요소 추가 (Push)
arr.push(45);

// 요소 수정 (Update)
arr[1] = 99;

// 마지막 요소 제거 (Pop)
arr.pop();`);
     } else if (language === 'python') {
        setCode(INITIAL_CODE);
     } else if (language === 'cpp') {
        setCode(`// C++ Vector 기본 연산
#include <vector>
using namespace std;

// Vector 초기화
vector<int> arr = {10, 25, 30};

// 요소 추가 (Push Back)
arr.push_back(45);

// 요소 수정 (Update)
arr[1] = 99;

// 마지막 요소 제거 (Pop Back)
arr.pop_back();`);
     } else if (language === 'java') {
        setCode(`// Java ArrayList 기본 연산
import java.util.*;

// ArrayList 초기화
ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(10, 25, 30));

// 요소 추가 (Add)
arr.add(45);

// 요소 수정 (Set)
arr.set(1, 99);

// 마지막 요소 제거 (Remove Last)
arr.remove(arr.size() - 1);`);
     }
  }, [language, setCode]);

  const handleRun = (codeInput: string) => {
    const lines = codeInput.split('\n');
    const newSteps: VisualStep[] = [];
    const language = useCTPStore.getState().language;

    // Simulating State
    let simulatedArr = [10, 25, 30]; // Default start if not defined

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
         // ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(1, 2, 3));
         // Simplified match for Arrays.asList content
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

      // 2. Append/Push/Add
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

      // 3. Update: arr[i] = x OR arr.set(i, x) for Java
      let updateMatch = null;
      if (language === 'java') {
         // arr.set(1, 99)
         const match = trimmed.match(/arr\.set\(\s*(\d+)\s*,\s*(\d+)\s*\)/);
         if (match) {
             const idx = parseInt(match[1]);
             const val = parseInt(match[2]);
             updateMatch = [match[0], idx, val] as any;
         }
      } else {
         // arr[1] = 99
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

      // 4. Pop: arr.pop(), arr.pop_back(), arr.remove(size-1)
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
       // Fallback message depending on language
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
    // Auto-start playback
    useCTPStore.getState().setPlayState('playing');
  };

  const currentData = steps[currentStepIndex]?.data || [];

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header (Intro) */}
      <section id="intro" className="space-y-4 border-b border-border/40 pb-8">
        <div className="flex items-center gap-2 text-sm text-primary font-mono mb-2">
           <span className="opacity-50">MODULE 01</span>
           <span className="opacity-50">/</span>
           <span>LINEAR DATA STRUCTURES</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">배열 (Array)</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          메모리 상에 원소를 연속적으로 배치하여, 인덱스를 통해 O(1) 시간 복잡도로 접근할 수 있는 가장 기본적인 선형 자료구조입니다.
        </p>
        <div className="flex gap-2 pt-2">
           <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Random Access</Badge>
           <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Static Size</Badge>
        </div>
      </section>

      {/* 2. Features */}
      <section id="features" className="prose prose-stone dark:prose-invert max-w-none">
        <h2>주요 특징</h2>
        <ul>
           <li><strong>임의 접근 (Random Access):</strong> 인덱스(Index)를 사용하여 O(1) 시간에 어떤 원소든 즉시 접근할 수 있습니다.</li>
           <li><strong>캐시 지역성 (Cache Locality):</strong> 데이터가 물리 메모리 상에 연속적으로 저장되므로 CPU 캐시 히트율이 높아 성능이 우수합니다.</li>
           <li><strong>고정된 크기 (Static Size):</strong> (일반적인 C/Java 배열의 경우) 생성 시 크기가 고정되며, 크기를 변경하려면 새로운 배열을 할당하고 복사해야 하는 비용이 발생합니다.</li>
           <li><strong>삽입/삭제의 비효율성:</strong> 배열의 중간에 원소를 삽입하거나 삭제할 경우, 연속성을 유지하기 위해 뒤의 모든 원소를 이동시켜야 하므로 O(N)의 시간이 소요됩니다.</li>
        </ul>
      </section>

      {/* 3. Visualizer */}
      <section id="visualization" className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">시각화 학습하기</h2>
        <p className="text-muted-foreground mb-4">
           아래 에디터에서 코드를 작성하고 실행하여 배열의 동작 원리를 직접 확인해보세요!
        </p>

        {/* Dynamic Command Reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
           {(language === 'python' ? [
              { label: '초기화', code: 'arr = [1, 2, 3]' },
              { label: '추가', code: 'arr.append(10)' },
              { label: '수정', code: 'arr[1] = 99' },
              { label: '삭제', code: 'arr.pop()' },
           ] : language === 'javascript' ? [
              { label: '초기화', code: 'const arr = [1, 2]' },
              { label: '추가', code: 'arr.push(10)' },
              { label: '수정', code: 'arr[1] = 99' },
              { label: '삭제', code: 'arr.pop()' },
           ] : language === 'cpp' ? [
              { label: '초기화', code: 'vector<int> v={1}' },
              { label: '추가', code: 'v.push_back(10)' },
              { label: '수정', code: 'v[1] = 99' },
              { label: '삭제', code: 'v.pop_back()' },
           ] : [ // Java
              { label: '초기화', code: 'new ArrayList<>()' },
              { label: '추가', code: 'list.add(10)' },
              { label: '수정', code: 'list.set(1, 99)' },
              { label: '삭제', code: 'list.remove(i)' },
           ]).map((cmd, idx) => (
              <div key={idx} className="bg-muted/50 border border-border rounded px-3 py-2 flex flex-col justify-center">
                 <span className="text-[10px] text-muted-foreground font-semibold mb-0.5">{cmd.label}</span>
                 <code className="text-xs font-mono text-primary truncate" title={cmd.code}>{cmd.code}</code>
              </div>
           ))}
        </div>

        <CTPPlayground
          initialCode={INITIAL_CODE}
          onRun={handleRun}
          visualizer={
            <LinearVisualizer
              data={currentData}
              emptyMessage="코드를 실행하여 시각화를 시작해보세요!"
            />
          }
        />
      </section>

      {/* 4. Complexity */}
      <section id="complexity">
        <h2 className="text-2xl font-bold tracking-tight mb-6">시간 복잡도</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-5 rounded-xl border border-border bg-card text-center hover:border-primary/50 transition-colors">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Access</div>
              <div className="text-2xl font-mono font-black text-green-500">O(1)</div>
              <div className="text-[10px] text-muted-foreground mt-1">인덱스 접근</div>
           </div>
           <div className="p-5 rounded-xl border border-border bg-card text-center hover:border-primary/50 transition-colors">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Search</div>
              <div className="text-2xl font-mono font-black text-yellow-500">O(N)</div>
              <div className="text-[10px] text-muted-foreground mt-1">값 탐색</div>
           </div>
           <div className="p-5 rounded-xl border border-border bg-card text-center hover:border-primary/50 transition-colors">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Insertion</div>
              <div className="text-2xl font-mono font-black text-red-500">O(N)</div>
              <div className="text-[10px] text-muted-foreground mt-1">중간 삽입</div>
           </div>
           <div className="p-5 rounded-xl border border-border bg-card text-center hover:border-primary/50 transition-colors">
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">Deletion</div>
              <div className="text-2xl font-mono font-black text-red-500">O(N)</div>
              <div className="text-[10px] text-muted-foreground mt-1">중간 삭제</div>
           </div>
        </div>
      </section>

      {/* 5. Implementation Code */}
      <section id="implementation" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">구현 코드</h2>
        <Tabs defaultValue="python" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-md">
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="cpp">C++</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>

          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm overflow-x-auto">
            <TabsContent value="python" className="mt-0 space-y-2">
              <div className="text-xs text-muted-foreground mb-2 font-sans">Python의 List는 동적 배열로 구현되어 있어 별도의 import 없이 바로 사용할 수 있습니다.</div>
              <pre className="text-foreground">{`# 1. 배열 선언 및 초기화
arr = [1, 2, 3, 4, 5]

# 2. 요소 접근 (Access) - O(1)
print(arr[2])  # 3

# 3. 요소 수정 (Update) - O(1)
arr[2] = 10
print(arr)     # [1, 2, 10, 4, 5]

# 4. 요소 추가 (Append) - Amortized O(1)
arr.append(6)
print(arr)     # [1, 2, 10, 4, 5, 6]

# 5. 요소 삽입 (Insert) - O(N)
arr.insert(1, 99)
print(arr)     # [1, 99, 2, 10, 4, 5, 6]

# 6. 요소 삭제 (Pop) - O(1) (끝 삭제)
arr.pop()
print(arr)     # [1, 99, 2, 10, 4, 5]`}</pre>
            </TabsContent>

            <TabsContent value="javascript" className="mt-0 space-y-2">
              <div className="text-xs text-muted-foreground mb-2 font-sans">JavaScript의 Array 역시 동적 배열이며, 다양한 내장 메서드를 제공합니다.</div>
              <pre className="text-foreground">{`// 1. 배열 선언 및 초기화
const arr = [1, 2, 3, 4, 5];

// 2. 요소 접근 (Access) - O(1)
console.log(arr[2]);  // 3

// 3. 요소 수정 (Update) - O(1)
arr[2] = 10;
console.log(arr);     // [1, 2, 10, 4, 5]

// 4. 요소 추가 (Push) - Amortized O(1)
arr.push(6);
console.log(arr);     // [1, 2, 10, 4, 5, 6]

// 5. 요소 삽입 (Splice) - O(N)
arr.splice(1, 0, 99);
console.log(arr);     // [1, 99, 2, 10, 4, 5, 6]

// 6. 요소 삭제 (Pop) - O(1) (끝 삭제)
arr.pop();
console.log(arr);     // [1, 99, 2, 10, 4, 5]`}</pre>
            </TabsContent>

            <TabsContent value="cpp" className="mt-0 space-y-2">
              <div className="text-xs text-muted-foreground mb-2 font-sans">C++에서는 STL의 <code>std::vector</code>를 사용하여 동적 배열을 구현합니다. C-Style 배열과 달리 크기가 자동 조절됩니다.</div>
              <pre className="text-foreground">{`// 1. Vector 선언 (동적 배열)
#include <vector>
#include <iostream>
using namespace std;

int main() {
    // C++11 list initialization
    vector<int> v = {1, 2, 3, 4, 5};

    // 2. 요소 접근 (Access) - O(1)
    cout << v[2] << endl;  // 3

    // 3. 요소 수정 (Update) - O(1)
    v[2] = 10;

    // 4. 요소 추가 (Push Back) - Amortized O(1)
    v.push_back(6);

    // 5. 요소 삽입 (Insert) - O(N)
    // begin() + index 위치에 삽입
    v.insert(v.begin() + 1, 99);

    // 6. 요소 삭제 (Pop Back) - O(1)
    v.pop_back();

    return 0;
}`}</pre>
            </TabsContent>

            <TabsContent value="java" className="mt-0 space-y-2">
              <div className="text-xs text-muted-foreground mb-2 font-sans">Java에서는 <code>ArrayList</code> 클래스를 사용하여 크기가 조정되는 배열을 구현합니다. Primitive type 대신 Wrapper Class(Integer)를 사용합니다.</div>
              <pre className="text-foreground">{`import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        // 1. ArrayList 선언 (동적 배열)
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        // 2. 요소 접근 (Access) - O(1)
        System.out.println(list.get(2)); // 3

        // 3. 요소 수정 (Update) - O(1)
        list.set(2, 10);

        // 4. 요소 추가 (Add) - Amortized O(1)
        list.add(6);

        // 5. 요소 삽입 (Insert) - O(N)
        list.add(1, 99);

        // 6. 요소 삭제 (Remove) - O(N) *Java ArrayList remove is O(N) for shifting
        list.remove(list.size() - 1);
    }
}`}</pre>
            </TabsContent>
          </div>
        </Tabs>
      </section>

      {/* 6. Practice Problems */}
      <section id="practice" className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">추천 문제 (Baekjoon)</h2>
        <div className="grid gap-3">
           <a href="https://www.acmicpc.net/problem/10818" target="_blank" rel="noreferrer" className="group block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all">
              <div className="flex items-center justify-between mb-1">
                 <span className="font-bold group-hover:text-primary transition-colors">10818. 최소, 최대</span>
                 <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">Bronze III</Badge>
              </div>
              <p className="text-sm text-muted-foreground">N개의 정수가 주어질 때, 최솟값과 최댓값을 구하는 가장 기초적인 배열 순회 문제입니다.</p>
           </a>

           <a href="https://www.acmicpc.net/problem/2562" target="_blank" rel="noreferrer" className="group block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all">
              <div className="flex items-center justify-between mb-1">
                 <span className="font-bold group-hover:text-primary transition-colors">2562. 최댓값 (Maximum Value)</span>
                 <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">Bronze III</Badge>
              </div>
              <p className="text-sm text-muted-foreground">9개의 서로 다른 자연수 중 최댓값을 찾고 그 값이 몇 번째 수인지(Index) 찾는 문제입니다.</p>
           </a>

           <a href="https://www.acmicpc.net/problem/1546" target="_blank" rel="noreferrer" className="group block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all">
              <div className="flex items-center justify-between mb-1">
                 <span className="font-bold group-hover:text-primary transition-colors">1546. 평균 (Average)</span>
                 <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">Bronze I</Badge>
              </div>
              <p className="text-sm text-muted-foreground">모든 점수를 `점수/M*100`으로 고쳤을 때의 새로운 평균을 구하는 문제로, 배열 전체 요소의 갱신이 필요합니다.</p>
           </a>
        </div>
      </section>
    </div>
  );
}
