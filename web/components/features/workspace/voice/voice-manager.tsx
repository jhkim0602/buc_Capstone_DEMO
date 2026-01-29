"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import { ActiveCallControl } from "./active-call-control";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { mutate } from "swr";
import { useSocketStore } from "../store/socket-store";

interface VoiceContextType {
  joinRoom: (projectId: string, roomName: string) => Promise<void>;
  leaveRoom: () => void;
  currentRoom: string | null;
  isConnected: boolean;
}

const VoiceContext = createContext<VoiceContextType>({
  joinRoom: async () => {},
  leaveRoom: () => {},
  currentRoom: null,
  isConnected: false,
});

export const useVoice = () => useContext(VoiceContext);

export function VoiceManager({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const { user } = useAuth();
  const { socket } = useSocketStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const joinRoom = async (projectId: string, roomName: string) => {
    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await fetch(`/api/livekit/token?room=${roomName}`);

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const data = await response.json();
      setToken(data.token);
      setCurrentRoom(roomName);
      setActiveProjectId(projectId);

      // Trigger immediate update of sidebar list (Local)
      try {
        mutate("/api/livekit/rooms");
      } catch (e) {
        console.error("Revalidation failed", e);
      }

      // Broadcast to others (Socket)
      if (socket && projectId) {
        socket.emit("voice:update", { projectId });
      }
    } catch (error) {
      console.error("Failed to join room:", error);
      toast.error("보이스 채널 접속에 실패했습니다.");
    }
  };

  const leaveRoom = () => {
    const prevProjectId = activeProjectId;
    setToken(null);
    setCurrentRoom(null);
    setActiveProjectId(null);

    // Trigger immediate update when leaving
    setTimeout(() => {
      try {
        mutate("/api/livekit/rooms");
        // Broadcast to others (Socket)
        if (socket && prevProjectId) {
          socket.emit("voice:update", { projectId: prevProjectId });
        }
      } catch (e) {}
    }, 500);
  };

  return (
    <VoiceContext.Provider
      value={{
        joinRoom,
        leaveRoom,
        currentRoom,
        isConnected: !!token,
      }}
    >
      {/* Main Content */}
      <div className="relative h-full">{children}</div>

      {/* Voice Layer - Persistent & Portaled */}
      {mounted &&
        token &&
        createPortal(
          <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
            <LiveKitRoom
              token={token}
              serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
              connect={true}
              onDisconnected={leaveRoom}
              style={{ width: "auto", height: "auto" }}
            >
              {/* Audio Handling (Invisible) */}
              <RoomAudioRenderer />

              {/* Controls (Interactive) */}
              <div className="pointer-events-auto">
                <ActiveCallControl />
              </div>
            </LiveKitRoom>
          </div>,
          document.body,
        )}
    </VoiceContext.Provider>
  );
}
