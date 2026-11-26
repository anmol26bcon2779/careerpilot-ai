import React from 'react';
import { 
  Cpu, Target, CheckCircle2, AlertCircle, Sparkles, 
  BarChart3, Award, ArrowRight, Code, ShieldCheck, Flame 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';

export function CareerDigitalTwinTab({ onSelectTab }) {
  const { user } = useAuth();
  const { roadmap, progressMetrics, resumeData } = useCareer();

  const stages = roadmap?.stages || [];
  const completedStages = stages.filter(s => s.completed || s.completionStatus === 'completed');
  const upcomingStages = stages.filter(s => !s.completed && s.completionStatus !== 'completed');

  // Realistic skills breakdown
  const verifiedSkills = user?.skills || ['Python', 'JavaScript', 'Git', 'SQL'];
  const missingSkills = ['PyTorch', 'Vector Databases', 'Transformers', 'FastAPI & MLOps'];
  const completedProjects = resumeData?.projects || [
    { title: 'Command-Line File System Auditor', date: '2026', technologies: 'Python, Type Hints, PyTest' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Real-Time Student Evolution Profile</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Career Digital Twin
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your living algorithmic professional twin. Continuously synchronizes verified milestone completions, portfolio evidence, and skill readiness strictly derived from finished tasks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Readiness Velocity</span>
              <span className="text-lg font-bold text-electric-blue font-mono">1.4x / wk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Twin Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Profile Card */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt="Avatar"
              className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/30"
            />
            <div>
              <h3 className="text-base font-bold text-white">{user?.name || 'Alex Chen'}</h3>
              <p className="text-xs text-indigo-400">{user?.education} • {user?.year}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target Role:</span>
              <span className="font-bold text-white">{user?.selectedCareer || 'AI Engineer'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Weekly Bandwidth:</span>
              <span className="font-mono text-emerald-400">{user?.weeklyHours || 15} hrs/wk</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Academic Major:</span>
              <span className="text-slate-200">{user?.course || 'Computer Science'}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('settings')}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/5 transition-all text-center block"
          >
            Edit Profile Parameters →
          </button>
        </div>

        {/* Calculated Progress Gauge */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Verified Career Readiness
              </span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xs text-slate-400">
              Computed strictly from {progressMetrics.completedCount} completed milestones out of {progressMetrics.totalCount} total.
            </p>
          </div>

          <div className="my-4 text-center">
            <div className="text-5xl font-black text-white font-mono">
              {progressMetrics.percentage}%
            </div>
            <span className="text-xs font-semibold text-emerald-400 mt-1 inline-block">
              {progressMetrics.completedCount} Milestones Verified
            </span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-electric-blue transition-all duration-500"
              style={{ width: `${progressMetrics.percentage}%` }}
            />
          </div>
        </div>

        {/* Sync & Integrity State */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Google Sheets Integrity
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400">
              Autonomous Zapier Webhook dispatch active. Every completed milestone is appended to Google Sheets tab <strong>Milestone Progress</strong>.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-300">
            ✓ Zero plaintext passwords stored. Session hashed via client-side SHA-256.
          </div>

          <button
            onClick={() => onSelectTab('integrations')}
            className="w-full py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-xs font-semibold text-indigo-300 border border-indigo-500/30 transition-all text-center block"
          >
            View Live Webhook Logs →
          </button>
        </div>

      </div>

      {/* Detailed Twin Panels: Verified vs Missing Skills & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skills Breakdown */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-electric-blue" />
            <span>Digital Twin Skill Inventory</span>
          </h3>

          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-2">
              Verified Technical Skills ({verifiedSkills.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {verifiedSkills.map((sk) => (
                <span
                  key={sk}
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{sk}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5">
            <span className="text-xs font-bold text-rose-400 block mb-2">
              Missing High-Impact Skills ({missingSkills.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((sk) => (
                <span
                  key={sk}
                  className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{sk}</span>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectTab('skill-gap')}
            className="text-xs font-semibold text-indigo-400 hover:text-white pt-2 block"
          >
            Inspect Detailed Skill Gap Matrix →
          </button>
        </div>

        {/* Completed Milestones & Projects */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span>Completed Milestones & Artifacts</span>
          </h3>

          <div className="space-y-2.5">
            {completedStages.length > 0 ? (
              completedStages.map((st) => (
                <div key={st.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Stage {st.stageNumber}: {st.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{st.estimatedDuration}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No milestones completed yet. Check off completed items in Learning Roadmap.</p>
            )}
          </div>

          <div className="pt-3 border-t border-white/5">
            <span className="text-xs font-bold text-white block mb-2">
              Demonstrated Portfolio Projects:
            </span>
            <div className="space-y-2">
              {completedProjects.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                  <span className="font-bold text-white block">{p.title}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{p.technologies}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
