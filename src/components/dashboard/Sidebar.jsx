import React from 'react';
import { 
  LayoutDashboard, Compass, Cpu, Target, MessageSquare, 
  BarChart3, Briefcase, FileText, Mic, Settings, Zap, 
  ChevronLeft, ChevronRight, LogOut, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Sidebar({ currentTab, onSelectTab, isCollapsed, onToggleCollapse, onGoLanding }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'discovery', label: 'Career Discovery', icon: Compass, badge: 'AI' },
    { id: 'twin', label: 'Career Digital Twin', icon: Cpu },
    { id: 'roadmap', label: 'Learning Roadmap', icon: Target },
    { id: 'mentor', label: 'AI Mentor', icon: MessageSquare, badge: 'Gemini' },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: BarChart3 },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'resume', label: 'Resume Builder', icon: FileText },
    { id: 'interview', label: 'Interview Coach', icon: Mic, badge: 'AI' },
    { id: 'integrations', label: 'Integrations', icon: Zap, badge: 'Sheets' },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between h-screen sticky top-0 bg-[#0A0A16] border-r border-white/5 transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Header / Logo */}
      <div>
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/5">
          <div 
            onClick={onGoLanding} 
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-electric-blue p-[1.5px] shrink-0 shadow-glow-sm">
              <div className="w-full h-full bg-[#0A0A16] rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-indigo-400 group-hover:text-electric-blue group-hover:rotate-45 transition-transform" />
              </div>
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <span className="font-extrabold text-base tracking-tight text-white block">
                  CAREERPILOT<span className="text-electric-blue">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                  AI Career Mentor
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)] scrollbar-custom">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />

                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!isCollapsed && item.badge && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <span className="absolute -left-3 top-2 bottom-2 w-1 bg-electric-blue rounded-r" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Session Footer */}
      <div className="p-3 border-t border-white/5 bg-[#080812]">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-2`}>
          <div 
            onClick={() => onSelectTab('settings')}
            className="flex items-center gap-2.5 cursor-pointer overflow-hidden group"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name || 'User'}
              className="w-9 h-9 rounded-xl object-cover border border-white/10 shrink-0"
            />
            {!isCollapsed && (
              <div className="truncate">
                <span className="text-xs font-bold text-white group-hover:text-electric-blue transition-colors block truncate">
                  {user?.name || 'Alex Chen'}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {user?.isDemoAccount ? 'Demo Student Profile' : user?.email}
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
