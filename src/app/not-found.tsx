"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&family=Barlow Condensed:wght@700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&family=Barlow Condensed:wght@700;800&display=swap');

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes particle-float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes glyph-fade {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.10; }
        }
        @keyframes scan-line {
          0%   { transform: scaleX(0); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: left; }
          50.01% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        @keyframes gold-shimmer {
          0%, 100% { background-position: 200% center; }
          50%       { background-position: -200% center; }
        }

        .not-found-page {
          min-height: 100vh;
          width: 100%;
          background: #0a0703;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 2rem;
          box-sizing: border-box;
        }

        .four-o-four {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(7rem, 18vw, 14rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1;
          background: linear-gradient(90deg, #b47c3c 0%, #f0e8d6 40%, #e8c87a 50%, #f0e8d6 60%, #b47c3c 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gold-shimmer 6s ease infinite;
          margin: 0;
          user-select: none;
        }

        .divider {
          width: 120px;
          height: 1px;
          background: linear-gradient(to right, transparent, #b47c3c, transparent);
          margin: 1.5rem auto;
        }

        .heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          font-size: clamp(1.2rem, 2.5vw, 1.8rem);
          letter-spacing: 0.1em;
          color: #f0e8d6;
          margin: 0 0 1rem;
          text-align: center;
        }

        .subtext {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          letter-spacing: 0.08em;
          color: rgba(180,124,60,0.55);
          text-align: center;
          max-width: 360px;
          line-height: 1.7;
          margin: 0 0 2.5rem;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary {
          padding: 0.75rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          text-decoration: none;
          color: #0a0703;
          background: #b47c3c;
          border: 1px solid #b47c3c;
          border-radius: 2px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #c98e4a; }

        .btn-outline {
          padding: 0.75rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          text-decoration: none;
          color: #b47c3c;
          background: transparent;
          border: 1px solid rgba(180,124,60,0.35);
          border-radius: 2px;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color: #b47c3c; color: #c98e4a; }

        .hieroglyph-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .glyph {
          position: absolute;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          color: #b47c3c;
          animation: glyph-fade 4s ease-in-out infinite;
          user-select: none;
        }
      `}</style>

      <div className="not-found-page">

        {/* Hieroglyph background glyphs */}
        <div className="hieroglyph-bg">
          {[
            { top: "8%", left: "4%", delay: "0s", char: "𓂀" },
            { top: "15%", left: "88%", delay: "1.2s", char: "𓆣" },
            { top: "72%", left: "6%", delay: "0.6s", char: "𓋹" },
            { top: "80%", left: "90%", delay: "2s", char: "𓂋" },
            { top: "40%", left: "2%", delay: "1.8s", char: "𓁿" },
            { top: "55%", left: "93%", delay: "0.3s", char: "𓆙" },
            { top: "25%", left: "50%", delay: "2.5s", char: "𓇯" },
            { top: "88%", left: "45%", delay: "1.5s", char: "𓆑" },
          ].map((g, i) => (
            <span
              key={i}
              className="glyph"
              style={{ top: g.top, left: g.left, animationDelay: g.delay }}
            >
              {g.char}
            </span>
          ))}
        </div>

        {/* Radial ambient glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,124,60,0.08) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        }} />

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 2, height: 2, borderRadius: "50%",
            background: "#b47c3c",
            left: `${10 + (i * 7) % 80}%`,
            bottom: 0,
            animation: `particle-float ${5 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.7) % 5}s`,
            opacity: 0,
            pointerEvents: "none",
            zIndex: 0,
          }} />
        ))}

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
        }}>

          {/* Eye of Horus */}
          <div style={{ marginBottom: "1.5rem", animation: "float-gentle 5s ease-in-out infinite" }}>
            <svg width="60" height="44" viewBox="0 0 60 44" fill="none" opacity="0.7">
              <path d="M2 22 Q30 2 58 22 Q30 42 2 22Z" stroke="#b47c3c" strokeWidth="1.2" fill="none" />
              <circle cx="30" cy="22" r="10" stroke="#b47c3c" strokeWidth="1" fill="none" />
              <circle cx="30" cy="22" r="4" fill="#b47c3c" opacity="0.8" />
              <path d="M30 32 Q25 40 30 44 Q35 40 30 32Z" stroke="#b47c3c" strokeWidth="0.8" fill="none" opacity="0.5" />
            </svg>
          </div>

          {/* 404 number */}
          <p className="four-o-four">404</p>

          <div className="divider" />

          <h1 className="heading">The scroll you seek is lost to time</h1>

          <p className="subtext">
            This page has crumbled to dust — or perhaps it never existed. Even the scribes of Alexandria could not find it.
          </p>

          {/* Scan line decoration */}
          <div style={{
            width: "100%", maxWidth: 320, height: 1, marginBottom: "2.5rem",
            background: "linear-gradient(to right, transparent, rgba(180,124,60,0.4), transparent)",
            animation: "scan-line 4s ease-in-out infinite",
          }} />

          <div className="nav-links">
            <Link href="/" className="btn-primary">Return Home</Link>
            <Link href="/events" className="btn-outline">Explore Events</Link>
          </div>

          {/* Bottom label */}
          <p style={{
            marginTop: "3rem",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(180,124,60,0.25)",
          }}>
            Prodyogiki &rsquo;26 — The Alchemical Renaissance
          </p>
        </div>
      </div>
    </>
  );
}
