import { cn } from "@/lib/utils";

interface NotebookTabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  color?: string;
  icon?: React.ReactNode;
}

export function NotebookTab({
  label,
  active,
  onClick,
  color = "bg-blue-500",
  icon,
}: NotebookTabProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-10 h-32 ml-2 transition-all duration-300 cursor-pointer group select-none",
        active ? "translate-x-[-8px]" : "hover:translate-x-[-4px]",
      )}
    >
      {/* Tab Shape */}
      <div
        className={cn(
          "absolute inset-0 rounded-l-xl shadow-md border-y border-l border-black/10 flex flex-col items-center justify-start pt-3 gap-2",
          color,
          active
            ? "brightness-110 shadow-lg"
            : "brightness-90 hover:brightness-100",
        )}
      >
        {/* Icon */}
        <div className="text-white/90">{icon}</div>

        {/* Vertical Text */}
        <div
          className="writing-vertical-rl text-xs font-semibold text-white/90 tracking-widest uppercase rotate-180 h-20 flex items-center justify-center"
          style={{ writingMode: "vertical-rl" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
