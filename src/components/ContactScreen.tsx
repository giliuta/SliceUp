"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, MapPin, Globe, MessageCircle } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function ContactScreen() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".contact-el", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full h-full relative flex flex-col items-center justify-center px-6"
      style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)" }}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full" style={{ top: "20%", left: "50%", transform: "translateX(-50%)", background: "rgba(175, 68, 37, 0.08)", filter: "blur(120px)" }} />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <p className="contact-el text-xs uppercase tracking-[4px] opacity-40 mb-4">Get in touch</p>
        <h2 className="contact-el mb-10" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, lineHeight: 1.1 }}>
          Contact
        </h2>

        <div className="contact-el flex items-center justify-center gap-3 mb-3 opacity-80">
          <Mail size={18} strokeWidth={1.2} />
          <a href="mailto:hello@sliceup.cy" className="text-lg hover:opacity-100 transition-opacity">hello@sliceup.cy</a>
        </div>

        <div className="contact-el flex items-center justify-center gap-3 mb-8 opacity-50">
          <MapPin size={18} strokeWidth={1.2} />
          <span className="text-sm">Limassol, Cyprus</span>
        </div>

        <div className="contact-el flex items-center justify-center gap-6">
          <a href="#" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity text-sm">
            <Globe size={20} strokeWidth={1.2} /> Instagram
          </a>
          <a href="#" className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity text-sm">
            <MessageCircle size={20} strokeWidth={1.2} /> WhatsApp
          </a>
        </div>

        <p className="contact-el mt-16 text-[11px] opacity-20 tracking-wider">
          &copy; 2026 SliceUp. Premium Dried Fruits.
        </p>
      </div>
    </div>
  );
}
