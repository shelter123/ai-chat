const prompt = '用大约 150 个字介绍你自己'; // ← 写长一点,流式看得更清楚
const temperature = 0.7;

const t0 = Date.now();
const res = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, temperature }),
});

const reader = res.body.getReader();
const decoder = new TextDecoder();
let fullText = '';
let n = 0;
let firstChunkTime = null;

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  if (firstChunkTime === null) firstChunkTime = Date.now() - t0;
  n++;
  const chunk = decoder.decode(value, { stream: true });
  fullText += chunk;
  console.log(`[第${n}块] ${JSON.stringify(chunk)}`);
}

console.log('\n====================');
console.log('首块耗时:', firstChunkTime, 'ms');
console.log('总耗时:', Date.now() - t0, 'ms');
console.log('完整文本:', fullText);