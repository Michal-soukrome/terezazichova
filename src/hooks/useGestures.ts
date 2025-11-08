import { useState, useCallback } from "react";

/**
 * Hook to manage swipe-down-to-close gesture
 * Handles touch events for closing lightbox by swiping down
 *
 * @returns Object with swipe state and offset
 */
export function useSwipeDown() {
  const [swipeDownOffset, setSwipeDownOffset] = useState(0);
  const [isSwipingDown, setIsSwipingDown] = useState(false);

  const resetSwipe = useCallback(() => {
    setSwipeDownOffset(0);
    setIsSwipingDown(false);
  }, []);

  return {
    swipeDownOffset,
    setSwipeDownOffset,
    isSwipingDown,
    setIsSwipingDown,
    resetSwipe,
  };
}

/**
 * Hook to manage zoom state in lightbox
 * Tracks if user is currently zoomed in
 *
 * @returns Object with zoom state and setter
 */
export function useZoomState() {
  const [isZoomed, setIsZoomed] = useState(false);

  const resetZoom = useCallback(() => {
    setIsZoomed(false);
  }, []);

  return {
    isZoomed,
    setIsZoomed,
    resetZoom,
  };
}
