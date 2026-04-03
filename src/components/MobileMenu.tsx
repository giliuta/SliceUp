"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: number) => void;
  currentScreen: number;
}

const LINKS = [
  { label: "Products", screen: 0 },
  { label: "Collaboration", screen: 1 },
  { label: "Contact", screen: 2 },
  { label: "About", screen: 3 },
];

export default function MobileMenu({ isOpen, onClose, onNavigate, currentScreen }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      gsap.to(ref.current, { opacity: 1, visibility: "visible", duration: 0.3, ease: "power2.out" });
      gsap.fromTo(".menu-link", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out", delay: 0.15 });
    } else {
      gsap.to(ref.current, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => { gsap.set(ref.current, { visibility: "hidden" }); } });
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)", visibility: "hidden", opacity: 0 }}
    >
      <button onClick={onClose} className="absolute top-4 right-5 p-2" aria-label="Close menu">
        <X size={24} strokeWidth={1.5} />
      </button>

      <nav className="flex flex-col items-center gap-8">
        {LINKS.map((link) => (
          <button
            key={link.label}
            className="menu-link transition-opacity duration-200"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: 32,
              fontWeight: 700,
              opacity: link.screen === currentScreen ? 1 : 0.5,
            }}
            onClick={() => { onNavigate(link.screen); onClose(); }}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-8 text-[11px] opacity-20 tracking-widest uppercase">
        SliceUp &mdash; Cyprus
      </div>
    </div>
  );
}
