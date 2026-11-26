import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Menu,
  X,
  Sparkles,
  Zap,
  User,
  LogOut,
  LogIn,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function Header({ onOpenLanding }) {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthMode,
    setIsOnboardingOpen,
    studentProfile,
    integrationSettings
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={onOpenLanding}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 p-[1.5px] shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
              <div className="w-full h-full bg-[#0F0F1E] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                  CAREERPILOT<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">.AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  SaaS 2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden lg:block -mt-1 font-medium tracking-wide">
                Discover Your Potential. Design Your Future.
              </p>
            </div>
          </div>
        </div>

        {/* Center / Status Pills */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/20 text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>AI Mentor: <strong className="text-white font-semibold">Gemini Flash</strong></span>
          </div>

          <div
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 cursor-pointer hover:bg-emerald-950/50 transition-colors"
            title="Google Sheets & Zapier sync is active"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sheets Sync: <strong className="text-white font-semibold">Zapier Active</strong></span>
          </div>
        </div>

        {/* Right: User / Auth Controls */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <span>Edit Profile</span>
              </button>

              <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {studentProfile.fullName ? studentProfile.fullName[0].toUpperCase() : 'A'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-white leading-tight">{studentProfile.fullName || 'Student'}</p>
                  <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">{studentProfile.targetCareer}</p>
                </div>

                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  setAuthMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-200"
              >
                <span>Get Started</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
