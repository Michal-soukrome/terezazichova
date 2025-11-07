// Image utilities for optimal Next.js performance

export interface ArtworkImage {
  id: number;
  title: string;
  year: number;
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  category?: string;
}

// Generate blur data URL for smooth loading
export const generateBlurDataURL = (
  width: number = 8,
  height: number = 8
): string => {
  const canvas =
    typeof window !== "undefined" ? document.createElement("canvas") : null;
  if (!canvas) {
    // Fallback base64 blur for SSR
    return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7+w=";
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL("image/jpeg", 0.1);
};

// Responsive image sizes for different breakpoints
export const getImageSizes = (
  type: "gallery" | "hero" | "portrait"
): string => {
  switch (type) {
    case "gallery":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw";
    case "hero":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw";
    case "portrait":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw";
    default:
      return "100vw";
  }
};

// Image loading priority helper
export const getImagePriority = (
  index: number,
  type: "gallery" | "hero" | "portrait"
): boolean => {
  if (type === "hero") return true;
  if (type === "gallery" && index < 4) return true; // First 4 gallery images
  if (type === "portrait") return true;
  return false;
};

// Sample artwork data with optimized structure
export const sampleArtworks: ArtworkImage[] = [
  {
    id: 1,
    title: "Untitled I",
    year: 2024,
    src: "/images/gallery/artwork-1.jpg",
    width: 800,
    height: 1200,
    blurDataURL: generateBlurDataURL(),
  },
  {
    id: 2,
    title: "Untitled II",
    year: 2024,
    src: "/images/gallery/artwork-2.jpg",
    width: 600,
    height: 800,
    blurDataURL: generateBlurDataURL(),
  },
  {
    id: 3,
    title: "Untitled III",
    year: 2023,
    src: "/images/gallery/artwork-3.jpg",
    width: 1000,
    height: 600,
    blurDataURL: generateBlurDataURL(),
  },
  // Add more artworks as needed
];
