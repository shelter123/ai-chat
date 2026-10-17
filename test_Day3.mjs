const prompt = '写一段关于未来的短文'; // ← 实验改这行
const temperature = 2;     // ← 改成 0 / 0.7 / 1.5 对比
const runs = 1;            // ← 同一 prompt 跑几次,看方差

for (let i = 0; i < runs; i++) {
  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, temperature }),
  });
  const data = await res.json();
  console.log(`第${i + 1}次: ${data.text}`);
}