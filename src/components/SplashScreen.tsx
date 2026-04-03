"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete();
      },
    });

    tl.fromTo(".splash-line-1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.2)
      .fromTo(".splash-line-2", { y: 20, opacity: 0 }, { y: 0, opacity: 0.4, duration: 0.5, ease: "power3.out" }, 0.5)
      .to(".splash-line-1", { y: -15, opacity: 0, duration: 0.4, ease: "power2.in" }, 1.4)
      .to(".splash-line-2", { y: -10, opacity: 0, duration: 0.3, ease: "power2.in" }, 1.5)
      .to(ref.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, 1.7);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="splash-line-1"
        style={{
          fontFamily: "var(--font-playfair)",
          fontStyle: "italic",
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 400,
          letterSpacing: 2,
        }}
      >
        SliceUp
      </div>
      <div
        className="splash-line-2"
        style={{ fontSize: 12, letterSpacing: 6, textTransform: "uppercase", marginTop: 12 }}
      >
        Premium Dried Fruits
      </div>
    </div>
  );
}
