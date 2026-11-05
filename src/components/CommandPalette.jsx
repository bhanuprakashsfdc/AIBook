import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Sparkles, 
  FolderGit2, 
  MessageSquareCode, 
  GitBranch, 
  FileCode, 
  Sun, 
  Moon, 
  Database, 
  Bookmark, 
  ArrowRight, 
  X,
  Command
} from "lucide-react";
import { getAllResources, getResourceUrl } from "../utils/dataHelpers";

export function CommandPalette({ 
  isOpen, 
  onClose, 
  theme, 
  onToggleTheme, 
  onOpenDataModal,
  onOpenConfigModal
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const allResources = React.useMemo(() => getAllResources(), []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Quick actions
  const quickActions = [
    {
      id: "action-config",
      title: "Generate CLAUDE.md Project Config",
      subtitle: "Tailor agent rules with Ponytail, Taste Skill, and Hallmark",
      icon: FileCode,
      category: "Tools",
      run: () => {
        onClose();
        onOpenConfigModal?.();
      }
    },
    {
      id: "action-theme",
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      subtitle: "Toggle color theme",
      icon: theme === "dark" ? Sun : Moon,
      category: "Preferences",
      run: () => {
        onToggleTheme?.();
        onClose();
      }
    },
    {
      id: "action-schema",
      title: "View Data Architecture & Export JSON",
      subtitle: "Inspect catalog schema and download hub database",
      icon: Database,
      category: "Tools",
      run: () => {
        onClose();
        onOpenDataModal?.();
      }
    },
    {
      id: "action-favorites",
      title: "Go to Bookmarked Favorites",
      subtitle: "View saved skills, projects, and prompts",
      icon: Bookmark,
      category: "Navigation",
      run: () => {
        onClose();
        navigate("/favorites");
      }
    }
  ];

  // Filtered resources
  const filteredResources = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allResources.filter(r => 
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (Array.isArray(r.tags) && r.tags.some(t => t.toLowerCase().includes(q))) ||
      r.category.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, allResources]);

  const filteredActions = React.useMemo(() => {
    if (!query.trim()) return quickActions;
    const q = query.toLowerCase();
    return quickActions.filter(a => 
      a.title.toLowerCase().includes(q) || a.subtitle.toLowerCase().includes(q)
    );
  }, [query, quickActions]);

  const totalItems = [...filteredActions, ...filteredResources];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, totalItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + totalItems.length) % Math.max(1, totalItems.length));
      } else if (e.key === "Enter" && totalItems.length > 0) {
        e.preventDefault();
        const selected = totalItems[selectedIndex];
        if (selected) {
          if (selected.run) {
            selected.run();
          } else {
            onClose();
            navigate(getResourceUrl(selected));
          }
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, totalItems, navigate, onClose]);

  if (!isOpen) return null;

  const getResourceIcon = (resource) => {
    switch (resource.primarySection) {
      case "skills": return Sparkles;
      case "projects": return FolderGit2;
      case "prompts": return MessageSquareCode;
      case "repositories": return GitBranch;
      default: return Sparkles;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-100">
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search resources..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {/* Quick Actions */}
          {filteredActions.length > 0 && (
            <div className="py-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
                Actions
              </div>
              {filteredActions.map((action, idx) => {
                const Icon = action.icon;
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={action.id}
                    onClick={action.run}
                    type="button"
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 shrink-0 opacity-70" />
                      <div className="truncate">
                        <div className="font-medium truncate">{action.title}</div>
                        <div className={`text-[11px] truncate ${isSelected ? "opacity-75" : "text-slate-400"}`}>
                          {action.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-60 ml-2" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Resources */}
          {filteredResources.length > 0 && (
            <div className="py-1">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
                Matching Resources
              </div>
              {filteredResources.map((res, rIdx) => {
                const actualIdx = filteredActions.length + rIdx;
                const isSelected = selectedIndex === actualIdx;
                const Icon = getResourceIcon(res);
                return (
                  <button
                    key={res.id}
                    onClick={() => {
                      onClose();
                      navigate(getResourceUrl(res));
                    }}
                    type="button"
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className="w-4 h-4 shrink-0 opacity-70" />
                      <div className="truncate">
                        <div className="font-semibold truncate">{res.title}</div>
                        <div className={`text-[11px] truncate ${isSelected ? "opacity-75" : "text-slate-400"}`}>
                          {res.category} · {res.resourceType}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
                      <span className="opacity-60">{res.slug}.html</span>
                      <ArrowRight className="w-3 h-3 opacity-60" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {totalItems.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Claude Code Spotlight</span>
        </div>
      </div>
    </div>
  );
}
