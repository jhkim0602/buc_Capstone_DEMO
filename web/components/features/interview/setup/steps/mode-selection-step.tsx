"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Video, ArrowLeft } from "lucide-react";
import { useInterviewSetupStore } from "@/store/interview-setup-store";
import { useRouter } from "next/navigation";

export function ModeSelectionStep() {
    const { setStep } = useInterviewSetupStore();
    const router = useRouter();

    const handleModeSelect = (mode: 'chat' | 'video') => {
        // In the future, you can save the selected mode to the store if needed.
        // For now, we'll just navigate to the corresponding room.
        if (mode === 'chat') {
            router.push('/interview/room?mode=chat');
        } else {
            router.push('/interview/room?mode=video');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="mb-10 text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">어떤 방식으로 면접을 보시겠어요?</h1>
                <p className="text-muted-foreground text-lg">
                    자신에게 맞는 면접 모드를 선택해주세요.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card
                    className="relative overflow-hidden border-2 hover:border-blue-500 transition-all cursor-pointer group shadow-md"
                    onClick={() => handleModeSelect('chat')}
                >
                    <CardHeader className="pb-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle>채팅 면접</CardTitle>
                        <CardDescription>
                            텍스트 채팅을 통해 면접을 진행합니다.<br />
                            조용한 장소에서 차분하게 대답하고 싶을 때 좋습니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-blue-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            선택하기 &rarr;
                        </div>
                    </CardContent>
                </Card>

                <Card
                    className="relative overflow-hidden border-2 transition-all cursor-not-allowed group shadow-md opacity-60 bg-neutral-50"
                >
                    <CardHeader className="pb-2">
                        <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center mb-4">
                            <Video className="w-6 h-6 text-neutral-400" />
                        </div>
                        <CardTitle className="text-neutral-400">화상 면접 (준비 중)</CardTitle>
                        <CardDescription>
                            카메라와 마이크를 사용하여 실전처럼 진행합니다.<br />
                            곧 정식 출시될 예정입니다.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-neutral-500 font-medium italic">
                            현재는 채팅 면접만 이용 가능합니다.
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-12 flex justify-start">
                <Button variant="ghost" onClick={() => setStep('final-check')} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> 이전으로
                </Button>
            </div>
        </div>
    );
}
