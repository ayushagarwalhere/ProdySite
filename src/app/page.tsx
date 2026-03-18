"use client";

import Preloader from "@/components/Home/Preloader";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   SPONSORS DATA  (swap with real logos/names)
───────────────────────────────────────────────────────────────────────────── */
const SPONSORS = {
  gold: [
    { name: "Nexus Corp",     domain: "nexuscorp.in",  glyph: "𓇳" },
    { name: "Arcadia Tech",   domain: "arcadia.io",    glyph: "𓂀" },
    { name: "Helios Labs",    domain: "helios.dev",    glyph: "𓊹" },
  ],
  silver: [
    { name: "Iris Dynamics",  domain: "iris.co",       glyph: "𓅓" },
    { name: "Phaedra AI",     domain: "phaedra.ai",    glyph: "𓋴" },
    { name: "Olympus Cloud",  domain: "olympus.cloud", glyph: "𓆑" },
    { name: "Aether Systems", domain: "aether.tech",   glyph: "𓏛" },
  ],
  bronze: [
    { name: "Cadmus Media",   domain: "cadmus.in",     glyph: "𓇯" },
    { name: "Pythia Tools",   domain: "pythia.dev",    glyph: "𓆓" },
    { name: "Delphi Works",   domain: "delphi.co",     glyph: "𓂃" },
    { name: "Logos Studio",   domain: "logos.design",  glyph: "𓇋" },
    { name: "Eris Finance",   domain: "eris.fin",      glyph: "𓂋" },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   GREEK LETTERS FOR PRELOADER
───────────────────────────────────────────────────────────────────────────── */
const GREEK = ["Α","Β","Γ","Δ","Ε","Ζ","Η","Θ","Ι","Κ","Λ","Μ","Ν","Ξ","Ο","Π","Ρ","Σ","Τ","Υ","Φ","Χ","Ψ","Ω"];
const GOLD_SHADES = ["#E7BA80","#C9922A","#F0C97A","#A87230","#FAD98B","#D4A853"];

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
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <line key={i}
            x1={12+8*Math.cos(a*Math.PI/180)} y1={12+8*Math.sin(a*Math.PI/180)}
            x2={12+11*Math.cos(a*Math.PI/180)} y2={12+11*Math.sin(a*Math.PI/180)}
            stroke="#E7BA80" strokeWidth="1" />
        ))}
      </g>
      <g transform="translate(4,300)">
        <path d="M14 24 Q14 12 14 8" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M14 8 Q10 0 6 4 Q8 10 14 12" fill="#E7BA80" opacity="0.7" />
        <path d="M14 8 Q18 0 22 4 Q20 10 14 12" fill="#E7BA80" opacity="0.7" />
        <line x1="8" y1="24" x2="20" y2="24" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      <g transform={`translate(4,${380+offset})`}>
        <ellipse cx="14" cy="8" rx="10" ry="6" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="8" r="2.5" fill="#E7BA80" />
        <path d="M4 11 Q8 16 14 14 Q20 16 24 11" stroke="#E7BA80" strokeWidth="1" fill="none" />
      </g>
      <g transform="translate(2,500)">
        <path d="M14 2 L28 28 L0 28 Z" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <line x1="14" y1="10" x2="22" y2="28" stroke="#E7BA80" strokeWidth="0.6" opacity="0.5" />
        <line x1="14" y1="10" x2="6"  y2="28" stroke="#E7BA80" strokeWidth="0.6" opacity="0.5" />
      </g>
      <g transform="translate(4,580)">
        <path d="M4 20 Q2 8 10 4 Q8 12 14 14 Q20 12 18 4 Q26 8 24 20" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="24" r="4" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
      </g>
      <g transform="translate(0,680)">
        <line x1="4" y1="0" x2="32" y2="0" stroke="#E7BA80" strokeWidth="0.8" />
        <circle cx="18" cy="0" r="2" fill="#E7BA80" />
        <circle cx="8"  cy="0" r="1" fill="#E7BA80" />
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
      {Array.from({ length: 120 }).map((_,i) => (
        <g key={i} transform={`translate(${i*80+8},0)`}>
          <path d="M20 28 L20 16 Q16 8 12 10 Q10 16 20 18"  fill="#E7BA80" opacity="0.6" />
          <path d="M20 28 L20 16 Q24 8 28 10 Q30 16 20 18"  fill="#E7BA80" opacity="0.6" />
          <path d="M20 28 L20 12 Q19 6 20 4 Q21 6 20 12"    fill="#E7BA80" opacity="0.8" />
          <path d="M2 28 L8 20 L2 12"  stroke="#E7BA80" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M38 28 L32 20 L38 12" stroke="#E7BA80" strokeWidth="0.8" fill="none" opacity="0.5" />
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
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
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
      <p style={{ margin:"0 0 10px", fontSize:"10px", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(231,186,128,0.45)", fontFamily:"'Cinzel',serif" }}>
        {overline}
      </p>
      <h2 style={{ margin:"0 0 14px", fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:700, color:"#E7BA80", fontFamily:"'Cinzel Decorative','Cinzel',serif", letterSpacing:"0.05em", textShadow:"0 0 50px rgba(231,186,128,0.25)" }}>
        {title}
      </h2>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px" }}>
        <div style={{ height:"1px", width:"60px", background:"linear-gradient(to right,transparent,#E7BA80)" }} />
        <span style={{ fontSize:"18px" }}>{glyph}</span>
        <div style={{ height:"1px", width:"60px", background:"linear-gradient(to left,transparent,#E7BA80)" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────────────────────────────────────── */
function StatCard({ value, label, icon, delay }: { value:string; label:string; icon:string; delay:number }) {
  const { ref, visible } = useScrollReveal(0.2);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        background: "rgba(15,8,0,0.75)", borderRadius:"4px", padding:"28px 24px",
        textAlign:"center", backdropFilter:"blur(8px)",
        border: hovered ? "1px solid rgba(231,186,128,0.6)" : "1px solid rgba(231,186,128,0.2)",
        boxShadow: hovered ? "0 0 30px rgba(231,186,128,0.2)" : "none",
        cursor:"default",
      }}>
      <div style={{ fontSize:"26px", marginBottom:"10px" }}>{icon}</div>
      <div style={{ fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:700, color:"#E7BA80", fontFamily:"'Cinzel Decorative','Cinzel',serif", lineHeight:1, marginBottom:"8px" }}>{value}</div>
      <div style={{ fontSize:"10px", letterSpacing:"0.3em", textTransform:"uppercase", color:"rgba(231,186,128,0.5)", fontFamily:"'Cinzel',serif" }}>{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SPONSOR TABLET  — stone tablet aesthetic
───────────────────────────────────────────────────────────────────────────── */
function SponsorTablet({
  name, glyph, tier, delay,
}: { name:string; glyph:string; tier:"gold"|"silver"|"bronze"; delay:number }) {
  const { ref, visible } = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(false);

  const tierColor = {
    gold:   { border:"rgba(231,186,128,0.7)", glow:"rgba(231,186,128,0.3)", text:"#E7BA80",  badge:"#C9922A" },
    silver: { border:"rgba(192,192,192,0.5)", glow:"rgba(192,192,192,0.15)", text:"#C8C8C8", badge:"#909090" },
    bronze: { border:"rgba(176,110,65,0.5)",  glow:"rgba(176,110,65,0.15)", text:"#C8865A",  badge:"#8B5A2B" },
  }[tier];

  const size = tier === "gold" ? 130 : tier === "silver" ? 110 : 95;

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        width: size, flexShrink:0,
        display:"flex", flexDirection:"column", alignItems:"center", gap:"10px",
        cursor:"default",
      }}>
      {/* tablet shape */}
      <div style={{
        width: "100%",
        paddingBottom:"110%",
        position:"relative",
        background: "rgba(15,8,0,0.85)",
        border: hovered ? `1px solid ${tierColor.border}` : `1px solid ${tierColor.border.replace("0.7","0.3").replace("0.5","0.2")}`,
        borderBottom: "none",
        borderRadius:"4px 4px 0 0",
        boxShadow: hovered ? `0 0 24px ${tierColor.glow}, 0 -2px 0 ${tierColor.badge}` : `0 -2px 0 ${tierColor.badge}44`,
        transition:"border-color 0.3s, box-shadow 0.3s",
      }}>
        {/* top arch cutout */}
        <div style={{
          position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          width:"40%", height:"20px",
          borderRadius:"0 0 50% 50%",
          border:`1px solid ${tierColor.border.replace("0.7","0.25")}`,
          borderTop:"none",
          background:"rgba(10,5,0,0.9)",
        }} />
        {/* glyph */}
        <div style={{
          position:"absolute", inset:0,
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", gap:6,
        }}>
          <span style={{ fontSize: tier==="gold"?28:tier==="silver"?24:20, color:tierColor.text, opacity: hovered?1:0.65, transition:"opacity 0.3s" }}>
            {glyph}
          </span>
          {/* horizontal rule */}
          <div style={{ width:"50%", height:"1px", background:`linear-gradient(to right,transparent,${tierColor.badge},transparent)` }} />
        </div>
        {/* corner dots */}
        {[[8,8],[8,"calc(100% - 8px)"],["calc(100% - 8px)",8],["calc(100% - 8px)","calc(100% - 8px)"]].map(([t,l],i)=>(
          <div key={i} style={{
            position:"absolute", top:t as string, left:l as string,
            width:3, height:3, borderRadius:"50%",
            background:tierColor.badge, opacity:0.5,
          }}/>
        ))}
      </div>
      {/* tablet base */}
      <div style={{
        width:"110%", height:6,
        background:`linear-gradient(to right,transparent,${tierColor.badge}44,transparent)`,
        borderTop:`1px solid ${tierColor.badge}44`,
      }} />
      {/* name */}
      <p style={{
        margin:0, fontFamily:"'Cinzel',serif", fontWeight:700,
        fontSize: tier==="gold"?12:10,
        letterSpacing:"0.08em", textTransform:"uppercase",
        color: hovered ? tierColor.text : `${tierColor.text}99`,
        textAlign:"center", lineHeight:1.3,
        transition:"color 0.3s",
      }}>{name}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRELOADER
───────────────────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    setTimeout(() => setContentVisible(true), 50);
  }, []);

  /* gold dust particles */
  useEffect(() => {
    if (!contentVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({length:65}, () => ({
      x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight,
      r:Math.random()*1.5+.3, dx:(Math.random()-.5)*.22, dy:-Math.random()*.4-.1,
      alpha:Math.random()*.45+.1,
    }));
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(231,186,128,${p.alpha})`; ctx.fill();
        p.x+=p.dx; p.y+=p.dy;
        if (p.y<-4) { p.y=canvas.height+4; p.x=Math.random()*canvas.width; }
        if (p.x<-4)  p.x=canvas.width+4;
        if (p.x>canvas.width+4) p.x=-4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, [contentVisible]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Open+Sans:wght@300;400;600&display=swap');
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;background:#080400;color:#f5ead8;overflow-x:hidden}
        @keyframes floatCard{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes scrollCue{0%,100%{opacity:.5;transform:translateY(0)}50%{opacity:.2;transform:translateY(8px)}}
        @keyframes templeGlow{0%,100%{opacity:.04}50%{opacity:.08}}
      `}</style>

      {/* preloader */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* main content fades in after preloader */}
      <div style={{ opacity: contentVisible ? 1 : 0, transition:"opacity 0.8s ease", minHeight:"100vh", position:"relative" }}>

        {/* ── EGYPTIAN BG LAYERS ── */}
        <div aria-hidden style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", background:"radial-gradient(ellipse 130% 80% at 50% -10%,#1e0f00 0%,#0d0700 50%,#000 100%)" }} />
        <div aria-hidden style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none", opacity:.5, mixBlendMode:"overlay" as React.CSSProperties["mixBlendMode"], backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")` }} />
        <div aria-hidden style={{ position:"fixed", inset:0, zIndex:2, pointerEvents:"none", backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(180,120,40,0.025) 3px,rgba(180,120,40,0.025) 4px)" }} />

        {/* left hieroglyph col */}
        <div aria-hidden style={{ position:"fixed", left:0, top:0, bottom:0, width:72, zIndex:3, pointerEvents:"none", opacity:.3, display:"flex", flexDirection:"column", alignItems:"center", paddingTop:20 }}>
          <div style={{ position:"absolute", right:12, top:0, bottom:0, width:1, background:"linear-gradient(to bottom,transparent,#E7BA80 15%,#E7BA80 85%,transparent)" }} />
          <svg width="36" viewBox="0 0 36 820" fill="none"><HieroglyphStrip /></svg>
        </div>
        {/* right hieroglyph col */}
        <div aria-hidden style={{ position:"fixed", right:0, top:0, bottom:0, width:72, zIndex:3, pointerEvents:"none", opacity:.3, display:"flex", flexDirection:"column", alignItems:"center", paddingTop:20, transform:"scaleX(-1)" }}>
          <div style={{ position:"absolute", right:12, top:0, bottom:0, width:1, background:"linear-gradient(to bottom,transparent,#E7BA80 15%,#E7BA80 85%,transparent)" }} />
          <svg width="36" viewBox="0 0 36 820" fill="none"><HieroglyphStrip offset={14} /></svg>
        </div>

        {/* bottom border */}
        <div aria-hidden style={{ position:"fixed", bottom:0, left:0, right:0, height:36, zIndex:4, pointerEvents:"none", opacity:.4, transform:"scaleY(-1)" }}>
          <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice"><TopBorder /></svg>
        </div>

        {/* particles */}
        <canvas ref={canvasRef} aria-hidden style={{ position:"fixed", inset:0, zIndex:5, pointerEvents:"none" }} />

        {/* vignette */}
        <div aria-hidden style={{ position:"fixed", inset:0, zIndex:6, pointerEvents:"none", background:"radial-gradient(ellipse 85% 85% at 50% 50%,transparent 35%,rgba(0,0,0,0.72) 100%)" }} />

        {/* ── PAGE CONTENT ── */}
        <div style={{ position:"relative", zIndex:10 }}>

          {/* ════════════════════ HERO ════════════════════ */}
          <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 100px 60px", textAlign:"center", position:"relative" }}>

            {/* Eye of Ra watermark */}
            <div aria-hidden style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:500, opacity:0, pointerEvents:"none", animation:"templeGlow 6s ease-in-out infinite" }}>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="#E7BA80" strokeWidth="0.5" fill="none" />
                <path d="M20 100 Q60 50 100 50 Q140 50 180 100 Q140 150 100 150 Q60 150 20 100 Z" stroke="#E7BA80" strokeWidth="2" fill="none" />
                <circle cx="100" cy="100" r="28" stroke="#E7BA80" strokeWidth="1.5" fill="none" />
                <circle cx="100" cy="100" r="14" fill="#E7BA80" opacity="0.8" />
                <path d="M100 128 L90 160 L100 155 L110 160 Z" fill="#E7BA80" opacity="0.7" />
              </svg>
            </div>

            <p style={{ margin:"0 0 16px", fontSize:10, letterSpacing:".5em", textTransform:"uppercase", color:"rgba(231,186,128,0.45)", fontFamily:"'Cinzel',serif" }}>
              The Society of Scholars
            </p>

            {/* ISTE monogram */}
            <div style={{ margin:"0 auto 24px", width:90, height:90, border:"1px solid rgba(231,186,128,0.35)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", boxShadow:"0 0 30px rgba(231,186,128,0.12)" }}>
              <div style={{ position:"absolute", inset:6, border:"1px solid rgba(231,186,128,0.18)", borderRadius:"50%" }} />
              <span style={{ fontSize:26, fontFamily:"'Cinzel Decorative',serif", color:"#E7BA80", fontWeight:700 }}>I</span>
            </div>

            <h1 style={{ margin:"0 0 6px", fontSize:"clamp(3rem,8vw,6rem)", fontWeight:700, color:"#E7BA80", fontFamily:"'Cinzel Decorative','Cinzel',serif", letterSpacing:".08em", lineHeight:1, textShadow:"0 0 80px rgba(231,186,128,0.35)" }}>
              ISTE
            </h1>

            <p style={{ margin:"0 0 20px", fontSize:"clamp(0.65rem,1.5vw,0.9rem)", letterSpacing:".3em", textTransform:"uppercase", color:"rgba(231,186,128,0.55)", fontFamily:"'Cinzel',serif" }}>
              Indian Society for Technical Education
            </p>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:28 }}>
              <div style={{ height:1, width:80, background:"linear-gradient(to right,transparent,#E7BA80)" }} />
              <span style={{ fontSize:20 }}>𓂀</span>
              <div style={{ height:1, width:80, background:"linear-gradient(to left,transparent,#E7BA80)" }} />
            </div>

            <p style={{ margin:"0 auto 40px", maxWidth:520, fontSize:"clamp(0.85rem,1.8vw,1.05rem)", lineHeight:1.8, color:"rgba(231,186,128,0.6)", fontFamily:"'Open Sans',sans-serif" }}>
              Forging the engineers of tomorrow, one chapter at a time.<br />
              A legacy carved in knowledge, bound by brotherhood.
            </p>

            {/* nav pills */}
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
              {["about","sponsors"].map(s => (
                <a key={s} href={`#${s}`} style={{
                  padding:"8px 22px", border:"1px solid rgba(231,186,128,0.3)", borderRadius:2,
                  fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:".25em", textTransform:"uppercase",
                  color:"rgba(231,186,128,0.6)", textDecoration:"none",
                  transition:"border-color 0.2s,color 0.2s",
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(231,186,128,0.7)";(e.currentTarget as HTMLAnchorElement).style.color="#E7BA80";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.borderColor="rgba(231,186,128,0.3)";(e.currentTarget as HTMLAnchorElement).style.color="rgba(231,186,128,0.6)";}}
                >{s}</a>
              ))}
            </div>

            {/* scroll cue */}
            <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, animation:"scrollCue 2.4s ease-in-out infinite" }}>
              <div style={{ width:1, height:36, background:"linear-gradient(to bottom,transparent,rgba(231,186,128,0.4))" }} />
              <span style={{ fontSize:9, letterSpacing:".3em", fontFamily:"'Cinzel',serif", color:"rgba(231,186,128,0.4)", textTransform:"uppercase" }}>Scroll</span>
            </div>
          </section>

          {/* ════════════════════ ABOUT ════════════════════ */}
          <section id="about" style={{ padding:"80px 120px", maxWidth:1100, margin:"0 auto" }}>
            <SectionHeading overline="Who We Are" title="The Order of Engineers" glyph="𓊹" />

            <AboutBlock />

            {/* stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20, marginTop:60 }}>
              {[
                { value:"1941", label:"Year Founded",          icon:"𓇳", delay:0   },
                { value:"200+", label:"Chapters Across India", icon:"𓅓", delay:0.1 },
                { value:"4000+",label:"Active Members",        icon:"𓂀", delay:0.2 },
                { value:"50+",  label:"Annual Events",         icon:"𓋴", delay:0.3 },
              ].map((s,i) => <StatCard key={i} {...s} />)}
            </div>
          </section>

          {/* ════════════════════ SPONSORS ════════════════════ */}
          <section id="sponsors" style={{ padding:"80px 80px 120px", maxWidth:1200, margin:"0 auto" }}>
            <SectionHeading overline="Our Patrons" title="The Grand Benefactors" glyph="𓋴" />

            {/* temple column divider top */}
            <TempleColumns />

            {/* GOLD tier */}
            <SponsorTier
              tier="gold"
              label="Gold Patrons"
              badge="𓇳"
              sponsors={SPONSORS.gold}
            />

            <TierDivider />

            {/* SILVER tier */}
            <SponsorTier
              tier="silver"
              label="Silver Patrons"
              badge="𓂀"
              sponsors={SPONSORS.silver}
            />

            <TierDivider />

            {/* BRONZE tier */}
            <SponsorTier
              tier="bronze"
              label="Bronze Patrons"
              badge="𓅓"
              sponsors={SPONSORS.bronze}
            />

            {/* become a sponsor CTA */}
            <BecomeSponsorCTA />
          </section>

        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT BLOCK
───────────────────────────────────────────────────────────────────────────── */
function AboutBlock() {
  const { ref, visible } = useScrollReveal(0.15);
  return (
    <div ref={ref} style={{
      display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start",
      opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(30px)",
      transition:"opacity 0.8s ease,transform 0.8s ease",
    }}>
      <div>
        <p style={{ margin:"0 0 20px", fontSize:"clamp(1.1rem,2.5vw,1.35rem)", lineHeight:1.6, color:"#E7BA80", fontFamily:"'Cinzel',serif", fontWeight:400, letterSpacing:".02em" }}>
          "An institution is the lengthened shadow of one great idea."
        </p>
        <p style={{ margin:0, fontSize:13, lineHeight:1.8, color:"rgba(231,186,128,0.55)", fontFamily:"'Open Sans',sans-serif" }}>
          ISTE — Indian Society for Technical Education — is the premier national organisation for technical education in India. Since its founding, it has been the lifeblood of engineering campuses across the country, connecting students, faculty, and industry in a shared pursuit of excellence.
        </p>
      </div>
      <div>
        <p style={{ margin:"0 0 20px", fontSize:13, lineHeight:1.8, color:"rgba(231,186,128,0.55)", fontFamily:"'Open Sans',sans-serif" }}>
          Our student chapter carries this flame forward — organising technical festivals, coding marathons, design challenges, cultural nights, and leadership conclaves that transform students into well-rounded professionals ready to face the world.
        </p>
        <p style={{ margin:0, fontSize:13, lineHeight:1.8, color:"rgba(231,186,128,0.55)", fontFamily:"'Open Sans',sans-serif" }}>
          We believe great engineers are not just built in classrooms. They are forged in competition, shaped by mentorship, and polished by community.
        </p>
      </div>
      <div style={{ gridColumn:"1 / -1", display:"flex", alignItems:"center", gap:16 }}>
        <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(231,186,128,0.3))" }} />
        <span style={{ fontSize:16, opacity:.5 }}>𓋴</span>
        <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,rgba(231,186,128,0.3))" }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TEMPLE COLUMN ORNAMENT
───────────────────────────────────────────────────────────────────────────── */
function TempleColumns() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div ref={ref} style={{
      display:"flex", justifyContent:"center", gap:32, marginBottom:52,
      opacity: visible?1:0, transition:"opacity 1s ease",
    }}>
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, opacity:.25+i*.04 }}>
          {/* capital */}
          <div style={{ width:24, height:8, background:"rgba(231,186,128,0.4)", borderRadius:"2px 2px 0 0" }} />
          {/* flutes */}
          {Array.from({length:6}).map((_,j)=>(
            <div key={j} style={{ width:18, height:8, borderLeft:"1px solid rgba(231,186,128,0.2)", borderRight:"1px solid rgba(231,186,128,0.2)" }} />
          ))}
          {/* base */}
          <div style={{ width:26, height:5, background:"rgba(231,186,128,0.3)", borderRadius:"0 0 2px 2px" }} />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SPONSOR TIER
───────────────────────────────────────────────────────────────────────────── */
function SponsorTier({ tier, label, badge, sponsors }: {
  tier:"gold"|"silver"|"bronze";
  label:string; badge:string;
  sponsors:{ name:string; glyph:string }[];
}) {
  const { ref, visible } = useScrollReveal(0.1);
  const tierStyle = {
    gold:   { color:"#E7BA80", border:"rgba(231,186,128,0.25)" },
    silver: { color:"#C8C8C8", border:"rgba(192,192,192,0.2)"  },
    bronze: { color:"#C8865A", border:"rgba(176,110,65,0.2)"   },
  }[tier];

  return (
    <div ref={ref} style={{
      marginBottom:8,
      opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(20px)",
      transition:"opacity 0.6s ease,transform 0.6s ease",
    }}>
      {/* tier label */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
        <div style={{ flex:1, height:1, background:`linear-gradient(to right,transparent,${tierStyle.border})` }} />
        <span style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:".35em", textTransform:"uppercase", color:tierStyle.color, opacity:.6 }}>
          {badge} {label}
        </span>
        <div style={{ flex:1, height:1, background:`linear-gradient(to left,transparent,${tierStyle.border})` }} />
      </div>

      {/* tablets row */}
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:tier==="gold"?40:tier==="silver"?28:20, alignItems:"flex-end" }}>
        {sponsors.map((s,i) => (
          <SponsorTablet key={i} name={s.name} glyph={s.glyph} tier={tier} delay={i*0.08} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TIER DIVIDER
───────────────────────────────────────────────────────────────────────────── */
function TierDivider() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, margin:"48px 0" }}>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(231,186,128,0.12))" }} />
      <div style={{ display:"flex", gap:6 }}>
        {[0,1,2].map(i=>(
          <div key={i} style={{ width:4, height:4, borderRadius:"50%", background:"rgba(231,186,128,0.25)", transform:`scale(${1-i*.15})` }} />
        ))}
      </div>
      <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,rgba(231,186,128,0.12))" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BECOME A SPONSOR CTA
───────────────────────────────────────────────────────────────────────────── */
function BecomeSponsorCTA() {
  const { ref, visible } = useScrollReveal(0.2);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} style={{
      marginTop:64, textAlign:"center",
      opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(24px)",
      transition:"opacity 0.7s ease,transform 0.7s ease",
    }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:28 }}>
        <div style={{ height:1, width:80, background:"linear-gradient(to right,transparent,rgba(231,186,128,0.3))" }} />
        <span style={{ fontSize:14, opacity:.4 }}>𓊹</span>
        <div style={{ height:1, width:80, background:"linear-gradient(to left,transparent,rgba(231,186,128,0.3))" }} />
      </div>
      <p style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(1rem,2vw,1.3rem)", fontWeight:700, color:"rgba(231,186,128,0.7)", letterSpacing:".05em", margin:"0 0 8px" }}>
        Leave your name upon the temple walls.
      </p>
      <p style={{ fontFamily:"'Open Sans',sans-serif", fontSize:13, color:"rgba(231,186,128,0.4)", margin:"0 0 24px", lineHeight:1.7 }}>
        Partner with Prodyogiki and reach 4000+ engineering minds.
      </p>
      <button
        onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        style={{
          padding:"10px 28px", background: hovered?"rgba(231,186,128,0.12)":"transparent",
          border:"1px solid rgba(231,186,128,0.4)", borderRadius:2, cursor:"pointer",
          fontFamily:"'Cinzel',serif", fontSize:10, letterSpacing:".28em", textTransform:"uppercase",
          color: hovered?"#E7BA80":"rgba(231,186,128,0.6)",
          transition:"all 0.25s ease",
        }}>
        Become a Patron
      </button>
    </div>
  );
}