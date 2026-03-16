"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Events", href: "/events", num: "01" },
  { label: "Members", href: "/members", num: "02" },
  { label: "Profile", href: "/Profile", num: "03" },
  { label: "Timeline", href: "/timeline", num: "04" },
];

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

// ── palette (mirrors site-wide alchemy theme) ────────────────────────────
const GOLD = "#b47c3c";
const GOLD_DIM = "rgba(180,124,60,0.18)";
const GOLD_MID = "rgba(180,124,60,0.35)";
const BG = "#0a0703";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        /* ── scan line that sweeps the nav bar on scroll ── */
        @keyframes scanLine {
          0%   { transform:scaleX(0); transform-origin:left; }
          50%  { transform:scaleX(1); transform-origin:left; }
          50.01%{ transform:scaleX(1); transform-origin:right; }
          100% { transform:scaleX(0); transform-origin:right; }
        }

        /* ── link hover underline draws from center ── */
        .nav-link-line {
          position:absolute; bottom:-2px; left:50%; right:50%;
          height:1px; background:${GOLD};
          transition:left 0.3s cubic-bezier(.22,1,.36,1),
                     right 0.3s cubic-bezier(.22,1,.36,1);
        }
        .nav-link-wrap:hover .nav-link-line {
          left:0; right:0;
        }

        /* ── big menu link ── */
        .menu-link {
          position:relative;
          display:flex; align-items:baseline; gap:14px;
          padding:14px 0;
          text-decoration:none;
          overflow:hidden;
          border-bottom:1px solid ${GOLD_DIM};
          transition:border-color 0.25s;
        }
        .menu-link:last-child { border-bottom:none; }
        .menu-link:hover { border-color:${GOLD}; }

        .menu-link-num {
          font-family:'Syne',sans-serif;
          font-size:10px; font-weight:700;
          letter-spacing:0.18em;
          color:${GOLD}; opacity:0.5;
          transition:opacity 0.25s;
          flex-shrink:0; line-height:1;
          margin-top:6px;
        }
        .menu-link:hover .menu-link-num { opacity:1; }

        .menu-link-text {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(2rem,5vw,2.8rem);
          font-weight:300;
          letter-spacing:0.06em;
          text-transform:uppercase;
          color:#f0e8d6;
          transition:color 0.25s, transform 0.3s cubic-bezier(.22,1,.36,1);
          display:block;
        }
        .menu-link:hover .menu-link-text {
          color:${GOLD};
          transform:translateX(8px);
        }

        /* ── gold shimmer on logo text ── */
        @keyframes goldShimmer {
          0%,100% { background-position:200% center; }
          50%     { background-position:-200% center; }
        }
        .logo-shimmer {
          background: linear-gradient(90deg,
            #b47c3c 0%, #f0e8d6 40%, #e8c87a 50%, #f0e8d6 60%, #b47c3c 100%);
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:goldShimmer 6s ease infinite;
        }

        /* ── panel entrance for auth buttons ── */
        @keyframes slideUp {
          from{opacity:0;transform:translateY(14px);}
          to{opacity:1;transform:translateY(0);}
        }

        /* ── cartouche tick marks on panel edge ── */
        .panel-ticks {
          position:absolute; left:0; top:0; bottom:0;
          width:3px; display:flex; flex-direction:column;
          justify-content:space-evenly; padding:20px 0;
          pointer-events:none;
        }
        .panel-tick {
          width:3px; height:8px;
          background:${GOLD}; opacity:0.25; border-radius:1px;
        }
        .panel-tick.lg { height:14px; opacity:0.4; }
      `}</style>

      {/* ════════════ TOP BAR ════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem",
        height: 64,
        background: scrolled
          ? "rgba(8,6,3,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${GOLD_DIM}`
          : "1px solid transparent",
        transition: "background 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
      }}>

        {/* scan line — appears on scroll */}
        {scrolled && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(to right,transparent,${GOLD},transparent)`,
            animation: "scanLine 3s ease 0.2s both",
            pointerEvents: "none",
          }} />
        )}

        {/* ── Logo ── */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          {/* mini eye glyph */}
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none"
            style={{ flexShrink: 0, opacity: 0.8 }}>
            <path d="M1 8 Q11 1 21 8 Q11 15 1 8Z" stroke={GOLD} strokeWidth="0.9" fill="none" />
            <circle cx="11" cy="8" r="3.5" stroke={GOLD} strokeWidth="0.8" fill="none" />
            <circle cx="11" cy="8" r="1.4" fill={GOLD} opacity="0.9" />
            {/* tear */}
            <path d="M11 11.5 Q8.5 15 11 17 Q13.5 15 11 11.5Z"
              stroke={GOLD} strokeWidth="0.6" fill="none" opacity="0.6" />
          </svg>
          <span className="logo-shimmer" style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: "2rem", fontWeight: 800,
            letterSpacing: "0.28em", textTransform: "uppercase",
          }}>
            Prodyogiki&rsquo;26
          </span>
        </Link>

        {/* ── right side: subtle label + burger ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* current section hint (hidden on mobile) */}
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 10, letterSpacing: "0.22em",
            textTransform: "uppercase", color: "rgba(180,124,60,0.45)",
            display: isOpen ? "none" : "block",
          }}>
            Menu
          </span>

          {/* ── Burger ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              position: "relative", zIndex: 1100,
              width: 44, height: 44,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 5, cursor: "pointer",
              background: "transparent", border: "none", padding: 0,
            }}
          >
            {/* animated burger lines */}
            {[
              { w: 24, delay: 0, rotate: isOpen ? "translateY(7px) rotate(45deg)" : "none" },
              { w: 16, delay: 0, rotate: isOpen ? "translateX(20px)" : "none", op: isOpen ? 0 : 1 },
              { w: 24, delay: 0, rotate: isOpen ? "translateY(-7px) rotate(-45deg)" : "none" },
            ].map(({ w, rotate, op }, i) => (
              <span key={i} style={{
                display: "block", width: w, height: "1.5px",
                background: GOLD,
                transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
                transformOrigin: "center",
                transform: rotate,
                opacity: op ?? 1,
              }} />
            ))}

            {/* hover ring */}
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: `1px solid ${GOLD_DIM}`,
              transition: "border-color 0.25s, transform 0.25s",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = GOLD_MID)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = GOLD_DIM)}
            />
          </button>
        </div>
      </nav>

      {/* ════════════ OVERLAY ════════════════════════════════════════════ */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1050,
        display: "flex",
        pointerEvents: isOpen ? "auto" : "none",
      }}>
        {/* Backdrop */}
        <div onClick={() => setIsOpen(false)} style={{
          position: "absolute", inset: 0,
          background: "rgba(4,3,2,0.75)",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.45s ease",
        }} />

        {/* ── Slide panel ── */}
        <div style={{
          position: "absolute", right: 0, top: 0,
          height: "100%", width: "100%", maxWidth: 460,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "0 3rem",
          background: `linear-gradient(160deg,${BG} 0%,#110d07 60%,${BG} 100%)`,
          borderLeft: `1px solid ${GOLD_DIM}`,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          overflow: "hidden",
        }}>

          {/* cartouche tick strip on left edge */}
          <div className="panel-ticks">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className={`panel-tick ${i % 4 === 0 ? "lg" : ""}`} />
            ))}
          </div>

          {/* ambient inner glow */}
          <div style={{
            position: "absolute", width: 300, height: 300,
            top: "10%", right: "-80px", borderRadius: "50%",
            background: `radial-gradient(circle,rgba(180,124,60,0.07) 0%,transparent 65%)`,
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", width: 200, height: 200,
            bottom: "15%", left: "-40px", borderRadius: "50%",
            background: `radial-gradient(circle,rgba(140,80,20,0.06) 0%,transparent 65%)`,
            pointerEvents: "none",
          }} />

          {/* ── top ornament ── */}
          <div style={{
            position: "absolute", top: "2.5rem", left: "3rem",
            display: "flex", alignItems: "center", gap: 10,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(-8px)",
            transition: "all 0.4s ease 0.1s",
          }}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M0.5 7 Q9 0.5 17.5 7 Q9 13.5 0.5 7Z"
                stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.5" />
              <circle cx="9" cy="7" r="2.5" stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.5" />
              <circle cx="9" cy="7" r="1" fill={GOLD} opacity="0.5" />
            </svg>
            <span style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: 9, letterSpacing: "0.28em",
              textTransform: "uppercase", color: GOLD, fontWeight: 700, opacity: 0.5,
            }}>Navigation</span>
          </div>

          {/* ── Nav links ── */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 32 }}>
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="menu-link"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(36px)",
                  transition: `opacity 0.4s ease ${0.12 + i * 0.07}s, transform 0.4s cubic-bezier(.22,1,.36,1) ${0.12 + i * 0.07}s, border-color 0.25s`,
                }}
              >
                <span className="menu-link-num">{link.num}</span>
                <span className="menu-link-text">{link.label}</span>

                {/* arrow that slides in on hover */}
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"
                  style={{
                    position: "absolute", right: 4, opacity: 0,
                    transition: "opacity 0.25s, transform 0.3s cubic-bezier(.22,1,.36,1)",
                  }}
                  onMouseEnter={e => {
                    const svg = e.currentTarget;
                    svg.style.opacity = "1";
                    svg.style.transform = "translateX(0)";
                  }}
                >
                  <path d="M1 5h12M8 1l4 4-4 4" stroke={GOLD} strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>

          {/* ── divider with diamond ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            marginBottom: 28,
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.4s ease 0.48s",
          }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,transparent,${GOLD_MID})` }} />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <polygon points="5,0 10,5 5,10 0,5" fill={GOLD} opacity="0.6" />
              <polygon points="5,2.5 7.5,5 5,7.5 2.5,5" fill={BG} />
              <circle cx="5" cy="5" r="1.2" fill={GOLD} opacity="0.8" />
            </svg>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to left,transparent,${GOLD_MID})` }} />
          </div>

          {/* ── Auth buttons ── */}
          <div style={{
            display: "flex", gap: 12,
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(14px)",
            transition: "all 0.4s ease 0.52s",
          }}>
            <Link href="/login" onClick={() => setIsOpen(false)}
              style={{
                flex: 1, textAlign: "center",
                padding: "11px 20px",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11, fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.18em",
                textDecoration: "none",
                color: GOLD,
                border: `1px solid ${GOLD_DIM}`,
                borderRadius: 2,
                clipPath: "polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)",
                transition: "border-color 0.22s, background 0.22s, color 0.22s",
              }}
              onMouseEnter={e => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.borderColor = GOLD;
                a.style.background = "rgba(180,124,60,0.08)";
              }}
              onMouseLeave={e => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.borderColor = GOLD_DIM;
                a.style.background = "transparent";
              }}
            >
              Login
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)}
              style={{
                flex: 1, textAlign: "center",
                padding: "11px 20px",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 11, fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.18em",
                textDecoration: "none",
                color: BG,
                background: GOLD,
                border: `1px solid ${GOLD}`,
                borderRadius: 2,
                clipPath: "polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%)",
                transition: "background 0.22s, transform 0.18s",
              }}
              onMouseEnter={e => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.background = "#c98e4a";
                a.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                const a = e.currentTarget as HTMLAnchorElement;
                a.style.background = GOLD;
                a.style.transform = "translateY(0)";
              }}
            >
              Sign Up
            </Link>
          </div>

          {/* ── bottom cartouche rule ── */}
          <div style={{
            position: "absolute", bottom: "2.5rem",
            left: "3rem", right: "3rem",
            opacity: isOpen ? 0.22 : 0,
            transition: "opacity 0.4s ease 0.6s",
          }}>
            {/* mini cartouche border */}
            <svg width="100%" height="14" viewBox="0 0 300 14"
              preserveAspectRatio="xMidYMid slice" style={{ display: "block" }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={i} transform={`translate(${i * 20 - 5},0)`}>
                  <rect x="1" y="4" width="18" height="6" rx="1"
                    fill="none" stroke={GOLD} strokeWidth="0.6" />
                  <line x1="7" y1="4" x2="7" y2="10" stroke={GOLD} strokeWidth="0.5" />
                  <line x1="13" y1="4" x2="13" y2="10" stroke={GOLD} strokeWidth="0.5" />
                  <circle cx="10" cy="2" r="1" fill={GOLD} opacity="0.7" />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
