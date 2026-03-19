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
      {
        t: "09:00 AM",
        icon: "𓋴",
        title: "Sacred Inauguration",
        desc: "Lighting of the eternal flame",
      },
      {
        t: "10:30 AM",
        icon: "𓅓",
        title: "The Procession",
        desc: "Welcome march & felicitation",
      },
      {
        t: "12:00 PM",
        icon: "𓆓",
        title: "Feast of the Nile",
        desc: "Lunch & networking",
      },
      {
        t: "02:00 PM",
        icon: "𓏛",
        title: "Papyrus Scrolls",
        desc: "Paper presentations",
      },
      {
        t: "04:00 PM",
        icon: "𓂋",
        title: "The Arena Opens",
        desc: "Hackathon kickoff",
      },
      {
        t: "06:30 PM",
        icon: "𓇯",
        title: "Twilight Offerings",
        desc: "Cultural performances",
      },
      {
        t: "08:00 PM",
        icon: "𓇳",
        title: "Night of Osiris",
        desc: "Bonfire & stargazing",
      },
    ],
  },
  {
    date: "April 4",
    day: "Day II",
    glyph: "𓂃",
    title: "The Trial of the Pharaoh",
    sub: "Competitions & Showdowns",
    events: [
      {
        t: "08:30 AM",
        icon: "𓅱",
        title: "Dawn Council",
        desc: "Morning briefing",
      },
      {
        t: "10:00 AM",
        icon: "𓆑",
        title: "Battle of Wits",
        desc: "Quiz & debate",
      },
      {
        t: "11:30 AM",
        icon: "𓇋",
        title: "Artisan's Court",
        desc: "Design sprint",
      },
      { t: "01:00 PM", icon: "𓆓", title: "Solar Feast", desc: "Lunch break" },
      {
        t: "03:00 PM",
        icon: "𓂋",
        title: "Gladiators of Code",
        desc: "Hackathon finals",
      },
      {
        t: "05:00 PM",
        icon: "𓅓",
        title: "The Colosseum",
        desc: "Sports tournament",
      },
      {
        t: "07:30 PM",
        icon: "𓇯",
        title: "Voices of the Sphinx",
        desc: "Battle of Bands",
      },
      {
        t: "09:30 PM",
        icon: "𓇳",
        title: "Grand Banquet",
        desc: "Awards night I",
      },
    ],
  },
  {
    date: "April 5",
    day: "Day III",
    glyph: "𓊹",
    title: "The Eternal Return",
    sub: "Grand Finale & Valediction",
    events: [
      {
        t: "09:00 AM",
        icon: "𓅱",
        title: "The Last Rites",
        desc: "Final rounds",
      },
      {
        t: "10:30 AM",
        icon: "𓏛",
        title: "Hall of Legends",
        desc: "Keynote session",
      },
      {
        t: "12:30 PM",
        icon: "𓆓",
        title: "Feast of Ra",
        desc: "Farewell lunch",
      },
      {
        t: "02:30 PM",
        icon: "𓇋",
        title: "Theatre of Dreams",
        desc: "Drama & dance",
      },
      {
        t: "04:30 PM",
        icon: "𓆑",
        title: "The Judgement Hall",
        desc: "Results announced",
      },
      {
        t: "06:00 PM",
        icon: "𓂀",
        title: "Prize of the Gods",
        desc: "Prize ceremony",
      },
      {
        t: "07:30 PM",
        icon: "𓇳",
        title: "The Eternal Flame",
        desc: "Closing ceremony",
      },
    ],
  },
];

const CARD_W = 220;
const CARD_GAP = 60;
const SECTION_PAD = 80;

/* ─────────────────────────────────────────────────────────────────────────────
   HIEROGLYPH STRIP
───────────────────────────────────────────────────────────────────────────── */
function HieroglyphStrip() {
  return (
    <svg
      width="30"
      viewBox="0 0 30 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="15"
        cy="10"
        rx="9"
        ry="7"
        stroke="#E7BA80"
        strokeWidth="1.2"
        fill="none"
      />
      <circle cx="15" cy="10" r="2.5" fill="#E7BA80" />
      <path
        d="M6 13 Q10 18 15 16 Q20 18 24 13"
        stroke="#E7BA80"
        strokeWidth="1"
        fill="none"
      />
      <g transform="translate(4,50)">
        <rect x="5" y="0" width="12" height="2" fill="#E7BA80" rx="1" />
        <rect x="4" y="5" width="14" height="2" fill="#E7BA80" rx="1" />
        <rect x="3" y="10" width="16" height="2" fill="#E7BA80" rx="1" />
      </g>
      <g transform="translate(8,100)">
        <line x1="7" y1="0" x2="7" y2="24" stroke="#E7BA80" strokeWidth="1.2" />
        <path
          d="M2 4 Q7 0 12 4"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
      <g transform="translate(4,170)">
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="11" cy="11" r="2.5" fill="#E7BA80" />
        <line x1="11" y1="4" x2="11" y2="2" stroke="#E7BA80" strokeWidth="1" />
        <line
          x1="18"
          y1="11"
          x2="20"
          y2="11"
          stroke="#E7BA80"
          strokeWidth="1"
        />
        <line x1="4" y1="11" x2="2" y2="11" stroke="#E7BA80" strokeWidth="1" />
        <line
          x1="11"
          y1="18"
          x2="11"
          y2="20"
          stroke="#E7BA80"
          strokeWidth="1"
        />
      </g>
      <g transform="translate(5,240)">
        <path
          d="M13 0 L24 24 L2 24 Z"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
      <g transform="translate(4,300)">
        <path d="M14 24 Q14 12 14 8" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M14 8 Q10 0 6 4 Q8 10 14 12" fill="#E7BA80" opacity="0.7" />
        <path d="M14 8 Q18 0 22 4 Q20 10 14 12" fill="#E7BA80" opacity="0.7" />
      </g>
      <g transform="translate(4,380)">
        <ellipse
          cx="11"
          cy="9"
          rx="8"
          ry="6"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="11" cy="9" r="2" fill="#E7BA80" />
      </g>
      <g transform="translate(0,460)">
        <line x1="4" y1="0" x2="28" y2="0" stroke="#E7BA80" strokeWidth="0.8" />
        <circle cx="16" cy="0" r="2" fill="#E7BA80" />
      </g>
      <g transform="translate(4,520)">
        <path
          d="M14 0 Q20 4 18 10 Q16 16 10 16 Q4 16 4 10 Q4 4 10 4"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M10 12 L10 28" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      <g transform="translate(5,590)">
        <path
          d="M13 0 Q20 4 18 12 Q16 20 10 20 Q4 20 6 12 Q8 4 13 0Z"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCARAB CURSOR
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
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="rgba(231,186,128,0.08)"
        stroke="rgba(231,186,128,0.45)"
        strokeWidth="1"
      />
      <ellipse
        cx="16"
        cy="17"
        rx="5.5"
        ry="7.5"
        fill="#C9922A"
        stroke="#E7BA80"
        strokeWidth="0.7"
      />
      <line
        x1="10"
        y1="13"
        x2="5"
        y2="8"
        stroke="#E7BA80"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <line
        x1="22"
        y1="13"
        x2="27"
        y2="8"
        stroke="#E7BA80"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <line
        x1="10"
        y1="18"
        x2="5"
        y2="23"
        stroke="#E7BA80"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <line
        x1="22"
        y1="18"
        x2="27"
        y2="23"
        stroke="#E7BA80"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <circle
        cx="16"
        cy="9"
        r="2.8"
        fill="#E7BA80"
        stroke="#FAD98B"
        strokeWidth="0.5"
      />
      <line
        x1="14"
        y1="6.5"
        x2="10"
        y2="3"
        stroke="#E7BA80"
        strokeWidth="0.7"
      />
      <line
        x1="18"
        y1="6.5"
        x2="22"
        y2="3"
        stroke="#E7BA80"
        strokeWidth="0.7"
      />
      <circle cx="10" cy="3" r="1.2" fill="#FAD98B" />
      <circle cx="22" cy="3" r="1.2" fill="#FAD98B" />
      <line
        x1="16"
        y1="12"
        x2="16"
        y2="25"
        stroke="#FAD98B"
        strokeWidth="0.5"
        opacity="0.65"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function TimelinePage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const riverLiveRef = useRef<SVGPathElement>(null);
  const riverDimRef = useRef<SVGPathElement>(null);
  const riverGhostRef = useRef<SVGPathElement>(null);
  const progRef = useRef<HTMLDivElement>(null);

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
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
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
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231,186,128,${p.a})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── cursor ── */
  useEffect(() => {
    const el = document.getElementById(
      "scarab-cursor",
    ) as unknown as SVGSVGElement | null;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ── G2-continuous river path builder (symmetric horizontal tangents) ── */
  const buildPath = useCallback((): string => {
    const track = trackRef.current;
    if (!track) return "";
    const dots = Array.from(track.querySelectorAll<HTMLElement>(".spine-dot"));
    if (!dots.length) return "";

    const pts = dots.map((dot) => {
      const r = dot.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });

    // Start off-screen left at the Y of the first point
    const first = pts[0];
    let d = `M ${first.x - 200} ${first.y}`;

    // Straight line into first point
    d += ` L ${first.x} ${first.y}`;

    // G2-continuous curves between consecutive points
    // For each pair P1→P2, control points are:
    //   C1 = (P1.x + Δx/2, P1.y)  — horizontal tangent at P1
    //   C2 = (P2.x - Δx/2, P2.y)  — horizontal tangent at P2
    // This ensures slope = 0 at every node, making transitions perfectly smooth.
    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const dx = p2.x - p1.x;
      const c1x = p1.x + dx / 2;
      const c2x = p2.x - dx / 2;
      d += ` C ${c1x} ${p1.y}, ${c2x} ${p2.y}, ${p2.x} ${p2.y}`;
    }

    // End off-screen right
    const last = pts[pts.length - 1];
    d += ` L ${last.x + 400} ${last.y}`;

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

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      st.targetX = Math.max(
        0,
        Math.min(getMax(), st.targetX + e.deltaY + e.deltaX),
      );
    };
    const onTouchStart = (e: TouchEvent) => {
      st.touchStartX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = st.touchStartX - e.touches[0].clientX;
      st.targetX = Math.max(0, Math.min(getMax(), st.targetX + dx));
      st.touchStartX = e.touches[0].clientX;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const measurePath = (d: string): number => {
      const tmp = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
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

      st.scrollX += (st.targetX - st.scrollX) * 0.1;
      const track = trackRef.current;
      if (track) track.style.transform = `translateX(${-st.scrollX}px)`;

      const pct = Math.min(st.scrollX / getMax(), 1);
      if (progRef.current) progRef.current.style.width = pct * 100 + "%";

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

      if (track) {
        const dots = Array.from(
          track.querySelectorAll<HTMLElement>(".spine-dot"),
        );
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
  const dayWidth = (day: (typeof DAYS)[0]) =>
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

        #tl-root::after {
          position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .45; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0.55 0.35 0.05 0 0.08 0.45 0.30 0.05 0 0.05 0.10 0.08 0.02 0 0.01 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.2'/%3E%3C/svg%3E");
          background-size: 300px 300px;
        }

        #tl-root::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(0,0,0,.65) 100%);
        }

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

        .day-diamond {
          width: 36px; height: 36px;
          border: 1px solid rgba(231,186,128,.38);
          transform: rotate(45deg);
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(14,7,0,.7);
          margin-bottom: 12px;
        }
        .day-glyph { transform: rotate(-45deg); font-size: 18px; display: block; }

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

        #river-live {
          filter: drop-shadow(0 0 5px rgba(231,186,128,.5))
                  drop-shadow(0 0 12px rgba(201,146,42,.25));
        }
      `}</style>

      <div
        id="tl-root"
        style={{
          position: "fixed",
          inset: 0,
          background: "#080400",
          color: "#E7BA80",
          fontFamily: "'Cinzel', serif",
        }}
      >
        {/* particles */}
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* progress bar */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "rgba(231,186,128,.08)",
            zIndex: 10,
          }}
        >
          <div
            ref={progRef}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #C9922A, #E7BA80)",
              width: 0,
              transition: "width .05s linear",
            }}
          />
        </div>

        {/* top bar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            zIndex: 10,
            borderBottom: "1px solid rgba(231,186,128,.1)",
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: ".35em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Festival of the Sands
          </span>
          <span
            style={{
              fontSize: 10,
              letterSpacing: ".35em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            MMXXIV
          </span>
        </div>

        {/* bottom bar */}
        <div
          style={{
            position: "fixed",
            bottom: 12,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: ".3em",
              textTransform: "uppercase",
              opacity: 0.35,
            }}
          >
            Kemet · Chronicle
          </span>
          <span
            style={{
              fontSize: 9,
              letterSpacing: ".3em",
              textTransform: "uppercase",
              opacity: 0.35,
            }}
          >
            Scroll → Journey
          </span>
        </div>

        {/* left hieroglyph column */}
        <div
          style={{
            position: "fixed",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            opacity: 0.18,
          }}
        >
          <HieroglyphStrip />
        </div>

        {/* right hieroglyph column */}
        <div
          style={{
            position: "fixed",
            right: 10,
            top: "50%",
            transform: "translateY(-50%) scaleX(-1)",
            zIndex: 2,
            opacity: 0.18,
          }}
        >
          <HieroglyphStrip />
        </div>

        {/* fade edges */}
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to right, #080400, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            width: 80,
            background: "linear-gradient(to left, #080400, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* river SVG */}
        <svg
          id="river-svg"
          style={{
            position: "fixed",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
            overflow: "visible",
          }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9922A" />
              <stop offset="50%" stopColor="#E7BA80" />
              <stop offset="100%" stopColor="#C9922A" />
            </linearGradient>
          </defs>
          <path
            ref={riverGhostRef}
            fill="none"
            stroke="rgba(231,186,128,0.04)"
            strokeWidth="2"
          />
          <path
            ref={riverDimRef}
            fill="none"
            stroke="rgba(231,186,128,0.08)"
            strokeWidth="1.5"
          />
          <path
            ref={riverLiveRef}
            id="river-live"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="2"
          />
        </svg>

        {/* ── HORIZONTAL TRACK ── */}
        <div
          ref={trackRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            willChange: "transform",
          }}
        >
          {/* ── HERO PANEL ── */}
          <div
            style={{
              width: "100vw",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: ".5em",
                textTransform: "uppercase",
                color: "#C9922A",
                marginBottom: 14,
              }}
            >
              3rd · 4th · 5th April
            </div>
            <div
              style={{
                fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 700,
                textAlign: "center",
                lineHeight: 1.1,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              Schedule
              <br />
              of Events
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 1,
                  background: "rgba(231,186,128,.3)",
                }}
              />
              <span style={{ fontSize: 26 }}>𓇳</span>
              <div
                style={{
                  width: 50,
                  height: 1,
                  background: "rgba(231,186,128,.3)",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".28em",
                textTransform: "uppercase",
                opacity: 0.55,
              }}
            >
              The Grand Festival
            </div>
            <div
              className="scroll-nudge"
              style={{
                position: "absolute",
                right: 48,
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  opacity: 0.5,
                }}
              >
                Scroll to journey
              </span>
              <div className="nudge-arrow" />
            </div>
          </div>

          {/* ── DAY SECTIONS ── */}
          {DAYS.map((day) => {
            const width = dayWidth(day);
            return (
              <div
                key={day.day}
                style={{
                  width,
                  flexShrink: 0,
                  position: "relative",
                  height: "100%",
                }}
              >
                {/* day header */}
                <div
                  style={{
                    position: "absolute",
                    top: 28,
                    left: SECTION_PAD,
                    zIndex: 4,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 4,
                    }}
                  >
                    <div className="day-diamond">
                      <span className="day-glyph">{day.glyph}</span>
                    </div>
                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: ".3em",
                        textTransform: "uppercase",
                        opacity: 0.5,
                      }}
                    >
                      {day.date} · {day.day}
                    </span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {day.title}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        opacity: 0.4,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                      }}
                    >
                      {day.sub}
                    </span>
                  </div>
                </div>

                {/* horizontal spine line */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: SECTION_PAD - 20,
                    right: SECTION_PAD - 20,
                    height: 1,
                    background: "rgba(231,186,128,.08)",
                  }}
                />

                {/* event nodes */}
                {day.events.map((ev, ei) => {
                  const above = ei % 2 === 0;
                  const nodeLeft = SECTION_PAD + ei * (CARD_W + CARD_GAP);
                  const WAVE_Y = 60; // how far dots deviate from center
                  const dotOffset = above ? -WAVE_Y : WAVE_Y;

                  return (
                    <div
                      key={ev.title}
                      style={{
                        position: "absolute",
                        left: nodeLeft,
                        top: "50%",
                        width: CARD_W,
                      }}
                    >
                      {above ? (
                        <>
                          <div
                            className={`ev-card above`}
                            style={{
                              position: "absolute",
                              bottom: 46 + WAVE_Y,
                              left: 0,
                            }}
                          >
                            <p className="ev-time">{ev.t}</p>
                            <p className="ev-title">
                              <span className="ev-icon">{ev.icon}</span>
                              {ev.title}
                            </p>
                            <p className="ev-desc">{ev.desc}</p>
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              left: CARD_W / 2,
                              bottom: 8 + WAVE_Y,
                              width: 1,
                              height: 36,
                              background: "rgba(231,186,128,.18)",
                            }}
                          />
                          <div
                            className="spine-dot"
                            style={{ left: CARD_W / 2 - 6, top: dotOffset - 6 }}
                          />
                        </>
                      ) : (
                        <>
                          <div
                            className="spine-dot"
                            style={{ left: CARD_W / 2 - 6, top: dotOffset - 6 }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: CARD_W / 2,
                              top: 8 + WAVE_Y,
                              width: 1,
                              height: 36,
                              background: "rgba(231,186,128,.18)",
                            }}
                          />
                          <div
                            className={`ev-card below`}
                            style={{
                              position: "absolute",
                              top: 46 + WAVE_Y,
                              left: 0,
                            }}
                          >
                            <p className="ev-time">{ev.t}</p>
                            <p className="ev-title">
                              <span className="ev-icon">{ev.icon}</span>
                              {ev.title}
                            </p>
                            <p className="ev-desc">{ev.desc}</p>
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
              width: "60vw",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: "rgba(231,186,128,.3)",
                }}
              />
              <span style={{ fontSize: 28 }}>𓊹</span>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: "rgba(231,186,128,.3)",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
                fontSize: 16,
                letterSpacing: ".35em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              May Ra guide your path
            </div>
          </div>
        </div>

        <ScarabCursor />
      </div>
    </>
  );
}
