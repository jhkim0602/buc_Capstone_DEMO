"use client";

import { Button } from "@/components/ui/button";
import { Trash2, FileEdit } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface SquadHeaderActionsProps {
  squadId: string;
  isLeader: boolean;
}

export function SquadHeaderActions({
  squadId,
  isLeader,
}: SquadHeaderActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!isLeader) return null;

  const handleDelete = async () => {
    if (!confirm("정말 모집을 취소하고 스쿼드를 삭제하시겠습니까? (복구 불가)"))
      return;

    setLoading(true);
    try {
      const response = await fetch(`/api/squads/${squadId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("스쿼드가 삭제되었습니다.");
        router.push("/community"); // Redirect to list
        router.refresh();
      } else {
        const result = await response.json();
        toast.error(result.error || "삭제 실패");
      }
    } catch (e) {
      toast.error("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/community/squad/${squadId}/edit`)}
        className="h-8 w-8 p-0 lg:w-auto lg:h-9 lg:px-4 lg:py-2 text-muted-foreground hover:text-foreground"
      >
        <FileEdit className="w-4 h-4 lg:mr-2" />
        <span className="hidden lg:inline">정보 수정</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={loading}
        className="h-8 w-8 p-0 lg:w-auto lg:h-9 lg:px-4 lg:py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="w-4 h-4 lg:mr-2" />
        <span className="hidden lg:inline">스쿼드 삭제</span>
      </Button>
    </div>
  );
}
