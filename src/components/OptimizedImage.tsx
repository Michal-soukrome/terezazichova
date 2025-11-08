/**
 * This component is DEPRECATED - Use next/image directly instead!
 *
 * Next.js handles all of this automatically:
 * - loading="lazy" for native browser lazy loading
 * - priority={true} for above-the-fold images
 * - placeholder="blur" for loading states
 * - Automatic AVIF/WebP conversion
 * - Responsive srcset generation
 *
 * Simply use <Image /> with appropriate props.
 * This wrapper adds unnecessary complexity.
 */

import Image, { ImageProps } from "next/image";

/**
 * @deprecated Use next/image directly with loading="lazy" and priority props
 */
export default function OptimizedImage(props: ImageProps) {
  // Just pass through to Next.js Image - it handles everything
  return <Image {...props} />;
}
