"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

export default function Nav() {
  const { totalItems, toggleCart } = useCartStore();
  const [visible, setVisible] = useState(false);
  const count = totalItems();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-20px)" }}
    >
      <div
        className="text-xl font-bold tracking-wider"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        SliceUp
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8 text-sm font-light tracking-wide opacity-80">
          <a href="#" className="hover:opacity-100 transition-opacity">Menu</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Shop</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
        </div>

        <button
          onClick={toggleCart}
          className="relative p-2 hover:opacity-80 transition-opacity"
          aria-label="Open cart"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
