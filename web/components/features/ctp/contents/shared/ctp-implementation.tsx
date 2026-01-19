"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeExample {
  language: 'python' | 'javascript' | 'cpp' | 'java';
  description?: string;
  code: string;
}

interface CTPImplementationProps {
  examples: CodeExample[];
}

export function CTPImplementation({ examples }: CTPImplementationProps) {
  return (
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
          {examples.map((ex) => (
            <TabsContent key={ex.language} value={ex.language} className="mt-0 space-y-2">
              {ex.description && (
                <div className="text-xs text-muted-foreground mb-2 font-sans" dangerouslySetInnerHTML={{ __html: ex.description }} />
              )}
              <pre className="text-foreground">{ex.code}</pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </section>
  );
}
