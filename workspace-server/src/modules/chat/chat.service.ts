
import { Channel, Message } from './chat.types';

// In-memory Storage for MVP
// Map<ProjectId, Channel[]>
const CHANNELS_DB = new Map<string, Channel[]>();

// Map<ChannelId, Message[]>
const MESSAGES_DB = new Map<string, Message[]>();

export class ChatService {

  // --- Channel Management ---

  static async getChannels(projectId: string): Promise<Channel[]> {
    if (!CHANNELS_DB.has(projectId)) {
      // Initialize default channels for new projects
      const defaults: Channel[] = [
        { id: `ch-gen-${projectId}`, projectId, name: 'general', description: 'General discussion', type: 'public', createdAt: new Date().toISOString(), createdBy: 'system' },
        { id: `ch-dev-${projectId}`, projectId, name: 'dev', description: 'Technical discussions', type: 'public', createdAt: new Date().toISOString(), createdBy: 'system' },
        { id: `ch-design-${projectId}`, projectId, name: 'design', description: 'Design feedback', type: 'public', createdAt: new Date().toISOString(), createdBy: 'system' },
        { id: `ch-random-${projectId}`, projectId, name: 'random', description: 'Downtime', type: 'public', createdAt: new Date().toISOString(), createdBy: 'system' }
      ];
      CHANNELS_DB.set(projectId, defaults);

      // Initialize message buckets for defaults
      defaults.forEach(c => MESSAGES_DB.set(c.id, []));
    }
    return CHANNELS_DB.get(projectId) || [];
  }

  static async createChannel(projectId: string, name: string, description: string, userId: string): Promise<Channel> {
    const channels = await this.getChannels(projectId);

    // Check duplicate name
    if (channels.find(c => c.name === name)) {
      throw new Error(`Channel #${name} already exists.`);
    }

    const newChannel: Channel = {
      id: `ch-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      projectId,
      name,
      description,
      type: 'public', // Default to public for now
      createdAt: new Date().toISOString(),
      createdBy: userId
    };

    channels.push(newChannel);
    CHANNELS_DB.set(projectId, channels);
    MESSAGES_DB.set(newChannel.id, []); // Init storage

    return newChannel;
  }

  static async getChannelById(channelId: string): Promise<Channel | null> {
    // Inefficient lookup for MVP (iterate all projects)
    for (const channels of CHANNELS_DB.values()) {
        const found = channels.find(c => c.id === channelId);
        if (found) return found;
    }
    return null;
  }

  // --- Message Management ---

  static async getMessages(channelId: string): Promise<Message[]> {
    return MESSAGES_DB.get(channelId) || [];
  }

  static async saveMessage(channelId: string, content: string, senderId: string): Promise<Message> {
    const channel = await this.getChannelById(channelId);
    if (!channel) throw new Error("Channel not found");

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      channelId,
      content,
      senderId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    const messages = MESSAGES_DB.get(channelId) || [];
    messages.push(newMessage);
    MESSAGES_DB.set(channelId, messages);

    return newMessage;
  }
}
