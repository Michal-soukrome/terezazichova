"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomOut, ZoomIn } from "lucide-react";
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

// Tvorba data structure
const tvorbaItems = [
  {
    id: 1,
    image: "/images/tvorba/malba1.jpg",
    type: "malba",
    name: "",
    year: null,
  },
  {
    id: 2,
    image: "/images/tvorba/malba2.jpg",
    type: "malba",
    name: "",
    year: null,
  },
  {
    id: 3,
    image: "/images/tvorba/malba3.jpg",
    type: "malba",
    name: "",
    year: null,
  },
  {
    id: 4,
    image: "/images/tvorba/kresba1.jpg",
    type: "kresba",
    name: "", // To be filled later
    year: null, // To be filled later
  },
  {
    id: 5,
    image: "/images/tvorba/kresba2.jpg",
    type: "kresba",
    name: "",
    year: null,
  },
  {
    id: 6,
    image: "/images/tvorba/kresba3.jpg",
    type: "kresba",
    name: "",
    year: null,
  },

  {
    id: 7,
    image: "/images/tvorba/grafika1.jpg",
    type: "grafika",
    name: "",
    year: null,
  },
  {
    id: 8,
    image: "/images/tvorba/grafika2.jpg",
    type: "grafika",
    name: "",
    year: null,
  },
  {
    id: 9,
    image: "/images/tvorba/grafika3.jpg",
    type: "grafika",
    name: "",
    year: null,
  },
];

export default function TvorbaPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [imageLoadStates, setImageLoadStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [lightboxImageLoaded, setLightboxImageLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set()
  );

  // Swipe down to close state
  const [swipeDownOffset, setSwipeDownOffset] = useState(0);
  const [isSwipingDown, setIsSwipingDown] = useState(false);

  // Zoom state - track if user explicitly activated zoom mode
  const [zoomModeActive, setZoomModeActive] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const transformRef = useRef<any>(null);

  // Filtering state
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>("all");

  // Filter bar scroll state
  const [showFilterBar, setShowFilterBar] = useState(false);

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedYear, selectedType]);

  // Reset zoom when image changes
  useEffect(() => {
    if (transformRef.current && selectedImageIndex !== null) {
      transformRef.current.resetTransform();
      setIsZoomed(false);
    }
  }, [selectedImageIndex]);

  // Mobile detection for compact filters
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter items based on selected filters
  const filteredItems = tvorbaItems.filter((item) => {
    const yearMatch = selectedYear === null || item.year === selectedYear;
    const typeMatch = selectedType === "all" || item.type === selectedType;

    return yearMatch && typeMatch;
  });

  // Get unique values for filter options
  const uniqueYears = [
    ...new Set(
      tvorbaItems.map((i) => i.year).filter((y) => y !== null) as number[]
    ),
  ].sort((a, b) => b - a);
  const uniqueTypes = [...new Set(tvorbaItems.map((i) => i.type))];

  const selectedImage =
    selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  // Preload all filtered images aggressively
  useEffect(() => {
    filteredItems.forEach((item) => {
      if (!preloadedImages.has(item.image)) {
        const img = document.createElement("img");
        img.src = item.image;
        img.onload = () => {
          setPreloadedImages((prev) => new Set(prev).add(item.image));
        };
      }
    });
  }, [filteredItems, preloadedImages]);

  // Preload adjacent images when lightbox opens
  useEffect(() => {
    if (selectedImageIndex !== null) {
      // Preload previous and next images
      const preloadIndexes = [
        selectedImageIndex - 1,
        selectedImageIndex,
        selectedImageIndex + 1,
      ].filter((i) => i >= 0 && i < filteredItems.length);

      preloadIndexes.forEach((index) => {
        const item = filteredItems[index];
        if (item && !preloadedImages.has(item.image)) {
          const img = document.createElement("img");
          img.src = item.image;
          img.onload = () => {
            setPreloadedImages((prev) => new Set(prev).add(item.image));
          };
        }
      });
    }
  }, [selectedImageIndex, filteredItems, preloadedImages]);

  // Track image loading states
  const handleImageLoad = (index: number) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: true }));
  };

  // Track slide direction for animations
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      switch (event.key) {
        case "Escape":
          setSelectedImageIndex(null);
          break;
        case "ArrowLeft":
          if (filteredItems.length > 1) {
            event.preventDefault();
            navigateToPrevious();
          }
          break;
        case "ArrowRight":
          if (filteredItems.length > 1) {
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
  }, [selectedImageIndex, filteredItems.length]);

  const navigateToPrevious = () => {
    if (selectedImageIndex === null || filteredItems.length === 0) return;
    setSlideDirection("left");
    setLightboxImageLoaded(false);
    const newIndex =
      selectedImageIndex === 0
        ? filteredItems.length - 1
        : selectedImageIndex - 1;
    setSelectedImageIndex(newIndex);
  };

  const navigateToNext = () => {
    if (selectedImageIndex === null || filteredItems.length === 0) return;
    setSlideDirection("right");
    setLightboxImageLoaded(false);
    const newIndex =
      selectedImageIndex === filteredItems.length - 1
        ? 0
        : selectedImageIndex + 1;
    setSelectedImageIndex(newIndex);
  };

  // Touch gesture handlers for swipe down to close and horizontal navigation
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only handle touch if zoom mode is NOT active or on desktop
    if (zoomModeActive || !isMobile) return;

    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Only handle touch if zoom mode is NOT active or on desktop
    if (zoomModeActive || !isMobile) return;

    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);

    if (touchStartY !== null) {
      const currentTouchY = e.targetTouches[0].clientY;
      const distanceY = currentTouchY - touchStartY;

      if (distanceY > 0) {
        setIsSwipingDown(true);
        setSwipeDownOffset(Math.min(distanceY, 300));
      }
    }
  };

  const handleTouchEnd = () => {
    // Only handle touch if zoom mode is NOT active or on desktop
    if (zoomModeActive || !isMobile) return;
    if (zoomModeActive) return;

    if (!touchStartX || !touchStartY || !touchEndX || !touchEndY) return;

    const distanceX = touchEndX - touchStartX;
    const distanceY = touchEndY - touchStartY;
    const isLeftSwipe =
      distanceX < -50 && Math.abs(distanceX) > Math.abs(distanceY);
    const isRightSwipe =
      distanceX > 50 && Math.abs(distanceX) > Math.abs(distanceY);
    const isDownSwipe =
      distanceY > 100 && Math.abs(distanceY) > Math.abs(distanceX);

    // Allow horizontal swipe navigation if there are multiple images
    if (isLeftSwipe && filteredItems.length > 1) {
      navigateToNext();
    } else if (isRightSwipe && filteredItems.length > 1) {
      navigateToPrevious();
    } else if (isDownSwipe) {
      setSelectedImageIndex(null);
    }

    setSwipeDownOffset(0);
    setIsSwipingDown(false);
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
    setTouchEndY(null);
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

  // Preload first few images
  useEffect(() => {
    tvorbaItems.slice(0, 4).forEach((item, index) => {
      const img = new window.Image();
      img.src = item.image;
      img.onload = () => handleImageLoad(index);
    });
  }, []);

  return (
    <div className="min-h-screen py-5 lg:py-20 bg-white relative pb-safe">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-75 bg-grid-pattern"></div>
      <div className="max-w-11/12 mx-auto px-3 lg:px-8 relative z-10 pb-safe">
        {/* Masonry-style grid */}
        <motion.div
          className="columns-1 gap-4 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
              onClick={() => {
                setSelectedImageIndex(index);
                setLightboxImageLoaded(false);
              }}
            >
              {/* Next.js Image with native lazy loading */}
              <Image
                src={item.image}
                alt={item.name || `${item.type} ${item.id}`}
                width={600}
                height={800}
                className={`w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoadStates[index] ? "opacity-100" : "opacity-0"
                }`}
                priority={index < 6}
                loading={index < 6 ? "eager" : "lazy"}
                fetchPriority={index < 3 ? "high" : "auto"}
                onLoad={() => handleImageLoad(index)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            animate={{
              y: swipeDownOffset,
              opacity: 1 - swipeDownOffset / 300,
            }}
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full px-4 absolute top-4 left-0 flex items-start justify-between">
              {/* Zoom controls with feedback */}
              <div className=" z-10 flex items-center gap-2">
                {" "}
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

                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="fixed w-full flex items-center justify-center left-0 bottom-5 "
                    >
                      <span className="bg-black/80 backdrop-blur-sm text-gray-200 text-xs px-3 py-1.5 rounded-full  text-center border border-gray-200">
                        Nyní můžete přibližovat pomocí gest
                      </span>
                    </motion.div>
                  </>
                )}
              </div>

              <button
                onClick={() => setSelectedImageIndex(null)}
                className=" z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm cursor-pointer"
                aria-label="Zavřít"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Navigation buttons - only show if multiple images and zoom mode is not active */}
            {filteredItems.length > 1 && !zoomModeActive && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToPrevious();
                  }}
                  className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm cursor-pointer"
                  aria-label="Předchozí"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToNext();
                  }}
                  className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm cursor-pointer"
                  aria-label="Další"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Lightbox image with blur placeholder and pinch-to-zoom */}
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
                drag={!zoomModeActive && filteredItems.length > 1 ? "x" : false}
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
                className={`relative max-w-7xl max-h-full ${
                  !zoomModeActive && filteredItems.length > 1
                    ? "cursor-grab active:cursor-grabbing"
                    : ""
                }`}
              >
                {!lightboxImageLoaded && (
                  <Image
                    src={selectedImage.image}
                    alt="Načítání..."
                    width={50}
                    height={50}
                    className="absolute inset-0 w-full h-full object-contain blur-2xl scale-110"
                    quality={1}
                  />
                )}
                {/* High-res lightbox image - zoom only when activated */}
                {zoomModeActive ? (
                  <TransformWrapper
                    ref={transformRef}
                    initialScale={1}
                    minScale={1}
                    maxScale={4}
                    doubleClick={{ disabled: false, mode: "toggle" }}
                    wheel={{ disabled: false }}
                    panning={{ disabled: false }}
                    pinch={{ disabled: false }}
                    velocityAnimation={{ disabled: false }}
                    onTransformed={(ref, state) => {
                      setIsZoomed(state.scale > 1.01);
                    }}
                  >
                    <TransformComponent
                      wrapperClass="!w-auto !h-auto"
                      contentClass="!w-auto !h-auto"
                    >
                      <Image
                        src={selectedImage.image}
                        alt={
                          selectedImage.name ||
                          `${selectedImage.type} ${selectedImage.id}`
                        }
                        width={1920}
                        height={1080}
                        className={`max-w-full max-h-[90vh] object-contain transition-opacity duration-300 ${
                          lightboxImageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        priority
                        quality={95}
                        onLoad={() => setLightboxImageLoaded(true)}
                        draggable={false}
                      />
                    </TransformComponent>
                  </TransformWrapper>
                ) : (
                  <Image
                    src={selectedImage.image}
                    alt={
                      selectedImage.name ||
                      `${selectedImage.type} ${selectedImage.id}`
                    }
                    width={1920}
                    height={1080}
                    className={`max-w-full max-h-[90vh] object-contain transition-opacity duration-300 ${
                      lightboxImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    priority
                    quality={95}
                    onLoad={() => setLightboxImageLoaded(true)}
                    draggable={false}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
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
            {/* Type Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`cursor-pointer px-4 py-2.5 pr-8 text-sm border border-gray-200/60 rounded-2xl bg-white/60 backdrop-blur hover:bg-white/80 hover:border-gray-300 transition-all focus:outline-none font-inter shadow-sm ${
                  isMobile ? "w-full" : "w-auto"
                }`}
              >
                <option value="all">Typ tvorby</option>
                <option value="malba">Malba</option>
                <option value="kresba">Kresba</option>
                <option value="grafika">Grafika</option>
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
