import prisma from "../prisma";

// Helper to simulate Supabase JSON serialization (Dates -> Strings)
function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export async function getPosts(category?: string) {
  try {
    const rawPosts = await prisma.posts.findMany({
      where: category && category !== "all" ? { category } : {},
      include: {
        profiles: true, // author
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const posts = rawPosts.map((post) => ({
      ...post,
      author: post.profiles,
      profiles: undefined,
      comments_count: post._count.comments,
      _count: undefined,
    }));

    return serialize(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPost(id: string) {
  try {
    const rawPost = await prisma.posts.findUnique({
      where: { id },
      include: {
        profiles: true, // author
        comments: {
          include: {
            profiles: true, // comment author
          },
          orderBy: { created_at: "asc" },
        },
      },
    });

    if (!rawPost) return null;

    const post = {
      ...rawPost,
      author: rawPost.profiles,
      profiles: undefined,
      comments: rawPost.comments.map((comment) => ({
        ...comment,
        author: comment.profiles,
        profiles: undefined,
      })),
    };

    return serialize(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getSquads(type?: string) {
  try {
    const rawSquads = await prisma.squads.findMany({
      where: type && type !== "all" ? { type } : {},
      include: {
        profiles: true, // leader
      },
      orderBy: { created_at: "desc" },
    });

    const squads = rawSquads.map((squad) => ({
      ...squad,
      leader: squad.profiles,
      profiles: undefined,
    }));

    return serialize(squads);
  } catch (error) {
    console.error("Error fetching squads:", error);
    return [];
  }
}

// --- New Squad Detail Functions ---

export async function getSquad(id: string) {
  try {
    const rawSquad = await prisma.squads.findUnique({
      where: { id },
      include: {
        profiles: true, // leader (leader_id)
        squad_members: {
          include: {
            profiles: true, // member profile (user_id)
          },
        },
      },
    });

    if (!rawSquad) return null;

    const squad = {
      ...rawSquad,
      leader: rawSquad.profiles, // Map leader relation
      profiles: undefined,
      members: rawSquad.squad_members.map((member) => ({
        ...member,
        profile: member.profiles, // Map profile relation
        profiles: undefined,
      })),
      squad_members: undefined, // cleanup
    };

    return serialize(squad);
  } catch (error) {
    console.error("Error fetching squad:", error);
    return null;
  }
}

export async function getApplicationStatus(squadId: string, userId: string) {
  try {
    const application = await prisma.squad_applications.findFirst({
      where: {
        squad_id: squadId,
        user_id: userId,
      },
      select: { status: true },
    });
    return application?.status || null;
  } catch (error) {
    console.error("Error fetching app status:", error);
    return null;
  }
}

export async function getApplications(squadId: string) {
  try {
    const rawApps = await prisma.squad_applications.findMany({
      where: {
        squad_id: squadId,
        status: "pending",
      },
      include: {
        profiles: {
          select: {
            id: true,
            nickname: true,
            avatar_url: true,
            tier: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    const applications = rawApps.map((app) => ({
      ...app,
      user: app.profiles, // Map profiles -> user
      profiles: undefined,
    }));

    return serialize(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}
