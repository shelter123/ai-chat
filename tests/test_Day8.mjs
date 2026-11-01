import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
const model = openai('deepseek-chat');

// 0-shot:只有指令,没有例子
const zeroShot = await generateText({
  model,
  prompt: '判断情感,只回答「正面」或「负面」,不要解释。\n输入:这个包很实用。',
});
console.log('【0-shot】', zeroShot.text);
console.log('---');

// few-shot:指令 + 3 个例子
const fewShot = await generateText({
  model,
  system: '判断情感,只回答「正面」或「负面」,不要解释。例子:这电影太棒了 → 正面;这菜太难吃了 → 负面;服务态度很差 → 负面。',
  prompt: '这个包很实用。',
});
console.log('【few-shot】', fewShot.text);

// 0-shot:普通翻译
const t1 = await generateText({
  model,
  prompt: '翻译成英文:你好。',
});
console.log('【翻译0-shot】', t1.text);

// few-shot:教它用口语化风格
const t2 = await generateText({
  model,
  system: '翻译要口语化、亲切。例子:你好 → Hey there!;谢谢 → Thanks a lot!',
  prompt: '你好。',
});
console.log('【翻译few-shot】', t2.text);