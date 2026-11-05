import React from "react";
import { Link } from "react-router-dom";
import { Star, GitBranch, ArrowUpRight, Copy, Check } from "lucide-react";
import { getResourceUrl } from "../utils/dataHelpers";

export function ResourceCard({
  resource,
  isFavorite,
  onToggleFavorite,
  section
}) {
  const [copied, setCopied] = React.useState(false);

  if (!resource) return null;

  const detailUrl = getResourceUrl(resource, section);

  const handleCopyCommand = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cmd = resource.installation?.command || resource.commands?.[0]?.command;
    if (cmd) {
      navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(resource.id);
  };

  return (
    <div className="group relative flex flex-col justify-between p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200">
      <div>
        {/* Top Kicker: Clean unboxed metadata with dot separators (Zero-Pill discipline) */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {resource.category || "General"}
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>{resource.resourceType || "Skill"}</span>
          </div>

          <button
            type="button"
            onClick={handleToggleFav}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            className="p-1 rounded-md text-slate-400 hover:text-amber-500 transition-colors"
          >
            <Star
              className={`w-4 h-4 transition-transform ${
                isFavorite
                  ? "fill-amber-400 text-amber-400 scale-110"
                  : "hover:scale-110"
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <Link to={detailUrl} className="focus:outline-none focus:underline">
            {resource.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {resource.description}
        </p>

        {/* Technology tags: Clean unboxed subtle text with slash separators */}
        {Array.isArray(resource.tags) && resource.tags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-500 font-mono">
            {resource.tags.slice(0, 4).map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
                  #{tag}
                </span>
                {idx < Math.min(resource.tags.length - 1, 3) && (
                  <span aria-hidden="true" className="opacity-30">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: GitHub Link, Date, and View Details Action */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          {resource.githubUrl ? (
            <a
              href={resource.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              title="Open GitHub Repository"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span className="truncate max-w-[100px] sm:max-w-[120px]">
                {resource.githubUrl.replace("https://github.com/", "")}
              </span>
            </a>
          ) : (
            <span>Internal</span>
          )}

          {resource.createdDate && (
            <>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="font-mono tabular-nums text-[11px]">
                {resource.createdDate}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {(resource.installation?.command || resource.commands?.[0]?.command) && (
            <button
              onClick={handleCopyCommand}
              type="button"
              title="Copy install command"
              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <Link
            to={detailUrl}
            className="inline-flex items-center gap-1 font-medium text-slate-900 dark:text-slate-200 hover:underline"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
