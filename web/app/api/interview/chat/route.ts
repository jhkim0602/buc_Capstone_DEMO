
import { NextResponse } from 'next/server';
import { InterviewLogic } from '@/lib/interview-logic';

export async function POST(req: Request) {
    try {
        const { messages, jobData, resumeData, personality } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is missing' }, { status: 500 });
        }

        const interviewLogic = new InterviewLogic(process.env.GEMINI_API_KEY);

        const context = {
            jobData,
            resumeData,
            personality: personality || 'professional'
        };

        const aiResponse = await interviewLogic.generateNextQuestion(context, messages);

        return NextResponse.json({
            success: true,
            data: {
                role: 'model',
                parts: aiResponse
            }
        });

    } catch (error: any) {
        console.error('Interview Chat Error:', error);

        // Handle Gemini Quota / Rate Limit errors (429)
        if (error.message?.includes('429') || error.message?.includes('quota')) {
            return NextResponse.json({
                error: '현재 AI 사용량이 많아 답변이 지연되고 있습니다. 약 1분 후 다시 시도해주세요.'
            }, { status: 429 });
        }

        return NextResponse.json(
            { error: `AI Error: ${error.message || error.toString()}` },
            { status: 500 }
        );
    }
}
