"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useEffect, useState, useMemo, useRef, memo } from "react";
import { useTheme } from "next-themes";

// ... (imports)

interface UserInfo {
  name: string;
  color: string;
}

interface DocumentEditorProps {
  docId: string;
  initialContent?: any;
  readOnly?: boolean;
  onSave?: (content: any) => void;
  user?: UserInfo;
}

// ... (component definition)

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:4000";

export function DocumentEditor({
  docId,
  initialContent,
  readOnly = false,
  onSave,
  user,
}: DocumentEditorProps) {
  const { theme } = useTheme();

  // Create Yjs provider and doc
  const { doc, provider } = useMemo(() => {
    const doc = new Y.Doc();
    const provider = new WebsocketProvider(WS_URL, `doc:${docId}`, doc);
    return { doc, provider };
  }, [docId]);

  // Cleanup provider on unmount
  useEffect(() => {
    console.log(`[DocumentEditor] Mounting/Provider Init: ${docId}`);
    return () => {
      console.log(`[DocumentEditor] Unmounting/Cleanup: ${docId}`);
      provider.disconnect();
      doc.destroy();
    };
  }, [provider, doc, docId]);
  // ...

  // Stable user info
  const userInfo = useMemo(() => {
    if (user) return user;
    if (typeof window === "undefined")
      return { name: "Anonymous", color: "#ff0000" };
    return {
      name: getRandomName(),
      color: getRandomColor(),
    };
  }, [user]);

  // ... (rest of the file)

  // Create editor instance
  const editor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: userInfo,
    },
    uploadFile: async (file) => {
      // TODO: Implement file upload to Supabase Storage
      return URL.createObjectURL(file);
    },
  });

  // Handle Initial Content & Auto-Save
  useEffect(() => {
    if (editor) {
      // If Y.js is empty but we have DB content, load it.
      // Note: Y.js sync might take a moment.
      // A simple check is if the fragment is empty.

      // Auto-save listener
      const cleanUp = editor.onEditorContentChange(() => {
        console.log("[Editor] Content Changed, triggering save...");
        console.log(
          "[Editor] Current Blocks:",
          JSON.stringify(editor.document).slice(0, 50) + "...",
        );
        if (onSave) {
          onSave(editor.document);
        } else {
          console.warn("[Editor] onSave prop is undefined!");
        }
      });
      return cleanUp;
    }
  }, [editor, onSave]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  // Load initial content if provided and editor is ready (and empty? this is tricky with Yjs)
  // For now, valid blocknote collaboration handles initial load via provider.
  // If we want to seed from DB when Yjs is empty, we'd need to do it explicitly.
  // Putting it in a fast effect:
  useEffect(() => {
    if (
      editor &&
      initialContent &&
      Array.isArray(initialContent) &&
      initialContent.length > 0
    ) {
      const currentBlocks = editor.document;
      // Check if editor is in default empty state (1 paragraph with no content)
      const isDefault =
        currentBlocks.length === 0 ||
        (currentBlocks.length === 1 &&
          currentBlocks[0].type === "paragraph" &&
          (!currentBlocks[0].content ||
            (Array.isArray(currentBlocks[0].content) &&
              currentBlocks[0].content.length === 0)));

      if (isDefault) {
        console.log(
          "[Editor] Hydrating from DB initialContent",
          initialContent,
        );
        editor.replaceBlocks(editor.document, initialContent);
      }
    }
  }, [editor, initialContent]);

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto pl-12 pr-12 pb-24">
      <BlockNoteView
        editor={editor}
        theme={theme === "dark" ? "dark" : "light"}
        editable={!readOnly}
      />
    </div>
  );
}

function getRandomColor() {
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ff00ff",
    "#00ffff",
    "#ffff00",
    "#ff8000",
    "#8000ff",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomName() {
  const names = [
    "Anonymous",
    "Guest",
    "Visitor",
    "User",
    "Editor",
    "Writer",
    "Collaborator",
  ];
  return (
    names[Math.floor(Math.random() * names.length)] +
    " " +
    Math.floor(Math.random() * 1000)
  );
}
