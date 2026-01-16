import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load env
load_dotenv("../web/.env.local")
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    # Try looking in current dir or parent vars just in case, but assume it loaded from .env.local
    print("❌ GEMINI_API_KEY not found in environment")
else:
    genai.configure(api_key=api_key)
    print(f"✅ API Key configured (len={len(api_key)})")
    
    print("\n🔍 Listing available models:")
    try:
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"- {m.name}")
    except Exception as e:
        print(f"❌ Failed to list models: {e}")
