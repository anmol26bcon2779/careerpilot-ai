import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function SkillGapAnalysisView() {
  const {
    studentProfile,
    roadmap,
    setStudentProfile,
    showToast,
    setActiveTab
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'missing' | 'improving' | 'existing'

  // Comprehensive requirement map for target careers
  const skillInventory = [
    {
      name: 'Python Programming',
      category: 'Languages',
      status: 'existing',
      studentLevel: 85,
      requiredLevel: 90,
      priority: 'High',
      recommendation: 'Deepen knowledge of asynchronous coroutines (asyncio) and memory profiling.',
      resources: [{ title: 'Fluent Python 2nd Ed.', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/' }]
    },
    {
      name: 'PyTorch & Deep Neural Networks',
      category: 'AI Frameworks',
      status: 'improving',
      studentLevel: 55,
      requiredLevel: 85,
      priority: 'High',
      recommendation: 'Build and train custom transformer layers from scratch; understand backward autograd graph.',
      resources: [{ title: 'PyTorch Official Deep Learning Tutorials', url: 'https://pytorch.org/tutorials/' }]
    },
    {
      name: 'Vector Databases (Pinecone/Milvus)',
      category: 'Data & Search',
      status: 'missing',
      studentLevel: 10,
      requiredLevel: 75,
      priority: 'High',
      recommendation: 'Implement hybrid dense and sparse retrieval algorithms with metadata filtering.',
      resources: [{ title: 'Pinecone Learning Center', url: 'https://www.pinecone.io/learn/' }]
    },
    {
      name: 'FastAPI & Microservices',
      category: 'Backend Architecture',
      status: 'improving',
      studentLevel: 60,
      requiredLevel: 80,
      priority: 'Medium',
      recommendation: 'Structure dependency injection, JWT bearer auth middleware, and async database connections.',
      resources: [{ title: 'FastAPI Interactive Tutorial', url: 'https://fastapi.tiangolo.com/tutorial/' }]
    },
    {
      name: 'Docker & Containerization',
      category: 'DevOps & Cloud',
      status: 'missing',
      studentLevel: 25,
      requiredLevel: 75,
      priority: 'High',
      recommendation: 'Write optimized multi-stage Dockerfiles and containerize PyTorch inference microservices.',
      resources: [{ title: 'Docker Official Get Started Guide', url: 'https://docs.docker.com/get-started/' }]
    },
    {
      name: 'Git Version Control & CI/CD',
      category: 'Workflow & Tooling',
      status: 'existing',
      studentLevel: 90,
      requiredLevel: 80,
      priority: 'Medium',
      recommendation: 'You have verified mastery here. Continue enforcing automated linting and PR checks.',
      resources: [{ title: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2' }]
    },
    {
      name: 'System Design & High Availability',
      category: 'Architecture',
      status: 'missing',
      studentLevel: 30,
      requiredLevel: 80,
      priority: 'High',
      recommendation: 'Study horizontal scaling, load balancers, caching tiers (Redis), and database sharding.',
      resources: [{ title: 'System Design Primer on GitHub', url: 'https://github.com/donnemartin/system-design-primer' }]
    },
    {
      name: 'Prompt Engineering & Agent Loops',
      category: 'Generative AI',
      status: 'improving',
      studentLevel: 65,
      requiredLevel: 85,
      priority: 'Medium',
      recommendation: 'Master ReAct agent loops, dynamic tool calling schemas, and hallucination reduction.',
      resources: [{ title: 'Learn Prompting Open Guide', url: 'https://learnprompting.org/' }]
    }
  ];

  const filteredSkills = skillInventory.filter(s => {
    if (activeFilter === 'all') return true;
    return s.status === activeFilter;
  });

  const existingCount = skillInventory.filter(s => s.status === 'existing').length;
  const improvingCount = skillInventory.filter(s => s.status === 'improving').length;
  const missingCount = skillInventory.filter(s => s.status === 'missing').length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Gap Detection Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Skill Gap Analysis</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Comparing your verified competencies against industry expectations for <strong className="text-white">{studentProfile.targetCareer}</strong>.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('roadmap')}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md flex items-center gap-2"
        >
          <span>Bridge Gaps in Roadmap</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveFilter('existing')}
          className={`p-5 rounded-2xl glass-panel border cursor-pointer transition-all ${
            activeFilter === 'existing' ? 'border-emerald-500 bg-emerald-950/20' : 'border-white/10 hover:border-emerald-500/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Existing Competencies</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{existingCount} Skills</span>
          <p className="text-xs text-slate-400 mt-1">Verified and industry-ready</p>
        </div>

        <div
          onClick={() => setActiveFilter('improving')}
          className={`p-5 rounded-2xl glass-panel border cursor-pointer transition-all ${
            activeFilter === 'improving' ? 'border-amber-500 bg-amber-950/20' : 'border-white/10 hover:border-amber-500/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Needs Improvement</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{improvingCount} Skills</span>
          <p className="text-xs text-slate-400 mt-1">Foundational awareness, needs project proof</p>
        </div>

        <div
          onClick={() => setActiveFilter('missing')}
          className={`p-5 rounded-2xl glass-panel border cursor-pointer transition-all ${
            activeFilter === 'missing' ? 'border-rose-500 bg-rose-950/20' : 'border-white/10 hover:border-rose-500/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Missing Skill Gaps</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-3xl font-extrabold text-white">{missingCount} Skills</span>
          <p className="text-xs text-slate-400 mt-1">Critical prerequisites for interviews</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          All Skills ({skillInventory.length})
        </button>
        <button
          onClick={() => setActiveFilter('missing')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            activeFilter === 'missing' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          Missing Only ({missingCount})
        </button>
        <button
          onClick={() => setActiveFilter('improving')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            activeFilter === 'improving' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          In Progress ({improvingCount})
        </button>
        <button
          onClick={() => setActiveFilter('existing')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            activeFilter === 'existing' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white bg-white/5'
          }`}
        >
          Mastered ({existingCount})
        </button>
      </div>

      {/* Skills Comparison List */}
      <div className="space-y-4">
        {filteredSkills.map((skill, idx) => {
          const isMissing = skill.status === 'missing';
          const isImproving = skill.status === 'improving';
          const isExisting = skill.status === 'existing';

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl glass-panel border transition-all ${
                isMissing
                  ? 'border-rose-500/30 bg-rose-950/10'
                  : isImproving
                  ? 'border-amber-500/30 bg-amber-950/10'
                  : 'border-emerald-500/20 bg-emerald-950/10'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">{skill.category}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        skill.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {skill.priority} Priority
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {skill.recommendation}
                  </p>
                </div>

                {/* Progress Bar Visual Indicator */}
                <div className="w-full md:w-64 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Current vs Required</span>
                    <span className="font-semibold text-white">{skill.studentLevel}% / {skill.requiredLevel}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 relative overflow-hidden">
                    {/* Required Target Marker */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white/40 z-10"
                      style={{ left: `${skill.requiredLevel}%` }}
                      title={`Target Level: ${skill.requiredLevel}%`}
                    />
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${
                        isMissing
                          ? 'bg-rose-500'
                          : isImproving
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${skill.studentLevel}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Recommended Resource Links */}
              {skill.resources && skill.resources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-slate-400">Recommended Learning Guide:</span>
                    <a
                      href={skill.resources[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-300 hover:text-white underline flex items-center gap-1"
                    >
                      <span>{skill.resources[0].title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
