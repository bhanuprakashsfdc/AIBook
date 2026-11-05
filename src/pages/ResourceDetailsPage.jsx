import React, { useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getResourceBySlug, addRecentlyViewed } from "../utils/dataHelpers";
import { ResourceDetails } from "../components/ResourceDetails";
import { NotFound } from "./NotFound";

export function ResourceDetailsPage({ favoriteIds = [], onToggleFavorite }) {
  const { slug, section } = useParams();
  const location = useLocation();

  // If the route is configured like "/:section/:slug" or direct "/skills/:slug.html"
  // Clean up any trailing .html or extract from pathname
  const cleanSlug = useMemo(() => {
    if (slug) {
      return slug.replace(/\.html$/, "");
    }
    // Fallback extraction from pathname
    const match = location.pathname.match(/\/([^\/]+)\.html$/);
    return match ? match[1] : "";
  }, [slug, location.pathname]);

  const targetSection = useMemo(() => {
    if (section) return section;
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length >= 2) {
      return parts[0];
    }
    return undefined;
  }, [section, location.pathname]);

  const resource = useMemo(() => {
    return getResourceBySlug(cleanSlug, targetSection);
  }, [cleanSlug, targetSection]);

  useEffect(() => {
    if (resource?.slug) {
      addRecentlyViewed(resource.slug);
      // Update page title
      document.title = `${resource.title} | Claude Code Resource Hub`;
    }
    return () => {
      document.title = "Claude Code Resource Hub";
    };
  }, [resource]);

  if (!resource) {
    return (
      <NotFound
        message={`Resource "${cleanSlug || location.pathname}" could not be found in ${targetSection || "the catalog"}.`}
      />
    );
  }

  const isFav = favoriteIds.includes(resource.id);

  return (
    <div className="py-2">
      <ResourceDetails
        resource={resource}
        isFavorite={isFav}
        onToggleFavorite={onToggleFavorite}
        currentSection={targetSection}
      />
    </div>
  );
}
