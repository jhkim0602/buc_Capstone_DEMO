"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Bell, Check, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner"; // Assuming sonner is installed

interface Notification {
  id: string;
  type: string; // 'INVITE', 'SQUAD', 'COMMENT', 'SYSTEM'
  title: string;
  message: string;
  link?: string;
  is_read: boolean;
  created_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function NotificationCenter() {
  const { user } = useAuth();
  const { data: notifications, mutate } = useSWR<Notification[]>(
    user ? "/api/notifications" : null,
    fetcher,
  );

  const [isOpen, setIsOpen] = useState(false);

  // Realtime Subscription
  useEffect(() => {
    if (!user) return;

    console.log("Setting up realtime subscription for user:", user.id);

    const channel = supabase
      .channel("realtime-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("New Notification received!", payload);
          const newNotif = payload.new as Notification;

          // Toast Alert
          toast.info(newNotif.title, {
            description: newNotif.message,
          });

          // Optimistic Update: Add to list immediately
          mutate((currentData) => {
            return [newNotif, ...(currentData || [])];
          }, false); // false to prevent revalidation
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, mutate]);

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0;

  const handleMarkAsRead = async (id?: string) => {
    // Optimistic update
    if (!notifications) return;

    const updated = notifications.map((n) =>
      id && n.id !== id ? n : { ...n, is_read: true },
    );

    mutate(updated, false);

    await fetch("/api/notifications", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });

    mutate();
  };

  const handleInviteAction = async (
    notificationId: string,
    action: "accept" | "decline",
  ) => {
    // TODO: Implement Invite API call
    alert(
      `초대를 ${action === "accept" ? "수락" : "거절"}했습니다. (기능 구현 중)`,
    );
    handleMarkAsRead(notificationId);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-primary"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold text-sm">알림</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-auto p-0 text-muted-foreground hover:text-primary"
              onClick={() => handleMarkAsRead()}
            >
              모두 읽음
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-8">
              <Bell className="w-8 h-8 opacity-20 mb-2" />
              <span className="text-sm">새로운 알림이 없습니다.</span>
            </div>
          ) : (
            <div className="flex flex-col divide-y">
              {notifications?.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 hover:bg-muted/50 transition-colors flex flex-col gap-1",
                    !notification.is_read &&
                      "bg-blue-50/50 dark:bg-blue-900/10",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium">
                      {notification.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notification.message}
                  </p>

                  {/* Invite Actions */}
                  {notification.type === "INVITE" && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        className="h-7 text-xs w-full bg-primary hover:bg-primary/90"
                        onClick={() =>
                          handleInviteAction(notification.id, "accept")
                        }
                      >
                        <Check className="w-3 h-3 mr-1" /> 수락
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs w-full"
                        onClick={() =>
                          handleInviteAction(notification.id, "decline")
                        }
                      >
                        <X className="w-3 h-3 mr-1" /> 거절
                      </Button>
                    </div>
                  )}

                  {!notification.is_read && notification.type !== "INVITE" && (
                    <button
                      className="text-[10px] text-blue-500 hover:underline self-end mt-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                    >
                      읽음 처리
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
