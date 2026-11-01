import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
const model = openai('deepseek-chat');

const problems = [
  // 难题1:进水管(正确答案 12/25 小时 ≈ 28.8 分钟)
  '一个游泳池有 4 根进水管。只开 1 号管 1 小时装满,只开 2 号管 2 小时装满,只开 3 号管 3 小时装满,只开 4 号管 4 小时装满。4 根同时开,多久装满?',

  // 难题2:代数(正确答案 48)
  '一个数的四分之三加上 6,等于这个数的三分之二加上 10。这个数是多少?',
];

for (const problem of problems) {
  // 直接问:逼它「心算」
  const direct = await generateText({
    model,
    prompt: `${problem}\n\n直接回答答案,不要解释。`,
  });
  console.log(`\n问题: ${problem}`);
  console.log('【直接答】', direct.text);

  // CoT:让它「打草稿」
  const cot = await generateText({
    model,
    prompt: `${problem}\n\n请一步一步思考,写出每个计算步骤,最后给出答案。`,
  });
  console.log('【CoT】', cot.text);
  console.log('='.repeat(50));
}