"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import FilmGrainOverlay from "./FilmGrainOverlay";

interface HobbyCardData {
  id: "drawing" | "reading" | "cooking" | "exploring";
  title: string;
  subtitle: string;
  href: string;
  rotation: number; // e.g. -2.5, 1.8, -1.2, 2.5
  zIndex: number;
}

const HOBBIES: HobbyCardData[] = [
  {
    id: "drawing",
    title: "Drawing",
    subtitle: "Sketchbook & Doodles",
    href: "/beyond-the-code/drawing",
    rotation: -2.5,
    zIndex: 10,
  },
  {
    id: "reading",
    title: "Book Reading",
    subtitle: "Currently Reading & Notes",
    href: "/beyond-the-code/reading",
    rotation: 1.8,
    zIndex: 20,
  },
  {
    id: "cooking",
    title: "Cooking",
    subtitle: "Family Recipes & Bakes",
    href: "/beyond-the-code/cooking",
    rotation: -1.4,
    zIndex: 15,
  },
  {
    id: "exploring",
    title: "Exploring",
    subtitle: "Maps, Spots & Trails",
    href: "/beyond-the-code/exploring",
    rotation: 2.2,
    zIndex: 25,
  },
];

export default function HobbyCorkboard() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleCardClick = (e: React.MouseEvent, hobby: HobbyCardData) => {
    if (shouldReduceMotion) {
      // Direct instant navigation when reduced motion is preferred
      return;
    }

    e.preventDefault();
    setAnimatingId(hobby.id);

    setTimeout(() => {
      router.push(hobby.href);
    }, 550);
  };

  return (
    <section className="relative w-full py-16 px-4 md:px-8 bg-[#EDE7D8] text-[#24211D] overflow-hidden min-h-[580px] flex flex-col items-center justify-center font-sans border-t border-[#D6CDBC]">
      {/* Film grain layer to keep consistency with theme */}
      <FilmGrainOverlay />

      {/* Header section */}
      <div className="text-center max-w-xl mb-12 relative z-10">
        <span className="font-space uppercase tracking-[0.2em] text-xs text-[#7A7265] font-medium block mb-2">
          Personal Notes &amp; Interests
        </span>
        <h2 className="font-fraunces text-3xl md:text-5xl font-normal tracking-tight text-[#1C1A17] mb-3">
          Beyond the Code
        </h2>
        <p className="font-caveat text-xl md:text-2xl text-[#575043]">
          A few things I enjoy, read, and explore outside of work.
        </p>
      </div>

      {/* Corkboard Scattered Container */}
      <div className="relative w-full max-w-5xl flex flex-wrap items-end justify-center gap-6 md:gap-10 py-6 min-h-[360px]">
        {HOBBIES.map((hobby) => {
          const isSelected = animatingId === hobby.id;
          const isOtherSelected = animatingId !== null && !isSelected;

          return (
            <motion.div
              key={hobby.id}
              className="relative"
              style={{ zIndex: isSelected ? 50 : hobby.zIndex }}
              animate={
                shouldReduceMotion
                  ? {}
                  : isSelected
                  ? {
                      scale: [1, 1.4, 2.5],
                      opacity: [1, 1, 0],
                      rotate: 0,
                    }
                  : isOtherSelected
                  ? {
                      opacity: 0,
                      scale: 0.9,
                    }
                  : {}
              }
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={hobby.href}
                onClick={(e) => handleCardClick(e, hobby)}
                className="block group outline-none focus-visible:ring-2 focus-visible:ring-[#8C2D19] rounded-sm"
              >
                <motion.div
                  className="relative transition-shadow duration-300 select-none cursor-pointer"
                  style={{
                    transformOrigin: "center center",
                  }}
                  initial={
                    shouldReduceMotion
                      ? { rotate: 0 }
                      : { rotate: hobby.rotation }
                  }
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -8,
                          rotate: 0,
                          transition: { duration: 0.25, ease: "easeOut" },
                        }
                  }
                >
                  {/* Push Pin Graphics at top of card */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-md">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#A83226] border border-[#7A2118] shadow-inner relative flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white/60" />
                    </div>
                  </div>

                  {/* 1. DRAWING CARD */}
                  {hobby.id === "drawing" && (
                    <div
                      className="w-56 md:w-64 h-72 p-5 bg-[#F7F4EA] text-[#2B2723] shadow-lg hover:shadow-2xl transition-shadow relative flex flex-col justify-between"
                      style={{
                        clipPath:
                          "polygon(0% 12px, 5% 2px, 12% 14px, 18% 4px, 25% 12px, 32% 3px, 40% 14px, 48% 2px, 55% 10px, 63% 4px, 72% 14px, 80% 3px, 88% 12px, 95% 2px, 100% 10px, 100% 100%, 0% 100%)",
                      }}
                    >
                      {/* Curled corner illusion shadow */}
                      <div className="absolute bottom-1 right-1 w-6 h-6 bg-black/10 blur-[2px] transform rotate-12 pointer-events-none" />

                      <div className="border-b border-[#E3DDCF] pb-3">
                        <span className="font-space text-[10px] tracking-widest uppercase text-[#8C8375]">
                          Sketchbook No. 04
                        </span>
                        <h3 className="font-fraunces text-2xl font-semibold text-[#1F1C18] mt-1">
                          Drawing
                        </h3>
                      </div>

                      {/* Line art doodle illustration */}
                      <div className="my-auto flex justify-center items-center py-2 opacity-85">
                        <svg
                          viewBox="0 0 160 100"
                          className="w-36 h-24 stroke-[#3D3730] fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round"
                        >
                          {/* Botanical doodle lines */}
                          <path d="M 80,95 Q 75,50 40,20" />
                          <path d="M 80,95 Q 85,45 120,15" />
                          <path d="M 80,60 Q 60,40 50,45" />
                          <path d="M 80,45 Q 100,30 110,35" />
                          <circle cx="40" cy="20" r="8" className="stroke-dasharray-2 stroke-[#574F45]" />
                          <circle cx="120" cy="15" r="10" className="stroke-[#574F45]" />
                          {/* Pencil hatch marks */}
                          <line x1="30" y1="75" x2="55" y2="70" className="stroke-neutral-400" />
                          <line x1="32" y1="80" x2="57" y2="75" className="stroke-neutral-400" />
                          <line x1="34" y1="85" x2="59" y2="80" className="stroke-neutral-400" />
                        </svg>
                      </div>

                      <div className="pt-2 border-t border-[#E3DDCF]/60 flex justify-between items-baseline">
                        <span className="font-caveat text-lg text-[#6E6455]">
                          Ink & graphite studies
                        </span>
                        <span className="font-space text-xs font-bold text-[#8C2D19] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 2. BOOK READING CARD */}
                  {hobby.id === "reading" && (
                    <div className="w-52 md:w-60 h-80 bg-[#FAF7F0] text-[#292520] shadow-md hover:shadow-xl relative p-5 flex flex-col justify-between border border-[#E3DEC3] rounded-sm">
                      {/* Ribbon bookmark hanging from top */}
                      <div
                        className="absolute -top-2 right-6 w-4 h-12 bg-[#8C2D19] shadow-sm z-20"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
                        }}
                      />

                      {/* Lined notebook paper background lines */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          backgroundImage:
                            "linear-gradient(to bottom, transparent 23px, #4A7A96 24px)",
                          backgroundSize: "100% 24px",
                        }}
                      />

                      <div className="relative z-10">
                        <span className="font-space text-[10px] uppercase tracking-widest text-[#786F60]">
                          Library Card
                        </span>
                        <h3 className="font-fraunces text-2xl font-semibold text-[#1C1A17] mt-1">
                          Book Reading
                        </h3>
                      </div>

                      <div className="relative z-10 my-auto pl-2 border-l-2 border-[#C94A36] space-y-1 py-1">
                        <span className="font-space text-[9px] uppercase tracking-wider text-[#A05245] font-bold block">
                          Currently Reading
                        </span>
                        <p className="font-caveat text-2xl leading-tight text-[#2B2319]">
                          &ldquo;Invisible Cities&rdquo;
                        </p>
                        <span className="font-caveat text-base text-[#6B6152] block">
                          by Italo Calvino
                        </span>
                      </div>

                      <div className="relative z-10 pt-2 border-t border-[#E3DEC3] flex justify-between items-center">
                        <span className="font-caveat text-base text-[#7A6F5D]">
                          Notes & Quotes
                        </span>
                        <span className="font-space text-xs font-bold text-[#8C2D19] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 3. COOKING CARD */}
                  {hobby.id === "cooking" && (
                    <div className="w-56 md:w-64 h-72 bg-[#FFFDF7] text-[#2E2820] shadow-md hover:shadow-xl relative p-5 flex flex-col justify-between border border-[#E6DFCD] rounded-sm">
                      {/* Red rule line at top like standard index card */}
                      <div className="absolute top-8 left-0 right-0 h-[1.5px] bg-[#D9534F] opacity-80 pointer-events-none" />

                      {/* Coffee stain ring texture */}
                      <div
                        className="absolute bottom-4 left-4 w-20 h-20 rounded-full border-4 border-[#8C6639] opacity-[0.09] pointer-events-none"
                        style={{ filter: "blur(1px)" }}
                      />

                      <div className="pt-4">
                        <span className="font-space text-[10px] uppercase tracking-widest text-[#857B6B]">
                          Recipe Index No. 12
                        </span>
                        <h3 className="font-fraunces text-2xl font-semibold text-[#1F1912] mt-0.5">
                          Cooking
                        </h3>
                      </div>

                      {/* Recipe Card Mock Graphic / Illustration */}
                      <div className="my-auto bg-[#F4EFE0] p-3 rounded border border-[#E0D8C3] flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-[#E6DCC3] flex-shrink-0 flex items-center justify-center text-xl">
                          🥐
                        </div>
                        <div className="text-left overflow-hidden">
                          <span className="font-caveat text-lg leading-tight block text-[#2E251A] truncate">
                            Wild Berry Galette
                          </span>
                          <span className="font-space text-[10px] text-[#7A6F5E] block">
                            Prep: 25m &middot; Bake: 35m
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E8E1CF] flex justify-between items-center">
                        <span className="font-caveat text-base text-[#6E6352]">
                          Handmade bakes & recipes
                        </span>
                        <span className="font-space text-xs font-bold text-[#8C2D19] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  )}

                  {/* 4. EXPLORING CARD */}
                  {hobby.id === "exploring" && (
                    <div className="w-56 md:w-64 h-76 bg-[#F5F0E1] text-[#29241C] shadow-md hover:shadow-xl relative p-5 flex flex-col justify-between border border-[#D9D1BD] rounded-sm overflow-hidden">
                      {/* Illustrated Map Contours SVG Background */}
                      <div className="absolute inset-0 pointer-events-none opacity-25">
                        <svg viewBox="0 0 200 240" className="w-full h-full stroke-[#6E5D47] fill-none stroke-[1]">
                          <path d="M -10,30 Q 60,10 120,60 T 210,120" />
                          <path d="M -10,70 Q 70,50 140,110 T 210,170" />
                          <path d="M -10,120 Q 80,100 150,160 T 210,210" />
                          <path d="M 40,180 Q 90,140 160,220" />
                          {/* X Marks the spot */}
                          <g transform="translate(130, 80)">
                            <line x1="-6" y1="-6" x2="6" y2="6" className="stroke-[#C93B2B] stroke-[2.5]" />
                            <line x1="6" y1="-6" x2="-6" y2="6" className="stroke-[#C93B2B] stroke-[2.5]" />
                            <circle cx="0" cy="0" r="10" className="stroke-[#C93B2B] stroke-dasharray-2 stroke-[1]" />
                          </g>
                        </svg>
                      </div>

                      <div className="relative z-10">
                        <span className="font-space text-[10px] uppercase tracking-widest text-[#7A6E5C]">
                          Map Fragment &middot; 42°N 71°W
                        </span>
                        <h3 className="font-fraunces text-2xl font-semibold text-[#1C1813] mt-1">
                          Exploring
                        </h3>
                      </div>

                      <div className="relative z-10 my-auto bg-[#EDE5D1]/80 backdrop-blur-xs p-2.5 rounded border border-[#CFC5AC]">
                        <span className="font-caveat text-xl text-[#3D3325] block leading-tight">
                          &quot;Not all who wander are lost.&quot;
                        </span>
                        <span className="font-space text-[10px] text-[#6E6352] uppercase tracking-wider mt-1 block">
                          Trails, coffee stops & views
                        </span>
                      </div>

                      <div className="relative z-10 pt-2 border-t border-[#D9D1BD] flex justify-between items-center">
                        <span className="font-caveat text-base text-[#6E6250]">
                          Travel photo strip
                        </span>
                        <span className="font-space text-xs font-bold text-[#8C2D19] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
