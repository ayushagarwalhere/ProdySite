"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    document.body.style.cursor = "none";

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let prevX = 0;
    let prevY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      // Smooth lerp follow — ease-in-out feel, no snapping
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const dx = currentX - prevX;
      const dy = currentY - prevY;

      // Only rotate if meaningful movement to avoid jitter
      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 45;

        // Smooth angle lerp — no sharp turns
        let delta = targetAngle - angleRef.current;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        angleRef.current += delta * 0.06;
      }

      gsap.set(cursor, {
        x: currentX - 20,
        y: currentY - 20,
        rotation: angleRef.current,
      });

      prevX = currentX;
      prevY = currentY;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10"
      style={{ transform: "translate(-9999px, -9999px)" }}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Fuselage — thin elongated body */}
        <path
          d="M20 3 C18.5 3 17.5 5 17.5 7 L16.5 26 C16.5 28.5 18 30.5 20 31.5 C22 30.5 23.5 28.5 23.5 26 L22.5 7 C22.5 5 21.5 3 20 3Z"
          stroke="#000"
          strokeWidth="1.3"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Left main wing */}
        <path
          d="M17.5 15 C13 12.5 5 14 3.5 18.5 C5 20 9.5 19 17.5 18.5"
          stroke="#000"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right main wing */}
        <path
          d="M22.5 15 C27 12.5 35 14 36.5 18.5 C35 20 30.5 19 22.5 18.5"
          stroke="#000"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Left tail fin */}
        <path
          d="M17.5 25.5 C14 25 11 28.5 11.5 31 C13.5 29.5 16.5 28.5 17.5 27.5"
          stroke="#000"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right tail fin */}
        <path
          d="M22.5 25.5 C26 25 29 28.5 28.5 31 C26.5 29.5 23.5 28.5 22.5 27.5"
          stroke="#000"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
