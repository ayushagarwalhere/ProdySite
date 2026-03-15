"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const events = [
  {
    id: "1", slug: "hackathon", name: "HACKATHON", route: "/events/hackathon",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80",
    tag: "Computer Science", date: "Dec 31",
    description: "The year's most anticipated night. Candlelit tables, a seven-course tasting menu, and a dance floor that opens only after midnight. Dress code: black tie.",
  },
  {
    id: "2", slug: "sailboat", name: "SAILBOAT", route: "/events/sailboat ",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80",
    tag: "Mechanical", date: "Every Fri",
    description: "Sundown sets from rotating DJs, craft cocktails and the city skyline as your backdrop. Limited capacity — claim your spot before Thursday.",
  },
  {
    id: "3", slug: "ancient-arch", name: "ANCIENT ARCH", route: "/events/ancient-arch",
    image: "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=900&q=80",
    tag: "Civil with Architecture", date: "Jan 18",
    description: "A private walkthrough of the new gallery wing, followed by live painting sessions and artist talks. Wine and small plates served throughout the evening.",
  },
  {
    id: "4", slug: "escape-room", name: "ESCAPE ROOM", route: "/events/escape-room",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80",
    tag: "Electrical & Electronics", date: "Feb 3",
    description: "Speakeasy-inspired, invitation-only evening. Hidden venue, vintage cocktails, and live jazz from a hand-picked quartet. The address drops 24 hours prior.",
  },
  {
    id: "5", slug: "chemystery", name: "CHEMYSTERY", route: "/events/chemystery",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
    tag: "", date: "Jun 21",
    description: "Celebrate the longest day with a private beach takeover: sunrise yoga, a cold-plunge ritual, and a twilight feast as the sun finally sets at nine.",
  },
  {
    id: "6", slug: "auction", name: "AUCTION", route: "/events/auction",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80",
    tag: "MnC", date: "Oct 12",
    description: "A long-table dinner set in the estate grounds. Local chefs collaborate on a seasonal menu. Wood-fired everything, estate wines, and conversation under the stars.",
  },
];

const GOLD      = "#b47c3c";
const GOLD_DIM  = "rgba(180,124,60,0.16)";
const GOLD_MID  = "rgba(180,124,60,0.35)";
const TEXT_WARM = "#f0e8d6";
const TEXT_DIM  = "rgba(220,200,170,0.45)";
const BG_MAIN   = "#0a0703";

function EgyptianBorder({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="100%" height="18"
      viewBox="0 0 400 18"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block", opacity: 0.35, transform: flip ? "scaleY(-1)" : "none" }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 20}, 0)`}>
          <rect x="1" y="6" width="18" height="6" rx="1" fill="none" stroke={GOLD} strokeWidth="0.6" />
          <line x1="5"  y1="6" x2="5"  y2="12" stroke={GOLD} strokeWidth="0.5" />
          <line x1="10" y1="6" x2="10" y2="12" stroke={GOLD} strokeWidth="0.5" />
          <line x1="15" y1="6" x2="15" y2="12" stroke={GOLD} strokeWidth="0.5" />
          <circle cx="10" cy="3" r="1.2" fill={GOLD} opacity="0.6" />
          <line x1="10" y1="0" x2="10" y2="1.8" stroke={GOLD} strokeWidth="0.5" />
        </g>
      ))}
    </svg>
  );
}

function EyeOfHorus() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", top: 28, right: 36, opacity: 0.55, pointerEvents: "none", zIndex: 0 }}
      width="160" height="160" viewBox="0 0 160 160" fill="none"
    >
      <circle cx="80" cy="80" r="72" stroke={GOLD} strokeWidth="0.7" />
      <circle cx="80" cy="80" r="52" stroke={GOLD} strokeWidth="0.4" />
      <path d="M20 80 Q80 30 140 80 Q80 130 20 80Z" stroke={GOLD} strokeWidth="1" fill="none" />
      <circle cx="80" cy="80" r="18" stroke={GOLD} strokeWidth="0.9" fill="none" />
      <circle cx="80" cy="80" r="7"  stroke={GOLD} strokeWidth="0.7" fill="none" />
      <line x1="80" y1="58" x2="80" y2="62" stroke={GOLD} strokeWidth="0.8" />
      <line x1="92" y1="61" x2="90" y2="64" stroke={GOLD} strokeWidth="0.7" />
      <line x1="68" y1="61" x2="70" y2="64" stroke={GOLD} strokeWidth="0.7" />
      <path d="M80 98 Q74 112 80 122 Q86 112 80 98Z" stroke={GOLD} strokeWidth="0.7" fill="none" />
      <line x1="80" y1="122" x2="72" y2="132" stroke={GOLD} strokeWidth="0.6" />
      <line x1="72" y1="132" x2="72" y2="140" stroke={GOLD} strokeWidth="0.6" />
      <line x1="80" y1="6"  x2="80" y2="16"  stroke={GOLD} strokeWidth="0.5" />
      <line x1="80" y1="144" x2="80" y2="154" stroke={GOLD} strokeWidth="0.5" />
      <line x1="6"  y1="80" x2="16"  y2="80" stroke={GOLD} strokeWidth="0.5" />
      <line x1="144" y1="80" x2="154" y2="80" stroke={GOLD} strokeWidth="0.5" />
      {([[80,8],[152,80],[80,152],[8,80]] as [number,number][]).map(([x,y],i)=>(
        <polygon key={i} points={`${x},${y-4} ${x+4},${y} ${x},${y+4} ${x-4},${y}`}
          fill={GOLD} opacity="0.5" />
      ))}
    </svg>
  );
}

export default function EventsListingPage() {
  const router   = useRouter();
  const [activeId, setActiveId] = useState(events[0].id);
  const [mounted, setMounted]   = useState(false);
  const panelRef  = useRef<HTMLDivElement>(null);
  const active    = events.find((e) => e.id === activeId)!;

  useEffect(() => { setMounted(true); }, []);

  const handleSelect = (id: string) => {
    setActiveId(id);
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(14px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes imgReveal {
          from { clip-path:inset(0 100% 0 0); }
          to   { clip-path:inset(0 0% 0 0); }
        }

        .fade-up     { animation:fadeUp 0.65s cubic-bezier(.22,1,.36,1) both; }
        .slide-right { animation:slideRight 0.45s cubic-bezier(.22,1,.36,1) both; }
        .img-reveal  { animation:imgReveal 0.5s cubic-bezier(.22,1,.36,1) both; }
        .d1 { animation-delay:.06s; }
        .d2 { animation-delay:.14s; }

        .ev-card {
          position:relative; border-radius:10px; overflow:hidden; cursor:pointer;
          transition:box-shadow 0.3s;
          /* ── taller cards so the photo reads clearly ── */
          flex-shrink: 0;
        }
        .ev-card::after {
          content:''; position:absolute; inset:0; border-radius:10px;
          border:1px solid transparent; pointer-events:none; transition:border-color 0.26s;
        }
        .ev-card:hover::after, .ev-card.active::after { border-color:${GOLD}; }
        .ev-card.active { box-shadow:0 0 0 1px ${GOLD},0 6px 32px rgba(180,124,60,0.13); }
        .ev-card img {
          width:100%; height:100%; object-fit:cover; display:block;
          filter:brightness(0.62) saturate(0.7);
          transition:transform 0.55s cubic-bezier(.22,1,.36,1),filter 0.32s;
        }
        .ev-card:hover img { transform:scale(1.04); filter:brightness(0.78) saturate(0.88); }
        .ev-card.active img { filter:brightness(0.84) saturate(1); }
        .card-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(6,4,2,0.9) 0%,rgba(6,4,2,0.04) 52%,transparent 100%);
          transition:background 0.3s;
        }
        .ev-card:hover .card-overlay {
          background:linear-gradient(to top,rgba(6,4,2,0.74) 0%,transparent 52%);
        }
        .card-rule { height:1px; background:${GOLD}; transition:width 0.36s cubic-bezier(.22,1,.36,1); }

        .pill {
          font-family:'DM Sans',sans-serif; font-size:9px;
          letter-spacing:0.2em; text-transform:uppercase;
          color:${GOLD}; border:1px solid ${GOLD_DIM}; border-radius:99px; padding:3px 10px;
        }
        .nav-dot {
          height:5px; border-radius:99px; background:${GOLD_DIM};
          transition:background 0.22s,width 0.22s; cursor:pointer; border:none;
        }
        .nav-dot.active { background:${GOLD}; }

        .open-btn {
          display:inline-flex; align-items:center; gap:9px;
          background:${GOLD}; color:${BG_MAIN};
          font-family:'DM Sans',sans-serif; font-size:11px; font-weight:500;
          letter-spacing:0.14em; text-transform:uppercase;
          padding:10px 22px; border-radius:2px; border:none; cursor:pointer;
          transition:background 0.22s,transform 0.18s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .open-btn:hover { background:#c98e4a; transform:translateY(-1px); }

        .ghost-btn {
          background:none; border:1px solid ${GOLD_DIM}; border-radius:2px;
          padding:10px 22px;
          font-family:'DM Sans',sans-serif; font-size:11px; font-weight:400;
          letter-spacing:0.14em; text-transform:uppercase;
          color:${TEXT_DIM}; cursor:pointer; transition:border-color 0.22s,color 0.22s;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .ghost-btn:hover { border-color:${GOLD}; color:${GOLD}; }

        .scroll-slim::-webkit-scrollbar { width:3px; }
        .scroll-slim::-webkit-scrollbar-track { background:transparent; }
        .scroll-slim::-webkit-scrollbar-thumb { background:${GOLD_DIM}; border-radius:99px; }

        .eg-dots {
          display:flex; align-items:center; gap:8px;
        }
        .eg-dots::before, .eg-dots::after {
          content:''; flex:1; height:1px;
          background:linear-gradient(to right,transparent,${GOLD_DIM});
        }
        .eg-dots::after { background:linear-gradient(to left,transparent,${GOLD_DIM}); }
      `}</style>

      <div style={{ background: BG_MAIN, color: TEXT_WARM, fontFamily: "'DM Sans',sans-serif" }}>

        <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>

          {/* orbs */}
          <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
            <div style={{ position:"absolute", width:540, height:540, top:-170, left:-150, borderRadius:"50%", background:"radial-gradient(circle at center,rgba(180,124,60,0.09) 0%,transparent 65%)" }} />
            <div style={{ position:"absolute", width:380, height:380, bottom:-80, right:-60, borderRadius:"50%", background:"radial-gradient(circle at center,rgba(140,80,20,0.07) 0%,transparent 65%)" }} />
            <div style={{ position:"absolute", width:200, height:200, top:"40%", left:"44%", borderRadius:"50%", background:"radial-gradient(circle at center,rgba(180,124,60,0.04) 0%,transparent 65%)" }} />
          </div>

          <EyeOfHorus />

          {/* top border */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 2, pointerEvents: "none" }}>
            <EgyptianBorder />
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", padding: "44px 48px 52px" }}>

            {/* HEADER */}
            <header
              className={`fade-up ${mounted ? "" : "opacity-0"}`}
              style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ opacity: 0.7 }}>
                    <path d="M1 5 Q7 0 13 5 Q7 10 1 5Z" stroke={GOLD} strokeWidth="0.8" fill="none"/>
                    <circle cx="7" cy="5" r="2" stroke={GOLD} strokeWidth="0.8" fill="none"/>
                    <circle cx="7" cy="5" r="0.8" fill={GOLD}/>
                  </svg>
                  <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: GOLD, fontWeight: 700 }}>
                    Our Lineup
                  </p>
                </div>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,3.4rem)", fontWeight: 300, lineHeight: 1.05, color: TEXT_WARM }}>
                  Signature<br /><em>Events</em>
                </h1>
              </div>

              <nav style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 6 }}>
                {events.map((e) => (
                  <button
                    key={e.id}
                    className={`nav-dot ${activeId === e.id ? "active" : ""}`}
                    style={{ width: activeId === e.id ? 20 : 5 }}
                    onClick={() => handleSelect(e.id)}
                    aria-label={e.name}
                  />
                ))}
              </nav>
            </header>

            {/* gold rule */}
            <div
              className={`fade-up d1 ${mounted ? "" : "opacity-0"}`}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}
            >
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${GOLD_MID},${GOLD_DIM})` }} />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <polygon points="7,0 14,7 7,14 0,7" fill={GOLD} opacity="0.7" />
                <polygon points="7,3 11,7 7,11 3,7" fill={BG_MAIN} />
                <circle cx="7" cy="7" r="1.5" fill={GOLD} opacity="0.9" />
              </svg>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to left,${GOLD_MID},${GOLD_DIM})` }} />
            </div>

            {/* BODY */}
            <div
              className={`fade-up d2 ${mounted ? "" : "opacity-0"}`}
              style={{ display: "flex", gap: 0, height: "calc(100vh - 220px)", minHeight: 500 }}
            >
              {/* ── LEFT: card list — wider + taller cards ── */}
              <div
                className="scroll-slim"
                style={{
                  flex: "0 0 auto",
                  /* ↑ wider column so the bigger cards don't feel cramped */
                  width: "clamp(300px,42vw,480px)",
                  overflowY: "auto",
                  paddingRight: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {events.map((event, i) => (
                  <div
                    key={event.id}
                    className={`ev-card fade-up ${activeId === event.id ? "active" : ""}`}
                    /* ── CHANGE: 158 → 220 ── */
                    style={{ height: 220, animationDelay: `${0.22 + i * 0.07}s` }}
                    onClick={() => handleSelect(event.id)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={event.image} alt={event.name} />
                    <div className="card-overlay" />
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "16px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <span className="pill">{event.tag}</span>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(220,200,170,0.4)", letterSpacing: "0.1em" }}>{event.date}</span>
                      </div>
                      <div>
                        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.25rem", fontWeight: 400, color: TEXT_WARM, lineHeight: 1.1, marginBottom: 8 }}>
                          {event.name}
                        </p>
                        <div className="card-rule" style={{ width: activeId === event.id ? "100%" : "0%" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* vertical divider */}
              <div style={{ width: 1, alignSelf: "stretch", flexShrink: 0, margin: "0 36px", background: `linear-gradient(to bottom,transparent,${GOLD_DIM} 25%,${GOLD_DIM} 75%,transparent)` }} />

              {/* ── RIGHT: detail panel ── */}
              <div
                key={activeId}
                className="slide-right"
                ref={panelRef}
                style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22, overflow: "hidden" }}
              >
                {/* ── CHANGE: taller hero image ── */}
                <div style={{ borderRadius: 10, overflow: "hidden", height: "clamp(260px,38vh,400px)", flexShrink: 0, position: "relative" }}>
                  <img
                    key={activeId + "-img"}
                    src={active.image}
                    alt={active.name}
                    className="img-reveal"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.76) saturate(0.82)" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(6,4,2,0.65) 0%,transparent 55%)" }} />

                  {/* date badge */}
                  <div style={{
                    position: "absolute", top: 14, right: 14,
                    background: "rgba(10,7,3,0.75)", backdropFilter: "blur(10px)",
                    border: `1px solid ${GOLD_DIM}`,
                    borderRadius: 3,
                    padding: "8px 16px", textAlign: "center",
                    clipPath: "polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
                  }}>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 300, color: GOLD, lineHeight: 1 }}>
                      {active.date.split(" ")[0]}
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: TEXT_DIM, marginTop: 2 }}>
                      {active.date.split(" ").slice(1).join(" ") || "Date"}
                    </p>
                  </div>
                </div>

                {/* text */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span className="pill">{active.tag}</span>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ opacity: 0.5, flexShrink: 0 }}>
                      <path d="M0.5 4 Q6 0 11.5 4 Q6 8 0.5 4Z" stroke={GOLD} strokeWidth="0.7" fill="none"/>
                      <circle cx="6" cy="4" r="1.5" stroke={GOLD} strokeWidth="0.6" fill="none"/>
                    </svg>
                    <div style={{ flex: 1, height: 1, background: GOLD_DIM }} />
                  </div>

                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.9rem,3.2vw,2.75rem)", fontWeight: 300, color: TEXT_WARM, lineHeight: 1.06, marginBottom: 12 }}>
                    {active.name}
                  </h2>

                  <p style={{ fontSize: 13.5, lineHeight: 1.8, color: TEXT_DIM, maxWidth: 440, fontWeight: 300 }}>
                    {active.description}
                  </p>
                </div>

                {/* actions */}
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <button className="open-btn" onClick={() => router.push(active.route)}>
                    <span>Open Event</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="ghost-btn" onClick={() => router.push("/")}>
                    Back Home
                  </button>
                  <span style={{ marginLeft: "auto", fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: GOLD_MID, letterSpacing: "0.12em" }}>
                    {String(events.findIndex((e) => e.id === activeId) + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* bottom border */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, pointerEvents: "none" }}>
            <EgyptianBorder flip />
          </div>
        </div>
      </div>
    </>
  );
}


