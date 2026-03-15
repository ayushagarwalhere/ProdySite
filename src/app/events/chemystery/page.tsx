import EventPage from "../../../components/Events/Events";
import type { EventData } from "../../../components/Events/shared";

const data: EventData = {
  name:      "Chemystery",
  tagline:   "Every reaction tells a story",
  branch:    "Chemical Engineering",
  tag:       "Lab Challenge",
  date:      "Feb 16",
  venue:     "Chemistry Research Lab, Science Block",
  teamSize:  "2 – 3",
  prizePool: "₹20,000",
  accentColor: "rgba(60,180,80,0.11)",
  image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
  description:
    "Chemystery is a multi-stage lab-based competition that blends analytical chemistry, process engineering, and a dash of mystery. Teams are given an unknown compound, a limited reagent kit, and a sequence of clues. Their mission: identify the compound, determine its concentration, and design a safe disposal protocol — all within a race against time. Think detective work in a lab coat. Safety compliance is mandatory and scored.",

  rounds: [
    {
      title: "Unknown Compound Identification",
      desc: "Teams receive a labelled sample of an unknown substance and must identify it using qualitative tests. Full identification with reasoning submitted in 30 minutes.",
    },
    {
      title: "Quantitative Analysis",
      desc: "Using titration and spectroscopy tools provided, teams determine the precise concentration of their sample. Accuracy within ±5% scores full marks.",
    },
    {
      title: "Process Design Challenge",
      desc: "Teams are given a hypothetical industrial scenario and must sketch a scaled process flow diagram with material and energy balance annotations.",
    },
    {
      title: "Safety & Disposal Protocol",
      desc: "Teams present a 3-minute verbal report on the safe handling, storage, and disposal of their identified compound, referencing MSDS guidelines.",
    },
  ],

  rules: [
    "Safety goggles, gloves, and lab coats are mandatory throughout the event. Teams without proper PPE will not be allowed to enter.",
    "Only reagents and equipment provided at the lab station may be used.",
    "No mobile phones inside the lab. Reference books and printed notes are not permitted.",
    "Any spill or unsafe action results in an immediate 10-point deduction and possible disqualification.",
    "Waste must be disposed of in designated containers. Improper disposal results in disqualification.",
    "Teams may request one reagent replenishment if a sample is accidentally contaminated.",
    "All calculations and observations must be recorded in the provided lab book. Verbal answers without documented evidence will not be accepted.",
  ],

  faqs: [
    { q: "Do participants need prior lab experience?", a: "Basic chemistry lab proficiency is expected. The event is designed for second-year chemical engineering students and above." },
    { q: "Will the unknown compounds be hazardous?", a: "All compounds are low-hazard materials commonly found in undergraduate labs. Full MSDS sheets are available on request before the event." },
    { q: "What spectroscopy equipment is available?", a: "UV-Vis spectrophotometer, pH meter, and conductivity meter will be available at each workstation." },
    { q: "Can non-chemical engineering students participate?", a: "Yes, with at least one member from the Chemical Engineering or Applied Chemistry department." },
    { q: "How is the process design challenge scored?", a: "Judges evaluate completeness, accuracy of balance calculations, and clarity of the PFD diagram." },
  ],
};

export default function ChemysteryPage() {
  return <EventPage event={data}/>;
}