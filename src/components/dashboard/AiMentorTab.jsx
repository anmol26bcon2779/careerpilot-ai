import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Sparkles, Trash2, Bot, User, Check, Copy, 
  HelpCircle, ShieldCheck, Zap, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCareer } from '../../context/CareerContext';

export function AiMentorTab() {
  const { user } = useAuth();
  const { chatHistory, sendChatMessage, clearChatHistory } = useCareer();

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [syncHistoryConsent, setSyncHistoryConsent] = useState(true);

  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    'What should I learn next based on my roadmap?',
    'Which production projects should I build to impress recruiters?',
    'How do I prepare for technical interviews for this role?',
    'What skills am I missing from modern AI engineering stacks?',
    'How do I negotiate compensation for tech internships?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    const userText = inputPrompt.trim();
    setInputPrompt('');
    setLoading(true);

    try {
      await sendChatMessage(userText);
    } catch (err) {
      console.warn('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggested = (q) => {
    setInputPrompt(q);
  };

  const copyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[550px] space-y-4 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-glow-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">CareerPilot AI Mentor</h2>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Google Gemini API
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized context: {user?.name} • Targeting {user?.selectedCareer || 'AI Engineer'} ({user?.course})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Opt-in Sync Toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200 select-none">
            <input
              type="checkbox"
              checked={syncHistoryConsent}
              onChange={(e) => setSyncHistoryConsent(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-0 bg-[#090915] border-white/20"
            />
            <span className="text-[11px]">Sync notes to Google Sheets</span>
          </label>

          <button
            onClick={clearChatHistory}
            title="Clear Chat History"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-xl transition-colors text-xs flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap uppercase tracking-wider pl-1">
          Quick Prompts:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectSuggested(q)}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-all whitespace-nowrap shrink-0 hover:border-indigo-500/40"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="glass-panel flex-1 rounded-3xl border border-white/5 p-4 sm:p-6 overflow-y-auto space-y-4 scrollbar-custom">
        {chatHistory.map((msg) => {
          const isBot = msg.role === 'model';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isBot 
                  ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-glow-sm' 
                  : 'bg-white/10 text-slate-200'
              }`}>
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                isBot
                  ? 'bg-[#121226] border border-white/10 text-slate-200'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {isBot && (
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>CareerPilot AI • Gemini Model</span>
                    <button
                      onClick={() => copyText(msg.id, msg.content)}
                      className="hover:text-white flex items-center gap-1 text-[11px]"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#121226] border border-white/10 rounded-2xl p-4 text-xs text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric-blue animate-spin" />
              <span>Analyzing student profile & formulating guidance...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative shrink-0">
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder={`Ask about ${user?.selectedCareer || 'career'} roadmaps, interviews, or project architectures...`}
          className="w-full bg-[#101026] border border-white/10 rounded-2xl pl-5 pr-14 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xl"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || loading}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white transition-all shadow-glow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Security Footnote */}
      <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Gemini API keys are maintained securely server-side on Vercel functions and never leaked to the client.</span>
      </div>

    </div>
  );
}
