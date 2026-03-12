"use client";

import AutoScrollCarousel from '@/components/Members/AutoScrollCarousel';
import PillNav from '@/components/Members/PillNav';
import GooeyNav from '@/components/Members/GooeyNav';
import { Open_Sans } from 'next/font/google';
import { useState, useMemo } from 'react';

const openSans = Open_Sans({ subsets: ['latin'] });

type Member = {
  name: string;
  post: string;
  pokemon: string;
  pokemonImage: string;
  memberImage: string;
  category: string;
  year: number;
};

const POKEMON_SPRITES = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const MEMBER_PHOTO = (seed: string) =>
  `https://picsum.photos/seed/${seed}/400/600`;

const ALL_MEMBERS: Member[] = [
  // ── Final Year ─────────────────────────────────────────────────
  { year: 4, category: 'Final Year', name: 'Sourabh Awasthi', post: 'President', pokemon: 'Charizard', pokemonImage: POKEMON_SPRITES(6), memberImage: '/members/final/sourabh.png' },
  { year: 4, category: 'Final Year', name: 'Gugli Thakur', post: 'Vice President', pokemon: 'Gardevoir', pokemonImage: POKEMON_SPRITES(282), memberImage: '/members/final/gugli.png' },
  { year: 4, category: 'Final Year', name: 'Mehul Ambastha', post: 'Vice President', pokemon: 'Alakazam', pokemonImage: POKEMON_SPRITES(65), memberImage: '/members/final/mehul.png' },
  { year: 4, category: 'Final Year', name: 'Sakshi Gothwal', post: 'Secretary', pokemon: 'Espeon', pokemonImage: POKEMON_SPRITES(196), memberImage: '/members/final/sakshi.png' },
  { year: 4, category: 'Final Year', name: 'Ankur Yadav', post: 'Joint Secretary', pokemon: 'Umbreon', pokemonImage: POKEMON_SPRITES(197), memberImage: '/members/final/ankur.png' },
  { year: 4, category: 'Final Year', name: 'Anshuman Payasi', post: 'Design Head', pokemon: 'Jolteon', pokemonImage: POKEMON_SPRITES(135), memberImage: '/members/final/anshuman.png' },
  { year: 4, category: 'Final Year', name: 'Abhimanyu Singh', post: 'Technical Head', pokemon: 'Metagross', pokemonImage: POKEMON_SPRITES(376), memberImage: '/members/final/abhimanyu.png' },
  { year: 4, category: 'Final Year', name: 'Ayan Chordia', post: 'Finance Head', pokemon: 'Snorlax', pokemonImage: POKEMON_SPRITES(143), memberImage: '/members/final/ayan.png' },
  { year: 4, category: 'Final Year', name: 'Ayushi', post: 'PR Head', pokemon: 'Ninetales', pokemonImage: POKEMON_SPRITES(38), memberImage: '/members/final/ayushi.png' },
  { year: 4, category: 'Final Year', name: 'Anurag', post: 'Media & Marketing Head', pokemon: 'Lucario', pokemonImage: POKEMON_SPRITES(448), memberImage: '/members/final/anuragtrip.png' },
  { year: 4, category: 'Final Year', name: 'Aditya Sharma', post: 'Joint Design Head', pokemon: 'Sylveon', pokemonImage: POKEMON_SPRITES(700), memberImage: '/members/final/aditya.png' },
  { year: 4, category: 'Final Year', name: 'Tanashvi', post: 'Joint Technical Head', pokemon: 'Togekiss', pokemonImage: POKEMON_SPRITES(468), memberImage: '/members/final/tanashvi.png' },
  { year: 4, category: 'Final Year', name: 'Laksh Bhandari', post: 'Joint Media & Marketing Head', pokemon: 'Dragonite', pokemonImage: POKEMON_SPRITES(149), memberImage: MEMBER_PHOTO('laksh') },
  { year: 4, category: 'Final Year', name: 'Oshin Sharma', post: 'Joint PR Head', pokemon: 'Vaporeon', pokemonImage: POKEMON_SPRITES(134), memberImage: '/members/final/oshin.png' },
  { year: 4, category: 'Final Year', name: 'Rishika Sharma', post: 'Creative Head', pokemon: 'Leafeon', pokemonImage: POKEMON_SPRITES(470), memberImage: '/members/final/rishika.png' },

  // ── Coordinators ───────────────────────────────────────────────
  { year: 3, category: 'Coordinator', name: 'Arihant Dogra', post: 'Secretary', pokemon: 'Gengar', pokemonImage: POKEMON_SPRITES(94), memberImage: '/members/third/arihant.png' },
  { year: 3, category: 'Coordinator', name: 'Akshit Saini', post: 'Convener (Event)', pokemon: 'Machamp', pokemonImage: POKEMON_SPRITES(68), memberImage: '/members/third/akshitsaini.png' },
  { year: 3, category: 'Coordinator', name: 'Saksham Kashyap', post: 'Convener (Creative)', pokemon: 'Flareon', pokemonImage: POKEMON_SPRITES(136), memberImage: '/members/third/kashyapsaksham.png' },
  { year: 3, category: 'Coordinator', name: 'Yash Sisodia', post: 'Finance Head', pokemon: 'Raichu', pokemonImage: POKEMON_SPRITES(26), memberImage: '/members/third/yashsisodia.webp' },
  { year: 3, category: 'Coordinator', name: 'Abhishek Sharma', post: 'Joint Finance Head', pokemon: 'Slowbro', pokemonImage: POKEMON_SPRITES(80), memberImage: '/members/third/abhishek.png' },
  { year: 3, category: 'Coordinator', name: 'Mannat Katna', post: 'Design Head', pokemon: 'Clefable', pokemonImage: POKEMON_SPRITES(36), memberImage: '/members/third/mannat.png' },
  { year: 3, category: 'Coordinator', name: 'Sonal Dogra', post: 'PR Head', pokemon: 'Jigglypuff', pokemonImage: POKEMON_SPRITES(39), memberImage: '/members/third/sonal.png' },
  { year: 3, category: 'Coordinator', name: 'Amit Singh Bathyal', post: 'Joint PR Head', pokemon: 'Scizor', pokemonImage: POKEMON_SPRITES(212), memberImage: '/members/third/amitsingh.png' },
  { year: 3, category: 'Coordinator', name: 'Akshit Pathania', post: 'Technical Head', pokemon: 'Magnezone', pokemonImage: POKEMON_SPRITES(462), memberImage: '/members/third/akshitpathania.png' },
  { year: 3, category: 'Coordinator', name: 'Ayush Arora', post: 'Joint Technical Head', pokemon: 'Electivire', pokemonImage: POKEMON_SPRITES(466), memberImage: '/members/third/ayusharora.png' },
  { year: 3, category: 'Coordinator', name: 'Kanishk Singh', post: 'Media & Marketing Head', pokemon: 'Absol', pokemonImage: POKEMON_SPRITES(359), memberImage: '/members/third/kanishk.png' },
  { year: 3, category: 'Coordinator', name: 'Siya Sood', post: 'Creative Head', pokemon: 'Roserade', pokemonImage: POKEMON_SPRITES(407), memberImage: '/members/third/siyasood.png' },
  { year: 3, category: 'Coordinator', name: 'Naman Srivastava', post: 'Operations/Logistics Head', pokemon: 'Heracross', pokemonImage: POKEMON_SPRITES(214), memberImage: '/members/third/namansrivastava.png' },
  { year: 3, category: 'Coordinator', name: 'Ashutosh', post: 'Joint Media & Marketing Head', pokemon: 'Haunter', pokemonImage: POKEMON_SPRITES(93), memberImage: '/members/third/ashutosh.png' },

  // ── Executive Members ──────────────────────────────────────────
  { year: 2, category: 'Executive', name: 'Sanskar Srivastava', post: 'Executive Member', pokemon: 'Pikachu', pokemonImage: POKEMON_SPRITES(25), memberImage: '/members/second/sanskar.png' },
  { year: 2, category: 'Executive', name: 'Ayush Agarwal', post: 'Executive Member', pokemon: 'Bulbasaur', pokemonImage: POKEMON_SPRITES(1), memberImage: '/members/second/ayushagarwal.png' },
  { year: 2, category: 'Executive', name: 'Sitanshu Nayan', post: 'Executive Member', pokemon: 'Squirtle', pokemonImage: POKEMON_SPRITES(7), memberImage: '/members/second/sitanshu.png' },
  { year: 2, category: 'Executive', name: 'Saksham Shandilya', post: 'Executive Member', pokemon: 'Charmander', pokemonImage: POKEMON_SPRITES(4), memberImage: '/members/second/sakshamshandiliya.png' },
  { year: 2, category: 'Executive', name: 'Priyanshi Joshi', post: 'Executive Member', pokemon: 'Eevee', pokemonImage: POKEMON_SPRITES(133), memberImage: '/members/second/priyanshi.png' },
  { year: 2, category: 'Executive', name: 'Anurag Singh', post: 'Executive Member', pokemon: 'Snivy', pokemonImage: POKEMON_SPRITES(495), memberImage: '/members/second/anurag.png' },
  { year: 2, category: 'Executive', name: 'Shrestha Gupta', post: 'Executive Member', pokemon: 'Piplup', pokemonImage: POKEMON_SPRITES(393), memberImage: '/members/second/shrestha.png' },
  { year: 2, category: 'Executive', name: 'Biyanka Sharma', post: 'Executive Member', pokemon: 'Vulpix', pokemonImage: POKEMON_SPRITES(37), memberImage: '/members/second/biyanka.png' },
  { year: 2, category: 'Executive', name: 'Ridhima Guleria', post: 'Executive Member', pokemon: 'Ralts', pokemonImage: POKEMON_SPRITES(280), memberImage: '/members/second/ridhima.png' },
  { year: 2, category: 'Executive', name: 'Prabhav Batra', post: 'Executive Member', pokemon: 'Larvitar', pokemonImage: POKEMON_SPRITES(246), memberImage: '/members/second/prabhav.png' },
  { year: 2, category: 'Executive', name: 'Arpit Phogat', post: 'Executive Member', pokemon: 'Beldum', pokemonImage: POKEMON_SPRITES(374), memberImage: '/members/second/arpit.png' },
  { year: 2, category: 'Executive', name: 'Ankit Patel', post: 'Executive Member', pokemon: 'Totodile', pokemonImage: POKEMON_SPRITES(158), memberImage: '/members/second/ankit.png' },

  // ── Volunteers ─────────────────────────────────────────────────
  { year: 1, category: 'Volunteer', name: 'Aadvay Sood', post: 'Volunteer', pokemon: 'Pichu', pokemonImage: POKEMON_SPRITES(172), memberImage: MEMBER_PHOTO('aadvay') },
  { year: 1, category: 'Volunteer', name: 'Aarush Ajay', post: 'Volunteer', pokemon: 'Togepi', pokemonImage: POKEMON_SPRITES(175), memberImage: '/members/first/aarush.png' },
  { year: 1, category: 'Volunteer', name: 'Adarsh Pareek', post: 'Volunteer', pokemon: 'Mudkip', pokemonImage: POKEMON_SPRITES(258), memberImage: MEMBER_PHOTO('adarsh') },
  { year: 1, category: 'Volunteer', name: 'Akshat Rajput', post: 'Volunteer', pokemon: 'Treecko', pokemonImage: POKEMON_SPRITES(252), memberImage: '/members/first/akshat.png' },
  { year: 1, category: 'Volunteer', name: 'Akshita', post: 'Volunteer', pokemon: 'Celebi', pokemonImage: POKEMON_SPRITES(251), memberImage: '/members/first/akshita.png' },
  { year: 1, category: 'Volunteer', name: 'Ananya Sharma', post: 'Volunteer', pokemon: 'Marill', pokemonImage: POKEMON_SPRITES(183), memberImage: '/members/first/ananya.png' },
  { year: 1, category: 'Volunteer', name: 'Anika Khosla', post: 'Volunteer', pokemon: 'Skitty', pokemonImage: POKEMON_SPRITES(300), memberImage: '/members/first/anika.png' },
  { year: 1, category: 'Volunteer', name: 'Anuj Kumawat', post: 'Volunteer', pokemon: 'Torchic', pokemonImage: POKEMON_SPRITES(255), memberImage: '/members/first/anuj.png' },
  { year: 1, category: 'Volunteer', name: 'Arnav Kaushik', post: 'Volunteer', pokemon: 'Cyndaquil', pokemonImage: POKEMON_SPRITES(155), memberImage: '/members/first/arnav.png' },
  { year: 1, category: 'Volunteer', name: 'Garima Pathania', post: 'Volunteer', pokemon: 'Chikorita', pokemonImage: POKEMON_SPRITES(152), memberImage: '/members/first/garima.png' },
  { year: 1, category: 'Volunteer', name: 'Insha Anjum', post: 'Volunteer', pokemon: 'Cleffa', pokemonImage: POKEMON_SPRITES(173), memberImage: '/members/first/insha.png' },
  { year: 1, category: 'Volunteer', name: 'Kishan Kesari', post: 'Volunteer', pokemon: 'Elekid', pokemonImage: POKEMON_SPRITES(239), memberImage: '/members/first/kishan.png' },
  { year: 1, category: 'Volunteer', name: 'Nandini Sharma', post: 'Volunteer', pokemon: 'Snubbull', pokemonImage: POKEMON_SPRITES(209), memberImage: '/members/first/nandini.png' },
  { year: 1, category: 'Volunteer', name: 'Nitin Thakur', post: 'Volunteer', pokemon: 'Larvitar', pokemonImage: POKEMON_SPRITES(246), memberImage: '/members/first/nitin.png' },
  { year: 1, category: 'Volunteer', name: 'Pragya Verma', post: 'Volunteer', pokemon: 'Misdreavus', pokemonImage: POKEMON_SPRITES(200), memberImage: '/members/first/pragya.png' },
  { year: 1, category: 'Volunteer', name: 'Rakshit Sharma', post: 'Volunteer', pokemon: 'Magby', pokemonImage: POKEMON_SPRITES(240), memberImage: '/members/first/rakshit.png' },
  { year: 1, category: 'Volunteer', name: 'Riya Sharma', post: 'Volunteer', pokemon: 'Igglybuff', pokemonImage: POKEMON_SPRITES(174), memberImage: '/members/first/riya.png' },
  { year: 1, category: 'Volunteer', name: 'Samit Mehria', post: 'Volunteer', pokemon: 'Teddiursa', pokemonImage: POKEMON_SPRITES(216), memberImage: '/members/first/samit.png' },
  { year: 1, category: 'Volunteer', name: 'Sandali Kala', post: 'Volunteer', pokemon: 'Wooper', pokemonImage: POKEMON_SPRITES(194), memberImage: '/members/first/sandali.png' },
  { year: 1, category: 'Volunteer', name: 'Saurabh', post: 'Volunteer', pokemon: 'Totodile', pokemonImage: POKEMON_SPRITES(158), memberImage: '/members/first/saurabh.png' },
  { year: 1, category: 'Volunteer', name: 'Shreyan Koundal', post: 'Volunteer', pokemon: 'Houndour', pokemonImage: POKEMON_SPRITES(228), memberImage: '/members/first/shreyan.png' },
  { year: 1, category: 'Volunteer', name: 'Siddharth Umajwal', post: 'Volunteer', pokemon: 'Tyrogue', pokemonImage: POKEMON_SPRITES(236), memberImage: '/members/first/siddharth.png' },
  { year: 1, category: 'Volunteer', name: 'Sushant Vashisht', post: 'Volunteer', pokemon: 'Smoochum', pokemonImage: POKEMON_SPRITES(238), memberImage: '/members/first/sushant.png' },
  { year: 1, category: 'Volunteer', name: 'Vaishnavi Tomer', post: 'Volunteer', pokemon: 'Miltank', pokemonImage: POKEMON_SPRITES(241), memberImage: '/members/first/vaishnavi.png' },
  { year: 1, category: 'Volunteer', name: 'Vishal Dadwal', post: 'Volunteer', pokemon: 'Heracross', pokemonImage: POKEMON_SPRITES(214), memberImage: '/members/first/vishaldadwal.png' },
];

const YEAR_OPTIONS = [
  { label: 'Final Year', href: '#', value: 4 },
  { label: 'Coordinators', href: '#', value: 3 },
  { label: 'Executive Members', href: '#', value: 2 },
  { label: 'Volunteers', href: '#', value: 1 },
];

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Team', href: '/members' },
  { label: 'Contact', href: '/contact' },
];

export default function MembersPage() {
  const [activeYear, setActiveYear] = useState<number>(4);

  const filteredMembers = useMemo(
    () => ALL_MEMBERS.filter(m => m.year === activeYear),
    [activeYear]
  );

  const categoryLabel = YEAR_OPTIONS.find(o => o.value === activeYear)?.label ?? '';

  return (
    <main
      className={`h-screen bg-black text-white ${openSans.className} flex flex-col overflow-hidden`}
    >
      {/* ── Navbar ── */}
      <div className="flex-shrink-0 flex justify-center px-8 py-5 z-50 bg-black/80 backdrop-blur-sm">
        <PillNav
          logo=""
          logoAlt=""
          items={NAV_ITEMS}
          activeHref="/members"
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
          initialLoadAnimation={true}
        />
      </div>

      {/* ── Category Label — absolute, centred, top-20 ── */}
      <div style={{
        position: "absolute",
        top: "5rem",
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: 20,
        pointerEvents: "none",
      }}>
        <p style={{
          margin: 0,
          fontSize: "11px",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(231,186,128,0.55)",
          fontFamily: "'Cinzel', serif",
        }}>
          Organizing Committee
        </p>
        <h1 style={{
          margin: "6px 0 0",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "#E7BA80",
          fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
        }}>
          {categoryLabel}
        </h1>
      </div>

      {/* ── Auto‑scrolling cards ── */}
      <div
        style={{
          position: "absolute",
          top: "10rem",
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          overflow: "hidden",
          minHeight: "320px",
        }}
      >
        <AutoScrollCarousel members={filteredMembers} speed={75} />
      </div>

      {/* ── GooeyNav filter ── */}
      <div style={{ position: "absolute", bottom: "3.75rem", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <GooeyNav
          items={YEAR_OPTIONS}
          onActiveIndexChange={index => setActiveYear(YEAR_OPTIONS[index].value)}
          initialActiveIndex={0}
        />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&display=swap');
        body { background: black; margin: 0; padding: 0; overflow: hidden; }
      `}</style>
    </main>
  );
}
