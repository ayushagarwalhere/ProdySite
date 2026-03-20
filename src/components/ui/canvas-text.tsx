"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface CanvasTextProps {
  text: string;
  className?: string;
  colors?: string[];
  animationDuration?: number;
  lineWidth?: number;
  lineGap?: number;
  curveIntensity?: number;
  glyphThickness?: number;
  overlay?: boolean;
}

function resolveColor(color: string): string {
  if (color.startsWith("var(")) {
    const varName = color.slice(4, -1).trim();
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    return resolved || color;
  }
  return color;
}

export function CanvasText({
  text,
  className = "",
  colors = ["#D4A853", "#C2956B", "#E8C987", "#B87A4E", "#F0DFA8", "#A0714F"],
  animationDuration = 8,
  lineWidth = 2,
  lineGap = 6,
  curveIntensity = 50,
  glyphThickness = 1,
  overlay = false,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [resolvedColors, setResolvedColors] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [font, setFont] = useState("");

  // resolve CSS var() colors
  const updateColors = useCallback(() => {
    setResolvedColors(colors.map(resolveColor));
  }, [colors]);

  useEffect(() => {
    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [updateColors]);

  // measure the invisible text span for canvas dimensions
  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const update = () => {
      const rect = textEl.getBoundingClientRect();
      const computed = window.getComputedStyle(textEl);
      setDimensions({
        width: Math.ceil(rect.width) || 400,
        height: Math.ceil(rect.height) || 200,
      });
      setFont(
        `${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`,
      );
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(textEl);
    return () => ro.disconnect();
  }, [text, className]);

  // animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      resolvedColors.length === 0 ||
      dimensions.width === 0 ||
      !font
    )
      return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const { width, height } = dimensions;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.font = font;
    const metrics = ctx.measureText(text);
    const ascent = metrics.actualBoundingBoxAscent;
    const descent = metrics.actualBoundingBoxDescent;
    const baselineY = (height + ascent - descent) / 2;
    const numLines = Math.floor(height / lineGap) + 10;

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTimeRef.current) / 1000;
      const phase = (elapsed / animationDuration) * Math.PI * 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // step 1 — paint text as opaque white shape (clipping base)
      ctx.globalCompositeOperation = "source-over";
      ctx.font = font;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";
      const thickness = Math.max(1, Math.round(glyphThickness));
      const half = (thickness - 1) / 2;
      for (let offsetX = -half; offsetX <= half; offsetX += 1) {
        ctx.fillText(text, offsetX, baselineY);
      }

      // step 2 — paint colored lines, clipped to white text shape
      ctx.globalCompositeOperation = "source-atop";
      for (let i = 0; i < numLines; i++) {
        const y = i * lineGap;
        const curve1 = Math.sin(phase + i * 0.07) * curveIntensity;
        const curve2 = Math.sin(phase + i * 0.07 + 0.5) * curveIntensity * 0.6;
        ctx.strokeStyle = resolvedColors[i % resolvedColors.length];
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
          width * 0.33,
          y + curve1,
          width * 0.66,
          y + curve2,
          width,
          y,
        );
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [
    text,
    font,
    resolvedColors,
    animationDuration,
    lineWidth,
    lineGap,
    curveIntensity,
    glyphThickness,
    dimensions,
  ]);

  return (
    <span
      className={cn(
        "relative inline-block",
        overlay && "absolute inset-0",
        className,
      )}
    >
      {/* hidden span — only for measuring font size & dimensions */}
      <span
        ref={textRef}
        aria-hidden="true"
        style={{
          visibility: "hidden",
          position: "absolute",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {text}
      </span>

      {/* accessible label for screen readers */}
      <span
        aria-hidden="false"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </span>

      {/* the actual visual canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: dimensions.width || "auto",
          height: dimensions.height || "auto",
        }}
        aria-label={text}
        role="img"
      />
    </span>
  );
}
