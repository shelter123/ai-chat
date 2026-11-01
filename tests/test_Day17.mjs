import { generateText, tool, stepCountIs } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
const model = openai('deepseek-chat');

// 定义一个工具:查当前时间(模型自己不知道现在几点,必须调它)
const getCurrentTime = tool({
  description: '获取当前的日期和时间。当用户问「现在几点」「今天几号」「星期几」时调用。',
  inputSchema: z.object({}),
  execute: async () => {
    const now = new Date();
    return { time: now.toLocaleString('zh-CN'), iso: now.toISOString() };
  },
});

const result = await generateText({
  model,
  tools: { getCurrentTime },
  prompt: '现在几点?',
  stopWhen: stepCountIs(5),   // 允许「调工具 → 拿结果 → 回答」最多 5 步
});

console.log('最终回答:', result.text);
console.log('\n工具调用次数:', result.toolCalls.length);
console.log('工具返回的数据:', result.toolResults);