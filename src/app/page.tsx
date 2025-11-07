"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { artworks } from "../lib/artworks";
import Image from "next/image";

export default function Home() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [imageLoadStates, setImageLoadStates] = useState<{
    [key: number]: boolean;
  }>({});

  // Filtering state
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedExhibition, setSelectedExhibition] = useState<string>("all");

  // Filter artworks based on selected filters
  const filteredArtworks = artworks.filter((artwork) => {
    const yearMatch = selectedYear === null || artwork.year === selectedYear;
    const categoryMatch =
      selectedCategory === "all" || artwork.category === selectedCategory;
    const exhibitionMatch =
      selectedExhibition === "all" || artwork.exhibition === selectedExhibition;

    return yearMatch && categoryMatch && exhibitionMatch;
  });

  // Get unique values for filter options
  const uniqueYears = [...new Set(artworks.map((a) => a.year))].sort(
    (a, b) => b - a
  );
  const uniqueCategories = [...new Set(artworks.map((a) => a.category))];
  const uniqueExhibitions = [
    ...new Set(artworks.map((a) => a.exhibition)),
  ].filter(Boolean);

  const selectedImage =
    selectedImageIndex !== null ? filteredArtworks[selectedImageIndex] : null;

  // Track image loading states
  const handleImageLoad = (index: number) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: true }));
  };

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
      selectedImageIndex === 0
        ? filteredArtworks.length - 1
        : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
  };

  const navigateToNext = () => {
    if (selectedImageIndex === null) return;
    const newIndex =
      selectedImageIndex === filteredArtworks.length - 1
        ? 0
        : selectedImageIndex + 1;
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

  // Preload critical images on component mount
  useEffect(() => {
    // Preload first 4 images in the background
    artworks.slice(0, 4).forEach((artwork, index) => {
      const img = new window.Image();
      img.src = artwork.image;
      img.onload = () => handleImageLoad(index);
    });
  }, []);

  return (
    <div className="min-h-screen py-5 lg:py-20 bg-white relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-75 bg-blueprint-pattern"></div>
      <div className="max-w-11/12 mx-auto px-3 lg:px-8 relative z-10">
        {/* Filter Controls */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-4 items-center">
            {/* Year Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-inter font-medium text-gray-700">
                Rok:
              </label>
              <select
                value={selectedYear || ""}
                onChange={(e) =>
                  setSelectedYear(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 transition-colors"
              >
                <option value="">Všechny</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-inter font-medium text-gray-700">
                Styl:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 transition-colors"
              >
                <option value="all">Všechny</option>
                <option value="traditional">Tradiční</option>
                <option value="non-traditional">Netradiční</option>
                <option value="minimalistic">Minimalistické</option>
              </select>
            </div>

            {/* Exhibition Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-inter font-medium text-gray-700">
                Výstava:
              </label>
              <select
                value={selectedExhibition}
                onChange={(e) => setSelectedExhibition(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:border-gray-400 transition-colors"
              >
                <option value="all">Všechny</option>
                {uniqueExhibitions.map((exhibition) => (
                  <option key={exhibition} value={exhibition}>
                    {exhibition}
                  </option>
                ))}
              </select>
            </div>

            {/* Results count */}
            <div className="ml-auto text-sm text-gray-500 font-inter">
              {filteredArtworks.length} z {artworks.length} děl
            </div>
          </div>
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid mb-4 group cursor-pointer border border-gray-100"
              onClick={() => setSelectedImageIndex(index)}
            >
              <div className="relative overflow-hidden ">
                {/* Skeleton/Blur placeholder */}
                {!imageLoadStates[index] && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse">
                    <div className="w-full h-48 bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
                  </div>
                )}

                {/* Real artwork images */}
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  width={600}
                  height={800}
                  className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 ${
                    imageLoadStates[index] ? "opacity-100" : "opacity-0"
                  }`}
                  priority={index < 4} // First 4 images load with priority
                  onLoad={() => handleImageLoad(index)}
                  loading={index < 4 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              className="relative"
            >
              {/* Real lightbox image with built-in blur placeholder */}
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </motion.div>

            {/* Minimal caption with image counter */}
            <div className="px-4 mt-2 text-white flex items-start justify-between w-full">
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
                  {selectedImageIndex! + 1} / {filteredArtworks.length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
