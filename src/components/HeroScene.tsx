"use client";

import { useRef, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FluidImagePlane from "./FluidImagePlane";
import { CanvasText } from "@/components/ui/canvas-text";

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
          style={{
            transform: "translateX(25%)",
            WebkitMaskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.35) 20%, rgba(0,0,0,0.85) 45%, black 70%)",
            maskImage:
              "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.35) 20%, rgba(0,0,0,0.85) 45%, black 70%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
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
          className="hero-text absolute left-0 top-1/2 z-20 p-8 md:p-16 w-1/2"
          style={{ transform: "translateY(-235%) translateX(10%)" }}
        >
          <div
            className="flex flex-col"
            style={{
              fontSize: "clamp(4rem, 8vw, 6rem)",
              letterSpacing: "-0.03em",
              fontFamily: '"Redotic", "Cinzel", serif',
            }}
          >
            <CanvasText
              text="PRODYOGIKI"
              className="font-bold italic leading-none"
              colors={[
                "#D4A853",
                "#C2956B",
                "#E8C987",
                "#B87A4E",
                "#F0DFA8",
                "#A0714F",
              ]}
              animationDuration={8}
              lineGap={6}
              curveIntensity={50}
              glyphThickness={4}
            />
            <span
              className="font-light italic leading-none"
              style={{
                display: "block",
                position: "relative",
                top: "-0.35em",
                marginLeft: "9.5em",
                fontSize: "0.64em",
                letterSpacing: "0.08em",
                color: "#D4A853",
              }}
            >
              - 2026
            </span>
          </div>
        </div>
      </div>

      <style>{`
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
