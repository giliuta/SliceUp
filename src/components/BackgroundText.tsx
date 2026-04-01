"use client";

interface BackgroundTextProps {
  text: string;
  parallax: { x: number; y: number };
}

export default function BackgroundText({ text, parallax }: BackgroundTextProps) {
  return (
    <div
      className="hero-bg-text bg-text absolute inset-0 flex items-center justify-center z-0 will-change-transform"
      style={{
        transform: `translate(${parallax.x * -30}px, ${parallax.y * -20}px)`,
      }}
    >
      {text}
    </div>
  );
}
