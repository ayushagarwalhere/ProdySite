"use client";

import { useRef, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FluidImagePlane from "./FluidImagePlane";
import HomePageCursor from "./HomePageCursor";
import { CanvasText } from "./CanvasText";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

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

  return (
    <div ref={containerRef} className="relative h-screen">
      {/*<HomePageCursor containerRef={heroRef} />*/}
      <div
        ref={heroRef}
        className="hero-shell h-screen w-full overflow-hidden flex items-center cursor-none"
      >
        {/* ── canvas ── */}
        <div
          className="hero-canvas absolute inset-0 z-10 w-full h-full"
          style={{ transform: "translateX(25%)" }}
        >
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
        <div
          className="hero-text relative z-12 p-8 md:p-16 w-1/2"
          style={{
            transform: "translateX(-15%) translateY(-395%)",
          }}
        >
          <h1
            className="font-display font-light italic leading-none"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              letterSpacing: "-0.03em",
              fontFamily: '"Redotic", "Cinzel", serif',
            }}
          >
            <CanvasText
              text="PRODYOGIKI - 2026"
              textColor="rgb(212, 175, 55)"
              colors={[
                "rgba(232, 213, 183, 1)",
                "rgba(232, 213, 183, 0.96)",
                "rgba(232, 213, 183, 0.92)",
                "rgba(232, 213, 183, 0.88)",
                "rgba(232, 213, 183, 0.84)",
                "rgba(232, 213, 183, 0.78)",
                "rgba(232, 213, 183, 0.72)",
                "rgba(232, 213, 183, 0.66)",
                "rgba(232, 213, 183, 0.58)",
                "rgba(232, 213, 183, 0.48)",
              ]}
              lineGap={6}
              animationDuration={10}
              className="font-display font-light italic"
            />
          </h1>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-shell {
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
          }

          .hero-canvas {
            position: relative !important;
            inset: auto !important;
            width: 100%;
            height: 58vh;
            transform: none !important;
            flex-shrink: 0;
          }

          .hero-text {
            width: 100%;
            min-height: 42vh;
            transform: none !important;
            padding: 20px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
