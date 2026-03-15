import Link from "next/link";


export default function Footer() {
  const FOOTER_BG   = "#0a0703";
  const GOLD_DIM    = "rgba(180,124,60,0.16)";
  const GOLD_MID    = "rgba(180,124,60,0.35)";
  const GOLD        = "#b47c3c";  
  return (
    <footer
                style={{
                    background: FOOTER_BG,
                    borderTop: `1px solid ${GOLD_DIM}`,
                    fontFamily: "'DM Sans', sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* ambient orbs */}
                <div aria-hidden style={{ position:"absolute", width:380, height:380, top:-140, left:-100, borderRadius:"50%", background:"radial-gradient(circle at center,rgba(180,124,60,0.09) 0%,transparent 68%)", pointerEvents:"none" }}/>
                <div aria-hidden style={{ position:"absolute", width:240, height:240, bottom:-70, right:50, borderRadius:"50%", background:"radial-gradient(circle at center,rgba(140,80,20,0.07) 0%,transparent 68%)", pointerEvents:"none" }}/>

                {/* alchemical sigil */}
                <svg
                    aria-hidden
                    style={{ position:"absolute", right:44, top:44, opacity:0.07, pointerEvents:"none" }}
                    width="120" height="120" viewBox="0 0 120 120" fill="none"
                >
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

                {/* ── footer body ── */}
                <div style={{ position:"relative", zIndex:1, padding:"64px 24px 32px", width: "100%", maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>

                    {/* top grid */}
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:40, width: "100%", textAlign: "center", marginBottom:56 }}>

                        {/* Brand */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <p style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, letterSpacing:"-0.02em", color:"#f0e8d6", lineHeight:1, marginBottom:6 }}>
                                Prodyogiki
                            </p>
                            <p style={{ fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:GOLD, marginBottom:14, fontWeight:500 }}>
                                Science &amp; Engineering
                            </p>
                            <p style={{ fontSize:13, lineHeight:1.7, color:"rgba(220,200,170,0.5)", fontWeight:300, maxWidth:280 }}>
                                Empowering teams to turn raw curiosity into immersive, hands-on
                                experiences — making science and engineering easier to feel, share,
                                and act on.
                            </p>
                        </div>

                    </div>

                    {/* divider */}
                    <div style={{ height:1, width: "100%", background:`linear-gradient(to right,transparent,${GOLD_MID},transparent)`, marginBottom:28 }}/>

                    {/* bottom row */}
                    <div style={{ display:"flex", flexDirection: "column", alignItems:"center", justifyContent:"center", gap:16, width: "100%", textAlign: "center" }}>
                        <span style={{ fontSize:11.5, color:"rgba(180,124,60,0.35)", letterSpacing:"0.02em" }}>
                            © 2026 Prodyogiki. All rights reserved.
                        </span>
                        <nav style={{ display:"flex", alignItems:"center", justifyContent: "center", gap:16, flexWrap: "wrap" }}>
                            {["Privacy Policy","Terms","Cookies"].map((item, i, arr) => (
                                <span key={item} style={{ display:"flex", alignItems:"center", gap:16 }}>
                                    <Link
                                        href="#"
                                        style={{ fontSize:11.5, color:"rgba(180,124,60,0.35)", textDecoration:"none", transition:"color 0.2s" }}
                                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,169,106,0.7)")}
                                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(180,124,60,0.35)")}
                                    >
                                        {item}
                                    </Link>
                                    {i < arr.length - 1 && (
                                        <span style={{ color:"rgba(180,124,60,0.2)", fontSize:11 }}>·</span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    </div>
                </div>
            </footer>
  );
}