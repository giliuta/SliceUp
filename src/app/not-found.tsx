import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0a0a0a" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full" style={{ top: "30%", left: "50%", transform: "translateX(-50%)", background: "rgba(194, 24, 91, 0.06)", filter: "blur(120px)" }} />
      </div>
      <h1 className="relative" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(100px, 20vw, 240px)", fontWeight: 900, opacity: 0.1, lineHeight: 1 }}>
        404
      </h1>
      <p className="relative" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, marginTop: -30, marginBottom: 12 }}>
        Page not found
      </p>
      <p className="relative text-sm opacity-40 max-w-sm mb-8">
        This slice doesn&apos;t exist. Let&apos;s get you back to something delicious.
      </p>
      <Link href="/" className="relative group overflow-hidden inline-block"
        style={{ border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 30, padding: "12px 32px", fontSize: 13, fontWeight: 500 }}>
        <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Back to home</span>
        <span className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
      </Link>
    </div>
  );
}
