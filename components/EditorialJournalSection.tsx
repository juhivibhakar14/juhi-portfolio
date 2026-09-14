"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FilmGrainOverlay from "./FilmGrainOverlay";

interface EditorialItem {
  id: "reading" | "cooking" | "exploring" | "drawing";
  number: string;
  title: string;
  quote: string;
  href: string;
  image: string;
}

const EDITORIAL_ITEMS: EditorialItem[] = [
  {
    id: "reading",
    number: "01",
    title: "READING",
    quote: "Stories, ideas, and perspectives that stay with me.",
    href: "/beyond-the-code/reading",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "cooking",
    number: "02",
    title: "COOKING",
    quote: "A little creativity outside the screen.",
    href: "/beyond-the-code/cooking",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "exploring",
    number: "03",
    title: "EXPLORING",
    quote: "Finding something new, wherever I go.",
    href: "/beyond-the-code/exploring",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "drawing",
    number: "04",
    title: "DRAWING",
    quote: "Making ideas visible, one line at a time.",
    href: "/beyond-the-code/drawing",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function EditorialJournalSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative w-full py-20 md:py-32 px-6 md:px-16 bg-[#F3EDE3] text-[#211D18] overflow-hidden selection:bg-[#B87932] selection:text-white font-sans">
      {/* Film grain overlay for tactile paper texture */}
      <FilmGrainOverlay />

      {/* Warm Vanilla Cream glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F8E8B2]/50 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16 md:mb-24 border-b border-[#211D18]/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[#B87932] uppercase tracking-[0.25em] block mb-3 font-semibold">
            [ Four Worlds // 01 - 04 ]
          </span>
          <h2 className="font-serif italic text-4xl md:text-6xl text-[#211D18] tracking-wide leading-none font-normal">
            BEYOND THE CODE
          </h2>
        </div>
        <p className="font-serif text-lg text-[#524639] max-w-sm italic leading-relaxed">
          Four distinct creative realms explored outside software architecture.
        </p>
      </div>


      {/* Clean 2x2 Editorial Grid Layout */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {EDITORIAL_ITEMS.map((item) => {
          const isHovered = hoveredId === item.id;
          const isAnotherHovered = hoveredId !== null && !isHovered;

          return (
            <motion.div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              animate={{
                opacity: isAnotherHovered ? 0.35 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={item.href} className="block outline-none">
                {/* Photo Frame Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xs bg-[#F8E8B2] mb-6 border border-[#211D18]/15 shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover contrast-105 transition-all duration-700 ease-out ${
                      isHovered ? "scale-105 grayscale-0" : "scale-100 grayscale-[0.2] opacity-90"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211D18]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top-left number badge */}
                  <div className="absolute top-5 left-5 font-mono text-xs text-[#F5F1E8] tracking-widest pointer-events-none drop-shadow">
                    {item.number}
                  </div>
                </div>

                {/* Editorial Title & Quote Block */}
                <div className="flex flex-col gap-2 relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-[#B87932] tracking-widest font-semibold">
                        {item.number}
                      </span>
                      <motion.h3
                        className="font-serif italic text-3xl md:text-4xl text-[#211D18] tracking-wide"
                        animate={
                          shouldReduceMotion
                            ? {}
                            : { x: isHovered ? 6 : 0 }
                        }
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {item.title}
                      </motion.h3>
                    </div>

                    {/* Explore Indicator */}
                    <motion.div
                      className="text-[#211D18]"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -6,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5 stroke-[1.5]" />
                    </motion.div>
                  </div>

                  <p className="font-sans text-sm text-[#473D33] max-w-md pl-8 font-normal tracking-wide leading-relaxed">
                    {item.quote}
                  </p>
                </div>
              </Link>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
