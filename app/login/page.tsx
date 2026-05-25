'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, LogIn, Pill } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mimic quick loading for transition
    setTimeout(() => {
      router.push('/');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-body-md text-on-surface antialiased p-margin-mobile relative bg-[#0D0F14] grid-bg">
      {/* Login Container */}
      <main className="w-full max-w-[440px] z-10">
        {/* Brand Identity Header */}
        <div className="flex flex-col items-center mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(0,194,168,0.3)]">
              <span className="material-symbols-outlined text-[#001D19] text-[28px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                pill
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight">PharmaStock Pro</h1>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant">
            <div className="w-2 h-2 rounded-full bg-primary glow-accent"></div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase text-[10px] tracking-wider">
              Secure Pharmaceutical Platform
            </span>
          </div>
        </div>

        {/* Login Card */}
        <section className="bg-surface/85 backdrop-blur-[24px] border border-outline p-8 rounded-clinical shadow-2xl">
          <header className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">System Access</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant/80">
              Authenticated gateway for inventory management and clinical logistics.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px] tracking-wider" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-sm">
                  mail
                </span>
                <input
                  className="bg-background border border-outline-variant focus:border-accent text-on-surface w-full h-12 pl-10 pr-4 rounded-clinical font-mono-data text-mono-data focus:ring-0 focus:outline-none placeholder-on-surface-variant/30 text-sm transition-all focus:scale-[1.01]"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@pharmastock.pro"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase text-[10px] tracking-wider" htmlFor="password">
                Security Token / Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-sm">
                  lock
                </span>
                <input
                  className="bg-background border border-outline-variant focus:border-accent text-on-surface w-full h-12 pl-10 pr-10 rounded-clinical font-mono-data text-mono-data focus:ring-0 focus:outline-none placeholder-on-surface-variant/30 text-sm transition-all focus:scale-[1.01]"
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Forgot Link */}
            <div className="flex justify-end">
              <a className="font-label-caps text-label-caps text-primary hover:opacity-80 transition-colors uppercase text-[10px] tracking-wider" href="#">
                Forgot Access Credentials?
              </a>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                className="w-full h-12 bg-primary text-on-primary-container font-label-caps text-label-caps rounded-clinical hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[11px] font-semibold"
                type="submit"
                disabled={loading}
              >
                <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                <span className="material-symbols-outlined text-sm leading-none">login</span>
              </button>
            </div>
          </form>

          <footer className="mt-10 pt-6 border-t border-outline-variant/60">
            <div className="flex flex-col items-center space-y-3">
              <p className="font-body-sm text-body-sm text-on-surface-variant/60 text-center text-xs">
                © 2026 PharmaStock Pro v4.2.0. All logistics encrypted.
              </p>
              <div className="flex gap-4">
                <img
                  alt="HIPAA Compliance Badge"
                  className="h-6 opacity-40 grayscale hover:grayscale-0 transition-all cursor-help"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaEg86FlnZyzY-sENrKSwtz46ViHPeRAoQu2EvBWFFLIyMoUKFZCSU1U7X5kgYPQsjJUmD4YQq5m-dz_iMccK7fIwbvzu6rzr2YPWwGjWa4Q_BcVAKswZagQcGU-tqZJO-i41Srs2aT5-zU_AHVu5XCc2aUwLlF5MnAUoKMA2n1kPLwzkyZoGtvpuX4TQ0v6ItEC6Qhh_bzHdDIDaQVRG4Wop-JmwJH1WmhGjWtziCLx5K8TxM7EhdRGM8QXcaYKGmodlbnkk-atc"
                />
                <img
                  alt="SOC2 Type II Badge"
                  className="h-6 opacity-40 grayscale hover:grayscale-0 transition-all cursor-help"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZI9M-AxQFLpOs8_x7LpnwysA3rEtAmgbyHE__6eIpdvnGbrcODhSmV7NLk5WzUSV2GT_-XOWXXF5loRL2WSAmip2-fcPI_UrgeB8nA0SkYVpJ9AMnFKSVv3XVtIdLEfd1rCFQ7yEdPpMGTLJzaIAs_Y59DMnNXbAL7thWXi3-Po-A50OI5-O60gnAixeE4RtZey1gtBc8xre8nCn9OENLP5WoMTNeJeoIrC458Hv83FEq5ONRs5jEpSefL0d5hBdTj9-9VjX0IIg"
                />
              </div>
            </div>
          </footer>
        </section>
      </main>

      {/* Dynamic Background Gradient */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none -z-10"></div>
    </div>
  );
}
