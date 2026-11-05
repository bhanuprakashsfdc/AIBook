import React from "react";
import { Sparkles, FolderGit2, MessageSquareCode, GitBranch, Wrench, Bookmark, LayoutGrid } from "lucide-react";

export function NavigationTabs({ activeTab, onSelectTab, counts = {} }) {
  const primaryTabs = [
    { id: "all", label: "All Resources", count: counts.all, icon: LayoutGrid, isPrimary: true },
    { id: "skills", label: "1. Claude Code Skills", count: counts.skills, icon: Sparkles, isPrimary: true },
    { id: "projects", label: "2. Claude Code Projects", count: counts.projects, icon: FolderGit2, isPrimary: true },
    { id: "prompts", label: "3. Claude Code Prompts", count: counts.prompts, icon: MessageSquareCode, isPrimary: true },
  ];

  const secondaryTabs = [
    { id: "repositories", label: "GitHub Repositories", count: counts.repositories, icon: GitBranch },
    { id: "reusable", label: "Reusable Skills", count: counts.reusable, icon: Wrench },
    { id: "favorites", label: "Favorites", count: counts.favorites, icon: Bookmark }
  ];

  const allTabs = [...primaryTabs, ...secondaryTabs];

  return (
    <div className="w-full border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none py-1">
        <nav className="flex space-x-1 sm:space-x-1.5" aria-label="Resource Directory Tabs">
          {allTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                type="button"
                className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span
                    className={`text-[11px] font-mono tabular-nums px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-white/20 dark:bg-slate-950/20 text-white dark:text-slate-950"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
