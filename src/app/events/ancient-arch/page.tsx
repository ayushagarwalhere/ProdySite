import EventPage from "../../../components/Events/Events";
import type { EventData } from "../../../components/Events/shared";

const data: EventData = {
  name:      "Ancient Arch",
  tagline:   "Build structures that outlast empires",
  branch:    "Civil Engineering & Architecture",
  tag:       "Structural Design",
  date:      "Feb 15",
  venue:     "Civil Structures Lab, Block A",
  teamSize:  "2 – 4",
  prizePool: "₹20,000",
  accentColor: "rgba(180,140,60,0.13)",
  image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
  description:
    "Ancient Arch draws inspiration from the great structural achievements of antiquity — Roman aqueducts, Egyptian pylons, Persian arches — to challenge modern engineers. Teams are given a bag of dry spaghetti, marshmallows, wooden skewers, and string, and tasked with constructing the tallest load-bearing arch structure possible. The structure must span a 30 cm gap and survive a progressive load test. Creativity in structural form and elegance in architectural detailing are both judged.",

  rounds: [
    {
      title: "Ideation & Sketching",
      desc: "Teams have 30 minutes to sketch their structural concept and label key load paths. Sketches are reviewed by a structural engineering faculty member.",
    },
    {
      title: "Build Phase",
      desc: "90-minute construction window using only the provided materials. Teams may not use any tools except scissors and hands.",
    },
    {
      title: "Load Test",
      desc: "Completed structures are placed over the 30 cm gap and loaded progressively with 100 g weights. Scoring is based on maximum load carried relative to the structure's own weight.",
    },
    {
      title: "Architecture Critique",
      desc: "A two-minute verbal presentation to judges on design intent, historical precedent, and structural rationale. Architecture students judged additionally on aesthetic proportion.",
    },
  ],

  rules: [
    "Only provided materials may be used: spaghetti, marshmallows, wooden skewers, and string.",
    "The structure must span a clear 30 cm gap between two supports.",
    "Structures are measured for height from the base to the topmost point.",
    "No adhesives, tapes, or additional binding agents are permitted.",
    "Teams may not touch or stabilise their structure during the load test.",
    "Structures that collapse before loading begins score zero on the load test but retain their ideation and critique scores.",
    "The load test referee's measurements are final.",
  ],

  faqs: [
    { q: "Is this only for civil or architecture students?", a: "No. Any engineering student may participate. However, teams are encouraged to include at least one civil or architecture student." },
    { q: "How is the overall winner determined?", a: "Scoring: Load test (50%), Ideation sketch (20%), Architecture critique (30%). The team with the highest combined score wins." },
    { q: "Can we practice beforehand?", a: "Yes, practice runs with similar materials are encouraged. The exact gap width and judging criteria are published in advance." },
    { q: "What counts as a collapse?", a: "If the structure touches the table surface between the supports, or tilts more than 30 degrees from vertical, it is considered collapsed." },
    { q: "Are there prizes for aesthetic design separately?", a: "The top architecture-judged structure receives a special commendation award alongside the main prize pool." },
  ],
};

export default function AncientArchPage() {
  return <EventPage event={data}/>;
}