import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden lg:block space-y-4 overflow-x-hidden w-full",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}
