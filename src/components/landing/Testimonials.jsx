import React from 'react';
import { SAMPLE_TESTIMONIALS } from '../../data/mockData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#090915] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Clearly Labelled Sample Content</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Loved by Ambitious Students
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            See how aspiring software engineers use CareerPilot AI to identify gaps, stay disciplined, and land competitive internships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/5 flex flex-col justify-between relative group hover:border-indigo-500/30 transition-all"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-[10px] text-slate-400 ml-2 uppercase font-semibold">
                    (Sample Review)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </h4>
                  <p className="text-xs text-indigo-400 font-medium">
                    {t.role} • {t.company}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {t.university}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
          * Note: In accordance with production SaaS transparency standards, testimonials shown above represent sample persona experiences illustrative of intended student outcomes.
        </div>

      </div>
    </section>
  );
}
