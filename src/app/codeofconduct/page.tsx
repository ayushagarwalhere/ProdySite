"use client";

import Link from "next/link";

const SECTIONS = [
  {
    glyph: "𓂀",
    num: "01",
    title: "Professional Behaviour",
    clauses: [
      "Treat fellow participants, judges, volunteers, and organizers with courtesy and respect at all times.",
      "Follow instructions issued by the organizing team promptly and without dispute.",
      "Maintain decorum in all physical venues as well as in online spaces — including group chats, forums, and social media — associated with the event.",
    ],
  },
  {
    glyph: "𓇳",
    num: "02",
    title: "Compliance with Rules",
    clauses: [
      "Adhere strictly to the guidelines, timelines, and submission requirements defined for each competition.",
      "Use only permitted resources, tools, or materials as explicitly stated in the event rules.",
      "Any attempt to gain an unfair advantage — including but not limited to plagiarism, use of pre-built work, or collusion — may result in immediate disqualification.",
    ],
  },
  {
    glyph: "𓊹",
    num: "03",
    title: "Communication",
    clauses: [
      "Use respectful and appropriate language in all interactions with participants, judges, volunteers, and organisers.",
      "Harassment, discrimination, intimidation, or any disruptive behaviour — whether verbal, written, or physical — will not be tolerated under any circumstances.",
    ],
  },
  {
    glyph: "𓋴",
    num: "04",
    title: "Safety & Responsibility",
    clauses: [
      "Participants must follow all safety instructions issued by event coordinators and comply with venue regulations at all times.",
      "Individuals are solely responsible for their personal belongings. The organising committee accepts no liability for loss or damage to personal property.",
    ],
  },
  {
    glyph: "𓅓",
    num: "05",
    title: "Disciplinary Action",
    clauses: [
      "Violation of this Code of Conduct may result in one or more of the following: a formal warning, score penalties, temporary removal from activities, or permanent disqualification from the event.",
      "The severity of the action taken shall be at the sole discretion of the organising committee, commensurate with the nature and gravity of the violation.",
    ],
  },
  {
    glyph: "𓆑",
    num: "06",
    title: "Final Authority",
    clauses: [
      "The interpretation of all rules and the resolution of any disputes rests solely with ISTE NIT Hamirpur's organising committee.",
      "Decisions made by the organising team are final, binding, and not subject to appeal.",
    ],
  },
];

export default function CodeOfConductPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400;500&family=Barlow+Condensed:wght@600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060402; color: #f5ead8; }

        .coc-page { min-height: 100vh; background: #060402; padding-top: 64px; position: relative; overflow-x: hidden; }

        .coc-bg-radial { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(ellipse 100% 55% at 50% 0%, rgba(100,45,5,0.24) 0%, transparent 65%); }
        .coc-bg-scan   { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(180,120,40,0.018) 3px,rgba(180,120,40,0.018) 4px); }

        .coc-top-border { position: fixed; top: 64px; left: 0; right: 0; height: 36px; z-index: 5; pointer-events: none; opacity: 0.4; }

        .coc-col { display: none; position: fixed; top: 0; bottom: 0; width: 56px; z-index: 3; pointer-events: none; opacity: 0.2; flex-direction: column; align-items: center; padding-top: 110px; }
        .coc-col-l { left: 0; }
        .coc-col-r { right: 0; transform: scaleX(-1); }
        .coc-col-line { position: absolute; right: 10px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent); }
        @media (min-width: 900px) { .coc-col { display: flex; } }

        .coc-wrap { position: relative; z-index: 10; max-width: 800px; margin: 0 auto; padding: 3rem 1.5rem 6rem; }
        @media (min-width: 640px)  { .coc-wrap { padding: 3.5rem 2.5rem 6rem; } }
        @media (min-width: 900px)  { .coc-wrap { padding: 4rem 3rem 6rem; } }

        /* ── hero ── */
        .coc-hero { text-align: center; margin-bottom: 3rem; }
        .coc-eyebrow { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase; color: rgba(231,186,128,0.4); margin-bottom: 1rem; }
        .coc-h1 { font-family: 'Cinzel Decorative', 'Cinzel', serif; font-weight: 700; font-size: clamp(1.6rem, 5vw, 2.8rem); color: #E7BA80; letter-spacing: 0.06em; line-height: 1.15; text-shadow: 0 0 60px rgba(231,186,128,0.2); margin-bottom: 0.6rem; }
        .coc-org  { font-family: 'Cinzel', serif; font-size: clamp(0.68rem, 1.5vw, 0.8rem); letter-spacing: 0.2em; text-transform: uppercase; color: rgba(231,186,128,0.4); margin-bottom: 1.25rem; }
        .coc-tagline { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 300; font-size: clamp(0.95rem, 2vw, 1.1rem); color: rgba(231,186,128,0.5); letter-spacing: 0.04em; margin-bottom: 1.75rem; }
        .coc-ornament { display: flex; align-items: center; justify-content: center; gap: 12px; }
        .coc-orn-l { height: 1px; width: 80px; background: linear-gradient(to right, transparent, #E7BA80); }
        .coc-orn-r { height: 1px; width: 80px; background: linear-gradient(to left,  transparent, #E7BA80); }

        /* ── preamble ── */
        .coc-preamble {
          padding: 1.1rem 1.4rem;
          border: 1px solid rgba(180,124,60,0.18);
          border-radius: 6px;
          background: rgba(180,124,60,0.04);
          margin-bottom: 2.5rem;
          display: flex; gap: 12px; align-items: flex-start;
        }
        .coc-preamble svg { flex-shrink: 0; margin-top: 2px; opacity: 0.55; }
        .coc-preamble p  { font-family: 'DM Sans', sans-serif; font-size: clamp(0.8rem, 1.8vw, 0.88rem); color: rgba(240,232,214,0.6); line-height: 1.75; }
        .coc-preamble strong { color: rgba(231,186,128,0.75); font-weight: 500; }

        /* ── section card ── */
        .coc-section { margin-bottom: 1.25rem; border: 1px solid rgba(180,124,60,0.15); border-radius: 6px; background: rgba(12,8,2,0.6); overflow: hidden; transition: border-color 0.25s; }
        .coc-section:hover { border-color: rgba(180,124,60,0.4); }

        .coc-section-head { display: flex; align-items: center; gap: 14px; padding: 1rem 1.4rem; border-bottom: 1px solid rgba(180,124,60,0.1); background: rgba(180,124,60,0.035); }
        .coc-section-num  { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: clamp(1.8rem, 4vw, 2.2rem); color: rgba(200,146,78,0.12); line-height: 1; flex-shrink: 0; min-width: 44px; }
        .coc-section-meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .coc-section-glyph { font-size: 1rem; opacity: 0.6; line-height: 1; }
        .coc-section-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: clamp(0.85rem, 2.5vw, 1.05rem); letter-spacing: 0.12em; text-transform: uppercase; color: #E7BA80; }

        .coc-clauses { padding: 1.1rem 1.4rem; display: flex; flex-direction: column; gap: 0.8rem; }
        .coc-clause  { display: flex; gap: 1rem; align-items: flex-start; }
        .coc-bullet  { width: 5px; height: 5px; border-radius: 50%; background: rgba(200,146,78,0.4); flex-shrink: 0; margin-top: 8px; }
        .coc-clause-text { font-family: 'DM Sans', sans-serif; font-size: clamp(0.8rem, 1.8vw, 0.875rem); color: rgba(240,232,214,0.65); line-height: 1.75; }

        /* ── divider ── */
        .coc-divider { display: flex; align-items: center; gap: 12px; margin: 2.5rem 0; }
        .coc-div-l { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(231,186,128,0.15)); }
        .coc-div-r { flex: 1; height: 1px; background: linear-gradient(to left,  transparent, rgba(231,186,128,0.15)); }

        /* ── footer note ── */
        .coc-footer { text-align: center; padding: 2rem 1.5rem; border: 1px solid rgba(180,124,60,0.15); border-radius: 6px; background: rgba(180,124,60,0.04); }
        .coc-footer p { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: rgba(231,186,128,0.45); line-height: 1.7; margin-bottom: 1.25rem; }
        .coc-back { display: inline-flex; align-items: center; gap: 8px; padding: 0.65rem 1.5rem; border: 1px solid rgba(180,124,60,0.35); border-radius: 3px; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(200,146,78,0.7); text-decoration: none; transition: border-color 0.2s, color 0.2s, background 0.2s; }
        .coc-back:hover { border-color: rgba(180,124,60,0.7); color: #E7BA80; background: rgba(180,124,60,0.08); }
      `}</style>

      <div className="coc-bg-radial" aria-hidden />
      <div className="coc-bg-scan"   aria-hidden />

      {/* top border */}
      <div className="coc-top-border" aria-hidden>
        <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="30" x2="10000" y2="30" stroke="#E7BA80" strokeWidth="0.8"/>
          <line x1="0" y1="34" x2="10000" y2="34" stroke="#E7BA80" strokeWidth="0.4"/>
          {Array.from({length:120}).map((_,i) => (
            <g key={i} transform={`translate(${i*80+8},0)`}>
              <path d="M20 28 L20 16 Q16 8 12 10 Q10 16 20 18" fill="#E7BA80" opacity="0.6"/>
              <path d="M20 28 L20 16 Q24 8 28 10 Q30 16 20 18" fill="#E7BA80" opacity="0.6"/>
              <path d="M20 28 L20 12 Q19 6 20 4 Q21 6 20 12"   fill="#E7BA80" opacity="0.8"/>
            </g>
          ))}
        </svg>
      </div>

      {/* side columns */}
      <div className="coc-col coc-col-l" aria-hidden>
        <div className="coc-col-line"/>
        <svg width="28" viewBox="0 0 28 700" fill="none">
          {[0,80,160,240,320,400,480,560].map((y,i) => (
            <g key={i} transform={`translate(4,${y})`}>
              <circle cx="12" cy="10" r="6" stroke="#E7BA80" strokeWidth="0.8" fill="none"/>
              <circle cx="12" cy="10" r="2.5" fill="#E7BA80"/>
              <line x1="12" y1="16" x2="12" y2="38" stroke="#E7BA80" strokeWidth="0.8"/>
              <path d="M6 22 Q12 18 18 22" stroke="#E7BA80" strokeWidth="0.8" fill="none"/>
            </g>
          ))}
        </svg>
      </div>
      <div className="coc-col coc-col-r" aria-hidden>
        <div className="coc-col-line"/>
        <svg width="28" viewBox="0 0 28 700" fill="none">
          {[40,120,200,280,360,440,520,600].map((y,i) => (
            <g key={i} transform={`translate(4,${y})`}>
              <path d="M12 2 L22 26 L2 26 Z" stroke="#E7BA80" strokeWidth="0.8" fill="none"/>
              <line x1="12" y1="10" x2="18" y2="26" stroke="#E7BA80" strokeWidth="0.5" opacity="0.4"/>
              <line x1="12" y1="10" x2="6"  y2="26" stroke="#E7BA80" strokeWidth="0.5" opacity="0.4"/>
            </g>
          ))}
        </svg>
      </div>

      <div className="coc-page">
        <div className="coc-wrap">

          {/* hero */}
          <div className="coc-hero">
            <p className="coc-eyebrow">Prodyogiki &rsquo;26 · ISTE NIT Hamirpur</p>
            <h1 className="coc-h1">Code of Conduct</h1>
            <p className="coc-org">Indian Society for Technical Education</p>
            <p className="coc-tagline">
              Enter with honour. Compete with integrity. Leave with respect.
            </p>
            <div className="coc-ornament">
              <div className="coc-orn-l"/>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <polygon points="10,1 19,10 10,19 1,10" stroke="#E7BA80" strokeWidth="0.8" fill="none" opacity="0.5"/>
                <circle cx="10" cy="10" r="3" fill="#E7BA80" opacity="0.7"/>
              </svg>
              <div className="coc-orn-r"/>
            </div>
          </div>

          {/* preamble */}
          <div className="coc-preamble">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#E7BA80" strokeWidth="1.3"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="#E7BA80" strokeWidth="1.3" strokeLinecap="round"/>
              <circle cx="12" cy="16" r="1" fill="#E7BA80"/>
            </svg>
            <p>
              All participants are expected to maintain{" "}
              <strong>professionalism, integrity, and respect</strong>{" "}
              throughout the event. By registering, every participant agrees to comply
              with the following rules. Failure to do so may result in disciplinary
              action at the sole discretion of the organising committee.
            </p>
          </div>

          {/* sections */}
          {SECTIONS.map((sec, i) => (
            <div key={i} className="coc-section">
              <div className="coc-section-head">
                <span className="coc-section-num">{sec.num}</span>
                <div className="coc-section-meta">
                  <span className="coc-section-glyph">{sec.glyph}</span>
                  <span className="coc-section-title">{sec.title}</span>
                </div>
              </div>
              <div className="coc-clauses">
                {sec.clauses.map((clause, ci) => (
                  <div key={ci} className="coc-clause">
                    <span className="coc-bullet"/>
                    <p className="coc-clause-text">{clause}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* divider */}
          <div className="coc-divider">
            <div className="coc-div-l"/>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <polygon points="5,0 10,5 5,10 0,5" fill="#E7BA80" opacity="0.35"/>
            </svg>
            <div className="coc-div-r"/>
          </div>

          {/* footer */}
          <div className="coc-footer">
            <p>
              Questions about this Code of Conduct may be directed to the organising
              committee at{" "}
              <strong style={{color:"rgba(231,186,128,0.7)"}}>iste@nith.ac.in</strong>.
              This document is subject to revision; participants will be notified of
              any material changes before the event.
            </p>
            <div style={{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap"}}>
              <Link href="/signup" className="coc-back">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Sign Up
              </Link>
              <Link href="/terms" className="coc-back">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                Terms &amp; Conditions
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}