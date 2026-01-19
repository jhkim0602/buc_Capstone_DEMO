"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ArrayContent() {
  const [array, setArray] = useState([10, 25, 30, 45, 50]);

  const addElement = () => {
    if (array.length < 8) {
      setArray([...array, Math.floor(Math.random() * 100)]);
    }
  };

  const removeElement = () => {
    if (array.length > 0) {
      setArray(array.slice(0, -1));
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Header Section */}
      <div className="space-y-4 border-b border-border/40 pb-8">
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
      </div>

      {/* 2. Visualization Playground (The "Interactive" Part) */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
         <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               Visualizer
            </h3>
            <div className="flex gap-2">
               <Button size="sm" variant="outline" onClick={addElement} disabled={array.length >= 8}>
                  <Plus className="w-4 h-4 mr-1" /> Push
               </Button>
               <Button size="sm" variant="outline" onClick={removeElement} disabled={array.length === 0}>
                  <Trash2 className="w-4 h-4 mr-1" /> Pop
               </Button>
               <Button size="sm" variant="ghost">
                  <RotateCcw className="w-4 h-4" /> Reset
               </Button>
            </div>
         </div>

         <div className="h-64 flex items-center justify-center bg-muted/5 relative">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="flex items-end gap-2 px-8">
               {array.map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -20, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="relative group"
                  >
                     {/* Index Label */}
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground opacity-50">
                        {idx}
                     </div>

                     {/* Data Block */}
                     <div className="w-16 h-16 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/20 border-b-4 border-primary-foreground/20">
                        {val}
                     </div>

                     {/* Memory Address Style */}
                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground/40">
                        0x{200 + idx * 4}
                     </div>
                  </motion.div>
               ))}

               {array.length === 0 && (
                  <div className="text-muted-foreground flex flex-col items-center gap-2">
                     <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <RotateCcw className="w-5 h-5 opacity-50" />
                     </div>
                     <span className="text-sm">Array is empty</span>
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* 3. Explanation Text (Wiki Body) */}
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <h2>특징</h2>
        <ul>
           <li><strong>임의 접근 (Random Access):</strong> 인덱스를 통해 모든 원소에 O(1)로 접근 가능합니다.</li>
           <li><strong>캐시 지역성 (Cache Locality):</strong> 메모리 상에 연속적으로 위치하여 CPU 캐시 효율이 높습니다.</li>
           <li><strong>삽입/삭제의 비효율성:</strong> 중간에 원소를 추가하거나 삭제하려면 O(N) 시간이 걸립니다.</li>
        </ul>

        <h2>시간 복잡도</h2>
        <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
           <div className="p-4 rounded-lg bg-muted text-center">
              <div className="text-xs text-muted-foreground mb-1">Access</div>
              <div className="font-mono font-bold text-green-600">O(1)</div>
           </div>
           <div className="p-4 rounded-lg bg-muted text-center">
              <div className="text-xs text-muted-foreground mb-1">Search</div>
              <div className="font-mono font-bold text-yellow-600">O(N)</div>
           </div>
           <div className="p-4 rounded-lg bg-muted text-center">
              <div className="text-xs text-muted-foreground mb-1">Insertion</div>
              <div className="font-mono font-bold text-red-600">O(N)</div>
           </div>
           <div className="p-4 rounded-lg bg-muted text-center">
              <div className="text-xs text-muted-foreground mb-1">Deletion</div>
              <div className="font-mono font-bold text-red-600">O(N)</div>
           </div>
        </div>
      </div>
    </div>
  );
}
