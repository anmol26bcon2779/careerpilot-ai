import React from 'react';
import { 
  Compass, Target, Sparkles, CheckCircle2, Clock, 
  ArrowRight, Briefcase, Award, Zap, TrendingUp, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';

export function OverviewTab({ onSelectTab }) {
  const { user } = useAuth();
  const { roadmap, progressMetrics, toggleMilestone, savedInternships } = useCareer();

  const stages = roadmap?.stages || [];
  const nextMilestones = stages.filter(s => !s.completed && s.completionStatus !== 'completed').slice(0, 3);
  const completedMilestones = stages.filter(s => s.completed || s.completionStatus === 'completed');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-950/60 via-[#120F30] to-[#0D0B24] border border-indigo-500/20 overflow-hidden shadow-glow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
              <span>AI Career Operating System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Alex'}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Targeting <span className="text-electric-blue font-bold">{user?.selectedCareer || 'AI Engineer'}</span>. You have completed <strong className="text-white">{progressMetrics.completedCount} of {progressMetrics.totalCount}</strong> milestones ({progressMetrics.percentage}%).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTab('mentor')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-glow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Mentor</span>
            </button>

            <button
              onClick={() => onSelectTab('discovery')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs border border-white/10 transition-all"
            >
              Assess Alignment
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Calculated Progress */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Roadmap Progress</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{progressMetrics.percentage}%</span>
              <span className="text-xs text-slate-400">({progressMetrics.completedCount}/{progressMetrics.totalCount})</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-electric-blue transition-all duration-500" 
                style={{ width: `${progressMetrics.percentage}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-400 mt-2 block">
            Calculated from completed tasks only
          </span>
        </div>

        {/* Selected Career */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Target Domain</span>
            <Compass className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <span className="text-sm sm:text-base font-bold text-white block truncate">
              {user?.selectedCareer || 'AI Engineer'}
            </span>
            <span className="text-xs text-emerald-400 font-semibold mt-1 inline-block">
              +38% Market Demand
            </span>
          </div>
          <button
            onClick={() => onSelectTab('roadmap')}
            className="text-[11px] text-indigo-400 hover:text-white mt-2 font-medium flex items-center gap-1"
          >
            <span>View 8 Stages</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Saved Opportunities */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Internships Tracked</span>
            <Briefcase className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {savedInternships.length}
            </span>
            <span className="text-xs text-slate-400 block mt-1">
              Active candidate pipelines
            </span>
          </div>
          <button
            onClick={() => onSelectTab('internships')}
            className="text-[11px] text-electric-blue hover:text-white mt-2 font-medium flex items-center gap-1"
          >
            <span>Explore Listings</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Skill Gap Benchmark */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Interview Readiness</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              82<span className="text-sm font-normal text-slate-400">/100</span>
            </span>
            <span className="text-xs text-amber-300 font-semibold block mt-1">
              Intermediate Tier
            </span>
          </div>
          <button
            onClick={() => onSelectTab('interview')}
            className="text-[11px] text-amber-400 hover:text-white mt-2 font-medium flex items-center gap-1"
          >
            <span>Mock Coach</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Main Multi-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Next Milestones with Instant Check-off */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span>Upcoming Roadmap Milestones</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click the checkbox when you finish practical tasks to recalculate your real progress.
                </p>
              </div>

              <button
                onClick={() => onSelectTab('roadmap')}
                className="text-xs font-semibold text-indigo-400 hover:text-white transition-colors"
              >
                View Full Roadmap →
              </button>
            </div>

            <div className="space-y-3">
              {nextMilestones.length > 0 ? (
                nextMilestones.map((stage) => (
                  <div
                    key={stage.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all flex items-start justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleMilestone(stage.id)}
                        title="Mark Complete"
                        className="mt-0.5 w-5 h-5 rounded-md border border-white/20 hover:border-emerald-400 flex items-center justify-center transition-colors group-hover:border-indigo-400"
                      >
                        <span className="w-2.5 h-2.5 rounded-sm bg-transparent group-hover:bg-indigo-400/30" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">
                            Stage {stage.stageNumber}: {stage.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                            {stage.estimatedDuration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {stage.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectTab('roadmap')}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-white/5 text-slate-300 hover:text-white shrink-0"
                    >
                      Tasks ({stage.practicalTasks?.length || 2})
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-emerald-400 bg-emerald-950/20 rounded-2xl border border-emerald-500/20">
                  🎉 Fantastic work! You have completed all milestones in this roadmap!
                </div>
              )}
            </div>
          </div>

          {/* AI Recommended Next Moves */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric-blue" />
              <span>AI Mentor Context Recommendations</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Suggested next actions synthesized from your profile and missing skills:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onSelectTab('skill-gap')}
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 text-left transition-all"
              >
                <span className="text-xs font-semibold text-white block">
                  Bridge PyTorch & Vectors Gap
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Crucial for upcoming machine learning technical interviews.
                </span>
              </button>

              <button
                onClick={() => onSelectTab('resume')}
                className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-purple-500/30 text-left transition-all"
              >
                <span className="text-xs font-semibold text-white block">
                  Generate ATS Summary
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Produce quantified impact bullet points for your RAG project.
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Activity Feed & Integrations State */}
        <div className="space-y-6">
          
          {/* Google Sheets / Zapier Sync Status */}
          <div className="glass-panel p-5 rounded-3xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Zapier Integration</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Google Sheets streaming active. Milestone completions and internship saves are automatically dispatched to your webhook.
            </p>

            <button
              onClick={() => onSelectTab('integrations')}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-indigo-300 border border-white/5 transition-all text-center block"
            >
              Inspect Webhook & Tabs →
            </button>
          </div>

          {/* Recent Completed Milestones Feed */}
          <div className="glass-panel p-5 rounded-3xl border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Completed Milestones ({completedMilestones.length})
            </h4>

            <div className="space-y-2">
              {completedMilestones.slice(0, 3).map((st) => (
                <div key={st.id} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{st.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Saved Internships Summary */}
          <div className="glass-panel p-5 rounded-3xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Saved Internships ({savedInternships.length})
              </h4>
              <button
                onClick={() => onSelectTab('internships')}
                className="text-[11px] text-cyan-400 hover:text-white"
              >
                All
              </button>
            </div>

            <div className="space-y-2.5">
              {savedInternships.slice(0, 2).map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <div className="font-semibold text-white truncate">{item.title}</div>
                  <div className="text-[10px] text-slate-400">{item.company} • {item.location}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
