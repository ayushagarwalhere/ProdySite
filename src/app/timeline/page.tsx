"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */

const DAYS = [
  {
    date: "April 3",
    day: "Day I",
    glyph: "𓂀",
    title: "The Opening of the Gates",
    sub: "Inauguration & Cultural Ignition",
    events: [
      { t: "09:00 AM", icon: "𓋴", title: "Sacred Inauguration", desc: "Lighting of the eternal flame" },
      { t: "10:30 AM", icon: "𓅓", title: "The Procession", desc: "Welcome march & felicitation" },
      { t: "12:00 PM", icon: "𓆓", title: "Feast of the Nile", desc: "Lunch & networking" },
      { t: "02:00 PM", icon: "𓏛", title: "Papyrus Scrolls", desc: "Paper presentations" },
      { t: "04:00 PM", icon: "𓂋", title: "The Arena Opens", desc: "Hackathon kickoff" },
      { t: "06:30 PM", icon: "𓇯", title: "Twilight Offerings", desc: "Cultural performances" },
      { t: "08:00 PM", icon: "𓇳", title: "Night of Osiris", desc: "Bonfire & stargazing" },
    ],
  },
  {
    date: "April 4",
    day: "Day II",
    glyph: "𓂃",
    title: "The Trial of the Pharaoh",
    sub: "Competitions & Showdowns",
    events: [
      { t: "08:30 AM", icon: "𓅱", title: "Dawn Council", desc: "Morning briefing" },
      { t: "10:00 AM", icon: "𓆑", title: "Battle of Wits", desc: "Quiz & debate" },
      { t: "11:30 AM", icon: "𓇋", title: "Artisan's Court", desc: "Design sprint" },
      { t: "01:00 PM", icon: "𓆓", title: "Solar Feast", desc: "Lunch break" },
      { t: "03:00 PM", icon: "𓂋", title: "Gladiators of Code", desc: "Hackathon finals" },
      { t: "05:00 PM", icon: "𓅓", title: "The Colosseum", desc: "Sports tournament" },
      { t: "07:30 PM", icon: "𓇯", title: "Voices of the Sphinx", desc: "Battle of Bands" },
      { t: "09:30 PM", icon: "𓇳", title: "Grand Banquet", desc: "Awards night I" },
    ],
  },
  {
    date: "April 5",
    day: "Day III",
    glyph: "𓊹",
    title: "The Eternal Return",
    sub: "Grand Finale & Valediction",
    events: [
      { t: "09:00 AM", icon: "𓅱", title: "The Last Rites", desc: "Final rounds" },
      { t: "10:30 AM", icon: "𓏛", title: "Hall of Legends", desc: "Keynote session" },
      { t: "12:30 PM", icon: "𓆓", title: "Feast of Ra", desc: "Farewell lunch" },
      { t: "02:30 PM", icon: "𓇋", title: "Theatre of Dreams", desc: "Drama & dance" },
      { t: "04:30 PM", icon: "𓆑", title: "The Judgement Hall", desc: "Results announced" },
      { t: "06:00 PM", icon: "𓂀", title: "Prize of the Gods", desc: "Prize ceremony" },
      { t: "07:30 PM", icon: "𓇳", title: "The Eternal Flame", desc: "Closing ceremony" },
    ],
  },
];

const CARD_W = 220;
const CARD_GAP = 60;
const SECTION_PAD = 80;

/* ─────────────────────────────────────────────────────────────────────────────
   HIEROGLYPH STRIP (decorative side column)
───────────────────────────────────────────────────────────────────────────── */
function HieroglyphStrip() {
  return (
    <svg width="30" viewBox="0 0 30 700" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="15" cy="10" rx="9" ry="7" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
      <circle cx="15" cy="10" r="2.5" fill="#E7BA80" />
      <path d="M6 13 Q10 18 15 16 Q20 18 24 13" stroke="#E7BA80" strokeWidth="1" fill="none" />
      <g transform="translate(4,50)">
        <rect x="5" y="0" width="12" height="2" fill="#E7BA80" rx="1" />
        <rect x="4" y="5" width="14" height="2" fill="#E7BA80" rx="1" />
        <rect x="3" y="10" width="16" height="2" fill="#E7BA80" rx="1" />
      </g>
      <g transform="translate(8,100)">
        <line x1="7" y1="0" x2="7" y2="24" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M2 4 Q7 0 12 4" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
      </g>
      <g transform="translate(4,170)">
        <circle cx="11" cy="11" r="7" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="11" cy="11" r="2.5" fill="#E7BA80" />
        <line x1="11" y1="4" x2="11" y2="2" stroke="#E7BA80" strokeWidth="1" />
        <line x1="18" y1="11" x2="20" y2="11" stroke="#E7BA80" strokeWidth="1" />
        <line x1="4" y1="11" x2="2" y2="11" stroke="#E7BA80" strokeWidth="1" />
        <line x1="11" y1="18" x2="11" y2="20" stroke="#E7BA80" strokeWidth="1" />
      </g>
      <g transform="translate(5,240)">
        <path d="M13 0 L24 24 L2 24 Z" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
      </g>
      <g transform="translate(4,300)">
        <path d="M14 24 Q14 12 14 8" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M14 8 Q10 0 6 4 Q8 10 14 12" fill="#E7BA80" opacity="0.7" />
        <path d="M14 8 Q18 0 22 4 Q20 10 14 12" fill="#E7BA80" opacity="0.7" />
      </g>
      <g transform="translate(4,380)">
        <ellipse cx="11" cy="9" rx="8" ry="6" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="11" cy="9" r="2" fill="#E7BA80" />
      </g>
      <g transform="translate(0,460)">
        <line x1="4" y1="0" x2="28" y2="0" stroke="#E7BA80" strokeWidth="0.8" />
        <circle cx="16" cy="0" r="2" fill="#E7BA80" />
      </g>
      <g transform="translate(4,520)">
        <path d="M14 0 Q20 4 18 10 Q16 16 10 16 Q4 16 4 10 Q4 4 10 4" stroke="#E7BA80" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M10 12 L10 28" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      <g transform="translate(5,590)">
        <path d="M13 0 Q20 4 18 12 Q16 20 10 20 Q4 20 6 12 Q8 4 13 0Z" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCARAB CURSOR SVG
───────────────────────────────────────────────────────────────────────────── */
function ScarabCursor() {
  return (
    <svg
      id="scarab-cursor"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        willChange: "transform",
      }}
    >
      <circle cx="16" cy="16" r="14" fill="rgba(231,186,128,0.08)" stroke="rgba(231,186,128,0.45)" strokeWidth="1" />
      <ellipse cx="16" cy="17" rx="5.5" ry="7.5" fill="#C9922A" stroke="#E7BA80" strokeWidth="0.7" />
      <line x1="10" y1="13" x2="5" y2="8" stroke="#E7BA80" strokeWidth="0.8" opacity="0.8" />
      <line x1="22" y1="13" x2="27" y2="8" stroke="#E7BA80" strokeWidth="0.8" opacity="0.8" />
      <line x1="10" y1="18" x2="5" y2="23" stroke="#E7BA80" strokeWidth="0.8" opacity="0.8" />
      <line x1="22" y1="18" x2="27" y2="23" stroke="#E7BA80" strokeWidth="0.8" opacity="0.8" />
      <circle cx="16" cy="9" r="2.8" fill="#E7BA80" stroke="#FAD98B" strokeWidth="0.5" />
      <line x1="14" y1="6.5" x2="10" y2="3" stroke="#E7BA80" strokeWidth="0.7" />
      <line x1="18" y1="6.5" x2="22" y2="3" stroke="#E7BA80" strokeWidth="0.7" />
      <circle cx="10" cy="3" r="1.2" fill="#FAD98B" />
      <circle cx="22" cy="3" r="1.2" fill="#FAD98B" />
      <line x1="16" y1="12" x2="16" y2="25" stroke="#FAD98B" strokeWidth="0.5" opacity="0.65" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function TimelinePage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riverLiveRef = useRef<SVGPathElement>(null);
  const riverDimRef = useRef<SVGPathElement>(null);
  const riverGhostRef = useRef<SVGPathElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<SVGSVGElement>(null);

  const stateRef = useRef({
    scrollX: 0,
    targetX: 0,
    pathLen: 0,
    pathCache: "",
    raf: 0,
    touchStartX: 0,
  });

  /* ── particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.22,
      dy: -Math.random() * 0.32 - 0.08,
      a: Math.random() * 0.45 + 0.1,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231,186,128,${p.a})`; ctx.fill();
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

  /* ── cursor ── */
  useEffect(() => {
    const el = document.getElementById("scarab-cursor") as unknown as SVGSVGElement | null;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ── river path builder ── */
  const buildPath = useCallback((): string => {
    const track = trackRef.current;
    if (!track) return "";
    const vh = window.innerHeight;
    const midY = vh / 2;
    const dots = Array.from(track.querySelectorAll<HTMLElement>(".spine-dot"));
    if (!dots.length) return "";

    const pts = dots.map((dot) => {
      const r = dot.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    });

    const f = pts[0];
    let d = `M -80 ${midY} C ${f.cx - 160} ${midY} ${f.cx - 80} ${f.cy} ${f.cx} ${f.cy}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const mx = (a.cx + b.cx) / 2;
      d += ` C ${a.cx + 90} ${a.cy} ${mx} ${midY} ${mx} ${midY}`;
      d += ` C ${mx} ${midY} ${b.cx - 90} ${b.cy} ${b.cx} ${b.cy}`;
    }

    const last = pts[pts.length - 1];
    d += ` C ${last.cx + 80} ${last.cy} ${window.innerWidth + 80} ${midY} ${window.innerWidth + 140} ${midY}`;
    return d;
  }, []);

  /* ── main RAF loop ── */
  useEffect(() => {
    const st = stateRef.current;

    const getMax = () => {
      const track = trackRef.current;
      if (!track) return 1;
      return Math.max(1, track.scrollWidth - window.innerWidth);
    };

    /* scroll input */
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      st.targetX = Math.max(0, Math.min(getMax(), st.targetX + e.deltaY + e.deltaX));
    };
    const onTouchStart = (e: TouchEvent) => { st.touchStartX = e.touches[0].clientX; };
    const onTouchMove = (e: TouchEvent) => {
      const dx = st.touchStartX - e.touches[0].clientX;
      st.targetX = Math.max(0, Math.min(getMax(), st.targetX + dx));
      st.touchStartX = e.touches[0].clientX;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    /* helper: measure path length via temp element */
    const measurePath = (d: string): number => {
      const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tmp.setAttribute("d", d);
      const svg = document.getElementById("river-svg")!;
      svg.appendChild(tmp);
      const len = tmp.getTotalLength();
      svg.removeChild(tmp);
      return len;
    };

    let prev = 0;
    const loop = (ts: number) => {
      if (!prev) prev = ts;
      prev = ts;

      /* lerp */
      st.scrollX += (st.targetX - st.scrollX) * 0.1;
      const track = trackRef.current;
      if (track) track.style.transform = `translateX(${-st.scrollX}px)`;

      /* progress bar */
      const pct = Math.min(st.scrollX / getMax(), 1);
      if (progRef.current) progRef.current.style.width = (pct * 100) + "%";

      /* river */
      const d = buildPath();
      if (d !== st.pathCache) {
        st.pathCache = d;
        st.pathLen = measurePath(d);
      }
      const L = st.pathLen;
      const drawn = L * pct;

      const live = riverLiveRef.current;
      const dim = riverDimRef.current;
      const ghost = riverGhostRef.current;

      if (live && dim && ghost && d) {
        ghost.setAttribute("d", d);
        dim.setAttribute("d", d);
        live.setAttribute("d", d);
        live.style.strokeDasharray = `${L}`;
        live.style.strokeDashoffset = `${L - drawn}`;
        dim.style.strokeDasharray = `${L}`;
        dim.style.strokeDashoffset = "0";
      }

      /* light up dots */
      if (track) {
        const dots = Array.from(track.querySelectorAll<HTMLElement>(".spine-dot"));
        dots.forEach((dot, i) => {
          const threshold = (i + 1) / (dots.length + 1);
          dot.classList.toggle("lit", pct >= threshold - 0.035);
        });
      }

      st.raf = requestAnimationFrame(loop);
    };

    st.raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(st.raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [buildPath]);

  /* ── layout math ── */
  const dayWidth = (day: typeof DAYS[0]) =>
    SECTION_PAD * 2 + day.events.length * (CARD_W + CARD_GAP) - CARD_GAP;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          overflow: hidden;
          width: 100%; height: 100%;
          background: #080400;
          cursor: none;
        }

        /* scanline texture */
        #tl-root::after {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 1;
          background: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(180,120,40,.025) 3px, rgba(180,120,40,.025) 4px
          );
        }

        /* vignette */
        #tl-root::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(0,0,0,.65) 100%);
        }

        /* ── spine dot ── */
        .spine-dot {
          width: 12px; height: 12px; border-radius: 50%;
          border: 2px solid rgba(231,186,128,.45);
          background: #080400;
          box-shadow: 0 0 8px rgba(231,186,128,.3);
          position: absolute; z-index: 3;
          transition: border-color .35s, box-shadow .35s, background .35s;
          flex-shrink: 0;
        }
        .spine-dot.lit {
          border-color: #E7BA80;
          box-shadow: 0 0 16px rgba(231,186,128,.75), 0 0 4px rgba(231,186,128,.9);
          background: rgba(231,186,128,.2);
        }

        /* ── event card ── */
        .ev-card {
          width: ${CARD_W}px;
          background: rgba(14,7,0,.82);
          border: 1px solid rgba(231,186,128,.16);
          border-radius: 6px;
          padding: 14px 18px;
          position: relative;
          transition: border-color .3s, box-shadow .3s, transform .3s;
          cursor: none;
        }
        .ev-card:hover {
          border-color: rgba(231,186,128,.5);
          box-shadow: 0 0 26px rgba(231,186,128,.14);
          transform: translateY(-4px);
        }
        .ev-card.above { border-left: 3px solid rgba(231,186,128,.45); }
        .ev-card.below { border-right: 3px solid rgba(231,186,128,.45); }

        .ev-card::after {
          content: '';
          position: absolute;
          width: 0; height: 0;
        }
        .ev-card.above::after {
          bottom: -9px; left: 50%; transform: translateX(-50%);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid rgba(231,186,128,.2);
        }
        .ev-card.below::after {
          top: -9px; left: 50%; transform: translateX(-50%);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid rgba(231,186,128,.2);
        }

        .ev-time {
          font-family: 'Cinzel', serif;
          font-size: 9px; letter-spacing: .22em;
          color: #C9922A; text-transform: uppercase; margin-bottom: 6px;
        }
        .ev-title {
          font-family: 'Cinzel', serif;
          font-size: 13px; font-weight: 700;
          color: #E7BA80; margin-bottom: 5px;
          display: flex; align-items: center; gap: 7px;
        }
        .ev-icon { font-size: 15px; line-height: 1; flex-shrink: 0; }
        .ev-desc {
          font-family: sans-serif;
          font-size: 11px; color: rgba(231,186,128,.5); line-height: 1.5;
        }

        /* ── day header ── */
        .day-diamond {
          width: 36px; height: 36px;
          border: 1px solid rgba(231,186,128,.38);
          transform: rotate(45deg);
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(14,7,0,.7);
          margin-bottom: 12px;
        }
        .day-glyph { transform: rotate(-45deg); font-size: 18px; display: block; }

        /* ── scroll nudge ── */
        @keyframes nudge-right {
          0%,100% { transform: translateX(0); opacity: .5; }
          50%      { transform: translateX(10px); opacity: 1; }
        }
        .scroll-nudge { animation: nudge-right 2.2s ease-in-out infinite; }
        .nudge-arrow {
          width: 18px; height: 18px;
          border-top: 1.5px solid rgba(231,186,128,.5);
          border-right: 1.5px solid rgba(231,186,128,.5);
          transform: rotate(45deg);
        }

        /* ── river glow ── */
        #river-live {
          filter: drop-shadow(0 0 5px rgba(231,186,128,.5))
                  drop-shadow(0 0 12px rgba(201,146,42,.25));
        }
      `}</style>

      {/* ── root ── */}
      <div
        id="tl-root"
        ref={rootRef}
        style={{
          width: "100vw", height: "100vh",
          overflow: "hidden", position: "relative",
          background: "radial-gradient(ellipse 140% 100% at 50% 0%, #1c0f01 0%, #090500 60%, #000 100%)",
        }}
      >
        {/* particles */}
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }}
        />

        {/* progress bar */}
        <div
          ref={progRef}
          style={{
            position: "fixed", bottom: 0, left: 0,
            height: 2, width: 0,
            background: "linear-gradient(to right, #A87230, #E7BA80, #F0C97A)",
            zIndex: 20,
            boxShadow: "0 0 8px rgba(231,186,128,.5)",
            transition: "width .08s linear",
          }}
        />

        {/* top bar */}
        <div aria-hidden style={{ position: "fixed", top: 0, left: 0, right: 0, height: 32, zIndex: 7, pointerEvents: "none", opacity: .45 }}>
          <svg width="100%" height="32" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="30" x2="10000" y2="30" stroke="#E7BA80" strokeWidth=".8" />
            <line x1="0" y1="27" x2="10000" y2="27" stroke="#E7BA80" strokeWidth=".3" />
          </svg>
        </div>
        {/* bottom bar */}
        <div aria-hidden style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 32, zIndex: 7, pointerEvents: "none", opacity: .4, transform: "scaleY(-1)" }}>
          <svg width="100%" height="32" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="30" x2="10000" y2="30" stroke="#E7BA80" strokeWidth=".8" />
            <line x1="0" y1="27" x2="10000" y2="27" stroke="#E7BA80" strokeWidth=".3" />
          </svg>
        </div>

        {/* left hieroglyph column */}
        <div aria-hidden style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 60, zIndex: 6, pointerEvents: "none", opacity: .32, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
          <div style={{ position: "absolute", right: 12, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent)" }} />
          <HieroglyphStrip />
        </div>
        {/* right hieroglyph column */}
        <div aria-hidden style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 60, zIndex: 6, pointerEvents: "none", opacity: .32, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, transform: "scaleX(-1)" }}>
          <div style={{ position: "absolute", right: 12, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent)" }} />
          <HieroglyphStrip />
        </div>

        {/* fade edges */}
        <div style={{ position: "fixed", top: 0, bottom: 0, left: 0, width: 80, zIndex: 8, pointerEvents: "none", background: "linear-gradient(to right, #080400, transparent)" }} />
        <div style={{ position: "fixed", top: 0, bottom: 0, right: 0, width: 80, zIndex: 8, pointerEvents: "none", background: "linear-gradient(to left, #080400, transparent)" }} />

        {/* river SVG — sits behind track, full viewport */}
        <svg
          id="river-svg"
          aria-hidden
          style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 4, pointerEvents: "none", overflow: "visible" }}
        >
          {/* ghost: full faint path */}
          <path
            ref={riverGhostRef}
            id="river-ghost"
            fill="none"
            stroke="rgba(231,186,128,.06)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* dim: slightly visible undrawn portion */}
          <path
            ref={riverDimRef}
            id="river-dim"
            fill="none"
            stroke="rgba(231,186,128,.14)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* live: scroll-drawn gold path */}
          <path
            ref={riverLiveRef}
            id="river-live"
            fill="none"
            stroke="rgba(231,186,128,.88)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* ── HORIZONTAL TRACK ── */}
        <div
          ref={trackRef}
          style={{
            position: "absolute", top: 0, left: 0,
            height: "100%",
            display: "flex", alignItems: "center",
            willChange: "transform",
            gap: 0,
            paddingLeft: 80,
          }}
        >
          {/* ── HERO PANEL ── */}
          <div
            style={{
              width: "100vw", minWidth: "100vw", height: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              flexShrink: 0, position: "relative",
            }}
          >
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.4em", color: "rgba(231,186,128,.4)", textTransform: "uppercase", marginBottom: 18 }}>
              3rd · 4th · 5th April
            </p>
            <h1 style={{
              fontFamily: "'Cinzel Decorative','Cinzel',serif",
              fontSize: "clamp(2rem,5vw,3.6rem)", fontWeight: 700,
              color: "#E7BA80", letterSpacing: "0.06em",
              textShadow: "0 0 80px rgba(231,186,128,.25)",
              textAlign: "center", lineHeight: 1.2, marginBottom: 22,
            }}>
              Schedule<br />of Events
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ height: 1, width: 70, background: "linear-gradient(to right,transparent,rgba(231,186,128,.6))" }} />
              <span style={{ fontSize: 22, color: "#E7BA80" }}>𓇳</span>
              <div style={{ height: 1, width: 70, background: "linear-gradient(to left,transparent,rgba(231,186,128,.6))" }} />
            </div>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.3em", color: "rgba(231,186,128,.35)", textTransform: "uppercase" }}>
              The Grand Festival
            </p>
            {/* scroll nudge */}
            <div
              className="scroll-nudge"
              style={{
                position: "absolute", bottom: 52, right: 60,
                display: "flex", alignItems: "center", gap: 10,
                fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.25em",
                color: "rgba(231,186,128,.38)", textTransform: "uppercase",
              }}
            >
              <span>Scroll to journey</span>
              <div className="nudge-arrow" />
            </div>
          </div>

          {/* ── DAY SECTIONS ── */}
          {DAYS.map((day, di) => {
            const width = dayWidth(day);
            return (
              <div
                key={di}
                style={{
                  width, minWidth: width, height: "100%",
                  position: "relative", flexShrink: 0,
                  display: "flex", alignItems: "center",
                }}
              >
                {/* day header */}
                <div
                  style={{
                    position: "absolute", top: 40, left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center", whiteSpace: "nowrap", zIndex: 5,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="day-diamond">
                      <span className="day-glyph">{day.glyph}</span>
                    </div>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.35em", color: "rgba(231,186,128,.4)", textTransform: "uppercase", marginBottom: 4 }}>
                      {day.date} · {day.day}
                    </p>
                    <p style={{ fontFamily: "'Cinzel Decorative','Cinzel',serif", fontSize: "clamp(.95rem,1.8vw,1.4rem)", fontWeight: 700, color: "#E7BA80", letterSpacing: "0.04em", marginBottom: 4 }}>
                      {day.title}
                    </p>
                    <p style={{ fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: "0.22em", color: "rgba(231,186,128,.35)", textTransform: "uppercase" }}>
                      {day.sub}
                    </p>
                  </div>
                </div>

                {/* horizontal spine line */}
                <div
                  style={{
                    position: "absolute",
                    left: 0, right: 0,
                    top: "50%", height: 1,
                    background: "linear-gradient(to right, transparent, rgba(231,186,128,.22) 10%, rgba(231,186,128,.22) 90%, transparent)",
                    zIndex: 1,
                  }}
                />

                {/* event nodes */}
                {day.events.map((ev, ei) => {
                  const above = ei % 2 === 0;
                  const nodeLeft = SECTION_PAD + ei * (CARD_W + CARD_GAP);

                  return (
                    <div
                      key={ei}
                      style={{
                        position: "absolute",
                        left: nodeLeft,
                        top: above ? "calc(50% - 198px)" : "calc(50% + 26px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: 4,
                      }}
                    >
                      {above ? (
                        <>
                          <div className={`ev-card above`}>
                            <div className="ev-time">{ev.t}</div>
                            <div className="ev-title">
                              <span className="ev-icon">{ev.icon}</span>
                              {ev.title}
                            </div>
                            <div className="ev-desc">{ev.desc}</div>
                          </div>
                          {/* connector line card → dot */}
                          <div style={{ width: 1, height: 20, background: "rgba(231,186,128,.25)" }} />
                          <div
                            className="spine-dot"
                            style={{ position: "relative", flexShrink: 0 }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="spine-dot"
                            style={{ position: "relative", flexShrink: 0 }}
                          />
                          <div style={{ width: 1, height: 20, background: "rgba(231,186,128,.25)" }} />
                          <div className={`ev-card below`}>
                            <div className="ev-time">{ev.t}</div>
                            <div className="ev-title">
                              <span className="ev-icon">{ev.icon}</span>
                              {ev.title}
                            </div>
                            <div className="ev-desc">{ev.desc}</div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* ── OUTRO PANEL ── */}
          <div
            style={{
              width: "60vw", minWidth: "60vw", height: "100%",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ height: 1, width: 90, background: "linear-gradient(to right,transparent,rgba(231,186,128,.4))" }} />
              <span style={{ fontSize: 26, opacity: .45 }}>𓊹</span>
              <div style={{ height: 1, width: 90, background: "linear-gradient(to left,transparent,rgba(231,186,128,.4))" }} />
            </div>
            <p style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.35em", color: "rgba(231,186,128,.3)", textTransform: "uppercase" }}>
              May Ra guide your path
            </p>
          </div>
        </div>

        {/* scarab cursor */}
        <ScarabCursor />
      </div>
    </>
  );
}
