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
      <div ref={containerRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-10">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <FluidImagePlane scrollProgress={scrollProgress} />
              </Suspense>
            </Canvas>
          </div>

          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-8 md:p-16">
            <div className="max-w-3xl">
              <p className="font-ui text-muted-foreground mb-4 tracking-widest">
                Interactive Exploration
              </p>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light italic text-foreground tracking-tight leading-none mb-6"
                style={{ letterSpacing: '-0.03em' }}>
                The Eternal Gaze.
              </h1>
              <p className="font-display text-lg md:text-xl text-muted-foreground font-light italic max-w-xl leading-relaxed">
                An interactive exploration of 18th Dynasty artifacts through the lens
                of modern generative fluid dynamics.
              </p>
            </div>

            <div className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2">
              <span className="font-ui text-muted-foreground text-xs">Scroll</span>
              <div className="w-px h-12 bg-muted-foreground/30 relative overflow-hidden">
                <div className="w-full h-4 bg-primary absolute top-0"
                  style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-[15] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 2% / 0.7) 100%)',
            }}
          />
        </div>
      </div>
    </>
  );
}
