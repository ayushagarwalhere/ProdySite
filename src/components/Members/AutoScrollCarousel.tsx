"use client";

import React, { useRef, useEffect } from "react";
import MemberCard from "./MemberCard";

export interface MemberData {
  name: string;
  post: string;
  pokemon: string;
  pokemonImage: string;
  memberImage: string;
  category: string;
}

interface AutoScrollCarouselProps {
  members: MemberData[];
  speed?: number;
}

export default function AutoScrollCarousel({ members, speed = 55 }: AutoScrollCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const lastTimeRef = useRef<number | null>(null);

  // Triple the cards for a seamless infinite loop
  const tripled = [...members, ...members, ...members];

  useEffect(() => {
    const step = (ts: number) => {
      if (!pausedRef.current) {
        if (lastTimeRef.current !== null) {
          const delta = ts - lastTimeRef.current;
          posRef.current += (speed * delta) / 1000;

          const track = trackRef.current;
          if (track) {
            const segmentWidth = track.scrollWidth / 3;
            if (posRef.current >= segmentWidth) {
              posRef.current -= segmentWidth;
            }
            track.style.transform = `translateX(-${posRef.current}px)`;
          }
        }
        lastTimeRef.current = ts;
      } else {
        lastTimeRef.current = null;
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [speed, members]);

  return (
    /* Outer mask – clips overflow so cards slide in/out cleanly */
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Track – one long single horizontal strip */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          gap: "24px",
          width: "max-content",
          padding: "16px 0",
          willChange: "transform",
        }}
      >
        {tripled.map((member, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            <MemberCard
              name={member.name}
              post={member.post}
              pokemon={member.pokemon}
              pokemonImage={member.pokemonImage}
              memberImage={member.memberImage}
              category={member.category}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
