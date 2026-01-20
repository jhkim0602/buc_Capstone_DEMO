"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, CornerDownLeft, MoveLeft } from "lucide-react";

export interface LinkedListNode {
  id: string | number;
  value: any;
  nextId?: string | number | null;
  prevId?: string | number | null;
  label?: string; // e.g. "Head", "Tail"
  isHighlighted?: boolean;
  color?: string;
  isNull?: boolean; // For null terminator visualization
}

interface LinkedListVisualizerProps {
  data: LinkedListNode[];
  type?: "singly" | "doubly" | "circular";
  emptyMessage?: string;
}

export function LinkedListVisualizer({
  data,
  type = "singly",
  emptyMessage = "리스트가 비어있습니다."
}: LinkedListVisualizerProps) {

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg bg-muted/20 text-muted-foreground transition-all">
        {emptyMessage}
      </div>
    );
  }

  // Helper to find if the last node points to the first (Cycle check)
  // For 'circular' type optimization, we can just visually simulate the return loop.
  const isCircular = type === "circular";

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px] overflow-x-auto">
      <div className="flex items-center gap-2 relative">
        <AnimatePresence mode="popLayout">
          {data.map((node, index) => {
             const isLast = index === data.length - 1;

             return (
              <motion.div
                key={node.id}
                layout
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{
                  opacity: 1,
                  scale: node.isHighlighted ? 1.1 : 1,
                  x: 0,
                  transition: { type: "spring", stiffness: 300, damping: 25 }
                }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                className="flex items-center"
              >
                {/* 1. The Node Itself */}
                <div className="relative group">
                    {/* Label (Head/Tail etc) */}
                    {node.label && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-primary animate-bounce">
                        {node.label}
                        <div className="w-0.5 h-2 bg-primary mx-auto mt-0.5"></div>
                      </div>
                    )}

                    <div className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold shadow-md border-2 transition-colors z-10 relative bg-background",
                      node.isHighlighted
                        ? "border-primary text-primary ring-4 ring-primary/20"
                        : "border-border text-foreground group-hover:border-primary/50",
                      node.isNull && "bg-muted text-muted-foreground w-12 h-12 border-dashed text-sm"
                    )}>
                      {node.isNull ? "NULL" : node.value}
                    </div>

                    {/* Address/ID hint */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground font-mono opacity-50">
                      {typeof node.id === 'string' && node.id.startsWith('node-') ? '' : node.id}
                    </div>
                </div>

                {/* 2. Connection Arrows */}
                {!isLast && !node.isNull && (
                  <div className="mx-2 flex flex-col items-center justify-center text-muted-foreground/40">
                    <ArrowRight size={24} className={cn(type === 'doubly' && "mb-1")} />
                    {type === 'doubly' && <MoveLeft size={24} />}
                  </div>
                )}

                {/* 3. Circular Loop Visualization (Only for valid last node in circular mode) */}
                {isCircular && isLast && !node.isNull && (
                   <div className="absolute top-full right-0 w-full h-12 border-b-2 border-l-2 border-dashed border-muted-foreground/30 rounded-bl-3xl flex items-end justify-start pointer-events-none transform translate-y-[-50%] z-0">
                      {/* Using absolute positioning to draw a "return" path back to start */}
                      {/* NOTE: This is a simplified visual. Real circular link drawing requires SVG for perfect alignment.
                          For this component, we imply it with a 'return' arrow icon at the end. */}
                      <div className="flex items-center text-xs text-muted-foreground/60 gap-1 absolute right-[-40px]">
                        <ArrowRight className="rotate-90" size={16}/>
                        <span>To Head</span>
                      </div>
                   </div>
                )}

              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const SinglyLinkedListVisualizer = (props: any) => <LinkedListVisualizer {...props} type="singly" />;
export const DoublyLinkedListVisualizer = (props: any) => <LinkedListVisualizer {...props} type="doubly" />;
export const CircularLinkedListVisualizer = (props: any) => <LinkedListVisualizer {...props} type="circular" />;
