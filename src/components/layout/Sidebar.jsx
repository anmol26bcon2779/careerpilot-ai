import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Cpu,
  MapPin,
  Bot,
  Target,
  Briefcase,
  FileText,
  Mic,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    progressPercentage,
    completedMilestones,
    totalMilestones,
    studentProfile
  } = useApp();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'discovery', label: 'Career Discovery', icon: Compass, badge: 'AI' },
    { id: 'twin', label: 'Career Digital Twin', icon: Cpu, badge: 'Live' },
    { id: 'roadmap', label: 'Learning Roadmap', icon: MapPin, badge: `${progressPercentage}%` },
    { id: 'mentor', label: 'AI Mentor', icon: Bot, badge: 'Gemini' },
    { id: 'skill-gap', label: 'Skill Gap Analysis', icon: Target, badge: null },
    { id: 'internships', label: 'Internships', icon: Briefcase, badge: 'Live' },
    { id: 'resume', label: 'Resume Builder', icon: FileText, badge: 'PDF' },
    { id: 'interview', label: 'Interview Coach', icon: Mic, badge: 'Mock' },
    { id: 'settings', label: 'Integrations & Sync', icon: Sliders, badge: 'Zapier' },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-white/[0.08] bg-[#0E0E1C]/80 backdrop-blur-xl transition-all duration-300 relative z-30 select-none ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-[#1A1A32] border border-white/20 text-slate-300 hover:text-white flex items-center justify-center shadow-md transition-all hover:scale-105 z-40"
        title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Target Career Snapshot */}
      {!sidebarCollapsed && (
        <div className="px-4 pt-5 pb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase">Current Target</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-xs font-bold text-white truncate" title={studentProfile.targetCareer}>
              {studentProfile.targetCareer || 'AI Engineer'}
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>Roadmap Progress</span>
              <span className="text-white font-semibold">{progressPercentage}%</span>
            </div>
            <div className="mt-1 w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/40 shadow-glow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              } ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              {!sidebarCollapsed && (
                <>
                  <span className="truncate text-left flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/30'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-white/[0.08] text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Sheets Connected</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">v1.0.0</span>
        </div>
      )}
    </aside>
  );
}
