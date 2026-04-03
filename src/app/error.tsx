"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0a0a0a" }}>
      <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
        Something went wrong
      </h1>
      <p className="text-sm opacity-40 max-w-sm mb-8">{error.message || "An unexpected error occurred."}</p>
      <button onClick={reset} className="text-sm opacity-70 hover:opacity-100 transition-opacity"
        style={{ border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 30, padding: "10px 28px" }}>
        Try again
      </button>
    </div>
  );
}
