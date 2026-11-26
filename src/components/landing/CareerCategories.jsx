import React from 'react';
import { CAREER_DOMAINS } from '../../data/mockData';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export function CareerCategories({ onNavigate }) {
  return (
    <section id="domains" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold text-electric-blue uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              High-Velocity Sectors
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Explore High-Growth Career Paths
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-slate-400 text-sm max-w-md">
            Market compensation, projected hiring trajectory, and requisite stacks benchmarked across top tech employers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_DOMAINS.map((domain) => (
            <div
              key={domain.id}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    <span>{domain.demand}</span>
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    {domain.avgSalary}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-electric-blue transition-colors mb-2">
                  {domain.title}
                </h3>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {domain.description}
                </p>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Core Technical Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.topSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-white transition-colors"
                >
                  <span>Build {domain.title} Roadmap</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
