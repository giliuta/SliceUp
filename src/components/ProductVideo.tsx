"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductVideoProps {
  product: Product;
}

export default function ProductVideo({ product }: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setVideoLoaded(false);
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [product.id]);

  return (
    <div
      className="relative"
      style={{ width: "55vmin", height: "73vmin", maxWidth: "480px", maxHeight: "640px" }}
    >
      {/* Video layer — hidden until loaded */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="video-blend absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
        style={{ opacity: videoLoaded ? 1 : 0 }}
        key={product.id}
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src={product.video.webm} type="video/webm" />
        <source src={product.video.mp4} type="video/mp4" />
      </video>

      {/* Pack photo — shown as main visual */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
        style={{ opacity: videoLoaded ? 0 : 1 }}
      >
        <Image
          src={product.images.pack}
          alt={product.name}
          width={400}
          height={533}
          className="object-contain drop-shadow-2xl"
          style={{ width: "85%", height: "85%" }}
          priority
        />
      </div>

      {/* Glow behind product */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full opacity-20 -z-10"
        style={{
          backgroundColor: product.theme.accent,
          filter: "blur(100px)",
          transition: "background-color 0.6s ease",
        }}
      />
    </div>
  );
}
