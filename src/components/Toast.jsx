import React, { useEffect } from "react";
import { Check, Info, X } from "lucide-react";

export function Toast({ message, type = "success", onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl text-xs font-medium text-slate-800 dark:text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-150">
      {type === "success" ? (
        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-indigo-500 shrink-0" />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        type="button"
        className="ml-2 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
