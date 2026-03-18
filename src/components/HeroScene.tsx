"use client"

import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import FluidImagePlane from './FluidImagePlane';
import CustomCursor from './CustomCursor';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    scrollProgress.current = Math.max(0, Math.min(1, -rect.top / total));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  return (
    <>
      <CustomCursor x={cursorPos.x} y={cursorPos.y} />
      <div ref={containerRef} className="relative h-[200vh] z-[99999]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

          {/* canvas */}
          <div className="absolute inset-0 z-10 w-full h-full">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
              style={{ width: '100vw', height: '100vh' }}
              className="w-screen h-screen"
            >
              <Suspense fallback={null}>
                <FluidImagePlane scrollProgress={scrollProgress} />
              </Suspense>
            </Canvas>
          </div>

          {/* text block — bottom left, same layout as original */}
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-8 md:p-16">
            <div className="max-w-3xl">

              {/* overline — theme name */}
              <p className="font-ui text-muted-foreground mb-4 tracking-widest text-xs uppercase">
                Alchemy of Innovation
              </p>

              {/* title */}
              <h1
                className="font-display font-light italic text-foreground leading-none mb-5"
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', letterSpacing: '-0.03em' }}
              >
                Prodyogiki
                <span
                  className="font-display font-light not-italic"
                  style={{
                    fontSize: 'clamp(1.8rem, 5.5vw, 4.2rem)',
                    letterSpacing: '-0.02em',
                    opacity: 0.55,
                    marginLeft: '0.18em',
                  }}
                >
                  '26
                </span>
              </h1>

              {/* slogan */}
              <p className="font-display text-lg md:text-xl text-muted-foreground font-light italic max-w-xl leading-relaxed">
                Where the Alchemist meets the Engineer.
              </p>

            </div>

            {/* scroll indicator — bottom right */}
            <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2">
              <span className="font-ui text-muted-foreground text-xs">Scroll</span>
              <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
                <div
                  className="w-full h-4 bg-primary absolute top-0"
                  style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>

          {/* vignette */}
          <div
            className="absolute inset-0 z-[15] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 2% / 0.7) 100%)',
            }}
          />

        </div>
      </div>
    </>
  );
}