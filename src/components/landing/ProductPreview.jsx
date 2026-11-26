import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ChevronRight, MessageSquare, 
  Target, BarChart3, FileText, ArrowUpRight, Award, Compass
} from 'lucide-react';

export function ProductPreview({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('roadmap');

  return (
    <section className="py-12 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Product Preview</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            An Operating System for Your Career Growth
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            From personalized AI career roadmaps to real-time skill benchmarking and Gemini mentor guidance.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'roadmap', label: '8-Stage Roadmap', icon: Target },
            { id: 'skills', label: 'Skill Gap Matrix', icon: BarChart3 },
            { id: 'mentor', label: 'AI Mentor Chat', icon: MessageSquare },
            { id: 'resume', label: 'ATS Resume Builder', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-glow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Preview Frame */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0F0F22]/90 backdrop-blur-2xl shadow-2xl p-4 sm:p-8 overflow-hidden">
          {/* Subtle Top Indicator Bar */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-slate-400 hidden sm:inline">careerpilot.ai/app/dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-medium text-[11px]">
                Target: AI & Machine Learning Engineer
              </span>
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-1 text-electric-blue hover:text-white font-medium transition-colors"
              >
                <span>Open Full App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Content Based on Selected Tab */}
          <div className="pt-6">
            {activeTab === 'roadmap' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">Target Roadmap: AI Engineer</h3>
                    <p className="text-xs text-slate-400">Calculated Progress: 2 of 9 stages completed (22%)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">
                      2 Stages Completed
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-emerald-500/30 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-400">Stage 01 • Completed</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Programming Fundamentals</h4>
                    <p className="text-xs text-slate-400 mt-1">PEP 8, Type hints, modular clean architecture, Git & PyTest.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-indigo-500/50 relative shadow-glow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-indigo-400">Stage 02 • In Progress</span>
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    </div>
                    <h4 className="text-sm font-semibold text-white">Python Mastery & Async I/O</h4>
                    <p className="text-xs text-slate-400 mt-1">Generators, decorators, asyncio, memory profiling, and high-throughput scrapers.</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 opacity-80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400">Stage 03 • Upcoming</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-300">Data Structures & Algorithmic Patterns</h4>
                    <p className="text-xs text-slate-400 mt-1">Heaps, Tries, Graph traversals (BFS/DFS), and A* pathfinding.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Target Skill Gap Benchmark</h3>
                  <span className="text-xs text-slate-400">Matches 78% of Industry Demands</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-2">Verified Skills (Proficient)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python', 'Git', 'SQL', 'React', 'Linux Basics'].map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-2">Needs Improvement (In Progress)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Data Structures', 'Docker Containers', 'Asyncio'].map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 text-xs border border-amber-500/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-2">Missing Skills (High Priority)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['PyTorch', 'Vector Databases', 'Transformers', 'FastAPI'].map(s => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 text-xs border border-rose-500/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mentor' && (
              <div className="p-4 rounded-xl bg-[#090915] border border-white/5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-electric-blue" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">CareerPilot AI Mentor</span>
                      <span className="text-[10px] text-slate-400">Context: Alex Chen (3rd Year CS)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "To bridge your gap to an **AI Engineer** role this quarter: Focus on building a hands-on **RAG application** utilizing Pinecone and PyTorch. Recruiters look for candidate ownership of latency benchmarks rather than another tutorial clone."
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    What should I learn after Python?
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    How do I prepare for technical interviews?
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Alex Chen – AI & Machine Learning Engineer</h4>
                    <p className="text-xs text-slate-400">ATS Optimized Summary • Exportable as PDF</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                    ATS Score: 94 / 100
                  </span>
                </div>
                <p className="text-xs text-slate-300 bg-[#090915] p-3 rounded-lg border border-white/5 leading-relaxed font-mono">
                  "High-performing Computer Science student with proven foundation in machine learning, PyTorch, and distributed microservices. Creator of open-source AI tooling with focus on low-latency inference pipelines."
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
