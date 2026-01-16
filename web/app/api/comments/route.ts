import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { post_id, content, user_id } = body;

    // Validation
    const missing = [];
    if (!post_id) missing.push("post_id");
    if (!content) missing.push("content");
    if (!user_id) missing.push("user_id");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    await prisma.comments.create({
      data: {
        post_id,
        content,
        author_id: user_id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("API: Comment Exception", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
