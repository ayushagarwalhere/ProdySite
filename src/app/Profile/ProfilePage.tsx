import EventsCarousel from "../components/Carousel";
import styles from "./profile.module.css";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className={styles.wrapper}>

<div className={styles.sidebar}>
  <Link href="/">HOME</Link>
  <Link href="/events">EVENTS</Link>
  <Link href="/about">ABOUT US</Link>
  <Link href="/contact">CONTACT</Link>
</div>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <p className={styles.profileLabel}>Profile Page</p>

        <div className={styles.circle}>
          <Image
            src="/Profile.png"
            alt="profile"
            width={180}
            height={180}
            className={styles.profileImage}
          />
        </div>

        <h1>PRABHAV BATRA</h1>
        <br/>
        <p>Player ID: PDTY128458</p>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>

        <h1 className={styles.title}>PROFILE</h1>

        <div className={styles.projects}>

          

          <EventsCarousel/>

        </div>

        <div className={styles.stats}>

          <div className={styles.points}>
            <p>Prody Points:</p>
            <h2>230</h2>
          </div>

          <div className={styles.boxes}>
            <div className={styles.redBox}></div>
          <div className={styles.blueBox}></div>
          </div>

        </div>

      </div>
    </div>
  );
}