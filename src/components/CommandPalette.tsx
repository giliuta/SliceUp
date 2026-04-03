"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { products, formatPrice } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((s) => s.addItem);

  const filtered = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.subtitle.toLowerCase().includes(query.toLowerCase()))
    : products;

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
      if (ref.current) gsap.fromTo(ref.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[170] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div ref={ref} className="relative z-10 w-full max-w-md mx-4 rounded-2xl overflow-hidden"
        style={{ background: "rgba(20,20,20,0.95)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}
        onClick={(e) => e.stopPropagation()}>

        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <Search size={16} className="opacity-30" />
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-30"
            placeholder="Search products..." />
          <button onClick={onClose} className="opacity-30 hover:opacity-100 transition-opacity">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="text-sm opacity-30 text-center py-6">No products found</p>
          ) : (
            filtered.map((p) => (
              <button key={p.id} onClick={() => { addItem(p); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                  <Image src={p.images.pack} alt={p.name} width={40} height={40} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs opacity-35">{p.subtitle}</p>
                </div>
                <span className="text-sm font-semibold opacity-60">{formatPrice(p.price)}</span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-white/5">
          <p className="text-[10px] opacity-20 text-center">Press Esc to close</p>
        </div>
      </div>
    </div>
  );
}
