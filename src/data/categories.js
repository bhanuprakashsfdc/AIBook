/**
 * Central category definitions and metadata for the Claude Code Resource Hub.
 * Used for dynamic filtering, category badges, and navigation.
 */
export const categories = [
  { id: "all", name: "All Categories", count: 0 },
  { id: "ai-coding-tools", name: "AI Coding Tools", count: 0, description: "Disciplines, agents, and workflows for automated code generation" },
  { id: "frontend-design", name: "Frontend Design", count: 0, description: "Anti-slop design skills, typography systems, and UI refinement" },
  { id: "fullstack-development", name: "Full-Stack Development", count: 0, description: "Production templates, API integration, and database tooling" },
  { id: "devops-automation", name: "DevOps & Automation", count: 0, description: "GitHub actions, CI/CD pipelines, and environment management" },
  { id: "testing-qa", name: "Testing & QA", count: 0, description: "Automated test generation, regression suites, and verification" },
  { id: "architecture-planning", name: "Architecture & Planning", count: 0, description: "System specification, requirement synthesis, and RFC generation" }
];

export const resourceTypes = [
  { id: "all", label: "All Types" },
  { id: "Coding Skill", label: "Coding Skills" },
  { id: "Design Skill", label: "Design Skills" },
  { id: "Workflow Skill", label: "Workflow Skills" },
  { id: "Project Template", label: "Project Templates" },
  { id: "Full-Stack App", label: "Full-Stack Apps" },
  { id: "System Prompt", label: "System Prompts" },
  { id: "Task Prompt", label: "Task Prompts" },
  { id: "Repository", label: "Repositories" }
];
