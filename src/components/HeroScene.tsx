"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FluidImagePlane from "./FluidImagePlane";
import HomePageCursor from "./HomePageCursor";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null); // scoped cursor container
  const scrollProgress = useRef(0);

  // bg shift state — normalized cursor position
  const [cursorNorm, setCursorNorm] = useState({ x: 0.5, y: 0.5 });
  const smoothNorm = useRef({ x: 0.5, y: 0.5 });

  const handleCursorMove = useCallback((x: number, y: number) => {
    smoothNorm.current.x += (x - smoothNorm.current.x) * 0.06;
    smoothNorm.current.y += (y - smoothNorm.current.y) * 0.06;
    setCursorNorm({ ...smoothNorm.current });
  }, []);

  const ticking = useRef(false);
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      scrollProgress.current = Math.max(0, Math.min(1, -rect.top / total));
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // dynamic bg: subtle warm/cool radial that follows cursor
  const bgStyle = {
    background: `
      radial-gradient(
        ellipse 80% 70% at ${cursorNorm.x * 100}% ${cursorNorm.y * 100}%,
        rgba(60,28,4,0.55) 0%,
        rgba(18,8,0,0.0) 60%
      ),
      radial-gradient(
        ellipse 120% 80% at ${(1 - cursorNorm.x) * 100}% ${(1 - cursorNorm.y) * 100}%,
        rgba(4,12,24,0.35) 0%,
        rgba(0,0,0,0.0) 55%
      )
    `,
    transition: "background 0.1s ease",
  };

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <HomePageCursor containerRef={heroRef} />
      <div
        ref={heroRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ position: "sticky" }}
      >
        {/* ── dynamic bg overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ ...bgStyle, zIndex: 1 }}
        />

        {/* ── canvas ── */}
        <div className="absolute inset-y-0 right-0 z-10 w-1/2 h-full">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 1.5]}
            style={{
              width: "100vw",
              height: "100vh",
              background: "transparent",
            }}
          >
            <Suspense fallback={null}>
              <FluidImagePlane scrollProgress={scrollProgress} />
            </Suspense>
          </Canvas>
        </div>

        {/* ── text block ── */}
        <div className="absolute inset-0 z-9999 pointer-events-none flex flex-col justify-end p-8 md:p-16 w-1/2">
          <div className="max-w-3xl">
            <p className="font-ui text-muted-foreground mb-4 tracking-widest text-xs uppercase">
              Alchemy of Innovation
            </p>
            <h1
              className="font-display font-light italic text-foreground leading-none mb-5"
              style={{
                fontSize: "clamp(3rem, 9vw, 7rem)",
                letterSpacing: "-0.03em",
              }}
            >
              Prodyogiki
              <span
                className="font-display font-light not-italic"
                style={{
                  fontSize: "clamp(1.8rem, 5.5vw, 4.2rem)",
                  letterSpacing: "-0.02em",
                  opacity: 0.55,
                  marginLeft: "0.18em",
                }}
              >
                '26
              </span>
            </h1>
            <p className="font-display text-lg md:text-xl text-muted-foreground font-light italic max-w-xl leading-relaxed">
              Where the Alchemist meets the Engineer.
            </p>
          </div>

          {/* scroll indicator */}
          <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2">
            <span className="font-ui text-muted-foreground text-xs">
              Scroll
            </span>
            <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
              <div
                className="w-full h-4 bg-primary absolute top-0"
                style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>

        {/* ── vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 15,
            background:
              "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 2% / 0.7) 100%)",
          }}
        />
      </div>
    </div>
  );
}
