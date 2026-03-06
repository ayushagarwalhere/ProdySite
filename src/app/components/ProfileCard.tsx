import Image from "next/image";
import styles from "../Profile/profile.module.css"

export default function ProfileCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#D4A96C]">

      <div className="relative w-[507px] h-[717px] bg-[#3E4471] rounded-[20px] overflow-hidden">

        {/* top cut */}
        <div className="absolute top-0 right-0 w-[200px] h-[120px] bg-[#D4A96C] rounded-bl-[120px]" />

        {/* Profile Page Text */}
        <p className="absolute top-[30px] left-[40px] text-[#F4D6A0] text-[22px]">
          Profile Page
        </p>

        {/* Rings Section */}
        <div className="absolute top-[140px] left-1/2 -translate-x-1/2">

<div className={styles.circleWrapper}>

  {/* Outer Ring */}
  <div className={styles.outerCircle}></div>

  {/* Inner Ring */}
  <div className={styles.circleWrapper}>

  <div className={styles.outerCircle}></div>
  <div className={styles.innerCircle}></div>

  <Image
    src="/Profile.png"
    alt="profile"
    width={240}
    height={280}
    className={styles.profileImage}
  />

</div>

</div>

        </div>

        {/* Name */}
        <div className="absolute bottom-[140px] w-full text-center">
          <h1 className="text-[56px] leading-[60px] text-[#F4D6A0] font-semibold">
            PRABHAV <br/> BATRA
          </h1>
        </div>

        {/* Player ID */}
        <p className="absolute bottom-[80px] w-full text-center text-[#F4D6A0] text-[22px]">
          Player ID: PDTY128458
        </p>

      </div>
    </div>
  );
}