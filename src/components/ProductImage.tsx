"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type ProductImageProps = {
  src: string;
  hasImage: boolean;
  alt: string;
  fallbackIcon: string;
  fallbackTitle: string;
  fallbackSubtitle: string;
  sizes: string;
  loading?: "eager" | "lazy";
  imagePosition?: string;
  className?: string;
};

export default function ProductImage({
  src,
  hasImage,
  alt,
  fallbackIcon,
  fallbackTitle,
  fallbackSubtitle,
  sizes,
  loading = "lazy",
  imagePosition = "center center",
  className = "",
}: ProductImageProps) {
  const [failedSources, setFailedSources] = useState<Record<string, boolean>>(
    {}
  );
  const [loaded, setLoaded] = useState(false);
  const showFallback = !hasImage || Boolean(failedSources[src]);
  const onLoad = useCallback(() => setLoaded(true), []);

  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(135deg,#1a1a2e_0%,#252540_48%,#c9a84c_165%)] ${className}`}
    >
      {!showFallback && (
        <>
          <div className={`absolute inset-0 skeleton-shimmer transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"}`} />
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            loading={loading}
            className="object-cover"
            style={{ objectPosition: imagePosition }}
            onLoad={onLoad}
            onError={() =>
              setFailedSources((current) =>
                current[src] ? current : { ...current, [src]: true }
              )
            }
          />
        </>
      )}

      {showFallback && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(245,240,232,0.22),transparent_36%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,26,46,0.18)_0%,rgba(26,26,46,0.82)_100%)]" />
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
            <span className="text-4xl leading-none drop-shadow-sm">
              {fallbackIcon}
            </span>
            <div className="max-w-[14rem]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/65">
                {fallbackSubtitle}
              </p>
              <p className="mt-2 text-lg font-semibold leading-tight">
                {fallbackTitle}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
