"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CustomCursorProps {
  hoveredSide: "left" | "right" | null;
}

export default function CustomCursor({ hoveredSide }: CustomCursorProps) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const reqRef = useRef<number | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      if (
        typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)
      ) {
        setIsTouch(true);
      }
    };
    checkTouch();

    let latestX = -100;
    let latestY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (!reqRef.current) {
        reqRef.current = requestAnimationFrame(() => {
          setPos({ x: latestX, y: latestY });
          reqRef.current = null;
        });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isVisible]);

  if (isTouch || shouldReduceMotion) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference flex items-center justify-center text-white"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}
    >
      {hoveredSide === "left" ? (
        /* Camera Aperture / Focus Ring Cursor (~24px diameter) */
        <motion.div
          key="aperture"
          initial={{ scale: 0.6, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.25, ease: "backOut" }}
          className="relative w-6 h-6 flex items-center justify-center"
        >
          {/* Thin circular ring */}
          <div className="w-full h-full rounded-full border border-white" />
          {/* Aperture notch details */}
          <div className="absolute w-[1.5px] h-1 bg-white top-0" />
          <div className="absolute w-[1.5px] h-1 bg-white bottom-0" />
          <div className="absolute h-[1.5px] w-1 bg-white left-0" />
          <div className="absolute h-[1.5px] w-1 bg-white right-0" />
          {/* Subtle focus dot */}
          <div className="absolute w-1 h-1 bg-white rounded-full" />
        </motion.div>
      ) : hoveredSide === "right" ? (
        /* Crosshair / Plus Cursor */
        <motion.div
          key="crosshair"
          initial={{ scale: 0.6, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.25, ease: "backOut" }}
          className="relative w-6 h-6 flex items-center justify-center"
        >
          <div className="absolute w-4 h-[1.5px] bg-white" />
          <div className="absolute h-4 w-[1.5px] bg-white" />
          {/* Crosshair gap center */}
          <div className="absolute w-1.5 h-1.5 rounded-full border border-white/80" />
        </motion.div>
      ) : (
        /* Neutral subtle ring */
        <motion.div
          key="default"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center"
        >
          <div className="w-1 h-1 bg-white rounded-full" />
        </motion.div>
      )}
    </div>
  );
}
