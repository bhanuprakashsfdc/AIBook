import React, { useState, useMemo } from "react";
import { appData } from "../data/data";
import { getTagStats } from "../utils/dataHelpers";
import { filterAndSortResources } from "../utils/searchHelpers";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { ResourceGrid } from "../components/ResourceGrid";
import { Sparkles } from "lucide-react";

export function Skills({ favoriteIds = [], onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedResourceType, setSelectedResourceType] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const skillsData = appData.skills || [];
  const availableTags = useMemo(() => getTagStats(skillsData), [skillsData]);

  const filteredResources = useMemo(() => {
    return filterAndSortResources(skillsData, {
      searchQuery,
      selectedCategory,
      selectedResourceType,
      selectedTag,
      sortBy,
      favoritesOnly,
      favoriteIds
    });
  }, [skillsData, searchQuery, selectedCategory, selectedResourceType, selectedTag, sortBy, favoritesOnly, favoriteIds]);

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
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Claude Code Skills</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Agent Skills & Coding Disciplines
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Modular capabilities for Claude Code, including Ponytail minimalism, Taste Skill typography, Hallmark design quality, and modern React 19 architecture.
        </p>
      </header>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Claude Code skills, disciplines, tags..."
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
          <span className="font-mono tabular-nums">{skillsData.length}</span> skills
        </span>
      </div>

      <ResourceGrid
        resources={filteredResources}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        section="skills"
        onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
      />
    </div>
  );
}
