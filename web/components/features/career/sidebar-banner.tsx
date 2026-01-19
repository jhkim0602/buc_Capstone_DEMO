import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

export function SidebarBanner() {
  return (
    <Card className="border-border/50 shadow-sm bg-muted/20 border-dashed overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center min-h-[600px] p-6 text-center text-muted-foreground">
        <div className="w-16 h-16 mb-4 rounded-full bg-muted/50 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <p className="font-medium">이미지 배너 영역</p>
        <p className="text-sm mt-1 text-muted-foreground/50">(300 x 600)</p>
      </CardContent>
    </Card>
  );
}
