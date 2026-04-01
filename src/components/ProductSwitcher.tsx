"use client";

import { useRef, useEffect } from "react";
import type { Product } from "@/data/products";

interface ProductSwitcherProps {
  products: Product[];
  activeIndex: number;
  onProductChange: (index: number) => void;
}

export default function ProductSwitcher({
  products,
  activeIndex,
  onProductChange,
}: ProductSwitcherProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll active thumbnail into view
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const active = container.children[activeIndex] as HTMLElement | undefined;
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeIndex]);

  // Touch swipe support
  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          onProductChange(Math.min(activeIndex + 1, products.length - 1));
        } else {
          onProductChange(Math.max(activeIndex - 1, 0));
        }
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, products.length, onProductChange]);

  return (
    <div className="hero-thumbs absolute bottom-14 md:bottom-10 left-0 right-0 z-20 flex justify-center px-4">
      <div
        ref={scrollRef}
        className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar max-w-full py-2 px-2"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onProductChange(i)}
            className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl transition-all duration-300 border-2"
            style={{
              borderColor: i === activeIndex ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)",
              backgroundColor:
                i === activeIndex ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
              transform: i === activeIndex ? "scale(1.15)" : "scale(1)",
            }}
            aria-label={`Switch to ${p.name}`}
            title={p.name}
          >
            {p.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
