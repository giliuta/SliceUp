"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ShoppingBag, ChevronLeft, ChevronRight, Menu as MenuIcon } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import type { Product } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import CartDrawer from "@/components/CartDrawer";

gsap.registerPlugin(useGSAP);

const THUMBS_PER_PAGE = 4;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbPage, setThumbPage] = useState(0);
  const product = products[activeIndex];
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const toggleCart = useCartStore((s) => s.toggleCart);

  // --- Background color sync ---
  useEffect(() => {
    document.body.style.backgroundColor = product.theme.background;
    document.documentElement.style.setProperty("--theme-bg", product.theme.background);
  }, [product.theme.background]);

  // --- Product switch ---
  const goTo = useCallback((i: number) => {
    const idx = (i + products.length) % products.length;
    setActiveIndex(idx);
    setThumbPage(Math.floor(idx / THUMBS_PER_PAGE));
  }, []);

  // --- Keyboard nav ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeIndex + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(activeIndex - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, goTo]);

  // --- Swipe (mobile) ---
  useEffect(() => {
    let x0 = 0;
    const ts = (e: TouchEvent) => { x0 = e.touches[0].clientX; };
    const te = (e: TouchEvent) => {
      const d = x0 - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) goTo(d > 0 ? activeIndex + 1 : activeIndex - 1);
    };
    window.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchend", te, { passive: true });
    return () => { window.removeEventListener("touchstart", ts); window.removeEventListener("touchend", te); };
  }, [activeIndex, goTo]);

  // --- Initial load animation ---
  useGSAP(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".bg-text-el", { opacity: 0, scale: 0.95, duration: 1, delay: 0.2 })
      .from(".product-hero", { opacity: 0, scale: 0.88, y: 30, duration: 0.9 }, "-=0.5")
      .from(".left-block > *", { opacity: 0, y: 20, duration: 0.45, stagger: 0.08 }, "-=0.5")
      .from(".right-block", { opacity: 0, x: 20, duration: 0.5 }, "-=0.4")
      .from(".bottom-price", { opacity: 0, y: 15, duration: 0.4 }, "-=0.3")
      .from(".nav-el", { opacity: 0, y: -10, duration: 0.4 }, "-=0.6");
  }, { scope: containerRef });

  // --- Switch animation ---
  useGSAP(() => {
    if (!hasAnimated.current) return;
    gsap.fromTo(".product-hero", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" });
    gsap.fromTo(".bg-text-el", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.fromTo(".left-block > *", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" });
    gsap.fromTo(".bottom-price", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.15 });
  }, { scope: containerRef, dependencies: [activeIndex], revertOnUpdate: true });

  // --- Thumbnails visible ---
  const thumbStart = thumbPage * THUMBS_PER_PAGE;
  const visibleThumbs = products.slice(thumbStart, thumbStart + THUMBS_PER_PAGE);

  const handleShopNow = useCallback(() => {
    addItem(product);
    openCart();
  }, [product, addItem, openCart]);

  const cartCount = totalItems();

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden">

      {/* ===== NAV (z-100) ===== */}
      <nav className="nav-el fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <div style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: 24, fontWeight: 400 }}>
          SliceUp
        </div>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-6">
          <span
            className="text-sm cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.95)",
              color: "#222",
              borderRadius: 20,
              padding: "6px 20px",
              fontWeight: 500,
            }}
          >
            Menu
          </span>
          <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">About</a>
          <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Shop</a>
          <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Contact</a>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-1" aria-label="Menu">
          <MenuIcon size={22} strokeWidth={1.5} />
        </button>

        {/* Cart */}
        <button onClick={toggleCart} className="relative p-1 hover:opacity-80 transition-opacity" aria-label="Cart">
          <ShoppingBag size={20} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* ===== BACKGROUND TEXT (z-1) ===== */}
      <div
        className="bg-text-el absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <span
          style={{
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(180px, 22vw, 400px)",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.12)",
            lineHeight: 0.85,
            whiteSpace: "nowrap",
            letterSpacing: 10,
          }}
        >
          {product.name}
        </span>
      </div>

      {/* ===== PRODUCT IMAGE (z-2, center, slightly right) ===== */}
      <div
        className="product-hero absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <div style={{ transform: "translateX(5%)", maxWidth: 350, maxHeight: 500, width: "45vmin", height: "62vmin" }}>
          <Image
            src={product.images.pack}
            alt={product.name}
            width={350}
            height={500}
            className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
            priority
          />
        </div>
      </div>

      {/* ===== LEFT BLOCK (z-10, vertically centered) ===== */}
      <div
        className="left-block absolute z-10 hidden md:flex flex-col"
        style={{ left: 48, top: "50%", transform: "translateY(-50%)", maxWidth: 340 }}
      >
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, opacity: 0.6, marginBottom: 8 }}>
          {product.subtitle}
        </p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 42, fontWeight: 700, lineHeight: 1.05, marginBottom: 10 }}>
          {product.name}
        </h1>
        <div className="flex items-baseline gap-3" style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span style={{ fontSize: 14, opacity: 0.5, textDecoration: "line-through" }}>
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.65, marginBottom: 20 }}>
          {product.description}
        </p>
        <button
          onClick={handleShopNow}
          className="group relative overflow-hidden"
          style={{
            border: "1.5px solid rgba(255,255,255,0.7)",
            background: "transparent",
            borderRadius: 30,
            padding: "12px 32px",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            color: "white",
            alignSelf: "flex-start",
          }}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
            Shop now
          </span>
          <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </button>
      </div>

      {/* ===== MOBILE INFO (z-10, bottom) ===== */}
      <div className="absolute z-10 md:hidden bottom-20 left-0 right-0 px-6 text-center">
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 3, opacity: 0.5, marginBottom: 6 }}>
          {product.subtitle}
        </p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 28, fontWeight: 700, lineHeight: 1.1, marginBottom: 6 }}>
          {product.name}
        </h1>
        <div className="flex items-baseline justify-center gap-2 mb-3">
          <span style={{ fontFamily: "var(--font-playfair)", fontSize: 26, fontWeight: 700 }}>
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span style={{ fontSize: 13, opacity: 0.4, textDecoration: "line-through" }}>
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <button
          onClick={handleShopNow}
          className="group relative overflow-hidden mx-auto"
          style={{
            border: "1.5px solid rgba(255,255,255,0.6)",
            background: "transparent",
            borderRadius: 30,
            padding: "10px 28px",
            fontSize: 12,
            fontWeight: 500,
            color: "white",
          }}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
            Shop now
          </span>
          <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </button>
        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                backgroundColor: i === activeIndex ? "white" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Go to product ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ===== RIGHT BLOCK (z-10, vertically centered) — desktop ===== */}
      <div
        className="right-block absolute z-10 hidden md:flex flex-col items-center"
        style={{ right: 48, top: "50%", transform: "translateY(-50%)" }}
      >
        {/* Arrows */}
        <div className="flex items-center gap-2 mb-4">
          <ArrowButton dir="left" onClick={() => goTo(activeIndex - 1)} />
          <ArrowButton dir="right" onClick={() => goTo(activeIndex + 1)} />
        </div>

        {/* 2x2 Thumbnails grid */}
        <div className="grid grid-cols-2 gap-2">
          {visibleThumbs.map((p, i) => {
            const realIdx = thumbStart + i;
            const isActive = realIdx === activeIndex;
            return (
              <Thumbnail
                key={p.id}
                product={p}
                isActive={isActive}
                onClick={() => goTo(realIdx)}
              />
            );
          })}
        </div>

        {/* Page counter */}
        <span className="text-[10px] opacity-30 mt-3 tracking-wider">
          {activeIndex + 1} / {products.length}
        </span>
      </div>

      {/* ===== BOTTOM CENTER: Price (desktop) ===== */}
      <div
        className="bottom-price absolute z-10 hidden md:block"
        style={{ bottom: 40, left: "50%", transform: "translateX(-50%)" }}
      >
        <span style={{ fontFamily: "var(--font-playfair)", fontSize: 48, fontWeight: 700 }}>
          {formatPrice(product.price)}
        </span>
      </div>

      {/* ===== CART DRAWER ===== */}
      <CartDrawer />
    </div>
  );
}

/* ===== Small sub-components ===== */

function ArrowButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
      style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.3)" }}
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      {dir === "left" ? <ChevronLeft size={18} strokeWidth={1.5} /> : <ChevronRight size={18} strokeWidth={1.5} />}
    </button>
  );
}

function Thumbnail({ product, isActive, onClick }: { product: Product; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="overflow-hidden flex items-center justify-center transition-all duration-300"
      style={{
        width: 56,
        height: 56,
        borderRadius: 12,
        border: isActive ? "2px solid white" : "1.5px solid rgba(255,255,255,0.15)",
        background: isActive ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        opacity: isActive ? 1 : 0.6,
        padding: 4,
      }}
      title={product.name}
    >
      <Image
        src={product.images.pack}
        alt={product.name}
        width={48}
        height={48}
        className="w-full h-full object-contain"
      />
    </button>
  );
}
