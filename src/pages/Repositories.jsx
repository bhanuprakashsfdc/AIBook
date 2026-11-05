import React, { useState, useMemo } from "react";
import { appData } from "../data/data";
import { getTagStats } from "../utils/dataHelpers";
import { filterAndSortResources } from "../utils/searchHelpers";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { ResourceGrid } from "../components/ResourceGrid";
import { GitBranch } from "lucide-react";

export function Repositories({ favoriteIds = [], onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedResourceType, setSelectedResourceType] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const reposData = appData.repositories || [];
  const availableTags = useMemo(() => getTagStats(reposData), [reposData]);

  const filteredResources = useMemo(() => {
    return filterAndSortResources(reposData, {
      searchQuery,
      selectedCategory,
      selectedResourceType,
      selectedTag,
      sortBy,
      favoritesOnly,
      favoriteIds
    });
  }, [reposData, searchQuery, selectedCategory, selectedResourceType, selectedTag, sortBy, favoritesOnly, favoriteIds]);

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedResourceType !== "all" || selectedTag !== "all" || sortBy !== "featured" || favoritesOnly;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedResourceType("all");
    setSelectedTag("all");
    setSortBy("featured");
    setFavoritesOnly(false);
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          <GitBranch className="w-3.5 h-3.5 text-indigo-500" />
          <span>GitHub Repositories</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Official Repositories & Agent Ecosystem
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Core open-source repositories including Ponytail, Taste Skill, Hallmark, starter kits, and evaluation tools.
        </p>
      </header>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search repositories by name, author, topic..."
      />

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

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Showing <strong className="text-slate-900 dark:text-slate-200 font-mono tabular-nums">{filteredResources.length}</strong> of{" "}
          <span className="font-mono tabular-nums">{reposData.length}</span> repositories
        </span>
      </div>

      <ResourceGrid
        resources={filteredResources}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        section="repositories"
        onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
      />
    </div>
  );
}
