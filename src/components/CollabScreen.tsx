"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Handshake, Truck, Palette, Globe } from "lucide-react";

gsap.registerPlugin(useGSAP);

const FEATURES = [
  { icon: Handshake, title: "Partnership", desc: "We work with restaurants, hotels, and cafes across Europe. Custom packaging and white-label solutions available." },
  { icon: Truck, title: "Wholesale", desc: "Bulk orders with competitive pricing. Minimum order from 50 units. Fast delivery across EU." },
  { icon: Palette, title: "Custom Blends", desc: "Create your own unique mix. Choose from 14 dried fruits and vegetables. Your brand, our craft." },
  { icon: Globe, title: "Global Reach", desc: "Based in Limassol, Cyprus. Shipping worldwide. Premium quality from Mediterranean sun." },
];

export default function CollabScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".collab-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 });
    gsap.fromTo(".collab-subtitle", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.35 });
    gsap.fromTo(".collab-card", { opacity: 0, y: 25, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.45 });
    gsap.fromTo(".collab-cta", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.9 });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full h-full relative flex flex-col items-center justify-center px-6 md:px-16"
      style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>

      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full" style={{ top: "-15%", right: "-10%", background: "rgba(255,255,255,0.03)", filter: "blur(100px)" }} />
        <div className="absolute w-[400px] h-[400px] rounded-full" style={{ bottom: "-10%", left: "-5%", background: "rgba(100,150,255,0.05)", filter: "blur(120px)" }} />
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        <p className="collab-subtitle text-xs md:text-sm uppercase tracking-[4px] opacity-50 mb-4">
          Let&apos;s grow together
        </p>
        <h2 className="collab-title mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1 }}>
          Collaboration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">
          {FEATURES.map((f, i) => (
            <div key={i} className="collab-card rounded-2xl p-6 md:p-8 text-left"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
              <f.icon size={28} strokeWidth={1.2} className="mb-4 opacity-70" />
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>{f.title}</h3>
              <p className="text-sm opacity-55 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <a href="mailto:hello@sliceup.cy"
          className="collab-cta inline-block group relative overflow-hidden"
          style={{ border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: 30, padding: "14px 40px", fontSize: 14, fontWeight: 500, letterSpacing: 1 }}>
          <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Get in touch</span>
          <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </a>
      </div>
    </div>
  );
}
