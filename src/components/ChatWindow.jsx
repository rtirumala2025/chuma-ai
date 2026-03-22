import React from 'react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ messages, isLoading, onSend, quickPrompts }) {
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className="relative flex-1 flex flex-col px-12 py-8 overflow-y-auto max-w-5xl mx-auto w-full">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none"></div>

      {messages.length === 0 ? (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-6">📒</span>
          <h2 className="font-headline italic text-3xl font-bold text-on-surface mb-3">
            Your Ledger Awaits
          </h2>
          <p className="text-on-surface-variant font-body max-w-md mb-10">
            Start a conversation with your AI financial coach. Ask about transactions, savings goals, or micro-loan readiness.
          </p>

          {/* Quick-Prompt Chips — prominent in empty state */}
          {quickPrompts && quickPrompts.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => onSend(prompt)}
                  disabled={isLoading}
                  className="bg-surface-container-highest border-2 border-on-surface px-6 py-3 font-label text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="relative z-10 space-y-12 mb-20">
          {messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && (
            <div className="group relative">
              <div className="absolute -left-6 top-0 text-primary">⚡</div>
              <div className="max-w-2xl">
                <div className="bg-surface-container-low border-l-4 border-primary p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary animate-pulse"></div>
                    <span className="font-label text-xs uppercase tracking-widest text-outline">
                      Reviewing your ledger...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </section>
  );
}