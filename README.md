# AI Chat

一个基于 Next.js + Vercel AI SDK + DeepSeek 的流式聊天应用,支持多轮对话。

## 功能

- 流式输出(逐 token 显示)
- 多轮对话记忆(每次发送完整消息历史)
- 响应式界面(Tailwind CSS)

## 技术栈

- Next.js (App Router)
- TypeScript
- Vercel AI SDK (ai@7.x / @ai-sdk/react / @ai-sdk/openai)
- DeepSeek (deepseek-chat)

## 本地运行

1. 安装依赖:npm install
2. 新建 .env.local 文件,内容为:

   OPENAI_API_KEY=sk-xxx
   OPENAI_BASE_URL=https://api.deepseek.com/v1

3. 启动:npm run dev
4. 浏览器打开 http://localhost:3000

## Live Demo

(coming soon)

## 关键决策与挑战

- 使用 Vercel AI SDK v7,踩了 5 处破坏性改动
- 多轮对话通过每次发送完整 messages 历史实现,模型本身无记忆
- v7 消息渲染使用 parts 数组(而非旧版的 content 字符串)