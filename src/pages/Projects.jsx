import React, { useState, useMemo } from "react";
import { appData } from "../data/data";
import { getTagStats } from "../utils/dataHelpers";
import { filterAndSortResources } from "../utils/searchHelpers";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { ResourceGrid } from "../components/ResourceGrid";
import { FolderGit2 } from "lucide-react";

export function Projects({ favoriteIds = [], onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedResourceType, setSelectedResourceType] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const projectsData = appData.projects || [];
  const availableTags = useMemo(() => getTagStats(projectsData), [projectsData]);

  const filteredResources = useMemo(() => {
    return filterAndSortResources(projectsData, {
      searchQuery,
      selectedCategory,
      selectedResourceType,
      selectedTag,
      sortBy,
      favoritesOnly,
      favoriteIds
    });
  }, [projectsData, searchQuery, selectedCategory, selectedResourceType, selectedTag, sortBy, favoritesOnly, favoriteIds]);

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
          <FolderGit2 className="w-3.5 h-3.5 text-indigo-500" />
          <span>Claude Code Projects</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Project Templates & Reference Applications
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Complete, runnable applications and boilerplates designed for AI agent workflows, full-stack React dashboards, and automation suites.
        </p>
      </header>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search Claude Code projects, boilerplates, templates..."
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
          <span className="font-mono tabular-nums">{projectsData.length}</span> projects
        </span>
      </div>

      <ResourceGrid
        resources={filteredResources}
        favoriteIds={favoriteIds}
        onToggleFavorite={onToggleFavorite}
        section="projects"
        onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
      />
    </div>
  );
}
