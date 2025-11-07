"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Minimalistic rotating squares loader */}
        <div className="relative w-12 h-12 mx-auto mb-6">
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer square */}
              <rect
                x="2"
                y="2"
                width="44"
                height="44"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="text-black"
              />
              {/* Inner square */}
              <rect
                x="12"
                y="12"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="text-gray-400"
              />
            </svg>
          </motion.div>

          {/* Counter-rotating inner element */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
          </motion.div>
        </div>

        {/* Alternative: Sliding lines loader */}
        {/* <div className="flex space-x-1 mx-auto mb-6 w-12 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-8 bg-black"
              animate={{
                scaleY: [1, 0.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div> */}

        {/* Alternative: Morphing shapes loader */}
        {/* <motion.div
          className="w-12 h-12 mx-auto mb-6"
          animate={{
            borderRadius: ["0%", "50%", "0%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full border border-black bg-transparent"></div>
        </motion.div> */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gray-600 font-inter font-light text-sm tracking-[0.2em] uppercase"
        >
          Loading
        </motion.p>
      </div>
    </div>
  );
}
