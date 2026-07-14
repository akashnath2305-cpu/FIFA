import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Fallback logic for when the API Key is missing during a demo
const fallbackMockResponse = (query: string) => {
  if (query.includes("wheelchair") || query.includes("accessible") || query.includes("vip")) {
    return `[MOCK FALLBACK] Based on the current venue blueprint and operations protocol, here is the fastest accessible route:
    
1.  **Escort the fan** to Elevator Bank C (closest to Gate 2).
2.  **Take Elevator C** to Level 3 (VIP Level).
3.  **Exit left** and follow the purple carpet directly to VIP Lounge C.

**Note:** Ensure the fan's VIP credential scans green at the Level 3 checkpoint. If they require a dedicated mobility assistant, you can dispatch one using the Mission Log.`;
  } else if (query.includes("medical") || query.includes("emergency") || query.includes("medic")) {
    return `[MOCK FALLBACK] **MEDICAL PROTOCOL ACTIVATED**

For a medical incident in your section:
1.  **Do not move the fan** unless they are in immediate physical danger.
2.  **Contact Med-Unit 4** (the closest response team to your zone) on radio channel 5, or dispatch them via the Mission Log.
3.  **Clear a 5-foot perimeter** around the individual.
4.  **Stand by** with the nearest AED located at the top of Section 104 stairs.

I have pre-drafted a Smart Alert for your section if crowd control is needed. Do you want me to send it?`;
  }
  return `[MOCK FALLBACK] I have analyzed the stadium operational manual and live data. To best assist you, could you provide a bit more context? (e.g., specific section number, type of incident, or fan credential type). *As a reminder, I can assist with wayfinding, emergency protocols, and dynamic crowd management.*`;
};

const systemPrompt = `You are the elite "Operations AI Copilot" for the FIFA World Cup 2026. 
You assist stadium venue staff, organizers, and volunteers. 
You have access to live crowd sentiment (Vibe Map), dynamic ticketing data, AR navigation blueprints, and emergency protocols.
Your tone should be highly professional, precise, and authoritative (like a military dispatcher or high-end concierge). 
Use bold text for critical instructions. Keep responses relatively concise but highly informative.
If someone asks about medical emergencies, provide clear, step-by-step triage protocols.
If they ask about accessibility, provide exact wayfinding routes.`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const query = message.toLowerCase();
    
    // Check if the API Key exists
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      // If no API key is provided, use the fallback mock (important for Hackathon demos so the app doesn't break)
      await new Promise(res => setTimeout(res, 1500)); // Simulate delay
      return NextResponse.json({ reply: fallbackMockResponse(query) });
    }

    // Initialize the Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // We use gemini-1.5-flash as it is the standard and fastest for real-time text chat
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt 
    });

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ 
      reply: "There was an error communicating with the Operations Server. Please check the API key configuration or try again." 
    }, { status: 500 });
  }
}
