# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added - 2025-11-08 (Architecture Improvements)

- **Feature-Based Architecture**: Created scalable folder structure
  - Added `/src/features/` with `gallery/`, `exhibitions/`, and `common/` folders
  - Prepares for cleaner code organization as project grows
  - Keeps related components and logic cohesive per feature
- **Custom Hooks Layer**: Extracted reusable React hooks
  - `useIsMobile()` - Mobile viewport detection (eliminates duplicate code)
  - `useImageLoading()` - Image loading state management
  - `useGestures()` - Swipe and zoom state handling
  - Centralized in `/src/hooks/` with barrel export
- **Type Definitions Layer**: Separated types from data
  - Created `/src/types/index.ts` for all TypeScript interfaces
  - Defined: `Artwork`, `TvorbaItem`, `ImageLoadStates`, filter types
  - Prevents circular dependencies, easier cross-feature imports
- **Documentation**:
  - `ARCHITECTURE.md` - Core architectural decisions and rationale
  - `IMAGE_ORGANIZATION.md` - Scalable image folder structure guide
  - Added maintenance warning to docs README (quarterly review policy)
  - Updated `PROJECT_STRUCTURE.md` with new architecture

### Verified - 2025-11-08

- **Next.js Best Practices Compliance**: Verified full alignment with official Next.js image optimization documentation
  - ✅ All recommended practices implemented correctly
  - ✅ Size optimization with AVIF/WebP
  - ✅ Visual stability with width/height and blur placeholders
  - ✅ Faster page loads with native lazy loading
  - ✅ Proper priority and fetchPriority usage
  - ✅ Local images with correct public folder structure
  - ✅ No remote images (better security and performance)
  - 📝 Documented static import alternative (not needed for our dynamic gallery use case)
  - 📝 Updated IMAGE_OPTIMIZATION.md with compliance details

### Added - 2025-11-08

- **Pinch-to-Zoom Functionality**: Added gesture-based zoom in lightbox view

  - Integrated `react-zoom-pan-pinch` library (8KB, lazy-loaded)
  - Support for pinch-to-zoom on touch devices
  - Double-tap to toggle zoom
  - Pan and drag when zoomed in
  - Min scale: 1x, Max scale: 4x
  - Applied to both `/` (exhibitions) and `/tvorba` (own work) pages

- **Smart Gesture Conflict Resolution**: Implemented intelligent gesture handling
  - Zoom state tracking via `onTransformed` callback
  - Disabled swipe navigation when zoomed in to prevent accidental image changes
  - Automatic zoom reset when navigating to different image
  - Smooth transition between zoom and navigation gestures

### Improved - 2025-11-08

- **Image Loading Performance**: Optimized lightbox image loading

  - Replaced custom `OptimizedImage` component with native Next.js `Image`
  - Removed custom intersection observer implementation
  - Added hidden preload section for instant lightbox opening
  - Implemented priority loading for first 3-4 images
  - Better blur placeholder integration

- **Navigation Logic**: Enhanced filtered gallery navigation

  - Fixed black screen bug when navigating in filtered views
  - Added `filteredArtworks.length` checks to all navigation handlers
  - Conditional rendering of navigation arrows (hidden when single image)
  - Keyboard navigation disabled for single-image views
  - Touch swipe navigation disabled for single-image views

- **Code Quality**: Architecture improvements
  - Removed ~90% of custom image optimization code
  - Leveraged Next.js built-in features instead of reinventing the wheel
  - Cleaner component structure with better separation of concerns
  - Reduced bundle size through code elimination

### Technical Details - 2025-11-08

#### Image Optimization Stack

- **Format Priority**: AVIF → WebP → fallback
- **Cache Duration**: 31536000 seconds (1 year)
- **Device Sizes**: [640, 750, 828, 1080, 1200, 1920]
- **Responsive Sizes**:
  - Mobile (≤640px): 100vw
  - Tablet (≤1024px): 50vw
  - Desktop: 33vw
- **Priority Loading**: First 3-4 images with `fetchPriority="high"`

#### Gesture System

- **Swipe Down**: Close lightbox (vertical distance > 100px)
- **Swipe Left/Right**: Navigate images (horizontal distance > 50px, only when not zoomed)
- **Pinch-to-Zoom**: Scale between 1x-4x (only in lightbox)
- **Double-Tap**: Toggle zoom in/out
- **Zoom State**: Tracked via `isZoomed` state, updated on transform

#### Dependencies

- `react-zoom-pan-pinch`: ^3.6.1
- `next`: 16.0.1
- `react`: ^19.0.0
- `framer-motion`: ^11.11.17

### Files Modified

- `/src/app/page.tsx` - Main exhibition gallery
- `/src/app/tvorba/page.tsx` - Artist's own work gallery
- `/next.config.ts` - Image optimization configuration
- `/src/components/OptimizedImage.tsx` - Simplified to passthrough

### Performance Impact

- **Bundle Size**: +8KB (react-zoom-pan-pinch, lazy-loaded)
- **Code Reduction**: Removed ~200 lines of custom optimization code
- **Loading Speed**: Improved perceived performance with better preloading
- **User Experience**: Smoother interactions, no gesture conflicts

---

## Previous Changes

For changes before November 2025, see individual guide files in `/docs/guides/`.
