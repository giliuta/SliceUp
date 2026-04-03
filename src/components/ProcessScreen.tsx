"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sun, Thermometer, Package } from "lucide-react";

gsap.registerPlugin(useGSAP);

const STEPS = [
  { icon: Sun, num: "01", title: "Harvest", desc: "Handpicked at peak ripeness from Mediterranean farms. Only the freshest fruits make the cut." },
  { icon: Thermometer, num: "02", title: "Dehydrate", desc: "Slow-dried at low temperatures (42\u00b0C) for 18-24 hours. Preserves vitamins, color, and natural flavor." },
  { icon: Package, num: "03", title: "Pack & Ship", desc: "Sealed in eco-friendly kraft pouches within 24 hours. From our farm to your door, fresh as nature intended." },
];

export default function ProcessScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".process-title", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 });
    gsap.fromTo(".process-step", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "power3.out", delay: 0.4 });
    gsap.fromTo(".process-line", { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "power2.out", delay: 0.5 });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full h-full relative flex items-center justify-center px-6 md:px-16"
      style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #12230f 50%, #0a1a0a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full" style={{ bottom: "10%", right: "20%", background: "rgba(100,180,80,0.05)", filter: "blur(120px)" }} />
      </div>
      <div className="relative z-10 max-w-2xl w-full mx-auto">
        <p className="process-title text-xs uppercase tracking-[4px] opacity-40 mb-3 text-center">How it&apos;s made</p>
        <h2 className="process-title mb-14 text-center" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.15 }}>
          From Farm<br />to Your Table
        </h2>
        <div className="relative flex flex-col gap-10 md:gap-14">
          {/* Vertical line */}
          <div className="process-line absolute left-[19px] top-4 bottom-4 w-[1px] bg-white/10 origin-top hidden md:block" />
          {STEPS.map((s) => (
            <div key={s.num} className="process-step flex items-start gap-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <s.icon size={18} strokeWidth={1.2} className="opacity-70" />
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-2xl font-bold opacity-12" style={{ fontFamily: "var(--font-playfair)" }}>{s.num}</span>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>{s.title}</h3>
                </div>
                <p className="text-sm opacity-45 leading-relaxed max-w-md">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
