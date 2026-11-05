import { Link, useSearchParams } from "react-router-dom";
import { appData } from "../data/data";
import { getAllResources, getTagStats } from "../utils/dataHelpers";
import { filterAndSortResources } from "../utils/searchHelpers";
import { NavigationTabs } from "../components/NavigationTabs";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { ResourceGrid } from "../components/ResourceGrid";
import { 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  Code2,
  Copy,
  Check
} from "lucide-react";

import React, { useState, useMemo } from "react";

export function Dashboard(props) {
  const { favoriteIds = [], onToggleFavorite } = props || {};
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial states from URL params for bookmarkability & refresh persistence
  const activeTab = searchParams.get("tab") || "all";
  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const selectedResourceType = searchParams.get("type") || "all";
  const selectedTag = searchParams.get("tag") || "all";
  const sortBy = searchParams.get("sort") || "featured";
  const favoritesOnly = searchParams.get("fav") === "true";
  const [copiedKey, setCopiedKey] = useState(null);

  // Helper to update URL search params surgically
  const updateParam = (key, val) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!val || val === "all" || val === "featured" || val === "false") {
        next.delete(key);
      } else {
        next.set(key, val);
      }
      return next;
    }, { replace: true });
  };

  const setActiveTab = (tab) => updateParam("tab", tab);
  const setSearchQuery = (q) => updateParam("q", q);
  const setSelectedCategory = (cat) => updateParam("category", cat);
  const setSelectedResourceType = (t) => updateParam("type", t);
  const setSelectedTag = (tag) => updateParam("tag", tag);
  const setSortBy = (s) => updateParam("sort", s);
  const setFavoritesOnly = (f) => updateParam("fav", f ? "true" : "false");

  // All combined resources
  const allResources = useMemo(() => getAllResources(), []);

  // Compute dataset based on active tab
  const baseResources = useMemo(() => {
    switch (activeTab) {
      case "skills":
        return appData.skills || [];
      case "projects":
        return appData.projects || [];
      case "prompts":
        return appData.prompts || [];
      case "repositories":
        return appData.repositories || [];
      case "reusable":
        return (appData.skills || []).filter(s => s.resourceType?.includes("Skill"));
      case "favorites":
        return allResources.filter(item => favoriteIds.includes(item.id));
      case "all":
      default:
        return allResources;
    }
  }, [activeTab, allResources, favoriteIds]);

  // Tab counts
  const tabCounts = useMemo(() => ({
    all: allResources.length,
    skills: (appData.skills || []).length,
    projects: (appData.projects || []).length,
    prompts: (appData.prompts || []).length,
    repositories: (appData.repositories || []).length,
    reusable: (appData.skills || []).filter(s => s.resourceType?.includes("Skill")).length,
    favorites: favoriteIds.length
  }), [allResources, favoriteIds]);

  // Available tags for the active dataset
  const availableTags = useMemo(() => getTagStats(baseResources), [baseResources]);

  // Filtered and sorted resources
  const filteredResources = useMemo(() => {
    return filterAndSortResources(baseResources, {
      searchQuery,
      selectedCategory,
      selectedResourceType,
      selectedTag,
      sortBy,
      favoritesOnly: favoritesOnly || activeTab === "favorites",
      favoriteIds
    });
  }, [
    baseResources,
    searchQuery,
    selectedCategory,
    selectedResourceType,
    selectedTag,
    sortBy,
    favoritesOnly,
    activeTab,
    favoriteIds
  ]);

  const hasActiveFilters = 
    searchQuery !== "" || 
    selectedCategory !== "all" || 
    selectedResourceType !== "all" || 
    selectedTag !== "all" || 
    sortBy !== "featured" || 
    favoritesOnly;

  const handleResetFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams();
      const tab = prev.get("tab");
      if (tab && tab !== "all") next.set("tab", tab);
      return next;
    }, { replace: true });
  };

  const copySnippet = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            <span>Claude Code Hub</span>
            <span aria-hidden="true">·</span>
            <span>Ponytail + Taste + Hallmark</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
            Organize Claude Code Skills, Projects, Prompts & Repositories
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A production-ready resource portal built with Ponytail coding discipline, Taste Skill typography, and Hallmark anti-slop guidelines. Completely driven by local data architecture.
          </p>
        </div>

        {/* Quick Discipline Bar: 3 Pillars */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-500" />
                  Ponytail Discipline
                </span>
                <Link to="/skills/ponytail.html" className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
                  Spec →
                </Link>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Minimum code required, strict YAGNI, native APIs, zero bloat.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">/plugin install ponytail</span>
              <button
                onClick={() => copySnippet("/plugin marketplace add DietrichGebert/ponytail\n/plugin install ponytail@ponytail", "pony")}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                title="Copy installation"
              >
                {copiedKey === "pony" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Taste Skill
                </span>
                <Link to="/skills/taste-skill.html" className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
                  Spec →
                </Link>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                2+1 typography, zero-pill metadata, 60-30-10 color discipline.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">npx skills add taste-skill</span>
              <button
                onClick={() => copySnippet("npx skills add https://github.com/Leonxlnx/taste-skill", "taste")}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                title="Copy installation"
              >
                {copiedKey === "taste" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Hallmark Quality
                </span>
                <Link to="/skills/hallmark.html" className="text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
                  Spec →
                </Link>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Anti-AI-slop design checks, WCAG AA contrast, top-bar contract.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">npx skills add hallmark</span>
              <button
                onClick={() => copySnippet("npx skills add nutlope/hallmark -g --agent claude-code", "hallmark")}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                title="Copy installation"
              >
                {copiedKey === "hallmark" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs (Primary 3 + Extra 3) */}
      <NavigationTabs
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        counts={tabCounts}
      />

      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={`Search ${baseResources.length} resources in ${activeTab}...`}
      />

      {/* Filter Panel */}
      <FilterPanel
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedResourceType={selectedResourceType}
        onSelectResourceType={setSelectedResourceType}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        availableTags={availableTags}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        favoritesOnly={favoritesOnly}
        onToggleFavoritesOnly={() => setFavoritesOnly(!favoritesOnly)}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Results Count & Current Active View */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <span>
          Showing <strong className="text-slate-900 dark:text-slate-200 font-mono tabular-nums">{filteredResources.length}</strong> of{" "}
          <span className="font-mono tabular-nums">{baseResources.length}</span> resources
        </span>
        {hasActiveFilters && (
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">
            Filtered view
          </span>
        )}
      </div>

      {/* Resource Grid */}
      <ResourceGrid
        resources={filteredResources}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        section={activeTab === "all" ? undefined : activeTab}
        onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
      />
    </div>
  );
}
