const prompt = '人工智能正在改变世界。'; // ← 每次实验改这一行

const res = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt }),
});
const data = await res.json();
console.log('回复:', data.text);
console.log('用量:', JSON.stringify(data.usage, null, 2));