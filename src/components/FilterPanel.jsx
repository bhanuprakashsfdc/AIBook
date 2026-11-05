import React from "react";
import { Filter, RotateCcw, ArrowUpDown, Tag, Bookmark } from "lucide-react";
import { categories, resourceTypes } from "../data/categories";

export function FilterPanel({
  selectedCategory,
  onSelectCategory,
  selectedResourceType,
  onSelectResourceType,
  selectedTag,
  onSelectTag,
  availableTags = [],
  sortBy,
  onSelectSortBy,
  favoritesOnly,
  onToggleFavoritesOnly,
  onResetFilters,
  hasActiveFilters
}) {
  return (
    <div className="w-full space-y-4 py-2">
      {/* Primary filter row: Category, Resource Type, Sort, Favorites */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 pr-8 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-300 transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c.id !== "all").map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Resource Type Dropdown */}
          <div className="relative">
            <select
              value={selectedResourceType}
              onChange={(e) => onSelectResourceType(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 pr-8 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-300 transition-colors"
            >
              {resourceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <Tag className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 pr-8 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-300 transition-colors"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="stars">Sort: Most Stars</option>
              <option value="recently-added">Sort: Recently Added</option>
              <option value="alphabetical">Sort: Name (A-Z)</option>
              <option value="alphabetical-desc">Sort: Name (Z-A)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Favorites Only Toggle */}
          <button
            onClick={onToggleFavoritesOnly}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
              favoritesOnly
                ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${favoritesOnly ? "fill-amber-500 text-amber-500" : ""}`} />
            <span>Favorites</span>
          </button>
        </div>

        {/* Reset button if active filters */}
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            type="button"
            className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors py-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Popular tag bar */}
      {availableTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs text-slate-500 dark:text-slate-400">
          <span className="shrink-0 text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mr-1">
            Tags:
          </span>
          <button
            onClick={() => onSelectTag("all")}
            type="button"
            className={`px-2 py-0.5 rounded text-xs transition-colors shrink-0 ${
              selectedTag === "all"
                ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            all
          </button>
          {availableTags.slice(0, 10).map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() => onSelectTag(selectedTag === tag ? "all" : tag)}
              type="button"
              className={`px-2 py-0.5 rounded text-xs transition-colors shrink-0 ${
                selectedTag === tag
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              #{tag} <span className="text-[10px] tabular-nums opacity-70">({count})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
