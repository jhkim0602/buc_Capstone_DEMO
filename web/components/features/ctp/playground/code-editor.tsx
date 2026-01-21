"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useRef, useEffect } from "react";

interface CodeEditorProps {
  initialCode?: string;
  value?: string; // Controlled value
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  activeLine?: number; // 1-based line number to highlight
}

export function CodeEditor({
  initialCode = "",
  value,
  onChange,
  readOnly = false,
  activeLine
}: CodeEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]); // Store current decoration IDs

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Optional: Configure compiler options or custom theme here
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
  };

  // Execution Highlight Effect
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    if (activeLine && activeLine > 0) {
      // Add new decoration
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
        {
          range: {
            startLineNumber: activeLine,
            startColumn: 1,
            endLineNumber: activeLine,
            endColumn: 1
          },
          options: {
            isWholeLine: true,
            className: "line-execution-highlight" // defined in global.css
            // inlineClassName: "myInlineDecoration" // if we wanted text color change
          }
        }
      ]);

      // Auto-scroll to active line if out of view (Optional, but good UX)
      editor.revealLineInCenterIfOutsideViewport(activeLine);

    } else {
      // Clear decorations if no active line
      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, []);
    }
  }, [activeLine]);

  return (
    <div className="h-full w-full min-h-[300px] rounded-md overflow-hidden border border-border/50">
      <Editor
        height="100%"
        defaultLanguage="python"
        language="python"
        defaultValue={initialCode}
        value={value}
        theme={theme === "dark" ? "vs-dark" : "light"}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: readOnly,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          fontFamily: "'Fira Code', 'Menlo', 'Monaco', 'Courier New', monospace",
        }}
      />
    </div>
  );
}
