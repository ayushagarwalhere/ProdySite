"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { label: "Events", href: "/events", num: "01" },
  { label: "Members", href: "/members", num: "02" },
  { label: "Profile", href: "/Profile", num: "03" },
  { label: "Timeline", href: "/timeline", num: "04" },
];

const GOLD = "#b47c3c";
const GOLD_DIM = "rgba(180,124,60,0.18)";
const GOLD_MID = "rgba(180,124,60,0.35)";
const BG = "#0a0703";

export default function Navbar() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&family=Barlow+Condensed:wght@600;700;800&display=swap');

        /* ── logo shimmer — very slow, almost imperceptible ── */
        @keyframes goldShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .logo-shimmer {
          background: linear-gradient(
            90deg,
            #b47c3c 0%,
            #b47c3c 25%,
            #e8c87a 42%,
            #f5edd8 50%,
            #e8c87a 58%,
            #b47c3c 75%,
            #b47c3c 100%
          );
          background-size: 400% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmer 14s linear infinite;
        }

        /* ── scan line on scroll ── */
        @keyframes scanLine {
          0%   { transform: scaleX(0); transform-origin: left;  }
          50%  { transform: scaleX(1); transform-origin: left;  }
          50.01% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }

        /* ── nav link underline draws from center ── */
        .nav-link-line {
          position: absolute; bottom: -2px; left: 50%; right: 50%;
          height: 1px; background: ${GOLD};
          transition: left .3s cubic-bezier(.22,1,.36,1), right .3s cubic-bezier(.22,1,.36,1);
        }
        .nav-link-wrap:hover .nav-link-line { left: 0; right: 0; }

        /* ── panel ticks ── */
        .panel-ticks {
          position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; display: flex; flex-direction: column;
          justify-content: space-evenly; padding: 20px 0; pointer-events: none;
        }
        .panel-tick { width: 3px; height: 8px; background: ${GOLD}; opacity: .25; border-radius: 1px; }
        .panel-tick.lg { height: 14px; opacity: .4; }

        /* ── menu link ── */
        .menu-link {
          position: relative;
          display: flex; align-items: baseline; gap: 14px;
          padding: 11px 0;
          text-decoration: none;
          overflow: hidden;
          border-bottom: 1px solid ${GOLD_DIM};
          transition: border-color .25s;
        }
        .menu-link:last-child { border-bottom: none; }
        .menu-link:hover { border-color: rgba(180,124,60,0.45); }

        .menu-link-num {
          font-family: 'Syne', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: .18em;
          color: ${GOLD}; opacity: .4;
          transition: opacity .25s, letter-spacing .3s ease;
          flex-shrink: 0; line-height: 1; margin-top: 4px;
        }
        .menu-link:hover .menu-link-num {
          opacity: 1;
          letter-spacing: .28em;
        }

        .menu-link-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.5rem, 3.5vw, 2rem);
          font-weight: 300;
          letter-spacing: .04em;
          text-transform: uppercase;
          color: #f0e8d6;
          transition: color .25s, transform .35s cubic-bezier(.22,1,.36,1), letter-spacing .35s ease;
          display: block;
        }
        .menu-link:hover .menu-link-text {
          color: ${GOLD};
          transform: translateX(10px);
          letter-spacing: .08em;
        }

        /* ── menu link arrow ── */
        .menu-link-arrow {
          position: absolute; right: 6px; top: 50%; transform: translateY(-50%) translateX(8px);
          opacity: 0;
          transition: opacity .25s, transform .35s cubic-bezier(.22,1,.36,1);
        }
        .menu-link:hover .menu-link-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(0);
        }

        /* ── menu link bg sweep ── */
        .menu-link::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to right, rgba(180,124,60,0.04), transparent);
          transform: translateX(-100%);
          transition: transform .4s cubic-bezier(.22,1,.36,1);
        }
        .menu-link:hover::before { transform: translateX(0); }

        /* ── auth button hover ── */
        .auth-btn-ghost {
          flex: 1; text-align: center;
          padding: 11px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .18em;
          text-decoration: none;
          color: ${GOLD};
          border: 1px solid ${GOLD_DIM};
          border-radius: 2px;
          clip-path: polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);
          transition: border-color .22s, background .22s, letter-spacing .3s;
        }
        .auth-btn-ghost:hover {
          border-color: ${GOLD};
          background: rgba(180,124,60,0.08);
          letter-spacing: .22em;
        }

        .auth-btn-solid {
          flex: 1; text-align: center;
          padding: 11px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500;
          text-transform: uppercase; letter-spacing: .18em;
          text-decoration: none;
          color: ${BG};
          background: ${GOLD};
          border: 1px solid ${GOLD};
          border-radius: 2px;
          clip-path: polygon(5px 0%,100% 0%,calc(100% - 5px) 100%,0% 100%);
          transition: background .22s, transform .18s, letter-spacing .3s;
        }
        .auth-btn-solid:hover {
          background: #c98e4a;
          transform: translateY(-1px);
          letter-spacing: .22em;
        }

        /* ── burger ring ── */
        .burger-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 1px solid ${GOLD_DIM};
          transition: border-color .25s, transform .3s ease;
        }
        .burger-ring:hover {
          border-color: ${GOLD_MID};
          transform: scale(1.08);
        }

        /* ── "Menu" label hover ── */
        .menu-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; letter-spacing: .25em; font-weight:1000;
          text-transform: uppercase; color: rgba(180,124,60,0.4);
          transition: color .25s, letter-spacing .3s ease;
          cursor: default;
        }
        .menu-label:hover { color: rgba(180,124,60,0.75); letter-spacing: .32em; }

        /* ── overlay close button ── */
        .close-btn {
          position: absolute; top: 2rem; right: 2.25rem; z-index: 2;
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid ${GOLD_DIM};
          background: transparent;
          display: grid; place-items: center;
          cursor: pointer;
          transition: border-color .25s, background .25s;
        }
        .close-btn:hover {
          border-color: ${GOLD};
          background: rgba(180,124,60,0.08);
        }
        .close-btn-line {
          position: absolute;
          width: 16px; height: 1.5px;
          background: ${GOLD};
        }
        .close-btn-line.first { transform: rotate(45deg); }
        .close-btn-line.second { transform: rotate(-45deg); }
      `}</style>

      {/* ════════ TOP BAR ════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
          height: 64,
          background: "rgba(8,6,3,0.88)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${GOLD_DIM}`,
          transition:
            "background .5s ease, border-color .5s ease, backdrop-filter .5s ease",
        }}
      >
        {scrolled && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(to right,transparent,${GOLD},transparent)`,
              animation: "scanLine 3s ease .2s both",
              pointerEvents: "none",
            }}
          />
        )}

        {/* logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            style={{ flexShrink: 0, opacity: 0.8 }}
          >
            <path
              d="M1 8 Q11 1 21 8 Q11 15 1 8Z"
              stroke={GOLD}
              strokeWidth="0.9"
              fill="none"
            />
            <circle
              cx="11"
              cy="8"
              r="3.5"
              stroke={GOLD}
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="11" cy="8" r="1.4" fill={GOLD} opacity="0.9" />
            <path
              d="M11 11.5 Q8.5 15 11 17 Q13.5 15 11 11.5Z"
              stroke={GOLD}
              strokeWidth="0.6"
              fill="none"
              opacity="0.6"
            />
          </svg>
          <span
            className="logo-shimmer"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "1.85rem",
              fontWeight: 800,
              letterSpacing: ".28em",
              textTransform: "uppercase",
            }}
          >
            Prodyogiki&rsquo;26
          </span>
        </Link>

        {/* right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {!isOpen && !isMobile && <span className="menu-label">Menu</span>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            style={{
              position: "relative",
              zIndex: 1100,
              width: 44,
              height: 44,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              cursor: "pointer",
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            {[
              { w: 24, tf: isOpen ? "translateY(7px) rotate(45deg)" : "none" },
              {
                w: 16,
                tf: isOpen ? "translateX(20px)" : "none",
                op: isOpen ? 0 : 1,
              },
              {
                w: 24,
                tf: isOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              },
            ].map(({ w, tf, op }, i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: w,
                  height: "1.5px",
                  background: GOLD,
                  transition: "all .35s cubic-bezier(.22,1,.36,1)",
                  transformOrigin: "center",
                  transform: tf,
                  opacity: op ?? 1,
                }}
              />
            ))}
            <span className="burger-ring" />
          </button>
        </div>
      </nav>

      {/* ════════ OVERLAY ════════ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1050,
          display: "flex",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(4,3,2,.75)",
            opacity: isOpen ? 1 : 0,
            transition: "opacity .45s ease",
          }}
        />

        {/* slide panel */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: "100%",
            maxWidth: 460,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 3rem",
            background: `linear-gradient(160deg,${BG} 0%,#110d07 60%,${BG} 100%)`,
            borderLeft: `1px solid ${GOLD_DIM}`,
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform .5s cubic-bezier(.22,1,.36,1)",
            overflow: "hidden",
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="close-btn"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-8px)",
              transition:
                "opacity .3s ease .1s, transform .3s ease .1s, border-color .25s, background .25s",
            }}
          >
            <span className="close-btn-line first" />
            <span className="close-btn-line second" />
          </button>

          <div className="panel-ticks">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`panel-tick ${i % 4 === 0 ? "lg" : ""}`}
              />
            ))}
          </div>

          {/* ambient glows */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              top: "10%",
              right: "-80px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(180,124,60,.07) 0%,transparent 65%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              bottom: "15%",
              left: "-40px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(140,80,20,.06) 0%,transparent 65%)",
              pointerEvents: "none",
            }}
          />

          {/* top ornament */}
          <div
            style={{
              position: "absolute",
              top: "2.5rem",
              left: "3rem",
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-8px)",
              transition: "all .4s ease .1s",
            }}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path
                d="M0.5 7 Q9 0.5 17.5 7 Q9 13.5 0.5 7Z"
                stroke={GOLD}
                strokeWidth="0.8"
                fill="none"
                opacity="0.5"
              />
              <circle
                cx="9"
                cy="7"
                r="2.5"
                stroke={GOLD}
                strokeWidth="0.7"
                fill="none"
                opacity="0.5"
              />
              <circle cx="9" cy="7" r="1" fill={GOLD} opacity="0.5" />
            </svg>
            <span
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 9,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: GOLD,
                fontWeight: 700,
                opacity: 0.5,
              }}
            >
              Navigation
            </span>
          </div>

          {/* nav links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 28,
            }}
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="menu-link"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(36px)",
                  transition: `opacity .4s ease ${0.12 + i * 0.07}s, transform .4s cubic-bezier(.22,1,.36,1) ${0.12 + i * 0.07}s, border-color .25s`,
                }}
              >
                <span className="menu-link-num">{link.num}</span>
                <span className="menu-link-text">{link.label}</span>
                <svg
                  className="menu-link-arrow"
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                >
                  <path
                    d="M1 5h12M8 1l4 4-4 4"
                    stroke={GOLD}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </div>

          {/* divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
              opacity: isOpen ? 1 : 0,
              transition: "opacity .4s ease .48s",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: `linear-gradient(to right,transparent,${GOLD_MID})`,
              }}
            />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <polygon points="5,0 10,5 5,10 0,5" fill={GOLD} opacity="0.6" />
              <polygon points="5,2.5 7.5,5 5,7.5 2.5,5" fill={BG} />
              <circle cx="5" cy="5" r="1.2" fill={GOLD} opacity="0.8" />
            </svg>
            <div
              style={{
                flex: 1,
                height: 1,
                background: `linear-gradient(to left,transparent,${GOLD_MID})`,
              }}
            />
          </div>

          {/* auth buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(14px)",
              transition: "all .4s ease .52s",
            }}
          >
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="auth-btn-ghost"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsOpen(false)}
              className="auth-btn-solid"
            >
              Sign Up
            </Link>
          </div>

          {/* bottom cartouche */}
          <div
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "3rem",
              right: "3rem",
              opacity: isOpen ? 0.22 : 0,
              transition: "opacity .4s ease .6s",
            }}
          >
            <svg
              width="100%"
              height="14"
              viewBox="0 0 300 14"
              preserveAspectRatio="xMidYMid slice"
              style={{ display: "block" }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={i} transform={`translate(${i * 20 - 5},0)`}>
                  <rect
                    x="1"
                    y="4"
                    width="18"
                    height="6"
                    rx="1"
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="0.6"
                  />
                  <line
                    x1="7"
                    y1="4"
                    x2="7"
                    y2="10"
                    stroke={GOLD}
                    strokeWidth="0.5"
                  />
                  <line
                    x1="13"
                    y1="4"
                    x2="13"
                    y2="10"
                    stroke={GOLD}
                    strokeWidth="0.5"
                  />
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
