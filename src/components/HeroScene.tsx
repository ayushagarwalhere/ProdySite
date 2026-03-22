"use client";

import { useRef, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FluidImagePlane from "./FluidImagePlane";

export default function HeroScene() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const ticking        = useRef(false);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect  = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total > 0) {
        scrollProgress.current = Math.max(0, Math.min(1, -rect.top / total));
      }
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <style>{`
        /*
          Container is only 120vh — just enough extra height to give
          scroll-progress something to measure, but not so tall that
          there's a huge dead zone before the About section.
          On mobile 100vh (no scroll parallax needed, saves space).
        */
        .hero-container {
          position: relative;
          width: 100%;
          height: 120vh;
        }
        @media (max-width: 640px) {
          .hero-container { height: 100vh; }
        }

        .hero-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          cursor: none;
        }
        @supports (-webkit-touch-callout: none) {
          .hero-sticky { height: -webkit-fill-available; }
        }

        .hero-canvas-wrap {
          position: absolute;
          inset: 0;
          z-index: 10;
        }

        /* four-way vignette — dissolves image edges into #080400 */
        .hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          background:
            linear-gradient(
              to bottom,
              #080400 0%,
              transparent 22%,
              transparent 78%,
              #080400 100%
            ),
            linear-gradient(
              to right,
              #080400 0%,
              transparent 18%,
              transparent 82%,
              #080400 100%
            );
        }

        /* filmic grain over the blend zone */
        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 21;
          pointer-events: none;
          opacity: 0.055;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
          background-size: 260px 260px;
        }

        .hero-title-wrap {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          pointer-events: none;
          z-index: 30;
          width: 100%;
          padding: 0 16px;
          bottom: 18vh;
        }

        .hero-title {
          font-family: 'Cinzel Decorative', serif;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #E7BA80;
          text-shadow:
            0 0 60px rgba(231,186,128,0.45),
            0 0 120px rgba(231,186,128,0.18);
          white-space: nowrap;
          font-size: clamp(1.6rem, 7vw, 6rem);
          line-height: 1.1;
        }

        .hero-subtitle {
          margin-top: 10px;
          font-family: 'Cinzel', serif;
          font-size: clamp(0.55rem, 1.5vw, 0.85rem);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(231,186,128,0.5);
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .hero-title-wrap { bottom: 12vh; }
          .hero-title {
            /* keep on one line — scale down until it fits */
            white-space: nowrap;
            font-size: clamp(1rem, 7.5vw, 2.4rem);
            letter-spacing: 0.03em;
          }
          .hero-subtitle {
            font-size: clamp(0.5rem, 2.5vw, 0.75rem);
            letter-spacing: 0.2em;
          }
          .hero-vignette {
            background:
              linear-gradient(
                to bottom,
                #080400 0%,
                transparent 18%,
                transparent 72%,
                #080400 100%
              ),
              linear-gradient(
                to right,
                #080400 0%,
                transparent 12%,
                transparent 88%,
                #080400 100%
              );
          }
        }
      `}</style>

      <div ref={containerRef} className="hero-container">
        <div className="hero-sticky">

          <div className="hero-canvas-wrap">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
              dpr={[1, 1.5]}
              style={{ width: "100%", height: "100%", background: "transparent" }}
            >
              <Suspense fallback={null}>
                <FluidImagePlane scrollProgress={scrollProgress} />
              </Suspense>
            </Canvas>
          </div>

          <div className="hero-vignette" aria-hidden />
          <div className="hero-grain"    aria-hidden />

          <div className="hero-title-wrap">
            <h1 className="hero-title">PRODYOGIKI&apos;26</h1>
          </div>

        </div>
      </div>
    </>
  );
}