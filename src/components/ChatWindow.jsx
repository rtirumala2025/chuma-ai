import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-green-50/30">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 p-8">
          <div className="w-16 h-16 bg-chumaGreen/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🌱</span>
          </div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Welcome to Chuma</h2>
          <p>I'm your AI financial coach. Load sample data or ask me a question to get started!</p>
        </div>
      ) : (
        messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}