"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Members", href: "/members" },
  { label: "Timeline", href: "/timeline" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Profile", href: "/Profile" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/teamistenith/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/iste-nith",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "ISTE",
    href: "https://iste.nith.ac.in",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="14" textAnchor="middle" fontSize="7" fontFamily="Cinzel, serif" fill="currentColor">I</text>
        <path d="M7 18h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Column({ height = 220 }: { height?: number }) {
  return (
    <svg width="36" height={height} viewBox={`0 0 36 ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="0" y="0" width="36" height="6" fill="#c8924e" opacity="0.7" rx="1" />
      <rect x="3" y="6" width="30" height="4" fill="#c8924e" opacity="0.5" rx="1" />
      <rect x="6" y="10" width="24" height="3" fill="#c8924e" opacity="0.4" />
      <path d="M6 10 Q2 8 4 5 Q6 2 8 5 Q10 7 8 9" stroke="#c8924e" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M30 10 Q34 8 32 5 Q30 2 28 5 Q26 7 28 9" stroke="#c8924e" strokeWidth="0.8" fill="none" opacity="0.6" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={9 + i * 3} y1="13" x2={9 + i * 2.5} y2={height - 16} stroke="#c8924e" strokeWidth="0.5" opacity="0.2" />
      ))}
      <rect x="7" y="13" width="22" height={height - 29} fill="#c8924e" opacity="0.06" rx="1" />
      <line x1="7" y1="13" x2="7" y2={height - 16} stroke="#c8924e" strokeWidth="0.8" opacity="0.3" />
      <line x1="29" y1="13" x2="29" y2={height - 16} stroke="#c8924e" strokeWidth="0.8" opacity="0.3" />
      <path d={`M7 13 Q6 ${height / 2} 7 ${height - 16}`} stroke="#c8924e" strokeWidth="0.4" fill="none" opacity="0.2" />
      <path d={`M29 13 Q30 ${height / 2} 29 ${height - 16}`} stroke="#c8924e" strokeWidth="0.4" fill="none" opacity="0.2" />
      <rect x="6" y={height - 16} width="24" height="3" fill="#c8924e" opacity="0.4" rx="1" />
      <rect x="3" y={height - 13} width="30" height="4" fill="#c8924e" opacity="0.5" rx="1" />
      <rect x="0" y={height - 9} width="36" height="9" fill="#c8924e" opacity="0.6" rx="1" />
    </svg>
  );
}

function MeanderBorder({ width = 1200 }: { width?: number }) {
  const unit = 12;
  const repeat = Math.ceil(width / (unit * 8)) + 2;
  const paths = [];
  for (let i = 0; i < repeat; i++) {
    const x = i * unit * 8;
    paths.push(`M${x} 0 h${unit * 2} v${unit} h-${unit} v${unit} h${unit * 2} v-${unit * 2} h${unit * 2} v${unit * 3} h-${unit * 5} v-${unit}`);
  }
  return (
    <svg width="100%" height={unit * 3 + 2} viewBox={`0 0 ${width} ${unit * 3 + 2}`} preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      {paths.map((d, i) => (
        <path key={i} d={d} stroke="#c8924e" strokeWidth="1.2" opacity="0.35" strokeLinecap="square" strokeLinejoin="miter" />
      ))}
    </svg>
  );
}

function TorchFlame() {
  return (
    <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
      <rect x="10" y="26" width="4" height="14" fill="#c8924e" opacity="0.6" rx="1" />
      <rect x="9" y="23" width="6" height="5" fill="#c8924e" opacity="0.7" rx="1" />
      <path d="M12 22 Q6 16 9 10 Q11 5 12 2 Q13 5 15 10 Q18 16 12 22Z" fill="#e0a85a" opacity="0.9" />
      <path d="M12 20 Q8 15 10 10 Q11 7 12 5 Q13 8 14 12 Q16 17 12 20Z" fill="#fff8e1" opacity="0.7" />
      <path d="M12 18 Q10 14 11 11 Q12 9 12 8 Q12.5 10 13 13 Q14 16 12 18Z" fill="white" opacity="0.5" />
      <ellipse cx="12" cy="14" rx="8" ry="10" fill="#e0a85a" opacity="0.08" />
    </svg>
  );
}

function EmberParticles() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: i % 2 === 0 ? 2 : 3,
            height: i % 2 === 0 ? 2 : 3,
            borderRadius: "50%",
            background: i % 3 === 0 ? "#fff8e1" : "#e0a85a",
            left: `${15 + i * 12}%`,
            bottom: "100%",
            animation: `ember-rise ${2 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
            pointerEvents: "none",
            opacity: 0,
          }}
        />
      ))}
    </>
  );
}

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dy: -(Math.random() * 0.3 + 0.1),
      dx: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.3 + 0.05,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224,168,90,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=DM+Sans:wght@300;400;500&family=Barlow+Condensed:wght@300;600;700&display=swap');

        @keyframes ember-rise {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-40px) translateX(8px) scale(0.3); opacity: 0; }
        }
        @keyframes flame-flicker {
          0%,100% { transform: scaleX(1) scaleY(1) rotate(-1deg); }
          33%     { transform: scaleX(0.95) scaleY(1.04) rotate(1deg); }
          66%     { transform: scaleX(1.04) scaleY(0.97) rotate(-0.5deg); }
        }
        @keyframes glow-pulse {
          0%,100% { opacity: 0.15; }
          50%     { opacity: 0.28; }
        }
        @keyframes float-up {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-4px); }
        }
        @keyframes scanline {
          0%   { transform: scaleX(0); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: left; }
          50.01% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }

        .footer-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          color: rgba(200,146,78,0.55);
          text-decoration: none;
          transition: color 0.25s;
          position: relative;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 100%;
          height: 1px;
          background: #c8924e;
          transition: right 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .footer-link:hover { color: #e0a85a; }
        .footer-link:hover::after { right: 0; }

        .social-btn {
          width: 36px; height: 36px;
          border: 1px solid rgba(180,124,60,0.25);
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(200,146,78,0.5);
          background: transparent;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, background 0.25s, transform 0.2s;
          text-decoration: none;
          clip-path: polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);
        }
        .social-btn:hover {
          border-color: #c8924e;
          color: #e0a85a;
          background: rgba(180,124,60,0.08);
          transform: translateY(-2px);
        }

        .torch-wrap {
          animation: flame-flicker 2.5s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .footer-title-glyph {
          font-family: 'Cinzel Decorative', 'Cinzel', serif;
          font-size: clamp(1.3rem, 5vw, 2.4rem);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #f5ead8;
          line-height: 1;
          margin: 0;
        }

        /* ── Responsive layout ── */

        /* Columns hidden on small screens */
        .footer-col-left,
        .footer-col-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          position: relative;
        }

        .footer-body-row {
          display: flex;
          align-items: flex-end;
          gap: 2rem;
        }

        .footer-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* Tablet: hide columns, compress layout */
        @media (max-width: 768px) {
          .footer-col-left,
          .footer-col-right {
            display: none;
          }

          .footer-body-row {
            gap: 0;
          }

          .footer-bottom-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.75rem;
          }

          .footer-copyright,
          .footer-tagline {
            text-align: center !important;
          }
        }

        /* Mobile: tighten padding & nav */
        @media (max-width: 480px) {
          .footer-nav {
            gap: 0.4rem 1.5rem !important;
          }

          .footer-brand-section {
            margin-bottom: 1.8rem !important;
          }

          .footer-divider {
            margin-bottom: 1.8rem !important;
          }

          .footer-center-pad {
            padding-bottom: 2rem !important;
          }
        }
      `}</style>

      <footer
        style={{
          position: "relative",
          background: "#060401",
          overflow: "hidden",
          borderTop: "1px solid rgba(180,124,60,0.15)",
        }}
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Ambient radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(600px, 100%)",
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(180,124,60,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 0,
            animation: "glow-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Top meander border */}
        <div style={{ position: "relative", zIndex: 1, lineHeight: 0 }}>
          <MeanderBorder />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(to right, transparent, rgba(180,124,60,0.6), transparent)",
              animation: "scanline 6s ease-in-out infinite",
            }}
          />
        </div>

        {/* ── MAIN FOOTER BODY ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "3rem 5vw 0",
          }}
        >
          <div className="footer-body-row">
            {/* LEFT COLUMN — hidden on mobile */}
            <div className="footer-col-left">
              <div className="torch-wrap" style={{ marginBottom: 6 }}>
                <TorchFlame />
              </div>
              <div style={{ position: "relative" }}>
                <EmberParticles />
              </div>
              <Column height={200} />
            </div>

            {/* CENTER — main content */}
            <div className="footer-center-pad" style={{ flex: 1, minWidth: 0, paddingBottom: "2.5rem" }}>
              {/* Brand mark */}
              <div className="footer-brand-section" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(180,124,60,0.4))" }} />
                  <svg width="36" height="26" viewBox="0 0 52 38" fill="none" style={{ animation: "float-up 4s ease-in-out infinite", flexShrink: 0 }}>
                    <path d="M2 19 Q26 2 50 19 Q26 36 2 19Z" stroke="#c8924e" strokeWidth="1.2" fill="none" opacity="0.7" />
                    <circle cx="26" cy="19" r="8" stroke="#c8924e" strokeWidth="1" fill="none" opacity="0.7" />
                    <circle cx="26" cy="19" r="4" fill="#c8924e" opacity="0.6" />
                    <path d="M26 27 Q22 33 26 36 Q30 33 26 27Z" stroke="#c8924e" strokeWidth="0.8" fill="none" opacity="0.4" />
                  </svg>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(180,124,60,0.4))" }} />
                </div>

                <h2 className="footer-title-glyph">Prodyogiki&nbsp;&rsquo;26</h2>
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(0.55rem, 1.5vw, 0.7rem)",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "rgba(200,146,78,0.45)",
                    margin: "0.5rem 0 0",
                    fontWeight: 400,
                  }}
                >
                  The Alchemical Renaissance
                </p>
              </div>

              {/* Nav links */}
              <nav
                className="footer-nav"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.4rem 2.5rem",
                  marginBottom: "2.5rem",
                }}
              >
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Cartouche divider */}
              <div
                className="footer-divider"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: "2.5rem",
                  opacity: 0.5,
                }}
              >
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(180,124,60,0.5))" }} />
                <svg width="60" height="20" viewBox="0 0 60 20" fill="none" style={{ flexShrink: 0 }}>
                  <rect x="1" y="1" width="58" height="18" rx="9" stroke="#c8924e" strokeWidth="0.8" />
                  <circle cx="15" cy="10" r="3" stroke="#c8924e" strokeWidth="0.7" fill="none" />
                  <line x1="22" y1="7" x2="22" y2="13" stroke="#c8924e" strokeWidth="0.7" />
                  <circle cx="30" cy="10" r="2" fill="#c8924e" opacity="0.6" />
                  <line x1="38" y1="7" x2="38" y2="13" stroke="#c8924e" strokeWidth="0.7" />
                  <circle cx="45" cy="10" r="3" stroke="#c8924e" strokeWidth="0.7" fill="none" />
                  <line x1="1" y1="20" x2="59" y2="20" stroke="#c8924e" strokeWidth="0.8" />
                  <line x1="1" y1="22" x2="59" y2="22" stroke="#c8924e" strokeWidth="0.5" opacity="0.4" />
                </svg>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(180,124,60,0.5))" }} />
              </div>

              {/* Bottom row */}
              <div className="footer-bottom-row">
                <p
                  className="footer-copyright"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem",
                    color: "rgba(200,146,78,0.3)",
                    letterSpacing: "0.1em",
                    margin: 0,
                  }}
                >
                  © {year} Prodyogiki · NIT Hamirpur
                </p>

                {/* Social icons */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {SOCIALS.map((s) => (
                    <Link key={s.label} href={s.href} className="social-btn" aria-label={s.label}>
                      {s.icon}
                    </Link>
                  ))}
                </div>

                <p
                  className="footer-tagline"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(0.5rem, 1.2vw, 0.62rem)",
                    color: "rgba(200,146,78,0.22)",
                    letterSpacing: "0.2em",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  Where ancient wisdom meets modern innovation
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN — hidden on mobile */}
            <div className="footer-col-right">
              <div className="torch-wrap" style={{ marginBottom: 6, animationDelay: "0.8s" }}>
                <TorchFlame />
              </div>
              <div style={{ position: "relative" }}>
                <EmberParticles />
              </div>
              <Column height={200} />
            </div>
          </div>
        </div>

        {/* Bottom meander border */}
        <div style={{ position: "relative", zIndex: 1, transform: "scaleY(-1)", lineHeight: 0 }}>
          <MeanderBorder />
        </div>

        {/* Floor slab */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: 8,
            background: "linear-gradient(to bottom, rgba(180,124,60,0.18), rgba(180,124,60,0.06))",
            borderTop: "1px solid rgba(180,124,60,0.2)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, height: 4, background: "rgba(180,124,60,0.04)" }} />
      </footer>
    </>
  );
}