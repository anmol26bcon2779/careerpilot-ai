import React from 'react';
import { PRICING_TIERS } from '../../data/mockData';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Pricing({ onNavigate }) {
  const { user, setAuthModalOpen, setAuthModalTab } = useAuth();

  const handleCta = (tierName) => {
    if (user) {
      onNavigate('dashboard');
    } else {
      setAuthModalTab('register');
      setAuthModalOpen(true);
    }
  };

  return (
    <section id="pricing" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Fair & Transparent Access
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Plans for Every Stage of Your Career
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Start completely free with zero credit card required. Upgrade as you prepare for competitive interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`glass-panel rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'border-indigo-500/60 shadow-glow-md bg-[#13132B]/90 lg:-translate-y-2'
                  : 'border-white/5 hover:border-white/10'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-glow-sm">
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-xs text-slate-400 mb-6">{tier.tagline}</p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/5">
                  <span className="text-4xl font-extrabold text-white font-mono">{tier.price}</span>
                  <span className="text-xs text-slate-400">/ {tier.frequency}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    What's included:
                  </span>
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleCta(tier.name)}
                  className={`w-full py-3 rounded-xl font-semibold text-xs tracking-wide transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-glow-sm hover:shadow-glow-md'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
