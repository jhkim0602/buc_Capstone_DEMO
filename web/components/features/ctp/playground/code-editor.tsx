"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useRef } from "react";

interface CodeEditorProps {
  initialCode?: string;
  value?: string; // Controlled value
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

export function CodeEditor({
  initialCode = "",
  value,
  onChange,
  readOnly = false
}: CodeEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Optional: Configure compiler options or custom theme here
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
  };

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
