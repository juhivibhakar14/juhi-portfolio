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

      {/* Blueprint technical coordinate accents */}
      <div className="absolute top-6 left-6 text-[10px] font-mono text-[#18352A]/50 tracking-widest pointer-events-none select-none">
        [SYS // 0x1025]
      </div>
      <div className="absolute bottom-6 right-6 text-[10px] font-mono text-[#18352A]/50 tracking-widest pointer-events-none select-none">
        [GRID // IVORY_PINE]
      </div>

      {/* Subtle crosshair accents at fixed points */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 text-[#18352A]/40 flex items-center justify-center font-mono text-xs select-none">
        +
      </div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 text-[#18352A]/40 flex items-center justify-center font-mono text-xs select-none">
        +
      </div>
    </div>
  );
}


