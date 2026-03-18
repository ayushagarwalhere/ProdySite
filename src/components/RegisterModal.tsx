"use client";

import { useEffect, useState } from "react";
import {
  checkTeamForEvent, createTeam, joinTeam,
  leaveTeam, removeMember, type Team,
} from "@/lib/api/teams";
import { registerEvent } from "@/lib/api/events";

const S = {
  overlay: { position: "fixed", inset: 0, zIndex: 100, background: "rgba(4,3,2,0.9)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" } as React.CSSProperties,
  box: { width: "100%", maxWidth: 440, background: "#0e0b06", border: "1px solid rgba(180,124,60,0.25)", borderRadius: 8, padding: "1.75rem", maxHeight: "90vh", overflowY: "auto" } as React.CSSProperties,
  heading: { fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "0.05em", textTransform: "uppercase", color: "#f5ead8", margin: 0 } as React.CSSProperties,
  label: { display: "block", marginBottom: 6, fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,146,78,0.5)" } as React.CSSProperties,
  input: { width: "100%", padding: "0.75rem 1rem", background: "rgba(180,124,60,0.07)", border: "1px solid rgba(180,124,60,0.25)", borderRadius: 4, color: "#f5ead8", fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" } as React.CSSProperties,
  btn: { width: "100%", padding: "0.75rem", background: "#b47c3c", border: "none", borderRadius: 4, color: "#0a0703", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" } as React.CSSProperties,
  ghostBtn: { width: "100%", padding: "0.75rem", background: "transparent", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 4, color: "#c8924e", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" } as React.CSSProperties,
  muted: { fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "rgba(200,146,78,0.5)", margin: 0 } as React.CSSProperties,
  memberRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0.75rem", background: "rgba(180,124,60,0.05)", border: "1px solid rgba(180,124,60,0.12)", borderRadius: 4 } as React.CSSProperties,
  codePill: { background: "rgba(180,124,60,0.1)", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 4, padding: "3px 10px", cursor: "pointer", color: "#e0a85a", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.1em" } as React.CSSProperties,
};

export function RegisterModal({
  eventId, eventTitle,
  minSize = 1, maxSize = 4, mode = "TEAM",
  onClose, onSuccess,
}: {
  eventId: string; eventTitle: string;
  minSize?: number; maxSize?: number; mode?: string;
  onClose: () => void; onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<Team | null>(null);
  const [tab, setTab] = useState<"create" | "join">("create");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  // single call on open — backend knows who's logged in via cookie
  useEffect(() => {
    setLoading(true);
    checkTeamForEvent(eventId)
      .then(d => setTeam(d.hasTeam ? d.team : null))
      .catch(() => setTeam(null))
      .finally(() => setLoading(false));
  }, [eventId]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const flash = (m: string, isErr = false) => {
    isErr ? setErr(m) : setMsg(m);
    setTimeout(() => isErr ? setErr("") : setMsg(""), 3500);
  };

  const errMsg = (e: unknown): string => {
    if (typeof e === "object" && e !== null) {
      const axiosMsg = (e as { response?: { data?: { message?: string } } }).response?.data?.message;
      const errMessage = (e as { message?: string }).message;
      return axiosMsg ?? errMessage ?? "Something went wrong.";
    }
    return "Something went wrong.";
  };

  const doCreate = async () => {
    if (!name.trim()) return;
    setBusy(true); setErr("");
    try {
      setTeam(await createTeam(name.trim(), eventId));
      flash("Team created! Share the code with your teammates.");
    } catch (e) { flash(errMsg(e), true); }
    finally { setBusy(false); }
  };

  const doJoin = async () => {
    if (!code.trim()) return;
    setBusy(true); setErr("");
    try {
      setTeam(await joinTeam(code.trim().toUpperCase()));
      flash("Joined team!");
    } catch (e) { flash(errMsg(e), true); }
    finally { setBusy(false); }
  };

  const doRegister = async () => {
    setBusy(true); setErr("");
    try {
      await registerEvent(eventId, team?.id ?? null);
      setTeam(t => t ? { ...t, registered: true } : t);
      flash("Registered!");
      setTimeout(() => { onSuccess?.(); onClose(); }, 1000);
    } catch (e) { flash(errMsg(e), true); }
    finally { setBusy(false); }
  };

  const doLeave = async () => {
    if (!team) return;
    setBusy(true);
    try {
      await leaveTeam(team.id);
      setTeam(null);
      flash("Left team.");
    } catch (e) { flash(errMsg(e), true); }
    finally { setBusy(false); }
  };

  const doRemove = async (userId: string) => {
    if (!team) return;
    try {
      await removeMember(team.id, userId);
      setTeam(t => {
        if (!t) return t;
        const members = t.members.filter(m => m.userId !== userId);
        const current = members.length;
        return {
          ...t, members, memberCount: current,
          teamSize: { ...t.teamSize, current, canRegister: current >= t.teamSize.min, canJoin: current < t.teamSize.max },
        };
      });
    } catch (e) { flash(errMsg(e), true); }
  };

  const canRegister = team?.teamSize?.canRegister ?? false;

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.box}>

        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <h2 style={S.heading}>{eventTitle}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(180,124,60,0.5)", cursor: "pointer", fontSize: "1.2rem", lineHeight: 1 }}>✕</button>
        </div>

        {/* loading */}
        {loading && <p style={S.muted}>Checking registration…</p>}

        {/* ── NO TEAM ── */}
        {!loading && !team && (
          mode === "SOLO" ? (
            <button onClick={doRegister} disabled={busy} style={{ ...S.btn, opacity: busy ? 0.6 : 1 }}>
              {busy ? "Registering…" : "Register"}
            </button>
          ) : (
            <>
              {/* tabs */}
              <div style={{ display: "flex", marginBottom: "1.25rem", border: "1px solid rgba(180,124,60,0.2)", borderRadius: 4, overflow: "hidden" }}>
                {(["create", "join"] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    flex: 1, padding: "0.6rem", border: "none", cursor: "pointer",
                    background: tab === t ? "rgba(180,124,60,0.15)" : "transparent",
                    color: tab === t ? "#e0a85a" : "rgba(200,146,78,0.4)",
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
                    fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase",
                    borderRight: t === "create" ? "1px solid rgba(180,124,60,0.2)" : "none",
                  }}>
                    {t === "create" ? "Create team" : "Join with code"}
                  </button>
                ))}
              </div>

              {tab === "create" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <span style={S.label}>Team name</span>
                    <input style={S.input} placeholder="e.g. Team Phoenix"
                      value={name} onChange={e => setName(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && doCreate()} autoFocus />
                  </div>
                  <p style={S.muted}>Team size: {minSize}–{maxSize} members</p>
                  <button onClick={doCreate} disabled={busy || !name.trim()}
                    style={{ ...S.btn, opacity: busy || !name.trim() ? 0.5 : 1 }}>
                    {busy ? "Creating…" : "Create team"}
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div>
                    <span style={S.label}>Team code</span>
                    <input style={{ ...S.input, textTransform: "uppercase", letterSpacing: "0.2em" }}
                      placeholder="SDKHWF" value={code}
                      onChange={e => setCode(e.target.value.toUpperCase())}
                      onKeyDown={e => e.key === "Enter" && doJoin()}
                      maxLength={12} autoFocus />
                  </div>
                  <button onClick={doJoin} disabled={busy || code.length < 4}
                    style={{ ...S.btn, opacity: busy || code.length < 4 ? 0.5 : 1 }}>
                    {busy ? "Joining…" : "Join team"}
                  </button>
                </div>
              )}
            </>
          )
        )}

        {/* ── HAS TEAM ── */}
        {!loading && team && (
          <>
            {/* name + code */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#f5ead8", margin: 0 }}>
                {team.name}
              </p>
              {!team.registered && (
                <button style={S.codePill}
                  onClick={() => navigator.clipboard.writeText(team.teamCode).then(() => flash("Copied!"))}
                  title="Click to copy">
                  {team.teamCode} ⎘
                </button>
              )}
            </div>

            {/* members */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.85rem" }}>
              {team.members.map(m => (
                <div key={m.userId} style={S.memberRow}>
                  <div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "#f5ead8" }}>{m.name}</span>
                    <span style={{ ...S.muted, display: "inline", marginLeft: 8 }}>@{m.username}</span>
                    {m.isAdmin && (
                      <span style={{ marginLeft: 8, fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#c8924e", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 2, padding: "1px 5px" }}>
                        admin
                      </span>
                    )}
                  </div>
                  {team.isUserAdmin && !team.registered && !m.isAdmin && (
                    <button onClick={() => doRemove(m.userId)}
                      style={{ background: "none", border: "none", color: "rgba(220,80,80,0.45)", cursor: "pointer", fontSize: "0.72rem", fontFamily: "'DM Sans',sans-serif", padding: "2px 6px" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "rgba(220,80,80,0.9)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(220,80,80,0.45)")}>
                      remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* size hint */}
            <p style={{ ...S.muted, marginBottom: "1rem" }}>
              {team.teamSize.current} / {team.teamSize.max} members &nbsp;·&nbsp;
              {canRegister
                ? <span style={{ color: "#c8924e" }}>✓ ready to register</span>
                : `need ${team.teamSize.min - team.teamSize.current} more`}
            </p>

            {/* registered */}
            {team.registered && (
              <p style={{ ...S.muted, color: "#c8924e", textAlign: "center", padding: "0.75rem", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 4 }}>
                ✓ Your team is registered
              </p>
            )}

            {/* admin: register */}
            {team.isUserAdmin && !team.registered && (
              <button onClick={doRegister} disabled={busy || !canRegister}
                style={{ ...S.btn, opacity: busy || !canRegister ? 0.45 : 1, cursor: canRegister ? "pointer" : "not-allowed" }}>
                {busy ? "Registering…" : "Register team"}
              </button>
            )}

            {/* member: leave */}
            {!team.isUserAdmin && !team.registered && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={S.muted}>Waiting for your admin to register the team.</p>
                <button onClick={doLeave} disabled={busy}
                  style={{ ...S.ghostBtn, opacity: busy ? 0.5 : 1 }}>
                  {busy ? "Leaving…" : "Leave team"}
                </button>
              </div>
            )}
          </>
        )}

        {/* feedback */}
        {err && <p style={{ ...S.muted, color: "rgba(240,130,130,0.85)", marginTop: "0.75rem" }}>{err}</p>}
        {msg && <p style={{ ...S.muted, color: "#c8924e", marginTop: "0.75rem" }}>{msg}</p>}
      </div>
    </div>
  );
};
