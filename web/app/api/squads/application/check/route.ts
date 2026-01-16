import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const squad_id = searchParams.get("squad_id");
  const user_id = searchParams.get("user_id");

  if (!squad_id || !user_id) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  try {
    const application = await prisma.squad_applications.findFirst({
      where: {
        squad_id: squad_id,
        user_id: user_id,
      },
      select: { status: true },
    });

    return NextResponse.json({ status: application?.status || null });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
