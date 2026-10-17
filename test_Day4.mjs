const system = '你只能用「是」或「否」两个字回答,不能输出任何其他内容'; // ← 实验改这行
const prompt = '猫会飞吗?';                                // ← 用户问题
const temperature = 0.7;

const res = await fetch('http://localhost:3000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, temperature, system }),
});
const data = await res.json();
console.log('回复:', data.text);