"use client";

import EventsCarousel from "../../components/custom/Carousel";
import ProfileCard from "../../components/custom/ProfileCard";
import styles from "./page.module.css";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8" style={{ backgroundColor: "#E7BA7F", }} >

      <div className="h-[6vh] md:h-6"></div>

      <div className="flex flex-col md:flex-row w-full">

        <div className="w-full md:w-[6%]">
          <div
            className={`${styles.sidebar} absolute left-2 sm:left-5 md:left-6 lg:left-8 bottom-2 sm:bottom-5 md:bottom-10 lg:bottom-12 text-base md:text-lg lg:text-xl gap-4 sm:gap-6 md:gap-8 `}
          >
            <Link href="/" className="hover:text-red-700 transition-colors">HOME</Link>
            <Link href="/events" className="hover:text-red-700 transition-colors">EVENTS</Link>
            <Link href="/about" className="hover:text-red-700 transition-colors">ABOUT</Link>
            <Link href="/contact" className="hover:text-red-700 transition-colors">CONTACT</Link>
          </div>
        </div>

        <div className="w-full md:w-[50%]">
          {/* Profile Card */}
          <div className="flex justify-center items-start p-4 md:p-6 lg:p-8">
            <ProfileCard />
          </div>
        </div>

        <div className="w-full md:w-[60%]">
          {/* Right Section */}
          <div className={`${styles.rightSection} flex flex-col `}>
            <h1 className={styles.title}>PROFILE</h1>

            {/* Events Carousel */}
            <div className={styles.projects}>
              <EventsCarousel />
            </div>

            {/* Stats */}
            <div className={`${styles.stats} flex flex-col md:flex-row md:items-center gap-4`}>
              <div className={styles.points}>
                <p>Prody Points:</p>
                <h2>230</h2>
              </div>

              <div className={`${styles.boxes} flex gap-4`}>
                <div className={styles.redBox}></div>
                <div className={styles.blueBox}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="h-[6vh] md:h-6"></div>

    </div>
  );
}
