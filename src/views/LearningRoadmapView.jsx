import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  Code,
  FolderGit2,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Zap,
  Award
} from 'lucide-react';

export default function LearningRoadmapView() {
  const {
    roadmap,
    studentProfile,
    toggleMilestone,
    addCustomMilestone,
    generateRoadmap,
    isGeneratingRoadmap,
    progressPercentage,
    completedMilestones,
    totalMilestones,
    showToast
  } = useApp();

  const [expandedMilestones, setExpandedMilestones] = useState({ 'ms-1': true, 'ms-2': true, 'ms-3': true });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMilestoneData, setNewMilestoneData] = useState({
    title: '',
    stageName: 'Specialized Track',
    description: '',
    duration: '2 Weeks',
    project: '',
    tasks: ''
  });

  const toggleExpand = (id) => {
    setExpandedMilestones(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMilestoneData.title.trim()) return;

    addCustomMilestone({
      title: newMilestoneData.title,
      stageName: newMilestoneData.stageName,
      description: newMilestoneData.description,
      duration: newMilestoneData.duration,
      project: newMilestoneData.project,
      tasks: newMilestoneData.tasks ? newMilestoneData.tasks.split('\n').filter(Boolean) : []
    });

    setIsAddModalOpen(false);
    setNewMilestoneData({
      title: '',
      stageName: 'Specialized Track',
      description: '',
      duration: '2 Weeks',
      project: '',
      tasks: ''
    });
  };

  const handleRegenerate = async () => {
    await generateRoadmap(studentProfile.targetCareer);
  };

  const milestones = roadmap?.milestones || [];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Controls & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Curriculum Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {roadmap?.title || `${studentProfile.targetCareer} Roadmap`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            {roadmap?.description || 'Your tailored step-by-step engineering curriculum.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5 text-sky-400" />
            <span>Add Custom Milestone</span>
          </button>

          <button
            onClick={handleRegenerate}
            disabled={isGeneratingRoadmap}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 hover:from-sky-500 hover:to-purple-700 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingRoadmap ? 'animate-spin' : ''}`} />
            <span>{isGeneratingRoadmap ? 'Regenerating...' : 'Regenerate Roadmap'}</span>
          </button>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-gradient-to-r from-indigo-950/30 to-[#0F0F1E] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Roadmap Completion</span>
            <span className="text-xs font-bold text-sky-400">({completedMilestones} of {totalMilestones} Completed)</span>
          </div>
          <p className="text-xs text-slate-300">
            Checking off a milestone automatically triggers Zapier EVENT 4 to append your progress to Google Sheets.
          </p>
        </div>

        <div className="flex items-center gap-4 min-w-[240px]">
          <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-lg font-black text-white">{progressPercentage}%</span>
        </div>
      </div>

      {/* Timeline Milestones List */}
      <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-transparent">
        {milestones.map((m, idx) => {
          const isExpanded = expandedMilestones[m.id];
          const isCompleted = m.completed;

          return (
            <div
              key={m.id || idx}
              className={`relative pl-10 sm:pl-14 transition-all duration-300 group`}
            >
              {/* Checkpoint Node Icon */}
              <button
                onClick={() => toggleMilestone(m.id)}
                className={`absolute left-1 sm:left-3 top-5 w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center transition-all z-10 ${
                  isCompleted
                    ? 'bg-emerald-500 text-black shadow-glow-sm scale-110'
                    : 'bg-[#151528] border-2 border-slate-600 text-slate-400 hover:border-indigo-400 hover:text-white'
                }`}
                title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4 font-bold" /> : <span className="text-[10px] font-bold">{m.stageNumber || idx + 1}</span>}
              </button>

              {/* Milestone Card */}
              <div
                className={`p-5 sm:p-6 rounded-3xl glass-panel border transition-all duration-300 ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-white/10 hover:border-indigo-500/40 bg-[#0F0F1E]/80'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      Stage {m.stageNumber || idx + 1}: {m.stageName}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> {m.estimatedDuration}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleMilestone(m.id)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40'
                      }`}
                    >
                      {isCompleted ? 'Completed ✓' : 'Mark Complete'}
                    </button>

                    <button
                      onClick={() => toggleExpand(m.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <h3 className={`text-base sm:text-lg font-bold text-white mt-2 ${isCompleted ? 'line-through opacity-80' : ''}`}>
                  {m.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {m.description}
                </p>

                {/* Collapsible Details (Practical Tasks, Projects, Resources) */}
                {isExpanded && (
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-4 animate-fade-in text-xs">
                    {/* Practical Tasks Checklist */}
                    <div>
                      <h4 className="font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5" /> Hands-On Technical Exercises
                      </h4>
                      <ul className="space-y-1.5 pl-2">
                        {(m.practicalTasks || []).map((task, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2 text-slate-300">
                            <span className="text-indigo-400 font-bold mt-0.5">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Capstone Project Idea */}
                    {m.projectIdeas && (
                      <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-start gap-2.5">
                        <FolderGit2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-purple-300 uppercase text-[10px] tracking-wider block">Stage Project Deliverable</span>
                          <p className="text-slate-200 mt-0.5">{m.projectIdeas}</p>
                        </div>
                      </div>
                    )}

                    {/* Learning Resources */}
                    {(m.learningResources || []).length > 0 && (
                      <div>
                        <h4 className="font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> Curated Resources & Documentation
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {m.learningResources.map((res, rIdx) => (
                            <a
                              key={rIdx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                            >
                              <span>{res.title}</span>
                              <span className="text-[10px] text-slate-500">({res.type})</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Milestone Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Add Custom Milestone</h3>
            <p className="text-xs text-slate-400 mb-4">Extend your roadmap with your university project or company goals.</p>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Milestone Title</label>
                <input
                  type="text"
                  required
                  value={newMilestoneData.title}
                  onChange={(e) => setNewMilestoneData({ ...newMilestoneData, title: e.target.value })}
                  placeholder="e.g. Master LangChain RAG & Vector Search"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Stage Category</label>
                  <input
                    type="text"
                    value={newMilestoneData.stageName}
                    onChange={(e) => setNewMilestoneData({ ...newMilestoneData, stageName: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Estimated Duration</label>
                  <input
                    type="text"
                    value={newMilestoneData.duration}
                    onChange={(e) => setNewMilestoneData({ ...newMilestoneData, duration: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newMilestoneData.description}
                  onChange={(e) => setNewMilestoneData({ ...newMilestoneData, description: e.target.value })}
                  placeholder="What will you learn and achieve in this stage?"
                  className="w-full glass-input rounded-xl p-3 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Capstone Deliverable</label>
                <input
                  type="text"
                  value={newMilestoneData.project}
                  onChange={(e) => setNewMilestoneData({ ...newMilestoneData, project: e.target.value })}
                  placeholder="e.g. Document Q&A Agent with Hybrid Vector Search"
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-600 text-white font-bold text-xs shadow-glow-sm"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
