"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function About() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  return (
    <div className="min-h-screen py-6 lg:py-20 bg-white">
      <div className="absolute inset-0 pointer-events-none opacity-75 bg-grid-pattern"></div>
      <div className="max-w-11/12 md:max-w-9/12  mx-auto px-3 lg:px-8 relative z-10">
        {/* Artist image and bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Artist Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative cursor-pointer group"
            onClick={() => setIsLightboxOpen(true)}
          >
            <div className="aspect-4/5 bg-gray-100 overflow-hidden relative">
              <Image
                src="/images/ja/AAA00176-scaled.jpg"
                alt="Tereza Zichová - Portrét umělkyně"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* Minimal bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8 lg:pt-8"
          >
            <div className="space-y-6 font-inter text-lg leading-relaxed text-black font-light">
              <p>
                Zkoumám průnik mezi digitálním a analogovým světem a vytvářím
                díla, která zpochybňují hranice současného umění.
              </p>
              <p>
                Žiji v Praze a moje tvorba zahrnuje různá média - od tradičního
                malířství až po digitální manipulaci. Vždy hledám nové způsoby,
                jak vyjádřit složitost moderní existence.
              </p>
            </div>

            {/* Simple facts */}
            <div className="pt-8 space-y-2 font-inter text-sm text-gray-700 font-light">
              <p>Narozena 1995, Praha</p>
              <p>MgA. Výtvarné umění, 2020</p>
              <p>Vybrané výstavy napříč Evropou</p>
            </div>
          </motion.div>
        </div>

        {/* Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        ></motion.section>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors z-10 p-2  cursor-pointer hover:bg-opacity-10 rounded-full"
            aria-label="Zavřít (stiskněte klávesu ESC)"
          >
            <X size={30} />
          </button>

          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Image
                src="/images/ja/AAA00176-scaled.jpg"
                alt="Tereza Zichová - Portrét umělkyně"
                width={1200}
                height={1500}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
