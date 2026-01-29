"use client";

import { Button } from "@/components/ui/button";
import { Trash2, FileEdit } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PostActionsProps {
  postId: string;
  isAuthor: boolean;
}

export function PostActions({ postId, isAuthor }: PostActionsProps) {
  const router = useRouter();

  if (!isAuthor) return null;

  const handleDelete = async () => {
    if (!confirm("게시글을 정말 삭제하시겠습니까?")) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("게시글이 삭제되었습니다.");
        router.push("/community/board");
        router.refresh();
      } else {
        const result = await response.json();
        toast.error(result.error || "삭제 실패");
      }
    } catch (e) {
      toast.error("오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/community/board/${postId}/edit`)}
        className="text-muted-foreground hover:text-foreground"
      >
        <FileEdit className="w-4 h-4 mr-2" />
        수정
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        삭제
      </Button>
    </div>
  );
}
