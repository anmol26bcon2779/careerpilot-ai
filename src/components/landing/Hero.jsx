import React from 'react';
import { Sparkles, ArrowRight, Compass, ShieldCheck, Zap, Brain, CheckCircle2, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Hero({ onNavigate }) {
  const { user, setAuthModalOpen, setAuthModalTab, loadDemoUser } = useAuth();

  const handleStartJourney = () => {
    if (user) {
      onNavigate('dashboard');
    } else {
      setAuthModalTab('register');
      setAuthModalOpen(true);
    }
  };

  const handleExploreFeatures = () => {
    const el = document.getElementById('features');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-electric-blue/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-600/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Release / Tech Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:border-indigo-500/40 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">
            Powered by Google Gemini API & Zapier to Google Sheets
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
            Zero Paid DB
          </span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Your Future Deserves a{' '}
          <span className="gradient-text-electric">Better Roadmap.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Discover career opportunities, identify your skill gaps and build a personalised roadmap with your AI career mentor.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={handleStartJourney}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-glow-md hover:shadow-glow-lg transition-all scale-100 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleExploreFeatures}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm border border-white/10 transition-all"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>Explore Features</span>
          </button>
        </div>

        {/* Quick Demo Student Shortcut */}
        {!user && (
          <div className="mt-4">
            <button
              onClick={() => {
                loadDemoUser();
                onNavigate('dashboard');
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-medium transition-colors"
            >
              Or explore instantly as Demo Student (Alex Chen) →
            </button>
          </div>
        )}

        {/* Value Metrics Pills */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="glass-panel p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-indigo-400 mb-1">
              <Brain className="w-4 h-4" />
              <span className="text-xs font-semibold text-slate-300">5 Career Matches</span>
            </div>
            <p className="text-xs text-slate-400">Deep Gemini assessment with salary and growth index.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold text-slate-300">Actual Progress</span>
            </div>
            <p className="text-xs text-slate-400">Strictly calculated from completed milestones, never fake.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold text-slate-300">Zapier Webhooks</span>
            </div>
            <p className="text-xs text-slate-400">Automated event streaming to 8 Google Sheets tabs.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-semibold text-slate-300">Safe Session</span>
            </div>
            <p className="text-xs text-slate-400">Client SHA-256 hashing. Zero plaintext passwords stored.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
