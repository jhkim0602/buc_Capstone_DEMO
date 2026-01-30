
import { Hand, Loader2 } from "lucide-react";

interface CTPEmptyStateProps {
    message?: string;
    isLoading?: boolean;
}

export function CTPEmptyState({ message = "코드를 실행하여 시각화를 시작하세요", isLoading = false }: CTPEmptyStateProps) {
    if (isLoading) {
        return (
            <div className="flex h-full w-full items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/20 text-muted-foreground">
                <div className="flex flex-col items-center gap-4 text-center animate-in fade-in zoom-in duration-300">
                    <div className="relative">
                        <Loader2
                            className="w-12 h-12 text-primary animate-spin"
                            strokeWidth={1.5}
                        />
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-lg font-medium text-foreground">
                            코드 실행 중...
                        </p>
                        <p className="text-sm text-muted-foreground">
                            잠시만 기다려주세요, 결과를 분석하고 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/20 text-muted-foreground">
            <div className="flex flex-col items-center gap-4 text-center">
                {/* Animated Hand Pointing Up/Right (towards Run button) */}
                <div className="relative">
                    <Hand
                        className="w-12 h-12 text-primary animate-bounce rotate-[-45deg]"
                        strokeWidth={1.5}
                    />
                    {/* Pulse Effect */}
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                </div>

                <div className="space-y-1">
                    <p className="text-lg font-medium text-foreground">
                        시각화 대기 중
                    </p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {message}
                    </p>
                </div>

                {/* User requested Button-like styling, but as a non-clickable indicator */}
                <div className="mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background disabled:pointer-events-none disabled:opacity-50 bg-primary/10 text-primary hover:bg-primary/20 rounded-md h-8 px-3 transition-all cursor-default">
                    👆 우측 상단의 Run 버튼을 눌러보세요
                </div>
            </div>
        </div>
    );
}
