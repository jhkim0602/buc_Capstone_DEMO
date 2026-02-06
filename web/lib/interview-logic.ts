
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface InterviewContext {
    jobData: {
        role: string;
        company: string;
        companyDescription: string;
        responsibilities: string[];
        requirements: string[];
        techStack: string[];
    };
    resumeData: any;
    personality: string; // 'professional' | 'friendly' | 'cold'
}

export class InterviewLogic {
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor(apiKey: string) {
        // Using gemini-flash-latest for best compatibility
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    }

    private constructSystemPrompt(context: InterviewContext, modelMessageCount: number): string {
        const { jobData, resumeData, personality } = context;

        let toneDescription = "";
        switch (personality) {
            case 'friendly':
                toneDescription = "부드럽고 따뜻한 말투로 지원자의 긴장을 풀어주며, 격려하는 분위기를 조성하세요. 존댓말을 사용하세요.";
                break;
            case 'cold':
                toneDescription = "냉철하고 날카로운 말투로 질문하세요. 답변의 허점을 찌르는 꼬리 질문을 적극적으로 던지며, 실무에서의 압박 면접 분위기를 조성하세요.";
                break;
            default: // professional
                toneDescription = "전문적이고 구조화된 면접관의 자세를 유지하세요. 명확하고 군더더기 없는 표현으로 역량을 검증하세요.";
        }

        return `
    당신은 숙련된 기술 면접관입니다. 지원자와의 1:1 채팅 면접을 진행하고 있습니다.
    
    [현재 면접 상태]
    현재 AI 질문 횟수: ${modelMessageCount} / 5
    
    [기업 정보]
    회사명: ${jobData.company}
    직무: ${jobData.role}
    회사 소개: ${jobData.companyDescription}
    주요 업무: ${jobData.responsibilities.join(", ")}
    기술 스택: ${jobData.techStack.join(", ")}

    [지원자 이력서 요약]
    ${JSON.stringify(resumeData)}

    [면접관 성격 및 톤]
    ${toneDescription}

    [면접 진행 규칙]
    1. 총 5개의 질문을 던져야 하며, 현재 질문 횟수에 따라 진행 단계를 조절하세요.
    2. 질문 1~2: 도입부. 아이스브레이킹 및 기본적인 기술/경험 질문.
    3. 질문 3~4: 심층 기술 검증. 이력서 기반의 꼬리 질문 및 실무 역량 확인.
    4. 질문 5: 최종 클로징. "수고하셨습니다. 이것으로 모든 면접을 마치겠습니다."라는 문구를 반드시 포함하여 인사를 건네며 면접을 종료하세요.
    6. 반드시 한 번에 하나의 질문만 던지세요.
    7. 한국어로 응답하세요.
    `;
    }

    async generateNextQuestion(context: InterviewContext, chatHistory: { role: 'user' | 'model', parts: string }[]) {
        const modelMessageCount = chatHistory.filter(m => m.role === 'model').length;

        // Final guard: stop if already at 5 questions
        if (modelMessageCount >= 5) {
            return "면접이 종료되었습니다. 수고하셨습니다.";
        }

        const systemPrompt = this.constructSystemPrompt(context, modelMessageCount);

        // Start chat
        const chat = this.model.startChat({
            history: [
                { role: "user", parts: [{ text: systemPrompt }] },
                { role: "model", parts: [{ text: "알겠습니다. 기술 면접관으로서 설정을 확인했습니다. 지원자가 접속하면 면접을 시작하시겠습니까?" }] },
                ...chatHistory.map(h => ({
                    role: h.role,
                    parts: [{ text: h.parts }]
                }))
            ],
        });

        const nextMessage = chatHistory.length === 0
            ? "지원자가 입장했습니다. 면접을 시작해주세요."
            : chatHistory[chatHistory.length - 1].parts;

        const result = await chat.sendMessage([{ text: nextMessage }]);
        const response = await result.response;
        return response.text();
    }

    async analyzeInterview(context: InterviewContext, chatHistory: { role: 'user' | 'model', parts: string }[]) {
        const { jobData, resumeData } = context;

        const analysisPrompt = `
    당신은 면접 분석 전문가입니다. 다음 면접 기록을 바탕으로 상세한 분석 리포트를 작성하세요.
    반드시 아래의 JSON 형식을 엄격히 지켜 응답하세요.

    [분석 대상 데이터]
    직무: ${jobData.role} @ ${jobData.company}
    이력서: ${JSON.stringify(resumeData)}
    면접 대화 기록: ${JSON.stringify(chatHistory)}

    [JSON 형식]
    {
      "overallScore": number (0-100),
      "passProbability": number (0-100),
      "evaluation": {
        "jobFit": number (0-100),
        "logic": number (0-100),
        "communication": number (0-100),
        "attitude": number (0-100)
      },
      "sentimentTimeline": [number] (전체 대화 흐름을 10개 구간으로 나누어 지원자의 긍정/자신감 수치를 0-100 사이로 표현),
      "habits": [
        { "habit": "어...", "count": number, "severity": "low" | "medium" | "high" },
        { "habit": "음...", "count": number, "severity": "low" | "medium" | "high" }
      ],
      "feedback": {
        "strengths": [string],
        "improvements": [string]
      },
      "bestPractices": [
        {
          "question": "핵심 질문 내용",
          "userAnswer": "실제 지원자의 답변",
          "refinedAnswer": "AI가 수정한 더 나은 답변 예시",
          "reason": "수정 이유"
        }
      ]
    }

    [주의사항]
    1. 모든 텍스트는 한국어로 작성하세요.
    2. 'habits'는 대화 텍스트에서 '어...', '음...', '그...', '저...' 와 같은 불필요한 추임새나 반복되는 패턴을 찾아내어 개수를 세세요.
    3. 'sentimentTimeline'은 대화의 진행에 따라 지원자의 답변 톤이 어떻게 변했는지를 추측하여 작성하세요.
    4. 분석 결과는 객관적이면서도 구체적인 조언을 포함해야 합니다.
    `;

        const result = await this.model.generateContent([{ text: analysisPrompt }]);
        const response = await result.response;
        const text = response.text();

        // Extract JSON from response (sometimes Gemini adds markdown block)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error("Failed to parse analysis JSON from AI response");
    }
}
