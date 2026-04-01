"use client";

import { useRef, useEffect } from "react";
import type { Product } from "@/data/products";

interface ProductVideoProps {
  product: Product;
}

export default function ProductVideo({ product }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [product.id]);

  return (
    <div className="relative w-full aspect-square">
      {/* Video layer */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="video-blend absolute inset-0 w-full h-full object-contain"
        key={product.id}
      >
        <source src={product.video.webm} type="video/webm" />
        <source src={product.video.mp4} type="video/mp4" />
      </video>

      {/* Fallback: emoji placeholder when no video available */}
      <div className="absolute inset-0 flex items-center justify-center text-[120px] md:text-[180px] select-none pointer-events-none">
        {product.emoji}
      </div>

      {/* Glow effect behind product */}
      <div
        className="absolute inset-0 rounded-full blur-[80px] opacity-20 -z-10 scale-75"
        style={{ backgroundColor: product.theme.accent }}
      />
    </div>
  );
}
