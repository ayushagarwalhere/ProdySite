import Link from "next/link";

// ── alchemy palette ──────────────────────────────────────────────────────────
const GOLD      = "#b47c3c";
const GOLD_DIM  = "rgba(180,124,60,0.16)";
const GOLD_MID  = "rgba(180,124,60,0.32)";
const GOLD_GLOW = "rgba(180,124,60,0.08)";
const TEXT_WARM = "#f0e8d6";
const TEXT_DIM  = "rgba(220,200,170,0.45)";
const BG        = "#0a0703";

// ── sponsor tiers ────────────────────────────────────────────────────────────
const tiers = [
  {
    id: "pharaoh",
    label: "Pharaoh",
    subtitle: "Supreme Patron",
    borderColor: "#b47c3c",
    glowColor: "rgba(180,124,60,0.18)",
    logoSize: { w: 200, h: 80 },
    cols: 2,
    sponsors: [
      { name: "Sponsor Alpha", logo: null },
      { name: "Sponsor Beta", logo: null },
    ],
  },
  {
    id: "vizier",
    label: "Vizier",
    subtitle: "Grand Patron",
    borderColor: "rgba(180,124,60,0.45)",
    glowColor: "rgba(180,124,60,0.10)",
    logoSize: { w: 160, h: 64 },
    cols: 3,
    sponsors: [
      { name: "Sponsor Gamma", logo: null },
      { name: "Sponsor Delta", logo: null },
      { name: "Sponsor Epsilon", logo: null },
    ],
  },
  {
    id: "scribe",
    label: "Scribe",
    subtitle: "Supporting Patron",
    borderColor: "rgba(180,124,60,0.28)",
    glowColor: "rgba(180,124,60,0.06)",
    logoSize: { w: 120, h: 48 },
    cols: 4,
    sponsors: [
      { name: "Sponsor Zeta", logo: null },
      { name: "Sponsor Eta", logo: null },
      { name: "Sponsor Theta", logo: null },
      { name: "Sponsor Iota", logo: null },
    ],
  },
];

// ── reusable Egyptian cartouche border ──────────────────────────────────────
function CartoucheBorder({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="100%" height="18"
      viewBox="0 0 400 18"
      preserveAspectRatio="xMidYMid slice"
      style={{ display:"block", opacity:0.3, transform: flip ? "scaleY(-1)" : "none" }}
    >
      {Array.from({ length: 22 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 20 - 10}, 0)`}>
          <rect x="1" y="6" width="18" height="6" rx="1" fill="none" stroke={GOLD} strokeWidth="0.6"/>
          <line x1="5"  y1="6" x2="5"  y2="12" stroke={GOLD} strokeWidth="0.5"/>
          <line x1="10" y1="6" x2="10" y2="12" stroke={GOLD} strokeWidth="0.5"/>
          <line x1="15" y1="6" x2="15" y2="12" stroke={GOLD} strokeWidth="0.5"/>
          <circle cx="10" cy="3" r="1.2" fill={GOLD} opacity="0.6"/>
          <line x1="10" y1="0" x2="10" y2="1.8" stroke={GOLD} strokeWidth="0.5"/>
        </g>
      ))}
    </svg>
  );
}

// ── diamond ornament ─────────────────────────────────────────────────────────
function Diamond({ size = 10, opacity = 0.7 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={{ flexShrink:0 }}>
      <polygon points="5,0 10,5 5,10 0,5" fill={GOLD} opacity={opacity}/>
      <polygon points="5,2.5 7.5,5 5,7.5 2.5,5" fill={BG}/>
      <circle cx="5" cy="5" r="1.2" fill={GOLD} opacity={opacity}/>
    </svg>
  );
}

// ── tier label ornament ──────────────────────────────────────────────────────
function TierLabel({ label, subtitle }: { label: string; subtitle: string }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, marginBottom:32 }}>
      {/* top rule with diamonds */}
      <div style={{ display:"flex", alignItems:"center", gap:10, width:"100%", maxWidth:480 }}>
        <div style={{ flex:1, height:1, background:`linear-gradient(to right,transparent,${GOLD_MID})` }}/>
        <Diamond size={8}/>
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" style={{ flexShrink:0 }}>
          <path d="M1 7 Q10 1 19 7 Q10 13 1 7Z" stroke={GOLD} strokeWidth="0.8" fill="none"/>
          <circle cx="10" cy="7" r="2.5" stroke={GOLD} strokeWidth="0.7" fill="none"/>
          <circle cx="10" cy="7" r="1" fill={GOLD}/>
        </svg>
        <Diamond size={8}/>
        <div style={{ flex:1, height:1, background:`linear-gradient(to left,transparent,${GOLD_MID})` }}/>
      </div>
      <p style={{ fontFamily:"'Syne',sans-serif", fontSize:9, letterSpacing:"0.32em", textTransform:"uppercase", color:GOLD, fontWeight:700, margin:0 }}>
        {subtitle}
      </p>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.2rem", fontWeight:300, color:TEXT_WARM, margin:0, lineHeight:1 }}>
        {label}
      </h2>
    </div>
  );
}

// ── individual sponsor card ──────────────────────────────────────────────────
function SponsorCard({
  name, borderColor, glowColor, logoSize,
}: {
  name: string;
  borderColor: string;
  glowColor: string;
  logoSize: { w: number; h: number };
}) {
  return (
    <div
      style={{
        position:"relative",
        border:`1px solid ${borderColor}`,
        borderRadius:4,
        background:`linear-gradient(135deg,rgba(20,14,6,0.9) 0%,rgba(10,7,3,0.98) 100%)`,
        boxShadow:`0 0 24px ${glowColor}, inset 0 0 20px ${glowColor}`,
        padding:"28px 24px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        gap:14,
        transition:"transform 0.28s cubic-bezier(.22,1,.36,1), box-shadow 0.28s",
        cursor:"default",
        overflow:"hidden",
        clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = `0 8px 40px rgba(180,124,60,0.22), inset 0 0 28px rgba(180,124,60,0.1)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = `0 0 24px ${glowColor}, inset 0 0 20px ${glowColor}`;
      }}
    >
      {/* corner hieroglyph marks */}
      {[["0","0","4","0","0","4"],["calc(100% - 4px)","0","calc(100% - 0px)","0","calc(100% - 0px)","4"]].map((pts,i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ position:"absolute", top:i===0?6:6, [i===0?"left":"right"]:6, opacity:0.5 }}>
          <polyline points={i===0?"0,8 0,0 8,0":"12,8 12,0 4,0"} stroke={GOLD} strokeWidth="0.8" fill="none"/>
        </svg>
      ))}
      {[0,1].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ position:"absolute", bottom:6, [i===0?"left":"right"]:6, opacity:0.5 }}>
          <polyline points={i===0?"0,4 0,12 8,12":"12,4 12,12 4,12"} stroke={GOLD} strokeWidth="0.8" fill="none"/>
        </svg>
      ))}

      {/* logo placeholder */}
      <div style={{
        width:logoSize.w, height:logoSize.h,
        background:"rgba(180,124,60,0.06)",
        border:`1px dashed rgba(180,124,60,0.22)`,
        borderRadius:3,
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:"rgba(180,124,60,0.4)", letterSpacing:"0.18em", textTransform:"uppercase", margin:0 }}>
          Logo
        </p>
      </div>

      {/* name */}
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(220,200,170,0.5)", margin:0 }}>
        {name}
      </p>
    </div>
  );
}

export default function SponsorsPage() {
  return (
    <div style={{ background:BG, color:TEXT_WARM, fontFamily:"'DM Sans',sans-serif" }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO / HEADER SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ position:"relative", overflow:"hidden", paddingBottom:80 }}>

        {/* CSS orbs */}
        <div aria-hidden style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
          <div style={{ position:"absolute", width:600, height:600, top:-200, left:-160, borderRadius:"50%", background:"radial-gradient(circle at center,rgba(180,124,60,0.09) 0%,transparent 65%)" }}/>
          <div style={{ position:"absolute", width:400, height:400, top:100, right:-100, borderRadius:"50%", background:"radial-gradient(circle at center,rgba(140,80,20,0.06) 0%,transparent 65%)" }}/>
          <div style={{ position:"absolute", width:260, height:260, bottom:-60, left:"38%", borderRadius:"50%", background:"radial-gradient(circle at center,rgba(180,124,60,0.04) 0%,transparent 65%)" }}/>
        </div>

        {/* Eye of Horus watermark */}
        <svg aria-hidden style={{ position:"absolute", top:24, right:40, opacity:0.055, pointerEvents:"none", zIndex:0 }}
          width="160" height="160" viewBox="0 0 160 160" fill="none">
          <circle cx="80" cy="80" r="72" stroke={GOLD} strokeWidth="0.7"/>
          <circle cx="80" cy="80" r="52" stroke={GOLD} strokeWidth="0.4"/>
          <path d="M20 80 Q80 30 140 80 Q80 130 20 80Z" stroke={GOLD} strokeWidth="1" fill="none"/>
          <circle cx="80" cy="80" r="18" stroke={GOLD} strokeWidth="0.9" fill="none"/>
          <circle cx="80" cy="80" r="7"  stroke={GOLD} strokeWidth="0.7" fill="none"/>
          <line x1="80" y1="58"  x2="80" y2="62"  stroke={GOLD} strokeWidth="0.8"/>
          <line x1="92" y1="61"  x2="90" y2="64"  stroke={GOLD} strokeWidth="0.7"/>
          <line x1="68" y1="61"  x2="70" y2="64"  stroke={GOLD} strokeWidth="0.7"/>
          <path d="M80 98 Q74 112 80 122 Q86 112 80 98Z" stroke={GOLD} strokeWidth="0.7" fill="none"/>
          <line x1="80" y1="122" x2="72" y2="132" stroke={GOLD} strokeWidth="0.6"/>
          <line x1="72" y1="132" x2="72" y2="140" stroke={GOLD} strokeWidth="0.6"/>
          <line x1="80" y1="6"   x2="80" y2="16"  stroke={GOLD} strokeWidth="0.5"/>
          <line x1="80" y1="144" x2="80" y2="154" stroke={GOLD} strokeWidth="0.5"/>
          <line x1="6"  y1="80"  x2="16" y2="80"  stroke={GOLD} strokeWidth="0.5"/>
          <line x1="144" y1="80" x2="154" y2="80" stroke={GOLD} strokeWidth="0.5"/>
        </svg>

        {/* top border */}
        <div style={{ position:"absolute", top:0, left:0, right:0, zIndex:2 }}>
          <CartoucheBorder/>
        </div>

        {/* header content */}
        <div style={{ position:"relative", zIndex:1, maxWidth:860, margin:"0 auto", padding:"80px 48px 0", textAlign:"center" }}>

          {/* eyebrow */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:48, height:1, background:`linear-gradient(to right,transparent,${GOLD_MID})` }}/>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M0.5 6 Q8 0.5 15.5 6 Q8 11.5 0.5 6Z" stroke={GOLD} strokeWidth="0.8" fill="none"/>
              <circle cx="8" cy="6" r="2" stroke={GOLD} strokeWidth="0.7" fill="none"/>
              <circle cx="8" cy="6" r="0.8" fill={GOLD}/>
            </svg>
            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:9, letterSpacing:"0.32em", textTransform:"uppercase", color:GOLD, fontWeight:700, margin:0 }}>
              Prodyogiki
            </p>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ transform:"scaleX(-1)" }}>
              <path d="M0.5 6 Q8 0.5 15.5 6 Q8 11.5 0.5 6Z" stroke={GOLD} strokeWidth="0.8" fill="none"/>
              <circle cx="8" cy="6" r="2" stroke={GOLD} strokeWidth="0.7" fill="none"/>
              <circle cx="8" cy="6" r="0.8" fill={GOLD}/>
            </svg>
            <div style={{ width:48, height:1, background:`linear-gradient(to left,transparent,${GOLD_MID})` }}/>
          </div>

          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(3rem,7vw,5.5rem)", fontWeight:300, lineHeight:0.95, color:TEXT_WARM, margin:"0 0 8px" }}>
            Our <em>Sponsors</em>
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontWeight:300, fontStyle:"italic", color:`rgba(220,200,170,0.5)`, margin:"16px auto 0", maxWidth:420, lineHeight:1.7 }}>
            Those who illuminate the path of discovery
          </p>

          {/* central ornament */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, margin:"36px 0 0" }}>
            <div style={{ width:80, height:1, background:`linear-gradient(to right,transparent,${GOLD_MID})` }}/>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <polygon points="16,0 32,16 16,32 0,16" fill="none" stroke={GOLD} strokeWidth="0.7" opacity="0.7"/>
              <polygon points="16,6 26,16 16,26 6,16" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.5"/>
              <circle cx="16" cy="16" r="3" fill="none" stroke={GOLD} strokeWidth="0.7" opacity="0.8"/>
              <circle cx="16" cy="16" r="1" fill={GOLD} opacity="0.9"/>
            </svg>
            <div style={{ width:80, height:1, background:`linear-gradient(to left,transparent,${GOLD_MID})` }}/>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SPONSOR TIERS
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ padding:"0 48px 80px", maxWidth:1100, margin:"0 auto" }}>
        {tiers.map((tier, ti) => (
          <section key={tier.id} style={{ marginBottom: ti < tiers.length - 1 ? 72 : 0 }}>
            <TierLabel label={tier.label} subtitle={tier.subtitle}/>

            <div style={{
              display:"grid",
              gridTemplateColumns:`repeat(${tier.cols}, 1fr)`,
              gap:20,
            }}>
              {tier.sponsors.map((sp) => (
                <SponsorCard
                  key={sp.name}
                  name={sp.name}
                  borderColor={tier.borderColor}
                  glowColor={tier.glowColor}
                  logoSize={tier.logoSize}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          BECOME A SPONSOR CTA
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ position:"relative", overflow:"hidden", padding:"72px 48px 80px", borderTop:`1px solid ${GOLD_DIM}` }}>
        {/* orb */}
        <div aria-hidden style={{ position:"absolute", width:400, height:400, top:"50%", left:"50%", transform:"translate(-50%,-50%)", borderRadius:"50%", background:"radial-gradient(circle at center,rgba(180,124,60,0.07) 0%,transparent 65%)", pointerEvents:"none" }}/>

        <div style={{ position:"relative", zIndex:1, maxWidth:600, margin:"0 auto", textAlign:"center" }}>
          {/* mini eye ornament */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:20 }}>
            <div style={{ width:40, height:1, background:`linear-gradient(to right,transparent,${GOLD_MID})` }}/>
            <Diamond size={8}/>
            <div style={{ width:40, height:1, background:`linear-gradient(to left,transparent,${GOLD_MID})` }}/>
          </div>

          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:300, color:TEXT_WARM, lineHeight:1.1, margin:"0 0 16px" }}>
            Become a <em>Sponsor</em>
          </h2>
          <p style={{ fontSize:14, lineHeight:1.8, color:TEXT_DIM, margin:"0 0 36px", fontWeight:300 }}>
            Partner with Prodyogiki to connect with the next generation of engineers and scientists.
            Your support turns curiosity into creation.
          </p>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, flexWrap:"wrap" }}>
            <a
              href="mailto:contact@prodyogiki.com"
              style={{
                display:"inline-flex", alignItems:"center", gap:10,
                background:GOLD, color:BG,
                fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500,
                letterSpacing:"0.16em", textTransform:"uppercase",
                padding:"12px 28px", borderRadius:2, textDecoration:"none",
                clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                transition:"background 0.22s,transform 0.18s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#c98e4a"; el.style.transform="translateY(-2px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background=GOLD; el.style.transform="translateY(0)"; }}
            >
              Get in Touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#"
              style={{
                display:"inline-flex", alignItems:"center", gap:10,
                background:"none", border:`1px solid ${GOLD_DIM}`, borderRadius:2,
                fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:400,
                letterSpacing:"0.16em", textTransform:"uppercase",
                padding:"12px 28px", textDecoration:"none", color:TEXT_DIM,
                clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                transition:"border-color 0.22s,color 0.22s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor=GOLD; el.style.color=GOLD; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor=GOLD_DIM; el.style.color=TEXT_DIM; }}
            >
              View Brochure
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER  —  sibling, never inside overflow:hidden
      ══════════════════════════════════════════════════════════════════ */}
      <footer style={{ background:BG, borderTop:`1px solid ${GOLD_DIM}`, fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden" }}>

        {/* orbs */}
        <div aria-hidden style={{ position:"absolute", width:380, height:380, top:-140, left:-100, borderRadius:"50%", background:"radial-gradient(circle at center,rgba(180,124,60,0.09) 0%,transparent 68%)", pointerEvents:"none" }}/>
        <div aria-hidden style={{ position:"absolute", width:240, height:240, bottom:-70, right:50, borderRadius:"50%", background:"radial-gradient(circle at center,rgba(140,80,20,0.07) 0%,transparent 68%)", pointerEvents:"none" }}/>

        {/* sigil */}
        <svg aria-hidden style={{ position:"absolute", right:44, top:44, opacity:0.07, pointerEvents:"none" }}
          width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="56" stroke={GOLD} strokeWidth="0.8"/>
          <circle cx="60" cy="60" r="38" stroke={GOLD} strokeWidth="0.5"/>
          <polygon points="60,10 106,85 14,85" stroke={GOLD} strokeWidth="0.7" fill="none"/>
          <polygon points="60,110 14,35 106,35" stroke={GOLD} strokeWidth="0.7" fill="none"/>
          <circle cx="60" cy="60" r="5" stroke={GOLD} strokeWidth="0.8" fill="none"/>
          <line x1="60" y1="4"   x2="60"  y2="22"  stroke={GOLD} strokeWidth="0.5"/>
          <line x1="60" y1="98"  x2="60"  y2="116" stroke={GOLD} strokeWidth="0.5"/>
          <line x1="4"  y1="60"  x2="22"  y2="60"  stroke={GOLD} strokeWidth="0.5"/>
          <line x1="98" y1="60"  x2="116" y2="60"  stroke={GOLD} strokeWidth="0.5"/>
        </svg>

        <div style={{ position:"relative", zIndex:1, padding:"56px 48px 32px" }}>
          {/* grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:40, maxWidth:860, marginBottom:48 }}>
            {/* Brand */}
            <div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, letterSpacing:"-0.02em", color:"#f0e8d6", lineHeight:1, marginBottom:6 }}>Prodyogiki</p>
              <p style={{ fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:GOLD, marginBottom:14, fontWeight:500 }}>Science &amp; Engineering</p>
              <p style={{ fontSize:13, lineHeight:1.7, color:"rgba(220,200,170,0.5)", fontWeight:300, maxWidth:210 }}>
                Empowering teams to turn raw curiosity into immersive, hands-on experiences — making science and engineering easier to feel, share, and act on.
              </p>
            </div>
            {/* Product */}
            <div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:9, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(180,124,60,0.65)", marginBottom:16 }}>Product</p>
              <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:11 }}>
                {[["Events","/events"],["Team","/team"],["Gallery","/gallery"],["Sponsors","/sponsors"]].map(([label,href]) => (
                  <li key={label}>
                    <Link href={href} style={{ fontSize:13.5, color:"rgba(220,200,170,0.55)", textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}
                      onMouseEnter={(e)=>(e.currentTarget.style.color="#d4a96a")}
                      onMouseLeave={(e)=>(e.currentTarget.style.color="rgba(220,200,170,0.55)")}>
                      <span style={{ width:4, height:4, borderRadius:"50%", background:GOLD, flexShrink:0, opacity:0.6, display:"inline-block" }}/>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Connect */}
            <div>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:9, fontWeight:700, letterSpacing:"0.22em", textTransform:"uppercase", color:"rgba(180,124,60,0.65)", marginBottom:16 }}>Connect</p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
                {[
                  { label:"X", icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l16 16M4 20L20 4"/></svg> },
                  { label:"Instagram", icon:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
                ].map(({ label, icon }) => (
                  <a key={label} href="#"
                    style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"7px 16px", borderRadius:99, border:`1px solid rgba(180,124,60,0.22)`, background:"rgba(180,124,60,0.05)", fontSize:12, fontWeight:500, color:"rgba(220,200,170,0.6)", textDecoration:"none", transition:"all 0.2s" }}
                    onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLAnchorElement; el.style.borderColor="rgba(180,124,60,0.55)"; el.style.color="#d4a96a"; el.style.background="rgba(180,124,60,0.1)"; }}
                    onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLAnchorElement; el.style.borderColor="rgba(180,124,60,0.22)"; el.style.color="rgba(220,200,170,0.6)"; el.style.background="rgba(180,124,60,0.05)"; }}>
                    {icon}{label}
                  </a>
                ))}
              </div>
              <a href="mailto:contact@prodyogiki.com"
                style={{ display:"inline-block", fontSize:12.5, color:"rgba(180,124,60,0.7)", textDecoration:"none", borderBottom:`1px solid rgba(180,124,60,0.2)`, paddingBottom:2, transition:"color 0.2s,border-color 0.2s" }}
                onMouseEnter={(e)=>{ const el=e.currentTarget as HTMLAnchorElement; el.style.color="#d4a96a"; el.style.borderColor="rgba(212,169,106,0.5)"; }}
                onMouseLeave={(e)=>{ const el=e.currentTarget as HTMLAnchorElement; el.style.color="rgba(180,124,60,0.7)"; el.style.borderColor="rgba(180,124,60,0.2)"; }}>
                contact@prodyogiki.com
              </a>
            </div>
          </div>

          {/* divider */}
          <div style={{ height:1, background:`linear-gradient(to right,${GOLD_MID},rgba(180,124,60,0.06),transparent)`, marginBottom:24 }}/>

          {/* bottom */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <span style={{ fontSize:11.5, color:"rgba(180,124,60,0.35)", letterSpacing:"0.02em" }}>© 2026 Prodyogiki. All rights reserved.</span>
            <nav style={{ display:"flex", alignItems:"center", gap:16 }}>
              {["Privacy Policy","Terms","Cookies"].map((item,i,arr)=>(
                <span key={item} style={{ display:"flex", alignItems:"center", gap:16 }}>
                  <Link href="#"
                    style={{ fontSize:11.5, color:"rgba(180,124,60,0.35)", textDecoration:"none", transition:"color 0.2s" }}
                    onMouseEnter={(e)=>((e.currentTarget as HTMLAnchorElement).style.color="rgba(212,169,106,0.7)")}
                    onMouseLeave={(e)=>((e.currentTarget as HTMLAnchorElement).style.color="rgba(180,124,60,0.35)")}>
                    {item}
                  </Link>
                  {i < arr.length-1 && <span style={{ color:"rgba(180,124,60,0.2)", fontSize:11 }}>·</span>}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </footer>

    </div>
  );
}