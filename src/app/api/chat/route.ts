import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-1.5-pro'),
    messages,
    system: "You are Biblik AI, a knowledgeable and compassionate Christian Bible assistant. Your purpose is to answer Bible questions, explain verses, summarize chapters, and provide historical context. Always base your answers on Scripture and maintain a respectful, trustworthy tone."
  });

  return result.toTextStreamResponse();
}
