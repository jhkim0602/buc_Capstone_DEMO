import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET: Fetch Single Document
export async function GET(
  request: Request,
  { params }: { params: { id: string; docId: string } },
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: workspaceId, docId } = params;

    const doc = await prisma.workspace_docs.findUnique({
      where: {
        id: docId,
        workspace_id: workspaceId,
      },
      include: {
        author: {
          select: {
            nickname: true,
            avatar_url: true,
          },
        },
      },
    });

    if (!doc) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(doc);
  } catch (error: any) {
    console.error("API: Get Doc Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Update Document
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; docId: string } },
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: workspaceId, docId } = params;
    const body = await request.json();

    // Spread fields to update
    const { title, content, emoji, coverUrl, parentId, isArchived } = body;

    const updatedDoc = await prisma.workspace_docs.update({
      where: {
        id: docId,
        workspace_id: workspaceId,
      },
      data: {
        // Only update fields that are provided
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(emoji !== undefined && { emoji }),
        ...(coverUrl !== undefined && { cover_url: coverUrl }),
        ...(parentId !== undefined && { parent_id: parentId }),
        ...(isArchived !== undefined && { is_archived: isArchived }),
      },
    });

    return NextResponse.json(updatedDoc);
  } catch (error: any) {
    console.error("API: Update Doc Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Soft Delete (Archive)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; docId: string } },
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: workspaceId, docId } = params;

    // Per plan: DELETE method performs Soft Delete (is_archived = true)
    await prisma.workspace_docs.update({
      where: {
        id: docId,
        workspace_id: workspaceId,
      },
      data: {
        is_archived: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API: Delete Doc Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
