"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCTPStore } from "../store/use-ctp-store";
import { CTPModuleRegistry } from "./types";
import { CTPModuleLoader } from "./CTPModuleLoader";

interface CTPContentControllerProps {
  category?: string;
  modules: CTPModuleRegistry;
  overview: React.ReactNode;
}

export function CTPContentController({ category = "Data Structures", modules, overview }: CTPContentControllerProps) {
  const searchParams = useSearchParams();
  const activeKey = searchParams.get("view"); // Query Param 'view'

  const activeModule = activeKey ? modules[activeKey] : null;

  const resetStore = useCTPStore(state => state.reset);
  const setCode = useCTPStore(state => state.setCode);

  // Clean Slate Policy: Reset store when entering a new module context
  useEffect(() => {
    // Reset immediately on mount/change
    resetStore();

    // Also reset on unmount to leave no zombie state
    return () => {
      resetStore();
      setCode(""); // Optional: clear code too? Maybe safer to clear code to force reload from config
    };
  }, [activeKey, resetStore, setCode]);

  if (!activeModule) {
    return <>{overview}</>;
  }

  return (
    <CTPModuleLoader
      key={activeKey!}
      module={activeModule}
      category={category}
      activeKey={activeKey!}
    />
  );
}
