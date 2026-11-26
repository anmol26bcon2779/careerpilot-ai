import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
  Zap,
  Target,
  ChevronRight,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function OverviewView() {
  const {
    studentProfile,
    roadmap,
    progressPercentage,
    completedMilestones,
    totalMilestones,
    toggleMilestone,
    savedInternships,
    setActiveTab,
    setIsOnboardingOpen,
    integrationSettings
  } = useApp();

  const nextMilestones = (roadmap?.milestones || [])
    .filter(m => !m.completed)
    .slice(0, 3);

  const completedList = (roadmap?.milestones || [])
    .filter(m => m.completed)
    .slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 overflow-hidden shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Target: {studentProfile.targetCareer || 'AI & Machine Learning Engineer'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-gradient-electric">{studentProfile.fullName || 'Student'}</span>! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              "Consistency beats intensity. 45 minutes of daily deliberate coding compounds into engineering excellence."
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 hover:from-sky-500 hover:to-purple-700 text-white font-semibold text-xs shadow-glow-sm hover:shadow-glow-md transition-all flex items-center gap-2"
            >
              <span>View Full Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-colors"
            >
              Update Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Primary 4-Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: True Roadmap Progress */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Roadmap Progress</span>
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400"><TrendingUp className="w-4 h-4" /></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{progressPercentage}%</span>
            <span className="text-xs text-slate-400 font-medium">({completedMilestones}/{totalMilestones} done)</span>
          </div>
          <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-mono">Calculated strictly from verified milestones</p>
        </div>

        {/* Metric 2: Skills Mastered */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Competencies</span>
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400"><Target className="w-4 h-4" /></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{(studentProfile.skills || []).length}</span>
            <span className="text-xs text-slate-400 font-medium">Verified Skills</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {(studentProfile.skills || []).slice(0, 3).map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">
                {s}
              </span>
            ))}
            {(studentProfile.skills || []).length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                +{ (studentProfile.skills || []).length - 3 } more
              </span>
            )}
          </div>
        </div>

        {/* Metric 3: Saved Opportunities */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Saved Internships</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400"><Briefcase className="w-4 h-4" /></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{savedInternships.length}</span>
            <span className="text-xs text-emerald-400 font-medium">Bookmarked</span>
          </div>
          <p className="text-xs text-slate-400 mt-3 truncate">
            {savedInternships[0]?.title || 'No saved listings yet'}
          </p>
        </div>

        {/* Metric 4: Sheets Sync Status */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Zapier & Sheets</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400"><Zap className="w-4 h-4" /></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-bold text-white">Live Automation</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Events 1-5 active. All milestones sync to spreadsheet.
          </p>
        </div>
      </div>

      {/* Two Column Layout: Upcoming Milestones & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Next Immediate Milestones */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl glass-panel border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Next Priority Milestones</h3>
              </div>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Full Timeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {nextMilestones.length === 0 ? (
              <div className="p-6 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                <Award className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white">All Milestones Completed!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Incredible work! You've checked off every stage of your roadmap. Generate a new advanced roadmap or explore new roles.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {nextMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="p-4 rounded-xl bg-surface-100/70 border border-white/10 hover:border-indigo-500/40 transition-all flex items-start justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() => toggleMilestone(milestone.id)}
                        className="mt-0.5 w-5 h-5 rounded-md border border-white/30 flex items-center justify-center hover:border-indigo-400 hover:bg-indigo-500/10 transition-colors"
                        title="Mark milestone complete"
                      >
                        {milestone.completed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300">
                            Stage {milestone.stageNumber}
                          </span>
                          <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                            {milestone.title}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {milestone.description}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {milestone.estimatedDuration}
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="text-indigo-400 font-medium truncate max-w-[200px]">
                            Project: {milestone.projectIdeas}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recently Completed Milestones */}
          {completedList.length > 0 && (
            <div className="p-6 rounded-2xl glass-panel border border-white/10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recently Completed</h3>
              <div className="space-y-2">
                {completedList.map((m) => (
                  <div key={m.id} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white line-through opacity-80">{m.title}</p>
                        <p className="text-[10px] text-emerald-400 font-mono">
                          Completed on {m.completedAt ? new Date(m.completedAt).toLocaleDateString() : 'Recent'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMilestone(m.id)}
                      className="text-[11px] text-slate-400 hover:text-white underline"
                    >
                      Undo
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: AI Recommendations & Quick Access */}
        <div className="space-y-4">
          {/* AI Mentor Quick Prompt Box */}
          <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-[#0F0F1E] shadow-glow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Mentor Prompt of the Day</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "How should I structure my GitHub repository for my Capstone project so recruiters immediately understand my architecture?"
            </p>
            <button
              onClick={() => setActiveTab('mentor')}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Ask AI Mentor Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Tools Navigation */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Workflows</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => setActiveTab('skill-gap')}
                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Target className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white">Run Skill Gap Audit</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveTab('resume')}
                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white">Update Resume with AI</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>

              <button
                onClick={() => setActiveTab('interview')}
                className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white">Mock Interview Practice</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
