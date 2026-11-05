/**
 * Claude Code project showcases, templates, and full-stack reference applications.
 */
export const projects = [
  {
    id: "proj-ai-dashboard",
    title: "AI Developer Dashboard",
    slug: "ai-dashboard",
    description: "Production-ready developer monitoring console built with Vite, React 19, and Tailwind v4.",
    overview: "A reference implementation of a high-density developer dashboard engineered strictly according to Taste Skill and Hallmark guidelines. Includes live metric filtering, dual-theme switching, zero-pill typography, and responsive split views.",
    category: "Full-Stack Development",
    tags: ["React 19", "Tailwind CSS", "Vite", "Dashboard", "UI/UX"],
    githubUrl: "https://github.com/anthropics/claude-ai-dashboard",
    documentationUrl: "https://github.com/anthropics/claude-ai-dashboard#readme",
    resourceType: "Full-Stack App",
    createdDate: "2025-02-12",
    stars: 2430,
    author: "Claude Showcase Team",
    license: "MIT",
    version: "v2.2.0",
    features: [
      "Linear and Raycast inspired dark/light workspace aesthetics",
      "High-density data grids with tabular numerals and zero jitter",
      "Dynamic client-side filtering by category, status, and tag tokens",
      "Persistent state via localStorage with zero server latency",
      "Strict WCAG AA contrast compliance and full keyboard navigation"
    ],
    installation: {
      instructions: "Clone repository, install dependencies, and run dev server.",
      command: "git clone https://github.com/anthropics/claude-ai-dashboard.git\ncd claude-ai-dashboard\nnpm install\nnpm run dev"
    },
    prerequisites: [
      "Node.js 18.0.0+",
      "npm or pnpm package manager"
    ],
    usage: {
      instructions: "Use as a baseline architecture for enterprise developer tools and operational consoles.",
      tips: [
        "Inspect src/data/ for centralized data architecture patterns.",
        "Toggle theme from the top bar to inspect optical font compensation."
      ]
    },
    commands: [
      {
        name: "Start Dev Server",
        command: "npm run dev",
        description: "Runs the Vite development server on port 3000"
      },
      {
        name: "Production Build",
        command: "npm run build",
        description: "Bundles optimized static assets into dist/"
      }
    ],
    codeExamples: [
      {
        title: "Tabular Metrics Grid Component",
        language: "jsx",
        code: `export function MetricRow({ label, value, change }) {\n  return (\n    <div className="flex items-center justify-between py-2 border-b border-slate-800 text-sm">\n      <span className="text-slate-400">{label}</span>\n      <span className="font-mono tabular-nums text-slate-100 font-medium">{value}</span>\n    </div>\n  );\n}`
      }
    ],
    relatedResourceSlugs: ["taste-skill", "hallmark", "ponytail"]
  },
  {
    id: "proj-github-automation",
    title: "GitHub Workflow Automation Suite",
    slug: "github-automation",
    description: "Automated issue triaging, PR review bots, and changelog generators driven by Claude Code.",
    overview: "A collection of GitHub Actions and CLI automations that pair Claude Code with repository events. Features automated code review summaries, semantic release tags, security advisory checks, and intelligent bug labeling.",
    category: "DevOps & Automation",
    tags: ["GitHub Actions", "CI/CD", "Automation", "DevOps", "Claude Code"],
    githubUrl: "https://github.com/anthropics/github-automation-suite",
    documentationUrl: "https://docs.github.com/actions",
    resourceType: "Project Template",
    createdDate: "2025-01-28",
    stars: 1870,
    author: "Automation Guild",
    license: "Apache-2.0",
    version: "v1.3.1",
    features: [
      "Automatic PR diff analysis with targeted feedback on risky blocks",
      "Issue duplicate detection and semantic labeling",
      "Automated changelog generation adhering to Keep a Changelog standards",
      "Pre-commit security scanning for leaked tokens and credentials"
    ],
    installation: {
      instructions: "Copy the provided action workflows into your .github/workflows directory.",
      command: "mkdir -p .github/workflows && cp -r templates/workflows/* .github/workflows/"
    },
    prerequisites: [
      "GitHub repository with Actions enabled",
      "ANTHROPIC_API_KEY secret configured in repository settings"
    ],
    usage: {
      instructions: "Configure triggers in your repository to automatically engage Claude Code on PR open or issue creation.",
      tips: [
        "Set review thresholds to run only on non-draft PRs.",
        "Use with Ponytail guidelines to keep automated PR feedback concise."
      ]
    },
    commands: [
      {
        name: "Test Workflow Locally",
        command: "act pull_request",
        description: "Simulates the GitHub Actions workflow using nektos/act"
      }
    ],
    codeExamples: [
      {
        title: "GitHub Action Configuration",
        language: "yaml",
        code: `name: Claude Code PR Review\non:\n  pull_request:\n    types: [opened, synchronize]\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: anthropics/claude-code-action@v1\n        with:\n          rules: "ponytail,hallmark"`
      }
    ],
    relatedResourceSlugs: ["git-agent-workflow", "code-review", "ponytail"]
  },
  {
    id: "proj-agentic-doc-search",
    title: "Agentic Documentation Engine",
    slug: "agentic-doc-search",
    description: "Instant semantic documentation search and markdown indexer with client-side BM25 scoring.",
    overview: "Fast, zero-latency documentation portal designed for developer handbooks, API references, and skill catalogs. Delivers instant keyboard-driven search (Cmd+K), deep linking, and markdown syntax highlighting.",
    category: "AI Coding Tools",
    tags: ["Documentation", "Search", "BM25", "Vite", "Markdown"],
    githubUrl: "https://github.com/anthropics/agentic-doc-search",
    documentationUrl: "https://github.com/anthropics/agentic-doc-search#readme",
    resourceType: "Project Template",
    createdDate: "2025-02-20",
    stars: 1290,
    author: "Knowledge Systems",
    license: "MIT",
    version: "v1.1.0",
    features: [
      "Zero-latency fuzzy and tokenized search across hundreds of documents",
      "Raycast-style Cmd+K modal interface with keyboard navigation",
      "Automatic table of contents generation and slug anchor linking",
      "Dark mode first design with refined typographic hierarchy"
    ],
    installation: {
      instructions: "Scaffold project and populate markdown documents into docs/ directory.",
      command: "npx degit anthropics/agentic-doc-search my-docs && cd my-docs && npm i"
    },
    prerequisites: ["Node.js 18+"],
    usage: {
      instructions: "Run npm run dev to preview documentation hub locally.",
      tips: ["Supports GitHub-flavored markdown and syntax highlighting."]
    },
    commands: [
      {
        name: "Build Docs Index",
        command: "npm run build:index",
        description: "Extracts searchable tokens and creates optimized search index"
      }
    ],
    codeExamples: [
      {
        title: "Search Query Hook",
        language: "javascript",
        code: `export function useDocSearch(query, docs) {\n  return useMemo(() => {\n    if (!query.trim()) return docs;\n    const q = query.toLowerCase();\n    return docs.filter(d => \n      d.title.toLowerCase().includes(q) || \n      d.description.toLowerCase().includes(q)\n    );\n  }, [query, docs]);\n}`
      }
    ],
    relatedResourceSlugs: ["taste-skill", "react-app-builder"]
  },
  {
    id: "proj-saas-billing",
    title: "SaaS Subscription & Customer Portal",
    slug: "saas-billing-portal",
    description: "Production Stripe billing integration with webhook verification, usage meters, and tier cards.",
    overview: "A reference implementation of a complete B2B SaaS subscription workflow. Adheres strictly to the SaaS Dashboard reference and Hallmark anti-slop guidelines: features tier comparison cards, transparent monthly/annual billing toggles, webhook error guards, and customer portal redirection.",
    category: "Full-Stack Development",
    tags: ["SaaS", "Stripe", "Billing", "React 19", "Full-Stack"],
    githubUrl: "https://github.com/anthropics/saas-billing-portal",
    documentationUrl: "https://stripe.com/docs/billing",
    resourceType: "Full-Stack App",
    createdDate: "2025-02-26",
    stars: 2150,
    author: "Fintech Systems Lab",
    license: "MIT",
    version: "v2.0.1",
    features: [
      "Stripe Customer Portal and checkout session lifecycle handlers",
      "Cryptographic webhook signature verification",
      "Transparent pricing architecture matching §2.C SaaS guidelines",
      "Subtle 1px border cards with zero card-in-card nesting"
    ],
    installation: {
      instructions: "Clone repository and configure Stripe API keys in .env.local.",
      command: "git clone https://github.com/anthropics/saas-billing-portal.git\ncd saas-billing-portal\nnpm install"
    },
    prerequisites: ["Node.js 18+", "Stripe Developer Account"],
    usage: {
      instructions: "Deploy to Vercel or Cloud Run and point your Stripe webhook endpoint.",
      tips: ["Test webhook verification locally using Stripe CLI: stripe listen --forward-to localhost:3000/api/webhook"]
    },
    commands: [
      {
        name: "Listen to Webhooks",
        command: "stripe listen --forward-to localhost:3000/api/webhook",
        description: "Streams live Stripe events to local dev server"
      }
    ],
    codeExamples: [
      {
        title: "Webhook Signature Verification",
        language: "typescript",
        code: `import Stripe from 'stripe';\n\nexport async function verifyWebhook(rawBody: string, sig: string) {\n  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);\n  return stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);\n}`
      }
    ],
    relatedResourceSlugs: ["ai-dashboard", "database-schema-architect", "react-development"]
  },
  {
    id: "proj-multi-agent-orchestrator",
    title: "Terminal Multi-Agent Orchestrator",
    slug: "multi-agent-orchestrator",
    description: "Concurrent process supervisor to coordinate multiple specialized Claude Code sessions.",
    overview: "Enables teams to run multiple Claude Code agent sessions in parallel (e.g. backend architect, test writer, frontend polisher) with IPC communication, conflict detection, and centralized git lock coordination.",
    category: "AI Coding Tools",
    tags: ["Agents", "CLI", "Multi-Agent", "Node.js", "Process"],
    githubUrl: "https://github.com/anthropics/multi-agent-orchestrator",
    documentationUrl: "https://github.com/anthropics/multi-agent-orchestrator#readme",
    resourceType: "Project Template",
    createdDate: "2025-02-27",
    stars: 1780,
    author: "Agent Operations",
    license: "Apache-2.0",
    version: "v1.0.4",
    features: [
      "Subprocess lifecycle monitoring with non-blocking exit handling",
      "File reservation system to prevent simultaneous writes to the same module",
      "Centralized event bus streaming agent status to a clean terminal dashboard",
      "Automatic git branch isolation for each task"
    ],
    installation: {
      instructions: "Install the orchestrator CLI globally.",
      command: "npm install -g @anthropic/multi-agent-orchestrator"
    },
    prerequisites: ["Claude Code CLI installed", "Node.js 20+"],
    usage: {
      instructions: "Create an agent-tasks.json file and run agent-orchestrate start.",
      tips: ["Pair with Ponytail discipline to minimize token consumption across workers."]
    },
    commands: [
      {
        name: "Launch Orchestrator",
        command: "agent-orchestrate --config ./agents.json",
        description: "Spawns concurrent worker agents according to task specification"
      }
    ],
    codeExamples: [
      {
        title: "Agent Task Config (agents.json)",
        language: "json",
        code: `{\n  "workers": [\n    { "role": "tester", "skill": "tdd-agent-discipline", "scope": "tests/**" },\n    { "role": "frontend", "skill": "taste-skill", "scope": "src/components/**" }\n  ]\n}`
      }
    ],
    relatedResourceSlugs: ["ponytail", "github-automation", "agent-evals-harness"]
  }
];
