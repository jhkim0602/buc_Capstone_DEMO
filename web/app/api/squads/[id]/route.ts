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
    const squad = await prisma.squads.findUnique({
      where: { id },
      select: { leader_id: true },
    });

    if (!squad) {
      return NextResponse.json({ error: "Squad not found" }, { status: 404 });
    }

    if (squad.leader_id !== userId) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own squads" },
        { status: 403 },
      );
    }

    await prisma.squads.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API: Delete Squad Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Status (e.g. Close Recruitment)
export async function PATCH(
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
    const { status } = await request.json(); // e.g. "recruiting", "closed", "active"

    const squad = await prisma.squads.findUnique({
      where: { id },
      select: { leader_id: true },
    });

    if (!squad) {
      return NextResponse.json({ error: "Squad not found" }, { status: 404 });
    }

    if (squad.leader_id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.squads.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API: Update Squad Status Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
