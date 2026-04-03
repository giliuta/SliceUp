"use client";

import { useEffect, useRef } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/data/products";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        data-cart-drawer
        className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-black/90 backdrop-blur-xl text-white transition-transform duration-300 ease-out flex flex-col"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h2
            className="text-lg font-bold tracking-wide"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your Cart
          </h2>
          <button onClick={closeCart} className="p-1 hover:opacity-70 transition-opacity" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-40">
              <p className="text-sm font-light">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 py-3 border-b border-white/5"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-white/5">
                    {item.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs opacity-50">{item.product.weight}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-sm font-medium w-16 text-right">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="p-1 hover:text-red-400 opacity-40 hover:opacity-100 transition-all"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-light opacity-70">Total</span>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {formatPrice(totalPrice())}
              </span>
            </div>
            <button
              onClick={async () => {
                const res = await fetch("/api/checkout", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    items: items.map((i) => ({
                      id: i.product.id, name: i.product.name,
                      price: i.product.price, quantity: i.quantity,
                    })),
                  }),
                });
                const { url } = await res.json();
                if (url) window.location.href = url;
              }}
              className="w-full py-3 bg-white text-black text-sm font-medium tracking-wider uppercase hover:bg-white/90 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
