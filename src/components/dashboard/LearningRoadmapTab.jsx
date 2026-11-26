import React, { useState } from 'react';
import { 
  Target, CheckCircle2, Clock, BookOpen, Code, FolderGit2, 
  Plus, Edit2, Sparkles, RefreshCw, Check, X, ArrowUpRight, Save, Layers 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';

export function LearningRoadmapTab() {
  const { user } = useAuth();
  const { 
    roadmap, 
    progressMetrics, 
    toggleMilestone, 
    addCustomMilestone, 
    updateMilestone, 
    regenerateRoadmap 
  } = useCareer();

  const [regenerating, setRegenerating] = useState(false);
  const [addingCustom, setAddingCustom] = useState(false);
  const [editingStageId, setEditingStageId] = useState(null);
  const [notice, setNotice] = useState('');

  // Custom Milestone Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDuration, setNewDuration] = useState('2 Weeks');
  const [newTask, setNewTask] = useState('');
  const [newProject, setNewProject] = useState('');

  // Edit Milestone Form State
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const handleRegenerate = async () => {
    setRegenerating(true);
    setNotice('');
    try {
      const updated = await regenerateRoadmap(user?.selectedCareer);
      if (updated) {
        setNotice(`Roadmap for "${updated.targetCareer}" successfully refreshed and synced to Google Sheets via Zapier.`);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setRegenerating(false);
      setTimeout(() => setNotice(''), 6000);
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addCustomMilestone({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom hands-on milestone created by student.',
      estimatedDuration: newDuration,
      practicalTasks: newTask ? [newTask] : ['Execute custom project implementation'],
      projectIdeas: newProject ? [newProject] : ['Custom portfolio deliverable']
    });

    setNewTitle('');
    setNewDesc('');
    setNewTask('');
    setNewProject('');
    setAddingCustom(false);
    setNotice('Custom milestone added successfully!');
    setTimeout(() => setNotice(''), 4000);
  };

  const startEdit = (stage) => {
    setEditingStageId(stage.id);
    setEditTitle(stage.title);
    setEditDesc(stage.description);
  };

  const saveEdit = (stageId) => {
    updateMilestone(stageId, {
      title: editTitle,
      description: editDesc
    });
    setEditingStageId(null);
    setNotice('Milestone updated successfully.');
    setTimeout(() => setNotice(''), 4000);
  };

  const stages = roadmap?.stages || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Target className="w-3.5 h-3.5 text-electric-blue" />
              <span>Target: {roadmap?.targetCareer || 'AI Engineer'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Personalized Learning Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Step-by-step milestones spanning fundamentals to internship prep. Real-time progress is strictly computed from completed milestones ({progressMetrics.completedCount} of {progressMetrics.totalCount} completed = {progressMetrics.percentage}%).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setAddingCustom(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs border border-white/10 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Milestone</span>
            </button>

            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-glow-sm transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${regenerating ? 'animate-spin' : ''}`} />
              <span>{regenerating ? 'Regenerating...' : 'Regenerate with AI'}</span>
            </button>
          </div>
        </div>

        {notice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notice}</span>
          </div>
        )}

        {/* Progress Bar in Header */}
        <div className="mt-6 pt-5 border-t border-white/5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-300">
              Roadmap Completion: {progressMetrics.percentage}%
            </span>
            <span className="text-slate-400 font-mono">
              {progressMetrics.completedCount} / {progressMetrics.totalCount} Stages Finished
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-electric-blue transition-all duration-500"
              style={{ width: `${progressMetrics.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Custom Milestone Drawer / Box */}
      {addingCustom && (
        <form onSubmit={handleAddCustom} className="glass-panel p-6 rounded-3xl border border-indigo-500/40 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-electric-blue" />
              <span>Create Custom Learning Milestone</span>
            </h3>
            <button
              type="button"
              onClick={() => setAddingCustom(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Milestone Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Distributed Consensus Algorithms"
                className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Duration</label>
              <input
                type="text"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                placeholder="e.g. 2 Weeks"
                className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Detailed scope and goals of this stage..."
                className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Practical Task</label>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="e.g. Implement Raft leader election in Python"
                className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Deliverable Idea</label>
              <input
                type="text"
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                placeholder="e.g. Distributed Key-Value Store"
                className="w-full bg-[#090915] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setAddingCustom(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow-sm"
            >
              Add Milestone to Roadmap
            </button>
          </div>
        </form>
      )}

      {/* Stages List */}
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isCompleted = stage.completed || stage.completionStatus === 'completed';
          const isEditing = editingStageId === stage.id;

          return (
            <div
              key={stage.id || index}
              className={`glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-6 border transition-all duration-300 ${
                isCompleted
                  ? 'border-emerald-500/30 bg-[#0C121F]/80'
                  : 'border-white/5 hover:border-indigo-500/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                {/* Stage Info */}
                <div className="flex items-start gap-4">
                  {/* Complete Checkbox Button */}
                  <button
                    onClick={() => toggleMilestone(stage.id)}
                    title={isCompleted ? 'Mark as In-Progress' : 'Mark as Completed'}
                    className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-900 shadow-glow-sm'
                        : 'border border-white/20 hover:border-emerald-400 bg-white/5'
                    }`}
                  >
                    {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-indigo-500/20 text-indigo-300'
                      }`}>
                        Stage {stage.stageNumber || index + 1}
                      </span>

                      <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{stage.estimatedDuration}</span>
                      </span>

                      {isCompleted && (
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified Complete</span>
                        </span>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="space-y-2 pt-1">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full bg-[#090915] border border-indigo-500/40 rounded-lg px-3 py-1.5 text-sm font-bold text-white focus:outline-none"
                        />
                        <textarea
                          rows={2}
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className="w-full bg-[#090915] border border-white/10 rounded-lg p-2 text-xs text-slate-300 focus:outline-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(stage.id)}
                            className="px-3 py-1 rounded bg-indigo-600 text-white text-xs font-semibold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingStageId(null)}
                            className="px-3 py-1 rounded bg-white/10 text-slate-300 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className={`text-base sm:text-lg font-bold ${isCompleted ? 'text-white' : 'text-slate-100'}`}>
                          {stage.title}
                        </h3>
                        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                          {stage.description}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Edit Toggle */}
                {!isEditing && (
                  <button
                    onClick={() => startEdit(stage)}
                    title="Edit Stage Details"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors self-start shrink-0"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sub-sections: Practical Tasks, Resources & Projects */}
              {!isEditing && (
                <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  
                  {/* Practical Tasks */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Practical Tasks</span>
                    </span>
                    <ul className="space-y-1.5">
                      {stage.practicalTasks?.map((task, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-300 leading-snug">
                          <span className="text-indigo-400 font-bold">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learning Resources */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      <span>Curated Resources</span>
                    </span>
                    <div className="space-y-1.5">
                      {stage.learningResources?.map((res, i) => (
                        <a
                          key={i}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] hover:bg-white/5 border border-white/5 text-slate-300 hover:text-white transition-colors group"
                        >
                          <span className="truncate pr-2 font-medium">{res.title}</span>
                          <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-electric-blue shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Project Deliverable */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Portfolio Project Deliverable</span>
                    </span>
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      {stage.projectIdeas?.map((idea, i) => (
                        <p key={i} className="text-slate-300 leading-relaxed font-medium">
                          {idea}
                        </p>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
