"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Footer from "@/components/custom/footer";

type Member = {
  name: string;
  post: string;
  pokemon: string;
  pokemonImage: string;
  memberImage: string;
  category: string;
  year: number;
  title: string;
};

const POKEMON_SPRITES = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const ALCHEMICAL_TITLE: Record<string, string> = {
  President: "Grand Alchemist",
  "Vice President": "Arcane Chancellor",
  Secretary: "Keeper of Scrolls",
  "Joint Secretary": "Scroll Warden",
  "Design Head": "Visionary Artificer",
  "Joint Design Head": "Rune Crafter",
  "Technical Head": "Master Transmuter",
  "Joint Technical Head": "Iron Sage",
  "Finance Head": "Gold Keeper",
  "Joint Finance Head": "Silver Steward",
  "PR Head": "Voice of the Realm",
  "Joint PR Head": "Herald's Apprentice",
  "Media & Marketing Head": "Oracle of Influence",
  "Joint Media & Marketing Head": "Echo Weaver",
  "Creative Head": "Mythic Illustrator",
  "Operations/Logistics Head": "Field Marshal",
  "Convener (Event)": "Rite Convener",
  "Convener (Creative)": "Aether Convener",
  "Executive Member": "Initiate",
  Volunteer: "Neophyte",
};

const ALL_MEMBERS: Member[] = [
  // ── Final Year ──
  { year: 4, category: "Final Year", name: "Sourabh Awasthi",  post: "President",                      pokemon: "Arceus",    pokemonImage: POKEMON_SPRITES(493), memberImage: "/members/final/Sourabh.png",      title: ALCHEMICAL_TITLE["President"] },
  { year: 4, category: "Final Year", name: "Gugli Thakur",     post: "Vice President",                 pokemon: "Gardevoir", pokemonImage: POKEMON_SPRITES(282), memberImage: "/members/final/gugli.png",        title: ALCHEMICAL_TITLE["Vice President"] },
  { year: 4, category: "Final Year", name: "Mehul Ambastha",   post: "Vice President",                 pokemon: "Alakazam",  pokemonImage: POKEMON_SPRITES(65),  memberImage: "/members/final/Mehul.png",        title: ALCHEMICAL_TITLE["Vice President"] },
  { year: 4, category: "Final Year", name: "Sakshi Gothwal",   post: "Secretary",                      pokemon: "Espeon",    pokemonImage: POKEMON_SPRITES(196), memberImage: "/members/final/sakshi.png",       title: ALCHEMICAL_TITLE["Secretary"] },
  { year: 4, category: "Final Year", name: "Ankur Yadav",      post: "Joint Secretary",                pokemon: "Umbreon",   pokemonImage: POKEMON_SPRITES(197), memberImage: "/members/final/ankur.png",        title: ALCHEMICAL_TITLE["Joint Secretary"] },
  { year: 4, category: "Final Year", name: "Anshuman Payasi",  post: "Design Head",                    pokemon: "Jolteon",   pokemonImage: POKEMON_SPRITES(135), memberImage: "/members/final/anshuman.png",     title: ALCHEMICAL_TITLE["Design Head"] },
  { year: 4, category: "Final Year", name: "Abhimanyu Singh",  post: "Technical Head",                 pokemon: "Metagross", pokemonImage: POKEMON_SPRITES(376), memberImage: "/members/final/abhimanyu.png",    title: ALCHEMICAL_TITLE["Technical Head"] },
  { year: 4, category: "Final Year", name: "Ayan Chordia",     post: "Finance Head",                   pokemon: "Blastoise", pokemonImage: POKEMON_SPRITES(9),   memberImage: "/members/final/ayan.png",         title: ALCHEMICAL_TITLE["Finance Head"] },
  { year: 4, category: "Final Year", name: "Ayushi",           post: "PR Head",                        pokemon: "Ninetales", pokemonImage: POKEMON_SPRITES(38),  memberImage: "/members/final/ayushi.png",       title: ALCHEMICAL_TITLE["PR Head"] },
  { year: 4, category: "Final Year", name: "Anurag",           post: "Media & Marketing Head",         pokemon: "Lucario",   pokemonImage: POKEMON_SPRITES(448), memberImage: "/members/final/anuragtrip.png",   title: ALCHEMICAL_TITLE["Media & Marketing Head"] },
  { year: 4, category: "Final Year", name: "Aditya Sharma",    post: "Joint Design Head",              pokemon: "Sylveon",   pokemonImage: POKEMON_SPRITES(700), memberImage: "/members/final/aditya.png",       title: ALCHEMICAL_TITLE["Joint Design Head"] },
  { year: 4, category: "Final Year", name: "Tanashvi",         post: "Joint Technical Head",           pokemon: "Togekiss",  pokemonImage: POKEMON_SPRITES(468), memberImage: "/members/final/tanashvi.png",     title: ALCHEMICAL_TITLE["Joint Technical Head"] },
  { year: 4, category: "Final Year", name: "Laksh Bhandari",   post: "Joint Media & Marketing Head",   pokemon: "Dragonite", pokemonImage: POKEMON_SPRITES(149), memberImage: "/members/final/laksh.webp",      title: ALCHEMICAL_TITLE["Joint Media & Marketing Head"] },
  { year: 4, category: "Final Year", name: "Oshin Sharma",     post: "Joint PR Head",                  pokemon: "Vaporeon",  pokemonImage: POKEMON_SPRITES(134), memberImage: "/members/final/oshin.png",        title: ALCHEMICAL_TITLE["Joint PR Head"] },
  { year: 4, category: "Final Year", name: "Rishika Sharma",   post: "Creative Head",                  pokemon: "Eevee",     pokemonImage: POKEMON_SPRITES(133), memberImage: "/members/final/rishika.png",      title: ALCHEMICAL_TITLE["Creative Head"] },

  // ── Coordinators ──
  { year: 3, category: "Coordinator", name: "Arihant Dogra",       post: "Secretary",                    pokemon: "Gengar",     pokemonImage: POKEMON_SPRITES(94),  memberImage: "/members/third/arihant.png",          title: ALCHEMICAL_TITLE["Secretary"] },
  { year: 3, category: "Coordinator", name: "Akshit Saini",        post: "Convener (Event)",              pokemon: "Charizard",  pokemonImage: POKEMON_SPRITES(6),   memberImage: "/members/third/akshitsaini.png",       title: ALCHEMICAL_TITLE["Convener (Event)"] },
  { year: 3, category: "Coordinator", name: "Saksham Kashyap",     post: "Convener (Creative)",           pokemon: "Flareon",    pokemonImage: POKEMON_SPRITES(136), memberImage: "/members/third/kashyapsaksham.png",    title: ALCHEMICAL_TITLE["Convener (Creative)"] },
  { year: 3, category: "Coordinator", name: "Yash Sisodia",        post: "Finance Head",                  pokemon: "Raichu",     pokemonImage: POKEMON_SPRITES(26),  memberImage: "/members/third/yashsisodia.webp",      title: ALCHEMICAL_TITLE["Finance Head"] },
  { year: 3, category: "Coordinator", name: "Abhishek Sharma",     post: "Joint Finance Head",            pokemon: "Slowbro",    pokemonImage: POKEMON_SPRITES(80),  memberImage: "/members/third/abhishek.png",          title: ALCHEMICAL_TITLE["Joint Finance Head"] },
  { year: 3, category: "Coordinator", name: "Mannat Katna",        post: "Design Head",                   pokemon: "Clefable",   pokemonImage: POKEMON_SPRITES(36),  memberImage: "/members/third/mannat.png",            title: ALCHEMICAL_TITLE["Design Head"] },
  { year: 3, category: "Coordinator", name: "Sonal Dogra",         post: "PR Head",                       pokemon: "Jigglypuff", pokemonImage: POKEMON_SPRITES(39),  memberImage: "/members/third/sonal.png",             title: ALCHEMICAL_TITLE["PR Head"] },
  { year: 3, category: "Coordinator", name: "Amit Singh Bathyal",  post: "Joint PR Head",                 pokemon: "Scizor",     pokemonImage: POKEMON_SPRITES(212), memberImage: "/members/third/amitsingh.png",         title: ALCHEMICAL_TITLE["Joint PR Head"] },
  { year: 3, category: "Coordinator", name: "Akshit Pathania",     post: "Technical Head",                pokemon: "Muk",        pokemonImage: POKEMON_SPRITES(89),  memberImage: "/members/third/akshitpathania.png",    title: ALCHEMICAL_TITLE["Technical Head"] },
  { year: 3, category: "Coordinator", name: "Ayush Arora",         post: "Joint Technical Head",          pokemon: "Electivire", pokemonImage: POKEMON_SPRITES(466), memberImage: "/members/third/ayusharora.png",        title: ALCHEMICAL_TITLE["Joint Technical Head"] },
  { year: 3, category: "Coordinator", name: "Kanishk Singh",       post: "Media & Marketing Head",        pokemon: "Minccino",   pokemonImage: POKEMON_SPRITES(572), memberImage: "/members/third/kanishk.png",           title: ALCHEMICAL_TITLE["Media & Marketing Head"] },
  { year: 3, category: "Coordinator", name: "Siya Sood",           post: "Creative Head",                 pokemon: "Roserade",   pokemonImage: POKEMON_SPRITES(407), memberImage: "/members/third/siyasood.png",          title: ALCHEMICAL_TITLE["Creative Head"] },
  { year: 3, category: "Coordinator", name: "Naman Srivastava",    post: "Operations/Logistics Head",     pokemon: "Heracross",  pokemonImage: POKEMON_SPRITES(214), memberImage: "/members/third/namansrivastava.png",   title: ALCHEMICAL_TITLE["Operations/Logistics Head"] },
  { year: 3, category: "Coordinator", name: "Ashutosh",            post: "Joint Media & Marketing Head",  pokemon: "Haunter",    pokemonImage: POKEMON_SPRITES(93),  memberImage: "/members/third/ashutosh.png",          title: ALCHEMICAL_TITLE["Joint Media & Marketing Head"] },

  // ── Executive ──
  { year: 2, category: "Executive", name: "Sanskar Srivastava", post: "Executive Member", pokemon: "Pikachu",        pokemonImage: POKEMON_SPRITES(25),    memberImage: "/members/second/sanskar.png",           title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Ayush Agarwal",      post: "Executive Member", pokemon: "Ash's Greninja", pokemonImage: POKEMON_SPRITES(10117), memberImage: "/members/second/ayushagarwal.png",       title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Sitanshu Nayan",     post: "Executive Member", pokemon: "Warlord",       pokemonImage: POKEMON_SPRITES(8),     memberImage: "/members/second/sitanshu.png",           title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Saksham Shandilya",  post: "Executive Member", pokemon: "Doduo",          pokemonImage: POKEMON_SPRITES(84),    memberImage: "/members/second/sakshamshandiliya.png",  title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Priyanshi Joshi",    post: "Executive Member", pokemon: "Eevee",          pokemonImage: POKEMON_SPRITES(133),   memberImage: "/members/second/priyanshi.png",          title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Anurag Singh",       post: "Executive Member", pokemon: "Lucario",          pokemonImage: POKEMON_SPRITES(448),   memberImage: "/members/second/anurag.png",             title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Shrestha Gupta",     post: "Executive Member", pokemon: "Piplup",         pokemonImage: POKEMON_SPRITES(393),   memberImage: "/members/second/shrestha.png",           title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Biyanka Sharma",     post: "Executive Member", pokemon: "Butterfree",     pokemonImage: POKEMON_SPRITES(12),    memberImage: "/members/second/biyanka.png",            title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Ridhima Guleria",    post: "Executive Member", pokemon: "Ralts",          pokemonImage: POKEMON_SPRITES(280),   memberImage: "/members/second/ridhima.png",            title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Prabhav Batra",      post: "Executive Member", pokemon: "Larvitar",       pokemonImage: POKEMON_SPRITES(246),   memberImage: "/members/second/prabhav.png",            title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Arpit Phogat",       post: "Executive Member", pokemon: "Snorlax",        pokemonImage: POKEMON_SPRITES(143),   memberImage: "/members/second/arpit.png",              title: ALCHEMICAL_TITLE["Executive Member"] },
  { year: 2, category: "Executive", name: "Ankit Patel",        post: "Executive Member", pokemon: "Totodile",       pokemonImage: POKEMON_SPRITES(158),   memberImage: "/members/second/ankit.png",              title: ALCHEMICAL_TITLE["Executive Member"] },

  // ── Volunteers (year 1) — matches /members/first/ exactly ──
  { year: 1, category: "Volunteer", name: "Aarush Ajay",      post: "Volunteer", pokemon: "Togepi",     pokemonImage: POKEMON_SPRITES(175), memberImage: "/members/first/aarush.png",       title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Akshat Rajput",    post: "Volunteer", pokemon: "Treecko",    pokemonImage: POKEMON_SPRITES(252), memberImage: "/members/first/akshat.png",       title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Akshita",          post: "Volunteer", pokemon: "Celebi",     pokemonImage: POKEMON_SPRITES(251), memberImage: "/members/first/akshita.png",      title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Ananya Sharma",    post: "Volunteer", pokemon: "Marill",     pokemonImage: POKEMON_SPRITES(183), memberImage: "/members/first/ananya.png",       title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Anika Khosla",     post: "Volunteer", pokemon: "Skitty",     pokemonImage: POKEMON_SPRITES(300), memberImage: "/members/first/anika.png",        title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Anuj Kumawat",     post: "Volunteer", pokemon: "Torchic",    pokemonImage: POKEMON_SPRITES(255), memberImage: "/members/first/anuj.png",         title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Arnav Kaushik",    post: "Volunteer", pokemon: "Cyndaquil",  pokemonImage: POKEMON_SPRITES(155), memberImage: "/members/first/arnav.png",        title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Garima Pathania",  post: "Volunteer", pokemon: "Chikorita",  pokemonImage: POKEMON_SPRITES(152), memberImage: "/members/first/garima.png",       title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Insha",            post: "Volunteer", pokemon: "Ralts",      pokemonImage: POKEMON_SPRITES(280), memberImage: "/members/first/insha.png",        title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Kishan",           post: "Volunteer", pokemon: "Bulbasaur",  pokemonImage: POKEMON_SPRITES(1),   memberImage: "/members/first/kishan.png",       title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Nandini",          post: "Volunteer", pokemon: "Jigglypuff", pokemonImage: POKEMON_SPRITES(39),  memberImage: "/members/first/nandini.png",      title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Nitin",            post: "Volunteer", pokemon: "Squirtle",   pokemonImage: POKEMON_SPRITES(7),   memberImage: "/members/first/nitin.png",        title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Pragya",           post: "Volunteer", pokemon: "Vulpix",     pokemonImage: POKEMON_SPRITES(37),  memberImage: "/members/first/pragya.png",       title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Rakshit",          post: "Volunteer", pokemon: "Charmander", pokemonImage: POKEMON_SPRITES(4),   memberImage: "/members/first/rakshit.png",      title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Riya",             post: "Volunteer", pokemon: "Pikachu",    pokemonImage: POKEMON_SPRITES(25),  memberImage: "/members/first/riya.png",         title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Samit",            post: "Volunteer", pokemon: "Eevee",      pokemonImage: POKEMON_SPRITES(133), memberImage: "/members/first/samit.png",        title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Sandali",          post: "Volunteer", pokemon: "Mew",        pokemonImage: POKEMON_SPRITES(151), memberImage: "/members/first/sandali.png",      title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Saurabh",          post: "Volunteer", pokemon: "Gengar",     pokemonImage: POKEMON_SPRITES(94),  memberImage: "/members/first/saurabh.png",      title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Shreyan",          post: "Volunteer", pokemon: "Lucario",    pokemonImage: POKEMON_SPRITES(448), memberImage: "/members/first/shreyan.png",      title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Siddharth",        post: "Volunteer", pokemon: "Greninja",   pokemonImage: POKEMON_SPRITES(658), memberImage: "/members/first/siddharth.png",    title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Sushant",          post: "Volunteer", pokemon: "Mimikyu",    pokemonImage: POKEMON_SPRITES(778), memberImage: "/members/first/sushant.png",      title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Vaishnavi",        post: "Volunteer", pokemon: "Snorlax",    pokemonImage: POKEMON_SPRITES(143), memberImage: "/members/first/vaishnavi.png",    title: ALCHEMICAL_TITLE["Volunteer"] },
  { year: 1, category: "Volunteer", name: "Vishal Dadwal",    post: "Volunteer", pokemon: "Dragonite",  pokemonImage: POKEMON_SPRITES(149), memberImage: "/members/first/vishaldadwal.png", title: ALCHEMICAL_TITLE["Volunteer"] },
];

const YEAR_TABS = [
  { label: "Final Year",   value: 4 },
  { label: "Coordinators", value: 3 },
  { label: "Executive",    value: 2 },
  { label: "Volunteers",   value: 1 },
];

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function MemberCard({ member, index, flipped, onFlip }: { member: Member; index: number; flipped: boolean; onFlip: () => void }) {
  const offsetX = (seededRand(index * 7)  - 0.5) * 32;
  const offsetY = (seededRand(index * 11) - 0.5) * 16;

  return (
    <div
      className="member-card-wrap"
      style={{ transform: `translateX(${offsetX}px) translateY(${offsetY}px)`, display: "inline-block" }}
      onMouseEnter={onFlip}
      onMouseLeave={onFlip}
    >
      <div className={`member-card-inner ${flipped ? "flipped" : ""}`}>
        {/* FRONT */}
        <div className="member-card-front">
          <div className="member-img-wrap">
            <Image src={member.memberImage} alt={member.name} width={160} height={200}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            <div className="member-img-overlay" />
          </div>
          <div className="member-card-label">
            <p className="member-name">{member.name}</p>
            <p className="member-post">{member.post}</p>
          </div>
          <span className="corner tl" /><span className="corner tr" />
          <span className="corner bl" /><span className="corner br" />
        </div>

        {/* BACK */}
        <div className="member-card-back">
          <div className="card-back-glow" />
          <div className="pokemon-wrap">
            <Image src={member.pokemonImage} alt={member.pokemon} width={110} height={110}
              style={{ width: 110, height: 110, objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(231,186,128,0.6))" }} />
          </div>
          <p className="back-title">{member.title}</p>
          <p className="back-name">{member.name}</p>
          <div className="back-divider" />
          <p className="back-pokemon">Familiar: {member.pokemon}</p>
          <span className="corner tl" /><span className="corner tr" />
          <span className="corner bl" /><span className="corner br" />
        </div>
      </div>
    </div>
  );
}

export default function MembersPage() {
  const [activeYear,    setActiveYear]    = useState(4);
  const [flippedIndex,  setFlippedIndex]  = useState<number | null>(null);
  const [mouse,         setMouse]         = useState({ x: -999, y: -999 });
  const pageRef = useRef<HTMLDivElement>(null);

  const filtered = ALL_MEMBERS.filter(m => m.year === activeYear);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".member-card-wrap")) setFlippedIndex(null);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  useEffect(() => { setFlippedIndex(null); }, [activeYear]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        * { cursor: none !important; }

        .members-page { min-height:100vh; width:100%; background:#080501; padding:80px 80px 120px; box-sizing:border-box; position:relative; overflow-x:hidden; }

        .fire-cursor { position:fixed; pointer-events:none; z-index:9999; transition:none; }
        .fire-glow { width:150px; height:150px; border-radius:50%; background:radial-gradient(circle,rgba(255,140,0,0.18) 0%,rgba(255,80,0,0.10) 30%,rgba(180,60,0,0.05) 60%,transparent 85%); filter:blur(8px); animation:fire-flicker 0.8s ease-in-out infinite alternate; transform:translate(-50%,-50%); position:absolute; top:0; left:0; }
        .fire-core { position:absolute; top:0; left:0; width:10px; height:14px; background:radial-gradient(ellipse,#fff8e1 0%,#ffb300 40%,transparent 80%); border-radius:50% 50% 30% 30%; filter:blur(2px); animation:fire-flicker 0.4s ease-in-out infinite alternate; }
        @keyframes fire-flicker { 0%{opacity:0.85;transform:translate(-50%,-60%) scaleX(0.95) scaleY(1)} 100%{opacity:1;transform:translate(-50%,-65%) scaleX(1.05) scaleY(1.08)} }

        .page-header { text-align:center; margin-bottom:3.5rem; position:relative; z-index:10; }
        .page-title { font-family:'Barlow Condensed',sans-serif; font-size:clamp(3rem,6vw,5rem); font-weight:800; letter-spacing:0.06em; text-transform:uppercase; color:#E7BA80; margin:0; line-height:1; text-shadow:0 0 40px rgba(231,186,128,0.2); }
        .page-rule { width:80px; height:1px; background:linear-gradient(to right,transparent,#b47c3c,transparent); margin:1rem auto 0; }

        .year-tabs { display:flex; justify-content:center; gap:0; margin-bottom:3rem; position:relative; z-index:10; border:1px solid rgba(180,124,60,0.2); border-radius:3px; width:fit-content; margin-left:auto; margin-right:auto; overflow:hidden; }
        .year-tab { padding:0.6rem 1.75rem; font-family:'Barlow Condensed',sans-serif; font-size:0.85rem; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(231,186,128,0.45); background:transparent; border:none; border-right:1px solid rgba(180,124,60,0.2); cursor:pointer !important; transition:color 0.25s,background 0.25s; }
        .year-tab:last-child { border-right:none; }
        .year-tab.active { color:#0a0703; background:#b47c3c; }
        .year-tab:not(.active):hover { color:#E7BA80; background:rgba(180,124,60,0.08); }

        .members-scroll { position:relative; z-index:10; display:flex; flex-wrap:wrap; gap:1.5rem 2rem; justify-content:center; align-items:flex-start; padding:2rem 4rem; }

        .member-card-wrap { cursor:pointer !important; flex-shrink:0; perspective:1000px; }
        .member-card-inner { width:160px; height:230px; position:relative; transform-style:preserve-3d; transition:transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .member-card-inner.flipped { transform:rotateY(180deg); }
        .member-card-front, .member-card-back { position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; border-radius:6px; overflow:hidden; border:1px solid rgba(180,124,60,0.25); background:#0e0b06; transition:border-color 0.3s,box-shadow 0.3s; }
        .member-card-wrap:hover .member-card-front, .member-card-wrap:hover .member-card-back { border-color:rgba(231,186,128,0.7); box-shadow:0 0 20px rgba(255,120,0,0.25),0 0 40px rgba(255,80,0,0.12),inset 0 0 20px rgba(231,186,128,0.04); }
        .member-card-back { transform:rotateY(180deg); }

        .member-img-wrap { width:100%; height:170px; position:relative; overflow:hidden; }
        .member-img-overlay { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,#0e0b06 100%); }
        .member-card-label { padding:0.4rem 0.6rem 0.5rem; }
        .member-name { font-family:'Barlow Condensed',sans-serif; font-size:0.95rem; font-weight:700; letter-spacing:0.06em; color:#f0e8d6; margin:0; text-transform:uppercase; line-height:1.1; }
        .member-post { font-family:'DM Sans',sans-serif; font-size:0.65rem; color:rgba(231,186,128,0.55); margin:2px 0 0; letter-spacing:0.04em; }

        .card-back-glow { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 30%,rgba(180,124,60,0.12) 0%,transparent 70%); pointer-events:none; }
        .pokemon-wrap { display:flex; justify-content:center; padding-top:1rem; }
        .back-title { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:0.75rem; color:#b47c3c; text-align:center; margin:0.5rem 0 0; letter-spacing:0.06em; padding:0 0.5rem; }
        .back-name { font-family:'Barlow Condensed',sans-serif; font-size:1rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#f0e8d6; text-align:center; margin:0.25rem 0 0; }
        .back-divider { width:40px; height:1px; background:linear-gradient(to right,transparent,rgba(180,124,60,0.5),transparent); margin:0.5rem auto; }
        .back-pokemon { font-family:'DM Sans',sans-serif; font-size:0.65rem; color:rgba(231,186,128,0.5); text-align:center; margin:0; letter-spacing:0.06em; }

        .corner { position:absolute; width:8px; height:8px; pointer-events:none; }
        .corner.tl { top:4px;    left:4px;   border-top:1px solid rgba(180,124,60,0.6); border-left:1px solid rgba(180,124,60,0.6); }
        .corner.tr { top:4px;    right:4px;  border-top:1px solid rgba(180,124,60,0.6); border-right:1px solid rgba(180,124,60,0.6); }
        .corner.bl { bottom:4px; left:4px;   border-bottom:1px solid rgba(180,124,60,0.6); border-left:1px solid rgba(180,124,60,0.6); }
        .corner.br { bottom:4px; right:4px;  border-bottom:1px solid rgba(180,124,60,0.6); border-right:1px solid rgba(180,124,60,0.6); }

        @keyframes drift { 0%{transform:translateY(0) translateX(0);opacity:0} 10%{opacity:1} 90%{opacity:0.6} 100%{transform:translateY(-80px) translateX(12px);opacity:0} }
        .ember { position:fixed; width:3px; height:3px; border-radius:50%; background:#ffb300; pointer-events:none; z-index:9998; animation:drift linear infinite; }

        .section-label { text-align:center; font-family:'Barlow Condensed',sans-serif; font-size:0.7rem; font-weight:600; letter-spacing:0.35em; text-transform:uppercase; color:rgba(180,124,60,0.3); margin-bottom:1rem; position:relative; z-index:10; }

        @media (max-width:768px) { .members-page{padding:80px 16px 100px} .members-scroll{padding:1rem 0.5rem;gap:1rem} .year-tab{padding:0.5rem 1rem;font-size:0.75rem} }
      `}</style>

      <div className="fire-cursor" style={{ left: `${mouse.x}px`, top: `${mouse.y}px` }}>
        <div className="fire-glow" />
        <div className="fire-core" />
      </div>

      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="ember" style={{
          left: `${10 + ((i * 9) % 85)}%`,
          bottom: `${(i * 13) % 60}%`,
          animationDuration: `${3 + (i % 4)}s`,
          animationDelay: `${(i * 0.7) % 4}s`,
          opacity: 0,
          width:  i % 3 === 0 ? 2 : 3,
          height: i % 3 === 0 ? 2 : 3,
          background: i % 2 === 0 ? "#ffb300" : "#ff6600",
        }} />
      ))}

      <div className="members-page" ref={pageRef}>
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(100,50,0,0.3) 0%,transparent 70%)" }} />

        <div className="page-header">
          <h1 className="page-title">The Alchemists</h1>
          <div className="page-rule" />
        </div>

        <div className="year-tabs">
          {YEAR_TABS.map(tab => (
            <button key={tab.value} className={`year-tab ${activeYear === tab.value ? "active" : ""}`} onClick={() => setActiveYear(tab.value)}>
              {tab.label}
            </button>
          ))}
        </div>

        <p className="section-label">Click any card to reveal their alchemical identity</p>

        <div className="members-scroll">
          {filtered.map((member, i) => (
            <MemberCard
              key={`${member.name}-${activeYear}`}
              member={member}
              index={i}
              flipped={flippedIndex === i}
              onFlip={() => setFlippedIndex(flippedIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}