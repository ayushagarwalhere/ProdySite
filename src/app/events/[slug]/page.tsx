"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Oswald, Open_Sans } from "next/font/google";
import { useRouter, useParams } from "next/navigation";
import { events } from "@/constants/events";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400"] });

export default function EventSlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const currentEventIndex = useMemo(() => {
    return events.findIndex((e) => e.slug === slug);
  }, [slug]);

  const currentEvent =
    currentEventIndex !== -1 ? events[currentEventIndex] : null;

  const [activeSliderIndex, setActiveSliderIndex] = useState<number>(-1);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const otherEvents = useMemo(() => {
    if (currentEventIndex === -1) return events;
    return events.filter((_, index) => index !== currentEventIndex);
  }, [currentEventIndex]);

  const handleCarouselClick = (indexInOther: number) => {
    if (activeSliderIndex === indexInOther) {
      const clickedEvent = otherEvents[indexInOther];
      router.push(`/events/${clickedEvent.slug}`);
      setActiveSliderIndex(-1);
    } else {
      setActiveSliderIndex(indexInOther);
    }
  };

  const handleClose = () => {
    setActiveSliderIndex(-1);
  };

  if (!currentEvent) {
    return (
      <div
        className="w-screen h-screen relative overflow-hidden bg-black flex font-sans text-white p-[100px]"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        Event not found ({slug})
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen relative overflow-hidden bg-black flex font-sans"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.85] z-[1]"
        style={{ backgroundImage: `url('${currentEvent.bg}')` }}
      />

      <div className="relative z-[2] w-full h-full flex justify-between py-32 px-24">
        <div className="flex flex-col justify-center -mt-[10%] pl-8">
          <h1
            className={`${oswald.className} text-[8rem] leading-[0.85] tracking-[2px] uppercase mb-10`}
          >
            {currentEvent.titleLines.map((line, index) => (
              <span
                key={index}
                className={
                  index === 2 ? "text-[#dfba8c]" : "text-white"
                }
              >
                {line}
                <br />
              </span>
            ))}
          </h1>
        </div>

        <div className="flex flex-col justify-center w-[45%] max-w-[600px] pr-8 -mt-[5%]">
          <div className="flex flex-col gap-6">
            <h2
              className="font-[Akira_Expanded] text-4xl font-black text-[#E7BA7F] leading-tight w-[465px] h-[82px] m-0 flex items-center"
              style={{ WebkitTextStroke: "1px black" }}
            >
              {currentEvent.name.toUpperCase()}
              <br />
              LEVEL
            </h2>
            <p
              className={`${openSans.className} text-xl leading-[23px] text-white w-[467px] h-[137px] m-0 font-normal`}
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}
            >
              {currentEvent.description}
            </p>
            <div className="flex gap-7 mt-4">
              <button
                type="button"
                className={`${openSans.className} w-[154px] h-[43px] bg-[#E7BA7F] text-black border-none text-xl font-normal cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#d6ab6f]`}
              >
                REGISTER
              </button>
              <button
                type="button"
                className={`${openSans.className} w-[163px] h-[43px] bg-transparent text-[#E7BA7F] border border-[#E7BA7F] text-xl font-normal cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#E7BA7F]/10`}
              >
                ABSTRACT
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[643px] h-[214px] z-[5] p-0 overflow-visible">
        {activeSliderIndex !== -1 && (
          <button
            type="button"
            className="absolute -top-6 right-6 w-11 h-11 bg-[#dfba8c] text-[#2b1b11] border-none rounded-full cursor-pointer z-10 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-110 hover:bg-[#ceaa7d]"
            onClick={handleClose}
            aria-label="Close details"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px]"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
        <div className="bg-[rgba(43,27,17,0.95)] backdrop-blur-[40px] rounded-tl-[48px] py-6 px-8 pt-4 pb-4 flex flex-col h-full w-full justify-between shadow-[-10px_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-500">
          <div className="w-full flex justify-between items-center mb-3">
            <h2 className={`${oswald.className} text-[0.9rem] text-white uppercase tracking-[1.2px] opacity-80`}>
              EXPLORE OTHER EVENTS
            </h2>
          </div>

          <div className="w-full overflow-hidden group">
            <div
              className="overflow-x-auto overflow-y-hidden pb-2.5 w-max [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              ref={wrapRef}
            >
              <div
                className="flex gap-6 items-start justify-start pb-2.5 w-max animate-[scroll_60s_linear_infinite]"
                ref={trackRef}
              >
                {[...otherEvents, ...otherEvents].map((event, index) => (
                  <div
                    key={`${event.id}-${index}`}
                    data-active={activeSliderIndex === index ? "true" : undefined}
                    className="group relative flex-[0_0_100px] h-[154px] rounded-xl overflow-hidden cursor-pointer transition-[flex-basis_0.6s_cubic-bezier(0.2,0.8,0.2,1),transform_0.4s] bg-[#1a110a] data-[active=true]:flex-[0_0_550px] data-[active=true]:scale-[1.01] data-[active=true]:shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
                    onClick={() => handleCarouselClick(index)}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="absolute inset-0 w-full h-full object-cover brightness-50 transition-[filter_0.3s]"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-2 z-[2] transition-all duration-400 group-data-[active=true]:flex-row group-data-[active=true]:items-center group-data-[active=true]:p-4 group-data-[active=true]:gap-6 group-data-[active=true]:justify-start">
                      <h3 className="text-white font-bold text-[0.8rem] [writing-mode:vertical-rl] rotate-180 uppercase font-[Oswald] tracking-[1px] whitespace-nowrap group-data-[active=true]:[writing-mode:horizontal-tb] group-data-[active=true]:rotate-0 group-data-[active=true]:text-[1.2rem] group-data-[active=true]:min-w-fit">
                        {event.name}
                      </h3>
                      <img
                        src={event.image}
                        alt=""
                        className="hidden opacity-0 transition-opacity duration-400 w-[272px] h-[154px] object-cover rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-data-[active=true]:block group-data-[active=true]:opacity-100"
                      />
                      <div className="hidden opacity-0 flex flex-col gap-2.5 transition-opacity duration-400 group-data-[active=true]:!flex group-data-[active=true]:opacity-100">
                        <p className="text-[#ddd] text-[0.75rem] leading-[1.4] max-w-[180px] font-light">
                          {event.description.substring(0, 100)}...
                        </p>
                        <button
                          type="button"
                          className="hidden opacity-0 py-2 px-3 border-none rounded bg-[#dfba8c] text-[#2b1b11] text-[0.7rem] font-extrabold cursor-pointer w-fit uppercase transition-all duration-300 group-data-[active=true]:!block group-data-[active=true]:opacity-100"
                        >
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 justify-center py-1">
            {otherEvents.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  activeSliderIndex === index
                    ? "bg-[#dfba8c] scale-[1.3]"
                    : "bg-white/15"
                }`}
                onClick={() => setActiveSliderIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setActiveSliderIndex(index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
