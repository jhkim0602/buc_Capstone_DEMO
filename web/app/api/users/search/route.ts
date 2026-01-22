import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!query || query.length < 2) {
    return NextResponse.json({ users: [] });
  }

  try {
    // Search profiles by nickname or email (via joined users table implicitly if needed,
    // but here we mainly search profiles.nickname and display linked email if possible)
    // IMPORTANT: Prisma schema shows `profiles` links to `users` via `id`.
    // `users` table has `email`.

    // We will search for profiles where nickname contains query OR the linked user email contains query.
    // However, searching encrypted/hashed fields or separate auth schema tables might be restricted.
    // Let's stick to searching `profiles.nickname` + `users.email` (if accessible).
    // Note: `users` model is in `auth` schema, but Prisma client creates a view or we have direct access if configured.
    // Based on schema, `users` is available.

    const users = await prisma.profiles.findMany({
      where: {
        OR: [
          {
            nickname: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            users: {
              email: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      select: {
        id: true,
        nickname: true,
        avatar_url: true,
        users: {
          select: {
            email: true,
          },
        },
      },
      take: 10,
    });

    const formattedUsers = users.map((u) => ({
      id: u.id,
      nickname: u.nickname || "Unknown",
      email: u.users?.email || "No Email",
      avatar_url: u.avatar_url,
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error("Search Users Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
