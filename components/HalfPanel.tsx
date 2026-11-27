"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import GlitchDecodeText from "./GlitchDecodeText";
import BlueprintGrid from "./BlueprintGrid";
import BeyondTheCode from "./BeyondTheCode";
import WorkThroughCodeSection from "./WorkThroughCodeSection";




interface HalfPanelProps {
  side: "left" | "right";
  title: string;
  isHovered: boolean;
  isCompressed: boolean;
  isClicked: boolean;
  onClose: () => void;
}

export default function HalfPanel({
  side,
  title,
  isHovered,
  isCompressed,
  isClicked,
  onClose,
}: HalfPanelProps) {
  const isLeft = side === "left";
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Parallax mouse state
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isClicked || shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20; // max 10px drift
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };
  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  const tags = isLeft
    ? ["Reading", "Cooking", "Exploring", "Drawing"]
    : ["Professional", "Personal", "Learning"];







  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full h-full relative ${isClicked ? "cursor-default overflow-y-auto" : "cursor-pointer"
        } flex flex-col ${isClicked
          ? "items-center justify-start py-20 px-6 md:px-12"
          : `justify-center ${isLeft ? "items-end pr-8 md:pr-16" : "items-start pl-8 md:pl-16"
          }`
        }`}
    >

      {/* Background Visuals */}
      <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden ${isLeft ? "bg-[#F3EDE3]" : "bg-[#DDD3C5]"}`}>
        {isLeft ? (
          <>
            {/* Subtle radial ambient lighting */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: "radial-gradient(circle at center, #FAF6F0 0%, #F3EDE3 100%)",
              }}
            />

            {/* Ambient Detail */}
            <motion.div
              className="absolute top-[20%] left-[30%] w-2 h-2 bg-[#B87932]/40 rounded-full blur-[1px] pointer-events-none z-10"
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [-15, 15, -15], x: [-5, 5, -5], opacity: [0.2, 0.6, 0.2] }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          /* Blueprint Grid Background on Forest Green Side */
          <BlueprintGrid isHovered={isHovered} isClicked={isClicked} />
        )}
      </div>


      {/* Close Button for Expanded State */}
      <AnimatePresence>
        {isClicked && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed top-8 right-8 z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col w-full ${isClicked ? "max-w-6xl" : "max-w-xl"}`}>

        <motion.div
          animate={{
            x: isClicked ? 0 : mousePos.x,
            y: isClicked ? 0 : mousePos.y,
            opacity: isCompressed ? 0.3 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
          className={`flex flex-col ${isClicked
              ? "items-start text-left"
              : isLeft
                ? "items-end text-right"
                : "items-start text-left"
            }`}

        >
          {/* Title with side-specific personality animations */}
          {(!isClicked || !isLeft) && (
            <motion.h2
              layout
              className={`text-4xl md:text-5xl lg:text-7xl leading-tight drop-shadow-sm select-none ${isLeft
                  ? "font-serif italic tracking-wide text-[#211D18]"
                  : "font-sans font-bold tracking-tighter text-[#10251D]"
                }`}
            >
              {isLeft ? (
                <span>{title}</span>
              ) : (
                <GlitchDecodeText
                  text={title}
                  isHovered={isHovered}
                  shouldReduceMotion={shouldReduceMotion}
                />
              )}
            </motion.h2>
          )}

          {/* Expanded Page Content */}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${isLeft ? "mt-0" : "mt-8"} text-lg w-full`}
              >
                {isLeft ? (
                  <div className="w-full text-left">
                    <BeyondTheCode />
                  </div>
                ) : (
                  <div className="w-full text-left pt-6">
                    <WorkThroughCodeSection />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover Meta (Tags & CTA) */}
          <AnimatePresence>
            {!isClicked && (isHovered || isMobileFallback()) && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, staggerChildren: 0.1 }}
                className={`mt-6 flex flex-col ${isLeft ? "items-end" : "items-start"
                  }`}
              >
                <div className={`flex gap-2 flex-wrap text-xs uppercase tracking-widest font-medium mb-6 ${isLeft ? "text-[#B87932]" : "text-[#18352A]"
                  }`}>
                  {tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {i < tags.length - 1 && <span>&middot;</span>}
                    </React.Fragment>
                  ))}
                </div>

                <div className={`flex items-center gap-2 font-semibold text-sm tracking-wide group ${isLeft ? "text-[#211D18]" : "text-[#10251D]"
                  }`}>
                  <span>{isLeft ? "Explore" : "Enter"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  );
}

function isMobileFallback() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}
