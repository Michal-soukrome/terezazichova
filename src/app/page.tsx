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
  const [lightboxImageLoaded, setLightboxImageLoaded] = useState(false);

  // Swipe down to close state
  const [swipeDownOffset, setSwipeDownOffset] = useState(0);
  const [isSwipingDown, setIsSwipingDown] = useState(false);

  // Filtering state
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedExhibition, setSelectedExhibition] = useState<string>("all");

  // Filter bar scroll state
  const [showFilterBar, setShowFilterBar] = useState(false);

  // Mobile detection for compact filters
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    setLightboxImageLoaded(false);
    const newIndex =
      selectedImageIndex === 0
        ? filteredArtworks.length - 1
        : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
  };

  const navigateToNext = () => {
    if (selectedImageIndex === null) return;
    setLightboxImageLoaded(false);
    const newIndex =
      selectedImageIndex === filteredArtworks.length - 1
        ? 0
        : selectedImageIndex + 1;
    setSelectedImageIndex(newIndex);
  };

  // Touch/swipe support for horizontal navigation and vertical close
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  const minSwipeDistance = 50;
  const minSwipeDownDistance = 100;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setIsSwipingDown(false);
    setSwipeDownOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentY = e.targetTouches[0].clientY;
    const currentX = e.targetTouches[0].clientX;

    setTouchEnd({ x: currentX, y: currentY });

    const deltaY = currentY - touchStart.y;
    const deltaX = currentX - touchStart.x;

    // Determine if this is a vertical or horizontal swipe
    if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
      // Vertical swipe down
      setIsSwipingDown(true);
      setSwipeDownOffset(Math.max(0, deltaY));
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setSwipeDownOffset(0);
      setIsSwipingDown(false);
      return;
    }

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchEnd.y - touchStart.y;

    // Check if it's a vertical swipe down
    if (isSwipingDown && deltaY > minSwipeDownDistance) {
      // Close the lightbox
      setSelectedImageIndex(null);
    } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      const isLeftSwipe = deltaX > minSwipeDistance;
      const isRightSwipe = deltaX < -minSwipeDistance;

      if (isLeftSwipe) {
        navigateToNext();
      } else if (isRightSwipe) {
        navigateToPrevious();
      }
    }

    // Reset swipe state
    setSwipeDownOffset(0);
    setIsSwipingDown(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Show filter bar on scroll or after delay
  useEffect(() => {
    // Option 1: Show immediately after a delay (uncomment to use)
    const timer = setTimeout(() => setShowFilterBar(true), 2000);
    return () => clearTimeout(timer);

    // Option 2: Show on scroll (current - adjust threshold below)
    // const SCROLL_THRESHOLD = 100; // Adjust this value (in pixels)

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setShowFilterBar(true);
      } else {
        setShowFilterBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      // Disable scroll
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [selectedImageIndex]);

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
              transition={{ duration: 0.6, delay: index * 0.25 }}
              className="break-inside-avoid mb-4 group cursor-pointer border border-gray-100"
              onClick={() => {
                setLightboxImageLoaded(false);
                setSelectedImageIndex(index);
              }}
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
          animate={{
            opacity: isSwipingDown
              ? Math.max(0.3, 1 - swipeDownOffset / 300)
              : 1,
          }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-5 right-5 text-white hover:text-gray-300 transition-colors z-10 p-2  cursor-pointer hover:bg-opacity-10 rounded-full"
            aria-label="Zavřít (stiskněte klávesu ESC)"
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
            className="relative max-w-6xl max-h-full transition-transform"
            style={{
              transform: isSwipingDown
                ? `translateY(${swipeDownOffset}px) scale(${Math.max(
                    0.85,
                    1 - swipeDownOffset / 1000
                  )})`
                : "translateY(0) scale(1)",
            }}
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
              {/* Blurred low-res version of the actual image */}
              {!lightboxImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    width={50}
                    height={50}
                    className="max-w-full max-h-[70vh] w-auto h-auto object-contain blur-2xl scale-110"
                    quality={1}
                  />
                </div>
              )}

              {/* Real lightbox image that loads in sharp */}
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className={`max-w-full max-h-[70vh] w-auto h-auto object-contain transition-all duration-500 ${
                  lightboxImageLoaded
                    ? "opacity-100 blur-0"
                    : "opacity-0 blur-sm"
                }`}
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                onLoad={() => setLightboxImageLoaded(true)}
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

      {/* Floating Glass Filter Pill */}
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{
          y: showFilterBar ? 0 : 100,
          opacity: showFilterBar ? 1 : 0,
          scale: showFilterBar ? 1 : 0.95,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
        className="fixed bottom-0 md:bottom-10 left-1/2 lg:left-[calc(50%+10rem)] transform -translate-x-1/2 z-30 w-full md:w-fit max-w-full md:max-w-2xl px-2 md:px-0"
      >
        <div className="backdrop-blur-2xl bg-white/70 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-3xl p-2 md:p-5 hover:shadow-[0_12px_48px_rgba(0,0,0,0.15)] transition-shadow duration-300">
          <div className="flex flex-nowrap gap-2 items-center justify-center w-full overflow-hidden">
            {/* Year Filter */}
            <div className="relative">
              <select
                value={selectedYear || ""}
                onChange={(e) =>
                  setSelectedYear(
                    e.target.value ? parseInt(e.target.value) : null
                  )
                }
                className={`cursor-pointer px-4 py-2.5 pr-8 text-sm border border-gray-200/60 rounded-2xl bg-white/60 backdrop-blur hover:bg-white/80 hover:border-gray-300 transition-all focus:ring-2 focus:ring-gray-400 focus:outline-none font-inter shadow-sm ${
                  isMobile ? "w-28" : "w-auto"
                }`}
              >
                <option value="">Kdy?</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {isMobile && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`cursor-pointer px-4 py-2.5 pr-8 text-sm border border-gray-200/60 rounded-2xl bg-white/60 backdrop-blur hover:bg-white/80 hover:border-gray-300 transition-all focus:ring-2 focus:ring-gray-400 focus:outline-none font-inter shadow-sm ${
                  isMobile ? "w-28" : "w-auto"
                }`}
              >
                <option value="all">Co?</option>
                <option value="traditional">Tradiční</option>
                <option value="non-traditional">Netradiční</option>
                <option value="minimalistic">Minimalistické</option>
              </select>
              {isMobile && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Exhibition Filter */}
            <div className="relative">
              <select
                value={selectedExhibition}
                onChange={(e) => setSelectedExhibition(e.target.value)}
                className={`cursor-pointer px-4 py-2.5 pr-8 text-sm border border-gray-200/60 rounded-2xl bg-white/60 backdrop-blur hover:bg-white/80 hover:border-gray-300 transition-all focus:ring-2 focus:ring-gray-400 focus:outline-none font-inter shadow-sm ${
                  isMobile ? "w-24" : "w-auto"
                }`}
              >
                <option value="all">Kde?</option>
                {uniqueExhibitions.map((exhibition) => (
                  <option key={exhibition} value={exhibition}>
                    {exhibition}
                  </option>
                ))}
              </select>
              {isMobile && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
