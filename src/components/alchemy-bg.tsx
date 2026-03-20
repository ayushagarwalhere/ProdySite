// components/ui/alchemy-bg.tsx
"use client";
import { useEffect, useRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AlchemyBgProps {
  className?: string;
  children?: React.ReactNode;
  tileSize?: number;
}

export const AlchemyBg = forwardRef<HTMLDivElement, AlchemyBgProps>(
  ({ className, children, tileSize = 90 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;

      const draw = () => {
        const W = canvas.offsetWidth;
        const H = canvas.offsetHeight;
        canvas.width = W * devicePixelRatio;
        canvas.height = H * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);

        const S = tileSize;
        ctx.fillStyle = "#0a0a14";
        ctx.fillRect(0, 0, W, H);

        const cols = Math.ceil(W / S) + 1;
        const rows = Math.ceil(H / S) + 1;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = c * S, y = r * S;
            const cx = x + S / 2, cy = y + S / 2;

            const face = (pts: number[][], color: string) => {
              ctx.beginPath();
              ctx.moveTo(pts[0][0], pts[0][1]);
              pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
              ctx.closePath();
              ctx.fillStyle = color;
              ctx.fill();
            };

            face([[x,y],[cx,y],[cx,cy]],         "rgba(99,102,241,0.18)");
            face([[cx,y],[x+S,y],[cx,cy]],        "rgba(236,72,153,0.13)");
            face([[x,y],[cx,cy],[x,y+S]],         "rgba(6,182,212,0.10)");
            face([[x+S,y],[x+S,y+S],[cx,cy]],     "rgba(251,191,36,0.12)");
            face([[x,y+S],[cx,cy],[x+S,y+S]],     "rgba(167,139,250,0.15)");

            ctx.strokeStyle = "rgba(139,92,246,0.22)";
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, S, S);

            ctx.strokeStyle = "rgba(99,102,241,0.10)";
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            [[cx,y],[x,y],[x+S,y],[x,y+S],[x+S,y+S]].forEach(p => {
              ctx.moveTo(p[0], p[1]); ctx.lineTo(cx, cy);
            });
            ctx.stroke();
          }
        }

        ctx.fillStyle = "rgba(8,8,18,0.55)";
        ctx.fillRect(0, 0, W, H);
      };

      draw();
      const ro = new ResizeObserver(draw);
      ro.observe(canvas);
      return () => ro.disconnect();
    }, [tileSize]);

    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

AlchemyBg.displayName = "AlchemyBg";
