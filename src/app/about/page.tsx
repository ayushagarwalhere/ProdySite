"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   EGYPTIAN BACKGROUND COMPONENTS
───────────────────────────────────────────────────────────────────────────── */

function HieroglyphStrip({ offset = 0 }: { offset?: number }) {
  return (
    <>
      <g transform="translate(4,0)">
        <ellipse cx="14" cy="8" rx="10" ry="6" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="8" r="2.5" fill="#E7BA80" />
        <path d="M4 11 Q8 16 14 14 Q20 16 24 11" stroke="#E7BA80" strokeWidth="1" fill="none" />
        <path d="M14 14 L12 20" stroke="#E7BA80" strokeWidth="1" />
        <path d="M14 14 L16 20" stroke="#E7BA80" strokeWidth="1" />
      </g>
      <g transform="translate(8,35)">
        <ellipse cx="10" cy="6" rx="5" ry="4" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <line x1="10" y1="10" x2="10" y2="26" stroke="#E7BA80" strokeWidth="1.2" />
        <line x1="4" y1="16" x2="16" y2="16" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      <g transform="translate(6,70)">
        <rect x="6" y="0" width="12" height="2" fill="#E7BA80" rx="1" />
        <rect x="5" y="4" width="14" height="2" fill="#E7BA80" rx="1" />
        <rect x="4" y="8" width="16" height="2" fill="#E7BA80" rx="1" />
        <rect x="3" y="12" width="18" height="2" fill="#E7BA80" rx="1" />
        <rect x="5" y="16" width="14" height="8" fill="none" stroke="#E7BA80" strokeWidth="1" />
      </g>
      <g transform="translate(10,105)">
        <line x1="9" y1="0" x2="9" y2="28" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M4 4 Q9 0 14 4" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <path d="M7 28 L4 34 M11 28 L14 34" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      <g transform="translate(6,182)">
        <circle cx="12" cy="12" r="7" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="12" cy="12" r="3" fill="#E7BA80" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <line key={i}
            x1={12 + 8 * Math.cos((a * Math.PI) / 180)}
            y1={12 + 8 * Math.sin((a * Math.PI) / 180)}
            x2={12 + 11 * Math.cos((a * Math.PI) / 180)}
            y2={12 + 11 * Math.sin((a * Math.PI) / 180)}
            stroke="#E7BA80" strokeWidth="1" />
        ))}
      </g>
      <g transform="translate(5,260)">
        <path d="M14 0 Q20 4 18 10 Q16 16 10 16 Q4 16 4 10 Q4 4 10 4 Q14 4 14 8 Q14 12 10 12"
          stroke="#E7BA80" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M10 12 L10 28" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      <g transform="translate(4,300)">
        <path d="M14 24 Q14 12 14 8" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M14 8 Q10 0 6 4 Q8 10 14 12" fill="#E7BA80" opacity="0.7" />
        <path d="M14 8 Q18 0 22 4 Q20 10 14 12" fill="#E7BA80" opacity="0.7" />
        <path d="M14 10 Q12 3 14 0 Q16 3 14 10" fill="#E7BA80" />
        <line x1="8" y1="24" x2="20" y2="24" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      <g transform={`translate(4,${380 + offset})`}>
        <ellipse cx="14" cy="8" rx="10" ry="6" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="8" r="2.5" fill="#E7BA80" />
        <path d="M4 11 Q8 16 14 14 Q20 16 24 11" stroke="#E7BA80" strokeWidth="1" fill="none" />
      </g>
      <g transform="translate(4,430)">
        <path d="M6 24 Q4 18 6 12 Q8 4 14 4 Q20 4 22 12 Q24 18 22 24 Z"
          stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="11" cy="12" r="2" fill="#E7BA80" />
        <circle cx="17" cy="12" r="2" fill="#E7BA80" />
        <path d="M6 6 L3 2 M22 6 L25 2" stroke="#E7BA80" strokeWidth="1" />
      </g>
      <g transform="translate(2,500)">
        <path d="M14 2 L28 28 L0 28 Z" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <line x1="14" y1="10" x2="22" y2="28" stroke="#E7BA80" strokeWidth="0.6" opacity="0.5" />
        <line x1="14" y1="10" x2="6" y2="28" stroke="#E7BA80" strokeWidth="0.6" opacity="0.5" />
      </g>
      <g transform="translate(4,580)">
        <path d="M4 20 Q2 8 10 4 Q8 12 14 14 Q20 12 18 4 Q26 8 24 20"
          stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="24" r="4" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
      </g>
      <g transform="translate(4,668)">
        <path d="M14 4 Q20 6 22 14 Q18 12 14 14 Q10 12 6 14 Q8 6 14 4 Z" fill="#E7BA80" />
        <circle cx="20" cy="8" r="1.5" fill="#E7BA80" />
        <path d="M14 14 L14 28" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      <g transform="translate(0,760)">
        <line x1="4" y1="0" x2="32" y2="0" stroke="#E7BA80" strokeWidth="0.8" />
        <circle cx="18" cy="0" r="2" fill="#E7BA80" />
        <circle cx="8" cy="0" r="1" fill="#E7BA80" />
        <circle cx="28" cy="0" r="1" fill="#E7BA80" />
      </g>
    </>
  );
}

function TopBorder() {
  return (
    <>
      <line x1="0" y1="30" x2="10000" y2="30" stroke="#E7BA80" strokeWidth="0.8" />
      <line x1="0" y1="34" x2="10000" y2="34" stroke="#E7BA80" strokeWidth="0.4" />
      {Array.from({ length: 120 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 80 + 8}, 0)`}>
          <path d="M20 28 L20 16 Q16 8 12 10 Q10 16 20 18" fill="#E7BA80" opacity="0.6" />
          <path d="M20 28 L20 16 Q24 8 28 10 Q30 16 20 18" fill="#E7BA80" opacity="0.6" />
          <path d="M20 28 L20 12 Q19 6 20 4 Q21 6 20 12" fill="#E7BA80" opacity="0.8" />
          <path d="M2 28 L8 20 L2 12" stroke="#E7BA80" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M38 28 L32 20 L38 12" stroke="#E7BA80" strokeWidth="0.8" fill="none" opacity="0.5" />
          <circle cx="2" cy="6" r="1" fill="#E7BA80" opacity="0.4" />
          <circle cx="38" cy="6" r="1" fill="#E7BA80" opacity="0.4" />
        </g>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─────────────────────────────────────────────────────────────────────────────
   FLOATING GLOW CARD
───────────────────────────────────────────────────────────────────────────── */
function FloatingCard({
  image, title, subtitle, delay = 0, floatOffset = "0px",
}: {
  image: string; title: string; subtitle: string; delay?: number; floatOffset?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "4px",
        overflow: "hidden",
        cursor: "default",
        animationName: "floatCard",
        animationDuration: "5s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDelay: delay + "s",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hovered
          ? "0 0 40px rgba(231,186,128,0.45), 0 0 80px rgba(231,186,128,0.15), inset 0 0 30px rgba(231,186,128,0.05)"
          : "0 0 20px rgba(231,186,128,0.12), 0 8px 32px rgba(0,0,0,0.6)",
      }}
    >
      {/* image */}
      <img
        src={image}
        alt={title}
        style={{ width: "100%", height: "260px", objectFit: "cover", display: "block", filter: "brightness(0.75) sepia(0.15)" }}
      />

      {/* golden corner ornaments */}
      {[
        { top: 0, left: 0, borderTop: "2px solid #E7BA80", borderLeft: "2px solid #E7BA80" },
        { top: 0, right: 0, borderTop: "2px solid #E7BA80", borderRight: "2px solid #E7BA80" },
        { bottom: 0, left: 0, borderBottom: "2px solid #E7BA80", borderLeft: "2px solid #E7BA80" },
        { bottom: 0, right: 0, borderBottom: "2px solid #E7BA80", borderRight: "2px solid #E7BA80" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: "18px", height: "18px", ...s, opacity: 0.7 }} />
      ))}

      {/* gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,5,0,0.92) 0%, rgba(10,5,0,0.4) 50%, transparent 100%)",
      }} />

      {/* glow border */}
      <div style={{
        position: "absolute", inset: 0,
        border: hovered ? "1px solid rgba(231,186,128,0.55)" : "1px solid rgba(231,186,128,0.18)",
        borderRadius: "4px",
        transition: "border-color 0.4s",
        pointerEvents: "none",
      }} />

      {/* text */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
        <div style={{
          fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(231,186,128,0.6)", fontFamily: "'Cinzel',serif", marginBottom: "5px",
        }}>{subtitle}</div>
        <div style={{
          fontSize: "15px", fontWeight: 700, color: "#E7BA80",
          fontFamily: "'Cinzel',serif", letterSpacing: "0.04em",
        }}>{title}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────────────────────────────────────── */
function StatCard({ value, label, icon, delay }: { value: string; label: string; icon: string; delay: number }) {
  const { ref, visible } = useScrollReveal(0.2);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        background: "rgba(15,8,0,0.75)",
        border: hovered ? "1px solid rgba(231,186,128,0.6)" : "1px solid rgba(231,186,128,0.2)",
        borderRadius: "4px",
        padding: "28px 24px",
        textAlign: "center",
        backdropFilter: "blur(8px)",
        boxShadow: hovered ? "0 0 30px rgba(231,186,128,0.2), 0 0 60px rgba(231,186,128,0.06)" : "none",
        cursor: "default",
        transition2: "box-shadow 0.4s ease, border-color 0.4s ease",
      } as React.CSSProperties}
    >
      <div style={{ fontSize: "28px", marginBottom: "10px" }}>{icon}</div>
      <div style={{
        fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700,
        color: "#E7BA80", fontFamily: "'Cinzel Decorative','Cinzel',serif",
        lineHeight: 1, marginBottom: "8px",
        textShadow: hovered ? "0 0 30px rgba(231,186,128,0.5)" : "none",
        transition: "text-shadow 0.4s",
      }}>{value}</div>
      <div style={{
        fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase",
        color: "rgba(231,186,128,0.5)", fontFamily: "'Cinzel',serif",
      }}>{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PILLAR CARD (what we do)
───────────────────────────────────────────────────────────────────────────── */
function PillarCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const { ref, visible } = useScrollReveal(0.15);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        background: "rgba(15,8,0,0.72)",
        border: hovered ? "1px solid rgba(231,186,128,0.55)" : "1px solid rgba(231,186,128,0.15)",
        borderTop: hovered ? "2px solid #E7BA80" : "2px solid rgba(231,186,128,0.4)",
        borderRadius: "4px",
        padding: "30px 26px",
        backdropFilter: "blur(8px)",
        boxShadow: hovered ? "0 0 40px rgba(231,186,128,0.18), 0 20px 60px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.4)",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "16px" }}>{icon}</div>
      <h3 style={{
        margin: "0 0 12px", fontSize: "15px", fontWeight: 700,
        color: "#E7BA80", fontFamily: "'Cinzel',serif", letterSpacing: "0.05em",
      }}>{title}</h3>
      <p style={{
        margin: 0, fontSize: "13px", lineHeight: 1.7,
        color: "rgba(231,186,128,0.55)", fontFamily: "'Open Sans',sans-serif",
      }}>{desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION HEADING
───────────────────────────────────────────────────────────────────────────── */
function SectionHeading({ overline, title, glyph = "𓇳" }: { overline: string; title: string; glyph?: string }) {
  const { ref, visible } = useScrollReveal(0.2);
  return (
    <div ref={ref} style={{
      textAlign: "center", marginBottom: "56px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <p style={{
        margin: "0 0 10px", fontSize: "10px", letterSpacing: "0.4em",
        textTransform: "uppercase", color: "rgba(231,186,128,0.45)",
        fontFamily: "'Cinzel',serif",
      }}>{overline}</p>
      <h2 style={{
        margin: "0 0 14px", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 700,
        color: "#E7BA80", fontFamily: "'Cinzel Decorative','Cinzel',serif",
        letterSpacing: "0.05em", textShadow: "0 0 50px rgba(231,186,128,0.25)",
      }}>{title}</h2>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #E7BA80)" }} />
        <span style={{ fontSize: "18px" }}>{glyph}</span>
        <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #E7BA80)" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function AboutISTEPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* gold dust particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.3, dx: (Math.random() - 0.5) * 0.22,
      dy: -Math.random() * 0.45 - 0.1, alpha: Math.random() * 0.5 + 0.1,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231,186,128,${p.alpha})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  /* hero text reveal state */
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{ minHeight: "100vh", width: "100%", color: "white", position: "relative", overflowX: "hidden" }}>

      {/* ══════════════════════════ EGYPTIAN BG ══════════════════════════ */}

      {/* Layer 1 — base gradient */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 130% 80% at 50% -10%, #1e0f00 0%, #0d0700 50%, #000 100%)" }} />

      {/* Layer 2 — papyrus noise */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.55,
        mixBlendMode: "overlay" as React.CSSProperties["mixBlendMode"],
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
      }} />

      {/* Layer 3 — scan lines */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(180,120,40,0.025) 3px,rgba(180,120,40,0.025) 4px)" }} />

      {/* Layer 4L — left hieroglyph column */}
      <div aria-hidden style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 3, pointerEvents: "none", opacity: 0.32, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
        <div style={{ position: "absolute", right: "14px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent)" }} />
        <svg width="36" viewBox="0 0 36 820" fill="none" xmlns="http://www.w3.org/2000/svg"><HieroglyphStrip /></svg>
      </div>

      {/* Layer 4R — right hieroglyph column */}
      <div aria-hidden style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 3, pointerEvents: "none", opacity: 0.32, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px", transform: "scaleX(-1)" }}>
        <div style={{ position: "absolute", right: "14px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent)" }} />
        <svg width="36" viewBox="0 0 36 820" fill="none" xmlns="http://www.w3.org/2000/svg"><HieroglyphStrip offset={14} /></svg>
      </div>

      {/* Layer 5T — top lotus border */}
      <div aria-hidden style={{ position: "fixed", top: 0, left: 0, right: 0, height: "36px", zIndex: 4, pointerEvents: "none", opacity: 0.45 }}>
        <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><TopBorder /></svg>
      </div>

      {/* Layer 5B — bottom lotus border */}
      <div aria-hidden style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "36px", zIndex: 4, pointerEvents: "none", opacity: 0.45, transform: "scaleY(-1)" }}>
        <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><TopBorder /></svg>
      </div>

      {/* Layer 6 — particles canvas */}
      <canvas ref={canvasRef} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" }} />

      {/* Layer 7 — vignette */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 6, pointerEvents: "none", background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 100%)" }} />

      {/* ══════════════════════════ CONTENT ══════════════════════════ */}
      <div style={{ position: "relative", zIndex: 10 }}>

        {/* ── HERO ── */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 100px 60px", textAlign: "center", position: "relative" }}>

          {/* large faint Eye of Ra watermark */}
          <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", opacity: 0.04, pointerEvents: "none", zIndex: 0 }}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <g>
                <circle cx="100" cy="100" r="90" stroke="#E7BA80" strokeWidth="0.5" fill="none" />
                <circle cx="100" cy="100" r="80" stroke="#E7BA80" strokeWidth="0.3" fill="none" />
                <path d="M20 100 Q60 50 100 50 Q140 50 180 100 Q140 150 100 150 Q60 150 20 100 Z" stroke="#E7BA80" strokeWidth="2" fill="none" />
                <circle cx="100" cy="100" r="28" stroke="#E7BA80" strokeWidth="1.5" fill="none" />
                <circle cx="100" cy="100" r="14" fill="#E7BA80" opacity="0.8" />
                <path d="M100 128 L90 160 L100 155 L110 160 Z" fill="#E7BA80" opacity="0.7" />
                <path d="M30 85 Q100 60 170 85" stroke="#E7BA80" strokeWidth="2" fill="none" />
              </g>
            </svg>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* overline */}
            <p style={{
              margin: "0 0 16px",
              fontSize: "10px", letterSpacing: "0.5em", textTransform: "uppercase",
              color: "rgba(231,186,128,0.45)", fontFamily: "'Cinzel',serif",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            }}>
              The Society of Scholars
            </p>

            {/* ISTE monogram ring */}
            <div style={{
              margin: "0 auto 24px",
              width: "90px", height: "90px",
              border: "1px solid rgba(231,186,128,0.35)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "scale(1)" : "scale(0.7)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
              boxShadow: "0 0 30px rgba(231,186,128,0.12), 0 0 60px rgba(231,186,128,0.05)",
            }}>
              <div style={{
                position: "absolute", inset: "6px",
                border: "1px solid rgba(231,186,128,0.2)",
                borderRadius: "50%",
              }} />
              <span style={{ fontSize: "26px", fontFamily: "'Cinzel Decorative',serif", color: "#E7BA80", letterSpacing: "0.02em", fontWeight: 700 }}>I</span>
            </div>

            {/* main title */}
            <h1 style={{
              margin: "0 0 6px",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 700,
              color: "#E7BA80",
              fontFamily: "'Cinzel Decorative','Cinzel',serif",
              letterSpacing: "0.08em",
              lineHeight: 1,
              textShadow: "0 0 80px rgba(231,186,128,0.35)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}>
              ISTE
            </h1>

            {/* full name */}
            <p style={{
              margin: "0 0 20px",
              fontSize: "clamp(0.65rem, 1.5vw, 0.9rem)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(231,186,128,0.55)",
              fontFamily: "'Cinzel',serif",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s",
            }}>
              Indian Society for Technical Education
            </p>

            {/* divider */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "14px",
              marginBottom: "28px",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.8s ease 0.55s",
            }}>
              <div style={{ height: "1px", width: "80px", background: "linear-gradient(to right, transparent, #E7BA80)" }} />
              <span style={{ fontSize: "20px" }}>𓂀</span>
              <div style={{ height: "1px", width: "80px", background: "linear-gradient(to left, transparent, #E7BA80)" }} />
            </div>

            {/* tagline */}
            <p style={{
              margin: "0 auto 40px",
              maxWidth: "560px",
              fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
              lineHeight: 1.8,
              color: "rgba(231,186,128,0.6)",
              fontFamily: "'Open Sans',sans-serif",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s",
            }}>
              Forging the engineers of tomorrow, one chapter at a time.
              A legacy carved in knowledge, bound by brotherhood.
            </p>

            {/* scroll cue */}
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
              opacity: heroVisible ? 0.5 : 0,
              transition: "opacity 0.8s ease 1.2s",
              animationName: "scrollCue",
              animationDuration: "2.4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}>
              <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, #E7BA80)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.3em", fontFamily: "'Cinzel',serif", color: "rgba(231,186,128,0.5)", textTransform: "uppercase" }}>Scroll</span>
            </div>
          </div>
        </section>

        {/* ── ABOUT TEXT ── */}
        <section style={{ padding: "60px 120px", maxWidth: "1100px", margin: "0 auto" }}>
          <SectionHeading overline="Who We Are" title="The Order of Engineers" glyph="𓊹" />

          {/* two-column text block */}
          <AboutTextBlock />
        </section>

        {/* ── STATS ── */}
        <section style={{ padding: "20px 120px 80px", maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
            {[
              { value: "1941", label: "Year Founded", icon: "𓇳", delay: 0 },
              { value: "200+", label: "Chapters Across India", icon: "𓅓", delay: 0.1 },
              { value: "4000+", label: "Active Members", icon: "𓂀", delay: 0.2 },
              { value: "50+", label: "Annual Events", icon: "𓋴", delay: 0.3 },
            ].map((s, i) => <StatCard key={i} {...s} />)}
          </div>
        </section>

        {/* ── GALLERY — floating cards ── */}
        <section style={{ padding: "60px 120px 80px", maxWidth: "1100px", margin: "0 auto" }}>
          <SectionHeading overline="Our Legacy" title="Moments Carved in Stone" glyph="𓇯" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            <FloatingCard image="https://picsum.photos/seed/iste1/600/500" title="Annual Techfest" subtitle="Flagship Event" delay={0} floatOffset="0px" />
            <FloatingCard image="https://picsum.photos/seed/iste2/600/500" title="Cultural Nights" subtitle="Heritage & Arts" delay={0.6} floatOffset="-8px" />
            <FloatingCard image="https://picsum.photos/seed/iste3/600/500" title="Hackathon Arena" subtitle="Innovation Lab" delay={1.2} floatOffset="4px" />
            <FloatingCard image="https://picsum.photos/seed/iste4/600/500" title="Leadership Summit" subtitle="Annual Conclave" delay={0.3} floatOffset="-4px" />
            <FloatingCard image="https://picsum.photos/seed/iste5/600/500" title="Workshop Series" subtitle="Skill Building" delay={0.9} floatOffset="6px" />
            <FloatingCard image="https://picsum.photos/seed/iste6/600/500" title="Research Symposium" subtitle="Paper Presentations" delay={1.5} floatOffset="-2px" />
          </div>
        </section>
      </div>

      {/* ══════════════════════════ GLOBAL STYLES ══════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Open+Sans:wght@300;400;600&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes scrollCue {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50%       { opacity: 0.2; transform: translateY(8px); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes revealLine {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT TEXT BLOCK (two column)
───────────────────────────────────────────────────────────────────────────── */
function AboutTextBlock() {
  const { ref, visible } = useScrollReveal(0.15);
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        alignItems: "start",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* left column */}
      <div>
        <p style={{ margin: "0 0 20px", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", lineHeight: 1.6, color: "#E7BA80", fontFamily: "'Cinzel',serif", fontWeight: 400, letterSpacing: "0.02em" }}>
          "An institution is the lengthened shadow of one great idea."
        </p>
        <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.8, color: "rgba(231,186,128,0.55)", fontFamily: "'Open Sans',sans-serif" }}>
          ISTE — Indian Society for Technical Education — is the premier national organisation for technical education in India. Since its founding, it has been the lifeblood of engineering campuses across the country, connecting students, faculty, and industry in a shared pursuit of excellence.
        </p>
      </div>

      {/* right column */}
      <div>
        <p style={{ margin: "0 0 20px", fontSize: "13px", lineHeight: 1.8, color: "rgba(231,186,128,0.55)", fontFamily: "'Open Sans',sans-serif" }}>
          Our student chapter carries this flame forward — organising technical festivals, coding marathons, design challenges, cultural nights, and leadership conclaves that transform students into well-rounded professionals ready to face the world.
        </p>
        <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.8, color: "rgba(231,186,128,0.55)", fontFamily: "'Open Sans',sans-serif" }}>
          We believe that great engineers are not just built in classrooms. They are forged in the heat of competition, shaped by mentorship, and polished by community.
        </p>
      </div>

      {/* full-width ornamental divider */}
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "16px", margin: "8px 0 0" }}>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(231,186,128,0.35))" }} />
        <span style={{ fontSize: "16px", opacity: 0.5 }}>𓋴</span>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(231,186,128,0.35))" }} />
      </div>
    </div>
  );
}