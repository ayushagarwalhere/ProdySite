"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"drawing" | "logo" | "exit">("drawing");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 2000);
    const t2 = setTimeout(() => setPhase("exit"), 3500);
    const t3 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const hieroglyphs = ["𓂀", "𓁹", "𓃀", "𓆣", "𓇌", "𓈖", "𓉐", "𓊝"];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
        animation:
          phase === "exit"
            ? "preloader-fade-out 1s ease-in-out forwards"
            : undefined,
      }}
    >
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "var(--gold)",
            left: `${Math.random() * 100}%`,
            bottom: "-10px",
            animation: `particle-float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Floating hieroglyphs */}
      {hieroglyphs.map((h, i) => (
        <span
          key={`hiero-${i}`}
          style={{
            position: "absolute",
            fontSize: "1.5rem",
            userSelect: "none",
            pointerEvents: "none",
            color: "var(--gold)",
            left: `${10 + i * 11}%`,
            top: `${20 + (i % 3) * 25}%`,
            animation: `hieroglyph-float ${4 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {h}
        </span>
      ))}

      {/* Center content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Rotating rings */}
        <div
          style={{
            position: "absolute",
            width: "12rem",
            height: "12rem",
            border: "1px solid var(--gold-dark)",
            borderRadius: "50%",
            opacity: 0.2,
            animation: "ankh-spin 8s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "14rem",
            height: "14rem",
            border: "1px solid var(--gold-dark)",
            borderRadius: "50%",
            opacity: 0.1,
            animation: "ankh-spin 12s linear infinite reverse",
          }}
        />

        {/* Eye of Horus SVG */}
        <div
          style={{
            position: "absolute",
            width: "8rem",
            height: "8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase === "drawing" ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <svg
            viewBox="0 0 200 200"
            style={{ width: "100%", height: "100%" }}
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
          >
            <path
              d="M30 100 Q50 60 100 60 Q150 60 170 100 Q150 140 100 140 Q50 140 30 100 Z"
              style={{
                strokeDasharray: 800,
                strokeDashoffset: 800,
                animation: "eye-of-horus-draw 2s ease-in-out forwards",
              }}
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              fill="var(--gold)"
              style={{
                opacity: 0,
                animation: "logo-reveal 1s ease-out 1.2s forwards",
              }}
            />
            <path
              d="M100 120 Q95 150 100 170 Q105 150 100 120"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: 200,
                animation: "eye-of-horus-draw 1s ease-in-out 1s forwards",
              }}
            />
          </svg>
        </div>

        {/* Logo */}
        <div
          style={{
            width: "7rem",
            height: "7rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase === "logo" || phase === "exit" ? 1 : 0,
            animation:
              phase === "logo" || phase === "exit"
                ? "logo-reveal 1s ease-out forwards"
                : undefined,
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              padding: "4px",
              animation: "glow-pulse 2s ease-in-out infinite",
            }}
          >
            <Image
              src="/logo.png"
              alt="Prody Logo"
              width={112}
              height={112}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        {/* Title text */}
        <div
          style={{
            marginTop: "1rem",
            opacity: phase === "logo" || phase === "exit" ? 1 : 0,
            transition: "opacity 0.5s ease 0.3s",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 300,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--gold)",
              animation:
                phase === "logo" || phase === "exit"
                  ? "text-reveal 0.8s ease-out 0.3s both"
                  : undefined,
            }}
          >
            Prody 2026
          </h2>
        </div>
      </div>
    </div>
  );
}
