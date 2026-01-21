import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Debugging Database Content...");

  console.log("--- WORKSPACES ---");
  const workspaces = await prisma.workspaces.findMany();
  console.log(workspaces);

  if (workspaces.length > 0) {
    const wsId = workspaces[0].id;
    console.log(`--- MEMBERS of ${wsId} ---`);
    const members = await prisma.workspace_members.findMany({
      where: { workspace_id: wsId },
      include: {
        user: true, // user relates to profiles
      },
    });
    console.log(JSON.stringify(members, null, 2));
  }

  console.log("--- PROFILES (All) ---");
  const profiles = await prisma.profiles.findMany();
  console.log(profiles);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
