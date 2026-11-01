'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ROLES = [
  { id: 'coder', label: '编程助教' },
  { id: 'translator', label: '翻译官' },
  { id: 'comedian', label: '冷笑话大师' },
];

export default function Chat() {
  const { messages, sendMessage, status, setMessages } = useChat();
  const [input, setInput] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [persona, setPersona] = useState('coder');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input }, { body: { temperature, persona } });
    setInput('');
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">AI Chat</h1>

      {/* 角色切换 */}
      <div className="flex gap-2 mb-3">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => setPersona(r.id)}
            className={`px-3 py-1.5 rounded-lg text-sm transition ${
              persona === r.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {r.label}
          </button>
        ))}
        <button
          onClick={() => setMessages([])}
          className="ml-auto px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          清空对话
        </button>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-xl whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
              {m.parts.map((part, i) =>
                part.type === 'text' ? (
                  <div key={i} className="prose prose-sm max-w-none">
                    <ReactMarkdown>{part.text}</ReactMarkdown>
                  </div>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 温度滑块 */}
      <div className="flex items-center gap-3 mb-2 px-1">
        <span className="text-sm text-gray-500 whitespace-nowrap">温度</span>
        <input type="range" min={0} max={2} step={0.1} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} className="flex-1" />
        <span className="text-sm font-mono w-10 text-right">{temperature.toFixed(1)}</span>
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入消息,回车发送..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2" />
        <button type="submit" disabled={status === 'submitted' || status === 'streaming'} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">发送</button>
      </form>
    </div>
  );
}