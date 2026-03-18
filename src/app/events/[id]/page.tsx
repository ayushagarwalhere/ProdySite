"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/lib/api/events";
import { RegisterModal } from "@/components/RegisterModal";

type Event = {
  id: string;
  title: string;
  description: string;
  mode: "SOLO" | "TEAM" | "BOTH";
  prizePool?: number;
  minTeamSize?: number;
  maxTeamSize?: number;
  isLive: boolean;
  createdAt: string;
};

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then(data => setEvent(data as Event))
      .catch(() => setError("Event not found."))
      .finally(() => setLoading(false));
  }, [id]);

  /* ── shared text styles ── */
  const muted: React.CSSProperties = {
    fontFamily: "'DM Sans',sans-serif",
    fontSize: "0.85rem",
    color: "rgba(200,146,78,0.55)",
    margin: 0,
  };

  /* ── loading ── */
  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0703", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ ...muted }}>Loading…</p>
    </div>
  );

  /* ── error ── */
  if (error || !event) return (
    <div style={{ minHeight: "100vh", background: "#0a0703", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <p style={{ ...muted, color: "rgba(240,130,130,0.8)" }}>{error || "Event not found."}</p>
      <button onClick={() => router.push("/events")} style={{ background: "transparent", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 4, padding: "0.6rem 1.25rem", color: "#c8924e", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        ← Back to Events
      </button>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0a0703; color: #f5ead8; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0a0703", paddingTop: 64 }}>

        {/* ── back button ── */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "1.5rem 1.5rem 0" }}>
          <button onClick={() => router.push("/events")}
            style={{ background: "transparent", border: "none", color: "rgba(200,146,78,0.5)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", padding: 0, display: "flex", alignItems: "center", gap: 6 }}>
            ← Events
          </button>
        </div>

        {/* ── main card ── */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

          {/* title + live badge */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: "0.75rem" }}>
            <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,6vw,3.5rem)", textTransform: "uppercase", letterSpacing: "0.02em", color: "#f5ead8", margin: 0, lineHeight: 1 }}>
              {event.title}
            </h1>
            {event.isLive && (
              <span style={{ flexShrink: 0, marginTop: 6, padding: "4px 10px", border: "1px solid rgba(180,124,60,0.4)", borderRadius: 4, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#e0a85a", whiteSpace: "nowrap" }}>
                ● Live
              </span>
            )}
          </div>

          {/* mode pill */}
          <p style={{ ...muted, marginBottom: "1.5rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {event.mode}
          </p>

          {/* divider */}
          <div style={{ height: 1, background: "linear-gradient(to right, rgba(180,124,60,0.3), transparent)", marginBottom: "1.75rem" }} />

          {/* description */}
          {event.description && (
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "rgba(240,232,214,0.7)", lineHeight: 1.8, marginBottom: "2rem" }}>
              {event.description}
            </p>
          )}

          {/* stat pills */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.75rem", marginBottom: "2.5rem" }}>
            {event.prizePool && (
              <StatPill label="Prize Pool" value={`₹${event.prizePool.toLocaleString()}`} />
            )}
            <StatPill label="Mode" value={event.mode} />
            {event.minTeamSize && event.maxTeamSize && (
              <StatPill label="Team Size" value={`${event.minTeamSize} – ${event.maxTeamSize}`} />
            )}
          </div>

          {/* divider */}
          <div style={{ height: 1, background: "linear-gradient(to right, rgba(180,124,60,0.2), transparent)", marginBottom: "2rem" }} />

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            {event.isLive ? (
              <button
                onClick={() => setShowModal(true)}
                style={{ padding: "0.85rem 2.5rem", background: "#b47c3c", border: "none", borderRadius: 4, color: "#0a0703", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Register Now
              </button>
            ) : (
              <p style={{ ...muted }}>Registration is not open yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* ── modal ── */}
      {showModal && (
        <RegisterModal
          eventId={event.id}
          eventTitle={event.title}
          minSize={event.minTeamSize}
          maxSize={event.maxTeamSize}
          mode={event.mode}
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: "0.65rem 1rem", border: "1px solid rgba(180,124,60,0.2)", borderRadius: 6, background: "rgba(180,124,60,0.05)" }}>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,146,78,0.45)", margin: "0 0 3px" }}>{label}</p>
      <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#f5ead8", margin: 0 }}>{value}</p>
    </div>
  );
}
