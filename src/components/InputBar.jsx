import React, { useState } from 'react';

export default function InputBar({ onSend, isLoading, onLoadSampleData }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="relative px-12 pb-8 pt-4 bg-surface/80 backdrop-blur-sm mt-auto max-w-5xl mx-auto w-full">
      {/* Input Field */}
      <form onSubmit={handleSubmit} className="relative group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your entry in the ledger..."
          disabled={isLoading}
          className="w-full bg-surface-container-lowest border-2 border-on-surface px-6 py-6 font-body text-lg text-on-surface placeholder:text-outline/50 focus:ring-0 focus:border-primary transition-colors pr-24 outline-none disabled:opacity-50"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="p-3 bg-primary text-on-primary border-2 border-on-surface hover:bg-primary-container transition-colors active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="font-bold text-lg">›</span>
          </button>
        </div>
      </form>
      <p className="text-center font-label text-[9px] uppercase tracking-[0.2em] text-outline mt-4 opacity-40">
        AI Coach may interpret data based on provided records. Maintain physical backups.
      </p>
    </div>
  );
}