"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { listEvents, type ApiEvent } from "@/lib/api/events";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/custom/footer";

function getImage(title: string) {
  const slug = title.toLowerCase().replace(/\s+/g, " ");
  return `/events/${slug}.jpg`;
}

export default function EventsPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listEvents()
      .then(data => setEvents(data ?? []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setImgPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [isMobile]);

  const handleHover = (event: ApiEvent) => {
    if (isMobile) return;
    setHoveredId(event.id);
    setImgSrc(getImage(event.title));
  };

  const handleLeave = () => {
    if (isMobile) return;
    setHoveredId(null);
    setImgSrc(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

        .events-page {
          min-height: 100vh;
          width: 100%;
          background: #0a0703;
          padding: 88px 0 80px;
          position: relative;
          overflow: hidden;
        }

        /* ── ROW ── */
        .event-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.1rem 5vw;
          border-bottom: 1px solid rgba(180,124,60,0.1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .event-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(180,124,60,0.0);
          transition: background 0.25s;
          pointer-events: none;
        }
        .event-row.hovered::before { background: rgba(180,124,60,0.06); }

        /* ── TITLE ── */
        .event-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(2.2rem, 5.5vw, 5rem);
          font-weight: 800;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: rgba(240,232,214,0.18);
          margin: 0;
          line-height: 1;
          transition: color 0.25s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: none;
        }
        .event-row.hovered .event-title { color: #f5ead8; }

        /* ── MODE ── */
        .event-mode {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          color: rgba(200,146,78,0);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          flex-shrink: 0;
          transition: color 0.25s;
          white-space: nowrap;
        }
        .event-row.hovered .event-mode { color: rgba(200,146,78,0.5); }

        /* ── INDEX ── */
        .event-index {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: rgba(200,146,78,0.25);
          letter-spacing: 0.1em;
          min-width: 28px;
          flex-shrink: 0;
          transition: color 0.25s;
        }
        .event-row.hovered .event-index { color: rgba(200,146,78,0.5); }

        /* ── BODY WRAPPER ── */
        .event-body {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }

        /* ── FLOATING IMAGE ── */
        .floating-img {
          position: absolute;
          width: 260px;
          height: 340px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(180,124,60,0.3);
          pointer-events: none;
          z-index: 20;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          transition: opacity 0.2s;
        }
        .floating-img img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* ── HEADER ── */
        .page-header {
          padding: 0 5vw 3rem;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* ── SKELETON ── */
        .skeleton-row {
          padding: 1.1rem 5vw;
          border-bottom: 1px solid rgba(180,124,60,0.08);
        }
        .skeleton-bar {
          height: clamp(2.2rem, 5.5vw, 5rem);
          border-radius: 4px;
          background: rgba(180,124,60,0.07);
          animation: shimmer 1.5s ease-in-out infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* ════════════════════════════════
           MOBILE OVERRIDES (is-mobile class)
           ════════════════════════════════ */
        .events-page.is-mobile {
          padding: 72px 0 80px;
          overflow-x: hidden;
        }
        .is-mobile .page-header {
          padding: 0 5vw 1.6rem;
          flex-wrap: nowrap;
          gap: 0.5rem;
        }
        .is-mobile .event-row {
          gap: 0.9rem;
          padding: 1.05rem 5vw;
        }
        /* Kill the ::before overlay on mobile */
        .is-mobile .event-row::before { display: none; }
        /* Tap feedback instead */
        .is-mobile .event-row:active { background: rgba(180,124,60,0.06); }

        /* Always-on white title, no transition */
        .is-mobile .event-title {
          color: #f5ead8 !important;
          transition: none;
          font-size: clamp(1.65rem, 7vw, 2.4rem);
        }
        .is-mobile .event-mode {
          color: rgba(200,146,78,0.55) !important;
          transition: none;
        }
        .is-mobile .event-index {
          color: rgba(200,146,78,0.45) !important;
          min-width: 24px;
          transition: none;
        }
        /* Stack title + mode vertically */
        .is-mobile .event-body {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.18rem;
        }
        /* Arrow always faintly visible, no animation */
        .is-mobile .event-arrow {
          opacity: 0.4 !important;
          transform: none !important;
          transition: none !important;
        }
        .is-mobile .skeleton-row { padding: 1.05rem 5vw; }
        .is-mobile .skeleton-bar { height: clamp(1.65rem, 7vw, 2.4rem); }
      `}</style>

      <div
        className={`events-page${isMobile ? " is-mobile" : ""}`}
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        {/* Ambient glow */}
        <div style={{
          position: "fixed", top: "40%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle,rgba(180,124,60,0.06) 0%,transparent 70%)",
          filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
        }} />

        {/* Floating image — desktop only */}
        {!isMobile && hoveredId && imgSrc && (
          <div
            ref={imgRef}
            className="floating-img"
            style={{ left: imgPos.x + 40, top: imgPos.y - 100 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgSrc}
              alt=""
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg,transparent 50%,rgba(8,6,3,0.7) 100%)",
            }} />
          </div>
        )}

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div className="page-header">
            <h1 style={{
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 800, letterSpacing: "0.04em",
              textTransform: "uppercase", color: "#f5ead8",
              margin: 0, lineHeight: 1,
            }}>
              Events
            </h1>
            <p style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.8rem",
              color: "rgba(200,146,78,0.45)",
              letterSpacing: "0.06em",
              margin: 0,
              whiteSpace: "nowrap",
              ...(isMobile ? { alignSelf: "flex-end", paddingBottom: 2 } : {}),
            }}>
              {isMobile ? "Tap to explore" : "Hover to preview · Click to explore"}
            </p>
          </div>

          {/* Divider */}
          <div style={{
            height: 1,
            background: "linear-gradient(to right,transparent,rgba(180,124,60,0.3),transparent)",
          }} />

          {/* Skeleton */}
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-row">
              <div className="skeleton-bar" style={{ width: `${30 + (i * 13) % 45}%` }} />
            </div>
          ))}

          {/* Events list */}
          {!loading && events.map((event, i) => {
            const isHovered = !isMobile && hoveredId === event.id;
            return (
              <div
                key={event.id}
                className={`event-row${isHovered ? " hovered" : ""}`}
                onMouseEnter={() => handleHover(event)}
                onMouseLeave={handleLeave}
                onClick={() => router.push(`/events/${event.id}`)}
              >
                <span className="event-index">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="event-body">
                  <h2 className="event-title">{event.title}</h2>
                  <span className="event-mode">{event.mode}</span>
                </div>

                {/* Arrow */}
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  className="event-arrow"
                  style={{
                    flexShrink: 0,
                    opacity: isHovered ? 0.7 : 0,
                    transform: isHovered ? "translateX(0)" : "translateX(-8px)",
                    transition: "opacity 0.25s, transform 0.25s",
                  }}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#c8924e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            );
          })}

          {!loading && events.length === 0 && (
            <div style={{
              textAlign: "center", padding: "4rem",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.85rem", color: "rgba(200,146,78,0.4)",
            }}>
              No events found.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}