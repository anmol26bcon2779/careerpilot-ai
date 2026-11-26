import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Send,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';

const QUESTION_BANK = [
  {
    id: 'q-1',
    category: 'Technical Architecture',
    role: 'AI & Machine Learning Engineer',
    question: 'How does Retrieval-Augmented Generation (RAG) differ from fine-tuning an LLM, and in what real-world business scenarios would you choose one over the other?'
  },
  {
    id: 'q-2',
    category: 'System Design & Algorithms',
    role: 'AI & Software Engineer',
    question: 'Describe how you would design a scalable, low-latency API serving real-time embedding generation for 50,000 queries per minute.'
  },
  {
    id: 'q-3',
    category: 'Behavioral & STAR',
    role: 'All Technical Roles',
    question: 'Tell me about a time you encountered a severe bug or production incident right before a deadline. How did you diagnose, resolve, and prevent it?'
  },
  {
    id: 'q-4',
    category: 'Data Structures',
    role: 'Software Engineer',
    question: 'When would you use a Trie data structure over a Hash Map for prefix-matching, and what are the time/space complexity tradeoffs?'
  }
];

export default function InterviewCoachView() {
  const { studentProfile, showToast } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const activeQ = QUESTION_BANK[currentQuestionIndex];

  const handleEvaluateAnswer = async () => {
    if (!studentAnswer.trim()) {
      showToast('Answer Required', 'Please type your answer before submitting for AI review.', 'info');
      return;
    }

    setIsEvaluating(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'interview-feedback',
          question: activeQ.question,
          answer: studentAnswer,
          role: studentProfile.targetCareer || 'Software Engineer',
          questionType: activeQ.category
        })
      });

      const data = await res.json();
      if (res.ok) {
        setEvaluationResult(data);
        showToast('Evaluation Ready', `AI scored your answer: ${data.score}/100`, 'success');
      } else {
        throw new Error(data.error || 'Evaluation failed');
      }
    } catch (err) {
      showToast('Evaluation Error', err.message, 'error');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % QUESTION_BANK.length);
    setStudentAnswer('');
    setEvaluationResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Mic className="w-3.5 h-3.5" />
            <span>AI Simulation Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Interview Coach & Mock Studio</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Practice technical and behavioral questions calibrated for {studentProfile.targetCareer} with instant AI scoring.
          </p>
        </div>

        <button
          onClick={handleNextQuestion}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
          <span>Switch Question ({currentQuestionIndex + 1}/{QUESTION_BANK.length})</span>
        </button>
      </div>

      {/* Active Question Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-[#0F0F1E] shadow-glow-sm relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">{activeQ.category}</span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400">Target: {activeQ.role}</span>
        </div>

        <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
          "{activeQ.question}"
        </h2>
      </div>

      {/* Two Column Grid: Answer Input & Real-Time AI Review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Side: Student Answer Box */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white uppercase tracking-wider">Your Response</label>
            <span className="text-[11px] text-slate-400">STAR Method & Technical Tradeoffs</span>
          </div>

          <textarea
            rows={8}
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
            placeholder="Structure your answer clearly: Explain the principle, mention tradeoffs, and cite an example from your personal projects..."
            className="w-full glass-input rounded-2xl p-4 text-xs sm:text-sm leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setStudentAnswer(
                  "RAG retrieves relevant external factual data from vector stores at query time without altering model weights, making it ideal for fast-changing enterprise data and preventing hallucination. Fine-tuning adjusts the model's internal weights for specific domains, style, or vocabulary, but doesn't guarantee up-to-date knowledge. In practice, a hybrid approach works best: fine-tuning for structured domain reasoning combined with RAG for verified document retrieval."
                );
              }}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
            >
              Paste sample strong response
            </button>

            <button
              onClick={handleEvaluateAnswer}
              disabled={isEvaluating || !studentAnswer.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 hover:from-sky-500 hover:to-purple-700 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md flex items-center gap-2 disabled:opacity-50"
            >
              {isEvaluating ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Evaluating...</span>
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit for AI Evaluation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: AI Assessment Card */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>AI Evaluation Report</span>
            </h3>
            {evaluationResult && (
              <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Score: {evaluationResult.score}/100 ({evaluationResult.verdict})
              </span>
            )}
          </div>

          {!evaluationResult ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-xs">Type your response and click "Submit for AI Evaluation".</p>
              <p className="text-[11px] text-slate-500">Gemini will score technical clarity, depth, and give an improved answer.</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in text-xs">
              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                  <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Key Strengths</span>
                  <ul className="space-y-1 text-slate-300">
                    {evaluationResult.strengths?.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                  <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block">Areas to Elevate</span>
                  <ul className="space-y-1 text-slate-300">
                    {evaluationResult.weaknesses?.map((w, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improved Suggested Answer */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 space-y-1.5">
                <span className="font-bold text-sky-300 uppercase text-[10px] tracking-wider block flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Ideal Senior-Level Formulation
                </span>
                <p className="text-slate-200 leading-relaxed italic">
                  "{evaluationResult.suggestedAnswer}"
                </p>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Practice Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
