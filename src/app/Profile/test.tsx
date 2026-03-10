export default function Test() {
  return (
    <div className="continer">
      <div className="row"></div>//for upper  margin 
      <div className="row">
        <div className="col"></div>//nearly 6% of wh
        <div className="col"></div>//nearly 45
        <div className="col"></div>//rest
      </div>
      <div className="row"></div>//for lower margin
    </div>
  );
}





import EventsCarousel from "../components/Carousel";
import ProfileCard from "../components/ProfileCard";
import styles from "./profile.module.css";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div
      className={`${styles.wrapper} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[220px_400px_1fr] gap-6`}
    >
      {/* Sidebar */}
<div
  className={`${styles.sidebar} absolute left-2 sm:left-5 md:left-6 lg:left-8 bottom-2 sm:bottom-5 md:bottom-10 lg:bottom-12 text-base md:text-lg lg:text-xl gap-4 sm:gap-6 md:gap-8`}
>
  <Link href="/" className="hover:text-red-700 transition-colors">HOME</Link>
  <Link href="/events" className="hover:text-red-700 transition-colors">EVENTS</Link>
  <Link href="/about" className="hover:text-red-700 transition-colors">ABOUT US</Link>
  <Link href="/contact" className="hover:text-red-700 transition-colors">CONTACT</Link>
</div>

      {/* Profile Card */}
      <div className="flex justify-center items-start p-4 md:p-6 lg:p-8">
        <ProfileCard />
      </div>

      {/* Right Section */}
      <div className={`${styles.rightSection} p-4 md:p-6 lg:p-10 flex flex-col gap-6`}>
        <h1 className={styles.title}>PROFILE</h1>

        {/* Events Carousel */}
        <div className={styles.projects}>
          <EventsCarousel />
        </div>

        {/* Stats */}
        <div className={`${styles.stats} flex flex-col md:flex-row md:items-center gap-6`}>
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
  );
}