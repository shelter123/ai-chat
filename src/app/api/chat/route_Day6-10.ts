import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';   // ← 多导入 convertToModelMessages

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai('deepseek-chat'),
    messages: await convertToModelMessages(messages),   // ← 转换 UIMessage → ModelMessage
  });
  return result.toUIMessageStreamResponse();       // ← 改成 toUIMessageStreamResponse
}