import { Oswald } from "next/font/google";
import styles from "./page.module.css";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });

export default function EventsPage() {
    return (
        <div className={styles.container}>
            {/* Background Image Setup */}
            {/* Note: As the image was provided in the chat instead of the workspace folder,
          this currently points to '/bg.jpg'. Please ensure the image is placed in the
          'public' folder and named 'bg.jpg' or 'bg.png' (and update the extension if needed). */}
            <div
                className={styles.background}
                style={{ backgroundImage: "url('/bg.png')" }}
            />

            <div className={styles.content}>
                {/* Left Section */}
                <div className={styles.leftMain}>
                    <h1 className={`${oswald.className} ${styles.title}`}>
                        <span className={styles.titleLine1}>SAIL</span>
                        <br />
                        <span className={styles.titleLine2}>BOAT</span>
                        <br />
                        <span className={styles.titleLine3}>SAILING</span>
                    </h1>
                    <button className={styles.bookmarkBtn}>
                        <span className={styles.bookmarkIcon}></span> Bookmark
                    </button>
                </div>

                {/* Right Section */}
                <div className={styles.rightMain}>
                    <div className={styles.rightContentBox}>
                        <h2 className={styles.subtitle}>
                            LOREM IPSUM
                            <br />
                            DOLOR
                        </h2>
                        <p className={styles.description}>
                            Lorem ipsum dolor sit amet consectetur. Pulvinar
                            sed leo nisl ut nulla morbi arcu. Gravida pharetra
                            natoque dui congue fermentum sit eu vitae sem.
                            Leo dignissim nisl nisl dui faucibus aliquet enim.
                            Tellus in pharetra pharetra venenatis. Diam.
                        </p>
                        <div className={styles.actions}>
                            <button className={styles.registerBtn}>REGISTER</button>
                            <button className={styles.abstractBtn}>ABSTRACT</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Right Cards Overlay */}
            <div className={styles.bottomCardsOverlay}>
                <div className={styles.cardsContainer}>
                    <button className={styles.closeCardBtn}>✕</button>
                    <div className={styles.cardBox}></div>
                    <div className={`${styles.cardBox} ${styles.cardBoxCut}`}></div>
                </div>
            </div>
        </div>
    );
}
