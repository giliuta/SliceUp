"use client";

import { useMemo } from "react";

interface FloatingParticlesProps {
  accent: string;
  parallax: { x: number; y: number };
}

const PARTICLES = [
  { top: "15%", left: "10%", size: 6, speed: 8, delay: 0 },
  { top: "70%", left: "85%", size: 4, speed: 12, delay: 1.5 },
  { top: "30%", left: "75%", size: 8, speed: 6, delay: 0.8 },
  { top: "80%", left: "20%", size: 5, speed: 10, delay: 2 },
  { top: "50%", left: "92%", size: 3, speed: 15, delay: 0.5 },
];

export default function FloatingParticles({ accent, parallax }: FloatingParticlesProps) {
  const particles = useMemo(() => PARTICLES, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: accent,
            opacity: 0.35,
            transform: `translate(${parallax.x * p.speed}px, ${parallax.y * p.speed}px)`,
            animation: `particleDrift ${4 + p.speed * 0.3}s ease-in-out ${p.delay}s infinite`,
            transition: "background-color 0.6s ease",
          }}
        />
      ))}
    </div>
  );
}
