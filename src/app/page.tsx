"use client";

import { useState, useCallback } from "react";
import Preloader from "@/components/Home/Preloader";
import HeroSection from "@/components/Home/HeroSection";
import AboutPage from "@/app/about/page";
import Timeline from "@/app/timeline/page";
import SponsorsPage from "@/app/sponsors/page";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <main className="w-full min-h-screen relative">
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <HeroSection />
      <div id="about">
        <AboutPage />
      </div>
      <div id="sponsors">
        <SponsorsPage />
      </div>
    </main>
  );
}
