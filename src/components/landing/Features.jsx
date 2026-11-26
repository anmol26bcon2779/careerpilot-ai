import React from 'react';
import { 
  Compass, Brain, Target, MessageSquare, BarChart3, 
  Briefcase, FileText, Mic, Sheet, Zap, Shield, CheckCircle2 
} from 'lucide-react';

export function Features({ onNavigate }) {
  const features = [
    {
      icon: Brain,
      title: 'AI Career Assessment Engine',
      description: 'Powered by Google Gemini API. Analyzes your academic level, coding skills, and interests to generate 5 tailored career paths with compensation, growth rate, and required tech stacks.',
      color: 'text-indigo-400',
      border: 'hover:border-indigo-500/40'
    },
    {
      icon: Target,
      title: 'Personalized 8-Stage Roadmaps',
      description: 'Step-by-step milestones spanning fundamentals to internship prep. Complete with duration estimates, curated learning links, practical code tasks, and project deliverables.',
      color: 'text-purple-400',
      border: 'hover:border-purple-500/40'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Progress Engine',
      description: 'Calculates development progress strictly using actual verified tasks. Zero arbitrary or fake percentage numbers, keeping your engineering journey authentic.',
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/40'
    },
    {
      icon: MessageSquare,
      title: 'Context-Aware AI Mentor',
      description: 'Interactive chat mentor using Google Gemini. Injects your full student profile and target milestones to give precise, actionable advice on what to learn or build next.',
      color: 'text-electric-blue',
      border: 'hover:border-cyan-500/40'
    },
    {
      icon: BarChart3,
      title: 'Skill Gap Matrix',
      description: 'Directly contrasts your existing skills against industry requirements. Categorizes proficiencies into Verified, Needs Improvement, and Missing with priority recommendations.',
      color: 'text-amber-400',
      border: 'hover:border-amber-500/40'
    },
    {
      icon: Briefcase,
      title: 'Internship Discovery & Tracker',
      description: 'Explore vetted, clearly labelled opportunities across AI, full-stack, cloud, and security. Filter by domain and remote preference, save opportunities, and monitor application states.',
      color: 'text-pink-400',
      border: 'hover:border-pink-500/40'
    },
    {
      icon: FileText,
      title: 'ATS Resume Builder & PDF Export',
      description: 'Build a recruiter-ready technical resume with Gemini-generated professional summaries and quantified impact bullets. Live real-time preview and instant PDF export.',
      color: 'text-indigo-400',
      border: 'hover:border-indigo-500/40'
    },
    {
      icon: Mic,
      title: 'AI Mock Interview Coach',
      description: 'Rehearse technical and behavioral interview questions. Gemini AI evaluates your responses, provides a 1-10 readiness score, highlights strengths, and writes exemplar answers.',
      color: 'text-purple-400',
      border: 'hover:border-purple-500/40'
    },
    {
      icon: Sheet,
      title: 'Google Sheets via Zapier Sync',
      description: 'No costly backend databases needed. Emits structured application events to Zapier Webhooks, automatically logging student records across 8 dedicated Google Sheets tabs.',
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/40'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Comprehensive Career Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for Modern Engineers. <br className="hidden sm:block" />
            <span className="gradient-text-electric">Powered by Real Intelligence.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Every module in CareerPilot AI is purpose-built to guide students from foundational uncertainty to confident, offer-ready candidates.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`glass-panel p-6 sm:p-7 rounded-2xl border border-white/5 ${feature.border} transition-all duration-300 group flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${feature.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Included in Free Tier</span>
                  </span>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="text-indigo-400 hover:text-white transition-colors"
                  >
                    Try Feature →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
