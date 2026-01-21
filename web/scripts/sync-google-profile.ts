import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const targetId = "eb000eb7-8070-415d-81a5-d42a3489410c";
  console.log(`Syncing Google Profile for ID: ${targetId}`);

  // Fetch from auth.users (mapped as 'users' in schema)
  const authUser = await prisma.users.findUnique({
    where: { id: targetId },
  });

  if (!authUser) {
    console.error("❌ Auth User not found! Cannot sync.");
    return;
  }

  console.log("Auth User Found:", authUser.email);
  const meta: any = authUser.raw_user_meta_data || {};
  console.log("Metadata:", meta);

  const googleName = meta.full_name || meta.name || meta.user_name;
  const googleAvatar = meta.avatar_url || meta.picture;

  if (googleName || googleAvatar) {
    console.log(
      `Updating Profile with -> Name: ${googleName}, Avatar: ${googleAvatar}`,
    );

    await prisma.profiles.update({
      where: { id: targetId },
      data: {
        nickname: googleName || "알 수 없음",
        avatar_url: googleAvatar || "",
        // Keep existing bio/tier/etc
      },
    });
    console.log("✅ Profile synced with Google data.");
  } else {
    console.log("⚠️ No Google metadata found in auth user.");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
