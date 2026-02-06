"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coffee, ShieldCheck, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import { useInterviewSetupStore } from "@/store/interview-setup-store";

const PERSONALITIES = [
    {
        id: 'professional',
        name: '신뢰 중심 (Professional)',
        description: '공식적이고 구조화된 질문을 던지며 실전과 같은 긴장감을 제공합니다.',
        icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
        bgColor: 'bg-blue-100',
        borderColor: 'hover:border-blue-500'
    },
    {
        id: 'friendly',
        name: '따뜻한 격려 (Friendly)',
        description: '부드러운 말투로 긴장을 풀어주며 긍정적인 피드백과 함께 진행합니다.',
        icon: <Coffee className="w-6 h-6 text-orange-600" />,
        bgColor: 'bg-orange-100',
        borderColor: 'hover:border-orange-500'
    },
    {
        id: 'cold',
        name: '압박 면접 (Challenge)',
        description: '꼬리 질문과 날카로운 피드백으로 압박 상황에 대처하는 능력을 훈련합니다.',
        icon: <Zap className="w-6 h-6 text-purple-600" />,
        bgColor: 'bg-purple-100',
        borderColor: 'hover:border-purple-500'
    }
];

export function PersonalitySelectionStep() {
    const { setStep, interviewerPersonality, setInterviewerPersonality } = useInterviewSetupStore();

    const handleNext = () => {
        setStep('mode-selection');
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="mb-10 text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">면접관의 성격은 어떤 스타일이 좋은가요?</h1>
                <p className="text-muted-foreground text-lg">
                    AI 면접관의 성향에 따라 질문의 톤과 압박 강도가 달라집니다.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {PERSONALITIES.map((p) => (
                    <Card
                        key={p.id}
                        className={`relative overflow-hidden border-2 transition-all cursor-pointer group shadow-md ${interviewerPersonality === p.id ? 'border-primary ring-2 ring-primary/20' : p.borderColor
                            }`}
                        onClick={() => setInterviewerPersonality(p.id)}
                    >
                        <CardHeader className="pb-2">
                            <div className={`w-12 h-12 ${p.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {p.icon}
                            </div>
                            <CardTitle className="text-lg">{p.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm leading-relaxed">
                                {p.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-12 flex justify-between">
                <Button variant="ghost" onClick={() => setStep('final-check')} className="gap-2">
                    <ArrowLeft className="w-4 h-4" /> 이전 단계
                </Button>
                <Button onClick={handleNext} className="gap-2 px-8 h-12 shadow-lg shadow-primary/20">
                    다음: 면접 방식 선택 <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
