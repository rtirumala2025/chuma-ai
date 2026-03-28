import React from 'react';

import { useNavigate } from 'react-router-dom';
export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-background text-on-surface font-body min-h-screen">

      {/* ─── TOP APP BAR ─── */}
      <header className="sticky top-0 z-50 flex justify-between items-center w-full px-6 py-4 bg-surface border-b-2 border-on-surface">
        <div className="font-headline text-2xl font-black text-on-surface uppercase tracking-tighter">
          Chuma
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-label text-xs uppercase tracking-widest">
          <a href="#" className="text-primary border-b-2 border-primary">Home</a>
          <a href="#features" className="text-on-surface opacity-70 hover:text-primary transition-colors">Solutions</a>
          <a href="#cta" className="text-on-surface opacity-70 hover:text-primary transition-colors">Community</a>
          <a href="#" className="text-on-surface opacity-70 hover:text-primary transition-colors">Market Ledger</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('login')} className="text-on-surface text-sm font-label uppercase tracking-widest hover:text-primary transition-colors">
            Log In
          </button>
          <button onClick={() => navigate('/chat')} className="bg-primary text-on-primary px-6 py-2 font-label text-xs uppercase tracking-widest font-bold border-2 border-on-surface hover:bg-primary-container transition-colors">
            Start Ledger
          </button>
        </div>
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section className="relative px-6 py-20 md:py-32 border-b-2 border-on-surface overflow-hidden">
          <div className="absolute inset-0 grid-texture opacity-5 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="w-full md:w-3/5">
              <h1 className="font-headline italic text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-6 leading-[1.1]">
                Financial Growth, <br/>Stamped in Ink.
              </h1>
              <p className="font-body text-xl md:text-2xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
                Chuma is the AI ledger that speaks your language. Track daily sales, manage inventory, and unlock micro-loans designed for the grit of the market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/chat')}
                  className="bg-primary text-on-primary font-headline italic font-bold text-xl px-10 py-4 border-2 border-on-surface hard-shadow active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  Start Your Ledger
                </button>
                <button className="bg-surface text-on-surface font-label font-bold uppercase tracking-widest text-sm px-10 py-4 border-2 border-on-surface transition-all hover:bg-surface-container-low">
                  How it works
                </button>
              </div>
            </div>
            <div className="w-full md:w-2/5 border-2 border-on-surface bg-surface-container-low p-4 relative rotate-2 hard-shadow">
              {/* Placeholder market image */}
              <div className="w-full aspect-[4/3] bg-surface-container-highest border-b border-on-surface mb-4 flex items-center justify-center">
                <span className="text-6xl grayscale">🏪</span>
              </div>
              <div className="font-label text-[10px] uppercase tracking-[0.2em] flex justify-between text-outline">
                <span>Ref: MRKT-2024</span>
                <span>Proprietor Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STATS TICKER ─── */}
        <div className="bg-on-surface text-surface py-4 px-6 overflow-hidden">
          <div className="flex whitespace-nowrap gap-12 font-label uppercase text-xs tracking-[0.3em] items-center justify-center">
            <span className="flex items-center gap-2"><span className="text-primary">↗</span> 4,200+ Vendors Active</span>
            <span className="text-outline">/</span>
            <span className="flex items-center gap-2"><span className="text-primary">🌍</span> 12 Local Dialects</span>
            <span className="text-outline">/</span>
            <span className="flex items-center gap-2"><span className="text-primary">✓</span> Secure Micro-Loans</span>
            <span className="text-outline">/</span>
            <span className="flex items-center gap-2"><span className="text-primary">📴</span> Fully Offline Support</span>
          </div>
        </div>

        {/* ─── FEATURES BENTO ─── */}
        <section id="features" className="px-6 py-24 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline italic text-4xl md:text-5xl font-bold mb-4">Market-Proof Utility</h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l-2 border-t-2 border-on-surface">
            {/* Feature 1 */}
            <div className="border-r-2 border-b-2 border-on-surface p-8 group hover:bg-surface-container-low transition-colors">
              <div className="mb-6 flex justify-between items-start">
                <span className="text-4xl text-primary">🗣</span>
                <span className="font-label text-outline text-sm">01</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4">The Dialect Advantage</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Speak or type in your native tongue. Chuma understands the nuances of local trade terminology, from Luganda to Swahili, ensuring no detail is lost.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="border-r-2 border-b-2 border-on-surface p-8 group hover:bg-surface-container-low transition-colors">
              <div className="mb-6 flex justify-between items-start">
                <span className="text-4xl text-primary">📴</span>
                <span className="font-label text-outline text-sm">02</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4">Offline Continuity</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                No signal? No problem. Record every sale and expense locally. Chuma syncs your ledger once you're back in range, keeping your business running 24/7.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="border-r-2 border-b-2 border-on-surface p-8 group hover:bg-surface-container-low transition-colors">
              <div className="mb-6 flex justify-between items-start">
                <span className="text-4xl text-primary">🏦</span>
                <span className="font-label text-outline text-sm">03</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4">Micro-Loan Ready</h3>
              <p className="font-body text-on-surface-variant leading-relaxed">
                Every entry builds your credit score. Chuma transforms your daily ledger into a verified financial statement that banks and lenders actually trust.
              </p>
            </div>
            {/* Feature 4: Wide */}
            <div className="lg:col-span-2 border-r-2 border-b-2 border-on-surface p-8 bg-surface-container-low flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="font-label uppercase text-xs tracking-widest text-primary mb-2">Automated Insights</div>
                <h3 className="font-headline font-bold text-3xl mb-4">The Ledger Never Lies</h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-6">
                  Visualize your profit margins with ledger-style charts. Chuma identifies which products are moving and which are costing you storage space.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 border-b border-outline-variant py-2">
                    <span className="text-primary">✓</span>
                    <span className="font-label text-xs uppercase">Inventory Tracking</span>
                  </div>
                  <div className="flex items-center gap-3 border-b border-outline-variant py-2">
                    <span className="text-primary">✓</span>
                    <span className="font-label text-xs uppercase">Expense Categorization</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 border-2 border-on-surface p-2 bg-white hard-shadow">
                <div className="w-full aspect-video bg-surface-container-highest flex items-center justify-center">
                  <span className="text-4xl">📊</span>
                </div>
              </div>
            </div>
            {/* Feature 5: AI Coach */}
            <div className="border-r-2 border-b-2 border-on-surface p-8 flex flex-col justify-center items-center text-center bg-primary text-on-primary">
              <span className="text-6xl mb-4">🧠</span>
              <h3 className="font-headline font-bold text-2xl mb-2">Chuma AI Coach</h3>
              <p className="font-body opacity-90 text-sm mb-6">Get real-time advice on pricing and seasonal trends.</p>
              <button
                onClick={() => navigate('login')}
                className="w-full border-2 border-on-surface bg-on-surface text-surface font-label py-3 uppercase text-xs tracking-widest font-bold hover:opacity-90 transition-opacity"
              >
                Ask Anything
              </button>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section id="cta" className="px-6 py-24 bg-surface-container-highest border-y-2 border-on-surface relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-headline italic text-5xl md:text-6xl font-bold text-on-surface mb-8">
              Your first entry is the start of your legacy.
            </h2>
            <p className="font-body text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
              Join over 4,000 market vendors who have moved beyond the paper book and into the digital era of commerce.
            </p>
            <div className="inline-block border-4 border-on-surface p-2 bg-on-surface">
              <div className="border-2 border-dashed border-surface px-12 py-6 bg-surface">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    className="bg-surface-container-lowest border-2 border-on-surface font-label text-sm p-4 w-full md:w-64 focus:ring-0 focus:border-primary focus:outline-none"
                    placeholder="Enter Market Name"
                    type="text"
                  />
                  <button
                    onClick={() => navigate('/chat')}
                    className="bg-primary text-on-primary px-8 py-4 font-label font-bold uppercase tracking-widest hover:bg-primary-container transition-colors"
                  >
                    Join the Ledger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-on-surface text-surface-variant px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="font-headline text-3xl font-black text-white uppercase tracking-tighter mb-6">Chuma</div>
            <p className="font-body text-sm opacity-60 leading-relaxed">
              The authoritative financial tool for the modern African proprietor. Built for resilience, designed for growth.
            </p>
          </div>
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">Product</h4>
            <ul className="space-y-4 font-body text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">The Digital Ledger</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Micro-Loan Path</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Inventory Coach</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing Intelligence</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">Market Hubs</h4>
            <ul className="space-y-4 font-body text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Nairobi (Muthurwa)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kampala (Owino)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Lagos (Balogun)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dar es Salaam (Kariakoo)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">Inquiries</h4>
            <p className="font-body text-sm mb-4">ledger@chuma.ai</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline opacity-40 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-label uppercase tracking-widest">
          <span>© 2025 Chuma Financial Technologies</span>
          <div className="flex gap-8">
            <a href="#">Privacy Protocol</a>
            <a href="#">Merchant Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
