"use client";

import { useState } from "react";
import { createComment } from "@/lib/actions/community"; // I will add this function next
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Loader2, CornerDownRight } from "lucide-react";
import { toast } from "sonner";
import { Database } from "@/lib/database.types";

type Comment = Omit<
  Database["public"]["Tables"]["comments"]["Row"],
  "post_id" | "author" | "is_accepted" | "created_at" | "updated_at"
> & {
  author: {
    nickname: string | null;
    avatar_url: string | null;
  } | null;
  post_id: string | null;
  is_accepted: boolean | null;
  created_at: string | Date | null;
  updated_at: string | Date | null;
};

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  currentUser?: any; // For checking ownership if needed
}

import { useAuth } from "@/hooks/use-auth";

// ... existing imports

export function CommentSection({
  postId,
  comments,
  currentUser,
}: CommentSectionProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!content.trim()) return;

    if (!user?.id) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: postId,
          content,
          user_id: user.id,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        toast.error(result.error || "댓글 작성 중 오류가 발생했습니다.");
      } else {
        setContent("");
        toast.success("댓글이 등록되었습니다.");
        window.location.reload(); // Refresh to see new comment
      }
    } catch (e) {
      toast.error("전송 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 pt-10 border-t">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        댓글 <span className="text-primary">{comments.length}</span>
      </h3>

      {/* Input */}
      <div className="flex gap-4 mb-10">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" /> {/* Current user avatar if available */}
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 남겨보세요..."
            className="resize-none min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={loading || !content.trim()}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              댓글 등록
            </Button>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author?.avatar_url || ""} />
              <AvatarFallback>
                {comment.author?.nickname?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">
                  {comment.author?.nickname || "익명"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(
                    new Date(comment.created_at || new Date()),
                    {
                      addSuffix: true,
                      locale: ko,
                    },
                  )}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {comment.content}
              </p>

              {/* Actions (Reply, Like - Future) */}
              <div className="flex gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <CornerDownRight className="w-3 h-3" /> 답글달기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
