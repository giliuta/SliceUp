"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => { setVisible(false); onComplete(); },
    });

    // Progress bar fills over 1.5s
    tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power1.inOut" }, 0)
      .fromTo(".splash-line-1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.1)
      .fromTo(".splash-line-2", { y: 20, opacity: 0 }, { y: 0, opacity: 0.35, duration: 0.5, ease: "power3.out" }, 0.35)
      .to(".splash-line-1", { y: -15, opacity: 0, duration: 0.4, ease: "power2.in" }, 1.6)
      .to(".splash-line-2", { y: -10, opacity: 0, duration: 0.3, ease: "power2.in" }, 1.65)
      .to(barRef.current, { opacity: 0, duration: 0.2 }, 1.6)
      .to(ref.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 1.8);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={ref} className="fixed inset-0 z-[200] flex flex-col items-center justify-center" style={{ background: "#0a0a0a" }}>
      <div className="splash-line-1" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 400, letterSpacing: 2 }}>
        SliceUp
      </div>
      <div className="splash-line-2" style={{ fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginTop: 12 }}>
        Premium Dried Fruits
      </div>
      {/* Progress bar */}
      <div style={{ width: 120, height: 1.5, background: "rgba(255,255,255,0.1)", marginTop: 28, borderRadius: 2, overflow: "hidden" }}>
        <div ref={barRef} style={{ width: "100%", height: "100%", background: "rgba(255,255,255,0.6)", transformOrigin: "left", borderRadius: 2 }} />
      </div>
    </div>
  );
}
