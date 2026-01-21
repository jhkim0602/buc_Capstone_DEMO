import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fixing generic 'User' nicknames...");

  const genericUsers = await prisma.profiles.findMany({
    where: { nickname: "User" },
  });

  console.log(`Found ${genericUsers.length} users with nickname 'User'.`);

  for (let i = 0; i < genericUsers.length; i++) {
    const user = genericUsers[i];
    const newNickname = `팀원 ${i + 1}`;
    await prisma.profiles.update({
      where: { id: user.id },
      data: { nickname: newNickname },
    });
    console.log(`Updated ${user.id} to '${newNickname}'`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
