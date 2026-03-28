import React, { useState, useEffect, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { sampleData } from '../sampleData';

export default function InputBar({ onSend, isLoading, onLoadSampleData, language }) {
  const [input, setInput] = useState('');
  const [isOcrLoading, setIsOcrLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsOcrLoading(true);
    try {
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();
      
      if (text.trim()) {
        setInput((prev) => prev ? `${prev}\n\n${text}` : text);
      }
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to extract text from image. Please try typing manually.');
    } finally {
      setIsOcrLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
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
          disabled={isLoading || isOcrLoading}
        >
          Load Sample Data
        </button>
        <span className="text-xs text-gray-400">Ctrl+Enter to send</span>
      </div>
      <div className="flex items-end space-x-2">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading || isOcrLoading}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-xl transition-colors h-[48px] w-[48px] flex items-center justify-center shrink-0"
          title="Upload Screenshot"
        >
          {isOcrLoading ? (
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
          )}
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isOcrLoading ? "Extracting text..." : "Type or upload screenshot..."}
          className="flex-1 max-h-32 min-h-[44px] bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent resize-none"
          rows={1}
          disabled={isLoading || isOcrLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading || isOcrLoading}
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