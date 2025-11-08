// Core type definitions for the application

/**
 * Artwork type definition
 * Used across exhibitions and gallery features
 */
export interface Artwork {
  id: number;
  title: string;
  year: number;
  image: string;
  medium?: string;
  dimensions?: string;
  exhibition?: string;
  category: "traditional" | "non-traditional" | "minimalistic";
  tags?: string[];
}

/**
 * Tvorba (Own Work) item type
 * Used for artist's personal portfolio items
 */
export interface TvorbaItem {
  id: number;
  image: string;
  type: "malba" | "kresba" | "grafika";
  name: string;
  year: number | null;
}

/**
 * Image loading state
 * Tracks which images have loaded
 */
export type ImageLoadStates = {
  [key: number]: boolean;
};

/**
 * Filter types for artwork galleries
 */
export interface ArtworkFilters {
  selectedYear: number | null;
  selectedCategory: string;
  selectedExhibition: string;
}

export interface TvorbaFilters {
  selectedYear: number | null;
  selectedType: string;
}
