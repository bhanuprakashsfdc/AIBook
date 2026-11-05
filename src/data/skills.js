import { repositories } from "./repositories";

// Reuse Ponytail, Taste Skill, and Hallmark records from repositories to prevent data duplication
const sharedPonytail = repositories.find(r => r.slug === "ponytail");
const sharedTasteSkill = repositories.find(r => r.slug === "taste-skill");
const sharedHallmark = repositories.find(r => r.slug === "hallmark");

export const skills = [
  // Shared from repositories (zero duplication)
  ...(sharedPonytail ? [{ ...sharedPonytail, section: "skills" }] : []),
  ...(sharedTasteSkill ? [{ ...sharedTasteSkill, section: "skills" }] : []),
  ...(sharedHallmark ? [{ ...sharedHallmark, section: "skills" }] : []),
  {
    id: "skill-react-development",
    title: "React Modern Architecture",
    slug: "react-development",
    description: "Production guidelines for React 19, hooks orchestration, state modeling, and zero-flicker re-renders.",
    overview: "A specialized skill for Claude Code that teaches modern React 19 patterns, state normalization, custom hook composition, and proper event handling without unnecessary state synchronization bugs.",
    category: "Full-Stack Development",
    tags: ["React 19", "Hooks", "Architecture", "JavaScript", "Frontend"],
    githubUrl: "https://github.com/anthropics/claude-code-skills",
    documentationUrl: "https://react.dev/",
    resourceType: "Coding Skill",
    createdDate: "2025-01-22",
    stars: 2140,
    author: "Claude Engineering Guild",
    license: "MIT",
    version: "v2.0.4",
    features: [
      "Strict avoidance of derived state in useState; leverages pure memoization and direct calculations",
      "Event handler stabilization with useCallback only where necessary",
      "Proper cleanup in useEffect to prevent memory leaks and dangling timers",
      "Zero-prop-drilling architectural patterns with context and atomic hooks"
    ],
    installation: {
      instructions: "Add to your Claude Code workspace using the skills add command.",
      command: "npx skills add anthropics/skills/react-development"
    },
    prerequisites: ["React 18 or 19", "Vite or Next.js bundler"],
    usage: {
      instructions: "Activate when refactoring stateful components, debugging render loops, or setting up new page hierarchies.",
      tips: ["Run before writing complex custom hooks."]
    },
    commands: [
      {
        name: "Activate Skill",
        command: "npx skills add anthropics/skills/react-development",
        description: "Registers React engineering best practices with Claude Code"
      }
    ],
    codeExamples: [
      {
        title: "Derived State Pattern",
        language: "javascript",
        code: `// ✅ Calculate directly instead of keeping redundant state\nfunction ResourceList({ items, filter }) {\n  const filteredItems = useMemo(() => {\n    if (!filter) return items;\n    return items.filter(item => item.category === filter);\n  }, [items, filter]);\n\n  return <div>{filteredItems.length} items found</div>;\n}`
      }
    ],
    relatedResourceSlugs: ["ponytail", "taste-skill", "react-app-builder"]
  },
  {
    id: "skill-tailwind-v4",
    title: "Tailwind CSS v4 Mastery",
    slug: "tailwind-v4-mastery",
    description: "Expert configurations, @custom-variant dark theming, fluid type clamps, and zero-CSS-file styling.",
    overview: "Guides Claude Code in writing modern CSS using Tailwind CSS v4's new CSS-first engine. Handles `@theme`, `@custom-variant dark`, CSS variables, and ensures pristine design tokens without legacy tailwind.config.js files.",
    category: "Frontend Design",
    tags: ["Tailwind CSS", "CSS", "Theming", "Dark Mode", "Design System"],
    githubUrl: "https://github.com/tailwindlabs/tailwindcss",
    documentationUrl: "https://tailwindcss.com/docs",
    resourceType: "Design Skill",
    createdDate: "2025-02-05",
    stars: 3650,
    author: "Modern Web Lab",
    license: "MIT",
    version: "v4.0.0",
    features: [
      "Proper @custom-variant dark setup for zero-flicker light/dark mode switching",
      "CSS variable theme tokens in @theme block",
      "Anti-slop typography rules and tabular numerals configuration",
      "No inline styles or unnecessary auxiliary CSS files"
    ],
    installation: {
      instructions: "Include in Claude Code skills directory.",
      command: "npx skills add tailwindlabs/skills/tailwind-v4"
    },
    prerequisites: ["Tailwind CSS v4.0.0+"],
    usage: {
      instructions: "Consult when writing styles, configuring global stylesheets, or building theme switches.",
      tips: ["Always add @custom-variant dark (&:where(.dark, .dark *)); below @import 'tailwindcss';"]
    },
    commands: [
      {
        name: "Add Skill",
        command: "npx skills add tailwindlabs/skills/tailwind-v4",
        description: "Enables Tailwind v4 intelligence in Claude Code"
      }
    ],
    codeExamples: [
      {
        title: "Tailwind v4 index.css Configuration",
        language: "css",
        code: `@import "tailwindcss";\n@custom-variant dark (&:where(.dark, .dark *));\n\n@theme {\n  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;\n  --font-mono: 'JetBrains Mono', monospace;\n}`
      }
    ],
    relatedResourceSlugs: ["taste-skill", "hallmark", "ai-dashboard"]
  },
  {
    id: "skill-architecture-rfc",
    title: "System RFC & Planning Skill",
    slug: "architecture-rfc",
    description: "Generates unambiguous system architecture RFCs, component trees, and data schemas before coding.",
    overview: "Enforces structured planning discipline for Claude Code. Before building complex multi-view applications, this skill produces crisp system boundaries, state stores, and edge-case contracts to avoid costly architectural refactors.",
    category: "Architecture & Planning",
    tags: ["Architecture", "RFC", "Planning", "System Design", "Engineering"],
    githubUrl: "https://github.com/anthropics/claude-code-skills",
    documentationUrl: "https://docs.anthropic.com/",
    resourceType: "Workflow Skill",
    createdDate: "2025-01-30",
    stars: 1820,
    author: "Staff Engineers Club",
    license: "Apache-2.0",
    version: "v1.1.0",
    features: [
      "Component hierarchy mapping and state ownership definitions",
      "Zero-loss data contracts with type validation",
      "Step-by-step progressive implementation plans",
      "Risk assessment and fallback strategies"
    ],
    installation: {
      instructions: "Add to Claude Code environment.",
      command: "npx skills add anthropics/skills/architecture-rfc"
    },
    prerequisites: ["Claude Code CLI"],
    usage: {
      instructions: "Invoke at the start of a new module or complex subsystem to outline data flow and dependencies.",
      tips: ["Pairs seamlessly with Ponytail's YAGNI discipline."]
    },
    commands: [
      {
        name: "Add Planning Skill",
        command: "npx skills add anthropics/skills/architecture-rfc",
        description: "Registers architecture RFC generator with Claude Code"
      }
    ],
    codeExamples: [
      {
        title: "RFC Schema Template",
        language: "markdown",
        code: `## RFC: Data Pipeline Architecture\n- **Context**: Centralizing resources without hardcoding in JSX.\n- **Contract**: \`/src/data/data.js\` acts as single aggregator.\n- **Routes**: Dynamic client routes ending with .html for refresh safety.\n- **Persistence**: localStorage fallback with zero external servers.`
      }
    ],
    relatedResourceSlugs: ["ponytail", "react-development"]
  },
  {
    id: "skill-git-workflow",
    title: "Git Clean Commit & PR Agent",
    slug: "git-agent-workflow",
    description: "Conventional commits, surgical staging, meaningful branch naming, and atomic changelogs.",
    overview: "Automates clean git hygiene for Claude Code sessions. Ensures atomic commits, descriptive conventional commit messages, and eliminates accidental check-ins of temporary build artifacts or lockfile anomalies.",
    category: "DevOps & Automation",
    tags: ["Git", "Workflow", "Conventional Commits", "DevOps"],
    githubUrl: "https://github.com/anthropics/claude-code-skills",
    documentationUrl: "https://www.conventionalcommits.org/",
    resourceType: "Workflow Skill",
    createdDate: "2025-02-14",
    stars: 1420,
    author: "DevOps Working Group",
    license: "MIT",
    version: "v1.0.3",
    features: [
      "Conventional commit message generator (feat, fix, docs, chore)",
      "Automated inspection of staged files prior to commit",
      "Zero secret leakage safeguards",
      "Clean cherry-pick and rebase assistance"
    ],
    installation: {
      instructions: "Install using Claude Code skill installer.",
      command: "npx skills add anthropics/skills/git-agent-workflow"
    },
    prerequisites: ["git 2.30+"],
    usage: {
      instructions: "Claude Code uses this skill when preparing commits, creating branches, or generating release summaries.",
      tips: ["Run before pushing changes to origin."]
    },
    commands: [
      {
        name: "Add Git Skill",
        command: "npx skills add anthropics/skills/git-agent-workflow",
        description: "Enables Git conventional workflow agent"
      }
    ],
    codeExamples: [
      {
        title: "Conventional Commit Format",
        language: "bash",
        code: `git commit -m "feat(resources): implement dynamic .html routing with search and filter state"`
      }
    ],
    relatedResourceSlugs: ["ponytail", "github-automation"]
  },
  {
    id: "skill-tdd-agent",
    title: "Test-Driven Agent Discipline",
    slug: "tdd-agent-discipline",
    description: "Enforces red-green-refactor loops, isolated mock boundaries, and deterministic assertions.",
    overview: "Guides Claude Code to write failing unit tests before authoring implementation code. Ensures tests run in under 200ms, eliminates brittle snapshot assertions, and asserts exact edge conditions to prevent regression cascades.",
    category: "Testing & QA",
    tags: ["TDD", "Testing", "Vitest", "Jest", "Quality Assurance"],
    githubUrl: "https://github.com/anthropics/claude-code-skills",
    documentationUrl: "https://vitest.dev/",
    resourceType: "Workflow Skill",
    createdDate: "2025-02-19",
    stars: 2190,
    author: "Test Engineering Working Group",
    license: "MIT",
    version: "v1.2.0",
    features: [
      "Mandates writing minimal failing tests prior to touching production code",
      "Surgical mock definitions avoiding over-mocking standard JavaScript APIs",
      "Deterministic assertion rules with clear failure diagnostic messages",
      "Zero brittle snapshot reliance in favor of semantic invariant tests"
    ],
    installation: {
      instructions: "Add to your Claude Code workspace using npx skills runner.",
      command: "npx skills add anthropics/skills/tdd-agent-discipline"
    },
    prerequisites: ["Vitest, Jest, or Node Test Runner", "Node.js 18+"],
    usage: {
      instructions: "Invoke at the start of a feature or bug fix: instruct the agent to produce the reproducing test case first.",
      tips: [
        "Run vitest in watch mode to immediately capture verification state.",
        "Ensure tests complete within milliseconds to maintain fast agent feedback."
      ]
    },
    commands: [
      {
        name: "Add Skill",
        command: "npx skills add anthropics/skills/tdd-agent-discipline",
        description: "Installs the TDD discipline skill into your agent configuration"
      },
      {
        name: "Run Test Suite",
        command: "npx vitest run --reporter=verbose",
        description: "Executes test verification with explicit per-test timing"
      }
    ],
    codeExamples: [
      {
        title: "Deterministic Invariant Test",
        language: "typescript",
        code: `import { describe, it, expect } from 'vitest';
import { filterAndSortResources } from '../utils/searchHelpers';

describe('filterAndSortResources', () => {
  it('correctly filters resources by category with zero bleed', () => {
    const input = [
      { id: '1', category: 'Frontend Design', title: 'Taste Skill' },
      { id: '2', category: 'AI Coding Tools', title: 'Ponytail' }
    ];
    const result = filterAndSortResources(input, { selectedCategory: 'Frontend Design' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});`
      }
    ],
    relatedResourceSlugs: ["agent-evals-harness", "ponytail", "react-development"]
  },
  {
    id: "skill-database-schema",
    title: "Zero-Downtime Database Architect",
    slug: "database-schema-architect",
    description: "Pragmatic schema modeling, non-blocking migrations, and type-safe query builders.",
    overview: "Equips Claude Code with expert relational modeling patterns for PostgreSQL, SQLite, and MySQL. Enforces backward-compatible migrations, foreign key constraints with indexed lookup columns, and strict type generation using Drizzle or Prisma.",
    category: "Full-Stack Development",
    tags: ["Database", "SQL", "PostgreSQL", "Drizzle", "Prisma", "Migrations"],
    githubUrl: "https://github.com/anthropics/claude-code-skills",
    documentationUrl: "https://orm.drizzle.team/",
    resourceType: "Coding Skill",
    createdDate: "2025-02-08",
    stars: 2740,
    author: "Database Guild",
    license: "MIT",
    version: "v2.1.0",
    features: [
      "Zero-downtime expand-and-contract migration patterns",
      "Explicit column indexing on high-cardinality foreign keys",
      "Type-safe relation schemas preventing N+1 waterfall queries",
      "Strict data normalization to eliminate duplicate state"
    ],
    installation: {
      instructions: "Install the schema architect skill in your workspace.",
      command: "npx skills add anthropics/skills/database-schema-architect"
    },
    prerequisites: ["PostgreSQL or SQLite", "Drizzle ORM or Prisma"],
    usage: {
      instructions: "Invoke when designing tables, writing schema migrations, or optimizing complex join queries.",
      tips: [
        "Always add indexes to columns used in WHERE or JOIN clauses.",
        "Never perform destructive DROP COLUMN operations in a single deploy."
      ]
    },
    commands: [
      {
        name: "Add Skill",
        command: "npx skills add anthropics/skills/database-schema-architect",
        description: "Registers database architect best practices with Claude Code"
      }
    ],
    codeExamples: [
      {
        title: "Drizzle Type-Safe Schema Definition",
        language: "typescript",
        code: `import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';

export const resourcesTable = pgTable('resources', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (table) => ({
  categoryIdx: index('resources_category_idx').on(table.category)
}));`
      }
    ],
    relatedResourceSlugs: ["ponytail", "react-development"]
  },
  {
    id: "skill-accessibility-wcag",
    title: "WCAG AA Accessibility & Focus Auditor",
    slug: "accessibility-wcag",
    description: "Automated ARIA labeling, keyboard trap avoidance, and screen-reader navigable hierarchies.",
    overview: "Ensures all UI generated by Claude Code achieves flawless WCAG AA compliance. Enforces visible focus rings, proper heading tags, semantic landmark roles, descriptive button labels, and color-blind safe status signaling.",
    category: "Frontend Design",
    tags: ["Accessibility", "A11y", "WCAG", "ARIA", "Frontend"],
    githubUrl: "https://github.com/anthropics/claude-code-skills",
    documentationUrl: "https://www.w3.org/WAI/standards-guidelines/wcag/",
    resourceType: "Design Skill",
    createdDate: "2025-02-22",
    stars: 1940,
    author: "Inclusive Web Initiative",
    license: "MIT",
    version: "v1.1.2",
    features: [
      "Strict 4.5:1 text and 3:1 large text contrast ratio validation",
      "Visible focus rings (focus-visible) on all interactive affordances",
      "Touch targets guaranteed to meet or exceed 40px (44px on mobile)",
      "Zero color-only semantic signaling: always pairs status with text or icons"
    ],
    installation: {
      instructions: "Add to Claude Code skills configuration.",
      command: "npx skills add anthropics/skills/accessibility-wcag"
    },
    prerequisites: ["Modern frontend framework (React, Vue, Svelte)"],
    usage: {
      instructions: "Run before finalizing user interfaces to audit aria attributes, keyboard navigation, and contrast.",
      tips: ["Pairs with Hallmark for complete frontend quality verification."]
    },
    commands: [
      {
        name: "Audit Accessibility",
        command: "npx axe-cli http://localhost:3000",
        description: "Scans active application viewports for accessibility violations"
      }
    ],
    codeExamples: [
      {
        title: "Accessible Button with Visible Focus and Label",
        language: "jsx",
        code: `// ✅ Accessible icon-only button with aria-label and visible focus ring
<button
  type="button"
  onClick={toggleFavorite}
  aria-label={isFav ? "Remove from saved favorites" : "Save to favorites"}
  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors"
>
  <Star className="w-4 h-4" />
</button>`
      }
    ],
    relatedResourceSlugs: ["hallmark", "taste-skill"]
  }
];
