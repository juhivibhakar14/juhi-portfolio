"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BlueprintGridProps {
  isHovered: boolean;
  isClicked: boolean;
}

export default function BlueprintGrid({ isHovered, isClicked }: BlueprintGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#DDD3C5]">
      {/* Grid Pattern with slow drifting background position & opacity wave */}
      <motion.div
        className="absolute inset-0 opacity-[0.25]"
        animate={
          shouldReduceMotion
            ? { opacity: 0.25 }
            : {
                backgroundPosition: [
                  "0px 0px",
                  "40px 40px",
                  "0px 80px",
                  "0px 0px"
                ],
                opacity: isHovered || isClicked ? [0.25, 0.35, 0.25] : [0.18, 0.28, 0.18],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(24, 53, 42, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(24, 53, 42, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Clean Blueprint Grid Pattern */}
    </div>
  );
}


