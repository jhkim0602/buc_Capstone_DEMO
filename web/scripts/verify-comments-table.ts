import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyTable() {
  try {
    console.log("Connectng to database...");
    const count = await prisma.comments.count();
    console.log(`✅ Table 'comments' exists. Row count: ${count}`);
  } catch (error: any) {
    console.error("❌ Error accessing 'comments' table:");
    console.error(error.message);
    if (error.code === "P2021") {
      console.log(
        "👉 Suggestion: Run 'npx prisma db push' to create the table.",
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}

verifyTable();
