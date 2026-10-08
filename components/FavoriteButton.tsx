"use client";

import { useEffect, useState } from "react";
import { isFavorite, toggleFavorite, FAVORITES_EVENT } from "@/lib/storage/favorites";

interface FavoriteButtonProps {
  slug: string;
  toolName: string;
  category: string;
  metaDescription?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function FavoriteButton({
  slug,
  toolName,
  category,
  metaDescription,
  size = "md",
  showLabel = false,
  className = "",
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavorited(isFavorite(slug));

    const handleUpdate = () => {
      setFavorited(isFavorite(slug));
    };

    window.addEventListener(FAVORITES_EVENT, handleUpdate);
    return () => window.removeEventListener(FAVORITES_EVENT, handleUpdate);
  }, [slug]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = toggleFavorite({ slug, toolName, category, metaDescription });
    setFavorited(nextState);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Add to favorites"
        className={`inline-flex items-center gap-1.5 rounded-lg text-gray-400 hover:text-amber-500 transition-colors ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        {showLabel && <span className="text-sm font-medium">Favorite</span>}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={favorited ? `Remove ${toolName} from favorites` : `Add ${toolName} to favorites`}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`group/fav inline-flex items-center gap-1.5 rounded-lg p-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
        favorited
          ? "text-amber-500 hover:text-amber-600 bg-amber-50/80"
          : "text-gray-400 hover:text-amber-500 hover:bg-gray-100/80"
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        className={`transition-transform duration-200 group-hover/fav:scale-110 ${
          size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      {showLabel && (
        <span className="text-sm font-medium">
          {favorited ? "Favorited" : "Add to Favorites"}
        </span>
      )}
    </button>
  );
}
