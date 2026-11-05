/**
 * Central repository catalog.
 * Contains primary repositories including Ponytail, Taste Skill, Hallmark, and companion repos.
 */
export const repositories = [
  {
    id: "repo-ponytail",
    title: "Ponytail",
    slug: "ponytail",
    description: "Coding discipline for AI agents focused on minimal, maintainable, efficient code.",
    overview: "Ponytail is a strict engineering discipline and ruleset designed specifically for Claude Code and AI coding agents. It enforces radical YAGNI principles, minimum code generation, native language capabilities, and eliminates unnecessary abstractions or premature rewrites.",
    category: "AI Coding Tools",
    tags: ["Claude Code", "Coding", "YAGNI", "Developer Tools", "Discipline"],
    githubUrl: "https://github.com/DietrichGebert/ponytail",
    documentationUrl: "https://ponytail.dev/",
    resourceType: "Coding Skill",
    createdDate: "2025-01-15",
    stars: 3420,
    author: "Dietrich Gebert",
    license: "MIT",
    version: "v2.1.0",
    features: [
      "Zero-abstraction rule: write plain, direct ES6+/TypeScript rather than bespoke wrapper layers",
      "YAGNI enforcement: strictly solve the current problem without speculative future-proofing",
      "Component reuse mandate: inspect existing files and utilities before creating new components",
      "Surgical file modification: replace only affected code blocks instead of rewriting entire files",
      "Native platform preference: leverage built-in browser and runtime APIs over external dependencies",
      "Automated verification: validate functionality with targeted tests where logic is critical"
    ],
    installation: {
      instructions: "Install the Ponytail plugin directly into Claude Code using the plugin marketplace workflow.",
      command: "/plugin marketplace add DietrichGebert/ponytail\n/plugin install ponytail@ponytail"
    },
    prerequisites: [
      "Claude Code CLI v0.2.0 or higher",
      "Node.js 18.x or 20.x runtime"
    ],
    usage: {
      instructions: "Once installed, Ponytail activates automatically during Claude Code agent sessions to steer code generation towards minimalism and strict YAGNI principles.",
      tips: [
        "Ponytail is an agent behavior ruleset, not a runtime JavaScript package.",
        "Do not attempt to import ponytail into your React or Node project.",
        "Use with complex refactors to prevent agent scope creep."
      ]
    },
    commands: [
      {
        name: "Marketplace Registration",
        command: "/plugin marketplace add DietrichGebert/ponytail",
        description: "Registers the Ponytail repository with your local Claude Code plugin registry"
      },
      {
        name: "Plugin Installation",
        command: "/plugin install ponytail@ponytail",
        description: "Installs and activates the Ponytail discipline ruleset"
      },
      {
        name: "Verify Status",
        command: "/plugin list",
        description: "Checks that ponytail is active in your current session"
      }
    ],
    codeExamples: [
      {
        title: "Ponytail Agent Instruction Snippet",
        language: "markdown",
        code: `# Ponytail Discipline Rules\n1. Write the minimum code required to solve the stated problem.\n2. Do not introduce abstractions for single-use routines.\n3. Check existing components and helper utilities before writing new ones.\n4. Modify files surgically using exact range replacements.\n5. Never add unneeded third-party dependencies.`
      }
    ],
    relatedResourceSlugs: ["taste-skill", "hallmark", "react-app-builder"]
  },
  {
    id: "repo-taste-skill",
    title: "Taste Skill",
    slug: "taste-skill",
    description: "Frontend design skill that improves visual quality and prevents generic AI-generated interfaces.",
    overview: "Taste Skill equips Claude Code with a deep understanding of modern typography, proportional spatial rhythm, micro-interactions, and curated color palettes. It systematically eliminates typical AI clichés like purple gradients and card-within-card containers in favor of distinctive, human-grade craftsmanship.",
    category: "Frontend Design",
    tags: ["Claude Code", "Frontend", "UI Design", "Design Skills", "Typography"],
    githubUrl: "https://github.com/Leonxlnx/taste-skill",
    documentationUrl: "https://github.com/Leonxlnx/taste-skill#readme",
    resourceType: "Design Skill",
    createdDate: "2025-02-10",
    stars: 2890,
    author: "Leon Linx",
    license: "MIT",
    version: "v1.4.2",
    features: [
      "Anti-slop typography rules: 2+1 font discipline with intentional editorial and sans pairings",
      "Zero-pill metadata: renders dates, tags, and stats as clean unboxed text with subtle dividers",
      "60-30-10 color distribution: neutral backgrounds, structured surfaces, and a tightly budgeted accent",
      "Spatial mathematics: enforces container outer padding greater than inner gaps and proper nested radii",
      "Restrained motion: compositor-only animations with sub-200ms settling times",
      "Distinctive aesthetic: inspired by Linear, Raycast, and high-end editorial web design"
    ],
    installation: {
      instructions: "Add Taste Skill to Claude Code via npx skills runner.",
      command: "npx skills add https://github.com/Leonxlnx/taste-skill"
    },
    prerequisites: [
      "Node.js 18+ environment",
      "Tailwind CSS v3 or v4 in the target project"
    ],
    usage: {
      instructions: "Invoke Taste Skill when styling components, designing dashboards, or reviewing frontend implementations for visual elegance.",
      tips: [
        "Combine with Hallmark for an end-to-end design quality workflow.",
        "Ensure Tailwind v4 dark mode rules are declared using @custom-variant dark."
      ]
    },
    commands: [
      {
        name: "Install Skill",
        command: "npx skills add https://github.com/Leonxlnx/taste-skill",
        description: "Downloads and configures Taste Skill rules in the Claude Code skills directory"
      }
    ],
    codeExamples: [
      {
        title: "Clean Unboxed Metadata (Taste Rule)",
        language: "jsx",
        code: `// ✅ DO: Clean unboxed metadata with typographic separators\n<div className="flex items-center gap-2 text-xs text-slate-400">\n  <span>Frontend Design</span>\n  <span aria-hidden="true">·</span>\n  <span>Updated March 2026</span>\n  <span aria-hidden="true">·</span>\n  <span className="tabular-nums">2.8k stars</span>\n</div>`
      }
    ],
    relatedResourceSlugs: ["ponytail", "hallmark", "ai-dashboard"]
  },
  {
    id: "repo-hallmark",
    title: "Hallmark",
    slug: "hallmark",
    description: "Anti-AI-slop design skill for creating distinctive, polished frontend interfaces.",
    overview: "Hallmark is an anti-AI-slop design skill and auditing tool for Claude Code. It establishes strict guardrails against floating stat cards, decorative pulsing dots, nested boxes, and artificial telemetry widgets, delivering production-grade web interfaces with real browser validation.",
    category: "Frontend Design",
    tags: ["Claude Code", "Frontend", "UI Design", "Design Quality", "Accessibility"],
    githubUrl: "https://github.com/Nutlope/hallmark",
    documentationUrl: "https://www.usehallmark.com/",
    resourceType: "Design Skill",
    createdDate: "2025-02-28",
    stars: 4150,
    author: "Nutlope",
    license: "Apache-2.0",
    version: "v3.0.1",
    features: [
      "Top Bar Contract: strict one-row 3-zone layout (Brand, clean links, 1 primary action)",
      "Prohibition of mechanical prefixes: no '// 01_CORE' comment headers or fake status badges",
      "Strict WCAG AA contrast compliance and touch targets of at least 40px",
      "Single-elevation depth: avoids card-in-card nesting in favor of hairline dividers",
      "Dual-theme optical compensation for crisp typography in both light and dark modes",
      "Zero dead clicks: every button and interactive control is wired to a functional handler"
    ],
    installation: {
      instructions: "Install Hallmark globally for Claude Code using the npx skills command.",
      command: "npx skills add nutlope/hallmark -g --agent claude-code"
    },
    prerequisites: [
      "Claude Code CLI",
      "Modern web stack (Vite, Next.js, or Remix)"
    ],
    usage: {
      instructions: "Run Hallmark during design iterations and before shipping to conduct automated anti-slop audits and contrast checks.",
      tips: [
        "Audit card components to ensure metadata does not use static pill envelopes.",
        "Check that desktop viewports are designed for a 1440px wide baseline."
      ]
    },
    commands: [
      {
        name: "Global Installation",
        command: "npx skills add nutlope/hallmark -g --agent claude-code",
        description: "Installs Hallmark globally for all Claude Code projects"
      },
      {
        name: "Run Audit",
        command: "npx hallmark audit --strict",
        description: "Scans project components for AI-slop design anti-patterns"
      }
    ],
    codeExamples: [
      {
        title: "Top Bar Contract Implementation",
        language: "jsx",
        code: `<header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">\n  <a href="/" className="text-base font-semibold text-slate-100 whitespace-nowrap shrink-0">\n    Resource Hub\n  </a>\n  <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">\n    <a href="/skills.html" className="hover:text-slate-100 transition-colors">Skills</a>\n    <a href="/projects.html" className="hover:text-slate-100 transition-colors">Projects</a>\n    <a href="/prompts.html" className="hover:text-slate-100 transition-colors">Prompts</a>\n  </nav>\n  <button className="px-3.5 py-1.5 text-xs font-medium text-slate-900 bg-white rounded-md hover:bg-slate-200 transition-colors shrink-0">\n    Explore Hub\n  </button>\n</header>`
      }
    ],
    relatedResourceSlugs: ["taste-skill", "ponytail", "github-automation"]
  },
  {
    id: "repo-claude-code-templates",
    title: "Claude Code Starter Templates",
    slug: "claude-code-templates",
    description: "Curated collection of production-ready project boilerplates optimized for Claude Code workflows.",
    overview: "A comprehensive repository of scaffold templates pre-configured with Ponytail discipline, Tailwind CSS v4, TypeScript, testing harnesses, and CI/CD pipelines configured for AI agent collaboration.",
    category: "Full-Stack Development",
    tags: ["Boilerplate", "Templates", "React", "TypeScript", "Vite"],
    githubUrl: "https://github.com/anthropics/claude-code-templates",
    documentationUrl: "https://docs.anthropic.com/en/docs/claude-code",
    resourceType: "Repository",
    createdDate: "2025-03-01",
    stars: 1980,
    author: "Anthropic Ecosystem",
    license: "MIT",
    version: "v1.2.0",
    features: [
      "Pre-configured Vite + React + Tailwind v4 structure",
      "Ready-to-use directory conventions matching Claude Code best practices",
      "Built-in verification and linting scripts with strict type checking",
      "Zero telemetry and minimalist dependencies"
    ],
    installation: {
      instructions: "Clone or use degit to scaffold a new project from this repository.",
      command: "npx degit anthropics/claude-code-templates/react-vite my-agent-app"
    },
    prerequisites: ["Node.js 18+", "npm or pnpm"],
    usage: {
      instructions: "Scaffold a new project and initialize Claude Code in the root directory.",
      tips: ["Run npm install and verify dev server starts on port 3000."]
    },
    commands: [
      {
        name: "Scaffold App",
        command: "npx degit anthropics/claude-code-templates/react-vite my-agent-app",
        description: "Creates a new workspace ready for agent-driven engineering"
      }
    ],
    codeExamples: [
      {
        title: "Standard Scripts in package.json",
        language: "json",
        code: `{\n  "scripts": {\n    "dev": "vite --port=3000 --host=0.0.0.0",\n    "build": "vite build",\n    "lint": "tsc --noEmit"\n  }\n}`
      }
    ],
    relatedResourceSlugs: ["ponytail", "react-app-builder"]
  },
  {
    id: "repo-claude-agent-evals",
    title: "Agent Verification & Evals Harness",
    slug: "agent-evals-harness",
    description: "Lightweight evaluation and test verification harness for Claude Code agents.",
    overview: "Enables developers to run deterministic unit, regression, and snapshot checks on code authored by AI agents, ensuring no silent regressions or hallucinated dependencies occur during agent workflows.",
    category: "Testing & QA",
    tags: ["Testing", "Evals", "Verification", "Node.js", "CI"],
    githubUrl: "https://github.com/anthropics/agent-evals-harness",
    documentationUrl: "https://docs.anthropic.com/",
    resourceType: "Repository",
    createdDate: "2025-02-18",
    stars: 1540,
    author: "Claude Community",
    license: "MIT",
    version: "v0.9.1",
    features: [
      "Sub-second verification runs with instant feedback",
      "Catches undeclared imports and syntax faults before build steps",
      "Plugs cleanly into pre-commit git hooks",
      "Zero overhead architecture"
    ],
    installation: {
      instructions: "Install as a development dependency in any Node.js repository.",
      command: "npm install -D agent-evals-harness"
    },
    prerequisites: ["Node.js 18+"],
    usage: {
      instructions: "Add verification step to your development agent lifecycle.",
      tips: ["Run before committing multi-file edits."]
    },
    commands: [
      {
        name: "Run Verification",
        command: "npx agent-evals check",
        description: "Audits codebase for undefined identifiers and broken references"
      }
    ],
    codeExamples: [
      {
        title: "Sample Verification Config",
        language: "javascript",
        code: `// agent-evals.config.js\nexport default {\n  strictImports: true,\n  maxBundleBudget: "250kb",\n  targetEnvironment: "node18"\n};`
      }
    ],
    relatedResourceSlugs: ["ponytail", "code-review"]
  },
  {
    id: "repo-claude-code-action",
    title: "Official Claude Code GitHub Action",
    slug: "claude-code-action",
    description: "Automate code reviews, issue triaging, and PR summaries directly within GitHub Actions pipelines.",
    overview: "Official GitHub Action runner for Claude Code. Enables seamless CI/CD integration to execute Ponytail-compliant code reviews, identify broken type boundaries, generate pull request descriptions, and enforce team coding standards on every push.",
    category: "DevOps & Automation",
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Automation", "PR Review"],
    githubUrl: "https://github.com/anthropics/claude-code-action",
    documentationUrl: "https://github.com/anthropics/claude-code-action#readme",
    resourceType: "Repository",
    createdDate: "2025-02-25",
    stars: 3180,
    author: "Anthropic Engineering",
    license: "Apache-2.0",
    version: "v1.4.0",
    features: [
      "Zero-configuration PR review workflow with customizable rulesets",
      "Inline comment feedback on modified lines without cluttering unchanged code",
      "Automatic token redaction and secret scanning in CI logs",
      "High-speed diff caching for rapid continuous integration cycles"
    ],
    installation: {
      instructions: "Reference the action inside your .github/workflows/review.yml workflow file.",
      command: "- uses: anthropics/claude-code-action@v1\n  with:\n    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}\n    rules: 'ponytail,hallmark'"
    },
    prerequisites: [
      "GitHub repository with GitHub Actions enabled",
      "Anthropic API Key stored in repository secrets"
    ],
    usage: {
      instructions: "Set triggers for pull_request and configure automated comments on review.",
      tips: [
        "Use with Ponytail rules to keep review comments actionable and concise.",
        "Restrict action to trusted branches to protect secret tokens."
      ]
    },
    commands: [
      {
        name: "Add Workflow",
        command: "mkdir -p .github/workflows && touch .github/workflows/claude-review.yml",
        description: "Initializes the review workflow file"
      }
    ],
    codeExamples: [
      {
        title: "Workflow Definition (.github/workflows/claude-review.yml)",
        language: "yaml",
        code: `name: Claude Code Review\non:\n  pull_request:\n    types: [opened, synchronize, reopened]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    permissions:\n      contents: read\n      pull-requests: write\n    steps:\n      - uses: actions/checkout@v4\n      - uses: anthropics/claude-code-action@v1\n        with:\n          anthropic_api_key: \${{ secrets.ANTHROPIC_API_KEY }}\n          rules: "ponytail,hallmark"`
      }
    ],
    relatedResourceSlugs: ["github-automation", "ponytail", "code-review"]
  },
  {
    id: "repo-skills-registry",
    title: "Claude Code Skills Registry",
    slug: "skills-registry",
    description: "Open community registry and specification for discovering, packaging, and publishing agent skills.",
    overview: "The central decentralized index for Claude Code skills. Specifies the SKILL.md manifest format, skill lifecycle hooks, dependency declarations, and standard installation protocols across npm, git, and local repositories.",
    category: "AI Coding Tools",
    tags: ["Skills", "Registry", "Ecosystem", "Developer Tools", "Manifest"],
    githubUrl: "https://github.com/anthropics/skills-registry",
    documentationUrl: "https://skills.anthropic.com/",
    resourceType: "Repository",
    createdDate: "2025-01-18",
    stars: 2650,
    author: "Claude Community",
    license: "MIT",
    version: "v2.0.0",
    features: [
      "Standardized SKILL.md manifest specification",
      "One-command installation via npx skills add <repo>",
      "Semantic versioning and vulnerability auditing for agent skills",
      "Local testing sandbox to preview skill behavior before publishing"
    ],
    installation: {
      instructions: "Install the skills CLI tool globally using npm or npx.",
      command: "npm install -g @anthropic/skills-cli"
    },
    prerequisites: ["Node.js 18.0.0+"],
    usage: {
      instructions: "Search, inspect, and install skills into your local Claude Code configuration.",
      tips: ["Run skills list in any project to see all active skills."]
    },
    commands: [
      {
        name: "Search Skills",
        command: "npx skills search 'design'",
        description: "Finds published skills matching query in the community registry"
      },
      {
        name: "Validate Skill Manifest",
        command: "npx skills validate ./my-skill/SKILL.md",
        description: "Checks manifest syntax against the registry schema"
      }
    ],
    codeExamples: [
      {
        title: "Standard SKILL.md Header",
        language: "markdown",
        code: `---
name: "my-custom-skill"
description: "Provides high-rigor domain expertise for Claude Code"
version: "1.0.0"
author: "Engineering Team"
tags: ["react", "testing", "ponytail"]
---`
      }
    ],
    relatedResourceSlugs: ["ponytail", "taste-skill", "hallmark"]
  }
];
