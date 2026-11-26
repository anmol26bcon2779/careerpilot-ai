import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Cpu,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  AlertCircle,
  TrendingUp,
  Download,
  Share2,
  MapPin,
  ExternalLink,
  Target
} from 'lucide-react';

export default function CareerDigitalTwinView() {
  const {
    studentProfile,
    roadmap,
    progressPercentage,
    completedMilestones,
    totalMilestones,
    showToast,
    setActiveTab
  } = useApp();

  const completedList = (roadmap?.milestones || []).filter(m => m.completed);
  const pendingList = (roadmap?.milestones || []).filter(m => !m.completed);

  // Missing skills from current target roadmap
  const allTargetSkills = [
    'PyTorch & Deep Neural Nets',
    'Vector Databases & RAG',
    'FastAPI & Microservices',
    'Docker & Containerization',
    'Advanced System Design',
    'Distributed Data Pipelines'
  ];

  const studentSkills = studentProfile.skills || [];
  const missingSkills = allTargetSkills.filter(
    s => !studentSkills.some(sk => s.toLowerCase().includes(sk.toLowerCase()))
  );

  const handleExportSummary = () => {
    const report = {
      student: studentProfile.fullName,
      email: studentProfile.email,
      targetCareer: studentProfile.targetCareer,
      verifiedProgress: `${progressPercentage}% (${completedMilestones}/${totalMilestones} completed milestones)`,
      completedMilestones: completedList.map(m => m.title),
      upcomingMilestones: pendingList.map(m => m.title),
      verifiedSkills: studentSkills,
      missingSkillsGap: missingSkills,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CareerPilot_DigitalTwin_${studentProfile.fullName?.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Digital Twin Exported', 'Downloaded verified competencies report JSON.', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Real-Time Evolving Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Career Digital Twin</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Live simulation of your industry readiness, verified competencies, and real milestone milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportSummary}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Export Verified Twin (JSON)</span>
          </button>
        </div>
      </div>

      {/* Main Readiness Gauge Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Overall Readiness & Target Spec */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Readiness Quotient</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                {progressPercentage >= 50 ? 'Interview Ready Tier' : 'Foundational Tier'}
              </span>
            </div>

            <div className="text-center py-6">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="10"
                    className="text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="url(#readiness-gradient)"
                    strokeWidth="10"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * progressPercentage) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                  <defs>
                    <linearGradient id="readiness-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38BDF8" />
                      <stop offset="50%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-white">{progressPercentage}%</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Verified</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Target Role</span>
                <span className="font-bold text-white text-right truncate max-w-[170px]">{studentProfile.targetCareer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Completed Stages</span>
                <span className="font-bold text-emerald-400">{completedMilestones} of {totalMilestones}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Weekly Cadence</span>
                <span className="font-bold text-sky-300">{studentProfile.weeklyAvailability || 15} hrs/wk</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center mt-6">
            Metric strictly derived from completed practical tasks & milestones.
          </p>
        </div>

        {/* Center & Right 2 Columns: Skills Matrix & Gap Delta */}
        <div className="lg:col-span-2 space-y-6">
          {/* Verified Skills vs Missing Skills */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-400" />
              <span>Competency Verification Matrix</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Verified */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Active Verified Skills</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">{studentSkills.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {studentSkills.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Gaps */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Required Skill Gaps</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">{missingSkills.length}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-amber-900/40 border border-amber-500/30 text-amber-200 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Completed Projects & Proven Work */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Verified Practical Deliverables ({completedList.length})</span>
              </h3>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Go to Roadmap →
              </button>
            </div>

            {completedList.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No milestones marked as complete yet. Start your journey in the Learning Roadmap tab!</p>
            ) : (
              <div className="space-y-3">
                {completedList.map((m) => (
                  <div key={m.id} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                          Stage {m.stageNumber}
                        </span>
                        <h4 className="text-xs font-bold text-white">{m.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Project Output: <strong className="text-slate-200 font-medium">{m.projectIdeas}</strong></p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">Verified</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
