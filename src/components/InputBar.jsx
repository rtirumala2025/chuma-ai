import React, { useState, useEffect } from 'react';
import { sampleData } from '../sampleData';

export default function InputBar({ onSend, isLoading, onLoadSampleData, language }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    // Check if the current input matches any of the sample data versions
    const isSampleData = Object.values(sampleData).includes(input);
    if (isSampleData) {
      setInput(onLoadSampleData());
    }
  }, [language, onLoadSampleData]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4 pb-6 sm:pb-4">
      <div className="flex justify-between mb-2">
        <button
          onClick={() => {
            const data = onLoadSampleData();
            setInput(data);
          }}
          className="text-xs text-[#16A34A] font-medium hover:underline"
          disabled={isLoading}
        >
          Load Sample Data
        </button>
        <span className="text-xs text-gray-400">Ctrl+Enter to send</span>
      </div>
      <div className="flex items-end space-x-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message or load sample data..."
          className="flex-1 max-h-32 min-h-[44px] bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent resize-none"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="bg-[#16A34A] hover:bg-[#15803d] disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors h-[48px] w-[48px] flex items-center justify-center shrink-0"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}