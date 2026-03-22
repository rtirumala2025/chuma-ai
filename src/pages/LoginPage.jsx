import React, { useState } from 'react';

export default function LoginPage({ navigate }) {
  const [tab, setTab] = useState('signup');

  const handleMobileMoneyConnect = () => {
    navigate('dashboard');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate('dashboard');
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen grid-pattern-fine">
      <main className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl bg-surface border-2 border-on-surface flex flex-col md:flex-row hard-shadow-lg">

          {/* ─── LEFT PANEL: Branding ─── */}
          <div className="w-full md:w-5/12 p-8 md:p-12 bg-surface-container-low border-b-2 md:border-b-0 md:border-r-2 border-on-surface flex flex-col justify-between">
            <div>
              <div className="font-headline text-3xl font-black text-on-surface uppercase tracking-tighter mb-12">
                CHUMA
              </div>
              <h1 className="font-headline italic text-5xl md:text-6xl text-primary leading-tight mb-6">
                Join the <br/>Ledger.
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed font-light">
                The modern proprietor's companion. Secure your growth, track your grit, and build your legacy with Chuma AI.
              </p>
            </div>
            <div className="mt-12 pt-8 border-t border-outline-variant">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-primary">🛡</span>
                <p className="font-label text-xs uppercase tracking-widest">Secured by Ledger-Grade Encryption</p>
              </div>
              <p className="font-label text-[10px] uppercase opacity-50">© 2025 Chuma Financial Systems. All rights reserved.</p>
            </div>
          </div>

          {/* ─── RIGHT PANEL: Auth Forms ─── */}
          <div className="w-full md:w-7/12 p-8 md:p-12 bg-surface">
            <div className="max-w-md mx-auto">

              {/* Tab Switcher */}
              <div className="flex gap-8 mb-10 border-b-2 border-outline-variant">
                <button
                  onClick={() => setTab('signup')}
                  className={`font-label text-sm uppercase tracking-widest pb-3 transition-colors ${
                    tab === 'signup'
                      ? 'border-b-2 border-primary text-on-surface font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setTab('login')}
                  className={`font-label text-sm uppercase tracking-widest pb-3 transition-colors ${
                    tab === 'login'
                      ? 'border-b-2 border-primary text-on-surface font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Log In
                </button>
              </div>

              {/* Mobile Money Section */}
              <section className="mb-10">
                <h2 className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">
                  Quick Connect with Mobile Money
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleMobileMoneyConnect}
                    className="flex items-center justify-between px-4 py-4 border-2 border-on-surface hover:bg-surface-container-high transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#FFCC00] border border-on-surface flex items-center justify-center font-bold text-xs">MTN</div>
                      <span className="font-label text-sm font-bold uppercase">Connect via MTN MoMo</span>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <button
                    onClick={handleMobileMoneyConnect}
                    className="flex items-center justify-between px-4 py-4 border-2 border-on-surface hover:bg-surface-container-high transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#E11900] border border-on-surface flex items-center justify-center font-bold text-xs text-white">AIR</div>
                      <span className="font-label text-sm font-bold uppercase">Connect via Airtel Money</span>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <button
                    onClick={handleMobileMoneyConnect}
                    className="flex items-center justify-between px-4 py-4 border-2 border-on-surface hover:bg-surface-container-high transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-[#4BB543] border border-on-surface flex items-center justify-center font-bold text-xs text-white">MP</div>
                      <span className="font-label text-sm font-bold uppercase">Connect via M-Pesa</span>
                    </div>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </section>

              {/* Divider */}
              <div className="relative flex items-center mb-10">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink mx-4 font-label text-xs uppercase text-on-surface-variant">
                  Or use Ledger Credentials
                </span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>

              {/* Email/Password Form */}
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-label text-xs uppercase font-bold tracking-widest block">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="proprietor@market.com"
                    className="w-full bg-surface-container-lowest border-2 border-on-surface px-4 py-3 focus:ring-0 focus:border-primary placeholder:opacity-30 font-body outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="font-label text-xs uppercase font-bold tracking-widest block">
                    Access Key
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-surface-container-lowest border-2 border-on-surface px-4 py-3 focus:ring-0 focus:border-primary placeholder:opacity-30 font-body outline-none"
                    />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      👁
                    </button>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary py-4 font-label font-bold uppercase tracking-widest border-2 border-on-surface hard-shadow-dark active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                  >
                    Open Your Ledger
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-xs font-body text-on-surface-variant">
                By continuing, you agree to the{' '}
                <a href="#" className="underline font-bold text-on-surface">Merchant Terms of Service</a> and{' '}
                <a href="#" className="underline font-bold text-on-surface">Privacy Protocol</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
