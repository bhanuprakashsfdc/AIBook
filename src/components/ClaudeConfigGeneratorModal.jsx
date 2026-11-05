import React, { useState, useMemo } from "react";
import { X, FileCode, Copy, Check, Download, Sparkles, Terminal, ShieldCheck } from "lucide-react";

export function ClaudeConfigGeneratorModal({ isOpen, onClose, onShowToast }) {
  const [selectedRules, setSelectedRules] = useState({
    ponytail: true,
    taste: true,
    hallmark: true,
    react19: true,
    tdd: false,
    dataLayer: true
  });

  const [copied, setCopied] = useState(false);

  const toggleRule = (key) => {
    setSelectedRules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const generatedConfig = useMemo(() => {
    const lines = [];
    lines.push("# Project Guidelines & Agent Directives (CLAUDE.md)");
    lines.push("");
    lines.push("## Core Architecture & Stack");
    lines.push("- Framework: React 19 + Vite + TypeScript / ES6+");
    lines.push("- Styling: Tailwind CSS v4 (@custom-variant dark for light/dark theming)");
    lines.push("- Icons: Lucide React");
    lines.push("");

    if (selectedRules.ponytail) {
      lines.push("## 1. Coding Discipline – Ponytail (Mandatory)");
      lines.push("Reference: https://github.com/DietrichGebert/ponytail | https://ponytail.dev/");
      lines.push("- Write the minimum code required to solve the stated problem.");
      lines.push("- Follow YAGNI principles strictly; never introduce speculative abstractions.");
      lines.push("- Inspect existing components and utilities before creating new files.");
      lines.push("- Modify files surgically using targeted block replacements instead of full rewrites.");
      lines.push("- Prefer native browser and ECMAScript APIs over external runtime packages.");
      lines.push("- Plugin commands:");
      lines.push("  /plugin marketplace add DietrichGebert/ponytail");
      lines.push("  /plugin install ponytail@ponytail");
      lines.push("");
    }

    if (selectedRules.taste || selectedRules.hallmark) {
      lines.push("## 2. Frontend Design & Quality (Taste Skill & Hallmark)");
      if (selectedRules.taste) {
        lines.push("- Taste Skill (https://github.com/Leonxlnx/taste-skill):");
        lines.push("  - Zero-pill metadata discipline: Render dates, categories, and tags as clean unboxed text with · and / separators.");
        lines.push("  - 2+1 font discipline: Pair clean display/body sans (Plus Jakarta Sans) with tabular monospace figures (JetBrains Mono tabular-nums).");
        lines.push("  - 60-30-10 color allocation: 60% neutral background, 30% structural surfaces, 10% high-intent accent.");
      }
      if (selectedRules.hallmark) {
        lines.push("- Hallmark (https://github.com/Nutlope/hallmark):");
        lines.push("  - Anti-AI-slop rule: Prohibit mechanical comments (// 01), fake status telemetry dots, and nested card-in-card boxes.");
        lines.push("  - Top Bar Contract: Exactly 3 zones separated by gap-8 (Wordmark, single-line links, 1 primary action).");
        lines.push("  - Contrast & touch targets: Maintain WCAG AA contrast (4.5:1) and minimum 40px touch areas.");
      }
      lines.push("");
    }

    if (selectedRules.dataLayer) {
      lines.push("## 3. Data Architecture Isolation");
      lines.push("- Never hardcode resource information or domain records inside JSX components.");
      lines.push("- Store all data entities in dedicated JavaScript/TypeScript files under /src/data/.");
      lines.push("- Central data aggregator: /src/data/data.js acts as the single point of truth.");
      lines.push("- Adding or modifying records must never require altering React presentation components.");
      lines.push("");
    }

    if (selectedRules.tdd) {
      lines.push("## 4. Test-Driven Verification (TDD)");
      lines.push("- Author reproducing unit tests with Vitest before authoring implementation code.");
      lines.push("- Verify all tests complete within 200ms to maintain fast agent feedback loops.");
      lines.push("- Use deterministic assertions without relying on fragile full-DOM snapshots.");
      lines.push("");
    }

    lines.push("## 5. Verification Commands");
    lines.push("- Check type integrity: `npm run lint` or `tsc --noEmit`");
    lines.push("- Build production assets: `npm run build`");
    lines.push("- Run dev preview: `npm run dev`");

    return lines.join("\n");
  }, [selectedRules]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedConfig);
    setCopied(true);
    onShowToast?.("Copied CLAUDE.md to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedConfig], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CLAUDE.md";
    a.click();
    URL.revokeObjectURL(url);
    onShowToast?.("Downloaded CLAUDE.md file");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-950">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                CLAUDE.md Project Configurator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate production guidelines for Claude Code agent sessions in seconds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkbox Options */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Select Active Directives & Skills
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <input
                type="checkbox"
                checked={selectedRules.ponytail}
                onChange={() => toggleRule("ponytail")}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Ponytail Minimalist Rule</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <input
                type="checkbox"
                checked={selectedRules.taste}
                onChange={() => toggleRule("taste")}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Taste Skill Typography & Zero-Pills</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <input
                type="checkbox"
                checked={selectedRules.hallmark}
                onChange={() => toggleRule("hallmark")}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Hallmark Anti-AI-Slop Checks</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <input
                type="checkbox"
                checked={selectedRules.dataLayer}
                onChange={() => toggleRule("dataLayer")}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Data Architecture Isolation</span>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <input
                type="checkbox"
                checked={selectedRules.tdd}
                onChange={() => toggleRule("tdd")}
                className="rounded text-indigo-600 focus:ring-0"
              />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Test-Driven Development (TDD)</span>
            </label>
          </div>
        </div>

        {/* Live Preview of CLAUDE.md */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-400">
              Generated CLAUDE.md Preview
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Markdown"}</span>
              </button>

              <button
                onClick={handleDownload}
                type="button"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CLAUDE.md</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs max-h-64 overflow-y-auto border border-slate-800 leading-relaxed">
            {generatedConfig}
          </pre>
        </div>
      </div>
    </div>
  );
}
