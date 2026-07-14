import { NextResponse } from 'next/server';

// Simulates processing delay to mimic GenAI
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const query = message.toLowerCase();
    
    // Simulate LLM generation time
    await delay(1500);

    let responseText = "";

    if (query.includes("wheelchair") || query.includes("accessible") || query.includes("vip")) {
      responseText = `Based on the current venue blueprint and operations protocol, here is the fastest accessible route:
      
1.  **Escort the fan** to Elevator Bank C (closest to Gate 2).
2.  **Take Elevator C** to Level 3 (VIP Level).
3.  **Exit left** and follow the purple carpet directly to VIP Lounge C.

**Note:** Ensure the fan's VIP credential scans green at the Level 3 checkpoint. If they require a dedicated mobility assistant, you can dispatch one using the Mission Log.`;

    } else if (query.includes("medical") || query.includes("emergency") || query.includes("medic")) {
      responseText = `**MEDICAL PROTOCOL ACTIVATED**

For a medical incident in your section:
1.  **Do not move the fan** unless they are in immediate physical danger.
2.  **Contact Med-Unit 4** (the closest response team to your zone) on radio channel 5, or dispatch them via the Mission Log.
3.  **Clear a 5-foot perimeter** around the individual.
4.  **Stand by** with the nearest AED located at the top of Section 104 stairs.

I have pre-drafted a Smart Alert for your section if crowd control is needed. Do you want me to send it?`;

    } else if (query.includes("weather") || query.includes("rain") || query.includes("roof")) {
      responseText = `Currently, the stadium roof is **OPEN**. However, radar indicates a 75% chance of heavy rain starting in approximately 45 minutes.

Operations is planning to initiate the roof closure sequence in 15 minutes. 
**Staff Action:** Please begin advising fans in exposed sections (Rows A-F) that they may experience light rain before the roof fully closes.`;
    } else {
      responseText = `I have analyzed the stadium operational manual and live data. 

To best assist you, could you provide a bit more context? (e.g., specific section number, type of incident, or fan credential type). 

*As a reminder, I can assist with wayfinding, emergency protocols, and dynamic crowd management.*`;
    }

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
