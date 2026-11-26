import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Brain,
  Target,
  Clock,
  CheckCircle2,
  BookOpen,
  Briefcase
} from 'lucide-react';

const SKILL_OPTIONS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js',
  'PyTorch', 'TensorFlow', 'SQL', 'Docker', 'AWS',
  'Git', 'FastAPI', 'HTML/CSS', 'Data Structures', 'Kubernetes'
];

const INTEREST_OPTIONS = [
  'Artificial Intelligence & ML',
  'Full-Stack Web Development',
  'Autonomous Agents & LLMs',
  'Cloud Infrastructure & DevOps',
  'Cybersecurity & Ethical Hacking',
  'Data Science & Analytics',
  'Mobile App Engineering'
];

const DOMAIN_OPTIONS = [
  'Artificial Intelligence & Machine Learning',
  'Full-Stack Cloud & SaaS',
  'Data Engineering & Big Data',
  'DevOps & Platform Engineering',
  'Cybersecurity & Systems',
  'Technical Product Management'
];

export default function OnboardingModal() {
  const {
    isOnboardingOpen,
    setIsOnboardingOpen,
    studentProfile,
    setStudentProfile,
    runCareerAssessment,
    generateRoadmap,
    setActiveTab,
    showToast
  } = useApp();

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    fullName: studentProfile.fullName || '',
    email: studentProfile.email || '',
    educationLevel: studentProfile.educationLevel || 'Bachelor of Science (Undergraduate)',
    course: studentProfile.course || 'Computer Science & AI',
    academicYear: studentProfile.academicYear || '3rd Year (Junior)',
    interests: studentProfile.interests || ['Artificial Intelligence & ML', 'Full-Stack Web Development'],
    skills: studentProfile.skills || ['Python', 'JavaScript', 'React'],
    preferredDomain: studentProfile.preferredDomain || 'Artificial Intelligence & Machine Learning',
    careerGoals: studentProfile.careerGoals || 'Secure an impactful software or AI engineering internship and build scalable products.',
    weeklyAvailability: studentProfile.weeklyAvailability || '15',
    customSkillInput: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOnboardingOpen) return null;

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
      };
    });
  };

  const toggleSkill = (skill) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skill);
      return {
        ...prev,
        skills: exists ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill]
      };
    });
  };

  const handleAddCustomSkill = (e) => {
    if (e.key === 'Enter' && formData.customSkillInput.trim()) {
      e.preventDefault();
      const newSkill = formData.customSkillInput.trim();
      if (!formData.skills.includes(newSkill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill],
          customSkillInput: ''
        }));
      }
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        educationLevel: formData.educationLevel,
        course: formData.course,
        academicYear: formData.academicYear,
        interests: formData.interests,
        skills: formData.skills,
        preferredDomain: formData.preferredDomain,
        careerGoals: formData.careerGoals,
        weeklyAvailability: formData.weeklyAvailability,
        consentToStore: true
      };

      setStudentProfile(payload);
      showToast('Profile Updated', 'Analyzing competencies and generating career recommendations...', 'info');

      // Run Career Assessment with Gemini API & trigger Zapier Sheets event
      const recommendations = await runCareerAssessment(payload);
      
      if (recommendations && recommendations.length > 0) {
        const topMatch = recommendations[0].title;
        await generateRoadmap(topMatch);
      }

      setIsOnboardingOpen(false);
      setActiveTab('discovery');
    } catch (err) {
      showToast('Error', err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Ambient background glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-indigo-500/20 text-sky-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight">Personalized Career Onboarding</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Step {step} of {totalSteps}: Setup your learning trajectory</p>
          </div>
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full my-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 py-2">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <p className="text-xs text-indigo-200">
                  Tell us about your background so CareerPilot can tailor technical depth and prerequisites accurately.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                    placeholder="e.g. Alex Chen"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                    placeholder="alex@university.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Education Level</label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs bg-[#0F0F1E]"
                  >
                    <option>Undergraduate (Bachelor's)</option>
                    <option>Postgraduate (Master's)</option>
                    <option>Doctorate (PhD)</option>
                    <option>Bootcamp Graduate</option>
                    <option>Self-Taught Developer</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Course / Major</label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                    placeholder="Computer Science, IT, Data..."
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Academic Year</label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs bg-[#0F0F1E]"
                  >
                    <option>1st Year (Freshman)</option>
                    <option>2nd Year (Sophomore)</option>
                    <option>3rd Year (Junior)</option>
                    <option>4th Year (Senior)</option>
                    <option>Recent Graduate</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <p className="text-xs text-purple-200">
                  Select your current skills and what you're passionate about. CareerPilot will compute exact skill gaps.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Current Skills (Click to toggle)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {SKILL_OPTIONS.map((skill) => {
                    const isSelected = formData.skills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-glow-sm'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {skill}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={formData.customSkillInput}
                  onChange={(e) => setFormData({ ...formData, customSkillInput: e.target.value })}
                  onKeyDown={handleAddCustomSkill}
                  placeholder="Type other skill and press Enter..."
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Fields of Interest</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTEREST_OPTIONS.map((interest) => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-purple-900/40 text-white border-purple-400 shadow-glow-sm'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <span>{interest}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/20 flex items-center gap-3">
                <Target className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <p className="text-xs text-sky-200">
                  Define your goals and study availability to calibrate your personalized roadmap milestones.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Career Domain</label>
                <select
                  value={formData.preferredDomain}
                  onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs bg-[#0F0F1E]"
                >
                  {DOMAIN_OPTIONS.map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Specific Career Goals / Aspirations</label>
                <textarea
                  rows={2}
                  value={formData.careerGoals}
                  onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
                  className="w-full glass-input rounded-xl p-3 text-xs"
                  placeholder="e.g. Become a full-stack AI engineer building agentic systems; land an internship in summer 2027..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Weekly Learning Commitment</span>
                  </label>
                  <span className="text-xs font-bold text-sky-400">{formData.weeklyAvailability} Hours / Week</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="5"
                  value={formData.weeklyAvailability}
                  onChange={(e) => setFormData({ ...formData, weeklyAvailability: e.target.value })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>5 hrs (Casual)</span>
                  <span>15 hrs (Recommended)</span>
                  <span>35 hrs (Intensive)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          {step < totalSteps ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-glow-sm hover:shadow-glow-md"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 text-white shadow-glow-md hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing AI Paths...</span>
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-sky-200" />
                  <span>Generate Career Assessment</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
