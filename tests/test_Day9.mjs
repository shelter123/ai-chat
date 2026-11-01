import { generateText, Output } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
const model = openai('deepseek-chat');

// ============ 方法 A:提示词(给你字符串)============
const a = await generateText({
  model,
  system: '从输入中提取姓名、年龄、城市,输出 JSON,格式:{"name":"...","age":数字,"city":"..."}。只输出 JSON,不要任何其他内容。',
  prompt: '张三今年28岁,住在杭州。',
});
console.log('【方法A 输出】', a.text);
console.log('【方法A 的类型】', typeof a.text);   // ← 注意:是 string

console.log('---');

// ============ 方法 B:generateObject + zod(给你对象)============
const b = await generateText({
  model,
  output: Output.object({          // ← generateText + output 参数
    schema: z.object({
      name: z.string(),
      age: z.number(),
      city: z.string(),
    }),
  }),
  prompt: '张三今年28岁,住在杭州。',
});
console.log('【方法B 结果】', b.output);          // ← 注意是 .output,不是 .object
console.log('【方法B 的 age 类型】', typeof b.output.age);   // ← 注意:是 number
console.log('【方法B age + 1】', b.output.age + 1);          // ← 直接算,不用转换