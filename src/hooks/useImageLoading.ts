import { useState, useCallback } from "react";
import { ImageLoadStates } from "@/types";

/**
 * Hook to manage image loading states
 * Tracks which images have completed loading
 *
 * @returns Object with imageLoadStates and handleImageLoad function
 */
export function useImageLoading() {
  const [imageLoadStates, setImageLoadStates] = useState<ImageLoadStates>({});
  const [lightboxImageLoaded, setLightboxImageLoaded] = useState(false);

  const handleImageLoad = useCallback((index: number) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: true }));
  }, []);

  const resetLightboxLoaded = useCallback(() => {
    setLightboxImageLoaded(false);
  }, []);

  return {
    imageLoadStates,
    lightboxImageLoaded,
    setLightboxImageLoaded,
    handleImageLoad,
    resetLightboxLoaded,
  };
}
