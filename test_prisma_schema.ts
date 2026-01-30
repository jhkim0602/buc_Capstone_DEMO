import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

// Load env
const envPath = path.resolve(__dirname, "web/.env.local");
dotenv.config({ path: envPath });

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to DB...");
    // Try to fetch one workspace to see if schema matches
    const workspace = await prisma.workspaces.findFirst();
    console.log("Workspace found:", workspace);
  } catch (e) {
    console.error("Prisma Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
