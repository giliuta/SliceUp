"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window) return;
    const handler = () => {
      if (!dismissed && !show) setShow(true);
    };
    const timer = setTimeout(() => document.addEventListener("mouseleave", handler), 10000);
    return () => { clearTimeout(timer); document.removeEventListener("mouseleave", handler); };
  }, [dismissed, show]);

  useEffect(() => {
    if (show && ref.current) gsap.fromTo(ref.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
  }, [show]);

  const close = () => { setShow(false); setDismissed(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
    setTimeout(close, 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center" onClick={close}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div ref={ref} className="relative z-10 max-w-sm w-full mx-6 rounded-2xl p-8 text-center"
        style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={(e) => e.stopPropagation()}>
        <button onClick={close} className="absolute top-3 right-3 p-1 opacity-40 hover:opacity-100 transition-opacity" aria-label="Close">
          <X size={18} />
        </button>

        {submitted ? (
          <>
            <p className="text-2xl mb-2">&#10003;</p>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>You&apos;re in!</h3>
            <p className="text-sm opacity-50">Check your inbox for the discount code.</p>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[3px] opacity-40 mb-3">Before you go</p>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              Get 10% off
            </h3>
            <p className="text-sm opacity-50 mb-5 leading-relaxed">
              Subscribe and receive a discount code for your first order. No spam, just dried fruits.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm outline-none placeholder:opacity-30 focus:border-white/30 transition-colors" />
              <button type="submit" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors flex-shrink-0">
                Get code
              </button>
            </form>
            <p className="text-[10px] opacity-20 mt-3">Or use code SLICE10 at checkout</p>
          </>
        )}
      </div>
    </div>
  );
}
