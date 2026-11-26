import React from 'react';
import { UserCheck, Sparkles, Target, Rocket, ArrowRight } from 'lucide-react';

export function HowItWorks({ onNavigate }) {
  const steps = [
    {
      step: '01',
      title: 'Build Your Profile & Set Goals',
      description: 'Complete a brief 2-minute onboarding detailing your degree, current programming languages, weekly study availability, and dream career domains.',
      icon: UserCheck,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      step: '02',
      title: 'Gemini AI Assessment & Match',
      description: 'Our Google Gemini engine evaluates your background against live industry requirements, returning 5 high-alignment career options with growth forecasts.',
      icon: Sparkles,
      color: 'from-indigo-600 to-purple-600'
    },
    {
      step: '03',
      title: 'Execute Your 8-Stage Roadmap',
      description: 'Work through curated milestones, practical coding tasks, and real portfolio projects. Check off milestones with verified progress calculations.',
      icon: Target,
      color: 'from-purple-600 to-pink-600'
    },
    {
      step: '04',
      title: 'Interview & Land Opportunities',
      description: 'Generate an ATS-optimized PDF resume, simulate technical interviews with AI grading, and track vetted internship applications synced to Google Sheets.',
      icon: Rocket,
      color: 'from-pink-600 to-cyan-500'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#090914] relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Methodical Execution
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How CareerPilot AI Works
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            From Day 1 ambiguity to interview-ready technical confidence in four guided phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="glass-panel p-6 rounded-2xl border border-white/5 relative flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} p-[1.5px] shadow-glow-sm`}>
                      <div className="w-full h-full bg-[#090914] rounded-[10px] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="text-2xl font-black font-mono text-white/20 group-hover:text-white/40 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Phase {index + 1}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-semibold text-xs tracking-wide transition-all"
          >
            <span>Launch Roadmap Interactive Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
