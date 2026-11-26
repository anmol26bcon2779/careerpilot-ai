import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  Zap,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Database,
  RefreshCw,
  Copy,
  Check,
  Send,
  Eye,
  FileSpreadsheet,
  Lock
} from 'lucide-react';

export default function SettingsIntegrationsView() {
  const {
    integrationSettings,
    setIntegrationSettings,
    integrationLogs,
    triggerTestWebhook,
    isSyncingWebhook,
    showToast
  } = useApp();

  const [webhookUrlInput, setWebhookUrlInput] = useState(integrationSettings.customWebhookUrl || '');
  const [selectedLog, setSelectedLog] = useState(null);
  const [copiedTab, setCopiedTab] = useState(null);

  const googleSheetsTabs = [
    {
      tab: 'Students',
      description: 'Stores student accounts, emails, and educational background from EVENT 1.',
      columns: 'Student ID, Full Name, Email, Registration Date, Account Type'
    },
    {
      tab: 'Career Assessments',
      description: 'Records assessment submissions and top recommended paths from EVENT 2.',
      columns: 'Student ID, Full Name, Email, Education, Domain, Top Match, Assessment Date'
    },
    {
      tab: 'Career Recommendations',
      description: 'Stores the 5 synthesized career paths, match %, and compensation ranges.',
      columns: 'Student ID, Path Title, Category, Match %, Salary Range, Key Skills'
    },
    {
      tab: 'Roadmaps',
      description: 'Stores curriculum blueprints, target career, and total milestone counts from EVENT 3.',
      columns: 'Student ID, Roadmap Title, Target Career, Total Milestones, Generated Date'
    },
    {
      tab: 'Milestone Progress',
      description: 'Appends completed milestone logs with true verified progress % from EVENT 4.',
      columns: 'Student ID, Email, Milestone ID, Milestone Title, Completion Date, Progress %'
    },
    {
      tab: 'Saved Internships',
      description: 'Records bookmarked student internship opportunities from EVENT 5.',
      columns: 'Student ID, Email, Job Title, Company, Location, Type, Saved Date'
    },
    {
      tab: 'Resume Records',
      description: 'Captures exported student resume records and timestamps.',
      columns: 'Student ID, Email, Target Role, Technical Skills, Last Exported'
    },
    {
      tab: 'Integration Logs',
      description: 'System audit logs of all webhook dispatches and latency metrics.',
      columns: 'Event ID, Event Type, Timestamp, Status, Latency MS'
    }
  ];

  const handleSaveWebhookSettings = (e) => {
    e.preventDefault();
    setIntegrationSettings(prev => ({
      ...prev,
      customWebhookUrl: webhookUrlInput.trim()
    }));
    showToast('Settings Saved', 'Custom Zapier Webhook URL updated', 'success');
  };

  const handleTestPing = async () => {
    await triggerTestWebhook(webhookUrlInput.trim());
  };

  const handleCopyColumns = (text, tab) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
    showToast('Copied', `Copied column headers for tab: ${tab}`, 'info');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Google Sheets & Zapier Bridge</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Integrations & Data Sync</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure Zapier Webhooks to store and sync all 5 platform events directly to Google Sheets.
          </p>
        </div>

        <button
          onClick={handleTestPing}
          disabled={isSyncingWebhook}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Send className={`w-3.5 h-3.5 ${isSyncingWebhook ? 'animate-spin' : ''}`} />
          <span>{isSyncingWebhook ? 'Sending Test Event...' : 'Test Webhook Handshake'}</span>
        </button>
      </div>

      {/* Webhook Configuration Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Zapier "Catch Hook" Endpoint</h3>
              <p className="text-xs text-slate-400">Receives events from CareerPilot and appends rows to your Google Spreadsheet.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveWebhookSettings} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              ZAPIER_WEBHOOK_URL (or paste custom Catch Hook URL)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                value={webhookUrlInput}
                onChange={(e) => setWebhookUrlInput(e.target.value)}
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                className="flex-1 glass-input rounded-xl px-3.5 py-2.5 text-xs font-mono"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
              >
                Save URL
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Tip: Can also be set in <code className="text-slate-300">.env</code> as <code className="text-slate-300">ZAPIER_WEBHOOK_URL</code> for zero-configuration deployments.
            </p>
          </div>
        </form>

        {/* Security & Deduplication Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span>HMAC-SHA256 Payload Signing</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Every webhook event carries an <code className="text-indigo-300">X-CareerPilot-Signature</code> header verified against <code className="text-indigo-300">ZAPIER_WEBHOOK_SECRET</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sanitization & Deduplication</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Passwords and tokens are stripped server-side. Debounce windows prevent duplicate milestone triggers.
            </p>
          </div>
        </div>
      </div>

      {/* 8 Google Sheets Tabs Mapping & Setup Guide */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
          <div>
            <h3 className="text-sm font-bold text-white">Google Sheets Tabs Schema Architecture</h3>
            <p className="text-xs text-slate-400">Create these 8 tabs in your Google Sheet to mirror the persistent records.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {googleSheetsTabs.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Tab: {item.tab}
                </span>
                <button
                  onClick={() => handleCopyColumns(item.columns, item.tab)}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                  title="Copy recommended header row"
                >
                  {copiedTab === item.tab ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTab === item.tab ? 'Copied' : 'Copy Headers'}</span>
                </button>
              </div>

              <p className="text-slate-300 text-[11px] leading-relaxed">{item.description}</p>
              <div className="p-2 rounded-lg bg-black/40 font-mono text-[10px] text-slate-400 truncate">
                Columns: {item.columns}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Webhook Event Dispatch Logs */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white">Recent Webhook Dispatch Stream</h3>
          </div>
          <span className="text-xs text-slate-400">{integrationLogs.length} events logged</span>
        </div>

        {integrationLogs.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No events dispatched yet. Complete a milestone, save an internship, or click "Test Webhook Handshake" above!
          </div>
        ) : (
          <div className="space-y-2 overflow-x-auto">
            {integrationLogs.map((log, idx) => {
              const isDelivered = log.status === 'delivered';
              const isPending = log.status === 'pending_configuration';

              return (
                <div
                  key={log.id || idx}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        isDelivered ? 'bg-emerald-400' : isPending ? 'bg-amber-400' : 'bg-rose-400'
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{log.eventType}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{log.id}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {log.message || log.response || `Status: ${log.status}`}
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono sm:text-right">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
