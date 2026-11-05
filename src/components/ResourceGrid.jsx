import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ResourceCard } from "./ResourceCard";
import { 
  Inbox, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  Star, 
  GitBranch, 
  ArrowUpRight, 
  Copy, 
  Check 
} from "lucide-react";
import { getResourceUrl } from "../utils/dataHelpers";

export function ResourceGrid({
  resources = [],
  favoriteIds = [],
  onToggleFavorite,
  section,
  onResetFilters,
  defaultViewMode = "grid"
}) {
  const [viewMode, setViewMode] = useState(defaultViewMode);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyCmd = (resource, e) => {
    e.preventDefault();
    e.stopPropagation();
    const cmd = resource.installation?.command || resource.commands?.[0]?.command;
    if (cmd) {
      navigator.clipboard.writeText(cmd);
      setCopiedId(resource.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (resources.length === 0) {
    return (
      <div className="py-16 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/20">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-3">
          <Inbox className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          No resources found
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          No matching skills, projects, or prompts found for the selected query and filters.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            type="button"
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Switcher Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>Viewing {resources.length} items</span>
        </div>

        <div className="flex items-center gap-1 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-label="Grid layout view"
            title="Grid view"
            className={`p-1.5 rounded transition-colors ${
              viewMode === "grid"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            aria-label="High-density list view"
            title="High-density table view"
            className={`p-1.5 rounded transition-colors ${
              viewMode === "table"
                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={favoriteIds.includes(resource.id)}
              onToggleFavorite={onToggleFavorite}
              section={section}
            />
          ))}
        </div>
      ) : (
        /* High-Density Developer Table View */
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-950/50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-4">Resource</th>
                  <th className="py-2.5 px-4 hidden sm:table-cell">Category</th>
                  <th className="py-2.5 px-4 hidden md:table-cell">Type</th>
                  <th className="py-2.5 px-4 hidden lg:table-cell">Tags</th>
                  <th className="py-2.5 px-4 text-right">Stars</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                {resources.map((resource) => {
                  const detailUrl = getResourceUrl(resource, section);
                  const isFav = favoriteIds.includes(resource.id);
                  const hasCmd = !!(resource.installation?.command || resource.commands?.[0]?.command);

                  return (
                    <tr
                      key={resource.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Title & Description */}
                      <td className="py-3 px-4 max-w-xs">
                        <Link
                          to={detailUrl}
                          className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 block truncate transition-colors"
                        >
                          {resource.title}
                        </Link>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {resource.description}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 hidden sm:table-cell text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {resource.category}
                      </td>

                      {/* Type */}
                      <td className="py-3 px-4 hidden md:table-cell text-slate-500 whitespace-nowrap">
                        {resource.resourceType}
                      </td>

                      {/* Tags */}
                      <td className="py-3 px-4 hidden lg:table-cell font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {Array.isArray(resource.tags) ? resource.tags.slice(0, 3).map(t => `#${t}`).join(" ") : "-"}
                      </td>

                      {/* Stars */}
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {typeof resource.stars === "number" ? resource.stars.toLocaleString() : "-"}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {hasCmd && (
                            <button
                              onClick={(e) => handleCopyCmd(resource, e)}
                              type="button"
                              title="Copy install command"
                              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                            >
                              {copiedId === resource.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}

                          <button
                            onClick={() => onToggleFavorite?.(resource.id)}
                            type="button"
                            title={isFav ? "Unfavorite" : "Favorite"}
                            className="p-1 rounded text-slate-400 hover:text-amber-500 transition-colors"
                          >
                            <Star className={`w-3.5 h-3.5 ${isFav ? "fill-amber-400 text-amber-400" : ""}`} />
                          </button>

                          {resource.githubUrl && (
                            <a
                              href={resource.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="GitHub Repository"
                              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                            >
                              <GitBranch className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <Link
                            to={detailUrl}
                            className="p-1 rounded text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            title="View Details (.html)"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
