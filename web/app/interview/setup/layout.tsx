import { SetupSidebar } from "@/components/features/interview/setup/setup-sidebar";

export default function InterviewSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
      {/* Global Header is assumed to be in the root layout, so we subtract its height (64px) */}
      <aside className="hidden md:block h-full">
        <SetupSidebar />
      </aside>
      <main className="flex-1 overflow-y-auto relative h-full">
        {children}
      </main>
    </div>
  );
}
