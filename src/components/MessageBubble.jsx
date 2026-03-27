import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}>
      {!isUser && (
        <span className="text-xs text-gray-500 mb-1 ml-1 font-medium">Chuma</span>
      )}
      <div
        className={`max-w-[90%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-[#16A34A] text-white rounded-br-none whitespace-pre-wrap'
            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none overflow-x-auto text-sm'
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({node, ...props}) => <table className="min-w-full divide-y divide-gray-200 my-2 border border-gray-100 rounded-lg overflow-hidden block" {...props} />,
              thead: ({node, ...props}) => <thead className="bg-[#f0fdf4]" {...props} />,
              th: ({node, ...props}) => <th className="px-3 py-2 text-left text-xs font-bold text-[#16A34A] uppercase tracking-wider" {...props} />,
              td: ({node, ...props}) => <td className="px-3 py-2 text-sm text-gray-700 border-t border-gray-100" {...props} />,
              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}