import EventPage from "../../../components/Events/Events";
import type { EventData } from "../../../components/Events/shared";

const data: EventData = {
  name:      "Auction",
  tagline:   "Value is what you negotiate",
  branch:    "Management & Commerce",
  tag:       "Business Simulation",
  date:      "Feb 17",
  venue:     "Main Auditorium, Admin Block",
  teamSize:  "3 – 5",
  prizePool: "₹35,000",
  accentColor: "rgba(180,60,60,0.11)",
  image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
  description:
    "The Prodyogiki Auction is a high-stakes business simulation where teams act as competing corporations bidding for real-world assets — patents, supply chain contracts, talent portfolios, and technology licenses. Each team starts with a fixed budget and must allocate capital across multiple auction rounds, negotiate side deals with rival teams, and present their final portfolio valuation to a panel of finance and strategy judges. The best deal-makers walk away with the prize — and bragging rights.",

  rounds: [
    {
      title: "Market Briefing",
      desc: "Teams receive their starting budget, a market intelligence dossier, and a list of 20 auctionable assets with base valuations. 30 minutes to strategise before bidding opens.",
    },
    {
      title: "Open Auction",
      desc: "Three rapid-fire bidding rounds across asset categories: Technology, Human Capital, and Infrastructure. Teams bid simultaneously using sealed bids and open floor bids alternately.",
    },
    {
      title: "Negotiation Window",
      desc: "A 20-minute open floor where teams may trade, sell, or swap acquired assets with each other. Verbal contracts are binding. A notary (event coordinator) must witness all trades.",
    },
    {
      title: "Portfolio Presentation",
      desc: "Each team presents their final asset portfolio in 5 minutes, justifying acquisition decisions and projecting 3-year ROI. Judges score on financial reasoning and strategic coherence.",
    },
  ],

  rules: [
    "Teams must stay within their allocated starting budget. Overspending results in immediate asset forfeiture.",
    "Sealed bids must be submitted in writing on the provided bid cards. No verbal bids are accepted in sealed rounds.",
    "During the open floor, verbal bids must be loud enough for the auctioneer to confirm.",
    "Side trades during the negotiation window must be witnessed by a coordinator to be valid.",
    "Teams may not collude to fix prices or artificially suppress bids. Collusion results in disqualification.",
    "Portfolio presentations must be delivered without slides. Only a one-page handout is permitted.",
    "The auctioneer's decision during bidding disputes is final.",
  ],

  faqs: [
    { q: "Do we need a business or finance background?", a: "No formal background is required. The event is designed to be engaging for all engineering students with an interest in business strategy." },
    { q: "How is the winner decided?", a: "Final portfolio value (50%) + presentation score (30%) + efficiency score based on budget spent vs value acquired (20%)." },
    { q: "Can a single student register alone?", a: "No. The minimum team size is 3. Solo registrations will not be processed." },
    { q: "What currency is used in the simulation?", a: "A fictional currency called ProdyCoins (PC) is used. Each team starts with 10,000 PC." },
    { q: "Are there any assets that cannot be resold?", a: "Yes. Human Capital assets (talent portfolios) are non-transferable once acquired. All other asset types may be traded." },
  ],
};

export default function AuctionPage() {
  return <EventPage event={data}/>;
}