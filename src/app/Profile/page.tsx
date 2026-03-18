"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api/user";

type Team = {
  id: string;
  name: string;
  teamCode: string;
  isAdmin: boolean;
  submitted?: boolean;
  memberCount: number;
  team?: { userId: string }[];
};

type EventItem = {
  id: string;
  title: string;
  date?: string;
  venue?: string;
  status?: string;
};

type Profile = {
  id: string;
  name?: string;
  username?: string;
  email: string;
  verified: boolean;
  role: string;
  avatarUrl?: string;
  createdAt: string;
  teams: Team[];
  events: EventItem[];
};

/* ── Initials Avatar ── */
function InitialsAvatar({ name, size = 80 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `radial-gradient(circle at 40% 35%, hsl(${hue},45%,32%) 0%, hsl(${hue},30%,16%) 100%)`,
      border: "2px solid rgba(180,124,60,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 0 28px rgba(180,124,60,0.2)",
    }}>
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800, fontSize: size * 0.34,
        color: `hsl(${hue},80%,82%)`,
        letterSpacing: "0.05em",
      }}>{initials}</span>
    </div>
  );
}

/* ── Section ── */
function Section({ title, count, children }: { title: string; count?: number; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.1rem" }}>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.32em", textTransform: "uppercase",
          color: "#c8924e",
        }}>
          {title}{count !== undefined ? ` · ${count}` : ""}
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(200,146,78,0.4), transparent)" }} />
      </div>
      {children}
    </div>
  );
}

/* ── Info row ── */
function InfoRow({ label, value, verified }: { label: string; value: string; verified?: boolean }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0.65rem 0", borderBottom: "1px solid rgba(180,124,60,0.12)",
      gap: 12, flexWrap: "wrap",
    }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem",
        letterSpacing: "0.1em", color: "#c8924e",
        textTransform: "uppercase", minWidth: 80, fontWeight: 500,
      }}>{label}</span>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.95rem", fontWeight: 500,
        color: "#f5ead8",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {value}
        {verified !== undefined && (
          <span style={{
            fontSize: "0.6rem", fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "2px 8px", borderRadius: 2,
            background: verified ? "rgba(180,124,60,0.18)" : "rgba(200,60,60,0.14)",
            color: verified ? "#e0a85a" : "rgba(240,120,120,0.9)",
            border: `1px solid ${verified ? "rgba(180,124,60,0.4)" : "rgba(200,60,60,0.3)"}`,
          }}>{verified ? "✓ Verified" : "✗ Unverified"}</span>
        )}
      </span>
    </div>
  );
}

/* ── Role badge ── */
function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = { ADMIN: "Grand Alchemist", USER: "Initiate", MODERATOR: "Arcane Warden" };
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 7,
      padding: "0.3rem 0.85rem",
      border: "1px solid rgba(180,124,60,0.45)", borderRadius: 2,
      background: "rgba(180,124,60,0.1)",
      clipPath: "polygon(7px 0%,100% 0%,calc(100% - 7px) 100%,0% 100%)",
    }}>
      <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
        <polygon points="5,0 10,5 5,10 0,5" fill="#e0a85a" opacity="0.9" />
      </svg>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
        fontSize: "0.88rem", color: "#e0a85a", letterSpacing: "0.05em", fontWeight: 400,
      }}>{map[role] ?? role}</span>
    </div>
  );
}

/* ── Team card ── */
function TeamCard({ team }: { team: Team }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: "1px solid rgba(180,124,60,0.22)", borderRadius: 6,
      background: "rgba(180,124,60,0.05)", overflow: "hidden",
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(180,124,60,0.5)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(180,124,60,0.22)")}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", background: "transparent", border: "none",
          cursor: "pointer", padding: "0.9rem 1.1rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            border: "1px solid rgba(180,124,60,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(180,124,60,0.1)",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#e0a85a" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="9" cy="7" r="4" stroke="#e0a85a" strokeWidth="1.5" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#e0a85a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ textAlign: "left", minWidth: 0 }}>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "1.05rem", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              color: "#f5ead8", margin: 0,
            }}>{team.name}</p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem",
              color: "#c8924e", margin: "2px 0 0", fontWeight: 400,
            }}>
              {team.memberCount} member{team.memberCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.68rem",
            fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em",
            color: team.isAdmin ? "#e0a85a" : "rgba(200,146,78,0.55)",
            padding: "2px 8px", border: `1px solid ${team.isAdmin ? "rgba(180,124,60,0.45)" : "rgba(180,124,60,0.2)"}`,
            borderRadius: 2,
          }}>{team.isAdmin ? "Admin" : "Member"}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
            <path d="M6 9l6 6 6-6" stroke="#c8924e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* Expanded */}
      <div style={{
        maxHeight: open ? 300 : 0, overflow: "hidden",
        transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{
          padding: "0.9rem 1.1rem 1.1rem",
          borderTop: "1px solid rgba(180,124,60,0.12)",
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem 1.5rem",
        }}>
          {[
            { label: "Team Code", value: team.teamCode },
            { label: "Members", value: String(team.memberCount) },
            { label: "Role", value: team.isAdmin ? "Admin" : "Member" },
            { label: "Submitted", value: team.submitted ? "Yes" : "No" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8924e", margin: "0 0 3px", fontWeight: 500 }}>{label}</p>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "1rem", fontWeight: 700, color: "#f5ead8", margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Event card ── */
function EventCard({ event, onClick }: { event: EventItem; onClick: () => void }) {
  const statusColor: Record<string, string> = {
    CONFIRMED: "#e0a85a", PENDING: "rgba(220,200,80,0.85)", CANCELLED: "rgba(220,80,80,0.8)",
  };
  const status = event.status ?? "CONFIRMED";
  return (
    <div
      onClick={onClick}
      style={{
        padding: "0.9rem 1.1rem",
        border: "1px solid rgba(180,124,60,0.22)", borderRadius: 6,
        background: "rgba(180,124,60,0.05)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 12, cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(180,124,60,0.55)"; e.currentTarget.style.background = "rgba(180,124,60,0.09)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(180,124,60,0.22)"; e.currentTarget.style.background = "rgba(180,124,60,0.05)"; }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem",
          fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          color: "#f5ead8", margin: "0 0 4px",
        }}>{event.title}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {event.date && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "#c8924e", fontWeight: 400 }}>
            {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </span>}
          {event.venue && <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(200,146,78,0.6)" }}>• {event.venue}</span>}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <span style={{
          fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.65rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.12em",
          color: statusColor[status] ?? "#e0a85a",
          padding: "2px 8px", border: `1px solid ${statusColor[status] ?? "rgba(180,124,60,0.4)"}`,
          borderRadius: 2,
        }}>{status}</span>
        {/* arrow hint */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="#e0a85a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function Empty({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "1.75rem 0" }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" opacity="0.35">
        <circle cx="12" cy="12" r="10" stroke="#c8924e" strokeWidth="1.2" />
        <path d="M8 12h8" stroke="#c8924e" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "rgba(200,146,78,0.5)", margin: 0 }}>{text}</p>
    </div>
  );
}

/* ── Ornament ── */
function Ornament() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.4, marginBottom: "1.75rem" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(200,146,78,0.6))" }} />
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <polygon points="5,0 10,5 5,10 0,5" fill="#c8924e" opacity="0.9" />
        <circle cx="5" cy="5" r="1.5" fill="#0a0703" />
      </svg>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left,transparent,rgba(200,146,78,0.6))" }} />
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile()
      .then(data => setProfile({ ...data, teams: data.teams ?? [], events: data.events ?? [] }))
      .catch(() => setError("Failed to load profile. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes eg-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .profile-page {
          min-height:100vh; width:100%; background:#0a0703;
          padding:88px 20px 60px; box-sizing:border-box;
          display:flex; align-items:flex-start; justify-content:center;
        }
        .profile-card {
          background:linear-gradient(160deg,#120e08 0%,#160f09 100%);
          border:1px solid rgba(180,124,60,0.28);
          border-radius:10px; overflow:hidden;
        }
        .profile-header {
          padding:2rem 2rem 1.75rem;
          border-bottom:1px solid rgba(180,124,60,0.14);
          position:relative;
        }
        .header-glow {
          position:absolute; top:0; left:0; right:0; height:160px;
          background:radial-gradient(ellipse at 50% 0%,rgba(180,124,60,0.12) 0%,transparent 70%);
          pointer-events:none;
        }
        .profile-body { padding:1.75rem 2rem; }
        @media(max-width:580px){ .profile-header,.profile-body{ padding:1.25rem; } }
      `}</style>

      <div className="profile-page">
        <div style={{ position: "fixed", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(180,124,60,0.07) 0%,transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

        <div style={{ width: "100%", maxWidth: 720, position: "relative", zIndex: 1 }}>

          {/* Loading */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: "6rem" }}>
              <svg width="52" height="38" viewBox="0 0 52 38" fill="none" style={{ animation: "eg-pulse 1.5s ease-in-out infinite" }}>
                <path d="M2 19 Q26 2 50 19 Q26 36 2 19Z" stroke="#c8924e" strokeWidth="1.2" fill="none" />
                <circle cx="26" cy="19" r="8" stroke="#c8924e" strokeWidth="1" fill="none" />
                <circle cx="26" cy="19" r="3.5" fill="#c8924e" />
              </svg>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(200,146,78,0.5)", margin: 0 }}>
                Consulting the scrolls…
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ padding: "1.25rem 1.5rem", border: "1px solid rgba(200,60,60,0.3)", borderRadius: 6, background: "rgba(200,60,60,0.08)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "rgba(250,160,160,0.9)", textAlign: "center" }}>
              {error}
            </div>
          )}

          {/* Profile */}
          {profile && (() => {
            const displayName = profile.name || profile.username || profile.email.split("@")[0];
            return (
              <div className="profile-card">

                {/* Header */}
                <div className="profile-header">
                  <div className="header-glow" />
                  <Ornament />

                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                    {/* Avatar */}
                    {profile.avatarUrl ? (
                      <div style={{ width: 84, height: 84, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(180,124,60,0.55)", flexShrink: 0, boxShadow: "0 0 24px rgba(180,124,60,0.18)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={profile.avatarUrl} alt={displayName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <InitialsAvatar name={displayName} size={84} />
                    )}

                    {/* Name block */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f5ead8", margin: "0 0 0.2rem", lineHeight: 1 }}>
                        {displayName}
                      </h1>
                      {profile.username && (
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#c8924e", margin: "0 0 0.75rem", fontWeight: 400 }}>
                          @{profile.username}
                        </p>
                      )}
                      <RoleBadge role={profile.role} />
                    </div>

                    {/* Member since */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,146,78,0.45)", margin: "0 0 3px" }}>Member since</p>
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "#c8924e", margin: 0 }}>
                        {new Date(profile.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="profile-body">

                  <Section title="Identity">
                    <InfoRow label="Email" value={profile.email} verified={profile.verified} />
                    {profile.username && <InfoRow label="Username" value={`@${profile.username}`} />}
                    {profile.name && <InfoRow label="Name" value={profile.name} />}
                  </Section>

                  <Section title="Teams" count={profile.teams.length}>
                    {profile.teams.length === 0
                      ? <Empty text="Not part of any team yet" />
                      : <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {profile.teams.map(t => <TeamCard key={t.id} team={t} />)}
                      </div>
                    }
                  </Section>

                  <Section title="Registered Events" count={profile.events.length}>
                    {profile.events.length === 0
                      ? <Empty text="No events registered yet" />
                      : <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {profile.events.map(ev => (
                          <EventCard
                            key={ev.id}
                            event={ev}
                            onClick={() => router.push(`/events/${ev.id}`)}
                          />
                        ))}
                      </div>
                    }
                  </Section>

                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </>
  );
}
