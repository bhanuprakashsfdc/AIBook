import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllResources, getTagStats } from "../utils/dataHelpers";
import { filterAndSortResources } from "../utils/searchHelpers";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { ResourceGrid } from "../components/ResourceGrid";
import { Star, BookmarkX, ArrowRight } from "lucide-react";

export function Favorites({ favoriteIds = [], onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedResourceType, setSelectedResourceType] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const allResources = useMemo(() => getAllResources(), []);
  
  const favoriteResources = useMemo(() => {
    return allResources.filter(item => favoriteIds.includes(item.id));
  }, [allResources, favoriteIds]);

  const availableTags = useMemo(() => getTagStats(favoriteResources), [favoriteResources]);

  const filteredResources = useMemo(() => {
    return filterAndSortResources(favoriteResources, {
      searchQuery,
      selectedCategory,
      selectedResourceType,
      selectedTag,
      sortBy,
      favoritesOnly: false,
      favoriteIds
    });
  }, [favoriteResources, searchQuery, selectedCategory, selectedResourceType, selectedTag, sortBy, favoriteIds]);

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedResourceType !== "all" || selectedTag !== "all" || sortBy !== "featured";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedResourceType("all");
    setSelectedTag("all");
    setSortBy("featured");
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-500" />
          <span>Saved Resources</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Your Bookmarked Resources
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
          Quickly access and copy commands for your favorited Claude Code skills, templates, prompts, and repositories. Stored locally in your browser.
        </p>
      </header>

      {favoriteResources.length === 0 ? (
        <div className="py-16 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/20">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <BookmarkX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            No favorited resources yet
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Click the star icon on any skill, project, or prompt card to pin it here for quick reference.
          </p>
          <div className="mt-5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 transition-colors"
            >
              <span>Explore All Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={`Search ${favoriteResources.length} saved favorites...`}
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
            favoritesOnly={false}
            onToggleFavoritesOnly={() => {}}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-slate-900 dark:text-slate-200 font-mono tabular-nums">{filteredResources.length}</strong> of{" "}
              <span className="font-mono tabular-nums">{favoriteResources.length}</span> favorited items
            </span>
          </div>

          <ResourceGrid
            resources={filteredResources}
            favoriteIds={favoriteIds}
            onToggleFavorite={onToggleFavorite}
            onResetFilters={hasActiveFilters ? handleResetFilters : undefined}
          />
        </>
      )}
    </div>
  );
}
