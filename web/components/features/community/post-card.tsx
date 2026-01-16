"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Database } from "@/lib/database.types";
import { Eye, Heart, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Post = Database["public"]["Tables"]["posts"]["Row"] & {
  author: Database["public"]["Tables"]["profiles"]["Row"] | null;
  comments_count?: number; // Fetched via count
};

interface PostCardProps {
  post: Post;
  href: string;
}

export function PostCard({ post, href }: PostCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="p-5 rounded-xl border bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md h-full flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
            {post.category.toUpperCase()}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
              locale: ko,
            })}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        <div className="flex-1">
          {/* Tags if any */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={post.author?.avatar_url || ""} />
              <AvatarFallback>
                {post.author?.nickname?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium hover:underline">
              {post.author?.nickname || "익명"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              <span>{post.likes}</span>
            </div>
            {post.comments_count !== undefined && (
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>{post.comments_count}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
