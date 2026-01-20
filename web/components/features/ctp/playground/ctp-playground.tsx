"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditor } from "./code-editor";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, RotateCcw, ChevronRight, Pause, ChevronLeft, FastForward, Settings2 } from "lucide-react";
import { useCTPStore } from "../store/use-ctp-store";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CTPPlaygroundProps {
  initialCode: string;
  visualizer: ReactNode; // The visualized component (Left Panel)
  onRun?: (code: string) => void; // Trigger execution simulation
}

export function CTPPlayground({ initialCode, visualizer, onRun }: CTPPlaygroundProps) {
  const {
    code,
    setCode,
    playState,
    setPlayState,
    currentStepIndex,
    setCurrentStep,
    steps,
    nextStep,
    prevStep,
    reset,
    playbackSpeed,
    setPlaybackSpeed
  } = useCTPStore();

  // Auto-Play Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (playState === 'playing') {
      interval = setInterval(() => {
        nextStep();
      }, playbackSpeed);
    }

    return () => clearInterval(interval);
  }, [playState, nextStep, playbackSpeed]);

  // Stop playing if we reach the end
  useEffect(() => {
    if (steps.length > 0 && currentStepIndex >= steps.length - 1 && playState === 'playing') {
       setPlayState('completed');
    }
  }, [currentStepIndex, steps.length, playState, setPlayState]);

  const handleRun = () => {
    if (onRun) {
      // If code is empty (initial state), use initialCode
      // CodeEditor updates store synchronously on change, so 'code' should be current.
      onRun(code || initialCode);
    }
  };

  const handleTogglePlay = () => {
    if (playState === 'playing') {
      setPlayState('paused');
    } else {
      if (currentStepIndex >= steps.length - 1) {
         // Restart if at end
         setCurrentStep(0);
      }
      setPlayState('playing');
    }
  };

  const handleScrubberChange = (value: number[]) => {
    setPlayState('paused');
    setCurrentStep(value[0]);
  };

  return (
    <div className="flex flex-col h-[700px] border border-border rounded-xl bg-background overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/20 gap-4">
        <div className="flex items-center gap-4 flex-1">
           <h3 className="font-bold text-sm flex items-center gap-2 min-w-fit">
             <span className={cn("w-2 h-2 rounded-full", playState === 'playing' ? "bg-green-500 animate-pulse" : "bg-muted-foreground")} />
             Playground
           </h3>

           <div className="h-6 w-px bg-border mx-1" />

           {/* Playback Controls */}
           <div className="flex items-center gap-1">
             <Button size="icon" variant="ghost" className="h-8 w-8" onClick={prevStep} disabled={currentStepIndex <= 0}>
               <ChevronLeft className="w-4 h-4" />
             </Button>

             <Button
                size="sm"
                variant={playState === 'playing' ? "secondary" : "default"}
                className={cn("h-8 px-3 transition-all", playState === 'playing' && "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300")}
                onClick={() => {
                   if (steps.length === 0) {
                      handleRun();
                   } else {
                      handleTogglePlay();
                   }
                }}
             >
                {playState === 'playing' ? (
                  <>
                    <Pause className="w-3.5 h-3.5 mr-1.5 fill-current" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> {steps.length > 0 ? "Resume" : "Run Code"}
                  </>
                )}
             </Button>

             <Button size="icon" variant="ghost" className="h-8 w-8" onClick={nextStep} disabled={currentStepIndex >= steps.length - 1}>
               <ChevronRight className="w-4 h-4" />
             </Button>
           </div>

           {/* Scrubber */}
           {steps.length > 0 && (
             <div className="flex-1 max-w-xs mx-2 flex flex-col justify-center">
                <Slider
                  value={[currentStepIndex < 0 ? 0 : currentStepIndex]}
                  max={Math.max(0, steps.length - 1)}
                  step={1}
                  onValueChange={handleScrubberChange}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-mono">
                  <span>Step {currentStepIndex + 1}</span>
                  <span>{steps.length}</span>
                </div>
             </div>
           )}

           {/* Speed Control */}
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 px-2 text-xs font-mono text-muted-foreground gap-1">
                  <Settings2 className="w-3.5 h-3.5" />
                  {(1000 / playbackSpeed).toFixed(1)}x
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setPlaybackSpeed(2000)}>0.5x (Slow)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlaybackSpeed(1000)}>1.0x (Normal)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlaybackSpeed(500)}>2.0x (Fast)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPlaybackSpeed(200)}>5.0x (Flash)</DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>

           <div className="h-6 w-px bg-border mx-1" />

           <Button size="sm" variant="default" className="h-8 text-xs gap-1.5 bg-green-600 hover:bg-green-700 text-white" onClick={() => {
              reset();
              handleRun();
           }}>
             <Play className="w-3.5 h-3.5 fill-current" />
             <span className="hidden sm:inline">Run Code</span>
           </Button>

           <div className="h-4 w-px bg-border mx-1" />

           <Badge variant="outline" className="text-[10px] font-mono border-yellow-500/30 text-yellow-600 bg-yellow-500/5 h-6 px-2 gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
               Python 3.10
           </Badge>
         </div>
       </div>

       <ResizablePanelGroup direction="horizontal">
        {/* Left: Visualizer */}
        <ResizablePanel defaultSize={50} minSize={30}>
           <div className="h-full w-full bg-muted/5 p-6 relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}
              />

              <div className="flex-1 flex items-center justify-center relative z-10">
                 {visualizer}
              </div>

              {/* Step Description Toast/Overlay */}
              {steps[currentStepIndex] && (
                 <div className="mt-4 p-3 bg-background/80 backdrop-blur border border-border rounded-lg text-sm shadow-sm animate-in fade-in slide-in-from-bottom-2">
                    <span className="font-bold text-primary mr-2">Step {currentStepIndex + 1}:</span>
                    {steps[currentStepIndex].description}
                 </div>
              )}
           </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right: Code Editor */}
        <ResizablePanel defaultSize={50} minSize={30}>
           <CodeEditor
             initialCode={initialCode}
             value={code}
             onChange={(val) => setCode(val || "")}
           />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
