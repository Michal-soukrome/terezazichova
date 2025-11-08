import { useState, useEffect } from "react";

/**
 * Hook to detect mobile viewport
 * @param breakpoint - Width in pixels to consider mobile (default: 768)
 * @returns boolean indicating if viewport is mobile size
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
