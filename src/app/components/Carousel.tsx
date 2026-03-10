"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import ProjectCard from "./ProjectCard";

export default function EventsCarousel() {

  const events = [
    {
      title: "SailBoat",
      description: "Build and race your own sailboat",
      team: "2/4",
      image: "/events/sailboat.png",
    },
    {
      title: "Hackathon",
      description: "24 hour coding challenge",
      team: "3/5",
      image: "/events/sailboat.png",
    },
    {
      title: "Treasure Hunt",
      description: "Solve clues and find the treasure",
      team: "2/3",
      image: "/events/sailboat.png",
    },
    {
      title: "Design Battle",
      description: "UI/UX design competition",
      team: "1/2",
      image: "/events/sailboat.png",
    },
  ];

  return (
    <div style={{ width: "800px" }}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        slidesPerView={1} // default for small screens
        breakpoints={{
          640: {
            slidesPerView: 1, // still 1 card on small screens
          },
          768: {
            slidesPerView: 2, // medium screens show 2
          },
          1024: {
            slidesPerView: 2, // large screens show 2 (same as before)
          },
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <ProjectCard
              title={event.title}
              description={event.description}
              team={event.team}
              image={event.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}