/**
 * Preload component for critical images
 * Use this in layouts or pages to preload important images before they're needed
 */

interface PreloadImagesProps {
  images: string[];
  as?: "image" | "fetch";
}

export default function PreloadImages({
  images,
  as = "image",
}: PreloadImagesProps) {
  return (
    <>
      {images.map((src, index) => (
        <link
          key={`preload-${index}`}
          rel="preload"
          href={src}
          as={as}
          // @ts-ignore - imageSrcSet is valid but not in types
          imageSrcSet={`
            /_next/image?url=${encodeURIComponent(src)}&w=640&q=75 640w,
            /_next/image?url=${encodeURIComponent(src)}&w=750&q=75 750w,
            /_next/image?url=${encodeURIComponent(src)}&w=828&q=75 828w,
            /_next/image?url=${encodeURIComponent(src)}&w=1080&q=75 1080w,
            /_next/image?url=${encodeURIComponent(src)}&w=1200&q=75 1200w,
            /_next/image?url=${encodeURIComponent(src)}&w=1920&q=75 1920w
          `}
          imageSizes="100vw"
          fetchPriority="high"
        />
      ))}
    </>
  );
}

/**
 * Usage example:
 *
 * import PreloadImages from '@/components/PreloadImages';
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <PreloadImages images={[
 *         '/images/gallery/01-ghmp-2025.jpg',
 *         '/images/gallery/02-mkcr-2025.jpg',
 *         '/images/gallery/03-mkv-2025.jpg',
 *       ]} />
 *
 *       <Gallery />
 *     </>
 *   );
 * }
 */
