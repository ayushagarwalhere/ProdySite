"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CanvasTextProps {
  text: string;
  /** Base CSS colour for the text before shimmer lines are applied */
  textColor?: string;
  /** Canvas ctx.font string — if omitted, fills ~78% of container height */
  font?: string;
  /** Ordered rgba colours cycling top→bottom across the text */
  colors?: string[];
  /** Height in px of each shimmer stripe */
  lineGap?: number;
  /** Seconds for one full vertical cycle */
  animationDuration?: number;
  className?: string;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_COLORS = [
  "rgba(255, 255, 255, 1.00)",
  "rgba(255, 255, 255, 0.88)",
  "rgba(255, 255, 255, 0.75)",
  "rgba(255, 255, 255, 0.60)",
  "rgba(255, 255, 255, 0.45)",
  "rgba(255, 255, 255, 0.30)",
  "rgba(255, 255, 255, 0.18)",
  "rgba(255, 255, 255, 0.08)",
  "rgba(255, 255, 255, 0.03)",
  "rgba(255, 255, 255, 0.01)",
];

// ─── Component ────────────────────────────────────────────────────────────────

export function CanvasText({
  text,
  textColor = "white",
  font,
  colors = DEFAULT_COLORS,
  lineGap = 5,
  animationDuration = 18,
  className,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const hoverTargetRef = useRef(0);
  const hoverMixRef = useRef(0);

  // ── Draw loop ───────────────────────────────────────────────────────────────
  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000; // seconds

      const dpr = window.devicePixelRatio || 1;
      // Work in CSS-pixel space (canvas is pre-scaled by dpr in resize)
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      // 1. Paint the text solid — this becomes the alpha mask
      ctx.globalCompositeOperation = "source-over";
      const inheritedFont = containerRef.current
        ? getComputedStyle(containerRef.current).font
        : "";
      ctx.font = font ?? inheritedFont ?? `700 ${h * 0.78}px sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = textColor;
      ctx.fillText(text, w / 2, h / 2);

      // Smooth hover interpolation for outline reveal.
      hoverMixRef.current +=
        (hoverTargetRef.current - hoverMixRef.current) * 0.14;
      const outlineMix = hoverMixRef.current;

      // 2. Overlay animated diagonal stripes, clipped to existing text pixels only
      const totalLines = colors.length;
      const stripeH = 2.5;
      const stripeStep = stripeH + 1;

      ctx.globalCompositeOperation = "source-atop";

      // Draw in a rotated space so stripes travel diagonally across glyphs.
      const angle = -Math.PI / 7;
      const span = Math.hypot(w, h) * 2;
      const halfSpan = span / 2;
      const waveAmplitude = Math.max(1.5, stripeH * 1.8);
      const waveLength = Math.max(90, span * 0.24);
      const phase =
        (elapsed * (Math.PI * 2)) / Math.max(0.1, animationDuration / 2);
      const sampleStep = 14;

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(angle);

      for (
        let i = -totalLines * 2;
        i < Math.ceil(span / stripeStep) + totalLines * 2;
        i++
      ) {
        const yBase = -halfSpan + i * stripeStep;
        const ci = ((i % totalLines) + totalLines) % totalLines;
        ctx.strokeStyle = colors[ci];
        ctx.lineWidth = stripeH;
        ctx.lineCap = "round";
        ctx.beginPath();

        let started = false;
        for (let x = -halfSpan; x <= halfSpan; x += sampleStep) {
          const y =
            yBase + Math.sin(x / waveLength + phase + i * 0.42) * waveAmplitude;
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      ctx.restore();

      // 3. Hover outline pass
      if (outlineMix > 0.01) {
        ctx.globalCompositeOperation = "source-over";
        ctx.lineJoin = "round";
        ctx.miterLimit = 2;
        ctx.strokeStyle = `rgba(74,52,18,${0.22 + outlineMix * 0.76})`;
        ctx.lineWidth = 0.8 + outlineMix * 2.4;
        ctx.strokeText(text, w / 2, h / 2);
      }

      // Reset
      ctx.globalCompositeOperation = "source-over";

      rafRef.current = requestAnimationFrame(draw);
    },
    [text, textColor, font, colors, lineGap, animationDuration],
  );

  // ── Resize handler ──────────────────────────────────────────────────────────
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before re-scaling

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (ctx) ctx.scale(dpr, dpr);

    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    resize();
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [resize]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <span
      ref={containerRef}
      // `inline-block` so width/height are measurable; no background
      className={cn("relative inline-block leading-none", className)}
      aria-label={text}
      onMouseEnter={() => {
        hoverTargetRef.current = 1;
      }}
      onMouseLeave={() => {
        hoverTargetRef.current = 0;
      }}
    >
      {/*
       * Invisible clone drives the container size and inherits
       * the parent h1's font-size / font-family automatically.
       */}
      <span
        className="whitespace-nowrap"
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity: 0,
          color: "transparent",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {text}
      </span>

      {/* Canvas overlays exactly the text bounding box */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />
    </span>
  );
}
