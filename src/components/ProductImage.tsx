"use client";

import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="relative" style={{ width: "42vmin", height: "58vmin", maxWidth: "420px", maxHeight: "580px" }}>
      {/* Pack photo — THE hero visual */}
      <Image
        src={product.images.pack}
        alt={product.name}
        width={420}
        height={580}
        className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500"
        style={{ width: "100%", height: "100%" }}
        priority
      />

      {/* Glow behind product */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full -z-10"
        style={{
          backgroundColor: product.theme.accent,
          filter: "blur(80px)",
          opacity: 0.2,
          transition: "background-color 0.6s ease",
        }}
      />
    </div>
  );
}
