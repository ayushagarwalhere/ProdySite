"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { EventData } from "../Events/shared";
import { GOLD, GOLD_DIM, GOLD_MID, TEXT_WARM, TEXT_DIM, BG } from "../Events/shared";

// ─── tiny reusables ─────────────────────────────────────────────────────────

function CartoucheBorder({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="100%" height="18" viewBox="0 0 400 18"
      preserveAspectRatio="xMidYMid slice"
      style={{ display:"block", opacity:0.28, transform: flip ? "scaleY(-1)" : "none" }}>
      {Array.from({ length: 22 }).map((_,i) => (
        <g key={i} transform={`translate(${i*20-10},0)`}>
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

function Diamond({ size=10, op=0.7 }: { size?:number; op?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" style={{flexShrink:0}}>
      <polygon points="5,0 10,5 5,10 0,5" fill={GOLD} opacity={op}/>
      <polygon points="5,2.5 7.5,5 5,7.5 2.5,5" fill={BG}/>
      <circle cx="5" cy="5" r="1.2" fill={GOLD} opacity={op}/>
    </svg>
  );
}

function EyeWatermark() {
  return (
    <svg aria-hidden style={{position:"absolute",top:28,right:36,opacity:0.05,pointerEvents:"none",zIndex:0}}
      width="160" height="160" viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="72" stroke={GOLD} strokeWidth="0.7"/>
      <circle cx="80" cy="80" r="52" stroke={GOLD} strokeWidth="0.4"/>
      <path d="M20 80 Q80 30 140 80 Q80 130 20 80Z" stroke={GOLD} strokeWidth="1" fill="none"/>
      <circle cx="80" cy="80" r="18" stroke={GOLD} strokeWidth="0.9" fill="none"/>
      <circle cx="80" cy="80" r="7"  stroke={GOLD} strokeWidth="0.7" fill="none"/>
      <line x1="80" y1="58" x2="80" y2="62" stroke={GOLD} strokeWidth="0.8"/>
      <line x1="92" y1="61" x2="90" y2="64" stroke={GOLD} strokeWidth="0.7"/>
      <line x1="68" y1="61" x2="70" y2="64" stroke={GOLD} strokeWidth="0.7"/>
      <path d="M80 98 Q74 112 80 122 Q86 112 80 98Z" stroke={GOLD} strokeWidth="0.7" fill="none"/>
      <line x1="80" y1="122" x2="72" y2="132" stroke={GOLD} strokeWidth="0.6"/>
      <line x1="72" y1="132" x2="72" y2="140" stroke={GOLD} strokeWidth="0.6"/>
      <line x1="80" y1="6"   x2="80" y2="16"  stroke={GOLD} strokeWidth="0.5"/>
      <line x1="80" y1="144" x2="80" y2="154" stroke={GOLD} strokeWidth="0.5"/>
      <line x1="6"  y1="80"  x2="16" y2="80"  stroke={GOLD} strokeWidth="0.5"/>
      <line x1="144" y1="80" x2="154" y2="80" stroke={GOLD} strokeWidth="0.5"/>
    </svg>
  );
}

// ─── stat card (floats) ──────────────────────────────────────────────────────
function StatCard({ label, value, delay }: { label:string; value:string; delay:number }) {
  return (
    <div className="stat-float" style={{animationDelay:`${delay}s`,
      background:"rgba(20,14,6,0.85)", border:`1px solid ${GOLD_DIM}`,
      borderRadius:3, padding:"18px 22px", minWidth:130, flex:"1 1 130px",
      clipPath:"polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
      backdropFilter:"blur(12px)",
    }}>
      <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,letterSpacing:"0.24em",
        textTransform:"uppercase",color:GOLD,margin:"0 0 6px",fontWeight:700}}>
        {label}
      </p>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.55rem",
        fontWeight:300,color:TEXT_WARM,margin:0,lineHeight:1}}>
        {value}
      </p>
    </div>
  );
}

// ─── round card (floats on hover) ───────────────────────────────────────────
function RoundCard({ n, title, desc, accent }: { n:number; title:string; desc:string; accent:string }) {
  return (
    <div className="round-card"
      style={{position:"relative",background:"rgba(16,11,5,0.9)",
        border:`1px solid ${GOLD_DIM}`,borderRadius:3,padding:"24px 22px 22px",
        clipPath:"polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
        transition:"transform 0.3s cubic-bezier(.22,1,.36,1),box-shadow 0.3s",
      }}
      onMouseEnter={e=>{
        const el=e.currentTarget as HTMLDivElement;
        el.style.transform="translateY(-6px)";
        el.style.boxShadow=`0 12px 40px rgba(180,124,60,0.14)`;
      }}
      onMouseLeave={e=>{
        const el=e.currentTarget as HTMLDivElement;
        el.style.transform="translateY(0)";
        el.style.boxShadow="none";
      }}
    >
      {/* number */}
      <div style={{position:"absolute",top:-1,left:22,
        fontFamily:"'Cormorant Garamond',serif",fontSize:"3.5rem",
        fontWeight:300,color:accent,opacity:0.18,lineHeight:1,userSelect:"none"}}>
        {String(n).padStart(2,"0")}
      </div>
      <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,letterSpacing:"0.22em",
        textTransform:"uppercase",color:GOLD,margin:"0 0 8px",fontWeight:700,
        position:"relative",zIndex:1}}>
        Round {n}
      </p>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.18rem",
        fontWeight:400,color:TEXT_WARM,margin:"0 0 10px",lineHeight:1.1,
        position:"relative",zIndex:1}}>
        {title}
      </p>
      <p style={{fontSize:13,lineHeight:1.75,color:TEXT_DIM,margin:0,fontWeight:300,
        position:"relative",zIndex:1}}>
        {desc}
      </p>
    </div>
  );
}

// ─── FAQ accordion row ───────────────────────────────────────────────────────
function FaqRow({ q, a }: { q:string; a:string }) {
  const [open,setOpen] = useState(false);
  return (
    <div style={{borderBottom:`1px solid ${GOLD_DIM}`,overflow:"hidden"}}>
      <button
        onClick={()=>setOpen(o=>!o)}
        style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",
          gap:12,padding:"16px 0",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}
      >
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",
          fontWeight:400,color:TEXT_WARM,lineHeight:1.3}}>
          {q}
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{flexShrink:0,transition:"transform 0.25s",transform:open?"rotate(45deg)":"rotate(0)"}}>
          <line x1="7" y1="1" x2="7" y2="13" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="1" y1="7" x2="13" y2="7" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
      <div style={{maxHeight:open?300:0,overflow:"hidden",transition:"max-height 0.35s cubic-bezier(.22,1,.36,1)"}}>
        <p style={{fontSize:13.5,lineHeight:1.8,color:TEXT_DIM,margin:"0 0 16px",fontWeight:300,paddingRight:24}}>
          {a}
        </p>
      </div>
    </div>
  );
}

// ─── MAIN LAYOUT ─────────────────────────────────────────────────────────────
export default function EventPage({ event }: { event: EventData }) {
  const [mounted,setMounted] = useState(false);
  const [regOpen,setRegOpen] = useState(false);
  useEffect(()=>{ setMounted(true); },[]);

  return (
    <div style={{background:BG,color:TEXT_WARM,fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        @keyframes fadeUp {
          from{opacity:0;transform:translateY(24px);}
          to{opacity:1;transform:translateY(0);}
        }
        @keyframes float {
          0%,100%{transform:translateY(0);}
          50%{transform:translateY(-8px);}
        }
        @keyframes floatB {
          0%,100%{transform:translateY(-4px);}
          50%{transform:translateY(4px);}
        }
        @keyframes imgReveal {
          from{clip-path:inset(0 100% 0 0);}
          to{clip-path:inset(0 0% 0 0);}
        }
        @keyframes shimmer {
          0%{opacity:0.04;} 50%{opacity:0.09;} 100%{opacity:0.04;}
        }

        .fade-up { animation:fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .d1{animation-delay:.08s;} .d2{animation-delay:.16s;}
        .d3{animation-delay:.24s;} .d4{animation-delay:.32s;}
        .d5{animation-delay:.40s;}

        .stat-float { animation:float 4s ease-in-out infinite; }
        .stat-float:nth-child(2){animation-name:floatB;animation-duration:5s;}
        .stat-float:nth-child(3){animation-duration:4.5s;animation-delay:.6s;}
        .stat-float:nth-child(4){animation-name:floatB;animation-duration:3.8s;animation-delay:.3s;}

        .img-reveal { animation:imgReveal 0.65s cubic-bezier(.22,1,.36,1) both; }

        .round-card { cursor:default; }

        .pill {
          font-family:'DM Sans',sans-serif;font-size:9px;
          letter-spacing:0.2em;text-transform:uppercase;
          color:${GOLD};border:1px solid ${GOLD_DIM};
          border-radius:99px;padding:3px 10px;
        }

        .rule-item {
          display:flex;align-items:flex-start;gap:10px;
          padding:10px 0;border-bottom:1px solid ${GOLD_DIM};
          font-size:13.5px;line-height:1.7;color:${TEXT_DIM};font-weight:300;
        }
        .rule-item::before {
          content:'';display:block;width:5px;height:5px;border-radius:50%;
          background:${GOLD};opacity:0.6;flex-shrink:0;margin-top:6px;
        }

        .open-btn {
          display:inline-flex;align-items:center;gap:9px;
          background:${GOLD};color:${BG};
          font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;
          letter-spacing:0.14em;text-transform:uppercase;
          padding:12px 28px;border-radius:2px;border:none;cursor:pointer;
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:background 0.22s,transform 0.18s;
        }
        .open-btn:hover{background:#c98e4a;transform:translateY(-2px);}

        .ghost-btn {
          display:inline-flex;align-items:center;gap:9px;
          background:none;border:1px solid ${GOLD_DIM};border-radius:2px;
          font-family:'DM Sans',sans-serif;font-size:11px;font-weight:400;
          letter-spacing:0.14em;text-transform:uppercase;
          padding:12px 28px;cursor:pointer;color:${TEXT_DIM};
          clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
          transition:border-color 0.22s,color 0.22s;
        }
        .ghost-btn:hover{border-color:${GOLD};color:${GOLD};}

        .modal-overlay {
          position:fixed;inset:0;background:rgba(4,3,2,0.88);
          display:flex;align-items:center;justify-content:center;
          z-index:100;backdrop-filter:blur(6px);
          animation:fadeUp 0.3s cubic-bezier(.22,1,.36,1) both;
        }
        .modal-box {
          background:#0f0a05;border:1px solid ${GOLD_DIM};border-radius:4px;
          width:90%;max-width:480px;padding:36px;position:relative;
          clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
        }

        input,textarea,select {
          width:100%;background:rgba(180,124,60,0.04);
          border:1px solid ${GOLD_DIM};border-radius:2px;
          padding:10px 14px;color:${TEXT_WARM};
          font-family:'DM Sans',sans-serif;font-size:13px;
          outline:none;transition:border-color 0.2s;box-sizing:border-box;
          clip-path:polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%);
        }
        input:focus,textarea:focus,select:focus{border-color:${GOLD};}
        input::placeholder,textarea::placeholder{color:rgba(220,200,170,0.25);}
        select option{background:#0f0a05;}

        .scroll-slim::-webkit-scrollbar{width:3px;}
        .scroll-slim::-webkit-scrollbar-track{background:transparent;}
        .scroll-slim::-webkit-scrollbar-thumb{background:${GOLD_DIM};border-radius:99px;}

        @media(max-width:768px){
          .hero-grid{flex-direction:column!important;}
          .stat-row{flex-wrap:wrap!important;}
          .rounds-grid{grid-template-columns:1fr!important;}
          .footer-grid{grid-template-columns:1fr!important;gap:32px!important;}
        }
      `}</style>

      {/* ═══════════════════════ HERO ════════════════════════════════════ */}
      <div style={{position:"relative",overflow:"hidden",minHeight:"100vh",display:"flex",flexDirection:"column"}}>

        {/* hero image */}
        {mounted && (
          <div className="img-reveal" style={{position:"absolute",inset:0,zIndex:0}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.image} alt={event.name}
              style={{width:"100%",height:"100%",objectFit:"cover",
                filter:"brightness(0.28) saturate(0.7)"}}/>
          </div>
        )}

        {/* gradient veil */}
        <div style={{position:"absolute",inset:0,zIndex:1,
          background:"linear-gradient(120deg,rgba(6,4,2,0.92) 0%,rgba(6,4,2,0.55) 60%,rgba(6,4,2,0.3) 100%)"}}/>

        {/* accent colour splash */}
        <div style={{position:"absolute",top:-120,left:-120,width:500,height:500,
          borderRadius:"50%",zIndex:1,pointerEvents:"none",animation:"shimmer 6s ease-in-out infinite",
          background:`radial-gradient(circle at center,${event.accentColor} 0%,transparent 65%)`}}/>

        {/* orbs */}
        <div aria-hidden style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1}}>
          <div style={{position:"absolute",width:400,height:400,bottom:-100,right:-80,borderRadius:"50%",
            background:"radial-gradient(circle at center,rgba(140,80,20,0.07) 0%,transparent 65%)"}}/>
        </div>

        {/* eye watermark */}
        <EyeWatermark/>

        {/* top border */}
        <div style={{position:"absolute",top:0,left:0,right:0,zIndex:3,pointerEvents:"none"}}>
          <CartoucheBorder/>
        </div>

        {/* nav bar */}
        <nav className="fade-up"
          style={{position:"relative",zIndex:4,display:"flex",alignItems:"center",
            justifyContent:"space-between",padding:"28px 48px 0"}}>
          <Link href="/events"
            style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none",
              fontFamily:"'DM Sans',sans-serif",fontSize:12,letterSpacing:"0.12em",
              textTransform:"uppercase",color:TEXT_DIM,transition:"color 0.2s"}}
            onMouseEnter={e=>(e.currentTarget.style.color=GOLD)}
            onMouseLeave={e=>(e.currentTarget.style.color=TEXT_DIM)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Events
          </Link>
          <span className="pill">{event.branch}</span>
        </nav>

        {/* hero content */}
        <div style={{position:"relative",zIndex:4,flex:1,
          display:"flex",flexDirection:"column",justifyContent:"center",
          padding:"48px 48px 100px"}}>

          <div className="hero-grid fade-up d1"
            style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:40}}>

            {/* left — title block */}
            <div style={{maxWidth:580}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <Diamond size={8}/>
                <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,letterSpacing:"0.32em",
                  textTransform:"uppercase",color:GOLD,fontWeight:700,margin:0}}>
                  {event.tag} · {event.branch}
                </p>
              </div>
              <h1 style={{fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(3.2rem,8vw,6.5rem)",fontWeight:300,lineHeight:0.92,
                color:TEXT_WARM,margin:"0 0 6px",letterSpacing:"-0.01em"}}>
                {event.name}
              </h1>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",
                fontSize:"clamp(1.1rem,2.5vw,1.6rem)",fontWeight:300,
                fontStyle:"italic",color:GOLD,margin:"10px 0 0",lineHeight:1.2}}>
                {event.tagline}
              </h2>
            </div>

            {/* right — CTA */}
            <div className="fade-up d3" style={{flexShrink:0,display:"flex",flexDirection:"column",gap:12,alignItems:"flex-end"}}>
              <button className="open-btn" onClick={()=>setRegOpen(true)}>
                Register Now
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span style={{fontSize:11,color:TEXT_DIM,letterSpacing:"0.1em"}}>{event.date} · {event.venue}</span>
            </div>
          </div>

          {/* stat cards — floating */}
          <div className="stat-row fade-up d4"
            style={{display:"flex",gap:14,marginTop:52,flexWrap:"wrap"}}>
            <StatCard label="Date"       value={event.date}     delay={0}/>
            <StatCard label="Venue"      value={event.venue}    delay={0.15}/>
            <StatCard label="Team Size"  value={event.teamSize} delay={0.3}/>
            <StatCard label="Prize Pool" value={event.prizePool} delay={0.45}/>
          </div>
        </div>

        {/* bottom border */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,zIndex:3,pointerEvents:"none"}}>
          <CartoucheBorder flip/>
        </div>
      </div>

      {/* ═══════════════════════ ABOUT ═══════════════════════════════════ */}
      <section style={{padding:"80px 48px",maxWidth:900,margin:"0 auto"}}>
        <div className="fade-up" style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}>
          <Diamond size={8}/>
          <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,letterSpacing:"0.28em",
            textTransform:"uppercase",color:GOLD,fontWeight:700,margin:0}}>
            About the Event
          </p>
          <div style={{flex:1,height:1,background:`linear-gradient(to right,${GOLD_MID},transparent)`}}/>
        </div>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.1rem,2vw,1.35rem)",
          fontWeight:300,lineHeight:1.85,color:"rgba(220,200,170,0.75)",margin:0}}>
          {event.description}
        </p>
      </section>

      {/* ═══════════════════════ ROUNDS ══════════════════════════════════ */}
      <section style={{padding:"0 48px 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:36}}>
          <Diamond size={8}/>
          <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,letterSpacing:"0.28em",
            textTransform:"uppercase",color:GOLD,fontWeight:700,margin:0}}>
            Event Structure
          </p>
          <div style={{flex:1,height:1,background:`linear-gradient(to right,${GOLD_MID},transparent)`}}/>
        </div>
        <div className="rounds-grid"
          style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18}}>
          {event.rounds.map((r,i)=>(
            <RoundCard key={i} n={i+1} title={r.title} desc={r.desc} accent={event.accentColor}/>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ RULES ═══════════════════════════════════ */}
      <section style={{padding:"0 48px 80px",maxWidth:760,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}>
          <Diamond size={8}/>
          <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,letterSpacing:"0.28em",
            textTransform:"uppercase",color:GOLD,fontWeight:700,margin:0}}>
            Rules & Guidelines
          </p>
          <div style={{flex:1,height:1,background:`linear-gradient(to right,${GOLD_MID},transparent)`}}/>
        </div>
        <div>
          {event.rules.map((r,i)=>(
            <div key={i} className="rule-item">{r}</div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ FAQ ══════════════════════════════════════ */}
      <section style={{padding:"0 48px 100px",maxWidth:760,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}>
          <Diamond size={8}/>
          <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,letterSpacing:"0.28em",
            textTransform:"uppercase",color:GOLD,fontWeight:700,margin:0}}>
            FAQs
          </p>
          <div style={{flex:1,height:1,background:`linear-gradient(to right,${GOLD_MID},transparent)`}}/>
        </div>
        {event.faqs.map((f,i)=><FaqRow key={i} q={f.q} a={f.a}/>)}
      </section>

      {/* ═══════════════════════ BOTTOM CTA ══════════════════════════════ */}
      <section style={{position:"relative",overflow:"hidden",
        padding:"72px 48px 80px",borderTop:`1px solid ${GOLD_DIM}`}}>
        <div aria-hidden style={{position:"absolute",width:400,height:400,
          top:"50%",left:"50%",transform:"translate(-50%,-50%)",borderRadius:"50%",pointerEvents:"none",
          background:`radial-gradient(circle at center,${event.accentColor} 0%,transparent 65%)`}}/>
        <div style={{position:"relative",zIndex:1,textAlign:"center",maxWidth:520,margin:"0 auto"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(2rem,4vw,3rem)",fontWeight:300,color:TEXT_WARM,margin:"0 0 14px"}}>
            Ready to <em>Compete?</em>
          </h2>
          <p style={{fontSize:14,lineHeight:1.8,color:TEXT_DIM,margin:"0 0 32px",fontWeight:300}}>
            Registrations are open. Secure your slot before seats fill up.
          </p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="open-btn" onClick={()=>setRegOpen(true)}>
              Register Now
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <Link href="/events" className="ghost-btn" style={{textDecoration:"none",display:"inline-flex",alignItems:"center"}}>
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ══════════════════════════════════ */}
      <footer style={{background:BG,borderTop:`1px solid ${GOLD_DIM}`,
        fontFamily:"'DM Sans',sans-serif",position:"relative",overflow:"hidden"}}>
        <div aria-hidden style={{position:"absolute",width:380,height:380,top:-140,left:-100,
          borderRadius:"50%",background:"radial-gradient(circle at center,rgba(180,124,60,0.09) 0%,transparent 68%)",pointerEvents:"none"}}/>
        <div aria-hidden style={{position:"absolute",width:240,height:240,bottom:-70,right:50,
          borderRadius:"50%",background:"radial-gradient(circle at center,rgba(140,80,20,0.07) 0%,transparent 68%)",pointerEvents:"none"}}/>
        <svg aria-hidden style={{position:"absolute",right:44,top:44,opacity:0.07,pointerEvents:"none"}}
          width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="56" stroke={GOLD} strokeWidth="0.8"/>
          <circle cx="60" cy="60" r="38" stroke={GOLD} strokeWidth="0.5"/>
          <polygon points="60,10 106,85 14,85" stroke={GOLD} strokeWidth="0.7" fill="none"/>
          <polygon points="60,110 14,35 106,35" stroke={GOLD} strokeWidth="0.7" fill="none"/>
          <circle cx="60" cy="60" r="5" stroke={GOLD} strokeWidth="0.8" fill="none"/>
          <line x1="60" y1="4"  x2="60" y2="22"  stroke={GOLD} strokeWidth="0.5"/>
          <line x1="60" y1="98" x2="60" y2="116" stroke={GOLD} strokeWidth="0.5"/>
          <line x1="4"  y1="60" x2="22" y2="60"  stroke={GOLD} strokeWidth="0.5"/>
          <line x1="98" y1="60" x2="116" y2="60" stroke={GOLD} strokeWidth="0.5"/>
        </svg>
        <div style={{position:"relative",zIndex:1,padding:"56px 48px 32px"}}>
          <div className="footer-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:40,maxWidth:860,marginBottom:48}}>
            <div>
              <p style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,letterSpacing:"-0.02em",color:"#f0e8d6",lineHeight:1,marginBottom:6}}>Prodyogiki</p>
              <p style={{fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:GOLD,marginBottom:14,fontWeight:500}}>Science &amp; Engineering</p>
              <p style={{fontSize:13,lineHeight:1.7,color:"rgba(220,200,170,0.5)",fontWeight:300,maxWidth:210}}>
                Empowering teams to turn raw curiosity into immersive, hands-on experiences.
              </p>
            </div>
            <div>
              <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(180,124,60,0.65)",marginBottom:16}}>Events</p>
              <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:10}}>
                {[["Hackathon","/events/hackathon"],["Escape Room","/events/escape-room"],
                  ["Sailboat","/events/sailboat"],["Ancient Arch","/events/ancient-arch"],
                  ["Chemystery","/events/chemystery"],["Auction","/events/auction"]].map(([l,h])=>(
                  <li key={l}>
                    <Link href={h} style={{fontSize:13,color:"rgba(220,200,170,0.5)",textDecoration:"none",
                      display:"flex",alignItems:"center",gap:6,transition:"color 0.2s"}}
                      onMouseEnter={e=>(e.currentTarget.style.color="#d4a96a")}
                      onMouseLeave={e=>(e.currentTarget.style.color="rgba(220,200,170,0.5)")}>
                      <span style={{width:4,height:4,borderRadius:"50%",background:GOLD,opacity:0.6,display:"inline-block",flexShrink:0}}/>
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{fontFamily:"'Syne',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(180,124,60,0.65)",marginBottom:16}}>Connect</p>
              <div style={{display:"flex",gap:8,marginBottom:18}}>
                {[{l:"X",i:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4l16 16M4 20L20 4"/></svg>},
                  {l:"Instagram",i:<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>}
                ].map(({l,i})=>(
                  <a key={l} href="#" style={{display:"inline-flex",alignItems:"center",gap:7,padding:"7px 14px",
                    borderRadius:99,border:`1px solid rgba(180,124,60,0.22)`,background:"rgba(180,124,60,0.05)",
                    fontSize:12,fontWeight:500,color:"rgba(220,200,170,0.6)",textDecoration:"none",transition:"all 0.2s"}}
                    onMouseEnter={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.borderColor="rgba(180,124,60,0.55)";el.style.color="#d4a96a";el.style.background="rgba(180,124,60,0.1)";}}
                    onMouseLeave={e=>{const el=e.currentTarget as HTMLAnchorElement;el.style.borderColor="rgba(180,124,60,0.22)";el.style.color="rgba(220,200,170,0.6)";el.style.background="rgba(180,124,60,0.05)";}}>
                    {i}{l}
                  </a>
                ))}
              </div>
              <a href="mailto:contact@prodyogiki.com"
                style={{fontSize:12.5,color:"rgba(180,124,60,0.7)",textDecoration:"none",
                  borderBottom:`1px solid rgba(180,124,60,0.2)`,paddingBottom:2,transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="#d4a96a")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(180,124,60,0.7)")}>
                contact@prodyogiki.com
              </a>
            </div>
          </div>
          <div style={{height:1,background:`linear-gradient(to right,${GOLD_MID},rgba(180,124,60,0.06),transparent)`,marginBottom:24}}/>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <span style={{fontSize:11.5,color:"rgba(180,124,60,0.35)"}}>© 2026 Prodyogiki. All rights reserved.</span>
            <nav style={{display:"flex",gap:16}}>
              {["Privacy Policy","Terms","Cookies"].map((t,i,a)=>(
                <span key={t} style={{display:"flex",gap:16,alignItems:"center"}}>
                  <Link href="#" style={{fontSize:11.5,color:"rgba(180,124,60,0.35)",textDecoration:"none"}}
                    onMouseEnter={e=>((e.currentTarget as HTMLAnchorElement).style.color="rgba(212,169,106,0.7)")}
                    onMouseLeave={e=>((e.currentTarget as HTMLAnchorElement).style.color="rgba(180,124,60,0.35)")}>
                    {t}
                  </Link>
                  {i<a.length-1&&<span style={{color:"rgba(180,124,60,0.2)"}}>·</span>}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════ REGISTER MODAL ══════════════════════════ */}
      {regOpen && (
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setRegOpen(false)}}>
          <div className="modal-box">
            {/* corner marks */}
            {[{t:6,l:6},{t:6,r:6},{b:6,l:6},{b:6,r:6}].map((pos,i)=>(
              <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none"
                style={{position:"absolute",...pos,opacity:0.45}}>
                <polyline
                  points={i===0?"0,8 0,0 8,0":i===1?"12,8 12,0 4,0":i===2?"0,4 0,12 8,12":"12,4 12,12 4,12"}
                  stroke={GOLD} strokeWidth="0.9" fill="none"/>
              </svg>
            ))}

            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",
                fontWeight:300,color:TEXT_WARM,margin:0}}>
                Register for <em>{event.name}</em>
              </h3>
              <button onClick={()=>setRegOpen(false)}
                style={{background:"none",border:"none",cursor:"pointer",
                  color:TEXT_DIM,padding:4,transition:"color 0.2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color=GOLD)}
                onMouseLeave={e=>(e.currentTarget.style.color=TEXT_DIM)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M2 14L14 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <input type="text" placeholder="Full Name"/>
                <input type="email" placeholder="Email"/>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <input type="text" placeholder="Roll Number"/>
                <input type="tel" placeholder="Phone"/>
              </div>
              <input type="text" placeholder="College / Institution"/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <input type="text" placeholder="Team Name"/>
                <select defaultValue="">
                  <option value="" disabled>Team Size</option>
                  <option>Solo</option>
                  <option>2 Members</option>
                  <option>3 Members</option>
                  <option>4 Members</option>
                </select>
              </div>
              <textarea placeholder="Anything else you'd like us to know?" rows={3}
                style={{resize:"none"}}/>
              <button className="open-btn" style={{width:"100%",justifyContent:"center",marginTop:4}}>
                Confirm Registration
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p style={{fontSize:11,color:TEXT_DIM,textAlign:"center",margin:0,letterSpacing:"0.04em"}}>
                Registrations close 48 hrs before the event.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
