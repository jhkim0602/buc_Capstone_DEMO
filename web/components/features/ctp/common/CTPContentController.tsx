"use client";

import { useSearchParams } from "next/navigation";
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
