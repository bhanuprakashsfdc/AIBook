import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Terminal, Sun, Moon, Star, ExternalLink, Database, Command, FileCode } from "lucide-react";

export function Header(props) {
  const { 
    theme, 
    onToggleTheme, 
    favoriteCount = 0, 
    onOpenDataModal,
    onOpenPalette,
    onOpenConfigModal
  } = props || {};
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Dashboard" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/prompts", label: "Prompts" },
    { to: "/repositories", label: "Repositories" },
    { to: "/favorites", label: "Favorites", badge: favoriteCount }
  ];

  const isLinkActive = (to) => {
    if (to === "/") return location.pathname === "/" || location.pathname === "/index.html";
    return location.pathname.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-950 transition-transform group-hover:scale-105">
            <Terminal className="w-4 h-4" />
          </div>
          <span>Claude Code Hub</span>
        </Link>

        {/* Zone 2: Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => {
            const active = isLinkActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
                  active
                    ? "text-slate-900 dark:text-white font-semibold border-b-2 border-slate-900 dark:border-slate-100"
                    : "hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    ({link.badge})
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Theme Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenPalette && (
            <button
              onClick={onOpenPalette}
              type="button"
              title="Search and commands (⌘K)"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Command className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden xl:inline">Spotlight</span>
              <kbd className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </button>
          )}

          {onOpenConfigModal && (
            <button
              onClick={onOpenConfigModal}
              type="button"
              title="Generate CLAUDE.md project file"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-500" />
              <span>CLAUDE.md</span>
            </button>
          )}

          {onOpenDataModal && (
            <button
              onClick={onOpenDataModal}
              type="button"
              title="View Data Architecture Schema & Export JSON"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Schema</span>
            </button>
          )}

          <button
            onClick={onToggleTheme}
            type="button"
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="https://github.com/DietrichGebert/ponytail"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white dark:text-slate-950 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <span>Ponytail Spec</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
