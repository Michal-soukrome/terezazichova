"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { artworks } from "../lib/artworks";

export default function Home() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const selectedImage =
    selectedImageIndex !== null ? artworks[selectedImageIndex] : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (event.key) {
        case "Escape":
          setSelectedImageIndex(null);
          break;
        case "ArrowLeft":
          event.preventDefault();
          navigateToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          navigateToNext();
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImageIndex]);

  const navigateToPrevious = () => {
    if (selectedImageIndex === null) return;
    const newIndex =
      selectedImageIndex === 0 ? artworks.length - 1 : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
  };

  const navigateToNext = () => {
    if (selectedImageIndex === null) return;
    const newIndex =
      selectedImageIndex === artworks.length - 1 ? 0 : selectedImageIndex + 1;
    setSelectedImageIndex(newIndex);
  };

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateToNext();
    } else if (isRightSwipe) {
      navigateToPrevious();
    }
  };

  return (
    <div className="min-h-screen py-5 lg:py-20 bg-white relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-75 bg-blueprint-pattern"></div>
      <div className="max-w-11/12 mx-auto px-3 lg:px-8 relative z-10">
        {/* Masonry-style grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid mb-4 group cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <div className="relative overflow-hidden ">
                {/* Real artwork images */}
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Minimal overlay on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                {/* Title appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-white">
                  <p className="font-light">{artwork.title}</p>
                  <p className="text-sm opacity-80">{artwork.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal - Minimal design */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors z-10 p-2  cursor-pointer hover:bg-opacity-10 rounded-full"
            aria-label="Close (ESC)"
          >
            <X size={30} />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToPrevious();
            }}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all z-10 p-3  cursor-pointer hover:bg-opacity-10 rounded-full"
            aria-label="Previous image (← Arrow)"
          >
            <ChevronLeft size={30} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToNext();
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all z-10 p-3  cursor-pointer hover:bg-opacity-10 rounded-full"
            aria-label="Next image (→ Arrow)"
          >
            <ChevronRight size={30} />
          </button>

          <div
            className="relative max-w-6xl max-h-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
              />
            </motion.div>

            {/* Minimal caption with image counter */}
            <div className="absolute -bottom-24 left-0 text-white flex items-start justify-between w-full">
              <div>
                <h3 className="text-xl font-light">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.year}</p>
                {selectedImage.medium && (
                  <p className="text-sm text-gray-400">
                    {selectedImage.medium}
                  </p>
                )}
                {selectedImage.dimensions && (
                  <p className="text-sm text-gray-400">
                    {selectedImage.dimensions}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  {selectedImageIndex! + 1} / {artworks.length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
