"use client";

import { useRef, useEffect } from "react";

interface HomePageCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HomePageCursor({ containerRef }: HomePageCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const mouse = { x: -400, y: -400 };
    const pos = { x: -400, y: -400 };
    let raf = 0;
    let isInHero = false;

    const MAX_POINTS = 120;
    const trail: { x: number; y: number; age: number }[] = [];

    const MAX_AGE = 60;
    const BASE_DOT_RADIUS = 5;
    const MAX_DOT_RADIUS = 18;
    const BASE_TRAIL_WIDTH = 3;
    const MAX_TRAIL_WIDTH = 14;

    let velocity = { x: 0, y: 0 };
    let prevPos = { x: -400, y: -400 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onEnter = () => {
      isInHero = true;
      document.body.style.cursor = "none";
    };

    const onLeave = () => {
      isInHero = false;
      document.body.style.cursor = "auto";
      // push mouse offscreen so trail fades naturally
      mouse.x = -400;
      mouse.y = -400;
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const container = containerRef.current;
    container?.addEventListener("mouseenter", onEnter);
    container?.addEventListener("mouseleave", onLeave);

    const draw = () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;

      velocity.x = pos.x - prevPos.x;
      velocity.y = pos.y - prevPos.y;
      prevPos.x = pos.x;
      prevPos.y = pos.y;

      const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
      const speedNorm = Math.min(speed / 20, 1);

      if (isInHero) {
        const last = trail[trail.length - 1];
        const dx = pos.x - (last?.x ?? pos.x);
        const dy = pos.y - (last?.y ?? pos.y);
        if (Math.sqrt(dx * dx + dy * dy) > 1.5) {
          trail.push({ x: pos.x, y: pos.y, age: 0 });
          if (trail.length > MAX_POINTS) trail.shift();
        }
      }

      for (const pt of trail) pt.age++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trail
      if (trail.length >= 2) {
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1];
          const b = trail[i];
          const progress = i / (trail.length - 1);
          const ageFade = 1 - Math.min(a.age / MAX_AGE, 1);
          const alpha = ageFade * progress * 0.85;
          if (alpha < 0.01) continue;

          const trailWidth =
            BASE_TRAIL_WIDTH +
            (MAX_TRAIL_WIDTH - BASE_TRAIL_WIDTH) * progress * speedNorm;

          const g = Math.round(170 + progress * 66);
          const b_ = Math.round(30 + progress * 90);

          ctx.save();
          ctx.shadowColor = `rgba(255,150,20,${alpha * 0.6})`;
          ctx.shadowBlur = 8 * progress;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,${g},${b_},${alpha})`;
          ctx.lineWidth = trailWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
          ctx.restore();
        }
      }

      // Cursor dot — only render inside hero
      if (isInHero) {
        const dotRadius =
          BASE_DOT_RADIUS + (MAX_DOT_RADIUS - BASE_DOT_RADIUS) * speedNorm;

        ctx.save();
        ctx.shadowColor = "rgba(255,200,80,0.9)";
        ctx.shadowBlur = 20 * (0.5 + speedNorm * 0.5);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,225,140,${0.85 - speedNorm * 0.2})`;
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, Math.min(dotRadius * 0.35, 4), 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      container?.removeEventListener("mouseenter", onEnter);
      container?.removeEventListener("mouseleave", onLeave);
      document.body.style.cursor = "auto";
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
      }}
    />
  );
}