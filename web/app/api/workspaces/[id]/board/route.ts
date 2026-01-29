import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workspaceId = params.id;
  const userId = session.user.id;

  // 1. Check Membership
  const memberCheck = await prisma.workspace_members.findUnique({
    where: {
      workspace_id_user_id: {
        workspace_id: workspaceId,
        user_id: userId,
      },
    },
  });

  if (!memberCheck) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Fetch Board Data
  // We need columns, tasks, and members for the UI
  const [columns, tasks, members, tags] = await Promise.all([
    // Fetch Columns
    prisma.kanban_columns.findMany({
      where: { workspace_id: workspaceId },
      orderBy: { order: "asc" },
    }),

    // Fetch Tasks (across all columns)
    prisma.kanban_tasks.findMany({
      where: {
        column: {
          workspace_id: workspaceId,
        },
      },
      include: {
        assignee: true, // Fetch profile details
      },
      orderBy: { order: "asc" },
    }),

    // Fetch Members (for Assignee dropdowns etc.)
    prisma.workspace_members.findMany({
      where: { workspace_id: workspaceId },
      include: {
        user: true,
      },
    }),

    // Fetch Tags
    prisma.kanban_tags.findMany({
      where: { workspace_id: workspaceId },
      orderBy: { name: "asc" },
    }),
  ]);

  // 3. Transform Data for Frontend

  // Transform Members
  const formattedMembers = members.map((m) => ({
    id: m.user_id,
    name: m.user.nickname || null, // use nickname
    email: null, // we can't easily get email here without deeper nesting, keeping null for now as it's optional in some views
    avatar: m.user.avatar_url,
    role: m.role,
  }));

  // Mock Views (Since we don't have a views table yet)
  // The frontend needs at least one view to render the board
  const mockViews = [
    {
      id: "view-default",
      name: "Main Board",
      type: "kanban",
      groupBy: "status",
      columns: [], // Will be filled dynamically by the frontend or logic below if needed
      isSystem: true,
    },
  ];

  return NextResponse.json({
    columns: columns.map((c: any) => ({
      id: c.id,
      title: c.title,
      statusId: c.title.toLowerCase().replace(/\s+/g, "-"), // Generate statusId from title for now
      category: c.category || "todo",
      color:
        c.category === "in-progress"
          ? "blue"
          : c.category === "done"
            ? "green"
            : "gray",
    })),
    tasks: tasks.map((t: any) => ({
      id: t.id,
      columnId: t.column_id,
      projectId: workspaceId, // Important for frontend filter
      title: t.title,
      description: t.description,
      order: t.order,
      dueDate: t.due_date,
      assignee: t.assignee ? t.assignee.nickname : null,
      assigneeId: t.assignee_id,
      tags: t.tags,
      priority: t.priority || "medium",
      priorityId: t.priority || "medium",
      // Stable category for styling: 'todo', 'in-progress', 'done'
      category: columns.find((c) => c.id === t.column_id)?.category || "todo",
      status:
        columns
          .find((c) => c.id === t.column_id)
          ?.title.toLowerCase()
          .replace(/\s+/g, "-") || "todo",
    })),
    members: formattedMembers,
    tags: tags.map((t: any) => ({ id: t.id, name: t.name, color: t.color })), // Return Tags
    views: mockViews,
    customFields: [],
  });
}
