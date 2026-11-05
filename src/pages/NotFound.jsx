import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home, Sparkles, FolderGit2, MessageSquareCode, GitBranch } from "lucide-react";

export function NotFound({ message = "" } = {}) {
  return (
    <div className="max-w-xl mx-auto py-16 text-center space-y-6">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center mx-auto text-slate-500">
        <AlertCircle className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Resource Not Found (404)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {message || "The requested resource or page does not exist or has been relocated."}
        </p>
      </div>

      <div className="pt-2 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </Link>
      </div>

      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-left">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 text-center">
          Popular Hub Sections
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <Link
            to="/skills"
            className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900/40 flex items-center gap-2 text-slate-700 dark:text-slate-300"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Claude Code Skills</span>
          </Link>
          <Link
            to="/projects"
            className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900/40 flex items-center gap-2 text-slate-700 dark:text-slate-300"
          >
            <FolderGit2 className="w-4 h-4 text-emerald-500" />
            <span>Project Templates</span>
          </Link>
          <Link
            to="/prompts"
            className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900/40 flex items-center gap-2 text-slate-700 dark:text-slate-300"
          >
            <MessageSquareCode className="w-4 h-4 text-amber-500" />
            <span>Directives & Prompts</span>
          </Link>
          <Link
            to="/repositories"
            className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900/40 flex items-center gap-2 text-slate-700 dark:text-slate-300"
          >
            <GitBranch className="w-4 h-4 text-sky-500" />
            <span>GitHub Repositories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
