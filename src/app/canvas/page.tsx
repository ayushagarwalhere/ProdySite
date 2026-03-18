"use client"

import HeroScene from '@/components/HeroScene';

export default function CanvasPage() {
  return (
    <main className="bg-background min-h-screen">
      <HeroScene />
      
      {/* Content section after scroll */}
      <section className="relative z-30 bg-background py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="font-ui text-primary mb-6 tracking-widest">Artifact 001</p>
          <h2 className="font-display text-4xl md:text-6xl font-light italic text-foreground leading-tight mb-8"
            style={{ letterSpacing: '-0.03em' }}>
            Beneath the obsidian surface,<br />
            <span className="text-primary">history breathes.</span>
          </h2>
          <p className="font-display text-lg text-muted-foreground font-light italic leading-relaxed max-w-2xl">
            Move your cursor across the portrait to reveal the hidden layers beneath.
            Each movement generates organic fluid distortions, peeling back
            millennia of darkness to expose the radiant gold beneath.
          </p>
        </div>
      </section>
    </main>
  );
};