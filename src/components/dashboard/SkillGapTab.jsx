import React from 'react';
import { 
  BarChart3, CheckCircle2, AlertCircle, Clock, 
  BookOpen, ArrowUpRight, TrendingUp, Sparkles, Target 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';

export function SkillGapTab() {
  const { user } = useAuth();
  const { roadmap } = useCareer();

  const targetRole = user?.selectedCareer || 'AI & Machine Learning Engineer';

  // Analysis Breakdown
  const existingSkills = [
    { name: 'Python Fundamentals', level: 'Proficient (88%)', type: 'Core Language', verified: true },
    { name: 'Git & GitHub Collaboration', level: 'Proficient (85%)', type: 'Tooling', verified: true },
    { name: 'SQL Querying', level: 'Intermediate (75%)', type: 'Data Storage', verified: true },
    { name: 'Clean Code (PEP 8)', level: 'Proficient (80%)', type: 'Standards', verified: true },
    { name: 'Linux Basics', level: 'Intermediate (70%)', type: 'Operating Systems', verified: true }
  ];

  const needsImprovementSkills = [
    { 
      name: 'Data Structures & Algorithms', 
      priority: 'High', 
      level: '55% Readiness', 
      reason: 'Essential for technical coding interviews (NeetCode patterns).',
      recommendation: 'MIT 6.006 & NeetCode 150 practice roadmap',
      url: 'https://neetcode.io'
    },
    { 
      name: 'Docker & Containerization', 
      priority: 'Medium', 
      level: '45% Readiness', 
      reason: 'Required for microservice deployments and reproducible inference environments.',
      recommendation: 'Docker Official Getting Started Guide',
      url: 'https://docs.docker.com/get-started/'
    },
    { 
      name: 'Asynchronous Programming (asyncio)', 
      priority: 'Medium', 
      level: '50% Readiness', 
      reason: 'Critical for high-throughput model serving and low-latency API gateways.',
      recommendation: 'RealPython AsyncIO in Python Tutorial',
      url: 'https://realpython.com/async-io-python/'
    }
  ];

  const missingSkills = [
    { 
      name: 'PyTorch Neural Networks', 
      priority: 'High', 
      level: '0% (Uncovered)', 
      reason: 'The industry standard framework for modern computer vision, NLP, and foundation models.',
      recommendation: 'Deep Learning Zero-to-Hero by Andrej Karpathy',
      url: 'https://karpathy.ai'
    },
    { 
      name: 'Vector Databases & Embeddings', 
      priority: 'High', 
      level: '10% (Theoretical only)', 
      reason: 'Required for Retrieval-Augmented Generation (RAG) and semantic search.',
      recommendation: 'Pinecone Vector Architecture & Embeddings Guide',
      url: 'https://www.pinecone.io/learn/'
    },
    { 
      name: 'Transformers & LLM Orchestration', 
      priority: 'High', 
      level: '5% (Introductory)', 
      reason: 'Core architecture behind all modern generative AI products.',
      recommendation: 'Hugging Face Official NLP & Transformer Course',
      url: 'https://huggingface.co/learn'
    },
    { 
      name: 'MLOps & CI/CD Model Serving', 
      priority: 'Medium', 
      level: '0% (Uncovered)', 
      reason: 'Translates experimental models into high-availability cloud APIs.',
      recommendation: 'Full Stack Deep Learning Course',
      url: 'https://fullstackdeeplearning.com'
    }
  ];

  // Calculated Match Index
  const totalAnalyzed = existingSkills.length + needsImprovementSkills.length + missingSkills.length;
  const matchIndex = Math.round(((existingSkills.length + (needsImprovementSkills.length * 0.5)) / totalAnalyzed) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <BarChart3 className="w-3.5 h-3.5 text-electric-blue" />
              <span>Target Role: {targetRole}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Skill Gap & Readiness Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time benchmarking of your verified student skills against actual hiring manager requirements for {targetRole} positions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-center shrink-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Skill Match Index
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-electric-blue font-mono mt-1">
              {matchIndex}%
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
              High Placement Potential
            </span>
          </div>
        </div>

        {/* Visual Progress Bars */}
        <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-emerald-400 font-bold">Existing Proficiencies</span>
              <span className="text-white font-mono">{existingSkills.length} Skills</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-amber-400 font-bold">Needs Improvement</span>
              <span className="text-white font-mono">{needsImprovementSkills.length} Skills</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 w-3/5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-rose-400 font-bold">Crucial Missing Skills</span>
              <span className="text-white font-mono">{missingSkills.length} Skills</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-rose-400 w-1/4" />
            </div>
          </div>
        </div>
      </div>

      {/* 3 Columns / Cards of Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Existing Skills */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Proficiencies ({existingSkills.length})</span>
            </h3>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Proficient</span>
          </div>

          <div className="space-y-3">
            {existingSkills.map((sk, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{sk.name}</span>
                  <span className="text-[10px] text-emerald-300 font-mono">{sk.level}</span>
                </div>
                <span className="text-[11px] text-slate-400 block">{sk.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Improvement */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Needs Deepening ({needsImprovementSkills.length})</span>
            </h3>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">In Progress</span>
          </div>

          <div className="space-y-3">
            {needsImprovementSkills.map((sk, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{sk.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300">
                    {sk.priority} Priority
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">{sk.reason}</p>
                <a
                  href={sk.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between pt-1 text-[11px] text-electric-blue hover:text-white font-medium"
                >
                  <span className="truncate pr-2">Learn: {sk.recommendation}</span>
                  <ArrowUpRight className="w-3 h-3 shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>High-Impact Missing ({missingSkills.length})</span>
            </h3>
            <span className="text-[10px] font-semibold text-rose-400 uppercase">Immediate Focus</span>
          </div>

          <div className="space-y-3">
            {missingSkills.map((sk, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{sk.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-300">
                    {sk.priority} Priority
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">{sk.reason}</p>
                <a
                  href={sk.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between pt-1 text-[11px] text-electric-blue hover:text-white font-medium"
                >
                  <span className="truncate pr-2">Resource: {sk.recommendation}</span>
                  <ArrowUpRight className="w-3 h-3 shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
