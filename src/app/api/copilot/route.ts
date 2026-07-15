import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

// --- MOCK DATABASE FUNCTION (RAG DATA SOURCE) ---
// This simulates fetching live operational data from the stadium's backend systems.
function get_live_stadium_status(location: string) {
  console.log(`[Copilot API] Tool called: get_live_stadium_status for location: ${location}`);
  const loc = location.toLowerCase();
  
  if (loc.includes('gate 4')) {
    return { 
      status: "CRITICAL_OVERCROWDING", 
      message: "Gate 4 is currently at 115% capacity due to a broken turnstile.",
      recommendation: "Reroute all incoming traffic to Gate 2 or Gate 3 which are currently empty."
    };
  } else if (loc.includes('gate 2') || loc.includes('gate 3')) {
    return {
      status: "CLEAR",
      capacity: "15%",
      message: "Gates are clear and operating normally."
    };
  } else if (loc.includes('section 104') || loc.includes('104')) {
    return {
      status: "MEDICAL_INCIDENT_REPORTED",
      message: "A minor heat-related medical incident was reported 2 minutes ago in Section 104. Med-Unit 4 is en route.",
      recommendation: "Maintain perimeter and ensure AED is accessible."
    };
  }
  
  return {
    status: "NORMAL",
    message: "No specific incidents reported for this location. Normal operational flow."
  };
}

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
  } else if (query.includes("gate 4") || query.includes("crowd")) {
    return `[MOCK FALLBACK] **CROWD ALERT: GATE 4**
Live sensors indicate Gate 4 is at 115% capacity due to a broken turnstile. Please immediately reroute incoming fans to Gate 2 or Gate 3, which are currently operating at 15% capacity.`;
  }
  return `[MOCK FALLBACK] I have analyzed the stadium operational manual and live data. To best assist you, could you provide a bit more context? (e.g., specific section number, type of incident, or fan credential type). *As a reminder, I can assist with wayfinding, emergency protocols, and dynamic crowd management.*`;
};

const systemPrompt = `You are the elite "Operations AI Copilot" for the FIFA World Cup 2026. 
You assist stadium venue staff, organizers, and volunteers. 
You have access to live crowd sentiment (Vibe Map), dynamic ticketing data, AR navigation blueprints, emergency protocols, and LIVE stadium operational status via tools.
Your tone should be highly professional, precise, and authoritative (like a military dispatcher or high-end concierge). 
Use bold text for critical instructions. Keep responses relatively concise but highly informative.
If someone asks about medical emergencies, provide clear, step-by-step triage protocols.
If they ask about accessibility, provide exact wayfinding routes.

IMPORTANT: When a user asks about the current status of specific gates, sections, or areas, ALWAYS use the \`get_live_stadium_status\` tool to fetch real-time data before answering.`;

const tools: any = [
  {
    functionDeclarations: [
      {
        name: "get_live_stadium_status",
        description: "Fetches the real-time operational status, crowding levels, and reported incidents for a specific location in the stadium (e.g. gates, sections).",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            location: {
              type: SchemaType.STRING,
              description: "The specific location to check. Examples: 'Gate 4', 'Gate 2', 'Section 104', 'VIP Lounge'",
            },
          },
          required: ["location"],
        },
      },
    ],
  },
];

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
      systemInstruction: systemPrompt,
      tools: tools
    });

    // Start a chat session (required for function calling)
    const chat = model.startChat();
    
    // 1. Send the user's message to Gemini
    const result = await chat.sendMessage(message);
    const response = result.response;

    // 2. Check if Gemini decided it needs to call our tool
    const call = response.functionCalls()?.[0];
    
    if (call && call.name === "get_live_stadium_status") {
      console.log("[Copilot API] Gemini requested tool call:", call.name, call.args);
      
      // Execute the local mock database function
      const apiResponse = get_live_stadium_status((call.args as any).location);
      
      // 3. Send the result back to Gemini so it can generate a final, contextual response
      const secondResult = await chat.sendMessage([{
        functionResponse: {
          name: "get_live_stadium_status",
          response: apiResponse
        }
      }]);
      
      return NextResponse.json({ reply: secondResult.response.text() });
    }

    // If no function was called, just return the standard text response
    return NextResponse.json({ reply: response.text() });
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ 
      reply: "There was an error communicating with the Operations Server. Please check the API key configuration or try again." 
    }, { status: 500 });
  }
}
