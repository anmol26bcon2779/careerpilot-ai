import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  MapPin,
  Bot,
  Menu,
  X,
  Target,
  Cpu,
  Briefcase,
  FileText,
  Mic,
  Sliders,
  ChevronRight,
  LogOut
} from 'lucide-react';

export default function MobileNav() {
  const {
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen,
    progressPercentage,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthMode
  } = useApp();

  const allNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'discovery', label: 'Career Discovery', icon: Compass },
    { id: 'twin', label: 'Career Digital Twin', icon: Cpu },
    { id: 'roadmap', label: 'Learning Roadmap', icon: MapPin },
    { id: 'mentor', label: 'AI Mentor', icon: Bot },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'resume', label: 'Resume Builder', icon: FileText },
    { id: 'interview', label: 'Interview Coach', icon: Mic },
    { id: 'settings', label: 'Integrations & Sync', icon: Sliders },
  ];

  return (
    <>
      {/* Full Drawer / Menu Sheet when opened */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#0B0B14]/95 backdrop-blur-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
            <span className="font-extrabold text-base text-white tracking-tight">
              CAREERPILOT<span className="text-sky-400">.AI</span> MENU
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600/30 text-white border border-indigo-500/40'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
          </div>

          {/* Bottom user action */}
          <div className="p-4 border-t border-white/10 bg-[#0F0F1E]">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({user.email})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-glow-sm"
              >
                Sign In to Save Progress
              </button>
            )}
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E0E1C]/90 backdrop-blur-xl border-t border-white/[0.08] px-2 py-1.5 flex items-center justify-around safe-area-bottom">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'overview' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('discovery')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'discovery' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Discover</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors relative ${
            activeTab === 'roadmap' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span>Roadmap</span>
          {progressPercentage > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-emerald-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('mentor')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
            activeTab === 'mentor' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-5 h-5 mb-0.5" />
          <span>AI Mentor</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium text-slate-400 hover:text-slate-200"
        >
          <Menu className="w-5 h-5 mb-0.5" />
          <span>More</span>
        </button>
      </nav>
    </>
  );
}
