import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Sparkles, 
  FolderGit2, 
  MessageSquareCode, 
  GitBranch, 
  Star, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  Clock
} from "lucide-react";
import { categories } from "../data/categories";

export function Sidebar(props) {
  const { 
    favoriteCount = 0, 
    totalCounts = {}, 
    recentlyViewed = [],
    selectedCategory = "all",
    onSelectCategory,
    onOpenDataModal,
    onOpenConfigModal
  } = props || {};
  const location = useLocation();

  const sections = [
    { to: "/skills", label: "Skills", count: totalCounts.skills, icon: Sparkles },
    { to: "/projects", label: "Projects", count: totalCounts.projects, icon: FolderGit2 },
    { to: "/prompts", label: "Prompts", count: totalCounts.prompts, icon: MessageSquareCode },
    { to: "/repositories", label: "Repositories", count: totalCounts.repositories, icon: GitBranch },
    { to: "/favorites", label: "Favorites", count: favoriteCount, icon: Star }
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Primary Section Links */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-3">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1.5">
          Navigation
        </div>
        <nav className="space-y-0.5">
          {sections.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  active
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {typeof item.count === "number" && (
                  <span className="font-mono tabular-nums text-[11px] opacity-75">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Featured Triad (Ponytail, Taste Skill, Hallmark) */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          <span>Foundational Triad</span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <Link
            to="/skills/ponytail.html"
            className="block p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Ponytail</span>
              <span className="text-[10px] text-slate-500 font-mono">Discipline</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              Minimum code & YAGNI ruleset
            </p>
          </Link>

          <Link
            to="/skills/taste-skill.html"
            className="block p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Taste Skill</span>
              <span className="text-[10px] text-slate-500 font-mono">Typography</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              High-end design & zero-pill UI
            </p>
          </Link>

          <Link
            to="/skills/hallmark.html"
            className="block p-2.5 rounded-lg border border-slate-100 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Hallmark</span>
              <span className="text-[10px] text-slate-500 font-mono">Anti-Slop</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
              Strict design quality audits
            </p>
          </Link>
        </div>
      </div>

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Recently Viewed</span>
          </div>
          <ul className="space-y-1">
            {recentlyViewed.slice(0, 5).map((item) => (
              <li key={item.id}>
                <Link
                  to={`/${item.primarySection || 'skills'}/${item.slug}.html`}
                  className="block text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 truncate py-1 transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories quick filter list */}
      {onSelectCategory && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Categories</span>
          </div>
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => onSelectCategory("all")}
              className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                selectedCategory === "all"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              All Categories
            </button>
            {categories.filter(c => c.id !== "all").map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md transition-colors truncate ${
                  selectedCategory === cat.name
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Phase 2: Data Architecture & Extensibility */}
      {onOpenDataModal && (
        <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-1">
            Data Architecture
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Decoupled data files under <code className="font-mono text-indigo-500">/src/data/</code>. Add new records with zero JSX changes.
          </p>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={onOpenDataModal}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Schema & Export JSON</span>
            </button>
            {onOpenConfigModal && (
              <button
                type="button"
                onClick={onOpenConfigModal}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Generate CLAUDE.md</span>
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
