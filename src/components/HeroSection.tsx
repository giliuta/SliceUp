"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import BackgroundText from "./BackgroundText";
import ProductImage from "./ProductImage";
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
  const hasAnimated = useRef(false);
  const parallax = useParallax(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  // Sync background color
  useEffect(() => {
    document.body.style.backgroundColor = product.theme.background;
    document.documentElement.style.setProperty("--theme-bg", product.theme.background);
    document.documentElement.style.setProperty("--theme-bg-dark", product.theme.backgroundDark);
    document.documentElement.style.setProperty("--theme-accent", product.theme.accent);
  }, [product.theme]);

  // Initial staggered load animation
  useGSAP(
    () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-bg-text", { opacity: 0, scale: 0.95, duration: 1, delay: 0.3 })
        .from(".hero-product", { opacity: 0, scale: 0.85, y: 40, duration: 0.9 }, "-=0.5")
        .from(".hero-info", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
        .from(".hero-price-block", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from(".hero-thumbs", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");
    },
    { scope: containerRef }
  );

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onProductChange((activeIndex + 1) % products.length);
      } else if (e.key === "ArrowLeft") {
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
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Layer 1: Background text — BEHIND product */}
      <BackgroundText text={product.name} parallax={parallax} />

      {/* Layer 2: Ambient glow blobs */}
      <div
        className="pointer-events-none absolute z-[2] rounded-full"
        style={{
          width: 600,
          height: 600,
          top: "5%",
          left: "-10%",
          background: product.theme.accent,
          filter: "blur(140px)",
          opacity: 0.12,
          transition: "background 0.6s ease",
        }}
      />
      <div
        className="pointer-events-none absolute z-[2] rounded-full"
        style={{
          width: 500,
          height: 500,
          bottom: "0%",
          right: "-10%",
          background: product.theme.backgroundDark,
          filter: "blur(140px)",
          opacity: 0.18,
          transition: "background 0.6s ease",
        }}
      />

      {/* Layer 3: Floating particles */}
      <FloatingParticles parallax={parallax} />

      {/* Layer 4: PRODUCT — large, centered, ABOVE bg text */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none">
        <div
          className="hero-product will-change-transform pointer-events-auto"
          style={{
            transform: `translate(${parallax.x * 15}px, ${parallax.y * 10}px)`,
          }}
        >
          <ProductImage product={product} />
        </div>
      </div>

      {/* Layer 5: UI overlay — info, price, thumbs */}
      <div className="absolute inset-0 z-[10] pointer-events-none">

        {/* Bottom-left: Product info */}
        <div
          className="hero-info absolute bottom-28 md:bottom-24 left-6 md:left-12 lg:left-20 pointer-events-auto max-w-[320px] md:max-w-[380px]"
        >
          <p
            className="uppercase opacity-50 mb-2"
            style={{ fontSize: 11, letterSpacing: "3px", fontWeight: 400 }}
          >
            {product.subtitle}
          </p>

          <h1
            className="mb-1"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              lineHeight: 1,
            }}
          >
            {product.name}
          </h1>

          {/* Inline price on mobile */}
          <div className="flex items-baseline gap-3 mb-3 md:hidden">
            {product.compareAtPrice && (
              <span className="line-through text-xs opacity-40">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
                fontSize: 22,
              }}
            >
              {formatPrice(product.price)}
            </span>
          </div>

          <p
            className="mb-5 hidden md:block"
            style={{
              fontSize: 13,
              fontWeight: 300,
              lineHeight: 1.7,
              opacity: 0.6,
              maxWidth: 340,
            }}
          >
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="group relative overflow-hidden uppercase transition-all duration-300 hover:border-white/70"
            style={{
              border: "1.5px solid rgba(255,255,255,0.35)",
              borderRadius: 9999,
              padding: "10px 32px",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "2.5px",
            }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              Shop Now
            </span>
            <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </div>

        {/* Bottom-right: Price (desktop) */}
        <div className="hero-price-block absolute bottom-28 md:bottom-24 right-6 md:right-12 lg:right-20 pointer-events-none text-right hidden md:block">
          {product.compareAtPrice && (
            <p className="line-through mb-1" style={{ fontSize: 14, opacity: 0.4 }}>
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {formatPrice(product.price)}
          </p>
          <p style={{ fontSize: 11, fontWeight: 300, opacity: 0.4, marginTop: 6 }}>
            {product.weight}
          </p>
        </div>
      </div>

      {/* Layer 6: Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[15]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Layer 7: Bottom bar — thumbnails */}
      <ProductSwitcher
        products={products}
        activeIndex={activeIndex}
        onProductChange={onProductChange}
      />
    </section>
  );
}
