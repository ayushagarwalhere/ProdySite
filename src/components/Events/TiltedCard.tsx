// Fixed escaped quotes here as well; everything below uses normal ""
"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type TiltedCardProps = {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  onClick?: () => void;
};

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  onClick,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        ref={ref}
        className="relative w-full h-full perspective-[800px] flex items-center justify-center"
      >
        {showMobileWarning && (
          <div className="absolute top-4 text-center text-xs text-[#f9fafb] z-10 block sm:hidden">
            This effect is not optimized for mobile. Check on desktop.
          </div>
        )}

        <motion.div
          className="relative [transform-style:preserve-3d]"
          style={{
            width: imageWidth,
            height: imageHeight,
            rotateX,
            rotateY,
            scale,
          }}
        >
          <motion.img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 left-0 object-cover rounded-[18px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(156,163,175,0.25)] will-change-transform translate-z-0"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />

          {displayOverlayContent && overlayContent && (
            <motion.div className="tilted-card-overlay absolute top-0 left-0 z-[2] will-change-transform translate-z-[30px] p-4 flex items-end justify-start">
              {overlayContent}
            </motion.div>
          )}
        </motion.div>

        {showTooltip && (
          <motion.figcaption
            className="pointer-events-none absolute left-0 top-0 rounded-full bg-[rgba(15,23,42,0.95)] py-[0.35rem] px-[0.9rem] text-[0.65rem] tracking-[0.09em] uppercase text-[#f9fafb] z-[3] shadow-[0_4px_12px_rgba(0,0,0,0.6)] hidden sm:block"
            style={{
              x,
              y,
              opacity,
              rotate: rotateFigcaption,
            }}
          >
            {captionText}
          </motion.figcaption>
        )}
      </div>
    </figure>
  );
}

