import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const userId = session.user.id;

    // Verify ownership
    const comment = await prisma.comments.findUnique({
      where: { id },
      select: { author_id: true },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.author_id !== userId) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own comments" },
        { status: 403 },
      );
    }

    await prisma.comments.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API: Delete Comment Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
