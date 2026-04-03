"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ShoppingBag, Menu as MenuIcon } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import CartDrawer from "@/components/CartDrawer";
import HeroScreen from "@/components/HeroScreen";
import CollabScreen from "@/components/CollabScreen";
import ContactScreen from "@/components/ContactScreen";
import AboutScreen from "@/components/AboutScreen";
import CatalogScreen from "@/components/CatalogScreen";
import ProcessScreen from "@/components/ProcessScreen";
import CustomCursor from "@/components/CustomCursor";
import SplashScreen from "@/components/SplashScreen";
import MobileMenu from "@/components/MobileMenu";
import ExitIntent from "@/components/ExitIntent";

const SCREENS = ["hero", "catalog", "process", "collab", "about", "contact"] as const;
const SCREEN_LABELS = ["Products", "Catalog", "Process", "Collab", "About", "Contact"];
const THUMBS_PER_PAGE = 4;

export default function Home() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [thumbPage, setThumbPage] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioning = useRef(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const cartCount = totalItems();

  // --- Detect prefers-reduced-motion ---
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // --- Lock viewport ---
  useEffect(() => {
    const prevent = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest("[data-cart-drawer]")) return;
      if (mobileMenuOpen) return;
      e.preventDefault();
    };
    document.addEventListener("touchmove", prevent, { passive: false });
    document.body.style.cssText = "overflow:hidden;position:fixed;inset:0;width:100%;height:100%";
    return () => {
      document.removeEventListener("touchmove", prevent);
      document.body.style.cssText = "";
    };
  }, [mobileMenuOpen]);

  // --- Initial bg ---
  useEffect(() => {
    document.body.style.backgroundColor = products[0].theme.background;
  }, []);

  const dur = reducedMotion ? 0.01 : 0.65;

  // --- Horizontal screen switch ---
  const goScreen = useCallback((dir: 1 | -1) => {
    if (isTransitioning.current) return;
    const next = screenIndex + dir;
    if (next < 0 || next >= SCREENS.length) return;
    isTransitioning.current = true;

    const current = screenRefs.current[screenIndex];
    const target = screenRefs.current[next];

    const bgColor = next === 0 ? products[activeProduct].theme.background : "#111";
    gsap.to(document.body, { backgroundColor: bgColor, duration: dur, ease: "power2.inOut" });

    if (current) gsap.to(current, { x: dir * -100 + "%", opacity: 0, scale: 0.92, filter: "blur(8px)", duration: dur, ease: "power3.inOut", force3D: true });
    if (target) {
      gsap.set(target, { x: dir * 100 + "%", opacity: 0, scale: 0.95, filter: "blur(8px)", visibility: "visible" });
      gsap.to(target, { x: "0%", opacity: 1, scale: 1, filter: "blur(0px)", duration: dur, ease: "power3.inOut", force3D: true, delay: reducedMotion ? 0 : 0.05 });
    }

    setScreenIndex(next);
    setTimeout(() => { isTransitioning.current = false; }, reducedMotion ? 50 : 700);
  }, [screenIndex, activeProduct, dur, reducedMotion]);

  // --- Direct screen jump (for mobile menu) ---
  const goScreenDirect = useCallback((target: number) => {
    if (target === screenIndex) return;
    const dir = target > screenIndex ? 1 : -1;
    // Step through one at a time
    goScreen(dir);
  }, [screenIndex, goScreen]);

  // --- Product switch ---
  const goProduct = useCallback((idx: number) => {
    setActiveProduct(idx);
    setThumbPage(Math.floor(idx / THUMBS_PER_PAGE));
  }, []);

  // --- Keyboard ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (mobileMenuOpen) return;
      if (e.key === "ArrowRight") { e.preventDefault(); goScreen(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goScreen(-1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goScreen, mobileMenuOpen]);

  // --- Wheel ---
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      if (isTransitioning.current || mobileMenuOpen) return;
      if (Math.abs(e.deltaX) > 30 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        goScreen(e.deltaX > 0 ? 1 : -1);
        return;
      }
      if (screenIndex === 0 && Math.abs(e.deltaY) > 25) {
        window.dispatchEvent(new CustomEvent("hero-scroll", { detail: { dir: e.deltaY > 0 ? 1 : -1 } }));
      }
    };
    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [screenIndex, goScreen, mobileMenuOpen]);

  // --- Touch ---
  useEffect(() => {
    let x0 = 0, y0 = 0;
    const ts = (e: TouchEvent) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; };
    const te = (e: TouchEvent) => {
      if (isTransitioning.current || mobileMenuOpen) return;
      const dx = x0 - e.changedTouches[0].clientX;
      const dy = y0 - e.changedTouches[0].clientY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        goScreen(dx > 0 ? 1 : -1);
        return;
      }
      if (screenIndex === 0 && Math.abs(dy) > 35 && Math.abs(dy) > Math.abs(dx)) {
        window.dispatchEvent(new CustomEvent("hero-scroll", { detail: { dir: dy > 0 ? 1 : -1 } }));
      }
    };
    window.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchend", te, { passive: true });
    return () => { window.removeEventListener("touchstart", ts); window.removeEventListener("touchend", te); };
  }, [screenIndex, goScreen, mobileMenuOpen]);

  return (
    <>
      {/* Splash */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Custom cursor (desktop only) */}
      {!reducedMotion && <CustomCursor />}

      <div className="fixed inset-0 overflow-hidden">

        {/* NAV */}
        <nav className="nav-el fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-12 py-3 md:py-4">
          <div style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: 22, fontWeight: 400, cursor: "pointer" }}
            onClick={() => { if (screenIndex !== 0) goScreen(-1); }}>
            SliceUp
          </div>
          <div className="hidden md:flex items-center gap-6">
            {SCREENS.map((_, i) => (
              <button key={i} onClick={() => goScreenDirect(i)}
                className="text-sm transition-all duration-300"
                style={i === screenIndex ? { background: "rgba(255,255,255,0.95)", color: "#222", borderRadius: 20, padding: "6px 20px", fontWeight: 500 } : { opacity: 0.7, padding: "6px 0" }}>
                {SCREEN_LABELS[i]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="md:hidden p-1" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon size={20} strokeWidth={1.5} />
            </button>
            <button onClick={toggleCart} className="relative p-1 hover:opacity-80 transition-opacity" aria-label="Cart">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && <span data-cart-badge className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* Page dots */}
        <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[90] flex flex-col gap-2">
          {SCREENS.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-500" style={{
              width: 6, height: i === screenIndex ? 24 : 6,
              backgroundColor: i === screenIndex ? "white" : "rgba(255,255,255,0.25)",
            }} />
          ))}
        </div>

        {/* SCREENS */}
        {SCREENS.map((screen, i) => (
          <div key={screen} ref={(el) => { screenRefs.current[i] = el; }}
            className="absolute inset-0 will-change-transform"
            style={{ visibility: i === 0 ? "visible" : "hidden" }}>
            {screen === "hero" && <HeroScreen activeIndex={activeProduct} thumbPage={thumbPage} onProductChange={goProduct} />}
            {screen === "catalog" && <CatalogScreen />}
            {screen === "process" && <ProcessScreen />}
            {screen === "collab" && <CollabScreen />}
            {screen === "about" && <AboutScreen />}
            {screen === "contact" && <ContactScreen />}
          </div>
        ))}

        <CartDrawer />
      </div>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onNavigate={goScreenDirect} currentScreen={screenIndex} />

      {/* Exit intent popup */}
      <ExitIntent />
    </>
  );
}
