
export type Role = 'owner' | 'member' | 'viewer';

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Membership {
  userId: string;
  workspaceId: string;
  role: Role;
  joinedAt: string;
}

// In-memory Mock Data
const MOCK_MEMBERSHIPS: Membership[] = [
  // Owner of p-1
  { userId: 'u1', workspaceId: 'p-1', role: 'owner', joinedAt: new Date().toISOString() },
  // Member of p-1
  { userId: 'u2', workspaceId: 'p-1', role: 'member', joinedAt: new Date().toISOString() },
];

export class AuthService {

  static async getUser(userId: string): Promise<User | null> {
    // Mock user lookup
    return { id: userId, name: `User ${userId}` };
  }

  static async getMembership(userId: string, workspaceId: string): Promise<Membership | null> {
    const membership = MOCK_MEMBERSHIPS.find(m => m.userId === userId && m.workspaceId === workspaceId);
    return membership || null;
  }

  static async checkPermission(userId: string, workspaceId: string, requiredRole?: Role[]): Promise<boolean> {
    const membership = await this.getMembership(userId, workspaceId);
    if (!membership) return false;

    if (!requiredRole || requiredRole.length === 0) return true; // Just membership required

    return requiredRole.includes(membership.role);
  }

  static async inviteUser(inviterId: string, workspaceId: string, email: string): Promise<string> {
    // Check if inviter is owner
    const isOwner = await this.checkPermission(inviterId, workspaceId, ['owner']);
    if (!isOwner) throw new Error("Only owners can invite members.");

    // Generate Invite Link (Mock)
    const token = Buffer.from(`${workspaceId}:${email}:${Date.now()}`).toString('base64');
    return `http://localhost:3000/invite?token=${token}`;
  }
}
