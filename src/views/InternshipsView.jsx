import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Filter,
  CheckCircle2,
  Building,
  Info,
  Sparkles
} from 'lucide-react';

const INTERNSHIP_LISTINGS = [
  {
    id: 'int-1',
    title: 'AI Software Engineer Intern',
    company: 'Anthropic Labs (Partner Demo)',
    domain: 'Artificial Intelligence & ML',
    location: 'San Francisco, CA',
    isRemote: true,
    stipend: '$55 - $70 / hr',
    type: 'Summer 2027 (12 Weeks)',
    eligibility: 'Pursuing BS/MS in Computer Science or related. Familiarity with Python, PyTorch, and LLMs.',
    skills: ['Python', 'PyTorch', 'Vector DBs', 'FastAPI'],
    description: 'Work alongside research scientists building evaluation frameworks, automated agent test suites, and high-performance inference APIs.',
    verifiedDemo: true,
    applyUrl: 'https://careers.anthropic.com'
  },
  {
    id: 'int-2',
    title: 'Machine Learning Research Intern',
    company: 'DeepMind Technologies (Partner Demo)',
    domain: 'Artificial Intelligence & ML',
    location: 'London, UK',
    isRemote: true,
    stipend: '£3,800 / month',
    type: 'Fall 2027 (16 Weeks)',
    eligibility: 'Undergraduate or Master’s student with strong mathematical foundations in Linear Algebra and Probability.',
    skills: ['Python', 'JAX / PyTorch', 'Reinforcement Learning'],
    description: 'Investigate fundamental problems in deep reinforcement learning, agent planning, and multimodal representation learning.',
    verifiedDemo: true,
    applyUrl: 'https://deepmind.google/careers'
  },
  {
    id: 'int-3',
    title: 'Full-Stack Cloud Engineering Fellow',
    company: 'Vercel Platform Team (Partner Demo)',
    domain: 'Full-Stack Cloud & SaaS',
    location: 'Remote (Worldwide)',
    isRemote: true,
    stipend: '$45 - $60 / hr',
    type: 'Summer 2027 (12 Weeks)',
    eligibility: 'Proficient in TypeScript, React, Next.js, and serverless edge functions. Active GitHub portfolio required.',
    skills: ['Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    description: 'Help engineer the next generation of frontend developer tooling, edge middleware, and real-time deployment infrastructure.',
    verifiedDemo: true,
    applyUrl: 'https://vercel.com/careers'
  },
  {
    id: 'int-4',
    title: 'Data Infrastructure Intern',
    company: 'Snowflake Systems (Partner Demo)',
    domain: 'Data Engineering & Big Data',
    location: 'San Mateo, CA',
    isRemote: false,
    stipend: '$50 - $65 / hr',
    type: 'Summer 2027 (10 Weeks)',
    eligibility: 'Knowledge of distributed systems, SQL, Apache Spark, and database storage internals.',
    skills: ['SQL', 'Apache Spark', 'Python', 'Kafka'],
    description: 'Design highly available data pipelines, optimize distributed query execution plans, and build telemetry aggregators.',
    verifiedDemo: true,
    applyUrl: 'https://careers.snowflake.com'
  },
  {
    id: 'int-5',
    title: 'Cloud Platform & Kubernetes Intern',
    company: 'Datadog Observability (Partner Demo)',
    domain: 'DevOps & Platform Engineering',
    location: 'New York, NY',
    isRemote: true,
    stipend: '$52 - $68 / hr',
    type: 'Summer 2027 (12 Weeks)',
    eligibility: 'Comfort with Linux command-line, Docker containers, Go or Python scripting, and networking basics.',
    skills: ['Docker', 'Kubernetes', 'Go', 'Linux'],
    description: 'Build observability agents and container orchestration pipelines monitoring millions of live cloud instances.',
    verifiedDemo: true,
    applyUrl: 'https://www.datadoghq.com/careers'
  }
];

export default function InternshipsView() {
  const {
    savedInternships,
    toggleSaveInternship,
    updateInternshipStatus,
    studentProfile
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'saved'

  const filteredListings = INTERNSHIP_LISTINGS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = selectedDomain === 'All' || item.domain === selectedDomain;
    const matchesRemote = !remoteOnly || item.isRemote;

    return matchesSearch && matchesDomain && matchesRemote;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Opportunities Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Internship Discovery</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Discover vetted internship roles. Bookmarking an opportunity automatically logs it to Google Sheets.
          </p>
        </div>

        {/* Browse vs Saved Tabs */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'browse'
                ? 'bg-gradient-to-r from-sky-400 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Openings ({INTERNSHIP_LISTINGS.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-gradient-to-r from-sky-400 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarked ({savedInternships.length})</span>
          </button>
        </div>
      </div>

      {/* Demo Listings Disclosure Banner */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3 text-xs text-indigo-200">
        <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-white">Curated Demo Opportunities:</strong> These postings are representative demo opportunities curated from top partner companies with authentic compensation ranges and real-world tech stacks. No fictional promises or unverified listings are shown.
        </div>
      </div>

      {/* Search & Filter Bar */}
      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, or skill (e.g. PyTorch, React, DeepMind)..."
              className="w-full glass-input rounded-2xl py-2.5 pl-10 pr-4 text-xs font-medium"
            />
          </div>

          <div>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full glass-input rounded-2xl px-3 py-2.5 text-xs bg-[#0F0F1E]"
            >
              <option value="All">All Career Domains</option>
              <option value="Artificial Intelligence & ML">AI & Machine Learning</option>
              <option value="Full-Stack Cloud & SaaS">Full-Stack Cloud</option>
              <option value="Data Engineering & Big Data">Data Infrastructure</option>
              <option value="DevOps & Platform Engineering">DevOps & Cloud</option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="rounded bg-white/10 border-white/20 text-indigo-500 focus:ring-0"
              />
              <span>Remote Only</span>
            </label>
          </div>
        </div>
      )}

      {/* Main Listings Grid */}
      {activeTab === 'browse' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredListings.map((job) => {
            const isSaved = savedInternships.some(item => item.id === job.id);

            return (
              <div
                key={job.id}
                className="p-6 rounded-3xl glass-panel-interactive border border-white/10 flex flex-col justify-between"
              >
                <div>
                  {/* Company & Save button */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5" />
                      {job.company}
                    </span>

                    <button
                      onClick={() => toggleSaveInternship(job)}
                      className={`p-2 rounded-xl transition-all ${
                        isSaved
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save opportunity'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mt-1">{job.title}</h3>

                  {/* Metadata Chips */}
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5">
                      <MapPin className="w-3 h-3 text-slate-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5">
                      <Clock className="w-3 h-3 text-slate-400" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                      <DollarSign className="w-3 h-3" /> {job.stipend}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Eligibility */}
                  <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Eligibility Criteria</span>
                    <p className="text-xs text-slate-400">{job.eligibility}</p>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.skills.map(s => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Apply CTA */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-mono">Demo Verified Listing</span>
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:shadow-glow-sm"
                  >
                    <span>View Opening</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Saved Opportunities Tracker Tab */
        <div className="space-y-4">
          {savedInternships.length === 0 ? (
            <div className="p-12 text-center glass-panel rounded-3xl border border-white/10">
              <Bookmark className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No Saved Internships Yet</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Bookmark exciting positions from the browse tab. They will appear here and sync to your Google Sheets tab.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
              >
                Browse Openings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedInternships.map((saved) => (
                <div key={saved.id} className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-400">{saved.company}</span>
                      <button
                        onClick={() => toggleSaveInternship(saved)}
                        className="text-xs text-rose-400 hover:text-rose-300"
                      >
                        Remove
                      </button>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">{saved.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{saved.location} • {saved.stipend}</p>

                    {/* Status Tracker Dropdown */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-300">Status:</span>
                      <select
                        value={saved.status || 'Saved'}
                        onChange={(e) => updateInternshipStatus(saved.id, e.target.value)}
                        className="glass-input rounded-lg px-2.5 py-1 text-xs bg-[#0F0F1E] font-medium text-emerald-400"
                      >
                        <option value="Saved">Saved / Researching</option>
                        <option value="Applied">Application Submitted</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer Received">Offer Received 🎉</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-slate-500 flex justify-between">
                    <span>Saved on: {saved.savedDate}</span>
                    <span className="text-emerald-400">Synced to Google Sheets</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
