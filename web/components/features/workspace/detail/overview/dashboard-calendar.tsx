"use client";

import { Task } from "../../store/mock-data";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AdvancedTaskModal } from "../board/advanced-task-modal";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useSWRConfig } from "swr";
import { toast } from "sonner";

interface DashboardCalendarProps {
  projectId: string;
  tasks?: any[];
}

export function DashboardCalendar({
  projectId,
  tasks = [],
}: DashboardCalendarProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const { mutate } = useSWRConfig();

  // Helper for status color (based on stable API category)
  const getStatusColor = (category: string) => {
    switch (category) {
      case "done":
        return "hsl(142.1 76.2% 36.3%)"; // Green
      case "in-progress":
        return "hsl(217.2 91.2% 59.8%)"; // Blue
      default:
        return "hsl(220 8.9% 46.1%)"; // Gray (todo)
    }
  };

  const getPriorityIcon = (priority: string) => {
    // Simple text or color indicator for priority if valid icon not imported
    // Or we can just use color border
    return priority === "urgent" ? "🔴" : priority === "high" ? "🟠" : "";
  };

  const events = tasks
    .filter((t) => t.dueDate)
    .map((t) => ({
      id: t.id,
      title: t.title,
      start: t.dueDate, // FullCalendar prefers 'start'
      backgroundColor: "transparent",
      borderColor: "transparent",
      extendedProps: {
        status: t.status,
        category: t.category || "todo", // Stable category from API
        priority: t.priority,
        assignee: t.assignee,
      },
    }));

  const handleEventClick = (info: any) => {
    setEditingTaskId(info.event.id);
  };

  const handleEventDrop = async (info: any) => {
    const { event } = info;
    const newDate = event.start;

    try {
      const res = await fetch(`/api/kanban/tasks/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ due_date: newDate }),
      });

      if (!res.ok) throw new Error("Failed to update");

      toast.success(`Rescheduled "${event.title}"`);
      mutate(`/api/workspaces/${projectId}/board`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to reschedule task");
      info.revert();
    }
  };

  const renderEventContent = (eventInfo: any) => {
    const props = eventInfo.event.extendedProps;
    const color = getStatusColor(props.category);
    const isUrgent = props.priority === "urgent" || props.priority === "high";

    return (
      <div
        className="w-full flex items-center gap-1.5 px-1.5 py-1 rounded-sm border-l-[3px] shadow-sm bg-card/90 hover:bg-accent/50 transition-all cursor-pointer overflow-hidden"
        style={{ borderLeftColor: color }}
      >
        {isUrgent && (
          <span className="text-[10px] leading-none shrink-0 text-red-500">
            !!
          </span>
        )}
        <span className="truncate text-xs font-medium text-foreground leading-tight">
          {eventInfo.event.title}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <Card className="flex-1 p-4 shadow-none border-none bg-transparent overflow-visible">
        <div className="w-full calendar-wrapper-dashboard">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            displayEventTime={false}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek",
            }}
            height="auto"
            dayMaxEvents={3}
            fixedWeekCount={false}
            editable={true}
            eventDrop={handleEventDrop}
            droppable={true}
          />
        </div>
      </Card>

      <AdvancedTaskModal
        taskId={editingTaskId}
        projectId={projectId}
        open={!!editingTaskId}
        onOpenChange={(open) => !open && setEditingTaskId(null)}
      />

      <style jsx global>{`
        .calendar-wrapper-dashboard .fc {
          --fc-border-color: hsl(var(--border) / 0.5);
          --fc-button-text-color: hsl(var(--foreground));
          --fc-button-bg-color: transparent;
          --fc-button-border-color: hsl(var(--border));
          --fc-button-hover-bg-color: hsl(var(--muted));
          --fc-button-hover-border-color: hsl(var(--border));
          --fc-button-active-bg-color: hsl(var(--primary) / 0.1);
          --fc-button-active-border-color: hsl(var(--primary));
          --fc-today-bg-color: hsl(var(--accent) / 0.3);
          --fc-page-bg-color: transparent;
        }
        .calendar-wrapper-dashboard .fc-toolbar-title {
          font-size: 1rem !important;
          font-weight: 600;
        }
        .calendar-wrapper-dashboard .fc-col-header-cell {
          padding: 8px 0;
          background-color: transparent;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground));
        }
        .calendar-wrapper-dashboard .fc-daygrid-day-number {
          font-size: 0.75rem;
          padding: 4px 8px;
          color: hsl(var(--muted-foreground));
        }
        .calendar-wrapper-dashboard .fc-daygrid-event {
          background: transparent;
          border: none;
          margin-top: 2px;
        }
        .calendar-wrapper-dashboard .fc-day-today .fc-daygrid-day-number {
          font-weight: bold;
          color: hsl(var(--primary));
        }
      `}</style>
    </div>
  );
}
