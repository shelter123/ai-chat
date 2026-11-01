import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
const model = openai('deepseek-chat');

// 单价(近似):输入 ¥1/M,输出 ¥2/M
const INPUT_PRICE = 1 / 1_000_000;
const OUTPUT_PRICE = 2 / 1_000_000;
const costOf = (u) => u.inputTokens * INPUT_PRICE + u.outputTokens * OUTPUT_PRICE;

const r1 = await generateText({ model, prompt: '1+1等于几?' });
console.log('【短问题】', '输入', r1.usage.inputTokens, 'token / 输出', r1.usage.outputTokens, 'token / 成本 ¥' + costOf(r1.usage).toFixed(6));

const longBg = '这是一段背景资料。'.repeat(400);
const r2 = await generateText({ model, prompt: longBg + '\n\n请总结。' });
console.log('【长上下文】', '输入', r2.usage.inputTokens, 'token / 输出', r2.usage.outputTokens, 'token / 成本 ¥' + costOf(r2.usage).toFixed(6));

let total = 0;
for (let i = 0; i < 20; i++) {
  const r = await generateText({ model, prompt: '你好' });
  total += costOf(r.usage);
}
console.log('【循环20次总成本】¥' + total.toFixed(6));