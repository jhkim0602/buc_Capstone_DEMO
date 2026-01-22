"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

interface User {
  id: string;
  nickname: string;
  email: string;
  avatar_url: string | null;
}

interface InviteMemberModalProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
}

async function sendInvite(
  url: string,
  { arg }: { arg: { targetUserId: string } },
) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to invite user");
  }
  return res.json();
}

export function InviteMemberModal({
  workspaceId,
  isOpen,
  onClose,
}: InviteMemberModalProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Search Users
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setUsers([]);
      return;
    }

    const searchUsers = async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `/api/users/search?q=${encodeURIComponent(debouncedQuery)}`,
        );
        const data = await res.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsSearching(false);
      }
    };

    searchUsers();
  }, [debouncedQuery]);

  // Invite Mutation
  const { trigger, isMutating } = useSWRMutation(
    `/api/workspaces/${workspaceId}/invite`,
    sendInvite,
  );

  const handleInvite = async () => {
    if (!selectedUser) return;

    try {
      await trigger({ targetUserId: selectedUser.id });
      toast.success(`${selectedUser.nickname}님을 초대했습니다.`);
      onClose();
      setSelectedUser(null);
      setQuery("");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>팀원 초대</DialogTitle>
          <DialogDescription>
            사용자의 닉네임이나 이메일을 검색하여 워크스페이스로 초대하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Command className="rounded-lg border shadow-md" shouldFilter={false}>
            <CommandInput
              placeholder="닉네임 또는 이메일 검색..."
              value={query}
              onValueChange={(val) => {
                setQuery(val);
                setSelectedUser(null); // Reset selection on type
              }}
            />
            <CommandList>
              {isSearching && (
                <div className="p-4 flex justify-center text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" /> 검색 중...
                </div>
              )}
              {!isSearching &&
                users.length === 0 &&
                debouncedQuery.length >= 2 && (
                  <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                )}
              <CommandGroup heading="사용자">
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => {
                      setSelectedUser(user);
                      setQuery(user.nickname); // Set input to name styling
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar_url || ""} />
                      <AvatarFallback>{user.nickname[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {user.nickname}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                    {selectedUser?.id === user.id && (
                      <Check className="ml-auto w-4 h-4 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>

          {selectedUser && (
            <div className="bg-muted/50 p-3 rounded-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedUser.avatar_url || ""} />
                  <AvatarFallback>{selectedUser.nickname[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{selectedUser.nickname}</p>
                  <p className="text-xs text-muted-foreground">
                    초대 대상으로 선택됨
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleInvite} disabled={!selectedUser || isMutating}>
            {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            초대 보내기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
