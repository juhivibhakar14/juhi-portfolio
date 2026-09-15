"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HalfPanel from "./HalfPanel";
import CustomCursor from "./CustomCursor";
import IntroSplash from "./IntroSplash";

export default function SplitScreenLayout() {
  const [showIntro, setShowIntro] = useState(true);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const [clickedSide, setClickedSide] = useState<"left" | "right" | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  let leftSize = "50%";
  let rightSize = "50%";

  if (clickedSide === "left") {
    leftSize = "100%";
    rightSize = "0%";
  } else if (clickedSide === "right") {
    leftSize = "0%";
    rightSize = "100%";
  } else if (hoveredSide === "left") {
    leftSize = "60%";
    rightSize = "40%";
  } else if (hoveredSide === "right") {
    leftSize = "40%";
    rightSize = "60%";
  }

  const transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      {/* Geoff Levy style Intro Screen on website open */}
      {showIntro && <IntroSplash onComplete={() => setShowIntro(false)} />}

      <div
        className={`flex flex-col md:flex-row w-full h-screen overflow-hidden bg-[#0a0a0a] relative ${
          !isMobile && !clickedSide && !showIntro ? "cursor-none" : ""
        }`}
      >
        {/* Per-Side Custom Cursor */}
        {!isMobile && !clickedSide && !showIntro && (
          <CustomCursor hoveredSide={hoveredSide} />
        )}

        <motion.div
          className="relative overflow-hidden shrink-0"
          initial={false}
          animate={{
            width: isMobile ? "100%" : leftSize,
            height: isMobile ? leftSize : "100%",
            opacity: clickedSide === "right" ? 0 : 1,
          }}
          transition={transition}
          onMouseEnter={() => !clickedSide && setHoveredSide("left")}
          onMouseLeave={() => !clickedSide && setHoveredSide(null)}
          onClick={() => setClickedSide("left")}
        >
          <HalfPanel
            side="left"
            title="BEYOND THE CODE"
            isHovered={hoveredSide === "left"}
            isCompressed={hoveredSide === "right" || clickedSide === "right"}
            isClicked={clickedSide === "left"}
            onClose={() => setClickedSide(null)}
          />
        </motion.div>

        {/* 1px Center Divider Line - fades in past halfway */}
        <AnimatePresence>
          {!clickedSide && !isMobile && (
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10 z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="relative overflow-hidden shrink-0"
          initial={false}
          animate={{
            width: isMobile ? "100%" : rightSize,
            height: isMobile ? rightSize : "100%",
            opacity: clickedSide === "left" ? 0 : 1,
          }}
          transition={transition}
          onMouseEnter={() => !clickedSide && setHoveredSide("right")}
          onMouseLeave={() => !clickedSide && setHoveredSide(null)}
          onClick={() => setClickedSide("right")}
        >
          <HalfPanel
            side="right"
            title="THROUGH THE CODE"
            isHovered={hoveredSide === "right"}
            isCompressed={hoveredSide === "left" || clickedSide === "left"}
            isClicked={clickedSide === "right"}
            onClose={() => setClickedSide(null)}
          />

        </motion.div>

        {/* Absolute center logo */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto cursor-pointer mix-blend-difference text-white select-none"
          animate={{ opacity: clickedSide ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowIntro(true)}
        >
          <h2 className="text-lg md:text-xl font-serif italic tracking-[0.2em] hover:opacity-80 transition-opacity">
            JUHI VIBHAKAR
          </h2>
        </motion.div>
      </div>
    </>
  );
}


