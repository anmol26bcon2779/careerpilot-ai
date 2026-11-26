import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { notification } = useApp();

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 max-w-sm w-full animate-bounce-in">
      <div
        className={`p-4 rounded-2xl glass-panel shadow-2xl border flex items-start gap-3 ${
          isSuccess
            ? 'border-emerald-500/40 bg-emerald-950/80 text-emerald-100'
            : isError
            ? 'border-rose-500/40 bg-rose-950/80 text-rose-100'
            : 'border-indigo-500/40 bg-indigo-950/80 text-indigo-100'
        }`}
      >
        <div className="flex-shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-400" />}
        </div>
        <div className="flex-1 pr-2">
          <h4 className="text-xs font-bold text-white tracking-wide uppercase">{notification.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{notification.message}</p>
        </div>
      </div>
    </div>
  );
}
