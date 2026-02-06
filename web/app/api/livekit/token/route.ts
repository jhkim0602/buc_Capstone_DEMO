import { AccessToken } from "livekit-server-sdk";
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const room = req.nextUrl.searchParams.get("room");

    if (!room) {
      return NextResponse.json(
        { error: "Missing 'room' parameter" },
        { status: 400 },
      );
    }

    // 1. Authenticate User
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;
    const name =
      user.user_metadata?.nickname ||
      user.user_metadata?.name ||
      user.email ||
      "Unknown";
    const avatarUrl = user.user_metadata?.avatar_url || "";
    const identity = user.id;

    if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 },
      );
    }

    // 2. Generate Token
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      {
        identity: identity,
        name: name,
        metadata: JSON.stringify({ avatarUrl }),
      },
    );

    at.addGrant({ roomJoin: true, room: room });

    return NextResponse.json({ token: await at.toJwt() });
  } catch (error) {
    console.error("LiveKit Token Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
