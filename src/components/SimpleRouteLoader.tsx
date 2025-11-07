"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Simple route loader that only shows when actual loading happens
const SimpleRouteLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Listen for beforeunload to detect navigation
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };

    // Listen for when page is visible again (navigation complete)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsLoading(false);
        setShowLoader(false);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Only show loader after delay
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 300);
    } else {
      setShowLoader(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              className="w-6 h-6 border border-gray-300 border-t-gray-900 rounded-full mx-auto mb-3"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-500 font-light text-sm tracking-wide">
              Loading
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SimpleRouteLoader;
