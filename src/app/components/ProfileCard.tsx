import Image from "next/image";
import styles from "./ProfileCard.module.css";

const ProfileCard = () => {
  return (
    <div className={styles.cardWrapper}>

      {/* Title */}
      <h1 className={styles.title}>Profile Page</h1>

      {/* Card */}
      <div className={`${styles.card} grid grid-rows-[auto_auto] gap-4 place-items-center`}>

        {/* Image Section */}
        <div className="relative flex justify-center items-center">
          {/* Outer Circle */}
          <div className={styles.outerCircle}></div>

          {/* Inner Circle */}
          <div className={styles.innerCircle}></div>

          {/* Profile Image */}
          <div className="relative z-10">
            <Image
              src="/Profile.png"
              alt="profile"
              width={120}
              height={120}
              className={styles.profileImage}
            />
          </div>
        </div>

        {/* Name & ID Section */}
        <div className="text-center">
          <h2 className={styles.name}>PRABHAV BATRA</h2>
          <p className={styles.id}>Player ID: PDITY123455</p>
        </div>

      </div>

    </div>
  );
};

export default ProfileCard;