"use client";

import Image from "next/image";
import { useState } from "react";

// Optimized Image component for blog cards and listings
export default function OptimizedImage({ src, alt, className = "", priority = false }) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if src is a valid URL
  const isValidUrl = src && (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/"));

  if (!isValidUrl || hasError) {
    return (
      <div className={`w-full h-full bg-orange-50 flex items-center justify-center relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-linear-to-br from-orange-100 to-orange-200"></div>
        <svg
          className="w-20 h-20 text-orange-300 relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
        </svg>
      </div>
    );
  }

  // Determine if it's an external URL
  const isExternal = src.startsWith("http://") || src.startsWith("https://");

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt || "Blog image"}
        fill
        className={`object-cover ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={85}
        priority={priority}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
        unoptimized={isExternal && !src.includes("supabase.co")}
      />
    </div>
  );
}

