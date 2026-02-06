import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  console.log(">>> /api/interview/parse-resume HIT (Native PDF Mode)");
  try {
    const contentType = req.headers.get('content-type') || '';
    let promptParts: (string | Part)[] = [];
    let hasFile = false;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const manualText = formData.get('text') as string | null;

      if (file) {
        console.log(">>> Processing PDF for Gemini:", file.name, "Size:", file.size);
        const arrayBuffer = await file.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString('base64');

        promptParts.push({
          inlineData: {
            mimeType: 'application/pdf',
            data: base64Data
          }
        });
        hasFile = true;
        promptParts.push("이 첨부된 이력서 PDF 파일을 분석해주세요.");
      } else if (manualText) {
        promptParts.push(`이력서 텍스트:\n${manualText}`);
      }
    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      promptParts.push(`이력서 텍스트:\n${body.text}`);
    }

    if (promptParts.length === 0) {
      return NextResponse.json({ error: '데이터를 입력하거나 파일을 업로드해주세요.' }, { status: 400 });
    }

    // Using gemini-flash-latest confirmed to be available and support PDF
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const instruction = `
        이력서 정보를 분석하여 아래 JSON 형식에 맞춰 핵심 정보를 추출해주세요. 
        모든 내용은 한국어를 기본으로 하되, 기술 스택명 등은 고유 명사를 존중하여 작성해주세요.
        
        Output JSON Format:
        {
          "personalInfo": {
            "name": "이름 (파일에서 추출)",
            "email": "이메일",
            "phone": "전화번호",
            "intro": "한 줄 소개 (작성된 내용을 바탕으로 매력적인 요약)",
            "links": {
              "github": "Github URL if exists",
              "blog": "Blog/Portfolio URL if exists"
            }
          },
          "education": [
            { "school": "학교명", "major": "전공", "period": "기간", "degree": "학위" }
          ],
          "experience": [
            { "company": "회사명", "position": "직무", "period": "기간", "description": "주요 역할 및 성과 요약" }
          ],
          "skills": [
            { "name": "스킬명", "category": "분류(Frontend/Backend/etc)", "level": "Basic/Intermediate/Advanced" }
          ],
          "projects": [
            { 
              "name": "프로젝트명", 
              "period": "기간", 
              "description": "프로젝트 상세 설명 (기술적 기여 중심)", 
              "techStack": ["사용한 기술 1", "사용한 기술 2"],
              "achievements": ["핵심 성과 1", "핵심 성과 2"] 
            }
          ]
        }
        
        주의사항:
        1. 데이터가 없는 경우 해당 필드는 빈 문자열("") 또는 빈 배열([])로 채워주세요.
        2. 마크다운 형식(예: \`\`\`json) 없이 순수 JSON 코드만 응답해주세요.
        3. 수치화된 성과가 있다면 반드시 포함해주세요.
        `;

    promptParts.unshift(instruction);

    console.log(">>> Calling Gemini 1.5 Flash for Native PDF Parsing...");
    const result = await model.generateContent(promptParts);
    const responseText = result.response.text();

    // Cleaning logic (just in case model adds markers)
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedData = JSON.parse(cleanedText);
      console.log(">>> Resume Analysis Success (Native PDF Mode)");
      return NextResponse.json({
        success: true,
        data: parsedData
      });
    } catch (parseError) {
      console.error(">>> JSON Parse Error:", parseError, "Original Text:", responseText);
      return NextResponse.json({
        error: "분석 결과 해석 실패 (JSON 형식 오류)",
        raw: responseText
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('>>> Resume Analysis failed catch-all:', error.message);

    // Handle Gemini Quota / Rate Limit errors (429)
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json({
        error: '현재 AI 분석 사용량이 많습니다. 약 30초~1분 후 다시 시도해주세요.'
      }, { status: 429 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
