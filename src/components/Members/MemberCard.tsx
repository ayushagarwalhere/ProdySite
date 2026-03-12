"use client";

import { useState } from "react";
import Image from "next/image";

interface MemberCardProps {
  name: string;
  post: string;
  pokemon: string;
  pokemonImage: string;
  memberImage: string;
  category: string;
}

export default function MemberCard({
  name, post, pokemon, pokemonImage, memberImage, category,
}: MemberCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{
        width: "240px",
        height: "340px",
        perspective: "1200px",
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
          }}
        >
          {/* Photo */}
          <Image src={memberImage} alt={name} fill className="object-cover object-center" />

          {/* Gradient overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }} />

          {/* Glass top badge */}
          <div style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "999px",
            padding: "3px 10px",
          }}>
            <span style={{
              fontSize: "10px",
              fontFamily: "'Cinzel', serif",
              color: "#E7BA80",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>{category}</span>
          </div>

          {/* Flip hint */}
          <div style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "rgba(231,186,128,0.15)",
            border: "1px solid rgba(231,186,128,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: "#E7BA80",
          }}>↻</div>

          {/* Name + post */}
          <div style={{ position: "absolute", bottom: "18px", left: "16px", right: "16px" }}>
            <h3 style={{
              margin: 0,
              color: "#fff",
              fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
              fontSize: "1rem",
              fontWeight: 700,
              lineHeight: 1.3,
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}>{name}</h3>
            <p style={{
              margin: "5px 0 0",
              color: "#E7BA80",
              fontFamily: "'Cinzel', serif",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>{post}</p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            background: "radial-gradient(ellipse at 50% 40%, #2d1e0f 0%, #0f0a05 70%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(231,186,128,0.12)",
          }}
        >
          {/* Decorative ring */}
          <div style={{
            position: "absolute",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            border: "1px solid rgba(231,186,128,0.2)",
            boxShadow: "0 0 40px 8px rgba(231,186,128,0.15)",
          }} />

          {/* Pokemon sprite */}
          <div style={{ position: "relative", width: "120px", height: "120px", zIndex: 1, filter: "drop-shadow(0 0 16px rgba(231,186,128,0.5))" }}>
            <Image src={pokemonImage} alt={pokemon} fill className="object-contain" />
          </div>

          {/* Text */}
          <div style={{ zIndex: 1, textAlign: "center", padding: "0 16px" }}>
            <p style={{ margin: 0, fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(231,186,128,0.5)", fontFamily: "'Cinzel', serif" }}>Pokémon</p>
            <p style={{ margin: "4px 0 0", color: "#E7BA80", fontFamily: "'Cinzel Decorative','Cinzel',serif", fontWeight: 700, fontSize: "1rem", textTransform: "capitalize" }}>{pokemon}</p>
            <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.6)", fontFamily: "'Cinzel', serif", fontSize: "11px" }}>— {name} —</p>
            <p style={{ margin: "4px 0 0", color: "rgba(231,186,128,0.7)", fontFamily: "'Cinzel', serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}>{post}</p>
          </div>

          {/* Flip back */}
          <div
            onClick={e => { e.stopPropagation(); setFlipped(false); }}
            style={{
              zIndex: 1,
              marginTop: "4px",
              padding: "6px 20px",
              borderRadius: "999px",
              background: "rgba(231,186,128,0.15)",
              border: "1px solid rgba(231,186,128,0.4)",
              color: "#E7BA80",
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >Flip Back</div>
        </div>
      </div>
    </div>
  );
}
