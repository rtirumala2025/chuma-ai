import React from 'react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
      {!isUser && (
        <span className="text-xs text-gray-500 mb-1 ml-1 font-medium">Chuma</span>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
          isUser
            ? 'bg-[#16A34A] text-white rounded-br-none'
            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}