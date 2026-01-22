import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// GET: List Notifications
export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const notifications = await prisma.notifications.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 20, // Limit to recent 20
    });

    return NextResponse.json(notifications);
  } catch (error: any) {
    console.error("API: List Notifications Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: Mark as Read
export async function PATCH(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body; // Notification ID

    if (id) {
      // Mark single
      await prisma.notifications.update({
        where: { id },
        data: { is_read: true },
      });
    } else {
      // Mark all
      const userId = session.user.id;
      await prisma.notifications.updateMany({
        where: { user_id: userId, is_read: false },
        data: { is_read: true },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API: Notification Update Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete Notification
export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await prisma.notifications.delete({
      where: {
        id: id,
        user_id: session.user.id, // Ensure ownership
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API: Delete Notification Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
