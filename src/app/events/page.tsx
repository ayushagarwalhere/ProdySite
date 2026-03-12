"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Oswald } from "next/font/google";
import { VscHome, VscCalendar, VscAccount, VscSignIn } from "react-icons/vsc";

import Dock from "@/components/Global/Dock";
import TiltedCard from "@/components/Events/TiltedCard";
import { events } from "@/constants/events";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });

export default function EventsListingPage() {
  const router = useRouter();
  const [activeEventId, setActiveEventId] = useState<string>(events[0]?.id);

  const activeEvent = events.find((e) => e.id === activeEventId) ?? events[0];

  const dockItems = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => router.push("/") },
    { icon: <VscCalendar size={18} />, label: "Events", onClick: () => router.push("/events") },
    { icon: <VscAccount size={18} />, label: "Members", onClick: () => router.push("/members") },
    { icon: <VscSignIn size={18} />, label: "Login / Signup", onClick: () => router.push("/login") },
  ];

  return (
    <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#05010c] via-black to-black" />
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#E7BA80]/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#E7BA80]/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex h-full min-h-screen flex-col px-6 pb-10 pt-6 md:px-10 md:pt-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs uppercase tracking-[0.35em] text-[#E7BA80]/70">
              Events
            </p>
            <h1
              className={`${oswald.className} text-3xl font-semibold tracking-wide text-white md:text-4xl`}
            >
              Discover Our Lineup
            </h1>
            <p className="mt-1 max-w-md text-xs text-zinc-400 md:text-sm">
              Choose from six signature events. Tap a card to preview the
              experience on the right, then open the full event page when
              you are ready.
            </p>
          </div>

          <div className="hidden md:block">
            <Dock items={dockItems} panelHeight={64} baseItemSize={46} magnification={70} />
          </div>
        </div>

        <div className="mt-8 flex flex-1 flex-col gap-10 md:mt-12 md:flex-row">
          <section className="md:w-1/2 lg:w-3/5">
            <div className="max-h-[480px] space-y-6 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700/60">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="relative"
                  onClick={() => setActiveEventId(event.id)}
                >
                  <TiltedCard
                    imageSrc={event.image}
                    altText={event.name}
                    captionText={event.name}
                    containerHeight="220px"
                    containerWidth="100%"
                    imageHeight="220px"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.04}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={
                      <div className="flex flex-col gap-1 text-left">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-200/80">
                          {event.slug.replace(/-/g, " ")}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {event.name}
                        </p>
                      </div>
                    }
                  />

                  {activeEventId === event.id && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-[#E7BA80]/80" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="md:w-1/2 lg:w-2/5">
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#E7BA80]/80">
                Selected Event
              </p>
              <h2
                className={`${oswald.className} mt-2 text-2xl font-semibold leading-tight text-white md:text-3xl`}
              >
                {activeEvent?.name}
              </h2>
              <p className="mt-2 text-xs text-zinc-400 md:text-sm">
                Scroll to explore the details of this event. Open the full
                page to see the rich hero layout you have already designed.
              </p>

              <div className="mt-4 flex-1 overflow-y-auto pr-1 text-sm leading-relaxed text-zinc-200">
                <p>{activeEvent?.description}</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  onClick={() => router.push(activeEvent.route)}
                  className="rounded-full bg-[#E7BA80] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#f0c894]"
                >
                  Open Event Page
                </button>
                <button
                  onClick={() => router.push("/events/sailboat")}
                  className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-100 transition hover:border-[#E7BA80]/80 hover:text-[#E7BA80]"
                >
                  View Any Event
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

