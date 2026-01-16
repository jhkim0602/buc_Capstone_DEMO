"use client";

import { useState, useEffect } from "react";
import { useTransition } from "react";
import { applyToSquad, cancelApplication } from "@/lib/actions/community";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import ApplicantManager from "./applicant-manager";

interface ApplicationButtonProps {
  squadId: string;
  currentUserId?: string;
  status?: "pending" | "accepted" | "rejected" | null; // null means not applied
  isRecruiting: boolean;
  leaderId?: string; // Add leaderId for client-side check
}

export default function ApplicationButton({
  squadId,
  // currentUserId, // Ignore server usage
  status,
  isRecruiting,
  leaderId,
}: ApplicationButtonProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Use Client Side Auth
  const { user } = useAuth();
  const currentUserId = user?.id;

  const [applicationStatus, setApplicationStatus] = useState<
    string | null | undefined
  >(status);
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Fetch true status client-side on mount (or when user loads) because server data might be stale/missing
  useEffect(() => {
    if (squadId && currentUserId) {
      setCheckingStatus(true);
      fetch(
        `/api/squads/application/check?squad_id=${squadId}&user_id=${currentUserId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status !== undefined) setApplicationStatus(data.status);
        })
        .catch((err) => console.error("Status check failed", err))
        .finally(() => setCheckingStatus(false));
    }
  }, [squadId, currentUserId]);

  // -- ROLE CHECK --
  // If user is the leader, show Applicant Manager instead of Apply Button
  if (currentUserId && leaderId && currentUserId === leaderId) {
    return (
      <ApplicantManager
        squadId={squadId}
        initialApplications={[]} // Empty array relying on self-fetch
      />
    );
  }

  if (!currentUserId) {
    return (
      <Button disabled variant="secondary" className="w-full">
        로그인 후 지원 가능합니다
      </Button>
    );
  }

  // Use local state if checked, otherwise prop (which is likely null)
  const finalStatus = applicationStatus;

  if (checkingStatus) {
    return (
      <Button disabled variant="ghost" className="w-full">
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    );
  }

  if (finalStatus === "accepted") {
    return (
      <Button
        disabled
        variant="default"
        className="w-full bg-green-600 hover:bg-green-700"
      >
        🎉 합류 완료
      </Button>
    );
  }

  if (finalStatus === "rejected") {
    return (
      <Button disabled variant="outline" className="w-full">
        지원 결과: 아쉽게도 함께하지 못했습니다
      </Button>
    );
  }

  if (finalStatus === "pending") {
    return (
      <div className="flex flex-col gap-2">
        <Button
          disabled
          variant="secondary"
          className="w-full opacity-100 bg-secondary/50 text-secondary-foreground"
        >
          <Clock className="mr-2 w-4 h-4" />
          지원 심사 대기 중
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive h-auto py-1"
          disabled={loading}
          onClick={async () => {
            if (confirm("지원을 취소하시겠습니까?")) {
              // TODO: Implement cancel API
              alert("기능 점검 중입니다.");
            }
          }}
        >
          지원 취소
        </Button>
      </div>
    );
  }

  if (!isRecruiting) {
    return (
      <Button disabled className="w-full">
        모집이 마감되었습니다
      </Button>
    );
  }

  const handleApply = async () => {
    if (!message.trim()) {
      toast.error("소개 메시지를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/squads/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          squad_id: squadId,
          user_id: currentUserId,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        toast.error(result.error);
      } else {
        toast.success("지원이 완료되었습니다! 리더의 승인을 기다려주세요.");
        setOpen(false);
        setApplicationStatus("pending"); // Optimistic update
      }
    } catch (e) {
      toast.error("지원 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <Mail className="mr-2 w-4 h-4" />
          지원하기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>팀원 지원하기</DialogTitle>
          <DialogDescription>
            리더에게 자신을 소개하는 간단한 메시지를 남겨주세요.
            <br />
            (연락처나 자신의 강점 등을 적어주시면 좋습니다)
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="안녕하세요! 프론트엔드 개발자로 참여하고 싶습니다. 리액트와 넥스트JS 사용 경험이 있습니다."
            className="min-h-[150px]"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button onClick={handleApply} disabled={loading || !message}>
            {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
            지원 완료
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
