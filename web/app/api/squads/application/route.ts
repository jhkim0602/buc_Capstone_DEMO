import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Database } from "@/lib/database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  if (!SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Server Configuration Error" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { squad_id, user_id, message } = body;

    // Validation
    const missing = [];
    if (!squad_id) missing.push("squad_id");
    if (!user_id) missing.push("user_id");
    if (!message) missing.push("message");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const supabase = createClient<Database>(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // Insert Application
    const { error } = await supabase.from("squad_applications").insert({
      squad_id,
      user_id,
      message,
      status: "pending",
    } as any);

    if (error) {
      if (error.code === "23505") {
        // Unique violation
        return NextResponse.json(
          { error: "이미 지원하셨습니다." },
          { status: 409 }
        );
      }
      console.error("API: Application Insert Error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("API: Exception", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
