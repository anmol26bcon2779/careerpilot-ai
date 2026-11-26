import React, { useState } from 'react';
import { 
  Check, ArrowRight, ArrowLeft, Sparkles, GraduationCap, 
  Code, Target, Clock, ShieldCheck, Database, Compass 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CAREER_DOMAINS } from '../../data/mockData';

export function OnboardingWizard({ initialData = {}, onComplete, onCancel }) {
  const { register } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    password: initialData.password || '',
    education: 'Bachelor of Technology (B.Tech)',
    course: 'Computer Science & Engineering',
    year: '3rd Year',
    interests: ['Artificial Intelligence', 'Full-Stack Development'],
    skills: ['Python', 'JavaScript', 'Git', 'SQL'],
    preferredDomain: 'AI & Machine Learning',
    goals: 'Secure Summer 2027 Tech Internship and build production-grade portfolio applications',
    weeklyHours: 15,
    consentToSync: true
  });

  const availableInterests = [
    'Artificial Intelligence', 'Machine Learning', 'Full-Stack Development',
    'Cloud Architecture', 'Cybersecurity', 'Data Engineering', 'DevOps & CI/CD',
    'Distributed Systems', 'Mobile App Development', 'Product Design'
  ];

  const availableSkills = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js',
    'PyTorch', 'SQL', 'Git & GitHub', 'Docker Basics', 'HTML/Tailwind',
    'Java', 'C++', 'Data Structures', 'Linux Basics', 'AWS Fundamentals'
  ];

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.course) {
        setError('Please complete all academic details.');
        return;
      }
    }
    if (step === 2) {
      if (formData.skills.length === 0) {
        setError('Please select at least 1 current skill.');
        return;
      }
    }
    setError('');
    setStep(s => s + 1);
  };

  const handleFinish = async () => {
    setLoading(true);
    setError('');
    try {
      await register(formData, formData.password || 'CareerPilot2026!');
      if (onComplete) onComplete();
    } catch (err) {
      setError(err.message || 'Onboarding failed.');
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = 4;
  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0F0F22] p-6 sm:p-10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-transparent blur-3xl pointer-events-none" />

        {/* Progress Bar & Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-electric-blue">
              <Compass className="w-4 h-4" />
              <span>Career Setup Wizard • Step {step} of {totalSteps}</span>
            </span>
            <span className="font-mono">{progressPercent}% Completed</span>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-electric-blue transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* STEP 1: Academic & Education */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Your Academic Foundation</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Tell us about your degree and graduation timeline so our AI can calibrate internship eligibility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Chen"
                  className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Academic Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@university.edu"
                  className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Education Level</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Bachelor of Technology (B.Tech)">Bachelor of Technology (B.Tech)</option>
                  <option value="Bachelor of Science (B.S.)">Bachelor of Science (B.S.)</option>
                  <option value="Master of Science (M.S.)">Master of Science (M.S.)</option>
                  <option value="PhD Candidate">PhD Candidate</option>
                  <option value="Self-Taught / Bootcamp">Self-Taught / Bootcamp</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course / Major</label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g. Computer Science"
                  className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Current Academic Year</label>
                <div className="grid grid-cols-4 gap-2">
                  {['1st Year', '2nd Year', '3rd Year', 'Final Year'].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setFormData({ ...formData, year: yr })}
                      className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                        formData.year === yr
                          ? 'bg-indigo-600 text-white shadow-glow-sm'
                          : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Interests & Current Skills */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Skills & Intellectual Curiosity</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select the programming languages you've touched and the topics you enjoy exploring.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Current Technical Skills (Select all you know):
              </label>
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                {availableSkills.map((sk) => {
                  const active = formData.skills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                        active
                          ? 'bg-indigo-600 text-white shadow-glow-sm border border-indigo-400/40'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{sk}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Core Interests (Select 2 or more):
              </label>
              <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                {availableInterests.map((intr) => {
                  const active = formData.interests.includes(intr);
                  return (
                    <button
                      key={intr}
                      type="button"
                      onClick={() => toggleInterest(intr)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                        active
                          ? 'bg-purple-600 text-white shadow-glow-sm border border-purple-400/40'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {active && <Check className="w-3 h-3" />}
                      <span>{intr}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Preferred Domain & Availability */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Target Career & Learning Bandwidth</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Choose your primary domain and how many weekly hours you can dedicate to execution.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Preferred Career Domain:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAREER_DOMAINS.map((domain) => {
                  const active = formData.preferredDomain === domain.title;
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredDomain: domain.title })}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        active
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-glow-sm'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <div className="font-semibold text-xs text-white">{domain.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{domain.avgSalary} • {domain.demand}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Weekly Study Availability: <span className="text-electric-blue font-bold font-mono">{formData.weeklyHours} hrs/week</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={formData.weeklyHours}
                  onChange={(e) => setFormData({ ...formData, weeklyHours: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>5 hrs (Casual)</span>
                  <span>15 hrs (Recommended)</span>
                  <span>40 hrs (Full-time)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Career Goal</label>
                <input
                  type="text"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="e.g. Land Summer AI Internship"
                  className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Privacy, Consent & Google Sheets Sync */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Data Consent & Storage Setup</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Confirm your student record and choose whether to sync milestones with Google Sheets via Zapier.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/5">
                <span className="text-slate-400">Student Name:</span>
                <span className="font-semibold text-white">{formData.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/5">
                <span className="text-slate-400">Target Domain:</span>
                <span className="font-semibold text-indigo-400">{formData.preferredDomain}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-white/5">
                <span className="text-slate-400">Selected Skills:</span>
                <span className="font-semibold text-slate-300">{formData.skills.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Weekly Commitment:</span>
                <span className="font-mono text-emerald-400">{formData.weeklyHours} hours/week</span>
              </div>
            </div>

            {/* Google Sheets Sync Consent Toggle */}
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.consentToSync}
                  onChange={(e) => setFormData({ ...formData, consentToSync: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-white/20 bg-[#090915]"
                />
                <div className="text-xs">
                  <span className="font-bold text-white block">
                    Sync Activity to Google Sheets via Zapier Webhooks
                  </span>
                  <span className="text-slate-400 block mt-0.5 leading-relaxed">
                    By checking this, you authorize CareerPilot AI to stream your registration record, generated roadmaps, and completed milestones to your connected Google Sheet. You can revoke this anytime in Settings.
                  </span>
                </div>
              </label>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>We never sell student data. Password hashes are never written to external spreadsheets.</span>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow-sm transition-all"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-glow-md transition-all"
            >
              <span>{loading ? 'Creating Profile & Syncing...' : 'Launch CareerPilot Dashboard'}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
