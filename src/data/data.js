import { skills } from "./skills";
import { projects } from "./projects";
import { prompts } from "./prompts";
import { repositories } from "./repositories";
import { categories, resourceTypes } from "./categories";

/**
 * Central Data Aggregator for the Claude Code Resource Hub.
 * All application components dynamically consume resources from this single point of truth.
 * No resource information is hardcoded inside React components.
 */
export const appData = {
  skills,
  projects,
  prompts,
  repositories,
  categories,
  resourceTypes
};

export { skills, projects, prompts, repositories, categories, resourceTypes };
