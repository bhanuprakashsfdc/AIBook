import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  GitBranch, 
  BookOpen, 
  Copy, 
  Check, 
  Terminal, 
  ShieldCheck, 
  Code2, 
  FileText, 
  Layers, 
  ExternalLink,
  Sparkles,
  Share2,
  ChevronRight
} from "lucide-react";
import { getRelatedResources, getResourceUrl } from "../utils/dataHelpers";

export function ResourceDetails({
  resource,
  isFavorite,
  onToggleFavorite,
  currentSection = "skills"
}) {
  const navigate = useNavigate();
  const [copiedMap, setCopiedMap] = useState({});

  if (!resource) return null;

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedMap((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const handleShareUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedMap((prev) => ({ ...prev, shareUrl: true }));
      setTimeout(() => {
        setCopiedMap((prev) => ({ ...prev, shareUrl: false }));
      }, 2000);
    }
  };

  const related = getRelatedResources(resource.relatedResourceSlugs || []);
  const sectionLabel = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Breadcrumb Navigation & Top Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Breadcrumb trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link to="/" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
            Hub
          </Link>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <Link to={`/${currentSection}`} className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
            {sectionLabel}
          </Link>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="font-mono text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
            {resource.slug}.html
          </span>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShareUrl}
            type="button"
            title="Copy page URL"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            {copiedMap.shareUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share URL</span>
              </>
            )}
          </button>

          <button
            onClick={() => onToggleFavorite(resource.id)}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isFavorite
                ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />
            <span>{isFavorite ? "Favorited" : "Favorite"}</span>
          </button>

          {resource.githubUrl && (
            <a
              href={resource.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
        </div>
      </div>

      {/* Main Header Card */}
      <header className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8">
        {/* Unboxed Metadata (Zero-Pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <span className="font-semibold text-slate-900 dark:text-slate-200">
            {resource.category || "General"}
          </span>
          <span aria-hidden="true">·</span>
          <span>{resource.resourceType || "Skill"}</span>
          {resource.version && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{resource.version}</span>
            </>
          )}
          {resource.createdDate && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{resource.createdDate}</span>
            </>
          )}
          {typeof resource.stars === "number" && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                {resource.stars.toLocaleString()} stars
              </span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {resource.title}
        </h1>

        <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {resource.description}
        </p>

        {/* Tags */}
        {Array.isArray(resource.tags) && resource.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="text-slate-400 dark:text-slate-500">Tags:</span>
            {resource.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span className="hover:text-slate-800 dark:hover:text-slate-200">
                  #{tag}
                </span>
                {idx < resource.tags.length - 1 && <span aria-hidden="true">/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* 1. Resource Overview */}
      {resource.overview && (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-slate-500" />
            <span>Resource Overview</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {resource.overview}
          </p>
        </section>
      )}

      {/* Special: System / Task Prompt Text */}
      {resource.promptText && (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Prompt Template</span>
            </h2>
            <button
              onClick={() => handleCopy(resource.promptText, "promptText")}
              type="button"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {copiedMap["promptText"] ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-lg bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {resource.promptText}
          </pre>
        </section>
      )}

      {/* 2. Installation Instructions */}
      {resource.installation && (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span>Installation & Setup</span>
            </h2>
            {resource.installation.command && (
              <button
                onClick={() => handleCopy(resource.installation.command, "installCmd")}
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedMap["installCmd"] ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Command</span>
                  </>
                )}
              </button>
            )}
          </div>

          {resource.installation.instructions && (
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
              {resource.installation.instructions}
            </p>
          )}

          {resource.installation.command && (
            <div className="relative">
              <pre className="p-3.5 rounded-lg bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                {resource.installation.command}
              </pre>
            </div>
          )}
        </section>
      )}

      {/* 3. Commands */}
      {Array.isArray(resource.commands) && resource.commands.length > 0 && (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-500" />
            <span>Available Commands</span>
          </h2>
          <div className="space-y-3">
            {resource.commands.map((cmd, idx) => (
              <div
                key={cmd.name || idx}
                className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-950/40"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {cmd.name}
                  </span>
                  <button
                    onClick={() => handleCopy(cmd.command, `cmd-${idx}`)}
                    type="button"
                    className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    title="Copy command"
                  >
                    {copiedMap[`cmd-${idx}`] ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <pre className="p-2 rounded bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                  {cmd.command}
                </pre>
                {cmd.description && (
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    {cmd.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Features */}
      {Array.isArray(resource.features) && resource.features.length > 0 && (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-500" />
            <span>Key Features & Capabilities</span>
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {resource.features.map((feat, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-2 shrink-0" />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Prerequisites & Usage */}
      {(resource.prerequisites || resource.usage) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(resource.prerequisites) && resource.prerequisites.length > 0 && (
            <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2.5 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Prerequisites</span>
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                {resource.prerequisites.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono">·</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {resource.usage && (
            <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2.5 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Usage & Best Practices</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                {resource.usage.instructions}
              </p>
              {Array.isArray(resource.usage.tips) && (
                <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  {resource.usage.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-mono">→</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      )}

      {/* 6. Code Examples */}
      {Array.isArray(resource.codeExamples) && resource.codeExamples.length > 0 && (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-slate-500" />
            <span>Code Examples</span>
          </h2>
          <div className="space-y-4">
            {resource.codeExamples.map((ex, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-200 dark:border-slate-800">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {ex.title || `Example ${idx + 1}`}
                  </span>
                  <div className="flex items-center gap-2">
                    {ex.language && (
                      <span className="font-mono text-[11px] text-slate-400">
                        {ex.language}
                      </span>
                    )}
                    <button
                      onClick={() => handleCopy(ex.code, `ex-${idx}`)}
                      type="button"
                      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      {copiedMap[`ex-${idx}`] ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedMap[`ex-${idx}`] ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                </div>
                <pre className="p-4 bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed">
                  {ex.code}
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. External Documentation & Repository links */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            External Resources
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Official documentation, repositories, and upstream links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {resource.documentationUrl && (
            <a
              href={resource.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Documentation</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}

          {resource.githubUrl && (
            <a
              href={resource.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Open GitHub Repository</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          )}
        </div>
      </section>

      {/* 8. Related Resources */}
      {related.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Related Resources
            </h2>
            <span className="text-xs text-slate-500 font-mono tabular-nums">
              {related.length} linked items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {related.map((item) => (
              <Link
                key={item.id}
                to={getResourceUrl(item)}
                className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-400 dark:hover:border-slate-600 transition-colors block group"
              >
                <div className="text-[11px] text-slate-400 font-medium truncate">
                  {item.category}
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mt-1 transition-colors">
                  {item.title}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
