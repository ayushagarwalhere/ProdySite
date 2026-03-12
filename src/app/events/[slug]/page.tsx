"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { Oswald, Open_Sans } from "next/font/google";
import { useRouter, useParams } from "next/navigation";
import styles from "../page.module.css";
import { events } from "@/constants/events";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400"] });

export default function EventSlugPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const currentEventIndex = useMemo(() => {
        return events.findIndex(e => e.slug === slug);
    }, [slug]);

    const currentEvent = currentEventIndex !== -1 ? events[currentEventIndex] : null;

    const [activeSliderIndex, setActiveSliderIndex] = useState<number>(-1);
    const trackRef = useRef<HTMLDivElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    // Filtered events: show 5 events (exclude the current one)
    const otherEvents = useMemo(() => {
        if (currentEventIndex === -1) return events;
        return events.filter((_, index) => index !== currentEventIndex);
    }, [currentEventIndex]);

    const center = (index: number) => {
        if (index === -1) return;
        const track = trackRef.current;
        const wrap = wrapRef.current;
        if (!track || !wrap) return;

        const card = track.children[index] as HTMLElement;
        if (!card) return;

        wrap.scrollTo({
            left: card.offsetLeft - (wrap.clientWidth / 2 - card.clientWidth / 2),
            behavior: "smooth"
        });
    };

    // Disabled auto-centering for the infinite marquee animation
    // useEffect(() => {
    //     if (activeSliderIndex !== -1) {
    //         center(activeSliderIndex);
    //     }
    // }, [activeSliderIndex, otherEvents]);

    const handleCarouselClick = (indexInOther: number) => {
        if (activeSliderIndex === indexInOther) {
            // Second click: Navigate to that event page
            const clickedEvent = otherEvents[indexInOther];
            router.push(`/events/${clickedEvent.slug}`);
            setActiveSliderIndex(-1);
        } else {
            // First click: Expand the card
            setActiveSliderIndex(indexInOther);
        }
    };

    const handleClose = () => {
        setActiveSliderIndex(-1);
    };

    if (!currentEvent) {
        return <div className={styles.container} style={{color: 'white', padding: '100px'}}>Event not found ({slug})</div>;
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.background}
                style={{ backgroundImage: `url('${currentEvent.bg}')` }}
            />

            <div className={styles.content}>
                <div className={styles.leftMain}>
                    <h1 className={`${oswald.className} ${styles.title}`}>
                        {currentEvent.titleLines.map((line, index) => (
                            <span key={index} className={styles[`titleLine${index + 1}`] || styles.titleLine1}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </h1>
                </div>

                <div className={styles.rightMain}>
                    <div className={styles.rightContentBox}>
                        <h2 className={styles.subtitle}>
                            {currentEvent.name.toUpperCase()}
                            <br />
                            LEVEL
                        </h2>
                        <p className={`${styles.description} ${openSans.className}`}>
                            {currentEvent.description}
                        </p>
                        <div className={styles.actions}>
                            <button className={`${styles.registerBtn} ${openSans.className}`}>REGISTER</button>
                            <button className={`${styles.abstractBtn} ${openSans.className}`}>ABSTRACT</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottomCardsOverlay}>
                {activeSliderIndex !== -1 && (
                    <button className={styles.closeCardBtn} onClick={handleClose} aria-label="Close details">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
                <div className={styles.cardsContainer}>
                    <div className={styles.sliderHead}>
                        <h2 className={oswald.className}>EXPLORE OTHER EVENTS</h2>
                    </div>

                    <div className={styles.slider}>
                        <div className={styles.wrap} ref={wrapRef}>
                            <div className={styles.track} ref={trackRef}>
                                {[...otherEvents, ...otherEvents].map((event, index) => (
                                    <div
                                        key={`${event.id}-${index}`}
                                        className={styles.projectCard}
                                        data-active={activeSliderIndex === index}
                                        onClick={() => handleCarouselClick(index)}
                                    >
                                        <img src={event.image} alt={event.name} className={styles.projectCardBg} />
                                        <div className={styles.projectCardContent}>
                                            <h3 className={styles.projectCardTitle}>{event.name}</h3>
                                            <img src={event.image} alt="" className={styles.projectCardThumb} />
                                            <div className={styles.projectCardInfo}>
                                                <p className={styles.projectCardDesc}>{event.description.substring(0, 100)}...</p>
                                                <button className={styles.projectCardBtn}>View Detail</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.dots}>
                        {otherEvents.map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.dot} ${activeSliderIndex === index ? styles.dotActive : ""}`}
                                onClick={() => setActiveSliderIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
