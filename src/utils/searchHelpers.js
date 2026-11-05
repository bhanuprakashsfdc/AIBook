/**
 * Search, filter, and sorting utilities for Claude Code resources.
 * Operates purely on central data arrays.
 */
export function filterAndSortResources(resources = [], {
  searchQuery = "",
  selectedCategory = "all",
  selectedTag = "all",
  selectedResourceType = "all",
  sortBy = "featured",
  favoritesOnly = false,
  favoriteIds = []
} = {}) {
  const query = searchQuery.trim().toLowerCase();

  let filtered = resources.filter(item => {
    // Favorites filter
    if (favoritesOnly && !favoriteIds.includes(item.id)) {
      return false;
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      const itemCat = (item.category || "").toLowerCase().replace(/[^a-z0-9]/g, "-");
      const filterCat = selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, "-");
      if (itemCat !== filterCat && item.category !== selectedCategory) {
        return false;
      }
    }

    // Resource Type filter
    if (selectedResourceType && selectedResourceType !== "all") {
      if (item.resourceType !== selectedResourceType) {
        return false;
      }
    }

    // Tag filter
    if (selectedTag && selectedTag !== "all") {
      const hasTag = Array.isArray(item.tags) && item.tags.some(
        t => t.toLowerCase() === selectedTag.toLowerCase()
      );
      if (!hasTag) {
        return false;
      }
    }

    // Search Query (title, description, tags, overview, author, category)
    if (query) {
      const matchTitle = (item.title || "").toLowerCase().includes(query);
      const matchDesc = (item.description || "").toLowerCase().includes(query);
      const matchOverview = (item.overview || "").toLowerCase().includes(query);
      const matchCategory = (item.category || "").toLowerCase().includes(query);
      const matchAuthor = (item.author || "").toLowerCase().includes(query);
      const matchTags = Array.isArray(item.tags) && item.tags.some(
        t => t.toLowerCase().includes(query)
      );

      if (!matchTitle && !matchDesc && !matchOverview && !matchCategory && !matchAuthor && !matchTags) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
      case "name-asc":
        return (a.title || "").localeCompare(b.title || "");
      case "alphabetical-desc":
      case "name-desc":
        return (b.title || "").localeCompare(a.title || "");
      case "recently-added":
      case "date-desc":
        return new Date(b.createdDate || "2025-01-01").getTime() - new Date(a.createdDate || "2025-01-01").getTime();
      case "stars":
        return (b.stars || 0) - (a.stars || 0);
      case "featured":
      default:
        // Featured order: Ponytail, Taste Skill, Hallmark prioritized, then stars
        const prioritySlugs = ["ponytail", "taste-skill", "hallmark"];
        const aIndex = prioritySlugs.indexOf(a.slug);
        const bIndex = prioritySlugs.indexOf(b.slug);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return (b.stars || 0) - (a.stars || 0);
    }
  });

  return filtered;
}
