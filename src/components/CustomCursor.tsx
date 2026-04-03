"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if ("ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: mx, y: my, duration: 0.35, ease: "power3.out" });
    };

    const grow = () => {
      gsap.to(ring, { scale: 2, opacity: 0.15, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: "power2.out" });
    };
    const shrink = () => {
      gsap.to(ring, { scale: 1, opacity: 0.3, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    document.addEventListener("mousemove", move);

    const interactives = document.querySelectorAll("a, button, [role=button], input, textarea");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    // Re-observe for dynamic elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [role=button]").forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", move);
      observer.disconnect();
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block"
        style={{
          width: 6, height: 6, borderRadius: "50%", background: "white",
          transform: "translate(-50%, -50%)", willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[998] hidden md:block"
        style={{
          width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)",
          transform: "translate(-50%, -50%)", willChange: "transform", opacity: 0.3,
        }}
      />
    </>
  );
}
