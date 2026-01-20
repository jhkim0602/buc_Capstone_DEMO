import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Service Role Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncAllProfiles() {
  console.log("🔄 Starting full profile sync...");

  // 1. List all users (limit to 50 for safety, or paginate if needed)
  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error || !users) {
    console.error("❌ Failed to list users:", error);
    return;
  }

  console.log(`Found ${users.length} users in Auth system.`);

  for (const user of users) {
    const meta = user.user_metadata || {};

    // Extract info
    const nickname =
      meta.full_name || meta.name || user.email?.split("@")[0] || "User";
    const avatarUrl = meta.avatar_url || meta.picture || null;

    console.log(`Processing User: ${user.email}`);
    console.log(`   ID: ${user.id}`);
    console.log(`   Name: ${nickname}`);
    console.log(`   Avatar: ${avatarUrl ? "Found" : "Missing"}`);

    // 2. Upsert Profile
    const { error: upsertError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        nickname: nickname,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );

    if (upsertError) {
      console.error(`   ❌ Failed to sync: ${upsertError.message}`);
    } else {
      console.log(`   ✅ Synced successfully.`);
    }
  }

  console.log("\n🎉 Profile sync complete.");
}

syncAllProfiles();
