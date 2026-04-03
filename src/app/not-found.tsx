import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0a0a0a" }}>
      <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(80px, 15vw, 200px)", fontWeight: 900, opacity: 0.08, lineHeight: 1 }}>
        404
      </h1>
      <p style={{ fontFamily: "var(--font-playfair)", fontSize: 28, fontWeight: 700, marginTop: -20, marginBottom: 12 }}>
        Page not found
      </p>
      <p className="text-sm opacity-40 max-w-sm mb-8">
        This slice doesn&apos;t exist. Let&apos;s get you back to something delicious.
      </p>
      <Link
        href="/"
        className="text-sm opacity-70 hover:opacity-100 transition-opacity"
        style={{ border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 30, padding: "10px 28px" }}
      >
        Back to home
      </Link>
    </div>
  );
}
