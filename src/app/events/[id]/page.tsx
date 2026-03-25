"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/lib/api/events";
import { RegisterModal } from "@/components/RegisterModal";
import Footer from "@/components/custom/footer";

/* ─────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────── */
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
  abstract?: string | null;
};

type Round = { title: string; desc: string };
type FAQ   = { q: string; a: string };
type Meta  = {
  tag: string;
  date: string;
  venue: string;
  tagline: string;
  rounds: Round[];
  rules: string[];
  faqs: FAQ[];
};

/* ─────────────────────────────────────────────────────────────────────────
   EVENT METADATA
───────────────────────────────────────────────────────────────────────── */

const EVENT_META: Record<string, Meta> = {

  "hackathon": {
    tag: "CSE", date: "April 3-5", venue: "Old LH",
    tagline: "Code. Create. Conquer.",
    rounds: [
      { title: "Problem Statement Reveal", desc: "Teams receive domain-specific problem statements at the opening ceremony. Study them carefully — your 24 hours start now." },
      { title: "Prototype Presentation", desc: "8 minutes to demo your product followed by a 5-minute Q&A with judges from industry and academia." },
      { title: "Grand Finale", desc: "Top 3 teams present on the main stage. Prizes and recruitment fast-tracks announced." },
    ],
    rules: [
      "Teams must consist of 2 to 4 members. Solo entries are not accepted.",
      "All code must be written during the hackathon window. No pre-built projects.",
      "Open-source libraries and public APIs are permitted. Plagiarism results in immediate disqualification.",
      "Submissions must be pushed to the provided GitHub repository before the deadline.",
      "Hardware damage is the financial responsibility of the team.",
    ],
    faqs: [
      { q: "Can participants from different branches register together?", a: "Yes — cross-branch teams are actively encouraged." },
      { q: "Is there a registration fee?", a: "No registration fee is applicable." },
      { q: "What tech stack can we use?", a: "Any language, framework, or platform. The only constraint is that the code must be written during the event." },
    ],
  },

  "pyrabid": {
    tag: "MNC",
    date: "April 3-5",
    venue: "Old LH",
    tagline: "Strategy. Risk. Power.",
    rounds: [
      {
        title: "Game Phase",
        desc: "Teams start with a fixed number of credits and play from a set of available games. Winning rewards additional credits while losing results in the loss of invested credits. Teams must carefully decide where to invest their credits."
      },
      {
        title: "Auction Phase",
        desc: "Top teams advance to an auction round where they use accumulated credits to bid for special keys. These keys unlock pyramids that contain hidden powers and rewards."
      }
    ],
    rules: [
      "Teams can have up to 4 members.",
      "Each team starts with a fixed number of credits.",
      "Credits must be used strategically across the available games.",
      "Winning games adds credits while losing deducts the invested credits.",
      "Only top teams qualify for the auction phase."
    ],
    faqs: [
      { q: "Can beginners participate?", a: "Yes. The event is open to everyone with basic strategic thinking." },
      { q: "Is the event purely luck based?", a: "No. Strategy and decision-making play the most important role." },
      { q: "What happens in round 2?", a: "Round 2 is an auction where teams bid on keys that unlock pyramids containing special powers and rewards." }
    ]
  },

  "chemystery": {
    tag: "CH",
    date: "April 3-5",
    venue: "Old LH",
    tagline: "Observe. Analyze. Solve the mystery.",
    rounds: [
      {
        title: "Qualifying Round",
        desc: "Participants watch a series of 7 videos containing important visual clues and case-related information. Teams get time to analyze the details before answering questions based on the video content."
      },
      {
        title: "Final Round",
        desc: "Shortlisted teams investigate a staged crime mystery. Hidden hints are revealed gradually and teams collect samples, perform chemical experiments, analyze evidence and determine what happened."
      }
    ],
    rules: [
      "Teams must consist of 2 members.",
      "Prior registration is required.",
      "Phones and electronic devices are collected during the observation phase.",
      "All materials and chemicals will be provided by the organizers."
    ],
    faqs: [
      { q: "Do we have to bring any apparatus?", a: "No. Everything required will be provided." },
      { q: "What are the judging criteria?", a: "Time taken and points collected during the game." },
      { q: "How many members can be in a team?", a: "Teams consist of 2 members." },
      { q: "How many teams qualify for round 2?", a: "10 teams will qualify for the final round." }
    ]
  },

  "ohmic-curse": {
    tag: "EE",
    date: "April 3-5",
    venue: "Old LH",
    tagline: "Solve circuits. Escape the challenge.",
    rounds: [
      {
        title: "Qualifying Round",
        desc: "Participants go through multiple turns where they select questions of different difficulty levels carrying different points. Teams must strategically choose questions to maximize their total score."
      },
      {
        title: "Escape Room Challenge",
        desc: "Top teams enter a technical escape room where they solve interconnected electrical and electronics challenges, identify clues and progress step-by-step to reach the final stage."
      }
    ],
    rules: [
      "Teams must consist of 2-4 members.",
      "Only materials provided at the venue may be used.",
      "Misconduct or unfair means will result in immediate disqualification.",
      "Organizers’ decisions are final."
    ],
    faqs: [
      { q: "What is the team size?", a: "Each team must have a minimum of 2 and maximum of 4 members." },
      { q: "What happens if the final task is not completed?", a: "The team will be eliminated if the task is not finished within the given time." },
      { q: "How are winners decided?", a: "Winners are determined based on time and accuracy in the final round." }
    ]
  },

  "sail-yo-boat": {
    tag: "ME",
    date: "April 3-5",
    venue: "Old LH",
    tagline: "Design it. Build it. Sail it.",
    rounds: [
      {
        title: "Construction Round",
        desc: "Teams design and build a wind-powered sailboat using only the materials provided during the event within the given time limit."
      },
      {
        title: "Performance Testing",
        desc: "The boats are tested in a straight water tank using wind from a fixed speed fan. Performance is judged based on speed, distance and stability."
      }
    ],
    rules: [
      "Teams must consist of 3-4 members.",
      "Boat construction time is limited to 60-90 minutes.",
      "Only materials provided during the event may be used.",
      "No electronics or external propulsion systems are allowed."
    ],
    faqs: [
      { q: "Is cross-branch participation allowed?", a: "Yes. Students from any branch can participate." },
      { q: "Can we use electronic circuits?", a: "No. Electronics or external propulsion systems are not allowed." },
      { q: "Can we build the boat before the event?", a: "No. Boats must be built entirely during the event." }
    ]
  },

  "truss-the-process": {
    tag: "CE",
    date: "April 3-5",
    venue: "Old LH",
    tagline: "Communicate. Construct. Conquer.",
    rounds: [
      {
        title: "Layer Construction",
        desc: "Teams construct a structure in three layers — base, middle and top. Supervisors guide builders using only verbal communication."
      },
      {
        title: "Final Evaluation",
        desc: "The final structure is compared against the reference design and evaluated based on accuracy, teamwork and decision-making."
      }
    ],
    rules: [
      "Teams must consist of 3-4 members including one supervisor.",
      "Builders cannot see the design.",
      "Supervisors cannot see the structure being built.",
      "Only verbal communication is allowed.",
      "No electronic devices or external help are permitted."
    ],
    faqs: [
      { q: "Do participants need civil engineering knowledge?", a: "No. Basic teamwork and understanding are sufficient." },
      { q: "Will materials be provided?", a: "Yes. Materials such as sticks, glue and base board will be provided." },
      { q: "Is communication restricted?", a: "Yes. Only verbal communication is allowed during the event." }
    ]
  }

};

function getMeta(title: string): Meta {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  if (EVENT_META[slug]) return EVENT_META[slug];
  const key = Object.keys(EVENT_META).find(k => title.toLowerCase().includes(k.replace(/-/g, " ")));
  if (key) return EVENT_META[key];
  return {
    tag: "Event", date: "Feb 2026", venue: "Main Campus",
    tagline: "A Prodyogiki '26 event.",
    rounds: [], rules: [], faqs: [],
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────────────────────────────────── */
function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ border: "1px solid rgba(180,124,60,0.18)", borderRadius: 6, overflow: "hidden", transition: "border-color 0.2s" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(180,124,60,0.4)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(180,124,60,0.18)")}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: "100%", background: "transparent", border: "none", cursor: "pointer", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}
      >
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "#f5ead8", textAlign: "left", lineHeight: 1.5 }}>{faq.q}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }}>
          <path d="M6 9l6 6 6-6" stroke="#c8924e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.3s cubic-bezier(0.22,1,0.36,1)" }}>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "rgba(240,232,214,0.65)", lineHeight: 1.7, margin: 0, padding: "0 1.25rem 1rem" }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SECTION HEAD
───────────────────────────────────────────────────────────────────────── */
function SectionHead({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
      <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
        <polygon points="5,0 10,5 5,10 0,5" fill="#c8924e" opacity="0.9" />
      </svg>
      <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase", color: "#c8924e" }}>{title}</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right,rgba(200,146,78,0.3),transparent)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   STAT PILL
───────────────────────────────────────────────────────────────────────── */
function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: "0.75rem 1rem", border: "1px solid rgba(180,124,60,0.2)", borderRadius: 6, background: "rgba(180,124,60,0.05)" }}>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,146,78,0.45)", margin: "0 0 3px" }}>{label}</p>
      <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#f5ead8", margin: 0 }}>{value}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────────────── */
export default function EventPage() {
  const params  = useParams();
  const router  = useRouter();
  const id      = params?.id as string;

  const [event,     setEvent]     = useState<Event | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then(data => setEvent(data as Event))
      .catch(() => setError("Event not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const muted: React.CSSProperties = {
    fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem",
    color: "rgba(200,146,78,0.55)", margin: 0,
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0703", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={muted}>Loading…</p>
    </div>
  );

  if (error || !event) return (
    <div style={{ minHeight: "100vh", background: "#0a0703", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <p style={{ ...muted, color: "rgba(240,130,130,0.8)" }}>{error || "Event not found."}</p>
      <button onClick={() => router.push("/events")} style={{ background: "transparent", border: "1px solid rgba(180,124,60,0.3)", borderRadius: 4, padding: "0.6rem 1.25rem", color: "#c8924e", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        ← Back to Events
      </button>
    </div>
  );

  const meta     = getMeta(event.title);
  const teamSize = event.minTeamSize && event.maxTeamSize ? `${event.minTeamSize}–${event.maxTeamSize}` : "Open";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; background: #0a0703; color: #f5ead8; }
        @keyframes live-pulse { 0%,100%{opacity:1;box-shadow:0 0 6px rgba(224,168,90,.8)} 50%{opacity:.6;box-shadow:0 0 14px rgba(224,168,90,.4)} }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0a0703", paddingTop: 64 }}>

        {/* back */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "1.5rem 1.5rem 0" }}>
          <button onClick={() => router.push("/events")}
            style={{ background: "transparent", border: "none", color: "rgba(200,146,78,0.5)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", padding: 0, display: "flex", alignItems: "center", gap: 6, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c8924e")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(200,146,78,0.5)")}
          >
            ← Events
          </button>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>

          {/* ── HERO ── */}
          <div style={{ marginBottom: "2.5rem" }}>
            {/* tag + date row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8924e", padding: "3px 10px", border: "1px solid rgba(180,124,60,0.4)", borderRadius: 20 }}>
                {meta.tag}
              </span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(200,146,78,0.55)", letterSpacing: "0.08em" }}>
                {meta.date}
              </span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(200,146,78,0.45)", letterSpacing: "0.06em" }}>
                · {meta.venue}
              </span>
            </div>

            {/* title + live badge */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: "0.6rem" }}>
              <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,7vw,4rem)", textTransform: "uppercase", letterSpacing: "0.02em", color: "#f5ead8", margin: 0, lineHeight: 1 }}>
                {event.title}
              </h1>
              {event.isLive && (
                <span style={{ flexShrink: 0, marginTop: 8, padding: "4px 10px", border: "1px solid rgba(180,124,60,0.45)", borderRadius: 4, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#e0a85a", whiteSpace: "nowrap", animation: "live-pulse 1.8s ease-in-out infinite" }}>
                  ● Live
                </span>
              )}
            </div>

            {/* tagline */}
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "clamp(1rem,2vw,1.25rem)", color: "rgba(200,146,78,0.65)", margin: "0 0 1.75rem", fontWeight: 300 }}>
              {meta.tagline}
            </p>

            {/* abstract button */}
            {event.abstract && (
              <a
                href={event.abstract}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  marginBottom: "1.75rem",
                  padding: "0.6rem 1.25rem",
                  border: "1px solid rgba(180,124,60,0.4)",
                  borderRadius: 4,
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 700, fontSize: "0.78rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#c8924e", textDecoration: "none",
                  background: "rgba(180,124,60,0.06)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(180,124,60,0.7)";
                  (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(180,124,60,0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(180,124,60,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(180,124,60,0.06)";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="10" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                View Abstract
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6 }}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </a>
            )}

            {/* divider */}
            <div style={{ height: 1, background: "linear-gradient(to right, rgba(180,124,60,0.35), transparent)" }} />
          </div>

          {/* ── STATS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "0.75rem", marginBottom: "2.5rem" }}>
            {event.prizePool && <StatPill label="Prize Pool" value={`₹${event.prizePool.toLocaleString()}`} />}
            <StatPill label="Mode"      value={event.mode} />
            <StatPill label="Team Size" value={teamSize} />
            <StatPill label="Date"      value={meta.date} />
            <StatPill label="Venue"     value={meta.venue} />
          </div>

          {/* ── DESCRIPTION ── */}
          {event.description && (
            <div style={{ marginBottom: "2.5rem" }}>
              <SectionHead title="About" />
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "rgba(240,232,214,0.7)", lineHeight: 1.85, margin: 0 }}>
                {event.description}
              </p>
            </div>
          )}

          {/* ── ROUNDS ── */}
          {meta.rounds.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <SectionHead title="Rounds" />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {meta.rounds.map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: "1.25rem", padding: "1.1rem 1.25rem", border: "1px solid rgba(180,124,60,0.18)", borderRadius: 6, background: "rgba(180,124,60,0.04)", transition: "border-color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(180,124,60,0.4)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(180,124,60,0.18)")}
                  >
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "rgba(200,146,78,0.15)", lineHeight: 1, flexShrink: 0, minWidth: 36 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.06em", textTransform: "uppercase", color: "#f5ead8", margin: "0 0 0.4rem" }}>{r.title}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "rgba(240,232,214,0.6)", lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── RULES ── */}
          {meta.rules.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <SectionHead title="Rules" />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {meta.rules.map((rule, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#c8924e", flexShrink: 0, marginTop: 3 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.875rem", color: "rgba(240,232,214,0.7)", lineHeight: 1.65, margin: 0 }}>{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FAQs ── */}
          {meta.faqs.length > 0 && (
            <div style={{ marginBottom: "2.5rem" }}>
              <SectionHead title="FAQs" />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {meta.faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
              </div>
            </div>
          )}

          {/* ── CTA ── */}
          <div style={{ textAlign: "center", paddingTop: "2rem", borderTop: "1px solid rgba(180,124,60,0.12)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.05rem", color: "rgba(200,146,78,0.5)", marginBottom: "1.25rem" }}>
              {event.isLive ? "Registration is currently open." : "Registration is not yet open."}
            </p>
            <button
              disabled={!event.isLive}
              onClick={() => {
                if (!event.isLive) return;
                if (event.title?.toLowerCase() === "hackathon") {
                  window.open("https://unstop.com/hackathons/the-rosetta-code-hackathon-nit-hamirpur-1664852", "_blank", "noopener,noreferrer");
                  return;
                }
                setShowModal(true);
              }}
              style={{
                padding: "0.9rem 2.5rem",
                background: event.isLive ? "#b47c3c" : "rgba(180,124,60,0.15)",
                border: event.isLive ? "none" : "1px solid rgba(180,124,60,0.2)",
                borderRadius: 4, cursor: event.isLive ? "pointer" : "not-allowed",
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
                fontSize: "0.9rem", letterSpacing: "0.18em", textTransform: "uppercase",
                color: event.isLive ? "#0a0703" : "rgba(180,124,60,0.35)",
                transition: "background 0.2s",
              }}
            >
              {event.isLive ? "Register Now" : "Coming Soon"}
            </button>
          </div>
        </div>
      </div>

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
      <Footer/>
    </>
  );
}