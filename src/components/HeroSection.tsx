"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import BackgroundText from "./BackgroundText";
import ProductVideo from "./ProductVideo";
import FloatingParticles from "./FloatingParticles";
import ProductSwitcher from "./ProductSwitcher";
import { useParallax } from "@/hooks/useParallax";
import { useCartStore } from "@/stores/cartStore";

gsap.registerPlugin(useGSAP);

interface HeroSectionProps {
  product: Product;
  products: Product[];
  activeIndex: number;
  onProductChange: (index: number) => void;
}

export default function HeroSection({
  product,
  products,
  activeIndex,
  onProductChange,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const parallax = useParallax(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // Set background color via CSS custom property
  useEffect(() => {
    document.body.style.backgroundColor = product.theme.background;
    document.documentElement.style.setProperty("--theme-bg", product.theme.background);
    document.documentElement.style.setProperty("--theme-bg-dark", product.theme.backgroundDark);
    document.documentElement.style.setProperty("--theme-accent", product.theme.accent);
  }, [product.theme]);

  // Initial load animation (once)
  useGSAP(
    () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-bg-text", { opacity: 0, scale: 0.95, duration: 0.8, delay: 0.5 })
        .from(".hero-video-wrap", { opacity: 0, scale: 0.9, duration: 0.8 }, "-=0.3")
        .from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.5 }, "-=0.4")
        .from(".hero-title", { opacity: 0, y: 30, duration: 0.5 }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 30, duration: 0.5 }, "-=0.3")
        .from(".hero-cta", { opacity: 0, y: 30, duration: 0.5 }, "-=0.3")
        .from(".hero-price", { opacity: 0, y: 20, duration: 0.4 }, "-=0.3")
        .from(".hero-thumbs", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-scroll", { opacity: 0, duration: 0.4 }, "-=0.1");
    },
    { scope: containerRef }
  );

  // Animate content change on product switch
  useGSAP(
    () => {
      if (!hasAnimated.current) return;
      gsap.from(contentRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [activeIndex], revertOnUpdate: true }
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onProductChange((activeIndex + 1) % products.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onProductChange((activeIndex - 1 + products.length) % products.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, products.length, onProductChange]);

  const handleAddToCart = useCallback(() => {
    addItem(product);
    openCart();
  }, [product, addItem, openCart]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center"
    >
      {/* Background text */}
      <BackgroundText text={product.name} parallax={parallax} />

      {/* Floating particles */}
      <FloatingParticles accent={product.theme.accent} parallax={parallax} />

      {/* Main content grid */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-16 lg:px-24 pt-20 pb-28 md:pt-0 md:pb-0"
      >
        {/* Left: product info */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left order-2 md:order-1 mt-6 md:mt-0">
          <p className="hero-subtitle text-xs md:text-sm font-light tracking-[0.3em] uppercase opacity-70 mb-3">
            {product.subtitle}
          </p>
          <h1
            className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {product.name}
          </h1>
          <p className="hero-desc text-sm md:text-base font-light leading-relaxed max-w-sm opacity-80 mb-6">
            {product.description}
          </p>
          <button
            onClick={handleAddToCart}
            className="hero-cta group relative px-8 py-3 border border-white/30 text-sm font-medium tracking-wider uppercase overflow-hidden transition-all duration-300 hover:border-white/60"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Shop Now
            </span>
            <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </div>

        {/* Center: video/product */}
        <div className="flex-1 flex items-center justify-center order-1 md:order-2 max-w-[280px] md:max-w-[400px] lg:max-w-[480px]">
          <div
            className="hero-video-wrap w-full will-change-transform"
            style={{
              transform: `translate(${parallax.x * 15}px, ${parallax.y * 10}px)`,
            }}
          >
            <ProductVideo product={product} />
          </div>
        </div>

        {/* Right: price */}
        <div className="flex-1 flex flex-col items-center md:items-end justify-center order-3 mt-4 md:mt-0">
          <div className="hero-price text-right">
            {product.compareAtPrice && (
              <p className="text-sm line-through opacity-40 mb-1">
                {formatPrice(product.compareAtPrice)}
              </p>
            )}
            <p
              className="text-3xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {formatPrice(product.price)}
            </p>
            <p className="text-xs font-light opacity-50 mt-1">{product.weight}</p>
          </div>
        </div>
      </div>

      {/* Product thumbnails */}
      <ProductSwitcher
        products={products}
        activeIndex={activeIndex}
        onProductChange={onProductChange}
      />

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="text-[10px] tracking-[0.3em] uppercase font-light">Scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="animate-[scrollPulse_2s_ease-in-out_infinite]"
        >
          <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </section>
  );
}
