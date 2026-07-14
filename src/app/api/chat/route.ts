import { NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const cleanMessage = DOMPurify.sanitize(message);
    const lowerMsg = cleanMessage.toLowerCase();

    let reply = "I can help you with stadium navigation, food options, or match details. What do you need?";

    if (lowerMsg.includes('food') || lowerMsg.includes('eat') || lowerMsg.includes('vegetarian')) {
      reply = "There's a great vegetarian stand just near Section 114 on the concourse level. The current wait time is about 5 minutes.";
    } else if (lowerMsg.includes('line') || lowerMsg.includes('queue') || lowerMsg.includes('arrive')) {
      reply = "Gate North-4 is currently experiencing light traffic. If you arrive within the next 20 minutes, you should get through security in under 10 minutes.";
    } else if (lowerMsg.includes('bathroom') || lowerMsg.includes('restroom')) {
      reply = "The nearest restrooms are located directly behind Section 112. They were just cleaned 10 minutes ago!";
    }

    // Simulate network delay for AI generation feel
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
