import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useWorkspaceStore } from "./mock-data";

export interface Channel {
  id: string;
  name: string;
  description?: string;
  type: string;
  workspaceId: string;
  unreadCount?: number;
  hasMention?: boolean;
}

export interface Message {
  id: string;
  channelId: string;
  content: string;
  senderId: string;
  sender: {
    id: string;
    nickname: string | null;
    avatar_url: string | null;
  };
  timestamp: string;
  type: string;
  workspaceId?: string;
}

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  currentUserId: string | null;

  channels: Channel[];
  messages: Message[];
  activeChannelId: string | null;

  connectSocket: (url: string, userId: string, projectId: string) => void;
  disconnectSocket: () => void;

  // Channel Actions
  fetchChannels: (workspaceId: string, socketInstance?: Socket) => void;
  createChannel: (
    workspaceId: string,
    name: string,
    description: string,
    userId: string,
  ) => void;
  joinChannel: (channelId: string) => void;
  markChannelAsRead: (channelId: string) => void;
  setChannelMention: (channelId: string, hasMention: boolean) => void;

  // Message Actions
  sendMessage: (channelId: string, content: string, senderId: string) => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  currentUserId: null,

  channels: [],
  messages: [],
  activeChannelId: null,

  connectSocket: (url, userId, projectId) => {
    if (get().socket) {
      console.log("[Socket] Socket already exists, skipping connection.");
      return;
    }

    console.log(
      `[Socket] Connecting to ${url} with userId: ${userId}, projectId: ${projectId}`,
    );
    set({ currentUserId: userId });

    const socket = io(url, {
      path: "/socket.io",
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("[Socket] Connected!", socket.id);
      set({ isConnected: true });
      get().fetchChannels(projectId, socket); // Pass socket instance
    });

    socket.on("connect_error", (err) => {
      console.error("[Socket] Connection Error:", err);
      toast.error(`Socket connection error: ${err.message}`);
    });

    socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
      set({ isConnected: false });
    });

    socket.on("chat:message", (message: Message) => {
      const state = get();

      // Mention Detection (Runs for ALL messages)
      const mentionPattern = `[@${state.currentUserId}:`;
      const hasMention = message.content.includes(mentionPattern);

      console.log("[Socket] Message received:", message.channelId);
      console.log("[Socket] Has Mention:", hasMention);

      if (hasMention) {
        console.log(
          "[Socket] Mention detected! (Notification handled by server-side DB persistence)",
        );
      }

      // If it's the active channel, append message
      if (message.channelId === state.activeChannelId) {
        console.log(
          `[Socket] Message is for active channel ${state.activeChannelId}, skipping badge update.`,
        );
        set((state) => ({ messages: [...state.messages, message] }));
      } else {
        console.log(
          `[Socket] Message is for INACTIVE channel (Active: ${state.activeChannelId}, Msg: ${message.channelId}). Updating badges.`,
        );
        // If inactive, update badge counts
        set((state) => {
          const updatedChannels = state.channels.map((ch) => {
            if (ch.id === message.channelId) {
              console.log(
                `[SocketStore] Updating channel ${ch.name}: +1 unread, Mention=${hasMention}`,
              );
              return {
                ...ch,
                unreadCount: (ch.unreadCount || 0) + 1,
                hasMention: ch.hasMention || hasMention,
              };
            }
            // Log if we are scanning other channels to ensure IDs match
            // console.log(`[SocketStore] Skipping channel ${ch.name} (${ch.id})`);
            return ch;
          });

          return { channels: updatedChannels };
        });
      }
    });

    set({ socket });
  },

  // Helper to sync from Notifications
  setChannelMention: (channelId: string, hasMention: boolean) => {
    set((state) => ({
      channels: state.channels.map((ch) =>
        ch.id === channelId ? { ...ch, hasMention } : ch,
      ),
    }));
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({
        socket: null,
        isConnected: false,
        currentUserId: null,
        channels: [],
        messages: [],
        activeChannelId: null,
      });
    }
  },

  fetchChannels: (workspaceId, socketInstance?: Socket) => {
    // Allow passing socket instance
    const socket = socketInstance || get().socket;
    if (socket) {
      console.log(`[Socket] Fetching channels for workspace: ${workspaceId}`);
      socket.emit("chat:get_channels", { workspaceId }, (res: any) => {
        console.log("[Socket] fetchChannels response:", res);
        if (res.success) {
          set({ channels: res.data });
          const state = get();
          if (res.data.length > 0 && !state.activeChannelId) {
            state.joinChannel(res.data[0].id);
          }
        } else {
          console.error("[Socket] Failed to fetch channels:", res.error);
          toast.error(`Failed to load channels: ${res.error}`);
        }
      });
    }
  },

  joinChannel: (channelId) => {
    const socket = get().socket;
    const prevChannel = get().activeChannelId;

    if (prevChannel && prevChannel !== channelId) {
      socket?.emit("chat:leave", { channelId: prevChannel });
    }

    if (prevChannel === channelId) return;

    // Clear messages and mark as read
    set({ activeChannelId: channelId, messages: [] });
    get().markChannelAsRead(channelId);

    if (socket) {
      socket.emit("chat:join", { channelId });

      socket.emit("chat:get_messages", { channelId }, (res: any) => {
        if (res.success) {
          set({ messages: res.data });
        }
      });
    }
  },

  markChannelAsRead: (channelId) => {
    set((state) => ({
      channels: state.channels.map((ch) =>
        ch.id === channelId ? { ...ch, unreadCount: 0, hasMention: false } : ch,
      ),
    }));
  },

  createChannel: (workspaceId, name, description, userId) => {
    const socket = get().socket;
    if (socket) {
      socket.emit(
        "chat:create_channel",
        { workspaceId, name, description, userId },
        (res: any) => {
          if (res.success) {
            set((state) => ({ channels: [...state.channels, res.data] }));
            get().joinChannel(res.data.id);
          }
        },
      );
    }
  },

  sendMessage: (channelId, content, senderId) => {
    const socket = get().socket;
    if (socket) {
      socket.emit("chat:message", { channelId, content, senderId });
    }
  },
}));
