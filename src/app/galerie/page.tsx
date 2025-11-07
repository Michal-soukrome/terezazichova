"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { artworks } from "../../lib/artworks";

export default function Gallery() {
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
    <div className="min-h-screen py-12 lg:py-20 bg-white">
      <div className="max-w-11/12 md:max-w-9/12 mx-auto px-6 lg:px-8">
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
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors z-10 p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
            aria-label="Close (ESC)"
          >
            <X size={32} />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToPrevious();
            }}
            className="absolute left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all z-10 p-3 hover:bg-white hover:bg-opacity-10 rounded-full"
            aria-label="Previous image (← Arrow)"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToNext();
            }}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all z-10 p-3 hover:bg-white hover:bg-opacity-10 rounded-full"
            aria-label="Next image (→ Arrow)"
          >
            <ChevronRight size={48} />
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
              className={`w-96 h-96 md:w-[600px] md:h-[600px] border border-white ${
                selectedImage.id % 2 === 0 ? "bg-black" : "bg-white"
              }`}
            />

            {/* Minimal caption with image counter */}
            <div className="absolute -bottom-20 left-0 text-white flex items-start justify-between w-full">
              <div>
                <h3 className="text-xl font-light">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.year}</p>
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
