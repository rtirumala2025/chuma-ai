import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('signup');
  const [authError, setAuthError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/chat'
        }
      });
      if (error) throw error;
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleMobileMoneyConnect = () => {
    navigate('/chat');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate('/chat');
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

              {/* Error Display */}
              {authError && (
                <div className="mb-6 p-4 border-2 border-[#E11900] bg-surface text-[#E11900] font-label text-xs uppercase font-bold tracking-widest text-center">
                  {authError}
                </div>
              )}

              {/* Google Auth */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-surface text-on-surface py-4 font-label font-bold uppercase tracking-widest border-2 border-on-surface hover:bg-surface-container-high transition-all mb-8 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </button>

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
