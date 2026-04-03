"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { products, formatPrice } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";

gsap.registerPlugin(useGSAP);

export default function CatalogScreen() {
  const ref = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  useGSAP(() => {
    gsap.fromTo(".catalog-title", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 });
    gsap.fromTo(".catalog-card", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.3 });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full h-full relative flex flex-col items-center justify-center px-6 md:px-12"
      style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full" style={{ top: "10%", left: "60%", background: "rgba(200,120,50,0.04)", filter: "blur(120px)" }} />
      </div>
      <div className="relative z-10 w-full max-w-6xl">
        <h2 className="catalog-title text-center mb-10" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700 }}>
          Full Catalog
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {products.map((p) => (
            <div key={p.id} className="catalog-card flex-shrink-0 snap-center rounded-2xl p-4 flex flex-col items-center"
              style={{ width: 180, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-28 h-36 mb-3 flex items-center justify-center">
                <Image src={p.images.pack} alt={p.name} width={112} height={144} className="w-full h-full object-contain" />
              </div>
              <p className="text-xs opacity-40 uppercase tracking-wider mb-1">{p.subtitle}</p>
              <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{p.name}</p>
              <p className="text-sm font-bold mb-3">{formatPrice(p.price)}</p>
              <button onClick={() => addItem(p)} className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
                style={{ border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 16px" }}>
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
