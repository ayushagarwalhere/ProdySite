"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import HeroScene from "@/components/HeroScene";
import Preloader from "@/components/Home/Preloader";
import Footer from "@/components/custom/footer";
import ScarabCursor from "@/components/ScarabCursor";

/* ─── sponsors data ─── */
const SPONSORS = {
  gold: [
    { name: "Nexus Corp", glyph: "𓇳" },
    { name: "Arcadia Tech", glyph: "𓂀" },
    { name: "Helios Labs", glyph: "𓊹" },
  ],
  silver: [
    { name: "Iris Dynamics", glyph: "𓅓" },
    { name: "Phaedra AI", glyph: "𓋴" },
    { name: "Olympus Cloud", glyph: "𓆑" },
    { name: "Aether Systems", glyph: "𓏛" },
  ],
  bronze: [
    { name: "Cadmus Media", glyph: "𓇯" },
    { name: "Pythia Tools", glyph: "𓆓" },
    { name: "Delphi Works", glyph: "𓂃" },
    { name: "Logos Studio", glyph: "𓇋" },
    { name: "Eris Finance", glyph: "𓂋" },
  ],
};

/* ─── hieroglyph strip ─── */
function HieroglyphStrip({ offset = 0 }: { offset?: number }) {
  return (
    <>
      <g transform="translate(4,0)">
        <ellipse
          cx="14"
          cy="8"
          rx="10"
          ry="6"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="14" cy="8" r="2.5" fill="#E7BA80" />
        <path
          d="M4 11 Q8 16 14 14 Q20 16 24 11"
          stroke="#E7BA80"
          strokeWidth="1"
          fill="none"
        />
        <path d="M14 14 L12 20" stroke="#E7BA80" strokeWidth="1" />
        <path d="M14 14 L16 20" stroke="#E7BA80" strokeWidth="1" />
      </g>
      <g transform="translate(8,35)">
        <ellipse
          cx="10"
          cy="6"
          rx="5"
          ry="4"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <line
          x1="10"
          y1="10"
          x2="10"
          y2="26"
          stroke="#E7BA80"
          strokeWidth="1.2"
        />
        <line
          x1="4"
          y1="16"
          x2="16"
          y2="16"
          stroke="#E7BA80"
          strokeWidth="1.2"
        />
      </g>
      <g transform="translate(6,70)">
        <rect x="6" y="0" width="12" height="2" fill="#E7BA80" rx="1" />
        <rect x="5" y="4" width="14" height="2" fill="#E7BA80" rx="1" />
        <rect x="4" y="8" width="16" height="2" fill="#E7BA80" rx="1" />
        <rect x="3" y="12" width="18" height="2" fill="#E7BA80" rx="1" />
        <rect
          x="5"
          y="16"
          width="14"
          height="8"
          fill="none"
          stroke="#E7BA80"
          strokeWidth="1"
        />
      </g>
      <g transform="translate(10,105)">
        <line x1="9" y1="0" x2="9" y2="28" stroke="#E7BA80" strokeWidth="1.2" />
        <path
          d="M4 4 Q9 0 14 4"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M7 28 L4 34 M11 28 L14 34"
          stroke="#E7BA80"
          strokeWidth="1.2"
        />
      </g>
      <g transform="translate(6,182)">
        <circle
          cx="12"
          cy="12"
          r="7"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="12" cy="12" r="3" fill="#E7BA80" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <line
            key={i}
            x1={12 + 8 * Math.cos((a * Math.PI) / 180)}
            y1={12 + 8 * Math.sin((a * Math.PI) / 180)}
            x2={12 + 11 * Math.cos((a * Math.PI) / 180)}
            y2={12 + 11 * Math.sin((a * Math.PI) / 180)}
            stroke="#E7BA80"
            strokeWidth="1"
          />
        ))}
      </g>
      <g transform="translate(4,300)">
        <path d="M14 24 Q14 12 14 8" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M14 8 Q10 0 6 4 Q8 10 14 12" fill="#E7BA80" opacity="0.7" />
        <path d="M14 8 Q18 0 22 4 Q20 10 14 12" fill="#E7BA80" opacity="0.7" />
        <line
          x1="8"
          y1="24"
          x2="20"
          y2="24"
          stroke="#E7BA80"
          strokeWidth="1.2"
        />
      </g>
      <g transform={`translate(4,${380 + offset})`}>
        <ellipse
          cx="14"
          cy="8"
          rx="10"
          ry="6"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <circle cx="14" cy="8" r="2.5" fill="#E7BA80" />
        <path
          d="M4 11 Q8 16 14 14 Q20 16 24 11"
          stroke="#E7BA80"
          strokeWidth="1"
          fill="none"
        />
      </g>
      <g transform="translate(2,500)">
        <path
          d="M14 2 L28 28 L0 28 Z"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <line
          x1="14"
          y1="10"
          x2="22"
          y2="28"
          stroke="#E7BA80"
          strokeWidth="0.6"
          opacity="0.5"
        />
        <line
          x1="14"
          y1="10"
          x2="6"
          y2="28"
          stroke="#E7BA80"
          strokeWidth="0.6"
          opacity="0.5"
        />
      </g>
      <g transform="translate(4,580)">
        <path
          d="M4 20 Q2 8 10 4 Q8 12 14 14 Q20 12 18 4 Q26 8 24 20"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
        <circle
          cx="14"
          cy="24"
          r="4"
          stroke="#E7BA80"
          strokeWidth="1.2"
          fill="none"
        />
      </g>
      <g transform="translate(0,680)">
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
      <line
        x1="0"
        y1="30"
        x2="10000"
        y2="30"
        stroke="#E7BA80"
        strokeWidth="0.8"
      />
      <line
        x1="0"
        y1="34"
        x2="10000"
        y2="34"
        stroke="#E7BA80"
        strokeWidth="0.4"
      />
      {Array.from({ length: 120 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 80 + 8},0)`}>
          <path
            d="M20 28 L20 16 Q16 8 12 10 Q10 16 20 18"
            fill="#E7BA80"
            opacity="0.6"
          />
          <path
            d="M20 28 L20 16 Q24 8 28 10 Q30 16 20 18"
            fill="#E7BA80"
            opacity="0.6"
          />
          <path
            d="M20 28 L20 12 Q19 6 20 4 Q21 6 20 12"
            fill="#E7BA80"
            opacity="0.8"
          />
          <path
            d="M2 28 L8 20 L2 12"
            stroke="#E7BA80"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M38 28 L32 20 L38 12"
            stroke="#E7BA80"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
        </g>
      ))}
    </>
  );
}

/* ─── scroll reveal hook ─── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── section heading ─── */
function SectionHeading({
  title,
  overline,
  glyph = "𓇳",
}: {
  overline: string;
  title: string;
  glyph?: string;
}) {
  const { ref, visible } = useScrollReveal(0.2);
  return (
    <div
      ref={ref}
      className={`section-heading${visible ? " section-heading--visible" : ""}`}
    >
      <h2 className="section-heading__title">{title}</h2>
      <h5 className="section-heading__overline">{overline}</h5>
      <div className="ornament-line">
        <span className="ornament-line__rule ornament-line__rule--left" />
        <span className="ornament-line__glyph">{glyph}</span>
        <span className="ornament-line__rule ornament-line__rule--right" />
      </div>
    </div>
  );
}

/* ─── sponsor tablet ─── */
function SponsorTablet({
  name,
  glyph,
  tier,
  delay,
}: {
  name: string;
  glyph: string;
  tier: "gold" | "silver" | "bronze";
  delay: number;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`tablet tablet--${tier}${visible ? " tablet--visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="tablet__body">
        <div className="tablet__arch" />
        <div className="tablet__inner">
          <span className="tablet__glyph">{glyph}</span>
          <span className="tablet__rule" />
        </div>
        {(
          [
            [8, 8],
            [8, 9999],
            [9999, 8],
            [9999, 9999],
          ] as [number, number][]
        ).map((_, i) => (
          <span key={i} className={`tablet__dot tablet__dot--${i}`} />
        ))}
      </div>
      <div className="tablet__base" />
      <p className="tablet__name">{name}</p>
    </div>
  );
}

/* ─── about block ─── */
function AboutBlock() {
  const { ref, visible } = useScrollReveal(0.15);
  return (
    <div
      ref={ref}
      className={`about-block${visible ? " about-block--visible" : ""}`}
    >
      <div className="about-block__col">
        <p className="about-block__quote">
          "An institution is the lengthened shadow of one great idea."
        </p>
        <p className="about-block__body">
          ISTE — Indian Society for Technical Education is the premier national
          organisation for technical education in India. Since its founding, it
          has been the lifeblood of engineering campuses across the country,
          connecting students, faculty, and industry in a shared pursuit of
          excellence.
        </p>
      </div>
      <div className="about-block__col">
        <p className="about-block__body">
          Our student chapter at NITH carries this flame forward organising
          technical festivals, coding marathons, design challenges, and
          leadership conclaves that transform students into well-rounded
          professionals ready to face the world.
        </p>
        <p className="about-block__body" style={{ marginTop: 20 }}>
          We believe great engineers are not just built in classrooms. They are
          forged in competition, shaped by mentorship, and polished by
          community.
        </p>
      </div>
      <div className="about-block__divider">
        <span className="about-block__divider-line about-block__divider-line--left" />
        <span className="about-block__divider-glyph">𓋴</span>
        <span className="about-block__divider-line about-block__divider-line--right" />
      </div>
    </div>
  );
}

/* ─── temple columns ─── */
function TempleColumns() {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`temple-cols${visible ? " temple-cols--visible" : ""}`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="temple-cols__col"
          style={{ opacity: 0.25 + i * 0.04 }}
        >
          <div className="temple-cols__capital" />
          {Array.from({ length: 6 }).map((_, j) => (
            <div key={j} className="temple-cols__flute" />
          ))}
          <div className="temple-cols__base" />
        </div>
      ))}
    </div>
  );
}

/* ─── sponsor tier ─── */
function SponsorTier({
  tier,
  label,
  badge,
  sponsors,
}: {
  tier: "gold" | "silver" | "bronze";
  label: string;
  badge: string;
  sponsors: { name: string; glyph: string }[];
}) {
  const { ref, visible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`sponsor-tier sponsor-tier--${tier}${visible ? " sponsor-tier--visible" : ""}`}
    >
      <div className="sponsor-tier__header">
        <span className="sponsor-tier__rule sponsor-tier__rule--left" />
        <span className="sponsor-tier__label">
          {badge} {label}
        </span>
        <span className="sponsor-tier__rule sponsor-tier__rule--right" />
      </div>
      <div className="sponsor-tier__tablets">
        {sponsors.map((s, i) => (
          <SponsorTablet
            key={i}
            name={s.name}
            glyph={s.glyph}
            tier={tier}
            delay={i * 0.08}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── tier divider ─── */
function TierDivider() {
  return (
    <div className="tier-divider">
      <span className="tier-divider__line tier-divider__line--left" />
      <span className="tier-divider__dot tier-divider__dot--1" />
      <span className="tier-divider__dot tier-divider__dot--2" />
      <span className="tier-divider__dot tier-divider__dot--3" />
      <span className="tier-divider__line tier-divider__line--right" />
    </div>
  );
}

/* ─── main ─── */
export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    setTimeout(() => setContentVisible(true), 50);
  }, []);

  useEffect(() => {
    if (!contentVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 65 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.22,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.45 + 0.1,
    }));
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231,186,128,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [contentVisible]);

  return (
    <>
      <style>{CSS}</style>
      <ScarabCursor />

      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`page${contentVisible ? " page--visible" : ""}`}>
        {/* bg layers */}
        <div aria-hidden className="bg-base" />
        <div aria-hidden className="bg-noise" />
        <div aria-hidden className="bg-scanlines" />
        <div aria-hidden className="bg-vignette" />

        {/* hieroglyph columns (desktop only) */}
        <div aria-hidden className="hiero-col hiero-col--left">
          <div className="hiero-col__line" />
          <svg width="36" viewBox="0 0 36 820" fill="none">
            <HieroglyphStrip />
          </svg>
        </div>
        <div aria-hidden className="hiero-col hiero-col--right">
          <div className="hiero-col__line" />
          <svg width="36" viewBox="0 0 36 820" fill="none">
            <HieroglyphStrip offset={14} />
          </svg>
        </div>

        {/* bottom borders */}
        <div aria-hidden className="bot-border">
          <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice">
            <TopBorder />
          </svg>
        </div>

        {/* particles */}
        <canvas ref={canvasRef} aria-hidden className="particles" />

        {/* content */}
        <div className="content">
          {/* hero — untouched */}
          <div style={{ position: "relative", zIndex: 3 }}>
            <HeroScene />
          </div>

          {/* about */}
          <section id="about" className="section section--about">
            <SectionHeading
              title="ABOUT US"
              overline="TEAM ISTE- NITH CHAPTER"
              glyph="☼"
            />
            <AboutBlock />
          </section>

          {/* sponsors */}
          {/* <section id="sponsors" className="section section--wide">
            <SectionHeading title="OUR SPONSORS" overline="" glyph="𓋴" />
            <TempleColumns />
            <SponsorTier
              tier="gold"
              label="Gold Patrons"
              badge="𓇳"
              sponsors={SPONSORS.gold}
            />
            <TierDivider />
            <SponsorTier
              tier="silver"
              label="Silver Patrons"
              badge="𓂀"
              sponsors={SPONSORS.silver}
            />
            <TierDivider />
            <SponsorTier
              tier="bronze"
              label="Bronze Patrons"
              badge="𓅓"
              sponsors={SPONSORS.bronze}
            />
          </section> */}
          <section id="sponsors" className="section section--wide">
            <SectionHeading title="OUR SPONSORS" overline="Call for Sponsors" glyph="𓋴" />
            <SectionHeading title="Interested in sponsoring Prodyogiki '26?" overline="Contact us at iste@nith.ac.in" glyph="𓂀" />
          </section>
          <div style={{ height: 40 }} />
          <Footer />
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ALL CSS IN ONE PLACE
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&family=Open+Sans:wght@300;400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: #080400; color: #f5ead8; overflow-x: hidden; cursor: none; }

/* ── page wrapper ── */
.page { opacity: 0; transition: opacity .7s ease; min-height: 100vh; position: relative; overflow-x: hidden; }
.page--visible { opacity: 1; }

/* ── fixed bg layers ── */
.bg-base {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(ellipse 130% 80% at 50% -10%, #1e0f00 0%, #0d0700 50%, #000 100%);
}
.bg-noise {
  position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: .5; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E");
}
.bg-scanlines {
  position: fixed; inset: 0; z-index: 2; pointer-events: none;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(180,120,40,.025) 3px, rgba(180,120,40,.025) 4px);
}
.bg-vignette {
  position: fixed; inset: 0; z-index: 6; pointer-events: none;
  background: radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(0,0,0,.72) 100%);
}

/* ── particles ── */
.particles { position: fixed; inset: 0; z-index: 5; pointer-events: none; }

/* ── hieroglyph columns ── */
.hiero-col {
  display: none;
  position: fixed; top: 0; bottom: 0; width: 72px;
  z-index: 3; pointer-events: none; opacity: 1;
  background: #080400;
  flex-direction: column; align-items: center; padding-top: 20px;
}
.hiero-col--left  { left: 0; }
.hiero-col--right { right: 0; transform: scaleX(-1); }
.hiero-col__line {
  position: absolute; right: 12px; top: 0; bottom: 0; width: 1px;
  background: linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent);
}
@media (min-width: 768px) { .hiero-col { display: flex; } }

/* ── top / bottom decorative borders ── */
.top-border {
  position: fixed; top: 0; left: 0; right: 0; height: 36px;
  z-index: 4; pointer-events: none; opacity: 1;
  background: #080400;
}
.bot-border {
  position: fixed; bottom: 0; left: 0; right: 0; height: 36px;
  z-index: 4; pointer-events: none; opacity: 1; transform: scaleY(-1);
  background: #080400;
}

/* ── content wrapper ── */
.content { position: relative; z-index: 2; } 

/* ── sections ── */
.section {
  max-width: 1100px; margin: 0 auto;
  padding: 80px 24px;
}
.section--about { position: relative; top: -36px; }
.section--wide { max-width: 1200px; padding: 80px 24px; }
@media (min-width: 640px)  { .section, .section--wide { padding-left: 40px; padding-right: 40px; } }
@media (min-width: 768px)  { .section, .section--wide { padding-left: 80px; padding-right: 80px; } }
@media (min-width: 1024px) { .section, .section--wide { padding-left: 100px; padding-right: 100px; } }

/* ── section divider ── */
.section-divider {
  max-width: 1100px; margin: 0 auto; height: 1px;
  background: linear-gradient(to right, transparent, rgba(231,186,128,.15), transparent);
}

/* ── ornament line ── */
.ornament-line { display: flex; align-items: center; justify-content: center; gap: 12px; }
.ornament-line__rule { flex: 1; max-width: 60px; height: 1px; display: block; }
.ornament-line__rule--left  { background: linear-gradient(to right, transparent, #E7BA80); }
.ornament-line__rule--right { background: linear-gradient(to left,  transparent, #E7BA80); }
.ornament-line__glyph { font-size: 18px; color: #E7BA80; }

/* ── section heading ── */
.section-heading {
  text-align: center; margin-bottom: 48px;
  opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease;
}
.section-heading--visible { opacity: 1; transform: translateY(0); }
.section-heading__over,
.section-heading__overline {
  font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .4em;
  text-transform: uppercase; color: #E7BA80; margin-bottom: 10px;
}
.section-heading__title {
  font-family: 'Cinzel Decorative', 'Cinzel', serif; font-weight: 700;
  font-size: clamp(1.4rem, 3vw, 2.2rem); color: #E7BA80;
  letter-spacing: .05em;
  margin-bottom: 14px;
}

/* ── stat card ── */
.stats-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 56px;
}
@media (min-width: 768px) { .stats-grid { grid-template-columns: repeat(4,1fr); } }
.stat-card {
  background: rgba(15,8,0,.75); border-radius: 4px; padding: 28px 20px;
  text-align: center; backdrop-filter: blur(8px); cursor: none;
  border: 1px solid rgba(231,186,128,.2);
  opacity: 0; transform: translateY(30px);
  transition: opacity .7s ease, transform .7s ease, border-color .3s, box-shadow .3s;
}
.stat-card--visible { opacity: 1; transform: translateY(0); }
.stat-card:hover {
  border-color: rgba(231,186,128,.6);
  box-shadow: 0 0 30px rgba(231,186,128,.2);
}
.stat-card__icon  { font-size: 24px; margin-bottom: 10px; }
.stat-card__value {
  font-family: 'Cinzel Decorative', 'Cinzel', serif; font-weight: 700;
  font-size: clamp(1.6rem, 4vw, 2.4rem); color: #E7BA80; line-height: 1; margin-bottom: 8px;
}
.stat-card__label {
  font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .3em;
  text-transform: uppercase; color: rgba(231,186,128,.5);
}

/* ── about block ── */
.about-block {
  display: grid; grid-template-columns: 1fr; gap: 32px;
  opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease;
}
.about-block--visible { opacity: 1; transform: translateY(0); }
@media (min-width: 768px) { .about-block { grid-template-columns: 1fr 1fr; gap: 48px; } }
.about-block__col { display: flex; flex-direction: column; }
.about-block__quote {
  font-family: 'Cinzel', serif; font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6; color: #E7BA80; margin-bottom: 20px; letter-spacing: .02em;
}
.about-block__body {
  font-family: 'Open Sans', sans-serif; font-size: 13px;
  line-height: 1.8; color: rgba(231,186,128,.55);
}
.about-block__divider {
  display: flex; align-items: center; gap: 16px;
  grid-column: 1 / -1;
}
.about-block__divider-line { flex: 1; height: 1px; display: block; }
.about-block__divider-line--left  { background: linear-gradient(to right, transparent, rgba(231,186,128,.3)); }
.about-block__divider-line--right { background: linear-gradient(to left,  transparent, rgba(231,186,128,.3)); }
.about-block__divider-glyph { font-size: 16px; opacity: .5; }

/* ── temple columns ── */
.temple-cols {
  display: none; justify-content: center; gap: 32px; margin-bottom: 52px;
  opacity: 0; transition: opacity 1s ease;
}
.temple-cols--visible { opacity: 1; }
@media (min-width: 640px) { .temple-cols { display: flex; } }
.temple-cols__col   { display: flex; flex-direction: column; align-items: center; }
.temple-cols__capital { width: 24px; height: 8px; background: rgba(231,186,128,.4); border-radius: 2px 2px 0 0; }
.temple-cols__flute   { width: 18px; height: 8px; border-left: 1px solid rgba(231,186,128,.2); border-right: 1px solid rgba(231,186,128,.2); }
.temple-cols__base    { width: 26px; height: 5px; background: rgba(231,186,128,.3); border-radius: 0 0 2px 2px; }

/* ── sponsor tier ── */
.sponsor-tier { margin-bottom: 8px; opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
.sponsor-tier--visible { opacity: 1; transform: translateY(0); }
.sponsor-tier__header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
.sponsor-tier__label  { font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .35em; text-transform: uppercase; opacity: .6; white-space: nowrap; }
.sponsor-tier__rule   { flex: 1; height: 1px; display: block; }
.sponsor-tier--gold   .sponsor-tier__label { color: #E7BA80; }
.sponsor-tier--silver .sponsor-tier__label { color: #C8C8C8; }
.sponsor-tier--bronze .sponsor-tier__label { color: #C8865A; }
.sponsor-tier--gold   .sponsor-tier__rule--left  { background: linear-gradient(to right, transparent, rgba(231,186,128,.25)); }
.sponsor-tier--gold   .sponsor-tier__rule--right { background: linear-gradient(to left,  transparent, rgba(231,186,128,.25)); }
.sponsor-tier--silver .sponsor-tier__rule--left  { background: linear-gradient(to right, transparent, rgba(192,192,192,.2)); }
.sponsor-tier--silver .sponsor-tier__rule--right { background: linear-gradient(to left,  transparent, rgba(192,192,192,.2)); }
.sponsor-tier--bronze .sponsor-tier__rule--left  { background: linear-gradient(to right, transparent, rgba(176,110,65,.2)); }
.sponsor-tier--bronze .sponsor-tier__rule--right { background: linear-gradient(to left,  transparent, rgba(176,110,65,.2)); }
.sponsor-tier__tablets { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-end; gap: 16px; }
@media (min-width: 640px) {
  .sponsor-tier--gold   .sponsor-tier__tablets { gap: 40px; }
  .sponsor-tier--silver .sponsor-tier__tablets { gap: 28px; }
  .sponsor-tier--bronze .sponsor-tier__tablets { gap: 20px; }
}

/* ── tablet ── */
.tablet {
  display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: default; flex-shrink: 0;
  width: 80px;
  opacity: 0; transform: translateY(40px) scale(.95); transition: opacity .7s ease, transform .7s ease;
}
.tablet--visible { opacity: 1; transform: translateY(0) scale(1); }
@media (min-width: 640px) {
  .tablet--gold   { width: 130px; }
  .tablet--silver { width: 110px; }
  .tablet--bronze { width: 95px;  }
}
.tablet__body {
  width: 100%; position: relative; border-radius: 4px 4px 0 0; padding-bottom: 110%;
  background: rgba(15,8,0,.85); border-bottom: none;
  transition: border-color .3s, box-shadow .3s;
}
.tablet--gold   .tablet__body { border: 1px solid rgba(231,186,128,.25); box-shadow: 0 -2px 0 #C9922A44; }
.tablet--silver .tablet__body { border: 1px solid rgba(192,192,192,.18); box-shadow: 0 -2px 0 #90909044; }
.tablet--bronze .tablet__body { border: 1px solid rgba(176,110,65,.18);  box-shadow: 0 -2px 0 #8B5A2B44; }
.tablet--gold:hover   .tablet__body { border-color: rgba(231,186,128,.65); box-shadow: 0 0 24px rgba(231,186,128,.25), 0 -2px 0 #C9922A; }
.tablet--silver:hover .tablet__body { border-color: rgba(192,192,192,.5);  box-shadow: 0 0 24px rgba(192,192,192,.15), 0 -2px 0 #909090; }
.tablet--bronze:hover .tablet__body { border-color: rgba(176,110,65,.5);   box-shadow: 0 0 24px rgba(176,110,65,.15),  0 -2px 0 #8B5A2B; }
.tablet__arch {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 40%; height: 20px; background: #0a0503;
  border-radius: 0 0 50% 50%; border-bottom: 1px solid rgba(231,186,128,.15); border-left: 1px solid rgba(231,186,128,.15); border-right: 1px solid rgba(231,186,128,.15);
}
.tablet__inner {
  position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
}
.tablet__glyph {
  font-size: 24px; opacity: .6; transition: opacity .3s; color: #E7BA80;
}
.tablet--silver .tablet__glyph { color: #C8C8C8; font-size: 20px; }
.tablet--bronze .tablet__glyph { color: #C8865A; font-size: 18px; }
.tablet:hover .tablet__glyph { opacity: 1; }
.tablet__rule {
  width: 50%; height: 1px; display: block;
  background: linear-gradient(to right, transparent, #C9922A, transparent);
}
.tablet--silver .tablet__rule { background: linear-gradient(to right, transparent, #909090, transparent); }
.tablet--bronze .tablet__rule { background: linear-gradient(to right, transparent, #8B5A2B, transparent); }
.tablet__dot {
  position: absolute; width: 3px; height: 3px; border-radius: 50%; opacity: .5;
  background: #C9922A;
}
.tablet--silver .tablet__dot { background: #909090; }
.tablet--bronze .tablet__dot { background: #8B5A2B; }
.tablet__dot--0 { top: 8px;  left: 8px;  }
.tablet__dot--1 { top: 8px;  right: 8px; }
.tablet__dot--2 { bottom: 8px; left: 8px;  }
.tablet__dot--3 { bottom: 8px; right: 8px; }
.tablet__base {
  width: 110%; height: 6px; border-top: 1px solid rgba(201,146,42,.44);
  background: linear-gradient(to right, transparent, rgba(201,146,42,.44), transparent);
}
.tablet--silver .tablet__base { border-top-color: rgba(144,144,144,.3); background: linear-gradient(to right, transparent, rgba(144,144,144,.3), transparent); }
.tablet--bronze .tablet__base { border-top-color: rgba(139,90,43,.3);   background: linear-gradient(to right, transparent, rgba(139,90,43,.3),   transparent); }
.tablet__name {
  font-family: 'Cinzel', serif; font-weight: 700; font-size: 10px; letter-spacing: .08em;
  text-transform: uppercase; text-align: center; line-height: 1.3; color: rgba(231,186,128,.6);
  transition: color .3s;
}
.tablet--gold   .tablet__name { font-size: 12px; color: rgba(231,186,128,.6); }
.tablet--silver .tablet__name { color: rgba(200,200,200,.5); }
.tablet--bronze .tablet__name { color: rgba(200,134,90,.5); }
.tablet:hover .tablet__name { color: #E7BA80; }
.tablet--silver:hover .tablet__name { color: #C8C8C8; }
.tablet--bronze:hover .tablet__name { color: #C8865A; }

/* ── tier divider ── */
.tier-divider { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 48px 0; }
.tier-divider__line { flex: 1; height: 1px; display: block; }
.tier-divider__line--left  { background: linear-gradient(to right, transparent, rgba(231,186,128,.12)); }
.tier-divider__line--right { background: linear-gradient(to left,  transparent, rgba(231,186,128,.12)); }
.tier-divider__dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(231,186,128,.25); display: block; }
.tier-divider__dot--2 { width: 3px; height: 3px; opacity: .7; }
.tier-divider__dot--3 { width: 2px; height: 2px; opacity: .5; }

/* ── sponsor cta ── */
.sponsor-cta {
  margin-top: 64px; text-align: center;
  opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease;
}
.sponsor-cta--visible { opacity: 1; transform: translateY(0); }
.sponsor-cta__heading {
  font-family: 'Cinzel', serif; font-weight: 700; color: rgba(231,186,128,.7);
  font-size: clamp(1rem, 2vw, 1.3rem); letter-spacing: .05em; margin-bottom: 8px;
}
.sponsor-cta__sub {
  font-family: 'Open Sans', sans-serif; font-size: 13px;
  color: rgba(231,186,128,.4); margin-bottom: 24px; line-height: 1.7;
}
.sponsor-cta__btn {
  padding: 10px 28px; background: transparent; cursor: pointer;
  border: 1px solid rgba(231,186,128,.4); border-radius: 2px;
  font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: .28em;
  text-transform: uppercase; color: rgba(231,186,128,.6);
  transition: all .25s ease;
}
.sponsor-cta__btn:hover { background: rgba(231,186,128,.1); color: #E7BA80; border-color: rgba(231,186,128,.7); }

/* ── preloader ── */
.preloader {
  position: fixed; inset: 0; z-index: 200; overflow: hidden; background: #080400;
  opacity: 1; transition: opacity .9s ease;
}
.preloader--exit { opacity: 0; }
.preloader__canvas    { position: absolute; inset: 0; pointer-events: none; }
.preloader__scanlines {
  position: absolute; inset: 0; pointer-events: none;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(180,120,40,.02) 3px, rgba(180,120,40,.02) 4px);
}
.preloader__floor {
  position: absolute; bottom: 120px; left: 0; right: 0; height: 1px; pointer-events: none;
  background: linear-gradient(to right, transparent, rgba(231,186,128,.3) 20%, rgba(231,186,128,.3) 80%, transparent);
}
.preloader__skip {
  position: absolute; top: 20px; right: 24px;
  background: transparent; border: none; cursor: pointer;
  font-family: 'Cinzel', serif; font-size: 9px; letter-spacing: .2em;
  text-transform: uppercase; color: rgba(231,186,128,.25);
  transition: color .2s;
}
.preloader__skip:hover { color: rgba(231,186,128,.6); }
`;
