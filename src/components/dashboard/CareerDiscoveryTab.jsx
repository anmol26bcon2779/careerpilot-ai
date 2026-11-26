import React, { useState } from 'react';
import { 
  Sparkles, Compass, CheckCircle2, ArrowRight, TrendingUp, 
  DollarSign, Briefcase, ChevronRight, Layers, Bookmark, AlertCircle, RefreshCw 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';

export function CareerDiscoveryTab({ onSelectTab }) {
  const { user } = useAuth();
  const { assessmentResult, runAssessment, saveSelectedCareer } = useCareer();

  const [loading, setLoading] = useState(false);
  const [comparingIds, setComparingIds] = useState([]);
  const [selectedForDetails, setSelectedForDetails] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const careers = assessmentResult?.suggestedCareers || [];

  const handleRunAiAssessment = async () => {
    setLoading(true);
    setSaveSuccessMsg('');
    try {
      await runAssessment({
        focusArea: user?.preferredDomain || 'AI & Machine Learning',
        requestedCount: 5
      });
    } catch (e) {
      console.warn('Assessment run error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCareer = async (careerTitle) => {
    await saveSelectedCareer(careerTitle);
    setSaveSuccessMsg(`Successfully saved "${careerTitle}" as your active target career! Generated corresponding 8-stage roadmap.`);
    setTimeout(() => setSaveSuccessMsg(''), 5000);
  };

  const toggleCompare = (id) => {
    if (comparingIds.includes(id)) {
      setComparingIds(comparingIds.filter(i => i !== id));
    } else {
      if (comparingIds.length >= 2) {
        setComparingIds([comparingIds[1], id]);
      } else {
        setComparingIds([...comparingIds, id]);
      }
    }
  };

  const comparedCareers = careers.filter(c => comparingIds.includes(c.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-electric-blue" />
              <span>Gemini AI Career Assessment Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Career Discovery & Alignment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Analyzes your academic profile, skill stack, and career goals with Google Gemini to generate 5 optimized career paths with compensation, growth rates, and tailored project ideas.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleRunAiAssessment}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-glow-sm hover:shadow-glow-md transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Analyzing with Gemini...' : (careers.length > 0 ? 'Re-Run Assessment' : 'Run Career Assessment')}</span>
            </button>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Suggested 5 Careers Grid */}
      {careers.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                5 Tailored Career Recommendations
              </h3>
              <p className="text-xs text-slate-400">
                Select any career to set as your primary target, or select 2 to compare side-by-side.
              </p>
            </div>

            {comparingIds.length > 0 && (
              <span className="text-xs text-electric-blue font-semibold">
                Comparing {comparingIds.length} of 2
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {careers.map((career) => {
              const isSelectedTarget = user?.selectedCareer === career.title;
              const isCompared = comparingIds.includes(career.id);

              return (
                <div
                  key={career.id}
                  className={`glass-panel p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                    isSelectedTarget
                      ? 'border-indigo-500/80 bg-[#12112C]/90 shadow-glow-sm'
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Top Row: Match % and Compare Toggle */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                        {career.matchPercentage}% Match
                      </span>

                      <button
                        onClick={() => toggleCompare(career.id)}
                        className={`text-[11px] px-2 py-0.5 rounded-md transition-colors ${
                          isCompared
                            ? 'bg-electric-blue text-slate-900 font-bold'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {isCompared ? 'Comparing' : 'Compare'}
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1.5">
                      {career.title}
                    </h4>

                    <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                      {career.shortDescription}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Est. Salary</span>
                        <span className="font-semibold text-white font-mono">{career.averageSalary}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Job Growth</span>
                        <span className="font-semibold text-emerald-400">{career.growthRate}</span>
                      </div>
                    </div>

                    {/* Technical Skills Preview */}
                    <div className="space-y-1.5 mb-4">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Required Technical Skills:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {career.technicalSkills?.slice(0, 4).map((sk) => (
                          <span
                            key={sk}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 font-mono"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedForDetails(career)}
                      className="text-xs text-slate-400 hover:text-white font-medium"
                    >
                      View Details
                    </button>

                    {isSelectedTarget ? (
                      <span className="text-xs font-bold text-indigo-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Active Target</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSelectCareer(career.title)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-semibold border border-indigo-500/30 transition-all flex items-center gap-1"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Set as Target</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="glass-panel p-12 text-center rounded-3xl border border-white/5 space-y-4">
          <Compass className="w-12 h-12 text-indigo-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Generate Your 5 Tailored AI Career Paths</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Click the button above to run Gemini AI career synthesis against your profile. You'll receive salary forecasts, skill requirements, and project ideas.
          </p>
          <button
            onClick={handleRunAiAssessment}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-sm"
          >
            Run Assessment Now
          </button>
        </div>
      )}

      {/* Side-by-Side Career Comparison Section */}
      {comparedCareers.length >= 2 && (
        <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 space-y-4 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-electric-blue" />
              <h3 className="text-base font-bold text-white">Side-by-Side Career Comparison</h3>
            </div>
            <button
              onClick={() => setComparingIds([])}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear Comparison
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparedCareers.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">{c.title}</h4>
                  <span className="text-xs font-mono font-bold text-emerald-400">{c.matchPercentage}%</span>
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  Salary: {c.averageSalary} • Growth: {c.growthRate}
                </div>
                <p className="text-xs text-slate-400">{c.shortDescription}</p>

                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Required Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {c.technicalSkills?.map(s => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectCareer(c.title)}
                  className="w-full py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-white text-xs font-semibold border border-indigo-500/30 transition-all mt-2"
                >
                  Set {c.title} as Target Career
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Modal for Single Career */}
      {selectedForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#101024] border border-white/10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {selectedForDetails.matchPercentage}% Alignment
                </span>
                <h3 className="text-xl font-bold text-white mt-1.5">{selectedForDetails.title}</h3>
                <p className="text-xs text-slate-400">{selectedForDetails.averageSalary} • {selectedForDetails.growthRate}</p>
              </div>
              <button
                onClick={() => setSelectedForDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <span className="font-bold text-indigo-300 block">Why this fits your profile:</span>
              <p className="text-slate-300 leading-relaxed">{selectedForDetails.whyItFits}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-white block uppercase tracking-wider">Learning Recommendations</span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedForDetails.learningRecommendations?.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-electric-blue font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-white block uppercase tracking-wider">Relevant Portfolio Projects</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedForDetails.relevantProjects?.map((proj, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                    <span className="font-bold text-white block">{proj.title}</span>
                    <span className="text-[11px] text-slate-400 mt-1 block">{proj.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedForDetails(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleSelectCareer(selectedForDetails.title);
                  setSelectedForDetails(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-sm"
              >
                Save as Target Career & Build Roadmap
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
