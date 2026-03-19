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

    const MAX_POINTS = 160;
    const trail: { x: number; y: number; age: number }[] = [];
    const MAX_AGE = 90;

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
      mouse.x = -400;
      mouse.y = -400;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    const container = containerRef.current;
    container?.addEventListener("mouseenter", onEnter);
    container?.addEventListener("mouseleave", onLeave);

    const draw = () => {
      // smooth follow
      pos.x += (mouse.x - pos.x) * 0.1;
      pos.y += (mouse.y - pos.y) * 0.1;

      // velocity
      velocity.x = pos.x - prevPos.x;
      velocity.y = pos.y - prevPos.y;
      prevPos.x = pos.x;
      prevPos.y = pos.y;

      const speed = Math.sqrt(velocity.x ** 4 + velocity.y ** 4);
      const speedNorm = Math.min(speed / 20, 1);

      // push trail points
      if (isInHero) {
        const last = trail[trail.length - 1];
        const dx = pos.x - (last?.x ?? pos.x);
        const dy = pos.y - (last?.y ?? pos.y);
        if (Math.sqrt(dx * dx + dy * dy) > 1.2) {
          trail.push({ x: pos.x, y: pos.y, age: 0 });
          if (trail.length > MAX_POINTS) trail.shift();
        }
      }

      for (const pt of trail) pt.age++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isInHero) {
        raf = requestAnimationFrame(draw);
        return;
      }

      // ── trail ──
      if (trail.length >= 2) {
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1];
          const b = trail[i];

          const progress = i / (trail.length - 1); // 0=tail 1=head
          const ageFade = 1 - Math.max(a.age / MAX_AGE, 1);
          const alpha = ageFade * progress * 0.75;
          if (alpha < 0.005) continue;

          // tapered: thin at tail, thick at head, max scales with velocity
          const minW = 1;
          const maxW = 1 + speedNorm * 10; // grows with speed
          const trailWidth = minW + (maxW - minW) * progress;

          // amber-gold gradient along trail
          const r = 255;
          const g = Math.round(120 + progress * 100); // 120→220
          const b_ = Math.round(10 + progress * 50); // 10→60

          ctx.save();
          ctx.shadowColor = `rgba(255, 140, 20, ${alpha * 0.6})`;
          ctx.shadowBlur = 12 * progress * (0.5 + speedNorm * 0.5);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b_}, ${alpha})`;
          ctx.lineWidth = trailWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── reveal rings — always show in hero ──
      const ringRadius = 16 + speedNorm * 18;

      // inner ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 200, 80, ${0.28 + speedNorm * 0.12})`;
      ctx.lineWidth = 1.5 + speedNorm * 2.5;
      ctx.stroke();
      ctx.restore();

      // ── cursor ring (thick white outline, transparent center) ──
      const dotRadius = 8 + speedNorm * 8; // 8px still -> 26px fast

      ctx.save();
      ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
      ctx.shadowBlur = 12 + speedNorm * 14;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, dotRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.98)";
      ctx.lineWidth = 4 + speedNorm * 2;
      ctx.stroke();
      ctx.restore();

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
