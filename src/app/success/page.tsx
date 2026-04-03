"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0a0a0a" }}>
      <CheckCircle size={56} strokeWidth={1} className="mb-6 opacity-70 text-green-400" />
      <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 36, fontWeight: 700, marginBottom: 12 }}>
        Thank you!
      </h1>
      <p className="text-sm opacity-50 max-w-sm mb-8">
        Your order has been placed. We&apos;ll send you a confirmation email shortly. Enjoy your SliceUp!
      </p>
      <Link href="/" className="text-sm opacity-70 hover:opacity-100 transition-opacity underline underline-offset-4">
        Back to home
      </Link>
    </div>
  );
}
