"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import LoadingLink from "../components/LoadingLink";
import { artworks } from "../lib/artworks";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative lg:h-screen h-[70vh] flex flex-col">
        {/* Main artwork showcase */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
            <div className="w-full h-full flex items-center justify-center lg:justify-start lg:pl-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center lg:text-left text-white max-w-2xl px-6 lg:px-0"
              >
                <h1 className="font-poppins text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
                  Tereza
                  <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 opacity-80 font-normal">
                    Zichová
                  </span>
                </h1>
                <p className="font-inter text-lg md:text-xl lg:text-2xl font-light opacity-70 mb-8 tracking-wide">
                  Výtvarná umělkyně
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <LoadingLink
                    href="/galerie"
                    className="inline-block px-8 py-3 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-inter font-medium tracking-wide"
                  >
                    Prohlédnout díla
                  </LoadingLink>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* Gallery Preview */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-11/12 md:max-w-9/12 mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-poppins text-3xl lg:text-5xl font-medium tracking-tight text-black mb-4">
              Vybraná díla
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-inter text-gray-600 font-light tracking-wide"
            >
              Prohlédněte si ukázky z mého portfolia
            </motion.p>
          </motion.div>

          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="break-inside-avoid mb-4 group cursor-pointer"
              >
                <LoadingLink href="/galerie">
                  <div className="relative overflow-hidden border border-black">
                    {/* Placeholder black/white rectangles */}
                    <div
                      className={`w-full transition-transform duration-500 group-hover:scale-105 ${
                        index % 6 === 0
                          ? "bg-black h-80"
                          : index % 6 === 1
                          ? "bg-white h-96"
                          : index % 6 === 2
                          ? "bg-black h-64"
                          : index % 6 === 3
                          ? "bg-white h-72"
                          : index % 6 === 4
                          ? "bg-black h-88"
                          : "bg-white h-80"
                      }`}
                    ></div>

                    {/* Minimal overlay on hover */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                    {/* Title appears on hover */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${
                        index % 2 === 0 ? "text-white" : "text-black"
                      }`}
                    >
                      <p className="font-light">{artwork.title}</p>
                      <p className="text-sm opacity-80">{artwork.year}</p>
                    </div>
                  </div>
                </LoadingLink>
              </motion.div>
            ))}
          </motion.div>

          {/* View more CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <LoadingLink
              href="/galerie"
              className="inline-block px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors duration-300 font-inter font-medium tracking-wide"
            >
              Zobrazit všechna díla
            </LoadingLink>
          </motion.div>
        </div>
      </section>

      {/* Artist statement */}
      <section className="py-20 bg-black">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="font-poppins text-2xl md:text-3xl font-light leading-relaxed text-white tracking-tight">
              "Tvořím vizuální příběhy pomocí barvy, formy a emocí"
            </p>
            <div className="mt-8 flex justify-center space-x-8">
              <LoadingLink
                href="/ja"
                className="text-lg font-light hover:underline decoration-2 underline-offset-4 text-white"
              >
                O mně
              </LoadingLink>
              <LoadingLink
                href="/kontakt"
                className="text-lg font-light hover:underline decoration-2 underline-offset-4 text-white"
              >
                Kontakt
              </LoadingLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
