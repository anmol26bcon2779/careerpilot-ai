import React, { useState } from 'react';
import { 
  LayoutDashboard, Target, MessageSquare, Compass, 
  Menu, X, Cpu, BarChart3, Briefcase, FileText, 
  Mic, Settings, Zap, ArrowLeft, LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function MobileNav({ currentTab, onSelectTab, onGoLanding }) {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const bottomItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'roadmap', label: 'Roadmap', icon: Target },
    { id: 'mentor', label: 'AI Mentor', icon: MessageSquare },
    { id: 'discovery', label: 'Discovery', icon: Compass }
  ];

  const allNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'discovery', label: 'Career Discovery', icon: Compass },
    { id: 'twin', label: 'Career Digital Twin', icon: Cpu },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Target },
    { id: 'mentor', label: 'AI Mentor Chat', icon: MessageSquare },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: BarChart3 },
    { id: 'internships', label: 'Internships Board', icon: Briefcase },
    { id: 'resume', label: 'ATS Resume Builder', icon: FileText },
    { id: 'interview', label: 'Mock Interview Coach', icon: Mic },
    { id: 'integrations', label: 'Integrations & Webhook', icon: Zap },
    { id: 'settings', label: 'Profile & Settings', icon: Settings }
  ];

  const handleSelect = (id) => {
    onSelectTab(id);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-[#0A0A16]/95 backdrop-blur-md border-b border-white/5 h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onGoLanding}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-sm text-white">
              CAREERPILOT<span className="text-electric-blue">AI</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Demo Mode
          </span>
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            aria-label="Open Full Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Fixed Bottom Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A16]/95 backdrop-blur-xl border-t border-white/5 h-16 px-2 flex items-center justify-around select-none">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                isActive ? 'text-electric-blue' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-indigo-600/20' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </button>
          );
        })}

        {/* More Drawer Trigger */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
            drawerOpen ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="p-1 rounded-xl">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium mt-0.5">More</span>
        </button>
      </nav>

      {/* Full Screen Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end">
          <div className="bg-[#0E0E1F] border-t border-white/10 rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover border border-indigo-500/40"
                />
                <div>
                  <div className="text-xs font-bold text-white">{user?.name || 'Alex Chen'}</div>
                  <div className="text-[10px] text-slate-400">{user?.selectedCareer || 'AI Engineer'}</div>
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {allNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-left text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow-sm'
                        : 'bg-white/[0.03] text-slate-300 hover:bg-white/5 border border-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onGoLanding();
                }}
                className="text-slate-400 hover:text-white"
              >
                Landing Page
              </button>

              <button
                onClick={() => {
                  logout();
                  setDrawerOpen(false);
                }}
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
