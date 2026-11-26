import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Compass,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Bot,
  MapPin,
  Target,
  FileText,
  Mic,
  ChevronDown,
  ChevronUp,
  Star,
  Shield,
  Layers,
  GraduationCap,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

export default function LandingPage({ onEnterApp }) {
  const { setIsAuthModalOpen, setAuthMode, setIsOnboardingOpen, setActiveTab } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does CareerPilot AI personalize my roadmap?',
      a: 'CareerPilot AI queries the Google Gemini API using your exact academic standing, current skills, weekly hours, and target career. It generates structured milestones with recommended documentation, practical coding challenges, and capstone projects rather than static generic checklists.'
    },
    {
      q: 'How does the Google Sheets integration work?',
      a: 'We connect CareerPilot events (Registration, Career Assessment, Roadmaps, Milestones Completed, and Saved Internships) directly to your Google Sheets spreadsheet via Zapier Webhooks. Every milestone you complete is automatically logged with exact timestamps and true progress math.'
    },
    {
      q: 'Is my student data secure?',
      a: 'Yes. CareerPilot never exposes API keys in frontend code. Passwords in demo mode are cryptographically salted and hashed. Sensitive credentials and plaintext passwords are never forwarded to Google Sheets or browser storage.'
    },
    {
      q: 'Are the internship listings live or mock data?',
      a: 'We display realistic, verified demo listings curated from leading AI and software partners with authentic compensation rates and prerequisites, clearly labelled so students know exactly what is demo data.'
    },
    {
      q: 'Can I export my resume and digital twin report?',
      a: 'Yes! The Resume Builder features instant AI-generated professional summaries and one-click clean PDF export. You can also view and export your live Career Digital Twin progress report at any time.'
    }
  ];

  const careerCategories = [
    {
      title: 'AI & Machine Learning',
      count: '340+ Internships',
      growth: '+42% YoY',
      icon: Sparkles,
      skills: ['PyTorch', 'LLMs', 'Vector Search', 'Python']
    },
    {
      title: 'Full-Stack & Cloud SaaS',
      count: '580+ Internships',
      growth: '+28% YoY',
      icon: Layers,
      skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL']
    },
    {
      title: 'Data Infrastructure',
      count: '210+ Internships',
      growth: '+31% YoY',
      icon: TrendingUp,
      skills: ['Spark', 'Kafka', 'SQL', 'Snowflake']
    },
    {
      title: 'DevOps & Platform Engineering',
      count: '190+ Internships',
      growth: '+35% YoY',
      icon: Zap,
      skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS']
    }
  ];

  const testimonials = [
    {
      name: 'Maya Patel (Sample Student)',
      role: 'Incoming AI Research Intern',
      school: 'Stanford University (Demo Story)',
      quote: 'CareerPilot mapped my transition from beginner Python to deploying RAG applications in 16 weeks. The milestone tracking kept me disciplined.',
      rating: 5
    },
    {
      name: 'Liam Vance (Sample Student)',
      role: 'Cloud Engineering Intern',
      school: 'Carnegie Mellon (Demo Story)',
      quote: 'The Skill Gap Analysis showed me I needed Docker and Kubernetes before applying. I closed the gap in 3 weeks and received two offers!',
      rating: 5
    },
    {
      name: 'Sophia Chen (Sample Student)',
      role: 'Full-Stack Software Fellow',
      school: 'UC Berkeley (Demo Story)',
      quote: 'The AI Mentor answered my late-night architecture questions with real code examples. Having all my milestones synced to Google Sheets was a game changer.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B14] text-slate-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Discover Your Potential. Design Your Future.</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Your Future Deserves a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
              Better Roadmap.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover career opportunities, identify your skill gaps and build a personalised roadmap with your AI career mentor.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onEnterApp();
                setIsOnboardingOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 hover:from-sky-500 hover:to-purple-700 text-white font-bold text-sm tracking-wide shadow-glow-md hover:shadow-glow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm transition-all duration-200 border border-white/10 flex items-center justify-center gap-2"
            >
              <span>Explore Features</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Powered by Gemini API
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sky-400" /> Google Sheets & Zapier Sync
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-purple-400" /> 100% Free for Students
            </span>
          </div>

          {/* Product Preview Card */}
          <div className="mt-16 max-w-5xl mx-auto rounded-3xl p-2 sm:p-3 glass-panel border border-white/15 shadow-2xl relative group">
            <div className="rounded-2xl bg-[#0F0F1E] border border-white/10 p-4 sm:p-6 text-left overflow-hidden">
              {/* Preview Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">careerpilot.ai/app/dashboard</span>
                </div>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Live AI Engine Active
                </span>
              </div>

              {/* Grid Preview Snippet */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-wider">Target Career</span>
                  <h4 className="text-base font-bold text-white mt-1">AI & Machine Learning Engineer</h4>
                  <p className="text-xs text-slate-400 mt-2">Next Milestone: Transformer Architectures & RAG</p>
                  <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-indigo-500 h-1.5 rounded-full w-[65%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] text-sky-400 uppercase font-bold tracking-wider">Skill Gap Radar</span>
                  <div className="mt-2 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Python & PyTorch</span>
                      <span className="text-emerald-400 font-semibold">95% (Strong)</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Vector DBs & RAG</span>
                      <span className="text-amber-400 font-semibold">45% (In Progress)</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Docker & FastAPI</span>
                      <span className="text-sky-400 font-semibold">70% (Ready)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">AI Mentor Prompt</span>
                    <p className="text-xs text-slate-200 mt-1 italic">
                      "I just mastered PyTorch CNNs. Should I learn Docker or LangChain next for AI engineering internships?"
                    </p>
                  </div>
                  <button
                    onClick={onEnterApp}
                    className="mt-3 py-1.5 px-3 rounded-lg bg-indigo-600/40 border border-indigo-500/50 text-indigo-200 text-xs font-semibold hover:bg-indigo-600/60 transition-colors text-center"
                  >
                    Launch Interactive AI Mentor →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-white/[0.08] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">Core Platform Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Everything You Need to Engineer Your Dream Tech Career
            </h3>
            <p className="text-slate-400 text-sm mt-3">
              Built specifically for modern students and aspiring engineers, powered by Gemini AI and connected to Google Sheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Dynamic AI Career Discovery</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Evaluates your unique interests and skills with Google Gemini API to recommend 5 deeply tailored career paths with match scores and salary bands.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Personalized Learning Roadmaps</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Step-by-step milestones with vetted documentation, curated video courses, and hands-on portfolio projects for every single stage.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Context-Aware AI Mentor</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Chat anytime with an AI mentor that retains context on your chosen career, active milestones, and educational background.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Skill Gap Analysis Engine</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Visual comparisons contrasting what you already know against what hiring managers expect, ranked by priority level.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">AI Resume Builder & PDF Export</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Generates ATS-optimized professional summaries in one click and exports beautiful, recruiter-ready resumes directly to PDF.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel-interactive">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Mock Interview Coach</h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Practice technical algorithms, system design, and behavioral STAR questions with real-time AI scoring and improvement tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (4 Steps) */}
      <section className="py-20 bg-surface-100/40 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Simple 4-Step Process</h2>
            <h3 className="text-3xl font-extrabold text-white">How CareerPilot Guides Your Journey</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl glass-panel border border-white/10 relative">
              <div className="text-3xl font-extrabold text-indigo-400/40 mb-3">01</div>
              <h4 className="text-sm font-bold text-white">Take Quick Assessment</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Share your education level, current skills, and weekly study availability.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 relative">
              <div className="text-3xl font-extrabold text-sky-400/40 mb-3">02</div>
              <h4 className="text-sm font-bold text-white">Explore AI Pathways</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Review 5 dynamically matched career paths with projected compensation and demand.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 relative">
              <div className="text-3xl font-extrabold text-purple-400/40 mb-3">03</div>
              <h4 className="text-sm font-bold text-white">Conquer Milestones</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Follow your step-by-step roadmap and auto-sync completed achievements to Google Sheets.
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 relative">
              <div className="text-3xl font-extrabold text-emerald-400/40 mb-3">04</div>
              <h4 className="text-sm font-bold text-white">Land Your Internship</h4>
              <p className="text-xs text-slate-400 mt-1.5">
                Export ATS resumes, practice mock interviews, and discover vetted partner internships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Categories */}
      <section className="py-20 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">High Growth Sectors</h2>
              <h3 className="text-3xl font-extrabold text-white">Explore In-Demand Career Categories</h3>
            </div>
            <button
              onClick={onEnterApp}
              className="mt-4 md:mt-0 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
            >
              <span>View All Supported Careers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerCategories.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl glass-panel-interactive">
                  <div className="flex items-center justify-between mb-3">
                    <span className="p-2 rounded-xl bg-white/5 text-sky-400"><Icon className="w-5 h-5" /></span>
                    <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">{c.growth}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{c.count}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials (Sample Content Clearly Labelled) */}
      <section className="py-20 bg-surface-100/40 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <span>Sample Student Feedback</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white">Empowering Tomorrow's Tech Leaders</h3>
            <p className="text-xs text-slate-400 mt-2">
              Representative student reviews demonstrating learning milestones and platform impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">"{t.quote}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-sky-400">{t.role}</p>
                  <p className="text-[10px] text-slate-500">{t.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-sky-400 mb-2">Transparent Plans</h2>
            <h3 className="text-3xl font-extrabold text-white">100% Free Architecture for All Students</h3>
            <p className="text-slate-400 text-xs mt-2">
              CareerPilot uses zero paid backend infrastructure. All student features are completely accessible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-3xl glass-panel border border-white/15 relative">
              <h4 className="text-lg font-bold text-white">Student Free Tier</h4>
              <p className="text-xs text-slate-400 mt-1">Full access to AI roadmaps, mentoring and Google Sheets sync.</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-400 ml-2">forever free</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full AI Career Assessment (5 Paths)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Personalized Learning Roadmaps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Mentor powered by Gemini</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Google Sheets integration via Zapier</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Resume Builder & PDF Export</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mock Interview Coach</li>
              </ul>
              <button
                onClick={onEnterApp}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
              >
                Launch Free Dashboard
              </button>
            </div>

            {/* Pro Accelerator Demo */}
            <div className="p-8 rounded-3xl glass-panel border border-indigo-500/40 relative shadow-glow-md">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider">
                Accelerator Edition
              </div>
              <h4 className="text-lg font-bold text-white">Campus Enterprise & Honors</h4>
              <p className="text-xs text-slate-400 mt-1">For universities and student cohort management.</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-extrabold text-white">Free</span>
                <span className="text-xs text-slate-400 ml-2">(Open source architecture)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400" /> Everything in Student Free</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400" /> Multi-tab Google Sheet data sync</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400" /> Automated webhook retry & HMAC signing</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400" /> Custom milestone authoring</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400" /> Self-hostable on Vercel with zero DB costs</li>
              </ul>
              <button
                onClick={onEnterApp}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-surface-100/40 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Got Questions?</h2>
            <h3 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-xs font-bold text-white hover:text-indigo-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900/80 border border-indigo-500/30 shadow-glow-lg">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Your Dream Career is Waiting. Take the First Step Today.
            </h3>
            <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Join students engineering their tech careers with AI-powered roadmaps, live milestone tracking, and Google Sheets integration.
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  onEnterApp();
                  setIsOnboardingOpen(true);
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 hover:from-sky-500 hover:to-purple-700 text-white font-bold text-sm tracking-wide shadow-glow-md hover:scale-105 transition-all"
              >
                Launch CareerPilot AI Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.08] bg-[#0A0A12] text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-sky-400">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight">CAREERPILOT.AI</span>
              <p className="text-[10px] text-slate-500">Your Career. Your Potential. Your AI Mentor.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px]">
            <button onClick={onEnterApp} className="hover:text-white transition-colors">Dashboard</button>
            <button onClick={onEnterApp} className="hover:text-white transition-colors">Roadmaps</button>
            <button onClick={onEnterApp} className="hover:text-white transition-colors">AI Mentor</button>
            <button onClick={onEnterApp} className="hover:text-white transition-colors">Internships</button>
            <button onClick={onEnterApp} className="hover:text-white transition-colors">Integrations</button>
          </div>

          <p className="text-[10px] text-slate-500">
            © 2026 CareerPilot AI. Built with React, Tailwind CSS, Gemini API & Google Sheets.
          </p>
        </div>
      </footer>
    </div>
  );
}
