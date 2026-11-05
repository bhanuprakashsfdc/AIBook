import React, { useState } from "react";
import { 
  X, 
  Code2, 
  Database, 
  Copy, 
  Check, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  FileJson
} from "lucide-react";
import { 
  RESOURCE_SKELETON_TEMPLATE, 
  getHubStatistics, 
  exportHubDataAsJson, 
  validateResourceRecord 
} from "../utils/dataHelpers";

export function DataSchemaModal({ isOpen, onClose }) {
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [validationInput, setValidationInput] = useState("");
  const [validationResult, setValidationResult] = useState(null);

  if (!isOpen) return null;

  const stats = getHubStatistics();

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(RESOURCE_SKELETON_TEMPLATE);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const handleDownloadJson = () => {
    const jsonStr = exportHubDataAsJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `claude-code-hub-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleValidate = () => {
    if (!validationInput.trim()) {
      setValidationResult(null);
      return;
    }
    try {
      const parsed = JSON.parse(validationInput);
      const result = validateResourceRecord(parsed);
      setValidationResult(result);
    } catch (err) {
      setValidationResult({
        valid: false,
        errors: [`JSON Syntax Error: ${err.message}`]
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Data Architecture & Extensibility
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Phase 2: Decoupled JavaScript data layer under <code className="font-mono text-indigo-500">/src/data/</code>
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

        {/* Live Catalog Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="text-[11px] font-medium text-slate-500">Total Records</div>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {stats.totalResources}
            </div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="text-[11px] font-medium text-slate-500">Skills & Projects</div>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {stats.totalSkills + stats.totalProjects}
            </div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="text-[11px] font-medium text-slate-500">Prompts & Repos</div>
            <div className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
              {stats.totalPrompts + stats.totalRepositories}
            </div>
          </div>
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="text-[11px] font-medium text-slate-500">Total Stars</div>
            <div className="text-xl font-bold font-mono tabular-nums text-amber-500">
              {stats.totalStars.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Core Architecture Rule */}
        <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs text-indigo-900 dark:text-indigo-200 space-y-1 leading-relaxed">
          <strong>Mandatory Data Architecture Principle:</strong>
          <p>
            You can add hundreds of skills, projects, prompts, and repositories simply by appending records to files inside <code className="font-mono bg-white/60 dark:bg-slate-900/60 px-1 py-0.5 rounded">/src/data/</code> without modifying any React component or routing logic.
          </p>
        </div>

        {/* Record Skeleton Template */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>Standard Resource Record Template</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTemplate}
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? "Copied" : "Copy Skeleton"}</span>
              </button>
              <button
                onClick={handleDownloadJson}
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Hub JSON</span>
              </button>
            </div>
          </div>
          <pre className="p-3.5 rounded-lg bg-slate-950 text-slate-100 font-mono text-xs max-h-48 overflow-y-auto border border-slate-800 leading-relaxed">
            {RESOURCE_SKELETON_TEMPLATE}
          </pre>
        </div>

        {/* Live Schema Validator */}
        <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <FileJson className="w-3.5 h-3.5" />
            <span>Interactive Schema Validator</span>
          </label>
          <p className="text-xs text-slate-500">
            Paste a new JSON record below to test if it conforms to the required data schema before saving.
          </p>
          <textarea
            value={validationInput}
            onChange={(e) => setValidationInput(e.target.value)}
            placeholder='{ "id": "skill-demo", "title": "Demo", "slug": "demo", "description": "...", "category": "AI Coding Tools", "resourceType": "Coding Skill", "tags": ["Claude Code"] }'
            rows={4}
            className="w-full p-3 font-mono text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-300"
          />
          <div className="flex items-center justify-between">
            <button
              onClick={handleValidate}
              type="button"
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 transition-colors"
            >
              Validate Schema
            </button>
            {validationResult && (
              <div className="flex items-center gap-1.5 text-xs font-medium">
                {validationResult.valid ? (
                  <span className="text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Schema Valid: Ready to add to /src/data/</span>
                  </span>
                ) : (
                  <span className="text-rose-500 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{validationResult.errors[0]}</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
