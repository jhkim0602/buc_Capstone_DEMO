import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking for broken workspaces (no columns)...");

  const workspaces = await prisma.workspaces.findMany({
    include: {
      columns: true,
    },
  });

  for (const ws of workspaces) {
    if (ws.columns.length === 0) {
      console.log(`Fixing workspace: ${ws.name} (${ws.id})`);

      // 1. Create Default Columns
      const columns = [
        { title: "To Do", category: "todo", order: 0 },
        { title: "In Progress", category: "in-progress", order: 1 },
        { title: "Done", category: "done", order: 2 },
      ];

      await prisma.kanban_columns.createMany({
        data: columns.map((col) => ({
          workspace_id: ws.id,
          title: col.title,
          category: col.category,
          order: col.order,
        })),
      });

      // 2. Create Default Tags (if missing)
      const existingTags = await prisma.kanban_tags.count({
        where: { workspace_id: ws.id },
      });
      if (existingTags === 0) {
        const defaultTags = [
          { name: "Bug", color: "red" },
          { name: "Feature", color: "blue" },
          { name: "Enhancement", color: "purple" },
        ];
        await prisma.kanban_tags.createMany({
          data: defaultTags.map((tag) => ({
            workspace_id: ws.id,
            name: tag.name,
            color: tag.color,
          })),
        });
      }

      console.log(`✅ Fixed workspace: ${ws.name}`);
    } else {
      console.log(`Skipping healthy workspace: ${ws.name}`);
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
