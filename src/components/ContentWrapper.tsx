"use client";

import { useLoading } from "./LoadingProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const { isLoading } = useLoading();

  return (
    <div className="relative flex-1 flex flex-col">
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-40 bg-white/95 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                className="w-6 h-6 border border-gray-300 border-t-gray-900 rounded-full mx-auto mb-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 font-light text-sm tracking-wide"
              ></motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentWrapper;
