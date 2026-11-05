import { appData } from "../data/data";

/**
 * Returns all distinct resources across skills, projects, prompts, and repositories.
 * Normalizes section attribute on each item.
 */
export function getAllResources() {
  const all = [];
  const seenIds = new Set();

  const sections = [
    { name: "skills", items: appData.skills || [] },
    { name: "projects", items: appData.projects || [] },
    { name: "prompts", items: appData.prompts || [] },
    { name: "repositories", items: appData.repositories || [] }
  ];

  for (const { name, items } of sections) {
    for (const item of items) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        all.push({
          ...item,
          primarySection: name
        });
      }
    }
  }

  return all;
}

/**
 * Finds a specific resource by slug or ID across sections or within a specific section.
 * Handles both plain slug and slug with or without .html suffix.
 */
export function getResourceBySlug(slug, section) {
  if (!slug) return null;
  const cleanSlug = slug.replace(/\.html$/, "").toLowerCase();

  // If a specific section is targeted
  if (section && appData[section]) {
    const match = appData[section].find(
      item => item.slug?.toLowerCase() === cleanSlug || item.id?.toLowerCase() === cleanSlug
    );
    if (match) {
      return { ...match, primarySection: section };
    }
  }

  // Fallback: search across all sections
  const all = getAllResources();
  return all.find(
    item => item.slug?.toLowerCase() === cleanSlug || item.id?.toLowerCase() === cleanSlug
  ) || null;
}

/**
 * Generates the mandatory .html URL for a resource card or link.
 * Examples: /skills/ponytail.html, /projects/ai-dashboard.html
 */
export function getResourceUrl(resource, explicitSection) {
  if (!resource) return "/";
  const section = explicitSection || resource.primarySection || resource.section || "skills";
  const slug = resource.slug || resource.id;
  return `/${section}/${slug}.html`;
}

/**
 * Resolves an array of slug strings into complete resource objects.
 */
export function getRelatedResources(slugs = []) {
  if (!Array.isArray(slugs) || slugs.length === 0) return [];
  const all = getAllResources();
  return slugs
    .map(slug => all.find(r => r.slug === slug || r.id === slug))
    .filter(Boolean);
}

/**
 * Favorites persistence via localStorage
 */
const FAVORITES_STORAGE_KEY = "claude_resource_hub_favorites";

export function getStoredFavorites() {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveStoredFavorites(favIds) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favIds));
  } catch {
    // Graceful fallback if storage quota exceeded or disabled
  }
}

/**
 * Recently viewed persistence via localStorage
 */
const RECENT_STORAGE_KEY = "claude_resource_hub_recents";

export function getRecentlyViewed() {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(RECENT_STORAGE_KEY);
    const slugs = saved ? JSON.parse(saved) : [];
    return getRelatedResources(slugs);
  } catch {
    return [];
  }
}

export function addRecentlyViewed(slug) {
  if (!slug || typeof window === "undefined") return;
  try {
    const cleanSlug = slug.replace(/\.html$/, "");
    const saved = localStorage.getItem(RECENT_STORAGE_KEY);
    const current = saved ? JSON.parse(saved) : [];
    const updated = [cleanSlug, ...current.filter(s => s !== cleanSlug)].slice(0, 10);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore error
  }
}

/**
 * Computes all available tags with usage counts.
 */
export function getTagStats(resources = []) {
  const counts = {};
  for (const item of resources) {
    if (Array.isArray(item.tags)) {
      for (const tag of item.tags) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Validates that a resource record adheres to the required catalog schema.
 * Useful for automated tests and developer contribution workflows.
 */
export function validateResourceRecord(record) {
  const errors = [];
  if (!record) return { valid: false, errors: ["Record cannot be null or undefined"] };
  if (!record.id || typeof record.id !== "string") errors.push("Missing required string field 'id'");
  if (!record.title || typeof record.title !== "string") errors.push("Missing required string field 'title'");
  if (!record.slug || typeof record.slug !== "string") {
    errors.push("Missing required string field 'slug'");
  } else if (!/^[a-z0-9-]+$/.test(record.slug)) {
    errors.push("Field 'slug' must be lowercase alphanumeric with hyphens (e.g. 'my-resource-name')");
  }
  if (!record.description || typeof record.description !== "string") errors.push("Missing required string field 'description'");
  if (!record.category || typeof record.category !== "string") errors.push("Missing required string field 'category'");
  if (!record.resourceType || typeof record.resourceType !== "string") errors.push("Missing required string field 'resourceType'");
  if (!Array.isArray(record.tags) || record.tags.length === 0) errors.push("Field 'tags' must be a non-empty array of strings");

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Computes comprehensive hub metrics across all catalog records.
 */
export function getHubStatistics() {
  const all = getAllResources();
  const totalStars = all.reduce((sum, r) => sum + (r.stars || 0), 0);
  const categoriesMap = {};
  const typesMap = {};

  for (const item of all) {
    const cat = item.category || "Uncategorized";
    categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    const type = item.resourceType || "Other";
    typesMap[type] = (typesMap[type] || 0) + 1;
  }

  return {
    totalResources: all.length,
    totalSkills: (appData.skills || []).length,
    totalProjects: (appData.projects || []).length,
    totalPrompts: (appData.prompts || []).length,
    totalRepositories: (appData.repositories || []).length,
    totalStars,
    categoryCounts: categoriesMap,
    typeCounts: typesMap,
    uniqueTagsCount: getTagStats(all).length
  };
}

/**
 * Exports all hub records as a clean JSON formatted string.
 */
export function exportHubDataAsJson() {
  const data = {
    metadata: {
      exportedAt: new Date().toISOString(),
      schemaVersion: "2.0.0",
      totalRecords: getAllResources().length
    },
    skills: appData.skills || [],
    projects: appData.projects || [],
    prompts: appData.prompts || [],
    repositories: appData.repositories || []
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Copy-pasteable skeleton template for contributing new records to /src/data/.
 */
export const RESOURCE_SKELETON_TEMPLATE = `{
  id: "skill-example-tool",
  title: "My Claude Code Skill",
  slug: "example-tool",
  description: "One-sentence executive summary of what this resource provides.",
  overview: "Detailed overview explaining capabilities, architectural rationale, and context.",
  category: "AI Coding Tools", // Must match an existing category
  tags: ["Claude Code", "JavaScript", "Developer Tools"],
  githubUrl: "https://github.com/author/example-tool",
  documentationUrl: "https://example-tool.dev/",
  resourceType: "Coding Skill",
  createdDate: "2025-03-01",
  stars: 1250,
  author: "Author Name",
  license: "MIT",
  version: "v1.0.0",
  features: [
    "Feature description 1",
    "Feature description 2"
  ],
  installation: {
    instructions: "Install command description.",
    command: "npx skills add author/example-tool"
  },
  prerequisites: ["Node.js 18+"],
  usage: {
    instructions: "How to use this resource in your workflow.",
    tips: ["Pro tip 1"]
  },
  commands: [
    {
      name: "Run Command",
      command: "npx example-tool run",
      description: "Executes primary workflow"
    }
  ],
  codeExamples: [
    {
      title: "Quickstart Example",
      language: "javascript",
      code: "// Example code here"
    }
  ],
  relatedResourceSlugs: ["ponytail", "taste-skill"]
};`;

