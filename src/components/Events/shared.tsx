// ─── Shared types & constants for all event pages ───────────────────────────

export const GOLD      = "#b47c3c";
export const GOLD_DIM  = "rgba(180,124,60,0.16)";
export const GOLD_MID  = "rgba(180,124,60,0.32)";
export const TEXT_WARM = "#f0e8d6";
export const TEXT_DIM  = "rgba(220,200,170,0.45)";
export const BG        = "#0a0703";

export interface EventData {
  name:        string;
  tagline:     string;
  branch:      string;
  tag:         string;
  date:        string;
  venue:       string;
  teamSize:    string;
  prizePool:   string;
  image:       string;
  accentColor: string;
  description: string;
  rounds: { title: string; desc: string }[];
  rules:  string[];
  faqs:   { q: string; a: string }[];
}