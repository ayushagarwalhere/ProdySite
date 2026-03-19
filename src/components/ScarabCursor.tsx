"use client";

import { useEffect, useRef } from "react";

export default function ScarabCursor() {
  const cursorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = prevCursor;
    };
  }, []);

  return (
    <svg
      ref={cursorRef}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        willChange: "transform",
      }}
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="rgba(231,186,128,0.08)"
        stroke="rgba(231,186,128,0.45)"
        strokeWidth="1"
      />
      <ellipse
        cx="16"
        cy="17"
        rx="5.5"
        ry="7.5"
        fill="#C9922A"
        stroke="#E7BA80"
        strokeWidth="0.7"
      />
      <line
        x1="10"
        y1="13"
        x2="5"
        y2="8"
        stroke="#E7BA80"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <line
        x1="22"
        y1="13"
        x2="27"
        y2="8"
        stroke="#E7BA80"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <line
        x1="10"
        y1="18"
        x2="5"
        y2="23"
        stroke="#E7BA80"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <line
        x1="22"
        y1="18"
        x2="27"
        y2="23"
        stroke="#E7BA80"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <circle
        cx="16"
        cy="9"
        r="2.8"
        fill="#E7BA80"
        stroke="#FAD98B"
        strokeWidth="0.5"
      />
      <line
        x1="14"
        y1="6.5"
        x2="10"
        y2="3"
        stroke="#E7BA80"
        strokeWidth="0.7"
      />
      <line
        x1="18"
        y1="6.5"
        x2="22"
        y2="3"
        stroke="#E7BA80"
        strokeWidth="0.7"
      />
      <circle cx="10" cy="3" r="1.2" fill="#FAD98B" />
      <circle cx="22" cy="3" r="1.2" fill="#FAD98B" />
      <line
        x1="16"
        y1="12"
        x2="16"
        y2="25"
        stroke="#FAD98B"
        strokeWidth="0.5"
        opacity="0.65"
      />
    </svg>
  );
}
