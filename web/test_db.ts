import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load env explicitly if needed, but Next.js usually handles it.
// For standalone script, dotenv is good.
dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to DB from web/...");
    console.log(
      "DATABASE_URL:",
      process.env.DATABASE_URL ? "Exists" : "Missing",
    );

    // 1. Count workspaces
    const count = await prisma.workspaces.count();
    console.log(`Total Workspaces: ${count}`);

    // 2. Find specific workspace
    const targetId = "0318c328-482b-43eb-b7b6-c244a00790d6";
    const workspace = await prisma.workspaces.findUnique({
      where: { id: targetId },
    });

    if (workspace) {
      console.log("✅ Target Workspace found:");
      console.log("ID:", workspace.id);
      console.log("Name:", workspace.name);
      console.log("Description:", workspace.description);
      console.log("Category:", workspace.category);
    } else {
      console.log(`❌ Workspace ${targetId} not found.`);
      // List top 5
      const all = await prisma.workspaces.findMany({ take: 5 });
      console.log(
        "Top 5 Workspaces:",
        all.map((w) => ({ id: w.id, name: w.name })),
      );
    }
  } catch (e: any) {
    console.error("❌ Prisma Error:", e);
    if (e.code === "P2022") {
      console.error("Column missing in DB!");
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
