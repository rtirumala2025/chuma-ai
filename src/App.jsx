import React, { useState } from 'react';
import { initialMessages, BWALYA_TRANSACTIONS } from './sampleData';
import { sendMessage } from './api';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const QUICK_PROMPTS = [
  "Analyze my transactions",
  "Am I ready for a loan?",
  "How can I save more?"
];

const NAV_ITEMS = [
  { label: 'Home', icon: '🏠', active: true },
  { label: 'Dashboard', icon: '📊', active: false },
  { label: 'Settings', icon: '⚙️', active: false },
];

function App() {
  const [page, setPage] = useState('landing');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  const handleSend = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { reply } = await sendMessage(newMessages, "English");
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I couldn't reach the server right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = () => {
    return BWALYA_TRANSACTIONS;
  };

  // ─── LANDING PAGE ───
  if (page === 'landing') {
    return <LandingPage navigate={navigate} />;
  }

  // ─── LOGIN PAGE ───
  if (page === 'login') {
    return <LoginPage navigate={navigate} />;
  }

  // ─── DASHBOARD ───
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface font-body">

      {/* ─── SIDE NAVBAR ─── */}
      <aside className="fixed left-0 top-0 h-full flex flex-col z-40 bg-surface h-screen w-64 border-r-2 border-on-surface opacity-95">

        {/* Brand Header */}
        <div className="px-6 py-8 border-b-2 border-on-surface">
          <h1 className="font-headline text-xl font-bold text-on-surface">The Ledger</h1>
          <p className="font-body font-bold uppercase tracking-widest text-[10px] mt-1 text-primary">
            Chuma AI Coach
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 flex flex-col space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center px-4 py-3 m-2 border-2 transition-all ${
                item.active
                  ? 'bg-primary text-on-primary border-on-surface scale-[0.98]'
                  : 'text-on-surface border-transparent hover:bg-outline/10 hover:border-on-surface'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-body font-bold uppercase tracking-widest text-xs">{item.label}</span>
            </a>
          ))}

          <div className="px-6 mt-6">
            <button className="w-full bg-primary text-on-primary font-label text-xs uppercase tracking-widest font-bold py-4 border-2 border-on-surface hover:bg-primary-container transition-colors">
              New Entry
            </button>
          </div>
        </nav>

        {/* Profile & Footer */}
        <div className="mt-auto border-t-2 border-on-surface p-4">
          <div className="flex items-center mb-4 px-2">
            <div className="w-10 h-10 border-2 border-on-surface bg-primary-container text-on-primary flex items-center justify-center font-headline font-bold">
              V
            </div>
            <div className="ml-3">
              <p className="font-label text-xs font-bold uppercase tracking-tighter">Market Vendor</p>
              <p className="text-[10px] opacity-60">Vendor #4022</p>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <a href="#" className="flex items-center px-2 py-2 text-on-surface opacity-70 hover:opacity-100 text-xs font-body font-bold uppercase tracking-widest">
              <span className="mr-2">❓</span>Support
            </a>
            <button
              onClick={() => navigate('landing')}
              className="flex items-center px-2 py-2 text-on-surface opacity-70 hover:opacity-100 text-xs font-body font-bold uppercase tracking-widest w-full text-left"
            >
              <span className="mr-2">↗</span>Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 ml-64 relative min-h-screen flex flex-col bg-surface overflow-hidden">

        {/* Header */}
        <header className="relative z-10 flex justify-between items-center px-12 py-8 border-b-2 border-on-surface">
          <div>
            <h2 className="font-headline text-4xl font-extrabold italic tracking-tight">Today's Balance</h2>
            <p className="font-label text-sm uppercase tracking-widest text-outline mt-1 italic">
              Recorded: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="font-label text-xs uppercase tracking-widest text-outline">Available Cash</p>
              <p className="font-headline text-2xl font-bold">KSh 142,500.00</p>
            </div>
            <div className="h-12 w-px bg-outline opacity-30"></div>
            <div className="flex space-x-3">
              <button className="p-2 border-2 border-on-surface bg-surface hover:bg-surface-container-high transition-colors">
                👤
              </button>
              <button className="p-2 border-2 border-on-surface bg-surface hover:bg-surface-container-high transition-colors">
                🏪
              </button>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <ChatWindow messages={messages} isLoading={isLoading} onSend={handleSend} quickPrompts={QUICK_PROMPTS} />

        {/* Input Section */}
        <footer className="relative z-20">
          {/* Quick-Prompt Chips — only visible in empty state */}
          {messages.length === 0 && (
            <div className="flex gap-4 px-12 mb-4 overflow-x-auto pb-2 hide-scrollbar">
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="flex-none bg-surface-container-highest border-2 border-on-surface px-6 py-2 font-label text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <InputBar onSend={handleSend} isLoading={isLoading} onLoadSampleData={loadSampleData} />
        </footer>
      </main>
    </div>
  );
}

export default App;