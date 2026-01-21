import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Fixing permissions...");

  try {
    // Grant Usage on Schema
    await prisma.$executeRawUnsafe(
      `GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;`,
    );

    // Grant All on Tables
    await prisma.$executeRawUnsafe(
      `GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;`,
    );

    // Grant All on Sequences (for auto-increment/serial)
    await prisma.$executeRawUnsafe(
      `GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;`,
    );

    // Grant All on Routines/Functions
    await prisma.$executeRawUnsafe(
      `GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;`,
    );

    console.log("Permissions granted successfully.");
  } catch (e) {
    console.error("Error granting permissions:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
