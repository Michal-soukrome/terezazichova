"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomOut, ZoomIn } from "lucide-react";
import { artworks } from "../lib/artworks";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy load zoom component to avoid bloating initial bundle
const TransformWrapper = dynamic(
  () => import("react-zoom-pan-pinch").then((mod) => mod.TransformWrapper),
  { ssr: false }
);
const TransformComponent = dynamic(
  () => import("react-zoom-pan-pinch").then((mod) => mod.TransformComponent),
  { ssr: false }
);

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

  // Zoom state - track if user explicitly activated zoom mode
  const [zoomModeActive, setZoomModeActive] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showZoomMessage, setShowZoomMessage] = useState(false);
  const transformRef = useRef<any>(null);

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

  // Track slide direction for animations
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedYear, selectedCategory, selectedExhibition]);

  // Reset zoom when image changes
  useEffect(() => {
    if (transformRef.current && selectedImageIndex !== null) {
      transformRef.current.resetTransform();
      setIsZoomed(false);
    }
  }, [selectedImageIndex]);

  // Auto-hide zoom message after 2 seconds
  useEffect(() => {
    if (zoomModeActive) {
      setShowZoomMessage(true);
      const timer = setTimeout(() => {
        setShowZoomMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowZoomMessage(false);
    }
  }, [zoomModeActive]);

  // Note: Manual prefetch removed - Next.js handles this via priority prop
  // and hidden preload section below. Native browser lazy loading + Next.js
  // Image Optimization API already provide optimal loading performance.

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (event.key) {
        case "Escape":
          setSelectedImageIndex(null);
          break;
        case "ArrowLeft":
          if (filteredArtworks.length > 1) {
            event.preventDefault();
            navigateToPrevious();
          }
          break;
        case "ArrowRight":
          if (filteredArtworks.length > 1) {
            event.preventDefault();
            navigateToNext();
          }
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImageIndex, filteredArtworks.length]);

  const navigateToPrevious = () => {
    if (selectedImageIndex === null || filteredArtworks.length === 0) return;
    setSlideDirection("left");
    setLightboxImageLoaded(false);
    const newIndex =
      selectedImageIndex === 0
        ? filteredArtworks.length - 1
        : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
  };

  const navigateToNext = () => {
    if (selectedImageIndex === null || filteredArtworks.length === 0) return;
    setSlideDirection("right");
    setLightboxImageLoaded(false);
    const newIndex =
      selectedImageIndex === filteredArtworks.length - 1
        ? 0
        : selectedImageIndex + 1;
    setSelectedImageIndex(newIndex);
  };

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null
  );

  const minSwipeDistance = 50;
  const minSwipeDownDistance = 100;

  const onTouchStart = (e: React.TouchEvent) => {
    // Only handle touch if zoom mode is NOT active or on desktop
    if (zoomModeActive || !isMobile) return;

    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setIsSwipingDown(false);
    setSwipeDownOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Only handle touch if zoom mode is NOT active or on desktop
    if (zoomModeActive || !isMobile || !touchStart) return;

    const currentY = e.targetTouches[0].clientY;
    const currentX = e.targetTouches[0].clientX;
    setTouchEnd({ x: currentX, y: currentY });

    const deltaY = currentY - touchStart.y;
    const deltaX = currentX - touchStart.x;

    if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
      setIsSwipingDown(true);
      setSwipeDownOffset(Math.max(0, deltaY));
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    // Only handle touch if zoom mode is NOT active or on desktop
    if (zoomModeActive || !isMobile) return;

    if (!touchStart || !touchEnd) {
      setSwipeDownOffset(0);
      setIsSwipingDown(false);
      return;
    }

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchEnd.y - touchStart.y;

    if (isSwipingDown && deltaY > minSwipeDownDistance) {
      setSelectedImageIndex(null);
    } else if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      filteredArtworks.length > 1
    ) {
      // Allow horizontal swipe navigation if there are multiple images
      const isLeftSwipe = deltaX > minSwipeDistance;
      const isRightSwipe = deltaX < -minSwipeDistance;

      if (isLeftSwipe) {
        navigateToNext();
      } else if (isRightSwipe) {
        navigateToPrevious();
      }
    }

    setSwipeDownOffset(0);
    setIsSwipingDown(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Show filter bar after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowFilterBar(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen py-5 lg:py-20 bg-white relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-75 bg-blueprint-pattern"></div>
      <div className="max-w-11/12 mx-auto px-3 lg:px-8 relative z-10">
        {/* Masonry-style grid */}
        <motion.div
          className="columns-1 gap-4 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filteredArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="break-inside-avoid mb-4 group cursor-pointer border border-gray-100"
              onClick={() => {
                setLightboxImageLoaded(false);
                setSelectedImageIndex(index);
              }}
            >
              <div className="relative overflow-hidden">
                {/* Next.js Image with native lazy loading */}
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  width={600}
                  height={800}
                  className={`w-full h-auto object-cover transition-all duration-700 group-hover:scale-105 ${
                    index === 0
                      ? "opacity-100"
                      : imageLoadStates[index]
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  onLoad={() => handleImageLoad(index)}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  quality={index === 0 ? 90 : 75}
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

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isSwipingDown
              ? Math.max(0.3, 1 - swipeDownOffset / 300)
              : 1,
          }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
        >
          {/* Zoom controls with feedback */}
          <div className="w-full px-4 absolute top-4 left-0 flex items-start justify-between">
            {" "}
            <div className=" z-10 flex items-center gap-2">
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomModeActive(true);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm cursor-pointer"
                aria-label="Aktivovat přiblížení"
                title="Aktivovat přiblížení"
              >
                <ZoomIn className="w-6 h-6 text-white" />
              </button>
              {zoomModeActive && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (transformRef.current) {
                        transformRef.current.resetTransform();
                      }
                      setZoomModeActive(false);
                      setIsZoomed(false);
                    }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm cursor-pointer"
                    aria-label="Resetovat přiblížení"
                    title="Resetovat přiblížení (obnoví gesta)"
                  >
                    <ZoomOut className="w-6 h-6 text-white" />
                  </button>

                  {showZoomMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="fixed w-full flex items-center justify-center left-0 bottom-5 "
                    >
                      <span className="bg-black/80 backdrop-blur-sm text-gray-200 text-xs px-3 py-1.5 rounded-full  text-center border border-gray-200">
                        Nyní můžete přibližovat pomocí gest
                      </span>
                    </motion.div>
                  )}
                </>
              )}
            </div>
            <button
              onClick={() => setSelectedImageIndex(null)}
              className=" text-white hover:text-gray-300 transition-colors z-10 p-2 cursor-pointer hover:bg-opacity-10 rounded-full"
              aria-label="Zavřít (stiskněte klávesu ESC)"
            >
              <X size={30} />
            </button>
          </div>

          {/* Navigation buttons - only show if multiple images and zoom mode is not active */}
          {filteredArtworks.length > 1 && !zoomModeActive && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToPrevious();
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all z-10 p-3 cursor-pointer hover:bg-opacity-10 rounded-full"
                aria-label="Previous image (← Arrow)"
              >
                <ChevronLeft size={30} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToNext();
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all z-10 p-3 cursor-pointer hover:bg-opacity-10 rounded-full"
                aria-label="Next image (→ Arrow)"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selectedImage.id}
                initial={{
                  opacity: 0,
                  x: slideDirection === "left" ? -300 : 300,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: slideDirection === "left" ? 300 : -300,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                drag={
                  !zoomModeActive && filteredArtworks.length > 1 ? "x" : false
                }
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    navigateToNext();
                  } else if (swipe > 10000) {
                    navigateToPrevious();
                  }
                }}
                className={`relative ${
                  !zoomModeActive && filteredArtworks.length > 1
                    ? "cursor-grab active:cursor-grabbing"
                    : ""
                }`}
              >
                {/* Blurred placeholder while loading */}
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

                {/* High-res lightbox image - zoom always wrapped but disabled when not active */}
                <TransformWrapper
                  ref={transformRef}
                  initialScale={1}
                  minScale={1}
                  maxScale={4}
                  doubleClick={{ disabled: !zoomModeActive, mode: "toggle" }}
                  wheel={{ disabled: !zoomModeActive }}
                  panning={{ disabled: !zoomModeActive }}
                  pinch={{ disabled: !zoomModeActive }}
                  velocityAnimation={{ disabled: false }}
                  onTransformed={(ref, state) => {
                    if (zoomModeActive) {
                      setIsZoomed(state.scale > 1.01);
                    }
                  }}
                >
                  <TransformComponent
                    wrapperClass="!w-auto !h-auto"
                    contentClass="!w-auto !h-auto"
                  >
                    <Image
                      src={selectedImage.image}
                      alt={selectedImage.title}
                      width={1920}
                      height={1080}
                      quality={95}
                      className={`max-w-full max-h-[70vh] w-auto h-auto object-contain transition-all duration-500 ${
                        lightboxImageLoaded
                          ? "opacity-100 blur-0"
                          : "opacity-0 blur-sm"
                      }`}
                      priority
                      sizes="(max-width: 768px) 100vw, 90vw"
                      onLoad={() => setLightboxImageLoaded(true)}
                      draggable={false}
                    />
                  </TransformComponent>
                </TransformWrapper>
              </motion.div>
            </AnimatePresence>

            {/* Minimal caption */}
            <div className="mt-2 text-white flex items-start justify-between w-full">
              <div className="px-2">
                <h3 className="text-base font-light">{selectedImage.title}</h3>
                <p className="text-xs text-gray-300">{selectedImage.year}</p>
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
                className={`cursor-pointer px-4 py-2.5 pr-8 text-sm border border-gray-200/60 rounded-2xl bg-white/60 backdrop-blur hover:bg-white/80 hover:border-gray-300 transition-all focus:outline-none font-inter shadow-sm ${
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

            {/* Exhibition Filter */}
            <div className="relative">
              <select
                value={selectedExhibition}
                onChange={(e) => setSelectedExhibition(e.target.value)}
                className={`cursor-pointer px-4 py-2.5 pr-8 text-sm border border-gray-200/60 rounded-2xl bg-white/60 backdrop-blur hover:bg-white/80 hover:border-gray-300 transition-all focus:outline-none font-inter shadow-sm ${
                  isMobile ? "w-full" : "w-auto"
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
