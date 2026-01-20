import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fixNickname() {
  const userId = "025fb6cc-8c82-4c8a-bb71-34e08e09e817";

  try {
    // 1. Get User Email
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.error("❌ User not found.");
      return;
    }

    const metadata = user.raw_user_meta_data as any;
    console.log("User Metadata:", metadata);

    // Prefer full_name, then name, then email prefix
    const realName =
      metadata?.full_name || metadata?.name || user.email?.split("@")[0];

    if (!realName) {
      console.error("❌ Could not find any name in metadata.");
      return;
    }

    console.log(`Updating nickname to: ${realName}`);

    // 2. Update Profile
    const updated = await prisma.profiles.update({
      where: { id: userId },
      data: { nickname: realName },
    });

    console.log(`✅ Nickname updated to: ${updated.nickname}`);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

fixNickname();
