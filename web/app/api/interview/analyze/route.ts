
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

        const analysis = await interviewLogic.analyzeInterview(context, messages);

        return NextResponse.json({
            success: true,
            data: analysis
        });

    } catch (error: any) {
        console.error('Interview Analysis Error:', error);
        return NextResponse.json(
            { error: `Analysis Error: ${error.message || error.toString()}` },
            { status: 500 }
        );
    }
}
