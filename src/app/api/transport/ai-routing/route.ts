import { NextResponse } from 'next/server';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function POST(request: Request) {
  try {
    const { message, ticketInfo } = await request.json();
    const query = message?.toLowerCase() || "";
    
    // Simulate AI processing
    await delay(1500);

    let responseText = "";

    if (query.includes("when") || query.includes("time") || query.includes("leave")) {
      responseText = `Based on your ticket for **Gate ${ticketInfo?.gate || 'A'}** and current FanZone densities, I recommend leaving at **4:15 PM**. 
      
Take the **Stadium Express Shuttle** from Downtown. Traffic is currently light, and this route avoids the heavy congestion near the East entrance.`;
    } else if (query.includes("delay") || query.includes("alternative") || query.includes("reroute")) {
      responseText = `I notice the Red Line train is experiencing a 15-minute delay. 

**Recommended Alternative:** 
Take the **Blue Line Bus** from Central Square. It departs in 5 minutes and currently shows only 40% occupancy. This will get you to Gate ${ticketInfo?.gate || 'A'} just in time for the pre-match show!`;
    } else if (query.includes("vip") || query.includes("escort")) {
      responseText = `As a VIP credential holder, you have access to the **Priority Convoy Lane**. 
      
Your designated shuttle departs from the Grand Hotel at 3:30 PM. A police escort is actively securing the route, ensuring a zero-stop journey to the VIP entrance.`;
    } else {
      responseText = `I am your Personal Transit AI. 

I can analyze live traffic, stadium crowds, and your ticket details to find the best route. Ask me things like:
- "When should I leave for the match?"
- "Are there any delays on my route?"
- "What's the least crowded way to get to Gate ${ticketInfo?.gate || 'A'}?"`;
    }

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error('AI Routing Error:', error);
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
  }
}
