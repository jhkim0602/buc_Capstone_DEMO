"use client";

import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface SquadActionsProps {
  squadId: string;
  isLeader: boolean;
  status: string; // "recruiting" | "closed" | "active"
}

export function SquadActions({ squadId, isLeader, status }: SquadActionsProps) {
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

  const handleCloseRecruitment = async () => {
    if (!confirm("모집을 조기 마감하고 스쿼드를 시작하시겠습니까?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/squads/${squadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "closed" }),
      });

      if (response.ok) {
        toast.success(
          "모집이 마감되었습니다! 이제 워크스페이스를 사용할 수 있습니다.",
        );
        router.refresh();
      } else {
        toast.error("상태 변경 실패");
      }
    } catch (e) {
      toast.error("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
      {status === "recruiting" && (
        <Button
          onClick={handleCloseRecruitment}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          모집 조기 마감 & 시작
        </Button>
      )}

      {status === "closed" && (
        <Button
          variant="outline"
          className="w-full border-primary text-primary hover:bg-primary/10"
          onClick={() => router.push(`/workspace/${squadId}`)}
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          워크스페이스로 이동
        </Button>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={loading}
        className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive mt-2"
      >
        <Trash2 className="w-4 h-4 mr-2" /> 스쿼드 삭제
      </Button>
    </div>
  );
}
