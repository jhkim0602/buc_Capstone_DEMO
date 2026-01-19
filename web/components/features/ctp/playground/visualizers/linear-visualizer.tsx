"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LinearItem {
  id: string | number;
  value: any;
  label?: string; // e.g. index or variable name 'i', 'j'
  isHighlighted?: boolean;
  color?: string; // custom color override
}

interface LinearVisualizerProps {
  data: LinearItem[];
  emptyMessage?: string;
  orientation?: "horizontal" | "vertical";
}

export function LinearVisualizer({
  data,
  emptyMessage = "No Elements",
  orientation = "horizontal"
}: LinearVisualizerProps) {

  return (
    <div className={cn(
      "flex gap-3 p-4 min-h-[120px] items-center justify-center transition-all",
      orientation === "vertical" ? "flex-col" : "flex-row"
    )}>
      <AnimatePresence mode="popLayout">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: 1,
              scale: item.isHighlighted ? 1.1 : 1,
              y: 0,
              boxShadow: item.isHighlighted
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                : "none"
            }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative group"
          >
            {/* Index/Label Marker */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-mono text-muted-foreground opacity-60">
              {item.label ?? index}
            </div>

            {/* The Node Block */}
            <div className={cn(
               "w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm border-b-4 transition-colors duration-300",
               item.isHighlighted
                 ? "bg-primary text-primary-foreground border-primary-foreground/20 z-10"
                 : "bg-background border-border text-foreground hover:border-primary/50"
            )}>
              {item.value}
            </div>

            {/* Pointer/Arrow overlay? (Future) */}
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="text-muted-foreground text-sm font-medium"
         >
           {emptyMessage}
         </motion.div>
      )}
    </div>
  );
}
