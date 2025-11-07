"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
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
    </div>
  );
}
