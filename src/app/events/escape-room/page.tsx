import EventPage from "../../../components/Events/Events";
import type { EventData } from "../../../components/Events/shared";

const data: EventData = {
  name:      "Escape Room",
  tagline:   "Circuit your way to freedom",
  branch:    "Electronics & Communication",
  tag:       "Problem Solving",
  date:      "Feb 16",
  venue:     "ECE Department, Block D",
  teamSize:  "3 – 5",
  prizePool: "₹25,000",
  accentColor: "rgba(60,180,140,0.11)",
  image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&q=80",
  description:
    "Not your average escape room. The Prodyogiki Escape Room challenges teams to navigate a series of interconnected puzzles built around electronics, signal processing, and circuit theory. Rooms are designed by ECE faculty and alumni — each one themed around a real engineering scenario: a failing power grid, a jammed communication tower, a scrambled microcontroller. Teams race against a 45-minute clock with no hints, only their engineering instincts.",

  rounds: [
    {
      title: "Briefing & Entry",
      desc: "Teams receive a mission dossier and are locked into Room 1. No phones, no external help. One team in the room at a time.",
    },
    {
      title: "The Circuit Labyrinth",
      desc: "Solve breadboard puzzles, decode signal patterns, and restore a broken circuit to unlock the first door. Hands-on components provided.",
    },
    {
      title: "The Signal Maze",
      desc: "Decode frequency-modulated audio clues using an oscilloscope to reveal the combination for the next lock.",
    },
    {
      title: "Final Override",
      desc: "Program a microcontroller with a hidden instruction set to trigger the exit sequence. Fastest team to escape wins.",
    },
  ],

  rules: [
    "Teams of 3 to 5 members. All members must enter the room together at the start.",
    "No mobile phones or external devices inside the room. Smartwatches must be turned face-down.",
    "Participants may not damage any equipment. Teams will be charged for broken components.",
    "Hints are available — each hint costs 2 minutes added to your final time.",
    "If a team cannot escape within 45 minutes, they are scored on the number of puzzles solved.",
    "Rankings are determined by escape time. Ties are broken by fewest hints used.",
    "Event coordinators inside the room may not answer questions about puzzle solutions.",
  ],

  faqs: [
    { q: "Do we need prior electronics knowledge?", a: "Basic circuit theory and familiarity with breadboards will help. Puzzles are designed for second-year ECE and above, though any engineering student can participate." },
    { q: "How many rounds are there in total?", a: "There are 4 sequential puzzle stages. Teams must complete each to proceed. All stages are inside one themed room." },
    { q: "Can we attempt more than once?", a: "No. Each team gets one attempt. Multiple slots are available across the day — register early for a morning slot." },
    { q: "Is prior escape room experience required?", a: "Not at all. The puzzles are engineering-first. If you can read a circuit, you can play." },
    { q: "What if a team member has to leave mid-event?", a: "The team may continue with remaining members. No replacement is permitted once the session starts." },
  ],
};

export default function EscapeRoomPage() {
  return <EventPage event={data}/>;
}