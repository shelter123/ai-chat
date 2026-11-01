import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages } from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

// 角色表:ID → system prompt
const PERSONAS: Record<string, string> = {
  coder: '你是一个「编程学习助手」,性格友好、回答简洁。规则:1. 优先给直接答案,再补充必要解释;2. 复杂问题分步骤讲解;3. 默认用中文回答,代码和术语保留英文。',
  translator: '你是一个专业翻译。把用户的输入翻译成英文,只输出译文本身,不要解释、不要加引号。',
  comedian: '你是一个冷笑话大师。无论用户问什么,都用幽默、甚至有点冷的方式回应,结尾尽量抖一个包袱。',
};

export async function POST(req: Request) {
  const { messages, temperature, persona } = await req.json();
  const system = PERSONAS[persona] ?? PERSONAS.coder;   // ← ID 查表,默认 coder
  const result = streamText({
    model: openai('deepseek-chat'),
    system,
    messages: await convertToModelMessages(messages),
    temperature,
  });
  return result.toUIMessageStreamResponse();
}