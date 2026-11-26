import React from 'react';
import { Compass, Sparkles, Github, Shield, Heart, ExternalLink, Zap } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-[#080811] border-t border-white/5 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-electric-blue p-[1.5px] shadow-glow-sm">
                <div className="w-full h-full bg-[#080811] rounded-[10px] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                CAREERPILOT<span className="text-electric-blue">AI</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your Career. Your Potential. Your AI Mentor. Discover high-growth career opportunities, identify real-time skill gaps, and build dynamic execution roadmaps.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Powered by Gemini API & Zapier to Google Sheets</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  AI Career Discovery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Learning Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  Skill Gap Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  AI Mock Interview Coach
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  ATS Resume Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Architecture & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Architecture</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Google Sheets Storage</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <span>Zapier Webhooks Sync</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                <span>Google Gemini API</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>Vercel Serverless Functions</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <span>Zero Paid Backend DBs</span>
              </li>
            </ul>
          </div>

          {/* Transparency & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Transparency</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Strict privacy architecture. No plaintext passwords are ever recorded. Demo prototype mode active with client-side SHA-256 session integrity.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block">
                Sample testimonials and demo internships clearly indicated.
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CareerPilot AI. Discover Your Potential. Design Your Future.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Built for high-ambition engineers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
