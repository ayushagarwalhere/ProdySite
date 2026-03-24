"use client";

import Link from "next/link";

const SECTIONS = [
  {
    glyph: "𓂀",
    title: "Eligibility & Registration",
    clauses: [
      "Participation in Prodyogiki '26 is open exclusively to currently enrolled undergraduate and postgraduate students of NIT Hamirpur. Valid college ID is required at the time of on-site verification.",
      "Each participant may register for multiple events, subject to schedule constraints. Duplicate registrations for the same event will be cancelled without notice.",
      "Team compositions, once submitted and confirmed, may not be altered after the registration deadline. The organisers reserve the right to disqualify teams found circumventing this rule.",
      "Outstation participants are responsible for their own travel arrangements. On-campus accommodation, where available, must be requested explicitly during registration and is subject to availability.",
      "The organisers reserve the right to reject any registration without providing a reason, at their sole discretion.",
    ],
  },
  {
    glyph: "𓇳",
    title: "Event Conduct & Fair Play",
    clauses: [
      "All participants are expected to maintain decorum consistent with the academic environment of NIT Hamirpur. Behaviour deemed disruptive, unsportsmanlike, or disrespectful to fellow participants, judges, or organisers will result in immediate disqualification.",
      "Use of unfair means — including but not limited to plagiarism, use of pre-built or externally developed submissions, or collusion between competing teams — is strictly prohibited and will result in disqualification and possible reporting to the institute.",
      "Participants must arrive at the designated venue at least 15 minutes before their scheduled event slot. Failure to appear within this window may result in forfeiture of the slot without refund or rescheduling.",
      "All decisions made by the judges and event coordinators are final and binding. No appeals, protests, or requests for re-evaluation will be entertained after the results are announced.",
      "Mobile phones and electronic devices must be surrendered or switched off as directed by event coordinators during certain rounds. Failure to comply constitutes a rule violation.",
    ],
  },
  {
    glyph: "𓊹",
    title: "Intellectual Property",
    clauses: [
      "All original work created during Prodyogiki '26 events — including but not limited to code, designs, presentations, and creative artefacts — remains the intellectual property of the respective participant or team.",
      "By registering, participants grant ISTE NIT Hamirpur a non-exclusive, royalty-free licence to showcase, document, and publish submitted work for promotional, archival, and educational purposes.",
      "Participants warrant that all submitted materials are original and do not infringe upon any third-party intellectual property rights. Any infringement claims arising from submitted work are the sole responsibility of the participant.",
      "Winners of design, creative, or technical events may be asked to contribute their work to institute publications or showcases. Participation in such initiatives is voluntary.",
    ],
  },
  {
    glyph: "𓋴",
    title: "Prizes & Awards",
    clauses: [
      "Prize pool amounts listed on event pages are indicative and may be subject to change. Final prize amounts will be confirmed at the opening ceremony.",
      "Prizes are awarded solely based on merit as judged by the appointed panel. The organisers do not guarantee any minimum prize to any participant.",
      "Prize disbursement timelines are at the discretion of the organising committee. Requests for expedited disbursement will not be entertained.",
      "Prizes are non-transferable and may not be exchanged for cash equivalents unless explicitly stated. Taxes, if applicable, are the sole responsibility of the prize recipient.",
      "In the event of a tie, the judges' collective decision on a tiebreaker criterion shall be final.",
    ],
  },
  {
    glyph: "𓅓",
    title: "Privacy & Data",
    clauses: [
      "By registering on this platform, participants consent to the collection and storage of personal data including name, email address, college roll number, and event registration details.",
      "This data is used solely for the purposes of event management, result communication, and festival operations. It will not be sold or shared with third parties without explicit consent.",
      "Photographs and video recordings taken during the festival may be used in official ISTE NIT Hamirpur communications, including social media, newsletters, and annual reports. Participants who object must notify the media team in writing before the event.",
      "Participants may request deletion of their personal data after the conclusion of the festival by contacting the organising committee. Requests will be processed within 30 working days.",
    ],
  },
  {
    glyph: "𓆑",
    title: "Liability & Safety",
    clauses: [
      "ISTE NIT Hamirpur and the organising committee accept no liability for personal injury, loss, or damage to property sustained during participation in any Prodyogiki '26 event or on the festival premises.",
      "Participants engaging in events involving physical construction, laboratory materials, or hardware are required to follow all safety guidelines issued by the event coordinators. Protective equipment, where provided, must be worn at all times.",
      "The organisers reserve the right to cancel, postpone, or modify any event without prior notice in the interest of participant safety or due to circumstances beyond their control, including but not limited to adverse weather, technical failure, or force majeure.",
      "Participants are responsible for any damage caused to institute property, equipment, or materials. The cost of repairs or replacements may be recovered from the responsible individual or team.",
    ],
  },
  {
    glyph: "𓂋",
    title: "Amendments & Jurisdiction",
    clauses: [
      "ISTE NIT Hamirpur reserves the right to amend these Terms and Conditions at any time. Updates will be reflected on this page and, where material, communicated to registered participants via email.",
      "Continued participation after an amendment constitutes acceptance of the revised terms.",
      "Any disputes arising in connection with Prodyogiki '26 shall be subject to the jurisdiction of the courts of Hamirpur, Himachal Pradesh, India.",
      "These Terms and Conditions constitute the entire agreement between the participant and ISTE NIT Hamirpur with respect to participation in the festival. No verbal representations or prior communications shall supersede these terms.",
    ],
  },
];

function SectionHead({ glyph, title }: { glyph: string; title: string }) {
  return (
    <div className="tc-section-head">
      <span className="tc-section-glyph">{glyph}</span>
      <h2 className="tc-section-title">{title}</h2>
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Sans:wght@300;400;500&family=Barlow+Condensed:wght@600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060402; color: #f5ead8; }

        /* ── page shell ── */
        .tc-page {
          min-height: 100vh;
          background: #060402;
          padding-top: 64px;
          position: relative;
          overflow-x: hidden;
        }

        /* ── fixed bg layers ── */
        .tc-bg-radial {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(ellipse 100% 60% at 50% 0%,
            rgba(120,60,10,0.22) 0%, transparent 65%);
        }
        .tc-bg-scanlines {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 3px,
            rgba(180,120,40,0.018) 3px, rgba(180,120,40,0.018) 4px);
        }

        /* ── top border strip ── */
        .tc-top-border {
          position: fixed; top: 64px; left: 0; right: 0;
          height: 36px; z-index: 5; pointer-events: none; opacity: 0.4;
        }

        /* ── hieroglyph side columns (desktop only) ── */
        .tc-col-left, .tc-col-right {
          display: none;
          position: fixed; top: 0; bottom: 0; width: 56px;
          z-index: 3; pointer-events: none; opacity: 0.22;
          flex-direction: column; align-items: center; padding-top: 100px;
        }
        .tc-col-left  { left: 0; }
        .tc-col-right { right: 0; transform: scaleX(-1); }
        .tc-col-line {
          position: absolute; right: 10px; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent);
        }
        @media (min-width: 900px) {
          .tc-col-left, .tc-col-right { display: flex; }
        }

        /* ── content wrapper ── */
        .tc-content {
          position: relative; z-index: 10;
          max-width: 820px;
          margin: 0 auto;
          padding: 3rem 1.5rem 6rem;
        }
        @media (min-width: 640px)  { .tc-content { padding: 3.5rem 2.5rem 6rem; } }
        @media (min-width: 900px)  { .tc-content { padding: 4rem 3rem 6rem; } }

        /* ── hero heading ── */
        .tc-hero { text-align: center; margin-bottom: 3.5rem; }
        .tc-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 9px; letter-spacing: 0.45em; text-transform: uppercase;
          color: rgba(231,186,128,0.4); margin-bottom: 1rem;
        }
        .tc-h1 {
          font-family: 'Cinzel Decorative', 'Cinzel', serif;
          font-weight: 700;
          font-size: clamp(1.8rem, 5vw, 3rem);
          color: #E7BA80;
          letter-spacing: 0.06em;
          line-height: 1.1;
          text-shadow: 0 0 60px rgba(231,186,128,0.2);
          margin-bottom: 1.25rem;
        }
        .tc-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: rgba(231,186,128,0.5);
          letter-spacing: 0.04em;
          margin-bottom: 1.75rem;
        }
        .tc-ornament {
          display: flex; align-items: center; justify-content: center; gap: 12px;
        }
        .tc-ornament-line {
          height: 1px; width: 80px;
        }
        .tc-ornament-line-l { background: linear-gradient(to right, transparent, #E7BA80); }
        .tc-ornament-line-r { background: linear-gradient(to left,  transparent, #E7BA80); }

        /* ── effective date banner ── */
        .tc-date-banner {
          display: flex; align-items: center; gap: 12px;
          padding: 0.7rem 1.1rem;
          border: 1px solid rgba(231,186,128,0.18);
          border-radius: 4px;
          background: rgba(180,124,60,0.05);
          margin-bottom: 3rem;
        }
        .tc-date-banner svg { flex-shrink: 0; opacity: 0.6; }
        .tc-date-banner p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(231,186,128,0.55);
          line-height: 1.5;
        }
        .tc-date-banner strong { color: rgba(231,186,128,0.8); font-weight: 500; }

        /* ── section card ── */
        .tc-section {
          margin-bottom: 2rem;
          border: 1px solid rgba(180,124,60,0.15);
          border-radius: 6px;
          background: rgba(12,8,2,0.6);
          overflow: hidden;
          transition: border-color 0.25s;
        }
        .tc-section:hover { border-color: rgba(180,124,60,0.38); }

        .tc-section-head {
          display: flex; align-items: center; gap: 14px;
          padding: 1.1rem 1.4rem;
          border-bottom: 1px solid rgba(180,124,60,0.12);
          background: rgba(180,124,60,0.04);
        }
        .tc-section-glyph {
          font-size: 1.4rem; opacity: 0.7; flex-shrink: 0;
        }
        .tc-section-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: clamp(0.9rem, 2.5vw, 1.1rem);
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #E7BA80;
        }

        /* ── clause list ── */
        .tc-clauses {
          padding: 1.25rem 1.4rem;
          display: flex; flex-direction: column; gap: 0.85rem;
        }
        .tc-clause {
          display: flex; gap: 1rem; align-items: flex-start;
        }
        .tc-clause-num {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 0.65rem;
          letter-spacing: 0.1em; color: rgba(200,146,78,0.4);
          flex-shrink: 0; margin-top: 3px; min-width: 20px;
        }
        .tc-clause-text {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(0.8rem, 1.8vw, 0.88rem);
          color: rgba(240,232,214,0.65);
          line-height: 1.75;
        }

        /* ── divider ── */
        .tc-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 2.5rem 0;
        }
        .tc-divider-line {
          flex: 1; height: 1px;
        }
        .tc-divider-line-l { background: linear-gradient(to right, transparent, rgba(231,186,128,0.15)); }
        .tc-divider-line-r { background: linear-gradient(to left,  transparent, rgba(231,186,128,0.15)); }

        /* ── footer note ── */
        .tc-footer-note {
          text-align: center;
          padding: 2rem 1.5rem;
          border: 1px solid rgba(180,124,60,0.15);
          border-radius: 6px;
          background: rgba(180,124,60,0.04);
          margin-top: 1rem;
        }
        .tc-footer-note p {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: rgba(231,186,128,0.45);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .tc-back-link {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 0.65rem 1.5rem;
          border: 1px solid rgba(180,124,60,0.35);
          border-radius: 3px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 0.75rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(200,146,78,0.7);
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .tc-back-link:hover {
          border-color: rgba(180,124,60,0.7);
          color: #E7BA80;
          background: rgba(180,124,60,0.08);
        }
      `}</style>

      {/* fixed bg */}
      <div className="tc-bg-radial" aria-hidden />
      <div className="tc-bg-scanlines" aria-hidden />

      {/* top border SVG */}
      <div className="tc-top-border" aria-hidden>
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

      {/* hieroglyph columns */}
      <div className="tc-col-left" aria-hidden>
        <div className="tc-col-line"/>
        <svg width="28" viewBox="0 0 28 700" fill="none">
          {[0,70,140,210,280,350,420,490,560,630].map((y,i) => (
            <g key={i} transform={`translate(4,${y})`}>
              <ellipse cx="12" cy="8" rx="8" ry="5" stroke="#E7BA80" strokeWidth="0.9" fill="none"/>
              <circle cx="12" cy="8" r="2" fill="#E7BA80"/>
              <line x1="12" y1="13" x2="12" y2="38" stroke="#E7BA80" strokeWidth="0.9"/>
              <line x1="6"  y1="24" x2="18" y2="24" stroke="#E7BA80" strokeWidth="0.9"/>
            </g>
          ))}
        </svg>
      </div>
      <div className="tc-col-right" aria-hidden>
        <div className="tc-col-line"/>
        <svg width="28" viewBox="0 0 28 700" fill="none">
          {[0,70,140,210,280,350,420,490,560,630].map((y,i) => (
            <g key={i} transform={`translate(4,${y+35})`}>
              <rect x="4" y="0" width="16" height="2" fill="#E7BA80" rx="1"/>
              <rect x="3" y="4" width="18" height="2" fill="#E7BA80" rx="1"/>
              <rect x="2" y="8" width="20" height="2" fill="#E7BA80" rx="1"/>
              <rect x="4" y="12" width="16" height="8" fill="none" stroke="#E7BA80" strokeWidth="0.8"/>
            </g>
          ))}
        </svg>
      </div>

      <div className="tc-page">
        <div className="tc-content">

          {/* hero */}
          <div className="tc-hero">
            <p className="tc-eyebrow">Prodyogiki &rsquo;26 · ISTE NIT Hamirpur</p>
            <h1 className="tc-h1">Terms &amp; Conditions</h1>
            <p className="tc-tagline">
              Read carefully before you enter the sanctum.
            </p>
            <div className="tc-ornament">
              <div className="tc-ornament-line tc-ornament-line-l"/>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <polygon points="10,1 19,10 10,19 1,10" stroke="#E7BA80" strokeWidth="0.8" fill="none" opacity="0.5"/>
                <circle cx="10" cy="10" r="3" fill="#E7BA80" opacity="0.7"/>
              </svg>
              <div className="tc-ornament-line tc-ornament-line-r"/>
            </div>
          </div>

          {/* effective date */}
          <div className="tc-date-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#E7BA80" strokeWidth="1.3"/>
              <line x1="3" y1="9" x2="21" y2="9" stroke="#E7BA80" strokeWidth="1.3"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="#E7BA80" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="#E7BA80" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <p>
              <strong>Effective date: February 1, 2026.</strong>{" "}
              These terms apply to all participants registered for Prodyogiki &rsquo;26.
              By completing registration, you confirm that you have read, understood,
              and agreed to be bound by all clauses herein.
            </p>
          </div>

          {/* sections */}
          {SECTIONS.map((sec, si) => (
            <div key={si} className="tc-section">
              <SectionHead glyph={sec.glyph} title={`${String(si+1).padStart(2,"0")}. ${sec.title}`} />
              <div className="tc-clauses">
                {sec.clauses.map((clause, ci) => (
                  <div key={ci} className="tc-clause">
                    <span className="tc-clause-num">{si+1}.{ci+1}</span>
                    <p className="tc-clause-text">{clause}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* divider */}
          <div className="tc-divider">
            <div className="tc-divider-line tc-divider-line-l"/>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <polygon points="5,0 10,5 5,10 0,5" fill="#E7BA80" opacity="0.4"/>
            </svg>
            <div className="tc-divider-line tc-divider-line-r"/>
          </div>

          {/* footer note */}
          <div className="tc-footer-note">
            <p>
              These Terms and Conditions were last updated on{" "}
              <strong style={{color:"rgba(231,186,128,0.65)"}}>February 1, 2026</strong>.
              If you have questions or concerns regarding any clause, contact the
              organising committee at{" "}
              <strong style={{color:"rgba(231,186,128,0.65)"}}>iste@nith.ac.in</strong>{" "}
              before completing your registration.
            </p>
            <Link href="/signup" className="tc-back-link">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Sign Up
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}