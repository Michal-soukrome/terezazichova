"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen py-6 lg:py-20 bg-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-poppins text-6xl lg:text-8xl font-medium tracking-tight text-black mb-6">
            404
          </h1>
          <p className="font-inter text-gray-600 text-lg mb-8 font-light tracking-wide">
            Stránka nebyla nalezena
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/"
              className="inline-block px-8 py-3  text-black hover:bg-black hover:text-white transition-all duration-300 font-inter font-medium tracking-wide"
            >
              Zpět na hlavní stránku
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
