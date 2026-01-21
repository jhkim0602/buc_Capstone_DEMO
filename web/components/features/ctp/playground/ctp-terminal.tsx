import React, { useEffect, useRef } from 'react';
import { Terminal, ScrollText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CTPTerminalProps {
    output: string[];
}

export function CTPTerminal({ output }: CTPTerminalProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    // Auto-scroll removed as per user request
    // useEffect(() => { ... });

    return (
        <div className="flex flex-col h-full bg-white border-t border-border font-mono text-sm shadow-inner">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
                <Terminal className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-600 font-medium">Terminal / Console</span>
                <div className="ml-auto flex items-center gap-2">
                    {/* Potential Clear Button here */}
                </div>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1 p-3">
                <div className="flex flex-col gap-1 min-h-full">
                    {output.length === 0 ? (
                        <div className="flex items-center gap-2 text-gray-400 italic p-2 select-none">
                            <ScrollText className="w-4 h-4" />
                            <span>출력 대기 중... (print() 문을 실행해보세요)</span>
                        </div>
                    ) : (
                        output.map((line, i) => (
                            <div key={i} className="text-slate-800 break-words leading-tight whitespace-pre-wrap font-medium">
                                {line}
                            </div>
                        ))
                    )}
                    {/* Auto-scroll anchor removed */}
                </div>
            </ScrollArea>
        </div>
    );
}
