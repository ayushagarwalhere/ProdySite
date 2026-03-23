"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/api/user";
import { api } from "@/lib/api/client";
import { joinTeam, deleteTeam } from "@/lib/api/teams";

/* ─── types ─── */
type TeamMember = {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string | null;
  };
};

type Team = {
  id: string;
  name: string;
  teamCode: string;
  isAdmin: boolean;
  memberCount: number;
  eventId: string;
  team?: TeamMember[];
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

type Registration = {
  id: string;
  registeredAt: string;
  registrationType: "team" | "solo";
  event: { id: string; title: string; mode: string; isLive: boolean };
  team?: { id: string; name: string; teamCode: string };
};

/* ─── errMsg ─── */
function errMsg(e: unknown): string {
  if (typeof e === "object" && e !== null) {
    const ax = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
    const em = (e as { message?: string }).message;
    return ax ?? em ?? "Something went wrong.";
  }
  return "Something went wrong.";
}

/* ─── shared modal tokens ─── */
const OVERLAY: React.CSSProperties = { position: "fixed", inset: 0, zIndex: 100, background: "rgba(4,3,2,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" };
const BOX:     React.CSSProperties = { width: "100%", maxWidth: 440, background: "#0e0b06", border: "1px solid rgba(180,124,60,0.25)", borderRadius: 8, padding: "1.75rem", maxHeight: "90vh", overflowY: "auto" };
const HEADING: React.CSSProperties = { fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "#f5ead8", margin: 0 };
const LABEL:   React.CSSProperties = { display: "block", marginBottom: 6, fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,146,78,0.5)" };
const INPUT:   React.CSSProperties = { width: "100%", padding: "0.75rem 1rem", background: "rgba(180,124,60,0.07)", border: "1px solid rgba(180,124,60,0.25)", borderRadius: 4, color: "#f5ead8", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" };
const BTN:     React.CSSProperties = { width: "100%", padding: "0.75rem", background: "#b47c3c", border: "none", borderRadius: 4, color: "#0a0703", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" };
const MUTED:   React.CSSProperties = { fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "rgba(200,146,78,0.5)", margin: 0 };
const MEMBER_ROW: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "rgba(180,124,60,0.05)", border: "1px solid rgba(180,124,60,0.12)", borderRadius: 4 };

/* ─────────────────────────────────────────────────────
   TEAM DETAIL MODAL
───────────────────────────────────────────────────── */
function TeamModal({ team, onClose, onDeleted }: { team: Team; onClose: () => void; onDeleted: () => void }) {
  const [copied,  setCopied]  = useState(false);
  const [deleting,setDeleting]= useState(false);
  const [err,     setErr]     = useState("");

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const copy = () => {
    navigator.clipboard.writeText(team.teamCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDelete = async () => {
    if (!confirm("Delete this team? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deleteTeam(team.id);
      onDeleted();
      onClose();
    } catch (e: unknown) {
      const ax = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
      const em = (e as { message?: string }).message;
      setErr(ax ?? em ?? "Failed to delete team.");
      setDeleting(false);
    }
  };

  const members = team.team ?? [];

  return (
    <div style={OVERLAY} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={BOX}>
        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <h2 style={HEADING}>{team.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {team.isAdmin && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                title="Delete team"
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(220,80,80,0.4)", padding: 4, borderRadius: 3, transition: "color 0.2s", opacity: deleting ? 0.5 : 1 }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(220,80,80,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(220,80,80,0.4)")}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(180,124,60,0.5)", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}>✕</button>
          </div>
        </div>

        {/* team code + role */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.1rem", flexWrap: "wrap" }}>
          <button
            onClick={copy}
            style={{ background: "rgba(180,124,60,0.1)", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 4, padding: "4px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}
          >
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.14em", color: "#e0a85a" }}>
              {team.teamCode}
            </span>
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#c8924e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6 }}>
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="#c8924e" strokeWidth="1.5"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="#c8924e" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
          <span style={{
            fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.65rem",
            letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 2,
            color: team.isAdmin ? "#e0a85a" : "rgba(200,146,78,0.5)",
            border: `1px solid ${team.isAdmin ? "rgba(180,124,60,0.4)" : "rgba(180,124,60,0.2)"}`,
            background: team.isAdmin ? "rgba(180,124,60,0.12)" : "transparent",
          }}>
            {team.isAdmin ? "Admin" : "Member"}
          </span>
        </div>

        {/* members — straight from profile, no extra fetch */}
        <p style={{ ...MUTED, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
          Members · {team.memberCount}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {members.map(m => (
            <div key={m.userId} style={MEMBER_ROW}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {m.user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.user.avatarUrl} alt={m.user.name} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(180,124,60,0.3)", flexShrink: 0 }}/>
                ) : (
                  <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(180,124,60,0.3)", background: "rgba(180,124,60,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#c8924e" }}>
                      {(m.user.name?.[0] ?? "?").toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#f5ead8" }}>{m.user.name}</span>
                  {m.user.username && (
                    <span style={{ ...MUTED, display: "inline", marginLeft: 8, fontSize: "0.72rem" }}>@{m.user.username}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {err && <p style={{ ...MUTED, color: "rgba(240,130,130,0.85)", marginTop: "0.75rem" }}>{err}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   JOIN CODE MODAL
───────────────────────────────────────────────────── */
function JoinCodeModal({ onClose, onJoined }: { onClose: () => void; onJoined: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err,  setErr]  = useState("");
  const [msg,  setMsg]  = useState("");

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const doJoin = async () => {
    if (code.length < 4) return;
    setBusy(true); setErr("");
    try {
      await joinTeam(code.trim().toUpperCase());
      setMsg("Joined team successfully!");
      setTimeout(() => { onClose(); onJoined(); }, 1200);
    } catch (e) {
      setErr(errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={OVERLAY} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={BOX}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <h2 style={HEADING}>Join a Team</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(180,124,60,0.5)", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}>✕</button>
        </div>
        <p style={{ ...MUTED, marginBottom: "1rem", lineHeight: 1.6 }}>
          Enter the team code shared by your team admin.
        </p>
        <div style={{ marginBottom: "0.75rem" }}>
          <span style={LABEL}>Team code</span>
          <input
            style={{ ...INPUT, textTransform: "uppercase", letterSpacing: "0.2em" }}
            placeholder="SDKHWF"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && doJoin()}
            maxLength={12}
            autoFocus
          />
        </div>
        <button
          onClick={doJoin}
          disabled={busy || code.length < 4}
          style={{ ...BTN, opacity: busy || code.length < 4 ? 0.5 : 1 }}
        >
          {busy ? "Joining…" : "Join Team"}
        </button>
        {err && <p style={{ ...MUTED, color: "rgba(240,130,130,0.85)", marginTop: "0.75rem" }}>{err}</p>}
        {msg && <p style={{ ...MUTED, color: "#c8924e", marginTop: "0.75rem" }}>{msg}</p>}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   EXISTING SUB-COMPONENTS (unchanged)
───────────────────────────────────────────────────── */
function InitialsAvatar({ name, size = 80 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 40% 35%, hsl(${hue},45%,32%) 0%, hsl(${hue},30%,16%) 100%)`, border: "2px solid rgba(180,124,60,0.6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 28px rgba(180,124,60,0.2)" }}>
      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: size * 0.34, color: `hsl(${hue},80%,82%)`, letterSpacing: "0.05em" }}>{initials}</span>
    </div>
  );
}

function Section({ title, count, action, children }: { title: string; count?: number; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.1rem" }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#c8924e" }}>
          {title}{count !== undefined ? ` · ${count}` : ""}
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(200,146,78,0.4), transparent)" }} />
        {action}
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value, verified }: { label: string; value: string; verified?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 0", borderBottom: "1px solid rgba(180,124,60,0.12)", gap: 12, flexWrap: "wrap" }}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", letterSpacing: "0.1em", color: "#c8924e", textTransform: "uppercase", minWidth: 80, fontWeight: 500 }}>{label}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "#f5ead8", display: "flex", alignItems: "center", gap: 8 }}>
        {value}
        {verified !== undefined && (
          <span style={{ fontSize: "0.6rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 2, background: verified ? "rgba(180,124,60,0.18)" : "rgba(200,60,60,0.14)", color: verified ? "#e0a85a" : "rgba(240,120,120,0.9)", border: `1px solid ${verified ? "rgba(180,124,60,0.4)" : "rgba(200,60,60,0.3)"}` }}>
            {verified ? "✓ Verified" : "✗ Unverified"}
          </span>
        )}
      </span>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = { ADMIN: "Grand Alchemist", USER: "Initiate", MODERATOR: "Arcane Warden" };
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "0.3rem 0.85rem", border: "1px solid rgba(180,124,60,0.45)", borderRadius: 2, background: "rgba(180,124,60,0.1)", clipPath: "polygon(7px 0%,100% 0%,calc(100% - 7px) 100%,0% 100%)" }}>
      <svg width="7" height="7" viewBox="0 0 10 10" fill="none"><polygon points="5,0 10,5 5,10 0,5" fill="#e0a85a" opacity="0.9"/></svg>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.88rem", color: "#e0a85a", letterSpacing: "0.05em", fontWeight: 400 }}>{map[role] ?? role}</span>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "1.75rem 0" }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" opacity="0.35">
        <circle cx="12" cy="12" r="10" stroke="#c8924e" strokeWidth="1.2"/>
        <path d="M8 12h8" stroke="#c8924e" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "rgba(200,146,78,0.5)", margin: 0 }}>{text}</p>
    </div>
  );
}

function Ornament() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.4, marginBottom: "1.75rem" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,transparent,rgba(200,146,78,0.6))" }}/>
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><polygon points="5,0 10,5 5,10 0,5" fill="#c8924e" opacity="0.9"/><circle cx="5" cy="5" r="1.5" fill="#0a0703"/></svg>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left,transparent,rgba(200,146,78,0.6))" }}/>
    </div>
  );
}

/* ─── team card — now clickable ─── */
function TeamCard({ team, onClick }: { team: Team; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ border: "1px solid rgba(180,124,60,0.22)", borderRadius: 6, background: "rgba(180,124,60,0.05)", overflow: "hidden", transition: "border-color 0.2s, background 0.2s", cursor: "pointer" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(180,124,60,0.5)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(180,124,60,0.08)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(180,124,60,0.22)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(180,124,60,0.05)"; }}
    >
      <div style={{ padding: "0.9rem 1.1rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, border: "1px solid rgba(180,124,60,0.4)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(180,124,60,0.1)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#e0a85a" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="#e0a85a" strokeWidth="1.5"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#e0a85a" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ textAlign: "left", minWidth: 0 }}>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f5ead8", margin: 0 }}>{team.name}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#c8924e", margin: "2px 0 0", fontWeight: 400 }}>
              {team.memberCount} member{team.memberCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: team.isAdmin ? "#e0a85a" : "rgba(200,146,78,0.55)", padding: "2px 8px", border: `1px solid ${team.isAdmin ? "rgba(180,124,60,0.45)" : "rgba(180,124,60,0.2)"}`, borderRadius: 2 }}>
            {team.isAdmin ? "Admin" : "Member"}
          </span>
          {/* arrow hint */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="#e0a85a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── registration card ─── */
function RegCard({ reg, onClick }: { reg: Registration; onClick: () => void }) {
  const isSolo = reg.registrationType === "solo";
  return (
    <div
      onClick={onClick}
      style={{ padding: "0.9rem 1.1rem", border: "1px solid rgba(180,124,60,0.22)", borderRadius: 6, background: "rgba(180,124,60,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(180,124,60,0.55)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(180,124,60,0.09)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(180,124,60,0.22)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(180,124,60,0.05)"; }}
    >
      <div style={{ minWidth: 0 }}>
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f5ead8", margin: "0 0 4px" }}>
          {reg.event.title}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(200,146,78,0.5)" }}>{reg.event.mode}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(200,146,78,0.3)", display: "inline-block" }}/>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", color: "rgba(200,146,78,0.5)" }}>
            {isSolo ? "Solo" : `Team · ${reg.team?.name ?? ""}`}
          </span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c8924e", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 2, padding: "1px 6px" }}>
            ✓ Registered
          </span>
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4, flexShrink: 0 }}>
        <path d="M5 12h14M13 6l6 6-6 6" stroke="#e0a85a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────── */
export default function ProfilePage() {
  const router = useRouter();
  const [profile,       setProfile]       = useState<Profile | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [loadingRegs,   setLoadingRegs]   = useState(true);
  const [error,         setError]         = useState("");
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  /* modal state */
  const [teamModal, setTeamModal] = useState<Team | null>(null);
  const [joinModal, setJoinModal] = useState(false);

  const loadProfile = () => {
    getProfile()
      .then(data => setProfile({ ...data, teams: data.teams ?? [], events: data.events ?? [] }))
      .catch((e: unknown) => {
        const status = (e as { response?: { status?: number } }).response?.status;
        if (status === 401 || status === 403) setNotLoggedIn(true);
        else setError("Failed to load profile.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProfile();
    api.get("/events/my-registrations")
      .then(res => setRegistrations(res.data ?? []))
      .catch(() => setRegistrations([]))
      .finally(() => setLoadingRegs(false));
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes eg-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .profile-page { min-height:100vh; width:100%; background:#0a0703; padding:88px 20px 60px; box-sizing:border-box; display:flex; align-items:flex-start; justify-content:center; }
        .profile-card { background:linear-gradient(160deg,#120e08 0%,#160f09 100%); border:1px solid rgba(180,124,60,0.28); border-radius:10px; overflow:hidden; }
        .profile-header { padding:2rem 2rem 1.75rem; border-bottom:1px solid rgba(180,124,60,0.14); position:relative; }
        .header-glow { position:absolute; top:0; left:0; right:0; height:160px; background:radial-gradient(ellipse at 50% 0%,rgba(180,124,60,0.12) 0%,transparent 70%); pointer-events:none; }
        .profile-body { padding:1.75rem 2rem; }
        @media(max-width:580px){ .profile-header,.profile-body{ padding:1.25rem; } }
      `}</style>

      <div className="profile-page">
        <div style={{ position: "fixed", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(180,124,60,0.07) 0%,transparent 70%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }}/>

        <div style={{ width: "100%", maxWidth: 720, position: "relative", zIndex: 1 }}>

          {/* loading */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: "6rem" }}>
              <svg width="52" height="38" viewBox="0 0 52 38" fill="none" style={{ animation: "eg-pulse 1.5s ease-in-out infinite" }}>
                <path d="M2 19 Q26 2 50 19 Q26 36 2 19Z" stroke="#c8924e" strokeWidth="1.2" fill="none"/>
                <circle cx="26" cy="19" r="8" stroke="#c8924e" strokeWidth="1" fill="none"/>
                <circle cx="26" cy="19" r="3.5" fill="#c8924e"/>
              </svg>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(200,146,78,0.5)", margin: 0 }}>
                Consulting the scrolls…
              </p>
            </div>
          )}

          {/* error */}
          {error && (
            <div style={{ padding: "1.25rem 1.5rem", border: "1px solid rgba(200,60,60,0.3)", borderRadius: 6, background: "rgba(200,60,60,0.08)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "rgba(250,160,160,0.9)", textAlign: "center" }}>
              {error}
            </div>
          )}

          {/* not logged in */}
          {notLoggedIn && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 20, paddingTop: "6rem", textAlign: "center",
            }}>
              <svg width="64" height="46" viewBox="0 0 52 38" fill="none" style={{ opacity: 0.5 }}>
                <path d="M2 19 Q26 2 50 19 Q26 36 2 19Z" stroke="#c8924e" strokeWidth="1.2" fill="none"/>
                <circle cx="26" cy="19" r="8" stroke="#c8924e" strokeWidth="1" fill="none"/>
                <circle cx="26" cy="19" r="3.5" fill="#c8924e" opacity="0.4"/>
                {/* closed lid */}
                <path d="M2 19 Q26 30 50 19" stroke="#c8924e" strokeWidth="1.5" fill="rgba(10,7,3,0.9)"/>
              </svg>
              <div>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                  fontSize: "1.3rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#f5ead8", margin: "0 0 0.5rem",
                }}>
                  The Scrolls Are Sealed
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
                  color: "rgba(200,146,78,0.55)", margin: "0 0 1.5rem", lineHeight: 1.6,
                }}>
                  Please login to see your profile.
                </p>
                <button
                  onClick={() => router.push("/login")}
                  style={{
                    padding: "0.65rem 2rem", background: "#b47c3c", border: "none",
                    borderRadius: 4, color: "#0a0703",
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
                    fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          )}

          {/* profile */}
          {!loading && profile && (() => {
            const displayName = profile.name || profile.username || profile.email.split("@")[0];
            return (
              <div className="profile-card">

                {/* header */}
                <div className="profile-header">
                  <div className="header-glow"/>
                  <Ornament/>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                    {profile.avatarUrl ? (
                      <div style={{ width: 84, height: 84, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(180,124,60,0.55)", flexShrink: 0, boxShadow: "0 0 24px rgba(180,124,60,0.18)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={profile.avatarUrl} alt={displayName} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
                      </div>
                    ) : (
                      <InitialsAvatar name={displayName} size={84}/>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f5ead8", margin: "0 0 0.2rem", lineHeight: 1 }}>
                        {displayName}
                      </h1>
                      {profile.username && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#c8924e", margin: "0 0 0.75rem", fontWeight: 400 }}>@{profile.username}</p>}
                      <RoleBadge role={profile.role}/>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,146,78,0.45)", margin: "0 0 3px" }}>Member since</p>
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "#c8924e", margin: 0 }}>
                        {new Date(profile.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* body */}
                <div className="profile-body">

                  <Section title="Identity">
                    <InfoRow label="Email"    value={profile.email}              verified={profile.verified}/>
                    {profile.username && <InfoRow label="Username" value={`@${profile.username}`}/>}
                    {profile.name     && <InfoRow label="Name"     value={profile.name}/>}
                  </Section>

                  {/* teams — with join button in header */}
                  <Section
                    title="Teams"
                    count={profile.teams.length}
                    action={
                      <button
                        onClick={() => setJoinModal(true)}
                        style={{ padding: "4px 12px", background: "transparent", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 3, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,146,78,0.65)", cursor: "pointer", whiteSpace: "nowrap", transition: "border-color 0.2s, color 0.2s" }}
                        onMouseEnter={e => { (e.currentTarget.style.borderColor = "rgba(180,124,60,0.65)"); (e.currentTarget.style.color = "#e0a85a"); }}
                        onMouseLeave={e => { (e.currentTarget.style.borderColor = "rgba(180,124,60,0.3)");  (e.currentTarget.style.color = "rgba(200,146,78,0.65)"); }}
                      >
                        + Join
                      </button>
                    }
                  >
                    {profile.teams.length === 0
                      ? <Empty text="Not part of any team yet"/>
                      : <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                          {profile.teams.map(t => (
                            <TeamCard key={t.id} team={t} onClick={() => setTeamModal(t)}/>
                          ))}
                        </div>
                    }
                  </Section>

                  {/* registered events */}
                  <Section title="Registered Events" count={loadingRegs ? undefined : registrations.length}>
                    {loadingRegs ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {Array.from({ length: 2 }).map((_, i) => (
                          <div key={i} style={{ height: 68, borderRadius: 6, background: "rgba(180,124,60,0.07)", animation: "eg-pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.15}s` }}/>
                        ))}
                      </div>
                    ) : registrations.length === 0 ? (
                      <Empty text="No events registered yet"/>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {registrations.map(reg => (
                          <RegCard
                            key={reg.id}
                            reg={reg}
                            onClick={() => router.push(`/events/${reg.event.id}`)}
                          />
                        ))}
                      </div>
                    )}
                  </Section>

                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* team detail modal */}
      {teamModal && (
        <TeamModal team={teamModal} onClose={() => setTeamModal(null)} onDeleted={() => { loadProfile(); }}/>
      )}

      {/* join code modal */}
      {joinModal && (
        <JoinCodeModal
          onClose={() => setJoinModal(false)}
          onJoined={() => { loadProfile(); }}
        />
      )}
    </>
  );
}