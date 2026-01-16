"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Megaphone, Users } from "lucide-react";

export function CommunitySidebar() {
  return (
    <div className="space-y-6">
      {/* 1. Write Button (Mobile prominent, but good to have here too or just info) */}

      {/* 2. Popular Tags / Topics */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            인기 토픽 (Weekly)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "React", "취업", "이직", "회고", "TypeScript"].map(
              (tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80 font-normal"
                >
                  #{tag}
                </Badge>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* 3. Recommended Squads */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              모집 중인 모임
            </div>
            <Link
              href="/community/squad"
              className="text-xs font-normal text-muted-foreground hover:text-primary transition-colors"
            >
              전체보기
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mock Squad Items */}
          <Link href="/community/squad" className="block group">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium group-hover:text-primary truncate">
                사이드 프로젝트 프론트엔드 구해요
              </span>
              <span className="text-xs text-muted-foreground">
                프로젝트 · 서울/온라인
              </span>
            </div>
          </Link>
          <div className="h-px bg-border" />
          <Link href="/community/squad" className="block group">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium group-hover:text-primary truncate">
                매일 아침 7시 기상 모각코
              </span>
              <span className="text-xs text-muted-foreground">
                모각코 · 온라인
              </span>
            </div>
          </Link>

          <Link href="/community/squad">
            <Button
              variant="link"
              size="sm"
              className="w-full text-muted-foreground h-auto p-0 mt-2"
            >
              더보기
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* 4. Notices */}
      <Card className="shadow-sm bg-muted/40 border-dashed">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Megaphone className="w-4 h-4" />
            공지사항
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <Link href="#" className="block hover:underline truncate">
            💡 클린 커뮤니티 가이드라인
          </Link>
          <Link href="#" className="block hover:underline truncate">
            📢 2월 업데이트 안내
          </Link>
        </CardContent>
      </Card>

      {/* Footer / Copyright */}
      <div className="text-xs text-muted-foreground px-1">
        © 2026 StackLoad Community
      </div>
    </div>
  );
}
