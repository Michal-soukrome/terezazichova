import { Suspense } from "react";

interface GallerySuspenseProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function GallerySuspense({
  children,
  fallback = <GallerySkeletonLoader />,
}: GallerySuspenseProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

function GallerySkeletonLoader() {
  return (
    <div className="min-h-screen py-5 lg:py-20 bg-white">
      <div className="max-w-11/12 mx-auto px-3 lg:px-8">
        <div className="columns-1 gap-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 animate-pulse"
              style={{
                height: `${Math.random() * 200 + 200}px`,
              }}
            >
              <div className="w-full h-full bg-linear-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
