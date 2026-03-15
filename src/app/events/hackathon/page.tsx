import EventPage from "../../../components/Events/Events";
import type { EventData } from "../../../components/Events/shared";
 
const data: EventData = {
  name:      "Hackathon",
  tagline:   "Build the impossible in 24 hours",
  branch:    "Computer Science Engineering",
  tag:       "Technical",
  date:      "Feb 14–15",
  venue:     "CS Lab Block, Main Campus",
  teamSize:  "2 – 4",
  prizePool: "₹50,000",
  accentColor: "rgba(60,120,180,0.12)",
  image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
  description:
    "Prodyogiki Hackathon is a 24-hour coding marathon where teams of 2–4 engineers tackle real-world problems across domains like AI/ML, web development, embedded systems, and sustainable tech. Starting with a problem statement reveal at midnight, teams have exactly one day to ideate, build, and present a working prototype to a panel of industry judges. No sleep, no limits — just raw engineering instinct and coffee.",
 
  rounds: [
    {
      title: "Problem Statement Reveal",
      desc: "Teams receive their domain-specific problem statements at the opening ceremony. One hour of ideation before keyboards start flying.",
    },
    {
      title: "Build Phase (24 hrs)",
      desc: "The core marathon. Teams build their prototype with access to hardware kits, cloud credits, and mentors from industry. Progress check-ins at the 8-hour and 16-hour marks.",
    },
    {
      title: "Prototype Presentation",
      desc: "Each team gets 8 minutes to demo their working product to judges, followed by a 5-minute Q&A. Judging criteria: innovation, feasibility, technical depth, and presentation.",
    },
    {
      title: "Grand Finale & Awards",
      desc: "Top 3 teams present on the main stage. Prizes, certificates, and recruitment fast-tracks from sponsoring companies announced.",
    },
  ],
 
  rules: [
    "Teams must consist of 2 to 4 members. Solo entries are not accepted.",
    "All code must be written during the hackathon window. Pre-built templates are allowed but must be disclosed.",
    "Open-source libraries and public APIs are permitted. Plagiarism results in immediate disqualification.",
    "Each team will be assigned a workstation. Participants may bring their own laptops.",
    "Mentors may only provide guidance — they cannot write code for any team.",
    "Submissions must be pushed to the provided GitHub repository before the deadline. Late submissions will not be evaluated.",
    "The decision of the judging panel is final and binding.",
  ],
 
  faqs: [
    { q: "Can participants from different branches register together?", a: "Yes, cross-branch teams are encouraged as long as at least one member is from CSE or related IT streams." },
    { q: "Is there a registration fee?", a: "There is a nominal fee of ₹200 per team, covering meals and hardware access during the event." },
    { q: "Will accommodation be provided?", a: "Yes, on-campus accommodation is available for outstation participants on request during registration." },
    { q: "What hardware will be available?", a: "Arduino kits, Raspberry Pi boards, basic sensors and actuators, soldering stations, and 3D printers will be available at the hardware desk." },
    { q: "What happens if our project doesn't work perfectly?", a: "Judges value innovation and the problem-solving approach equally. A partially working prototype with strong documentation can still score well." },
  ],
};
 
export default function HackathonPage() {
  return <EventPage event={data}/>;
}