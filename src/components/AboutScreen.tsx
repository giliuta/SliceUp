"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AboutScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".about-el", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full h-full relative flex items-center justify-center px-6 md:px-16"
      style={{ background: "linear-gradient(135deg, #1a120b 0%, #2a1a10 50%, #1a120b 100%)" }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full" style={{ top: "10%", right: "20%", background: "rgba(201, 166, 107, 0.06)", filter: "blur(120px)" }} />
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: story */}
          <div>
            <p className="about-el text-xs uppercase tracking-[4px] opacity-40 mb-4">Our story</p>
            <h2 className="about-el mb-6" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.15 }}>
              Nature, Sliced<br />to Perfection
            </h2>
            <p className="about-el text-sm opacity-55 leading-relaxed mb-4">
              Born on the sun-drenched island of Cyprus, SliceUp transforms the freshest fruits and vegetables
              into premium dried snacks. No sugar added. No preservatives. Just pure nature.
            </p>
            <p className="about-el text-sm opacity-55 leading-relaxed mb-4">
              Every slice is carefully dehydrated at low temperatures to preserve vitamins, color, and intense
              natural flavor. From our family farm in Limassol to your table.
            </p>
            <p className="about-el text-sm opacity-55 leading-relaxed">
              We believe in transparency, sustainability, and the simple joy of eating clean. That&apos;s why
              every pack has exactly one ingredient — the fruit itself.
            </p>
          </div>

          {/* Right: values */}
          <div className="flex flex-col gap-6">
            {[
              { num: "01", title: "Zero Additives", desc: "No sugar, no sulfites, no preservatives. Ever." },
              { num: "02", title: "Farm to Pack", desc: "Sourced from local Mediterranean farms, dried within 24 hours of harvest." },
              { num: "03", title: "Eco Packaging", desc: "Kraft paper pouches, fully recyclable. Minimal footprint, maximum flavor." },
              { num: "04", title: "Cyprus Origin", desc: "Made in Limassol with Mediterranean sun and island love." },
            ].map((v) => (
              <div key={v.num} className="about-el flex gap-4">
                <span className="text-2xl font-bold opacity-15" style={{ fontFamily: "var(--font-playfair)", minWidth: 36 }}>{v.num}</span>
                <div>
                  <h3 className="text-sm font-semibold mb-1">{v.title}</h3>
                  <p className="text-xs opacity-45 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
