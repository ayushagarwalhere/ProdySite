"use client";

import EventsCarousel from "../../components/custom/Carousel";
import ProfileCard from "../../components/custom/ProfileCard";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-[30vw_1fr] min-h-screen bg-[#d7ad75] p-10 gap-10 relative max-lg:flex max-lg:flex-col max-lg:p-8 max-md:p-5 max-md:gap-5">
      {/* Left column: sidebar (vertical nav) */}
      <div className="relative">
        <div className="absolute left-5 bottom-10 [writing-mode:vertical-rl] rotate-180 flex gap-[30px] text-lg font-bold text-[#5B1F11] max-lg:static max-lg:[writing-mode:horizontal-tb] max-lg:rotate-0 max-lg:flex-row max-lg:justify-center max-lg:mb-5">
          <Link href="/" className="hover:text-red-700 transition-colors">
            HOME
          </Link>
          <Link href="/events" className="hover:text-red-700 transition-colors">
            EVENTS
          </Link>
          <Link href="/about" className="hover:text-red-700 transition-colors">
            ABOUT
          </Link>
          <Link href="/contact" className="hover:text-red-700 transition-colors">
            CONTACT
          </Link>
        </div>
      </div>

      {/* Right section: profile card, title, carousel, stats */}
      <div className="flex-1 min-w-[300px] flex flex-col">
        {/* Profile card */}
        <div className="flex justify-center items-start w-full">
          <ProfileCard />
        </div>

        {/* Title */}
        <h1 className="font-[Accia_Moderato] text-[90px] leading-none text-[#5B1F11] max-lg:text-[60px] max-md:text-[40px]">
          PROFILE
        </h1>

        {/* Events carousel - swiper slides centered */}
        <div className="w-full [&_.swiper-slide]:flex [&_.swiper-slide]:justify-center">
          <EventsCarousel />
        </div>

        {/* Stats row */}
        <div className="flex gap-5 mt-5 max-md:flex-col">
          <div className="bg-[#6c8bb8] p-5 rounded-[18px] w-[150px] max-md:w-full max-md:max-w-[220px]">
            <p>Prody Points:</p>
            <h2 className="text-5xl">230</h2>
          </div>
          <div className="flex flex-row gap-5 max-md:flex-col">
            <div className="w-[200px] h-[120px] bg-[#7a1d10] rounded-[20px] shrink-0 max-md:w-full max-md:max-w-[320px]" />
            <div className="w-[200px] h-[120px] bg-[#343c6a] rounded-[20px] shrink-0 max-md:w-full max-md:max-w-[320px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
