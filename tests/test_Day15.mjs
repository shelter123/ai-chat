import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const goodOpenai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
const model = goodOpenai('deepseek-chat');

// 实验 1:错误 API key → 预期 401
console.log('=== 实验 1:错误 API key ===');
const badKeyOpenai = createOpenAI({
  apiKey: 'sk-this-is-a-wrong-key',
  baseURL: process.env.OPENAI_BASE_URL,
});
try {
  await generateText({ model: badKeyOpenai('deepseek-chat'), prompt: '你好' });
  console.log('意外成功?');
} catch (err) {
  console.log('name:', err.name);
  console.log('message:', err.message);
}

// 实验 2:错误 baseURL(不存在的域名)→ 预期连接错误
console.log('\n=== 实验 2:错误 baseURL ===');
const badUrlOpenai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.deepseek.invalid',
});
try {
  await generateText({ model: badUrlOpenai('deepseek-chat'), prompt: '你好' });
  console.log('意外成功?');
} catch (err) {
  console.log('name:', err.name);
  console.log('message:', err.message);
}

// 实验 3:超长输入 → 顺便解开 Day 2 的「128K 还是 1M」悬念
console.log('\n=== 实验 3:超长输入(测上下文上限) ===');
try {
  await generateText({ model, prompt: '字'.repeat(500000) });
  console.log('成功了!说明上下文 ≥ 50 万 token(模型说的 1M 可能是真的)');
} catch (err) {
  console.log('name:', err.name);
  console.log('message:', err.message);
}