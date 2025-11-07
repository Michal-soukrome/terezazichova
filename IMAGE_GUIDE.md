# Image Management Guide

## 📁 Directory Structure

```
public/images/
├── gallery/           # Portfolio artworks
│   ├── artwork-1.jpg
│   ├── artwork-2.webp
│   └── ...
├── hero/             # Homepage featured images
│   └── featured.jpg
└── about/            # Artist photos
    └── portrait.jpg
```

## 🖼️ Image Specifications

### Recommended Formats

- **JPEG/JPG**: For photographs and complex artworks
- **WebP**: Better compression, modern browsers (Next.js auto-converts)
- **PNG**: For graphics with transparency
- **AVIF**: Best compression (Next.js auto-converts when supported)

### Size Guidelines

- **Gallery Images**: 1200-2400px on longest side
- **Hero Images**: 1920px+ for high-resolution displays
- **Portrait Images**: 800-1200px wide
- **File Size**: Aim for <500KB per image (Next.js will optimize)

## ⚡ Performance Optimization

### 1. **Automatic Next.js Features**

- Format conversion (JPEG → WebP/AVIF)
- Responsive image generation
- Lazy loading by default
- Blur placeholder support

### 2. **Manual Optimization Tips**

```bash
# Before adding images, optimize them:
# Use tools like ImageOptim, TinyPNG, or Squoosh.app
# Target 80-90% quality for JPEG
# Use progressive JPEG for faster perceived loading
```

### 3. **Usage in Components**

```tsx
import Image from "next/image";
import { getImageSizes, getImagePriority } from "@/lib/images";

<Image
  src="/images/gallery/artwork-1.jpg"
  alt="Artwork Title"
  width={800}
  height={1200}
  sizes={getImageSizes("gallery")}
  priority={getImagePriority(index, "gallery")}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  className="w-full h-auto"
/>;
```

## 🚀 Adding New Images

### 1. **Prepare Your Images**

- Export at 2x your display size for retina displays
- Use descriptive filenames: `abstract-painting-2024-01.jpg`
- Keep originals backed up separately

### 2. **Add to Public Directory**

```bash
# Copy images to appropriate folder
public/images/gallery/new-artwork.jpg
```

### 3. **Update Data**

```tsx
// Add to your artwork data array
const newArtwork = {
  id: 4,
  title: "New Artwork",
  year: 2024,
  src: "/images/gallery/new-artwork.jpg",
  width: 800,
  height: 1200,
};
```

## 📊 Performance Monitoring

### Check Image Performance

1. **Lighthouse**: Audit image loading
2. **Next.js Analytics**: Monitor Core Web Vitals
3. **Network Tab**: Check actual file sizes served

### Optimization Checklist

- ✅ Images under 500KB before optimization
- ✅ Proper `alt` tags for accessibility
- ✅ `priority={true}` for above-the-fold images
- ✅ Appropriate `sizes` attribute
- ✅ Blur placeholders for smooth loading
- ✅ WebP/AVIF format support enabled

## 🔧 Advanced: External CDN Setup

For production, consider using a CDN:

```typescript
// next.config.ts
images: {
  domains: ['your-cdn.com'],
  loader: 'custom',
  loaderFile: './src/lib/imageLoader.ts'
}
```

This setup will give you maximum performance with Next.js image optimization!
