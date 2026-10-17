import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function POST(req: Request) {
  const { prompt, temperature, system } = await req.json();
  const result = await streamText({
    model: openai('deepseek-chat'),
    system,
    prompt,
    temperature,
  });
  return result.toTextStreamResponse();
}