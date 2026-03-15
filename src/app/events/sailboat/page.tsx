import EventPage from "../../../components/Events/Events";
import type { EventData } from "../../../components/Events/shared";

const data: EventData = {
  name:      "Sailboat",
  tagline:   "Engineer the wind. Race the tide.",
  branch:    "Mechanical Engineering with Engineering Physics",
  tag:       "Design & Build",
  date:      "Feb 17",
  venue:     "Campus Lake, Sports Complex",
  teamSize:  "3 – 4",
  prizePool: "₹30,000",
  accentColor: "rgba(40,100,180,0.13)",
  image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?w=1200&q=80",
  description:
    "Sailboat is a model boat design and racing competition where teams engineer a wind-powered vessel from scratch using provided raw materials. The challenge fuses fluid mechanics, thermodynamics, and materials science — teams must design a hull that minimises drag, a sail that maximises wind capture, and a ballast system that keeps their vessel upright. Boats are tested on the campus lake in elimination heats before a final championship race.",

  rounds: [
    {
      title: "Design Submission",
      desc: "Teams submit a 1-page technical design document with hull dimensions, sail geometry, and material justification. Evaluated by faculty before construction begins.",
    },
    {
      title: "Build Phase",
      desc: "6-hour construction window using provided materials: balsa wood, PVC sheet, cotton fabric, wire, and adhesives. No pre-fabricated parts allowed.",
    },
    {
      title: "Qualification Heats",
      desc: "All boats race a 25-metre course on the lake. Top 8 fastest vessels advance to the semi-finals. If a boat sinks, the team is eliminated.",
    },
    {
      title: "Championship Race",
      desc: "Top 4 boats race a triangular 60-metre course with one tack required. Fastest time to complete two laps wins.",
    },
  ],

  rules: [
    "Boat hull must not exceed 60 cm in length or 25 cm in beam (width).",
    "Only materials provided at the build station may be used. External components are not permitted.",
    "No motors, batteries, or propulsion systems other than wind are allowed.",
    "The sail must be attached to the hull and manually set before launch — no adjustments during the race.",
    "Boats must float and complete the course unassisted. A team member may retrieve a sunk boat but it is disqualified from that heat.",
    "Teams must clean their build area after construction. Failure results in a 30-second time penalty.",
    "The race referee's decision on fouls and disqualifications is final.",
  ],

  faqs: [
    { q: "Do we need to know how to sail?", a: "No. The boats are unmanned model vessels. You need to engineer them — not sail them." },
    { q: "Can we design our boat before the event?", a: "You may sketch designs beforehand, but construction must happen only during the 6-hour build window on event day." },
    { q: "What if the wind is too low on race day?", a: "A backup fan-assisted wind channel is set up for the qualification heats if natural wind is insufficient." },
    { q: "Is the design document graded separately?", a: "Yes, the design document contributes 20% of the total score. A poor design can be offset by strong racing performance." },
    { q: "Can teams from non-ME branches register?", a: "Yes. EP students and students from any branch may register, but at least one member must be from Mechanical or Engineering Physics." },
  ],
};

export default function SailboatPage() {
  return <EventPage event={data}/>;
}