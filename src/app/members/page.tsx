"use client";

import AutoScrollCarousel from '@/components/Members/AutoScrollCarousel';
import GooeyNav from '@/components/Members/GooeyNav';
import { Open_Sans } from 'next/font/google';
import { useState, useMemo, useEffect, useRef } from 'react';

const openSans = Open_Sans({ subsets: ['latin'] });

/* ─────────────────────────────────────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────────────────────────────
   Egyptian Background — SVG sub-components (defined outside main component
   so they are stable references and never re-created on render)
───────────────────────────────────────────────────────────────────────────── */

function HieroglyphStrip({ offset = 0 }: { offset?: number }) {
  return (
    <>
      {/* Eye of Horus */}
      <g transform="translate(4,0)">
        <ellipse cx="14" cy="8" rx="10" ry="6" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="8" r="2.5" fill="#E7BA80" />
        <path d="M4 11 Q8 16 14 14 Q20 16 24 11" stroke="#E7BA80" strokeWidth="1" fill="none" />
        <path d="M14 14 L12 20" stroke="#E7BA80" strokeWidth="1" />
        <path d="M14 14 L16 20" stroke="#E7BA80" strokeWidth="1" />
      </g>
      {/* Ankh */}
      <g transform="translate(8,35)">
        <ellipse cx="10" cy="6" rx="5" ry="4" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <line x1="10" y1="10" x2="10" y2="26" stroke="#E7BA80" strokeWidth="1.2" />
        <line x1="4" y1="16" x2="16" y2="16" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      {/* Djed pillar */}
      <g transform="translate(6,70)">
        <rect x="6" y="0" width="12" height="2" fill="#E7BA80" rx="1" />
        <rect x="5" y="4" width="14" height="2" fill="#E7BA80" rx="1" />
        <rect x="4" y="8" width="16" height="2" fill="#E7BA80" rx="1" />
        <rect x="3" y="12" width="18" height="2" fill="#E7BA80" rx="1" />
        <rect x="5" y="16" width="14" height="8" fill="none" stroke="#E7BA80" strokeWidth="1" />
      </g>
      {/* Was scepter */}
      <g transform="translate(10,105)">
        <line x1="9" y1="0" x2="9" y2="28" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M4 4 Q9 0 14 4" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <path d="M7 28 L4 34 M11 28 L14 34" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      {/* Bird (ibis) */}
      <g transform="translate(4,148)">
        <path d="M5 12 Q8 6 14 8 Q20 8 22 5 Q16 3 12 5 Q8 2 5 5 Z" fill="#E7BA80" />
        <circle cx="21" cy="5" r="1.5" fill="#E7BA80" />
        <path d="M5 12 Q4 16 6 20 Q8 18 10 14" fill="#E7BA80" />
      </g>
      {/* Sun disk */}
      <g transform="translate(6,182)">
        <circle cx="12" cy="12" r="7" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="12" cy="12" r="3" fill="#E7BA80" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <line
            key={i}
            x1={12 + 8 * Math.cos((a * Math.PI) / 180)}
            y1={12 + 8 * Math.sin((a * Math.PI) / 180)}
            x2={12 + 11 * Math.cos((a * Math.PI) / 180)}
            y2={12 + 11 * Math.sin((a * Math.PI) / 180)}
            stroke="#E7BA80" strokeWidth="1"
          />
        ))}
      </g>
      {/* Feather of Ma'at */}
      <g transform="translate(9,215)">
        <path d="M10 30 L10 0 Q20 8 16 18 Q12 24 10 30 Z" fill="none" stroke="#E7BA80" strokeWidth="1.2" />
        <line x1="10" y1="30" x2="10" y2="36" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M6 8 Q10 6 14 8" stroke="#E7BA80" strokeWidth="2" fill="none" />
        <path d="M7 14 Q10 12 14 14" stroke="#E7BA80" strokeWidth="2" fill="none" />
      </g>
      {/* Snake / Uraeus */}
      <g transform="translate(5,260)">
        <path d="M14 0 Q20 4 18 10 Q16 16 10 16 Q4 16 4 10 Q4 4 10 4 Q14 4 14 8 Q14 12 10 12" stroke="#E7BA80" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M10 12 L10 28" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      {/* Lotus */}
      <g transform="translate(4,300)">
        <path d="M14 24 Q14 12 14 8" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M14 8 Q10 0 6 4 Q8 10 14 12" fill="#E7BA80" opacity="0.7" />
        <path d="M14 8 Q18 0 22 4 Q20 10 14 12" fill="#E7BA80" opacity="0.7" />
        <path d="M14 10 Q12 3 14 0 Q16 3 14 10" fill="#E7BA80" />
        <line x1="8" y1="24" x2="20" y2="24" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      {/* Cartouche */}
      <g transform="translate(4,340)">
        <rect x="2" y="0" width="24" height="36" rx="12" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <line x1="2" y1="38" x2="26" y2="38" stroke="#E7BA80" strokeWidth="1.2" />
        <line x1="2" y1="41" x2="26" y2="41" stroke="#E7BA80" strokeWidth="1" />
        <circle cx="14" cy="9" r="3" stroke="#E7BA80" strokeWidth="0.8" fill="none" />
        <line x1="10" y1="16" x2="18" y2="16" stroke="#E7BA80" strokeWidth="0.8" />
        <path d="M10 22 L14 19 L18 22" stroke="#E7BA80" strokeWidth="0.8" fill="none" />
        <rect x="10" y="27" width="8" height="4" stroke="#E7BA80" strokeWidth="0.8" fill="none" />
      </g>
      {/* Repeat Eye */}
      <g transform={`translate(4,${390 + offset})`}>
        <ellipse cx="14" cy="8" rx="10" ry="6" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="8" r="2.5" fill="#E7BA80" />
        <path d="M4 11 Q8 16 14 14 Q20 16 24 11" stroke="#E7BA80" strokeWidth="1" fill="none" />
        <path d="M14 14 L12 20" stroke="#E7BA80" strokeWidth="1" />
        <path d="M14 14 L16 20" stroke="#E7BA80" strokeWidth="1" />
      </g>
      {/* Owl */}
      <g transform="translate(4,430)">
        <path d="M6 24 Q4 18 6 12 Q8 4 14 4 Q20 4 22 12 Q24 18 22 24 Z" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="11" cy="12" r="2" fill="#E7BA80" />
        <circle cx="17" cy="12" r="2" fill="#E7BA80" />
        <path d="M12 16 Q14 18 16 16" stroke="#E7BA80" strokeWidth="1" fill="none" />
        <path d="M6 6 L3 2 M22 6 L25 2" stroke="#E7BA80" strokeWidth="1" />
      </g>
      {/* Water */}
      <g transform="translate(4,468)">
        {[0, 6, 12, 18].map((y, i) => (
          <path key={i} d={`M2 ${y} Q7 ${y - 3} 12 ${y} Q17 ${y + 3} 22 ${y}`} stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        ))}
      </g>
      {/* Pyramid */}
      <g transform="translate(2,500)">
        <path d="M14 2 L28 28 L0 28 Z" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <line x1="14" y1="10" x2="22" y2="28" stroke="#E7BA80" strokeWidth="0.6" opacity="0.5" />
        <line x1="14" y1="10" x2="6" y2="28" stroke="#E7BA80" strokeWidth="0.6" opacity="0.5" />
      </g>
      {/* Shen ring */}
      <g transform="translate(6,545)">
        <circle cx="12" cy="10" r="8" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <line x1="4" y1="18" x2="20" y2="18" stroke="#E7BA80" strokeWidth="1.2" />
        <line x1="4" y1="22" x2="20" y2="22" stroke="#E7BA80" strokeWidth="1" />
      </g>
      {/* Horns */}
      <g transform="translate(4,580)">
        <path d="M4 20 Q2 8 10 4 Q8 12 14 14 Q20 12 18 4 Q26 8 24 20" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="24" r="4" stroke="#E7BA80" strokeWidth="1.2" fill="none" />
      </g>
      {/* Crook */}
      <g transform="translate(10,620)">
        <path d="M9 0 Q4 0 4 6 Q4 12 9 12 L9 34" stroke="#E7BA80" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
      {/* Falcon */}
      <g transform="translate(4,668)">
        <path d="M14 4 Q20 6 22 14 Q18 12 14 14 Q10 12 6 14 Q8 6 14 4 Z" fill="#E7BA80" />
        <circle cx="20" cy="8" r="1.5" fill="#E7BA80" />
        <path d="M14 14 Q12 20 10 26" stroke="#E7BA80" strokeWidth="1" />
        <path d="M14 14 Q16 20 18 26" stroke="#E7BA80" strokeWidth="1" />
        <path d="M14 14 L14 28" stroke="#E7BA80" strokeWidth="1.2" />
      </g>
      {/* Reed */}
      <g transform="translate(10,712)">
        <line x1="9" y1="36" x2="9" y2="4" stroke="#E7BA80" strokeWidth="1.2" />
        <path d="M9 4 Q4 0 6 8 Z" fill="#E7BA80" />
        <path d="M9 12 Q5 10 7 16 Z" fill="#E7BA80" opacity="0.7" />
        <path d="M9 20 Q5 18 7 24 Z" fill="#E7BA80" opacity="0.5" />
      </g>
      {/* Divider */}
      <g transform="translate(0,760)">
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
      <line x1="0" y1="30" x2="10000" y2="30" stroke="#E7BA80" strokeWidth="0.8" />
      <line x1="0" y1="34" x2="10000" y2="34" stroke="#E7BA80" strokeWidth="0.4" />
      {Array.from({ length: 120 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 80 + 8}, 0)`}>
          <path d="M20 28 L20 16 Q16 8 12 10 Q10 16 20 18" fill="#E7BA80" opacity="0.6" />
          <path d="M20 28 L20 16 Q24 8 28 10 Q30 16 20 18" fill="#E7BA80" opacity="0.6" />
          <path d="M20 28 L20 12 Q19 6 20 4 Q21 6 20 12" fill="#E7BA80" opacity="0.8" />
          <path d="M2 28 L8 20 L2 12" stroke="#E7BA80" strokeWidth="0.8" fill="none" opacity="0.5" />
          <path d="M38 28 L32 20 L38 12" stroke="#E7BA80" strokeWidth="0.8" fill="none" opacity="0.5" />
          <circle cx="2" cy="6" r="1" fill="#E7BA80" opacity="0.4" />
          <circle cx="38" cy="6" r="1" fill="#E7BA80" opacity="0.4" />
        </g>
      ))}
    </>
  );
}

function EyeOfRa() {
  return (
    <g style={{ animation: 'eg-pulse 6s ease-in-out infinite' }}>
      <circle cx="100" cy="100" r="90" stroke="#E7BA80" strokeWidth="0.5" fill="none" opacity="0.3" />
      <circle cx="100" cy="100" r="80" stroke="#E7BA80" strokeWidth="0.3" fill="none" opacity="0.2" />
      <path d="M20 100 Q60 50 100 50 Q140 50 180 100 Q140 150 100 150 Q60 150 20 100 Z" stroke="#E7BA80" strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="28" stroke="#E7BA80" strokeWidth="1.5" fill="none" />
      <circle cx="100" cy="100" r="14" fill="#E7BA80" opacity="0.8" />
      <path d="M100 128 L90 160 L100 155 L110 160 Z" fill="#E7BA80" opacity="0.7" />
      <path d="M30 85 Q100 60 170 85" stroke="#E7BA80" strokeWidth="2" fill="none" />
      <path d="M15 100 L2 92 M15 100 L2 108" stroke="#E7BA80" strokeWidth="1.5" />
      <path d="M185 100 L198 92 M185 100 L198 108" stroke="#E7BA80" strokeWidth="1.5" />
    </g>
  );
}

function Scarab() {
  return (
    <g fill="#E7BA80">
      <ellipse cx="40" cy="44" rx="18" ry="24" />
      <ellipse cx="40" cy="20" rx="10" ry="8" />
      <path d="M22 44 Q10 36 8 24 Q14 22 22 32 Z" />
      <path d="M58 44 Q70 36 72 24 Q66 22 58 32 Z" />
      {[-1, 0, 1].map(k => (
        <g key={k}>
          <line x1={30} y1={40 + k * 10} x2={14} y2={36 + k * 10} stroke="#E7BA80" strokeWidth="1.5" />
          <line x1={50} y1={40 + k * 10} x2={66} y2={36 + k * 10} stroke="#E7BA80" strokeWidth="1.5" />
        </g>
      ))}
      <circle cx="40" cy="8" r="5" fill="none" stroke="#E7BA80" strokeWidth="1.5" />
      <circle cx="40" cy="8" r="2" />
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Page Component
───────────────────────────────────────────────────────────────────────────── */

export default function MembersPage() {
  const [activeYear, setActiveYear] = useState<number>(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filteredMembers = useMemo(
    () => ALL_MEMBERS.filter(m => m.year === activeYear),
    [activeYear]
  );

  const categoryLabel = YEAR_OPTIONS.find(o => o.value === activeYear)?.label ?? '';

  /* Floating gold-dust particles */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const PARTICLES = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      PARTICLES.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231,186,128,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <main
      className={`min-h-[calc(100vh-5rem)] w-full text-white ${openSans.className} flex flex-col relative`}
    >
      {/* ════════════════════════════════════════════════════════
          EGYPTIAN BACKGROUND LAYERS
      ════════════════════════════════════════════════════════ */}

      {/* Layer 1 — deep warm base gradient */}
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #1a0e00 0%, #0d0700 55%, #000 100%)',
        }}
      />

      {/* Layer 2 — papyrus noise texture */}
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none',
          opacity: 1,
          mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 3 — subtle amber scan lines */}
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0, zIndex: 2, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(180,120,40,0.03) 3px,rgba(180,120,40,0.03) 4px)',
        }}
      />

      {/* Layer 4 — left hieroglyph column */}
      <div
        aria-hidden
        style={{
          position: 'fixed', left: 0, top: 0, bottom: 0, width: '80px',
          zIndex: 3, pointerEvents: 'none', opacity: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'flex-start', paddingTop: '20px',
        }}
      >
        <div style={{
          position: 'absolute', right: '14px', top: 0, bottom: 0, width: '1px',
          background: 'linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent)',
        }} />
        <svg width="36" viewBox="0 0 36 820" fill="none" xmlns="http://www.w3.org/2000/svg">
          <HieroglyphStrip />
        </svg>
      </div>

      {/* Layer 4b — right hieroglyph column (mirrored) */}
      <div
        aria-hidden
        style={{
          position: 'fixed', right: 0, top: 0, bottom: 0, width: '80px',
          zIndex: 3, pointerEvents: 'none', opacity: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'flex-start', paddingTop: '20px',
          transform: 'scaleX(-1)',
        }}
      >
        <div style={{
          position: 'absolute', right: '14px', top: 0, bottom: 0, width: '1px',
          background: 'linear-gradient(to bottom, transparent, #E7BA80 15%, #E7BA80 85%, transparent)',
        }} />
        <svg width="36" viewBox="0 0 36 820" fill="none" xmlns="http://www.w3.org/2000/svg">
          <HieroglyphStrip offset={14} />
        </svg>
      </div>

      {/* Layer 5 — top decorative lotus border */}
      <div
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '36px',
          zIndex: 4, pointerEvents: 'none', opacity: 1,
        }}
      >
        <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <TopBorder />
        </svg>
      </div>

      {/* Layer 5b — bottom decorative lotus border (flipped) */}
      <div
        aria-hidden
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '36px',
          zIndex: 4, pointerEvents: 'none', opacity: 1, transform: 'scaleY(-1)',
        }}
      >
        <svg width="100%" height="36" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <TopBorder />
        </svg>
      </div>

      {/* Layer 6 — large centred Eye of Ra watermark */}
      {/* <div
        aria-hidden
        style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          zIndex: 2, pointerEvents: 'none', opacity: 0.18,
          width: '520px', height: '520px',
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <EyeOfRa />
        </svg>
      </div> */}

      {/* Layer 7 — scarab top-left */}
      <div
        aria-hidden
        style={{
          position: 'fixed', top: '40px', left: '90px',
          zIndex: 3, pointerEvents: 'none', opacity: 1, width: '80px',
        }}
      >
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><Scarab /></svg>
      </div>

      {/* Layer 7b — scarab top-right (mirrored) */}
      <div
        aria-hidden
        style={{
          position: 'fixed', top: '40px', right: '90px',
          zIndex: 3, pointerEvents: 'none', opacity: 1, width: '80px',
          transform: 'scaleX(-1)',
        }}
      >
        <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><Scarab /></svg>
      </div>

      {/* Layer 8 — floating gold-dust canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}
      />

      {/* Layer 9 — edge vignette */}
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0, zIndex: 6, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* ════════════════════════════════════════════════════════
          PAGE CONTENT
      ════════════════════════════════════════════════════════ */}

      {/* Category heading */}
      <div style={{
        position: 'absolute', top: '5rem', left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 20, pointerEvents: 'none',
      }}>
        <p style={{
          margin: 0, fontSize: '11px', letterSpacing: '0.35em',
          textTransform: 'uppercase', color: 'rgba(231,186,128,0.55)',
          fontFamily: "'Cinzel', serif",
        }}>
          Organizing Committee
        </p>
        <h1 style={{
          margin: '6px 0 0', fontSize: '1.75rem', fontWeight: 700,
          color: '#E7BA80', fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
        }}>
          {categoryLabel}
        </h1>
      </div>

      {/* Auto-scrolling member cards */}
      <div style={{
        position: 'absolute', top: '10rem', left: 0, right: 0,
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        overflow: 'hidden', minHeight: '320px',
      }}>
        <AutoScrollCarousel members={filteredMembers} speed={75} />
      </div>

      {/* GooeyNav year filter */}
      <div style={{
        position: 'absolute', bottom: '3.75rem', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', zIndex: 20,
      }}>
        <GooeyNav
          items={YEAR_OPTIONS}
          onActiveIndexChange={index => setActiveYear(YEAR_OPTIONS[index].value)}
          initialActiveIndex={0}
        />
      </div>

      {/* Keyframe animations + font import */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700&display=swap');

        @keyframes eg-pulse {
          0%, 100% { opacity: 0.05; }
          50%       { opacity: 0.09; }
        }
        @keyframes eg-glow {
          0%, 100% { filter: drop-shadow(0 0 4px #E7BA8044); }
          50%       { filter: drop-shadow(0 0 12px #E7BA8088); }
        }
      `}</style>
    </main>
  );
}
