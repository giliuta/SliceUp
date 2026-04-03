"use client";

import { useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";

gsap.registerPlugin(useGSAP);

const THUMBS_PER_PAGE = 4;

interface HeroScreenProps {
  activeIndex: number;
  thumbPage: number;
  onProductChange: (idx: number, dir: 1 | -1) => void;
}

export default function HeroScreen({ activeIndex, thumbPage, onProductChange }: HeroScreenProps) {
  const product = products[activeIndex];
  const packRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);
  const isTransitioning = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const toggleCart = useCartStore((s) => s.toggleCart);

  const goTo = useCallback((i: number, dir: 1 | -1) => {
    if (isTransitioning.current) return;
    const idx = (i + products.length) % products.length;
    if (idx === activeIndex) return;
    isTransitioning.current = true;

    const prevPack = packRefs.current[activeIndex];
    const nextPack = packRefs.current[idx];

    gsap.to(document.body, { backgroundColor: products[idx].theme.background, duration: 0.7, ease: "power2.inOut" });

    if (prevPack) {
      gsap.to(prevPack, { y: dir * -80, opacity: 0, scale: 0.92, duration: 0.4, ease: "power3.in", force3D: true,
        onComplete: () => { gsap.set(prevPack, { visibility: "hidden", y: 0, opacity: 1, scale: 1 }); },
      });
    }
    if (nextPack) {
      gsap.set(nextPack, { visibility: "visible", y: dir * 100, opacity: 0, scale: 0.9 });
      gsap.to(nextPack, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power3.out", delay: 0.1, force3D: true });
    }

    setTimeout(() => onProductChange(idx, dir), 150);
    setTimeout(() => { isTransitioning.current = false; }, 650);
  }, [activeIndex, onProductChange]);

  // Listen for scroll events from parent (wheel/swipe delegated)
  useEffect(() => {
    const handler = (e: Event) => {
      const dir = (e as CustomEvent).detail.dir as 1 | -1;
      goTo(activeIndex + dir, dir);
    };
    window.addEventListener("hero-scroll", handler);
    return () => window.removeEventListener("hero-scroll", handler);
  }, [activeIndex, goTo]);

  // Keyboard ↑↓ for product switch
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); goTo(activeIndex + 1, 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); goTo(activeIndex - 1, -1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, goTo]);

  useGSAP(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(packRefs.current[0]!, { opacity: 0, scale: 0.85, y: 50, duration: 1 }, 0.3)
      .from(".hero-bg-text span", { opacity: 0, scale: 0.95, duration: 1 }, 0.2)
      .from(".hero-left > *", { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 }, 0.5)
      .from(".hero-mobile-inner > *", { opacity: 0, y: 15, duration: 0.45, stagger: 0.06 }, 0.5)
      .from(".hero-right", { opacity: 0, x: 20, duration: 0.5 }, 0.6)
      .from(".hero-bottom-price", { opacity: 0, y: 15, duration: 0.4 }, 0.7);
  }, { scope: heroRef });

  useGSAP(() => {
    if (!hasAnimated.current) return;
    gsap.fromTo(".hero-bg-text span", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    gsap.fromTo(".hero-left > *", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" });
    gsap.fromTo(".hero-mobile-inner > *", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: "power2.out" });
    gsap.fromTo(".hero-bottom-price", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", delay: 0.05 });
  }, { scope: heroRef, dependencies: [activeIndex], revertOnUpdate: true });

  const thumbStart = thumbPage * THUMBS_PER_PAGE;
  const visibleThumbs = products.slice(thumbStart, thumbStart + THUMBS_PER_PAGE);
  const handleShopNow = useCallback(() => { addItem(product); openCart(); }, [product, addItem, openCart]);
  const cartCount = totalItems();

  return (
    <div ref={heroRef} className="w-full h-full relative">
      {/* BG TEXT */}
      <div className="hero-bg-text absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 1 }}>
        <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 900, fontSize: "clamp(100px, 22vw, 400px)", textTransform: "uppercase", color: "rgba(255,255,255,0.12)", lineHeight: 0.85, whiteSpace: "nowrap", letterSpacing: 10 }}>
          {product.name}
        </span>
      </div>

      {/* PACKS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
        {products.map((p, i) => (
          <div key={p.id} ref={(el) => { packRefs.current[i] = el; }}
            className="absolute will-change-transform md:translate-x-[5%] -translate-y-[5%] md:translate-y-0"
            style={{ maxWidth: 320, maxHeight: 460, width: "52vmin", height: "70vmin", visibility: i === 0 ? "visible" : "hidden" }}>
            <Image src={p.images.pack} alt={p.name} width={350} height={500}
              className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]" priority={i < 3} loading="eager" />
          </div>
        ))}
      </div>

      {/* LEFT (desktop) */}
      <div className="hero-left absolute z-10 hidden md:flex flex-col" style={{ left: 48, top: "50%", transform: "translateY(-50%)", maxWidth: 340 }}>
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 3, opacity: 0.6, marginBottom: 8 }}>{product.subtitle}</p>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 42, fontWeight: 700, lineHeight: 1.05, marginBottom: 10 }}>{product.name}</h1>
        <div className="flex items-baseline gap-3" style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{formatPrice(product.price)}</span>
          {product.compareAtPrice && <span style={{ fontSize: 14, opacity: 0.5, textDecoration: "line-through" }}>{formatPrice(product.compareAtPrice)}</span>}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.65, marginBottom: 20 }}>{product.description}</p>
        <button onClick={handleShopNow} className="group relative overflow-hidden" style={{ border: "1.5px solid rgba(255,255,255,0.7)", background: "transparent", borderRadius: 30, padding: "12px 32px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "white", alignSelf: "flex-start" }}>
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Shop now</span>
          <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </button>
      </div>

      {/* MOBILE INFO */}
      <div className="absolute z-10 md:hidden left-0 right-0 bottom-0 px-5 pb-6 pt-16 text-center" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}>
        <div className="hero-mobile-inner">
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 3, opacity: 0.7, marginBottom: 4 }}>{product.subtitle}</p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 32, fontWeight: 700, lineHeight: 1.1, marginBottom: 4, textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>{product.name}</h1>
          <p style={{ fontSize: 12, lineHeight: 1.5, opacity: 0.75, marginBottom: 8, maxWidth: 280, marginLeft: "auto", marginRight: "auto" }}>{product.description}</p>
          <div className="flex items-baseline justify-center gap-3 mb-3">
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: 30, fontWeight: 700, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>{formatPrice(product.price)}</span>
            {product.compareAtPrice && <span style={{ fontSize: 14, opacity: 0.5, textDecoration: "line-through" }}>{formatPrice(product.compareAtPrice)}</span>}
          </div>
          <button onClick={handleShopNow} className="group relative overflow-hidden mx-auto" style={{ border: "1.5px solid rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", borderRadius: 30, padding: "11px 36px", fontSize: 13, fontWeight: 500, color: "white" }}>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Shop now</span>
            <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {products.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > activeIndex ? 1 : -1)} className="rounded-full transition-all duration-300"
                style={{ width: i === activeIndex ? 18 : 5, height: 5, backgroundColor: i === activeIndex ? "white" : "rgba(255,255,255,0.35)" }} aria-label={`Product ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT (desktop) */}
      <div className="hero-right absolute z-10 hidden md:flex flex-col items-center" style={{ right: 48, top: "50%", transform: "translateY(-50%)" }}>
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => goTo(activeIndex - 1, -1)} className="flex items-center justify-center rounded-full hover:bg-white/10 transition-colors" style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.3)" }}><ChevronLeft size={18} strokeWidth={1.5} /></button>
          <button onClick={() => goTo(activeIndex + 1, 1)} className="flex items-center justify-center rounded-full hover:bg-white/10 transition-colors" style={{ width: 40, height: 40, border: "1px solid rgba(255,255,255,0.3)" }}><ChevronRight size={18} strokeWidth={1.5} /></button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {visibleThumbs.map((p, i) => {
            const realIdx = thumbStart + i;
            const active = realIdx === activeIndex;
            return (
              <button key={p.id} onClick={() => goTo(realIdx, realIdx > activeIndex ? 1 : -1)} className="overflow-hidden flex items-center justify-center transition-all duration-300"
                style={{ width: 56, height: 56, borderRadius: 12, border: active ? "2px solid white" : "1.5px solid rgba(255,255,255,0.15)", background: active ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", opacity: active ? 1 : 0.6, padding: 4 }} title={p.name}>
                <Image src={p.images.pack} alt={p.name} width={48} height={48} className="w-full h-full object-contain" />
              </button>
            );
          })}
        </div>
        <span className="text-[10px] opacity-30 mt-3 tracking-wider">{activeIndex + 1} / {products.length}</span>
      </div>

      {/* BOTTOM PRICE (desktop) */}
      <div className="hero-bottom-price absolute z-10 hidden md:block" style={{ bottom: 40, left: "50%", transform: "translateX(-50%)" }}>
        <span style={{ fontFamily: "var(--font-playfair)", fontSize: 48, fontWeight: 700 }}>{formatPrice(product.price)}</span>
      </div>
    </div>
  );
}
