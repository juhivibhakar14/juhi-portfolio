"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FilmGrainOverlay from "./FilmGrainOverlay";

interface IntroSplashProps {
  onComplete: () => void;
}

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  // Handle scroll / wheel event or click / drag upward to open portfolio
  useEffect(() => {
    if (shouldReduceMotion) return;

    let touchStartY = 0;

    const triggerExit = () => {
      if (!isExiting) {
        setIsExiting(true);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Scroll down or scroll up triggers the reveal transition
      if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
        triggerExit();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === " " || e.key === "Enter") {
        triggerExit();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) > 30) {
        triggerExit();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isExiting, shouldReduceMotion]);

  const handleManualDismiss = () => {
    if (!isExiting) {
      setIsExiting(true);
    }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        onComplete();
      }}
    >
      {!isExiting && (
        <motion.div
          key="intro-splash-screen"
          onClick={handleManualDismiss}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            opacity: 1,
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 bg-[#0a0a0a] text-white flex flex-col justify-between items-center py-12 px-6 select-none overflow-hidden cursor-pointer selection:bg-neutral-800"
        >
          {/* Subtle noise overlay matching the aesthetic */}
          <FilmGrainOverlay />

          {/* Top subtle category branding */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400"
          >
            [ CREATIVE DIRECTOR & ENGINEER ]
          </motion.div>

          {/* Centered Large Editorial Typography (Canva / Editorial Poster Style) */}
          <div className="relative flex flex-col items-center justify-center text-center my-auto">
            {/* Background Oversized Outline Accent Text */}
            <motion.span
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.08, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute font-serif italic text-7xl md:text-[13rem] tracking-tighter text-white pointer-events-none uppercase whitespace-nowrap select-none font-bold"
            >
              ABOUT
            </motion.span>

            {/* Foreground Script Signature Name Overlay */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-4xl md:text-7xl lg:text-8xl text-white/95 tracking-wide drop-shadow-2xl z-10 leading-tight"
            >
              Juhi Vibhakar
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-sans text-xs md:text-sm uppercase tracking-[0.25em] text-neutral-300 mt-4 max-w-md z-10 font-light"
            >
              Architecting Systems &amp; Visual Journeys
            </motion.p>
          </div>

          {/* Bottom Interactive Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              delay: 0.8,
            }}
            className="flex flex-col items-center gap-2 text-neutral-400 z-10"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              Scroll or Drag Up to Explore
            </span>
            <ChevronDown className="w-4 h-4 stroke-[1.5]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
