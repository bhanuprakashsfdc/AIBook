import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Skills } from "./pages/Skills";
import { Projects } from "./pages/Projects";
import { Prompts } from "./pages/Prompts";
import { Repositories } from "./pages/Repositories";
import { Favorites } from "./pages/Favorites";
import { ResourceDetailsPage } from "./pages/ResourceDetailsPage";
import { NotFound } from "./pages/NotFound";
import { DataSchemaModal } from "./components/DataSchemaModal";
import { CommandPalette } from "./components/CommandPalette";
import { ClaudeConfigGeneratorModal } from "./components/ClaudeConfigGeneratorModal";
import { Toast } from "./components/Toast";
import { appData } from "./data/data";
import { 
  getStoredFavorites, 
  saveStoredFavorites, 
  getRecentlyViewed, 
  getAllResources 
} from "./utils/dataHelpers";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

interface MainLayoutProps {
  children: React.ReactNode;
  theme: string;
  onToggleTheme: () => void;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDataModal: () => void;
  onOpenPalette: () => void;
  onOpenConfigModal: () => void;
}

function MainLayout({ 
  children, 
  theme, 
  onToggleTheme, 
  favoriteIds, 
  onToggleFavorite, 
  onOpenDataModal,
  onOpenPalette,
  onOpenConfigModal
}: MainLayoutProps) {
  const location = useLocation();
  const recentlyViewed = useMemo(() => getRecentlyViewed(), [location.pathname]);

  const totalCounts = useMemo(() => ({
    all: getAllResources().length,
    skills: (appData.skills || []).length,
    projects: (appData.projects || []).length,
    prompts: (appData.prompts || []).length,
    repositories: (appData.repositories || []).length,
  }), []);

  // Check if we are on a detail page or 404 to decide sidebar layout
  const isDetailPage = location.pathname.includes(".html") && !location.pathname.endsWith("index.html");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header
        theme={theme}
        onToggleTheme={onToggleTheme}
        favoriteCount={favoriteIds.length}
        onOpenDataModal={onOpenDataModal}
        onOpenPalette={onOpenPalette}
        onOpenConfigModal={onOpenConfigModal}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isDetailPage ? (
          <div>{children}</div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <Sidebar
              favoriteCount={favoriteIds.length}
              totalCounts={totalCounts}
              recentlyViewed={recentlyViewed as any}
              onOpenDataModal={onOpenDataModal}
              onOpenConfigModal={onOpenConfigModal}
            />
            <div className="flex-1 w-full min-w-0">
              {children}
            </div>
          </div>
        )}
      </main>

      {/* Clean Developer-Focused Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8 text-xs text-slate-500 dark:text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Claude Code Resource Hub</span>
            <span aria-hidden="true">·</span>
            <span>Governed by Ponytail YAGNI & Taste anti-slop guidelines</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="https://github.com/DietrichGebert/ponytail"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Ponytail
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://github.com/Leonxlnx/taste-skill"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Taste Skill
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://github.com/Nutlope/hallmark"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Hallmark
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("claude_hub_theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  const [favoriteIds, setFavoriteIds] = useState(() => getStoredFavorites());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("claude_hub_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => setToastMessage(msg);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener for Spotlight Command Palette
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev: string[]) => {
      const isRemoving = prev.includes(id);
      const next = isRemoving ? prev.filter((x: string) => x !== id) : [...prev, id];
      saveStoredFavorites(next);
      showToast(isRemoving ? "Removed from favorites" : "Added to favorites");
      return next;
    });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout
        theme={theme}
        onToggleTheme={toggleTheme}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
      >
        <Routes>
          {/* Dashboard Home */}
          <Route
            path="/"
            element={<Dashboard favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/index.html"
            element={<Dashboard favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          {/* Primary Hub Section Routes */}
          <Route
            path="/skills"
            element={<Skills favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/skills.html"
            element={<Skills favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          <Route
            path="/projects"
            element={<Projects favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/projects.html"
            element={<Projects favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          <Route
            path="/prompts"
            element={<Prompts favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/prompts.html"
            element={<Prompts favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          <Route
            path="/repositories"
            element={<Repositories favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/repositories.html"
            element={<Repositories favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          <Route
            path="/favorites"
            element={<Favorites favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/favorites.html"
            element={<Favorites favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          {/* Dynamic Detail Pages with .html extensions */}
          <Route
            path="/skills/:slug.html"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/skills/:slug"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          <Route
            path="/projects/:slug.html"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/projects/:slug"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          <Route
            path="/prompts/:slug.html"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/prompts/:slug"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          <Route
            path="/repositories/:slug.html"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/repositories/:slug"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          {/* Generic catch-all for any :section/:slug.html or :section/:slug */}
          <Route
            path="/:section/:slug.html"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/:section/:slug"
            element={<ResourceDetailsPage favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />}
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
      <DataSchemaModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
      />
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
      />
      <ClaudeConfigGeneratorModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onShowToast={showToast}
      />
      <Toast
        message={toastMessage || ""}
        onClose={() => setToastMessage(null)}
      />
    </BrowserRouter>
  );
}
