"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window) return; // desktop only
    const handler = (e: MouseEvent) => {
      if (e.clientY < 5 && !dismissed && !show) {
        setShow(true);
      }
    };
    // Delay activation by 10 seconds
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handler);
    }, 10000);
    return () => { clearTimeout(timer); document.removeEventListener("mouseleave", handler); };
  }, [dismissed, show]);

  useEffect(() => {
    if (show && ref.current) {
      gsap.fromTo(ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
    }
  }, [show]);

  const close = () => { setShow(false); setDismissed(true); };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center" onClick={close}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div ref={ref} className="relative z-10 max-w-sm w-full mx-6 rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={close} className="absolute top-3 right-3 p-1 opacity-40 hover:opacity-100 transition-opacity" aria-label="Close">
          <X size={18} />
        </button>
        <p className="text-xs uppercase tracking-[3px] opacity-40 mb-3">Wait!</p>
        <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          10% off your first order
        </h3>
        <p className="text-sm opacity-50 mb-6 leading-relaxed">
          Use code <strong className="opacity-90">SLICE10</strong> at checkout. Premium dried fruits, delivered to your door.
        </p>
        <button onClick={close}
          className="text-sm font-medium px-8 py-3 rounded-full bg-white text-black hover:bg-white/90 transition-colors">
          Got it, thanks!
        </button>
      </div>
    </div>
  );
}
