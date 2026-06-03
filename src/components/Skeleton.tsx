import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

type SkeletonProps = {
  className?: string;
};

type ImageWithSkeletonProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "className" | "src" | "alt"> & {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded-3xl bg-neutral-800/70 ${className}`} aria-hidden="true" />;
}

export function SkeletonRouteFallback({ itemCount = 3 }: { itemCount?: number }) {
  return (
    <div className="min-h-screen w-full pt-28 px-8 md:px-12 lg:pr-16 lg:pl-72">
      <div className="w-full max-w-5xl mx-auto space-y-10">
        <div className="h-10 w-1/3 rounded-[28px] animate-pulse bg-neutral-800/70" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: itemCount }).map((_, idx) => (
            <div key={idx} className="space-y-4 rounded-[32px] border border-neutral-800/70 bg-neutral-950/60 p-6 shadow-xl">
              <div className="h-52 rounded-[28px] animate-pulse bg-neutral-800/70" />
              <div className="h-6 w-2/3 rounded-full animate-pulse bg-neutral-800/70" />
              <div className="space-y-3">
                <div className="h-4 rounded-full animate-pulse bg-neutral-800/70" />
                <div className="h-4 w-5/6 rounded-full animate-pulse bg-neutral-800/70" />
                <div className="h-4 w-3/4 rounded-full animate-pulse bg-neutral-800/70" />
              </div>
              <div className="h-10 w-28 rounded-full animate-pulse bg-neutral-800/70" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ImageWithSkeleton({ src, alt, className = "", wrapperClassName = "", ...props }: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`${className} transition-all duration-500 ease-out ${loaded ? "opacity-100 blur-0 scale-100" : "opacity-90 blur-sm scale-150"}`}
        {...props}
      />
    </div>
  );
}
