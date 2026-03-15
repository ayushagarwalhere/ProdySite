"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   FESTIVAL DATA
───────────────────────────────────────────────────────────────────────────── */

const DAYS = [
  {
    date: "April 3",
    day: "Day I",
    title: "The Opening of the Gates",
    subtitle: "Inauguration & Cultural Ignition",
    hieroglyph: "𓂀",
    color: "#E7BA80",
    accentHex: "#C9922A",
    events: [
      { time: "09:00 AM", title: "Sacred Inauguration", desc: "Opening ceremony with the lighting of the eternal flame", icon: "𓋴" },
      { time: "10:30 AM", title: "The Procession", desc: "Welcome march and guest of honour felicitation", icon: "𓅓" },
      { time: "12:00 PM", title: "Feast of the Nile", desc: "Welcome lunch & networking under open skies", icon: "𓆓" },
      { time: "02:00 PM", title: "Papyrus Scrolls", desc: "Paper presentation and research showcase", icon: "𓏛" },
      { time: "04:00 PM", title: "The Arena Opens", desc: "Technical events & hackathon kickoff", icon: "𓂋" },
      { time: "06:30 PM", title: "Twilight Offerings", desc: "Cultural performances & art exhibition", icon: "𓇯" },
      { time: "08:00 PM", title: "Night of Osiris", desc: "Bonfire night, music & stargazing", icon: "𓇳" },
    ],
  },
  {
    date: "April 4",
    day: "Day II",
    title: "The Trial of the Pharaoh",
    subtitle: "Competitions & Showdowns",
    hieroglyph: "𓂃",
    color: "#D4A853",
    accentHex: "#A87230",
    events: [
      { time: "08:30 AM", title: "Dawn Council", desc: "Morning briefing & schedule announcements", icon: "𓅱" },
      { time: "10:00 AM", title: "Battle of Wits", desc: "Quiz competition & debate championship", icon: "𓆑" },
      { time: "11:30 AM", title: "The Artisan's Court", desc: "Design sprint, photography & art competitions", icon: "𓇋" },
      { time: "01:00 PM", title: "Solar Feast", desc: "Lunch break & sponsor showcases", icon: "𓆓" },
      { time: "03:00 PM", title: "Gladiators of Code", desc: "Hackathon judging & coding contest finals", icon: "𓂋" },
      { time: "05:00 PM", title: "The Colosseum", desc: "Sports events & outdoor games tournament", icon: "𓅓" },
      { time: "07:30 PM", title: "Voices of the Sphinx", desc: "Battle of Bands & solo music performances", icon: "𓇯" },
      { time: "09:30 PM", title: "The Grand Banquet", desc: "Gala dinner & awards ceremony night I", icon: "𓇳" },
    ],
  },
  {
    date: "April 5",
    day: "Day III",
    title: "The Eternal Return",
    subtitle: "Grand Finale & Valediction",
    hieroglyph: "𓊹",
    color: "#F0C97A",
    accentHex: "#E09040",
    events: [
      { time: "09:00 AM", title: "The Last Rites", desc: "Final rounds of all ongoing competitions", icon: "𓅱" },
      { time: "10:30 AM", title: "Hall of Legends", desc: "Alumni interaction & keynote speaker session", icon: "𓏛" },
      { time: "12:30 PM", title: "Feast of Ra", desc: "Grand farewell lunch with all participants", icon: "𓆓" },
      { time: "02:30 PM", title: "Theatre of Dreams", desc: "Drama, dance & fashion showcase finale", icon: "𓇋" },
      { time: "04:30 PM", title: "The Judgement Hall", desc: "Results declaration & winner announcements", icon: "𓆑" },
      { time: "06:00 PM", title: "Prize of the Gods", desc: "Grand prize distribution ceremony", icon: "𓂀" },
      { time: "07:30 PM", title: "The Eternal Flame", desc: "Closing ceremony, gratitude & valediction", icon: "𓇳" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   EGYPTIAN BG (inline — same as MembersPage)
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
        <path d="M14 0 Q20 4 18 10 Q16 16 10 16 Q4 16 4 10 Q4 4 10 4 Q14 4 14 8 Q14 12 10 12" stroke="#E7BA80" strokeWidth="1.2" fill="none" strokeLinecap="round" />
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
        <path d="M6 24 Q4 18 6 12 Q8 4 14 4 Q20 4 22 12 Q24 18 22 24 Z" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
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
        <path d="M4 20 Q2 8 10 4 Q8 12 14 14 Q20 12 18 4 Q26 8 24 20" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
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
   SCROLL-ANIMATED TIMELINE EVENT CARD
───────────────────────────────────────────────────────────────────────────── */

function EventCard({
  event,
  index,
  isLeft,
  dayColor,
  accentHex,
}: {
  event: (typeof DAYS)[0]["events"][0];
  index: number;
  isLeft: boolean;
  dayColor: string;
  accentHex: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isLeft ? "flex-end" : "flex-start",
        gap: "0",
        width: "100%",
        position: "relative",
        marginBottom: "6px",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : isLeft
          ? "translateX(-40px)"
          : "translateX(40px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "calc(50% - 40px)",
          background: "rgba(20,10,0,0.72)",
          border: `1px solid ${dayColor}33`,
          borderLeft: isLeft ? `3px solid ${dayColor}` : undefined,
          borderRight: !isLeft ? `3px solid ${dayColor}` : undefined,
          borderRadius: "6px",
          padding: "14px 18px",
          position: "relative",
          backdropFilter: "blur(6px)",
          order: isLeft ? 1 : 3,
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = dayColor;
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${dayColor}22`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${dayColor}33`;
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        {/* Time */}
        <div style={{
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: accentHex,
          fontFamily: "'Cinzel', serif",
          marginBottom: "6px",
          textTransform: "uppercase",
        }}>
          {event.time}
        </div>
        {/* Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
          <span style={{ fontSize: "18px", lineHeight: 1 }}>{event.icon}</span>
          <span style={{
            fontSize: "14px",
            fontWeight: 700,
            color: dayColor,
            fontFamily: "'Cinzel', serif",
            letterSpacing: "0.05em",
          }}>
            {event.title}
          </span>
        </div>
        {/* Desc */}
        <p style={{
          margin: 0,
          fontSize: "12px",
          color: "rgba(231,186,128,0.6)",
          lineHeight: 1.5,
          fontFamily: "'Open Sans', sans-serif",
        }}>
          {event.desc}
        </p>

        {/* Connector arrow pointing to spine */}
        <div style={{
          position: "absolute",
          top: "50%",
          [isLeft ? "right" : "left"]: "-9px",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: "7px solid transparent",
          borderBottom: "7px solid transparent",
          [isLeft ? "borderLeft" : "borderRight"]: `8px solid ${dayColor}55`,
        }} />
      </div>

      {/* Centre dot on the spine */}
      <div
        style={{
          order: 2,
          flexShrink: 0,
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "rgba(10,5,0,0.9)",
          border: `2px solid ${dayColor}`,
          boxShadow: `0 0 8px ${dayColor}66`,
          zIndex: 2,
          margin: "0 26px",
          transition: "transform 0.2s",
        }}
      />

      {/* Empty side */}
      <div style={{ width: "calc(50% - 40px)", order: isLeft ? 3 : 1 }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DAY SECTION (scrolls in as a unit)
───────────────────────────────────────────────────────────────────────────── */

function DaySection({ day, dayIndex }: { day: (typeof DAYS)[0]; dayIndex: number }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ marginBottom: "80px", position: "relative" }}>
      {/* Day header */}
      <div
        ref={headerRef}
        style={{
          textAlign: "center",
          marginBottom: "40px",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Decorative horizontal rule */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "20px",
        }}>
          <div style={{ height: "1px", width: "80px", background: `linear-gradient(to right, transparent, ${day.color})` }} />
          <div style={{
            width: "40px", height: "40px",
            border: `1px solid ${day.color}66`,
            transform: "rotate(45deg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(20,10,0,0.6)",
          }}>
            <span style={{ transform: "rotate(-45deg)", fontSize: "20px" }}>{day.hieroglyph}</span>
          </div>
          <div style={{ height: "1px", width: "80px", background: `linear-gradient(to left, transparent, ${day.color})` }} />
        </div>

        {/* Date pill */}
        <div style={{
          display: "inline-block",
          border: `1px solid ${day.color}44`,
          borderRadius: "2px",
          padding: "3px 14px",
          marginBottom: "10px",
          fontSize: "10px",
          letterSpacing: "0.3em",
          color: day.accentHex,
          fontFamily: "'Cinzel', serif",
          textTransform: "uppercase",
        }}>
          {day.date}
        </div>

        {/* Day label */}
        <div style={{
          fontSize: "11px",
          letterSpacing: "0.4em",
          color: `${day.color}88`,
          fontFamily: "'Cinzel', serif",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}>
          {day.day}
        </div>

        {/* Main title */}
        <h2 style={{
          margin: "0 0 6px",
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 700,
          color: day.color,
          fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
          letterSpacing: "0.05em",
          textShadow: `0 0 40px ${day.color}44`,
        }}>
          {day.title}
        </h2>

        {/* Subtitle */}
        <p style={{
          margin: 0,
          fontSize: "12px",
          letterSpacing: "0.2em",
          color: `${day.color}66`,
          fontFamily: "'Cinzel', serif",
          textTransform: "uppercase",
        }}>
          {day.subtitle}
        </p>
      </div>

      {/* Timeline events */}
      <div style={{ position: "relative" }}>
        {/* Spine line */}
        <div style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 0, bottom: 0,
          width: "1px",
          background: `linear-gradient(to bottom, transparent, ${day.color}44 10%, ${day.color}44 90%, transparent)`,
          zIndex: 1,
        }} />

        {day.events.map((event, i) => (
          <EventCard
            key={i}
            event={event}
            index={i}
            isLeft={i % 2 === 0}
            dayColor={day.color}
            accentHex={day.accentHex}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────────── */

export default function TimelinePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* floating particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3, dx: (Math.random() - 0.5) * 0.25,
      dy: -Math.random() * 0.4 - 0.1, alpha: Math.random() * 0.5 + 0.1,
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

  return (
    <div style={{ minHeight: "100vh", width: "100%", color: "white", fontFamily: "'Open Sans', sans-serif", position: "relative" }}>

      {/* ══ BACKGROUND LAYERS ══ */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 120% 80% at 50% 0%, #1a0e00 0%, #0d0700 55%, #000 100%)" }} />
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.6, mixBlendMode: "overlay" as React.CSSProperties["mixBlendMode"], backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")` }} />
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(180,120,40,0.03) 3px,rgba(180,120,40,0.03) 4px)" }} />

      {/* Left hieroglyph column */}
      <div aria-hidden style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 3, pointerEvents: "none", opacity: 0.35, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
        <div style={{ position: "absolute", right: "14px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent)" }} />
        <svg width="36" viewBox="0 0 36 820" fill="none" xmlns="http://www.w3.org/2000/svg"><HieroglyphStrip /></svg>
      </div>

      {/* Right hieroglyph column */}
      <div aria-hidden style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 3, pointerEvents: "none", opacity: 0.35, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px", transform: "scaleX(-1)" }}>
        <div style={{ position: "absolute", right: "14px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent)" }} />
        <svg width="36" viewBox="0 0 36 820" fill="none" xmlns="http://www.w3.org/2000/svg"><HieroglyphStrip offset={14} /></svg>
      </div>

      {/* Top border */}
      <div aria-hidden style={{ position: "fixed", top: 0, left: 0, right: 0, height: "36px", zIndex: 4, pointerEvents: "none", opacity: 0.45 }}>
        <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><TopBorder /></svg>
      </div>

      {/* Bottom border */}
      <div aria-hidden style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "36px", zIndex: 4, pointerEvents: "none", opacity: 0.45, transform: "scaleY(-1)" }}>
        <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><TopBorder /></svg>
      </div>

      {/* Particles */}
      <canvas ref={canvasRef} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 5, pointerEvents: "none" }} />

      {/* Vignette */}
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 6, pointerEvents: "none", background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)" }} />

      {/* ══ PAGE CONTENT ══ */}
      <div style={{ position: "relative", zIndex: 10, padding: "80px 100px 80px", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Hero heading */}
        <header style={{ textAlign: "center", marginBottom: "80px", paddingTop: "20px" }}>
          <p style={{ margin: "0 0 10px", fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(231,186,128,0.5)", fontFamily: "'Cinzel', serif" }}>
            3rd · 4th · 5th April
          </p>
          <h1 style={{ margin: "0 0 10px", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#E7BA80", fontFamily: "'Cinzel Decorative', 'Cinzel', serif", letterSpacing: "0.06em", textShadow: "0 0 60px rgba(231,186,128,0.3)" }}>
            Schedule of Events
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", margin: "14px 0" }}>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #E7BA80)" }} />
            <span style={{ fontSize: "20px" }}>𓇳</span>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #E7BA80)" }} />
          </div>
          <p style={{ margin: 0, fontSize: "13px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(231,186,128,0.45)", fontFamily: "'Cinzel', serif" }}>
            The Grand Festival
          </p>
        </header>

        {/* Three day sections */}
        {DAYS.map((day, i) => (
          <DaySection key={i} day={day} dayIndex={i} />
        ))}

        {/* Footer ornament */}
        <div style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div style={{ height: "1px", width: "100px", background: "linear-gradient(to right, transparent, rgba(231,186,128,0.5))" }} />
            <span style={{ fontSize: "24px", opacity: 0.5 }}>𓊹</span>
            <div style={{ height: "1px", width: "100px", background: "linear-gradient(to left, transparent, rgba(231,186,128,0.5))" }} />
          </div>
        </div>
      </div>

      {/* Fonts + keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Open+Sans:wght@400;600&display=swap');
        @keyframes eg-pulse { 0%,100%{opacity:0.05} 50%{opacity:0.09} }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}