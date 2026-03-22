import React from 'react';

export default function MessageBubble({ role, content }) {
  if (role === 'assistant') {
    return (
      <div className="group relative">
        {/* Bolt icon */}
        <div className="absolute -left-6 top-0 text-primary font-bold">⚡</div>
        <div className="max-w-2xl">
          <div className="bg-surface-container-low border-l-4 border-primary p-6">
            <p className="font-body text-lg leading-relaxed text-on-surface whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // User message
  return (
    <div className="flex justify-end relative">
      <div className="max-w-xl w-full">
        <div className="bg-primary text-on-primary border-2 border-on-surface p-6 shadow-[6px_6px_0px_0px_rgba(28,28,23,0.15)]">
          <p className="font-body text-lg">
            — {content}
          </p>
        </div>
        <p className="font-label text-[10px] text-right mt-2 uppercase tracking-widest opacity-50">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}