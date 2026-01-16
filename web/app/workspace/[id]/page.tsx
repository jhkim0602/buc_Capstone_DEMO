"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { WorkspaceSidebar } from "@/components/features/workspace/detail/workspace-sidebar";
import { DashboardOverview } from "@/components/features/workspace/detail/dashboard-overview";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const KanbanBoard = dynamic(
  () => import("@/components/features/workspace/detail/kanban-board").then((mod) => mod.KanbanBoard),
  { ssr: false, loading: () => <Skeleton className="h-full w-full rounded-lg" /> }
);
const ScheduleView = dynamic(
  () => import("@/components/features/workspace/detail/schedule-view").then((mod) => mod.ScheduleView),
  { ssr: false, loading: () => <Skeleton className="h-full w-full rounded-lg" /> }
);
const DocsView = dynamic(
  () => import("@/components/features/workspace/detail/docs-view").then((mod) => mod.DocsView),
  { ssr: false, loading: () => <Skeleton className="h-full w-full rounded-lg" /> }
);
const IdeaBoard = dynamic(
  () => import("@/components/features/workspace/detail/idea-board").then((mod) => mod.IdeaBoard),
  { ssr: false, loading: () => <Skeleton className="h-full w-full rounded-lg" /> }
);
const TeamChat = dynamic(
  () => import("@/components/features/workspace/detail/chat/team-chat").then((mod) => mod.TeamChat),
  { ssr: false, loading: () => <Skeleton className="h-full w-full rounded-lg" /> }
);
const LiveHuddle = dynamic(
  () => import("@/components/features/workspace/detail/huddle/live-huddle").then((mod) => mod.LiveHuddle),
  { ssr: false, loading: () => <Skeleton className="h-full w-full rounded-lg" /> }
);
const UnifiedInbox = dynamic(
  () => import("@/components/features/workspace/personal/unified-inbox").then((mod) => mod.UnifiedInbox),
  { ssr: false, loading: () => <Skeleton className="h-full w-full rounded-lg" /> }
);
const MyBriefcase = dynamic(
  () => import("@/components/features/workspace/personal/my-briefcase").then((mod) => mod.MyBriefcase),
  { ssr: false, loading: () => <Skeleton className="h-full w-full rounded-lg" /> }
);
import { TaskDetailModal } from "@/components/features/workspace/modules/task/detail-modal";
import { useWorkspaceStore } from "@/components/features/workspace/store/mock-data";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { activeTaskId, setActiveTaskId } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    if (activeTab.startsWith('chat-')) {
       const channel = activeTab.replace('chat-', '');
       return <TeamChat projectId={projectId} channelName={channel} />;
    }

    if (activeTab === 'huddle') {
       return <LiveHuddle projectId={projectId} onClose={() => setActiveTab('overview')} />;
    }

    switch (activeTab) {
      case 'board':
        return <div className="h-full p-6"><KanbanBoard projectId={projectId} onNavigateToDoc={() => setActiveTab('docs')} /></div>;
      case 'schedule':
        return <ScheduleView projectId={projectId} />;
      case 'docs':
        return <DocsView projectId={projectId} />;
      case 'ideas':
        return <div className="h-full"><IdeaBoard projectId={projectId} /></div>;
      case 'inbox':
        return <div className="h-full"><UnifiedInbox /></div>;
      case 'briefcase':
        return <div className="h-full"><MyBriefcase /></div>;
      default:
        // Pass projectId to new dashboard component
        return <div className="h-full overflow-y-auto"><DashboardOverview projectId={projectId} /></div>;
    }
  };

  return (
    <SidebarLayout>
      <div className="flex h-full w-full">
        <WorkspaceSidebar
          projectId={projectId}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <main className="flex-1 overflow-auto bg-background h-[calc(100vh-4rem)]">
          {renderContent()}
        </main>
      </div>

      <TaskDetailModal
        taskId={activeTaskId}
        onClose={() => setActiveTaskId(null)}
      />
    </SidebarLayout>
  );
}
