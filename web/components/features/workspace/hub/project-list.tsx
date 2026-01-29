"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import {
  Plus,
  Clock,
  Users,
  MoreVertical,
  Trash2,
  Loader2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { CreateWorkspaceDialog } from "../dialogs/create-workspace-dialog";

interface Workspace {
  id: string;
  name: string;
  description?: string;
  icon_url?: string;
  created_at: string;
  updated_at: string;
  my_role: string;
  member_count: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
};

export function ProjectList() {
  const {
    data: workspaces,
    error,
    isLoading,
    mutate,
  } = useSWR<Workspace[]>("/api/workspaces", fetcher);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<Workspace | null>(
    null,
  );

  const handleDelete = async () => {
    if (!workspaceToDelete) return;

    try {
      setDeletingId(workspaceToDelete.id);
      const response = await fetch(`/api/workspaces/${workspaceToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("워크스페이스 삭제 실패");
      }

      toast.success("워크스페이스가 삭제되었습니다.");
      mutate(workspaces?.filter((w) => w.id !== workspaceToDelete.id)); // Optimistic update
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setDeletingId(null);
      setWorkspaceToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[280px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">워크스페이스</h2>
          <p className="text-muted-foreground">
            협업 중인 프로젝트를 한눈에 관리하세요.
          </p>
        </div>
        <CreateWorkspaceDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(workspaces) &&
          workspaces.map((workspace) => (
            <div key={workspace.id} className="relative group">
              <Link
                href={`/workspace/${workspace.id}`}
                className="block h-full"
              >
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full flex flex-col relative overflow-hidden">
                  {/* Gradient Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardHeader className="pb-4 pr-12">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {workspace.name.charAt(0)}
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {workspace.my_role}
                        </Badge>
                      </div>
                    </div>

                    <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                      {workspace.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2 min-h-[40px]">
                      {workspace.description || "설명이 없습니다."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {/* Stats / Meta info */}
                  </CardContent>
                  <CardFooter className="pt-0 border-t bg-muted/20 p-4 flex justify-between items-center text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(workspace.updated_at), {
                        addSuffix: true,
                        locale: ko,
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {workspace.member_count}명
                    </div>
                  </CardFooter>
                </Card>
              </Link>

              {/* Owner Actions - Positioned absolutely but outside the Link */}
              {workspace.my_role === "owner" && (
                <div className="absolute top-4 right-4 z-20">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-muted"
                      >
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => setWorkspaceToDelete(workspace)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        삭제하기
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          ))}

        {/* New Project Placeholder */}
        <CreateWorkspaceDialog>
          <button className="w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-muted/30 transition-all h-full min-h-[250px]">
            <div className="h-14 w-14 rounded-full bg-muted group-hover:bg-background flex items-center justify-center shadow-sm">
              <Plus className="h-6 w-6" />
            </div>
            <div className="text-center">
              <span className="font-semibold block text-lg">
                새 프로젝트 만들기
              </span>
              <span className="text-sm opacity-70 mt-1 block">
                팀원을 초대하고 협업을 시작하세요
              </span>
            </div>
          </button>
        </CreateWorkspaceDialog>
      </div>

      {/* Delete Alert Dialog */}
      <AlertDialog
        open={!!workspaceToDelete}
        onOpenChange={(open) => !open && setWorkspaceToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              워크스페이스를 삭제하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription>
              '{workspaceToDelete?.name}' 워크스페이스와 관련된 모든
              데이터(문서, 칸반 보드, 알림 등)가 영구적으로 삭제됩니다. 이
              작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deletingId === workspaceToDelete?.id ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              삭제하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
