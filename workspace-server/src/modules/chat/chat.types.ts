
export interface Channel {
  id: string;
  projectId: string; // Workspace ID
  name: string;
  description: string;
  type: 'public' | 'private';
  createdAt: string;
  createdBy: string;
}

export interface Message {
  id: string;
  channelId: string;
  content: string;
  senderId: string;
  timestamp: string;
  type: 'text' | 'image' | 'system';
}

export interface JoinChannelPayload {
  channelId: string;
  userId: string;
}

export interface SendMessagePayload {
  channelId: string;
  content: string;
  senderId: string;
  type?: 'text' | 'image';
}

export interface CreateChannelPayload {
  projectId: string; // Workspace ID
  name: string;
  description?: string;
  type?: 'public' | 'private';
  userId: string; // Creator
}
