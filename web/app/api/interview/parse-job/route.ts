
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import puppeteer from 'puppeteer';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    let cleanContext = "";
    let url = "";

    try {
        const body = await req.json();
        url = body.url;

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: 'Server AI Key is missing' }, { status: 500 });
        }

        // 1. Launch Puppeteer Browser
        const browser = await puppeteer.launch({
            headless: true, // "new" is default now, true works
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required for some environments
        });

        const page = await browser.newPage();

        // Anti-detection: Mask webdriver property
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        // Set a realistic User Agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Filter unnecessary resources to speed up
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
                req.abort();
            } else {
                req.continue();
            }
        });

        try {
            // Navigate
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            // Wait a bit to ensure JS renders
            // await new Promise(r => setTimeout(r, 2000));

        } catch (e) {
            console.warn("Navigation warning (might be partial load):", e);
        }

        // 2. Extract Text
        const textContent = await page.evaluate(() => {
            // Remove clutter directly in browser
            const scripts = document.querySelectorAll('script, style, nav, footer, header, iframe');
            scripts.forEach(el => el.remove());
            return document.body.innerText;
        });

        // Close browser
        await browser.close();

        // Clean text
        cleanContext = textContent.replace(/\s+/g, ' ').slice(0, 15000); // larger limit

        // 3. Ask Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const prompt = `
    Analyze the following job posting text and extract key information in JSON format.
    Translate everything into Korean if it's in English.

    Text:
    ${cleanContext}

    Output JSON Format:
    {
      "title": "Job Title",
      "company": "Company Name",
      "description": "Brief summary of the company/service (2-3 sentences)",
      "responsibilities": ["Task 1", "Task 2"],
      "requirements": ["Requirement 1", "Requirement 2"],
      "preferred": ["Bonus skill 1", "Bonus skill 2"],
      "techStack": ["React", "Node.js", "AWS"],
      "culture": ["Culture item 1", "Culture item 2"]
    }
    
    If specific info is missing, leave the array empty.
    `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedData = JSON.parse(cleanedText);

        return NextResponse.json({
            success: true,
            data: {
                ...parsedData,
                url: url
            }
        });

    } catch (error: any) {
        console.error('AI Analysis failed, falling back to raw text:', error.message);

        // FALLBACK: Return raw text if AI fails
        // Title extraction attempt (simple regex)
        const titleMatch = cleanContext.match(/<title>(.*?)<\/title>/) || cleanContext.split('\n')[0].substring(0, 100);

        return NextResponse.json({
            success: true,
            data: {
                title: "블라인드/원티드 공고 (AI 분석 불가)",
                company: "채용 공고",
                description: cleanContext.slice(0, 3000), // Raw text
                responsibilities: ["AI 분석 실패 - 본문을 참고해주세요"],
                requirements: [],
                preferred: [],
                techStack: [],
                culture: [],
                url: url
            }
        });
    }
}
