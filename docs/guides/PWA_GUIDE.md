# PWA Setup Guide

This application is configured as a Progressive Web App (PWA) with offline support.

## Required Icons

To complete the PWA setup, you need to add the following icon files to the `/public` directory:

### Icon Specifications

1. **icon-192x192.png** (192x192 pixels)

   - Used for mobile home screen icon
   - Visible on Android devices
   - Should be a square PNG with transparent or white background

2. **icon-512x512.png** (512x512 pixels)
   - Used for larger displays and splash screens
   - Required for PWA installation
   - Should be a square PNG with transparent or white background

### How to Create Icons

You can create these icons from your existing logo/artwork:

1. Export your logo/icon as a high-resolution PNG (at least 512x512px)
2. Use an online tool like:
   - https://realfavicongenerator.net/
   - https://www.pwabuilder.com/imageGenerator
3. Or use image editing software (Photoshop, GIMP, etc.) to resize

### Installation

Once you have the icons:

1. Place `icon-192x192.png` in `/public/`
2. Place `icon-512x512.png` in `/public/`
3. Rebuild the app: `npm run build`

## Features

### Offline Support

- The app works offline after the first visit
- Images and pages are cached for offline viewing
- Automatic background sync when connection returns

### Caching Strategy

- **Images**: Cached for 24 hours, updated in background
- **Static assets (JS/CSS)**: Cached for 24 hours
- **API calls**: Network-first with 10s timeout fallback
- **Fonts**: Cached for 7 days
- **Google Fonts**: Cached for 1 year

### SSR Preserved

- All Next.js Server-Side Rendering (SSR) features remain functional
- Dynamic routes work as expected
- No interference with API routes or server components

## Testing PWA

### Development

PWA is disabled in development mode to prevent caching issues during development.

### Production

1. Build the app: `npm run build`
2. Start production server: `npm start`
3. Open in Chrome/Edge and check:
   - DevTools → Application → Service Workers
   - DevTools → Application → Manifest
4. Install the app using the browser's install button

### Browser Support

- Chrome/Edge: Full support
- Safari (iOS): Partial support (no service worker in older versions)
- Firefox: Full support

## Offline Fallback

The app includes a fallback page (`/offline`) that appears when:

- User tries to navigate to a non-cached page while offline
- Network request fails

You can customize this page by creating `/src/app/offline/page.tsx`.

## Service Worker Location

The service worker file (`sw.js`) is automatically generated in `/public/` during build.
Do not edit it manually - it's regenerated on each build.

## Troubleshooting

### Service Worker Not Updating

1. Clear browser cache and service workers
2. Rebuild the app
3. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### Images Not Caching

- Check that images are being served from your domain
- External images need CORS headers to be cached
- Next.js optimized images are automatically cached

### PWA Not Installing

1. Ensure you're using HTTPS (required for PWA)
2. Check that manifest.json is accessible at `/manifest.json`
3. Verify icons exist at specified paths
4. Check browser console for errors
