/**
 * Curated Claude Code system prompts, task prompts, and engineering directives.
 */
export const prompts = [
  {
    id: "prompt-react-app-builder",
    title: "React Application Architect Prompt",
    slug: "react-app-builder",
    description: "Battle-tested system prompt for scaffolding clean, modular, scalable React applications.",
    overview: "This master prompt guides Claude Code to build production-ready React applications with zero technical debt. It enforces modular folder structures, pristine TypeScript types, Tailwind CSS v4 design tokens, centralized data layers, and clean separation between presentational and container components.",
    category: "Full-Stack Development",
    tags: ["System Prompt", "React", "Architecture", "Best Practices", "Claude Code"],
    githubUrl: "https://github.com/anthropics/claude-prompts",
    documentationUrl: "https://docs.anthropic.com/en/docs/system-prompts",
    resourceType: "System Prompt",
    createdDate: "2025-01-20",
    stars: 3120,
    author: "Claude Prompt Engineering",
    license: "CC-BY-4.0",
    version: "v3.1.0",
    promptText: `Act as a Senior React Architect and UI/UX Designer.

When building React applications:
1. Always decouple application data from presentation components. Store domain datasets in dedicated JavaScript/TypeScript files under /src/data/.
2. Enforce Ponytail discipline: write the minimum code required, follow YAGNI, and avoid bespoke wrapper libraries when native browser or React APIs suffice.
3. Follow Taste Skill and Hallmark design standards: avoid purple AI gradients, static pill boxes for metadata, and nested card-in-card containers.
4. Ensure full keyboard accessibility and WCAG AA contrast in both light and dark modes.
5. Provide resilient error boundaries and empty state feedback for all dynamic listings.`,
    features: [
      "Strict data-layer isolation: zero hardcoded data records in JSX markup",
      "Built-in Ponytail discipline preventing code bloat and premature abstraction",
      "Taste Skill & Hallmark visual guardrails preventing generic AI aesthetic slop",
      "Accessibility and keyboard navigation mandates",
      "Dual-theme dark/light mode consistency guarantees"
    ],
    installation: {
      instructions: "Set as the system prompt in your Claude Code CLAUDE.md or project settings.",
      command: "echo 'Paste prompt content into CLAUDE.md' > CLAUDE.md"
    },
    prerequisites: ["Claude Code CLI or Claude desktop interface"],
    usage: {
      instructions: "Copy prompt directly into project's CLAUDE.md file or provide as the initial directive in a new engineering session.",
      tips: [
        "Include reference to local src/data architecture.",
        "Combine with Ponytail plugin for maximum discipline."
      ]
    },
    commands: [
      {
        name: "Copy to CLAUDE.md",
        command: "cp prompts/react-builder.md CLAUDE.md",
        description: "Applies the builder prompt to the current workspace"
      }
    ],
    codeExamples: [
      {
        title: "CLAUDE.md Integration",
        language: "markdown",
        code: `# Project Guidelines\n- Framework: React 19 + Vite + Tailwind CSS v4\n- Coding discipline: Ponytail minimal code rule\n- Design reference: Taste Skill & Hallmark anti-slop principles\n- Data rule: All items come from /src/data/`
      }
    ],
    relatedResourceSlugs: ["ponytail", "taste-skill", "react-development"]
  },
  {
    id: "prompt-code-review",
    title: "Senior Staff Engineer Code Review Directive",
    slug: "code-review",
    description: "Surgical, pragmatic code review prompt focusing on correctness, security, performance, and YAGNI.",
    overview: "Directs Claude Code to review pull requests, commits, and diffs with the rigor of a Senior Staff Engineer. It prioritizes real bugs, race conditions, memory leaks, security flaws, and architectural debt while avoiding nitpicks over cosmetic styling.",
    category: "Testing & QA",
    tags: ["Code Review", "Staff Engineer", "Quality", "Security", "YAGNI"],
    githubUrl: "https://github.com/anthropics/claude-prompts",
    documentationUrl: "https://docs.anthropic.com/en/docs/system-prompts",
    resourceType: "Task Prompt",
    createdDate: "2025-02-01",
    stars: 2750,
    author: "Claude Prompt Engineering",
    license: "CC-BY-4.0",
    version: "v2.4.0",
    promptText: `You are a Senior Staff Engineer reviewing code changes.

Review the provided diff or file for:
1. Correctness: Unhandled null/undefined values, off-by-one errors, infinite loops, and unhandled Promise rejections.
2. Security: Injection vulnerabilities, unescaped user input, leaked tokens, and insecure direct object references.
3. Performance: Unnecessary re-renders, O(N^2) loops on unbounded sets, and memory leaks from uncleaned event listeners.
4. Ponytail & YAGNI Compliance: Flag unnecessary abstractions, dead code, and speculative generic helpers that are only used in one place.
5. Provide actionable, surgical code replacements with explanations under 3 sentences per finding.`,
    features: [
      "High-signal, zero-fluff review format",
      "Explicit security audit checklists (XSS, SQLi, SSRF, secret leakage)",
      "Performance and memory leak inspection",
      "Ponytail simplicity validation to eliminate bloat"
    ],
    installation: {
      instructions: "Save to your global or project prompt templates.",
      command: "claude prompt add code-review"
    },
    prerequisites: ["Claude Code CLI"],
    usage: {
      instructions: "Run Claude Code review command referencing this prompt when inspecting PRs or git diffs.",
      tips: [
        "Pipe git diff directly to Claude: git diff | claude -p 'Review this diff using Staff Code Review directive'",
        "Use before merging feature branches."
      ]
    },
    commands: [
      {
        name: "Diff Review Command",
        command: "git diff main...HEAD | claude -p 'Review this diff using Senior Staff Code Review prompt'",
        description: "Executes an immediate high-rigor audit on your branch changes"
      }
    ],
    codeExamples: [
      {
        title: "Sample Review Output Format",
        language: "markdown",
        code: `### Findings\n1. **[Correctness]** \`src/utils/dataHelpers.js:42\`: Missing null check on \`item.tags\` causes uncaught TypeError when tag is undefined.\n   *Fix*: Use optional chaining \`item.tags?.includes(term)\`.\n2. **[YAGNI]** \`src/hooks/useGenericCache.js\`: Created a 140-line bespoke cache for a single static array.\n   *Fix*: Delete hook and use standard \`useMemo\` directly.`
      }
    ],
    relatedResourceSlugs: ["ponytail", "github-automation", "agent-evals-harness"]
  },
  {
    id: "prompt-refactor-cleanup",
    title: "Ponytail Refactoring & Dead Code Cleaner",
    slug: "refactor-cleanup",
    description: "System prompt to streamline bloated codebases, prune dead exports, and flatten deep call hierarchies.",
    overview: "Guides Claude Code to safely remove unused code, collapse redundant intermediate layers, flatten unnecessary wrapper classes, and consolidate repetitive utility functions without breaking existing tests or behavior.",
    category: "AI Coding Tools",
    tags: ["Refactoring", "Clean Code", "Ponytail", "YAGNI", "Optimization"],
    githubUrl: "https://github.com/anthropics/claude-prompts",
    documentationUrl: "https://ponytail.dev/",
    resourceType: "Task Prompt",
    createdDate: "2025-02-15",
    stars: 1680,
    author: "Minimalist Code Initiative",
    license: "MIT",
    version: "v1.2.0",
    promptText: `Act as a Refactoring Specialist guided by Ponytail discipline.

Your goal is to simplify this codebase:
1. Identify and safely delete unused functions, dead variables, and abandoned files.
2. Flatten single-use abstractions: inline helper functions that add cognitive overhead without real reuse.
3. Replace custom home-grown utilities with standard ECMAScript / Web APIs.
4. Verify all tests pass before and after each surgical refactoring step.
5. Do not alter external API contracts or public exports.`,
    features: [
      "Surgical dead code identification and pruning",
      "Abstraction flattening for easier comprehension",
      "Native API substitution to drop unnecessary dependencies",
      "Guaranteed behavioral preservation"
    ],
    installation: {
      instructions: "Store in your project's .claude/prompts/ directory.",
      command: "mkdir -p .claude/prompts && cat << 'EOF' > .claude/prompts/refactor.md"
    },
    prerequisites: ["Claude Code CLI", "Test suite with high coverage"],
    usage: {
      instructions: "Execute Claude Code with this prompt when tackling technical debt sprints.",
      tips: ["Run your test suite before and after running this cleanup."]
    },
    commands: [
      {
        name: "Run Refactor Agent",
        command: "claude -p 'Simplify and remove dead code in src/ using Ponytail Refactor prompt'",
        description: "Executes cleanup pass on selected directory"
      }
    ],
    codeExamples: [
      {
        title: "Ponytail Inlining Example",
        language: "javascript",
        code: `// ❌ Before: Unnecessary 3-level wrapper\nconst formatSlug = (str) => slugify(str);\nconst cleanString = (s) => formatSlug(s.trim());\n\n// ✅ After (Ponytail inline):\nconst slug = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');`
      }
    ],
    relatedResourceSlugs: ["ponytail", "react-development"]
  },
  {
    id: "prompt-root-cause-debugger",
    title: "5-Whys Systematic Root Cause Debugger",
    slug: "root-cause-debugger",
    description: "Deep diagnostic prompt that uncovers the fundamental defect rather than patching symptoms.",
    overview: "Directs Claude Code through a strict 5-Whys investigation when encountering perplexing bugs, race conditions, memory leaks, or hydration mismatches. Enforces identifying the root causal chain, writing an isolated reproduction test, and deploying a surgical fix.",
    category: "Testing & QA",
    tags: ["Debugging", "Root Cause", "5-Whys", "Diagnostics", "Troubleshooting"],
    githubUrl: "https://github.com/anthropics/claude-prompts",
    documentationUrl: "https://docs.anthropic.com/",
    resourceType: "Task Prompt",
    createdDate: "2025-02-23",
    stars: 2840,
    author: "Claude Reliability Engineering",
    license: "CC-BY-4.0",
    version: "v2.0.0",
    promptText: `Act as a Staff Systems Reliability Engineer diagnosing an issue.

Follow this systematic 5-Whys debugging protocol:
1. State the exact observable failure (stack trace, error message, or visual anomaly).
2. Trace the sequence of events leading directly to the fault.
3. Ask "Why did this happen?" repeatedly across 5 levels until reaching the root invariant failure (e.g. unhandled null, race condition, stale closure, missing cleanup).
4. Author a minimal reproducing test case in the test suite to verify the failure deterministically.
5. Apply the minimal surgical code fix following Ponytail discipline.
6. Verify the reproduction test now passes with zero side-effects.`,
    features: [
      "Rigorous 5-level causal analysis",
      "Prohibits symptom-masking try/catch wrappers without root-cause resolution",
      "Mandates automated reproducing test before fixing",
      "Strict Ponytail surgical fix discipline"
    ],
    installation: {
      instructions: "Add to your project's .claude/prompts/ directory.",
      command: "mkdir -p .claude/prompts && touch .claude/prompts/debug.md"
    },
    prerequisites: ["Claude Code CLI"],
    usage: {
      instructions: "Pass your stack trace or problem statement to Claude Code alongside this prompt.",
      tips: ["Include terminal build output or browser console logs for instant triage."]
    },
    commands: [
      {
        name: "Run Root Cause Agent",
        command: "claude -p 'Diagnose this error using the 5-Whys Root Cause prompt: [paste error]'",
        description: "Initiates deep causal investigation"
      }
    ],
    codeExamples: [
      {
        title: "5-Whys Analysis Walkthrough",
        language: "markdown",
        code: `1. Symptom: Cannot read property 'map' of undefined in ResourceGrid.
2. Why: \`resources\` prop was undefined on initial render.
3. Why: The parent hook returned an empty promise before resolving state.
4. Why: Missing default empty array fallback \`resources = []\`.
5. Root Fix: Add \`resources = []\` parameter default and memoize initial state.`
      }
    ],
    relatedResourceSlugs: ["tdd-agent-discipline", "code-review", "ponytail"]
  },
  {
    id: "prompt-performance-profiler",
    title: "Web Vitals & Bundle Performance Profiler",
    slug: "performance-profiler",
    description: "Audits DOM bloat, component re-renders, layout thrashing, and excessive bundle chunks.",
    overview: "Guides Claude Code in profiling frontend applications against Google Core Web Vitals (LCP, INP, CLS). Identifies unnecessary component re-renders, heavy uncompressed assets, synchronous script bottlenecks, and optimizes bundle splitting.",
    category: "Frontend Design",
    tags: ["Performance", "Web Vitals", "Optimization", "Vite", "React"],
    githubUrl: "https://github.com/anthropics/claude-prompts",
    documentationUrl: "https://web.dev/vitals/",
    resourceType: "Task Prompt",
    createdDate: "2025-02-24",
    stars: 2310,
    author: "Performance Working Group",
    license: "MIT",
    version: "v1.5.0",
    promptText: `Act as a Web Performance Architect profiling this codebase.

Analyze the application for performance bottlenecks:
1. Identify components that re-render unnecessarily on global state changes; stabilize them with React.memo or derive state during render.
2. Audit imported dependencies: recommend native platform APIs or tree-shakeable modular imports (e.g. lucide-react specific icons).
3. Check for layout thrashing (forced synchronous reflows) when measuring DOM geometry.
4. Verify all image tags include explicit dimensions, loading='lazy', and decoding='async'.
5. Report bundle size breakdown with concrete recommendations under 200kb gzipped.`,
    features: [
      "Core Web Vitals (LCP, INP, CLS) optimization targets",
      "Re-render tree diagnostic checks",
      "Bundle size budgeting under 200kb",
      "Zero-dependency native API substitution"
    ],
    installation: {
      instructions: "Store in your project prompt templates directory.",
      command: "claude prompt add performance-profiler"
    },
    prerequisites: ["Vite or Next.js bundler", "Node.js 18+"],
    usage: {
      instructions: "Invoke after completing feature sets to verify bundle size and rendering efficiency.",
      tips: ["Run alongside rollup-plugin-visualizer to inspect bundle treemap."]
    },
    commands: [
      {
        name: "Analyze Bundle",
        command: "npx vite-bundle-visualizer",
        description: "Generates visual treemap of all production bundle chunks"
      }
    ],
    codeExamples: [
      {
        title: "Derived State Memoization",
        language: "javascript",
        code: `// ✅ Calculate directly during render instead of syncing redundant state
const filteredList = useMemo(() => {
  return items.filter(i => i.active);
}, [items]);`
      }
    ],
    relatedResourceSlugs: ["taste-skill", "react-development", "ponytail"]
  }
];
