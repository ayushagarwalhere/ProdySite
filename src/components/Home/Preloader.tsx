"use client";
import { useEffect, useState, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"draw" | "reveal" | "hold" | "exit">("draw");
  const [progress, setProgress] = useState(0);
  const [showCurtains, setShowCurtains] = useState(false);
  const [curtainPhase, setCurtainPhase] = useState<"closing" | "closed" | "opening" | "done">("closing");
  const [exitDone, setExitDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dy: -(Math.random() * 0.5 + 0.1),
      dx: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.4 + 0.05,
      color: Math.random() > 0.5 ? "224,168,90" : "255,248,225",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Phase sequencer ── */
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(Math.round((1 - Math.pow(1 - pct, 3)) * 100));
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // draw done → reveal
        setPhase("reveal");

        setTimeout(() => setPhase("hold"), 600);

        // t=2200ms: start exit sequence
        setTimeout(() => {
          setPhase("exit");
          setShowCurtains(true);       // curtains start closing
          setCurtainPhase("closing");
        }, 2200);

        // t=2200+900ms: curtains fully closed → fire onComplete, land page mounts
        setTimeout(() => {
          setCurtainPhase("closed");
          onComplete();
        }, 2200 + 900);

        // t=2200+1000ms: small buffer then start opening curtains
        setTimeout(() => {
          setCurtainPhase("opening");
        }, 2200 + 1000);

        // t=2200+2000ms: curtains fully open → unmount preloader
        setTimeout(() => {
          setCurtainPhase("done");
          setExitDone(true);
        }, 2200 + 2100);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (exitDone) return null;

  const isReveal = phase === "reveal" || phase === "hold" || phase === "exit";
  const isExit = phase === "exit";

  // Curtain animation strings based on phase
  const curtainTopAnim = curtainPhase === "closing" || curtainPhase === "closed"
    ? "curtain-close-top 0.9s cubic-bezier(0.77,0,0.18,1) forwards"
    : curtainPhase === "opening"
    ? "curtain-open-top 0.9s cubic-bezier(0.77,0,0.18,1) forwards"
    : "none";

  const curtainBotAnim = curtainPhase === "closing" || curtainPhase === "closed"
    ? "curtain-close-bot 0.9s cubic-bezier(0.77,0,0.18,1) forwards"
    : curtainPhase === "opening"
    ? "curtain-open-bot 0.9s cubic-bezier(0.77,0,0.18,1) forwards"
    : "none";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600&family=Barlow+Condensed:wght@300;700;800&display=swap');

        @keyframes eye-glow {
          0%,100% { filter: drop-shadow(0 0 6px rgba(224,168,90,0.4)); }
          50%      { filter: drop-shadow(0 0 20px rgba(224,168,90,0.9)); }
        }
        @keyframes scarab-spin {
          0%   { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes ring-expand {
          0%   { transform: translate(-50%, -50%) scale(0.6) rotate(0deg); opacity: 0; }
          50%  { opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.6) rotate(360deg); opacity: 0; }
        }
        @keyframes title-emerge {
          0%   { opacity: 0; letter-spacing: 0.6em; filter: blur(12px); }
          100% { opacity: 1; letter-spacing: 0.22em; filter: blur(0px); }
        }
        @keyframes sub-emerge {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0.6; transform: translateY(0); }
        }
        @keyframes meander-slide {
          0%   { background-position: 0% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes flame-dance {
          0%,100% { transform: scaleX(1) scaleY(1) rotate(-1deg); }
          33%     { transform: scaleX(0.93) scaleY(1.06) rotate(1.5deg); }
          66%     { transform: scaleX(1.05) scaleY(0.96) rotate(-0.5deg); }
        }

        /* Curtain closes (slides IN from edge toward center) */
        @keyframes curtain-close-top {
          0%   { transform: scaleY(0); transform-origin: top; }
          100% { transform: scaleY(1); transform-origin: top; }
        }
        @keyframes curtain-close-bot {
          0%   { transform: scaleY(0); transform-origin: bottom; }
          100% { transform: scaleY(1); transform-origin: bottom; }
        }
        /* Curtain opens (slides AWAY from center back to edge) */
        @keyframes curtain-open-top {
          0%   { transform: scaleY(1); transform-origin: top; }
          100% { transform: scaleY(0); transform-origin: top; }
        }
        @keyframes curtain-open-bot {
          0%   { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /* ── Responsive typography ── */
        .preloader-title {
          font-family: 'Cinzel Decorative','Cinzel',serif;
          font-size: clamp(1.1rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #f5ead8;
          margin: 0;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-shadow: 0 0 40px rgba(224,168,90,0.3);
        }
        .preloader-sub {
          font-family: 'Cinzel',serif;
          font-size: clamp(0.5rem, 1.5vw, 0.7rem);
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #c8924e;
          margin: 0.6rem 0 0;
        }
        .preloader-label {
          font-family: 'Barlow Condensed',sans-serif;
          font-size: clamp(0.55rem, 1.2vw, 0.65rem);
          letter-spacing: 0.2em;
          color: rgba(200,146,78,0.4);
          text-transform: uppercase;
        }
        .preloader-pct {
          font-family: 'Barlow Condensed',sans-serif;
          font-size: clamp(0.6rem, 1.5vw, 0.72rem);
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #c8924e;
        }

        /* Hide side torches on small screens */
        .preloader-torch { display: flex; }
        @media (max-width: 600px) {
          .preloader-torch { display: none; }
          .preloader-eye svg { width: 140px !important; height: 98px !important; }
          .preloader-ring { width: 140px !important; height: 140px !important; }
          .preloader-scarab svg { width: 180px !important; height: 180px !important; }
          .preloader-progress { width: 180px !important; }
          .preloader-hieroglyphs { gap: 0.7rem !important; }
        }
        @media (max-width: 380px) {
          .preloader-eye svg { width: 110px !important; height: 77px !important; }
        }
      `}</style>

      {/* ── CURTAINS — rendered above everything, including the preloader bg ── */}
      {showCurtains && curtainPhase !== "done" && (
        <>
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, height: "50%",
            background: "#040200", zIndex: 10002,
            animation: curtainTopAnim,
          }} />
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0, height: "50%",
            background: "#040200", zIndex: 10002,
            animation: curtainBotAnim,
          }} />
        </>
      )}

      {/* ── MAIN PRELOADER ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "#040200",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        // Only fade out the content, NOT the background — curtains handle the transition
        opacity: isExit ? 0 : 1,
        transition: isExit ? "opacity 0.4s ease 0s" : "none",
      }}>
        {/* Particle canvas */}
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

        {/* Ambient glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(180,100,20,0.18) 0%,transparent 70%)" }} />

        {/* Corner hieroglyphs */}
        {["tl", "tr", "bl", "br"].map((pos, i) => (
          <div key={pos} style={{
            position: "absolute",
            ...(pos === "tl" ? { top: 20, left: 20 } : pos === "tr" ? { top: 20, right: 20 } : pos === "bl" ? { bottom: 20, left: 20 } : { bottom: 20, right: 20 }),
            opacity: isReveal ? 1 : 0,
            transition: `opacity 0.6s ease ${0.1 + i * 0.08}s`,
          }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <ellipse cx={pos.includes("l") ? 14 : 34} cy="16" rx="5" ry="4" stroke="#c8924e" strokeWidth="0.8" opacity="0.5" />
              <line x1={pos.includes("l") ? 14 : 34} y1="20" x2={pos.includes("l") ? 14 : 34} y2="36" stroke="#c8924e" strokeWidth="0.8" opacity="0.5" />
              <line x1={pos.includes("l") ? 8 : 28} y1="26" x2={pos.includes("l") ? 20 : 40} y2="26" stroke="#c8924e" strokeWidth="0.8" opacity="0.5" />
            </svg>
          </div>
        ))}

        {/* ── CENTRAL COMPOSITION ── */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>

          {/* Pulsing rings */}
          {[0, 1, 2].map(i => (
            <div key={i} className="preloader-ring" style={{
              position: "absolute", width: 200, height: 200, borderRadius: "50%",
              border: "1px solid rgba(180,124,60,0.3)", top: "50%", left: "50%",
              animation: `ring-expand ${2.5 + i * 0.8}s ease-out ${i * 0.6}s infinite`,
              pointerEvents: "none",
            }} />
          ))}

          {/* Eye of Horus */}
          <div className="preloader-eye" style={{
            animation: "eye-glow 2s ease-in-out infinite",
            opacity: isReveal ? 1 : 0,
            transform: isReveal ? "scale(1)" : "scale(0.7)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}>
            <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
              <path d="M10 70 Q60 15 100 20 Q140 15 190 70 Q140 125 100 120 Q60 125 10 70Z" stroke="#e0a85a" strokeWidth="2" fill="none" />
              <path d="M25 70 Q65 35 100 38 Q135 35 175 70 Q135 105 100 102 Q65 105 25 70Z" fill="rgba(180,124,60,0.06)" />
              <circle cx="100" cy="70" r="28" stroke="#e0a85a" strokeWidth="1.5" fill="none" />
              <circle cx="100" cy="70" r="22" stroke="#c8924e" strokeWidth="1" fill="rgba(180,80,10,0.15)" opacity="0.8" />
              <circle cx="100" cy="70" r="13" fill="#e0a85a" opacity="0.9" />
              <circle cx="100" cy="70" r="7" fill="#1a0e04" />
              <circle cx="104" cy="66" r="2.5" fill="white" opacity="0.6" />
              <path d="M100 98 Q92 114 100 122 Q108 114 100 98Z" stroke="#e0a85a" strokeWidth="1.2" fill="none" opacity="0.7" />
              <path d="M30 55 Q100 30 170 55" stroke="#e0a85a" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M10 70 L0 60 M10 70 L0 80" stroke="#e0a85a" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
              <path d="M190 70 L200 60 M190 70 L200 80" stroke="#e0a85a" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
              {[-3, -1, 1, 3].map((off, i) => (
                <line key={i} x1={100 + off * 12} y1="100" x2={100 + off * 11} y2="110" stroke="#c8924e" strokeWidth="0.8" opacity="0.4" />
              ))}
            </svg>
          </div>

          {/* Rotating scarab ring */}
          <div className="preloader-scarab" style={{
            position: "absolute", top: "50%", left: "50%",
            animation: "scarab-spin 12s linear infinite",
            pointerEvents: "none",
            opacity: isReveal ? 0.4 : 0,
            transition: "opacity 1s ease 0.3s",
          }}>
            <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
              <circle cx="130" cy="130" r="118" stroke="#c8924e" strokeWidth="0.5" strokeDasharray="4 8" />
              {[0, 90, 180, 270].map((angle, i) => {
                const rad = angle * Math.PI / 180;
                const cx = 130 + 118 * Math.sin(rad);
                const cy = 130 - 118 * Math.cos(rad);
                return (
                  <g key={i} transform={`translate(${cx - 6},${cy - 6}) rotate(${angle},6,6)`}>
                    <ellipse cx="6" cy="7" rx="4" ry="5" fill="#c8924e" opacity="0.7" />
                    <ellipse cx="6" cy="3" rx="3" ry="2.5" fill="#c8924e" opacity="0.6" />
                    <circle cx="6" cy="1" r="1" fill="#c8924e" opacity="0.5" />
                  </g>
                );
              })}
              {[45, 135, 225, 315].map((angle, i) => {
                const rad = angle * Math.PI / 180;
                return <polygon key={i} points={`${130 + 118 * Math.sin(rad)},${130 - 118 * Math.cos(rad) - 4} ${130 + 118 * Math.sin(rad) - 4},${130 - 118 * Math.cos(rad) + 3} ${130 + 118 * Math.sin(rad) + 4},${130 - 118 * Math.cos(rad) + 3}`} fill="#c8924e" opacity="0.5" />;
              })}
            </svg>
          </div>

          {/* Title */}
          <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <h1
              className="preloader-title"
              style={{
                opacity: isReveal ? 1 : 0,
                animation: isReveal ? "title-emerge 0.9s cubic-bezier(0.22,1,0.36,1) forwards" : "none",
              }}
            >
              WELCOME BACK !!
            </h1>
            <p
              className="preloader-sub"
              style={{
                opacity: isReveal ? 1 : 0,
                animation: isReveal ? "sub-emerge 0.8s ease 0.3s forwards" : "none",
              }}
            >
              The Alchemical Renaissance
            </p>
          </div>

          {/* Progress bar */}
          <div className="preloader-progress" style={{ width: 220, marginTop: "0.5rem", opacity: phase === "draw" || phase === "reveal" ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <div style={{ position: "relative", height: 3, background: "rgba(180,124,60,0.12)", borderRadius: 0, overflow: "hidden" }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right,#b47c3c,#e0a85a,#fff8e1,#e0a85a,#b47c3c)",
                backgroundSize: "200% 100%",
                width: `${progress}%`, transition: "width 0.1s linear",
                animation: "meander-slide 1.5s linear infinite",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, padding: "0 1px" }}>
              {Array.from({ length: 11 }).map((_, i) => (
                <div key={i} style={{ width: 1, height: i % 5 === 0 ? 5 : 3, background: progress >= i * 10 ? "rgba(224,168,90,0.6)" : "rgba(180,124,60,0.2)", transition: "background 0.1s" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span className="preloader-label">Initiating</span>
              <span className="preloader-pct">{progress}%</span>
            </div>
          </div>

          {/* Hieroglyph row */}
          <div className="preloader-hieroglyphs" style={{ display: "flex", alignItems: "center", gap: "1.2rem", opacity: isReveal ? 1 : 0, transition: "opacity 0.6s ease 0.4s" }}>
            <svg width="30" height="42" viewBox="0 0 20 28" fill="none" opacity="0.85">
              <ellipse cx="10" cy="7" rx="5" ry="4" stroke="#c8924e" strokeWidth="2" />
              <line x1="10" y1="11" x2="10" y2="27" stroke="#c8924e" strokeWidth="2" />
              <line x1="4" y1="17" x2="16" y2="17" stroke="#c8924e" strokeWidth="2" />
            </svg>
            <div style={{ width: 1, height: 20, background: "rgba(180,124,60,0.2)" }} />
            <svg width="21" height="42" viewBox="0 0 14 28" fill="none" opacity="0.85">
              <line x1="7" y1="27" x2="7" y2="4" stroke="#c8924e" strokeWidth="1" />
              <path d="M2 6 Q7 2 12 6" stroke="#c8924e" strokeWidth="1" fill="none" />
              <path d="M5 27 L3 31 M9 27 L11 31" stroke="#c8924e" strokeWidth="2" />
            </svg>
            <div style={{ width: 1, height: 20, background: "rgba(180,124,60,0.2)" }} />
            <svg width="27" height="42" viewBox="0 0 18 28" fill="none" opacity="0.85">
              {[0, 1, 2, 3].map(i => <rect key={i} x={1 + i * 0.5} y={i * 5} width={16 - i} height="3" fill="#c8924e" opacity="0.6" rx="0.5" />)}
              <rect x="4" y="20" width="10" height="8" fill="none" stroke="#c8924e" strokeWidth="2" />
            </svg>
            <div style={{ width: 1, height: 20, background: "rgba(180,124,60,0.2)" }} />
            <svg width="21" height="42" viewBox="0 0 14 28" fill="none" opacity="0.85">
              <path d="M7 28 L7 2 Q14 8 10 18 Q8 22 7 28Z" fill="none" stroke="#c8924e" strokeWidth="2" />
              <path d="M4 8 Q7 6 10 8" stroke="#c8924e" strokeWidth="1.5" fill="none" />
              <path d="M4 13 Q7 11 10 13" stroke="#c8924e" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        </div>

        {/* Side torches — hidden on mobile via CSS */}
        {[-1, 1].map(side => (
          <div key={side} className="preloader-torch" style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            ...(side === -1 ? { left: "5vw" } : { right: "5vw" }),
            flexDirection: "column", alignItems: "center",
            opacity: isReveal ? 1 : 0, transition: "opacity 0.8s ease 0.2s",
          }}>
            <div style={{ animation: "flame-dance 2s ease-in-out infinite", transformOrigin: "bottom center", animationDelay: side === -1 ? "0s" : "0.4s" }}>
              <svg width="22" height="36" viewBox="0 0 22 36" fill="none">
                <path d="M11 33 Q4 26 7 18 Q9 11 11 4 Q13 11 15 18 Q18 26 11 33Z" fill="#e0a85a" opacity="0.9" />
                <path d="M11 30 Q6 24 8 17 Q10 12 11 8 Q12 13 14 18 Q16 24 11 30Z" fill="#fff8e1" opacity="0.7" />
                <path d="M11 27 Q9 21 10 16 Q11 13 11 11 Q11.5 14 12 18 Q13 23 11 27Z" fill="white" opacity="0.5" />
                <ellipse cx="11" cy="20" rx="7" ry="9" fill="#e0a85a" opacity="0.06" />
              </svg>
            </div>
            <div style={{ width: 8, height: 60, background: "linear-gradient(to bottom,#8B4513,#5C2E0A)", borderRadius: 2, marginTop: -4 }} />
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translate(-50%,-10px)",
              width: 60, height: 60, borderRadius: "50%",
              background: "radial-gradient(circle,rgba(224,168,90,0.25) 0%,transparent 70%)",
              filter: "blur(8px)",
              animation: "eye-glow 2s ease-in-out infinite",
              animationDelay: side === -1 ? "0s" : "1s",
            }} />
          </div>
        ))}
      </div>
    </>
  );
}