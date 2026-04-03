"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const move = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power3.out" });
      gsap.to(label, { x: e.clientX, y: e.clientY, duration: 0.25, ease: "power3.out" });
    };

    const grow = () => {
      gsap.to(ring, { scale: 2, opacity: 0.12, duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };
    const shrink = () => {
      gsap.to(ring, { scale: 1, opacity: 0.25, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2 });
    };
    const showLabel = (text: string) => {
      if (label) label.textContent = text;
      gsap.to(ring, { scale: 2.5, opacity: 0.08, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
    };

    document.addEventListener("mousemove", move);

    const bind = () => {
      document.querySelectorAll("a, button, [role=button]").forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
        el.addEventListener("mouseenter", grow);
        el.addEventListener("mouseleave", shrink);
      });
      // Pack hover → show "Explore" label
      document.querySelectorAll("[data-cursor-label]").forEach((el) => {
        const text = (el as HTMLElement).dataset.cursorLabel || "Explore";
        el.removeEventListener("mouseenter", () => showLabel(text));
        el.removeEventListener("mouseleave", shrink);
        el.addEventListener("mouseenter", () => showLabel(text));
        el.addEventListener("mouseleave", shrink);
      });
    };
    bind();

    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 pointer-events-none z-[999] hidden md:block"
        style={{ width: 6, height: 6, borderRadius: "50%", background: "white", transform: "translate(-50%, -50%)", willChange: "transform" }} />
      <div ref={ringRef} className="fixed top-0 left-0 pointer-events-none z-[998] hidden md:block"
        style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.25)", transform: "translate(-50%, -50%)", willChange: "transform", opacity: 0.25 }} />
      <div ref={labelRef} className="fixed top-0 left-0 pointer-events-none z-[997] hidden md:flex items-center justify-center"
        style={{ transform: "translate(-50%, -50%)", opacity: 0, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 500, willChange: "transform" }} />
    </>
  );
}
