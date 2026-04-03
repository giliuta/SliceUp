"use client";

import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0a0a0a" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", background: "rgba(76, 175, 80, 0.06)", filter: "blur(120px)" }} />
      </div>

      <div className="relative">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.2)" }}>
          <CheckCircle size={32} strokeWidth={1.2} className="text-green-400" />
        </div>
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, marginBottom: 12 }}>
          Thank you!
        </h1>
        <p className="text-sm opacity-45 max-w-sm mb-4 leading-relaxed">
          Your order has been placed successfully. We&apos;ll send a confirmation to your email shortly.
        </p>
        <p className="text-xs opacity-25 mb-8">
          Premium dried fruits, on their way to you from Cyprus.
        </p>
        <Link href="/" className="group inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={14} />
          <span>Back to SliceUp</span>
        </Link>
      </div>
    </div>
  );
}
