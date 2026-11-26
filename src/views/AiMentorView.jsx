import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  CheckCircle2,
  Database,
  ShieldCheck,
  User,
  Zap,
  CornerDownLeft,
  Copy,
  Check
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'What should I learn next for my current roadmap?',
  'Which capstone projects make my resume stand out most?',
  'How do I prepare for technical interviews in this field?',
  'What skills am I missing compared to senior engineers?',
  'How can I structure my weekly study schedule for internships?'
];

export default function AiMentorView() {
  const {
    studentProfile,
    roadmap,
    integrationSettings,
    setIntegrationSettings,
    showToast
  } = useApp();

  const [messages, setMessages] = useState(() => {
    return [
      {
        id: 'msg-init',
        sender: 'mentor',
        text: `Hello ${studentProfile.fullName || 'there'}! I am your **CareerPilot AI Mentor**, powered by Google Gemini. 

I am calibrated with your active target: **${studentProfile.targetCareer || 'AI Engineer'}**, your verified skills (${(studentProfile.skills || []).join(', ')}), and your roadmap goals.

How can I accelerate your engineering journey today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const userMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'chat',
          prompt: query,
          context: {
            targetCareer: studentProfile.targetCareer,
            skills: studentProfile.skills,
            education: `${studentProfile.educationLevel} (${studentProfile.course})`,
            studentEmail: studentProfile.email
          },
          history: messages.slice(-4),
          optInStorage: integrationSettings.consentToStore,
          customWebhookUrl: integrationSettings.customWebhookUrl
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to communicate with AI');

      const mentorReply = {
        id: `ai-${Date.now()}`,
        sender: 'mentor',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || 'Gemini 1.5 Flash'
      };

      setMessages(prev => [...prev, mentorReply]);
    } catch (err) {
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: 'mentor',
        text: `I encountered an issue connecting to the AI inference service: ${err.message}. Please check your environment variables or try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-init-reset',
        sender: 'mentor',
        text: `Chat session refreshed. Your profile context is retained for **${studentProfile.targetCareer}**. What would you like to explore next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast('Chat Cleared', 'Conversation history reset', 'info');
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast('Copied', 'Response copied to clipboard', 'info');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[550px] animate-fade-in pb-4">
      {/* Top Header with Context Info */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-glow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">CareerPilot AI Mentor</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold">
                Gemini 1.5 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Active Context: <span className="text-slate-200 font-medium">{studentProfile.targetCareer}</span> • {(studentProfile.skills || []).length} verified skills
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Storage Consent Indicator */}
          <button
            onClick={() => {
              setIntegrationSettings(prev => ({ ...prev, consentToStore: !prev.consentToStore }));
              showToast(
                !integrationSettings.consentToStore ? 'Sheets Sync Enabled' : 'Sheets Sync Paused',
                !integrationSettings.consentToStore ? 'Permitted session logs will append to Google Sheets' : 'Conversations kept in local browser memory only',
                'info'
              );
            }}
            className={`text-[11px] px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
              integrationSettings.consentToStore
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
            title="Toggle consent to save session logs to Google Sheets"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{integrationSettings.consentToStore ? 'Sheets Log Opt-In: ON' : 'Sheets Log Opt-In: OFF'}</span>
          </button>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-gradient-to-tr from-sky-400 to-indigo-500 text-white shadow-sm'
                    : 'bg-[#151528] border border-indigo-500/40 text-sky-400'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed relative group ${
                  isUser
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-md'
                    : 'bg-[#121224] border border-white/10 text-slate-200 rounded-tl-none'
                }`}
              >
                {!isUser && (
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-opacity"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}

                <div className="whitespace-pre-line prose prose-invert prose-xs max-w-none">
                  {msg.text}
                </div>

                <div className="mt-2 flex items-center justify-end gap-2 text-[10px] text-slate-400/80">
                  {msg.model && <span>{msg.model}</span>}
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#151528] border border-indigo-500/40 flex items-center justify-center text-sky-400">
              <Bot className="w-4 h-4 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-[#121224] border border-white/10 rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>CareerPilot is formulating tailored guidance with Gemini...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sky-400" /> Prompts:
        </span>
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/5 text-slate-300 hover:text-white transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-2 glass-panel rounded-2xl border border-white/10 p-2 sm:p-3 flex items-center gap-2">
        <textarea
          rows={1}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={`Ask anything about ${studentProfile.targetCareer || 'your roadmap'} (e.g. "Explain transformer attention in simple terms")...`}
          className="flex-1 bg-transparent border-0 focus:ring-0 text-xs sm:text-sm text-white placeholder-slate-500 resize-none py-1.5 px-2 outline-none"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputPrompt.trim() || isLoading}
          className="p-3 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 hover:from-sky-500 hover:to-purple-700 text-white shadow-glow-sm disabled:opacity-40 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
