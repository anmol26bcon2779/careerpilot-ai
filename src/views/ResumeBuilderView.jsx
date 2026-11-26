import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Sparkles,
  Download,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Printer,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function ResumeBuilderView() {
  const { studentProfile, showToast } = useApp();
  const resumePrintRef = useRef(null);

  const [isGeneratingAiSummary, setIsGeneratingAiSummary] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Resume form state
  const [resumeData, setResumeData] = useState({
    fullName: studentProfile.fullName || 'Jordan Taylor',
    title: studentProfile.targetCareer || 'AI & Machine Learning Engineer',
    email: studentProfile.email || 'jordan.taylor@university.edu',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    github: 'github.com/jordantaylor',
    linkedin: 'linkedin.com/in/jordantaylor',
    summary: 'Results-driven and adaptive AI Engineer with strong mathematical foundations and hands-on experience developing transformer models, retrieval-augmented generation (RAG) pipelines, and scalable microservices. Passionate about productionizing intelligent agent workflows and driving measurable software impact.',
    education: [
      {
        degree: 'Bachelor of Science in Computer Science & AI',
        institution: 'University of California, Berkeley',
        duration: '2023 - 2027',
        gpa: '3.85 / 4.0'
      }
    ],
    skills: studentProfile.skills?.length > 0
      ? studentProfile.skills.join(', ')
      : 'Python, PyTorch, Vector Search, FastAPI, Docker, React, TypeScript, Git',
    projects: [
      {
        title: 'Autonomous Research Assistant Agent',
        technologies: 'Python, PyTorch, LangChain, Pinecone, FastAPI',
        description: 'Engineered an autonomous multi-tool agent capable of synthesizing technical research across 500+ research papers with sub-second semantic retrieval and automated fact-checking.'
      },
      {
        title: 'Real-Time Edge Computer Vision Pipeline',
        technologies: 'Python, OpenCV, ONNX Runtime, Docker',
        description: 'Designed low-latency inference server running quantized vision models at 60 FPS on edge hardware with automated telemetry logging.'
      }
    ],
    experience: [
      {
        role: 'Undergraduate AI Fellow',
        company: 'Berkeley AI Research Lab',
        duration: 'Jan 2026 - Present',
        bullets: 'Trained neural network architectures, prepared distributed datasets, and benchmarked inference latency across GPU clusters.'
      }
    ],
    achievements: [
      '1st Place Winner - Global Generative AI Hackathon 2026',
      'Dean’s Honors List for Academic Excellence (Fall 2025, Spring 2026)',
      'Published Technical Article on RAG Optimization with 15k+ reads'
    ]
  });

  const handleGenerateAiSummary = async () => {
    setIsGeneratingAiSummary(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'resume-summary',
          context: {
            role: resumeData.title,
            skills: resumeData.skills.split(',').map(s => s.trim()),
            experience: resumeData.experience.map(e => `${e.role} at ${e.company}`).join('; '),
            education: resumeData.education[0]?.degree || 'Computer Science'
          }
        })
      });

      const data = await res.json();
      if (res.ok && data.summary) {
        setResumeData(prev => ({ ...prev, summary: data.summary }));
        showToast('AI Summary Created', `Generated recruiter-ready summary via ${data.isLiveGemini ? 'Gemini 1.5 Flash' : 'CareerPilot AI'}`, 'success');
      }
    } catch (err) {
      showToast('Error', err.message, 'error');
    } finally {
      setIsGeneratingAiSummary(false);
    }
  };

  const handleExportPdf = async () => {
    if (!resumePrintRef.current) return;
    setIsExportingPdf(true);
    showToast('Exporting PDF', 'Rendering high-resolution recruiter document...', 'info');

    try {
      const element = resumePrintRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      showToast('PDF Downloaded', 'Professional resume saved successfully!', 'success');
    } catch (err) {
      console.error('PDF Export Error:', err);
      // Fallback: browser print dialog
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>ATS Resume Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">AI Resume Builder</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build, edit and export an ATS-optimized technical resume in one click.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 hover:from-sky-500 hover:to-purple-700 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Generating PDF...' : 'Download PDF Resume'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Live Preview Split Screen */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Left Side: Interactive Edit Form */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-5 text-xs">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
            <Edit3 className="w-4 h-4 text-sky-400" />
            <span>Edit Resume Content</span>
          </h3>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={resumeData.fullName}
                onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Professional Title</label>
              <input
                type="text"
                value={resumeData.title}
                onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="text"
                value={resumeData.email}
                onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Phone</label>
              <input
                type="text"
                value={resumeData.phone}
                onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={resumeData.location}
                onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* AI Professional Summary */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">Professional Summary</label>
              <button
                type="button"
                onClick={handleGenerateAiSummary}
                disabled={isGeneratingAiSummary}
                className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAiSummary ? 'animate-spin' : ''}`} />
                <span>{isGeneratingAiSummary ? 'Synthesizing...' : 'Re-Generate with AI'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={resumeData.summary}
              onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
              className="w-full glass-input rounded-xl p-3 text-xs leading-relaxed"
            />
          </div>

          {/* Core Technical Skills */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Technical Skills (Comma separated)</label>
            <input
              type="text"
              value={resumeData.skills}
              onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
              className="w-full glass-input rounded-xl px-3 py-2 text-xs"
            />
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <label className="block font-semibold text-slate-300">Featured Capstone Projects</label>
            {resumeData.projects.map((proj, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                <input
                  type="text"
                  value={proj.title}
                  onChange={(e) => {
                    const updated = [...resumeData.projects];
                    updated[idx].title = e.target.value;
                    setResumeData({ ...resumeData, projects: updated });
                  }}
                  placeholder="Project Title"
                  className="w-full glass-input rounded-lg px-2.5 py-1.5 text-xs font-bold"
                />
                <input
                  type="text"
                  value={proj.technologies}
                  onChange={(e) => {
                    const updated = [...resumeData.projects];
                    updated[idx].technologies = e.target.value;
                    setResumeData({ ...resumeData, projects: updated });
                  }}
                  placeholder="Technologies used"
                  className="w-full glass-input rounded-lg px-2.5 py-1.5 text-xs text-sky-400"
                />
                <textarea
                  rows={2}
                  value={proj.description}
                  onChange={(e) => {
                    const updated = [...resumeData.projects];
                    updated[idx].description = e.target.value;
                    setResumeData({ ...resumeData, projects: updated });
                  }}
                  placeholder="Project impact & architecture description"
                  className="w-full glass-input rounded-lg p-2 text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Live ATS Clean Document Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>A4 Document Preview</span>
            <span className="text-emerald-400 font-mono">Clean ATS-Compliant Layout</span>
          </div>

          <div className="rounded-3xl p-2 bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
            {/* The printable A4 Container (Strict white background & black typography for ATS recruiters) */}
            <div
              ref={resumePrintRef}
              className="w-full bg-white text-slate-900 p-8 sm:p-10 font-sans shadow-lg min-h-[780px] text-left select-text"
            >
              {/* Header */}
              <div className="border-b-2 border-slate-900 pb-4 mb-4">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                  {resumeData.fullName}
                </h1>
                <p className="text-sm font-bold text-indigo-700 tracking-wide mt-0.5">
                  {resumeData.title}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600 mt-2">
                  <span>{resumeData.email}</span>
                  <span>•</span>
                  <span>{resumeData.phone}</span>
                  <span>•</span>
                  <span>{resumeData.location}</span>
                  <span>•</span>
                  <span>{resumeData.github}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                  Professional Summary
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {resumeData.summary}
                </p>
              </div>

              {/* Technical Skills */}
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                  Technical Core Competencies
                </h2>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {resumeData.skills}
                </p>
              </div>

              {/* Featured Projects */}
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Key Technical Projects
                </h2>
                <div className="space-y-3">
                  {resumeData.projects.map((p, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-slate-900">{p.title}</h3>
                        <span className="text-[10px] text-indigo-700 font-semibold">{p.technologies}</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-snug mt-0.5">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                  Education & Academic Standing
                </h2>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-[11px] text-slate-700">{edu.institution}</p>
                    </div>
                    <span className="text-[11px] text-slate-600 font-mono">{edu.duration} (GPA: {edu.gpa})</span>
                  </div>
                ))}
              </div>

              {/* Honors & Achievements */}
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                  Honors & Accomplishments
                </h2>
                <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5">
                  {resumeData.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
