"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductSwitcherProps {
  products: Product[];
  activeIndex: number;
  onProductChange: (index: number) => void;
}

const VISIBLE_COUNT = 5;

function getVisibleRange(activeIndex: number, total: number) {
  const half = Math.floor(VISIBLE_COUNT / 2);
  let start = activeIndex - half;
  if (start < 0) start = 0;
  if (start + VISIBLE_COUNT > total) start = Math.max(0, total - VISIBLE_COUNT);
  return { start, end: Math.min(start + VISIBLE_COUNT, total) };
}

export default function ProductSwitcher({
  products,
  activeIndex,
  onProductChange,
}: ProductSwitcherProps) {
  const { start, end } = getVisibleRange(activeIndex, products.length);
  const visible = products.slice(start, end);

  const goPrev = () => onProductChange((activeIndex - 1 + products.length) % products.length);
  const goNext = () => onProductChange((activeIndex + 1) % products.length);

  // Touch swipe
  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goNext() : goPrev();
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  });

  return (
    <div className="hero-thumbs absolute bottom-5 md:bottom-7 left-0 right-0 z-[20] flex items-center justify-center gap-2 px-4">
      {/* Left arrow */}
      <button
        onClick={goPrev}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
        aria-label="Previous product"
      >
        <ChevronLeft size={14} strokeWidth={1.5} />
      </button>

      {/* Thumbnails — small product pack images */}
      <div className="flex items-center gap-1.5">
        {visible.map((p, i) => {
          const realIndex = start + i;
          const isActive = realIndex === activeIndex;
          return (
            <button
              key={p.id}
              onClick={() => onProductChange(realIndex)}
              className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: isActive ? 52 : 44,
                height: isActive ? 52 : 44,
                border: isActive ? "2px solid rgba(255,255,255,0.7)" : "1.5px solid rgba(255,255,255,0.1)",
                backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)",
                opacity: isActive ? 1 : 0.5,
                padding: 3,
              }}
              aria-label={`Switch to ${p.name}`}
              title={p.name}
            >
              <Image
                src={p.images.pack}
                alt={p.name}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </button>
          );
        })}
      </div>

      {/* Right arrow */}
      <button
        onClick={goNext}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
        aria-label="Next product"
      >
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>

      {/* Counter */}
      <span className="text-[10px] font-light text-white/25 tracking-wider ml-1.5">
        {activeIndex + 1}/{products.length}
      </span>
    </div>
  );
}
