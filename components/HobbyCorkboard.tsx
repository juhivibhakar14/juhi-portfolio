"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail, GitBranch, BriefcaseBusiness } from "lucide-react";
import FilmGrainOverlay from "./FilmGrainOverlay";

// ─── Data ───────────────────────────────────────────────────────────────────

interface HobbyCard {
  id: string;
  title: string;
  note: string;
  tag: string;
  href: string;
  img: string;
  imgAlt: string;
  accent: string; // hex accent for tag badge + hover glow
  portrait: boolean; // true → aspect-[3/4], false → aspect-[16/9]
}

const HOBBIES: HobbyCard[] = [
  {
    id: "drawing",
    title: "Drawing",
    note: "Making ideas visible, one line at a time.",
    tag: "Sketchbook No. 04",
    href: "/beyond-the-code/drawing",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    imgAlt: "Sketching and drawing studies on paper with pencil and ink",
    accent: "#B87932",
    portrait: true,
  },
  {
    id: "reading",
    title: "Book Reading",
    note: "Stories & perspectives that stay with me.",
    tag: "Library Card · Invisible Cities",
    href: "/beyond-the-code/reading",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    imgAlt: "Open books stacked on a wooden table in warm light",
    accent: "#4A7A96",
    portrait: false,
  },
  {
    id: "cooking",
    title: "Cooking",
    note: "A little creativity outside the screen.",
    tag: "Recipe Index No. 12",
    href: "/beyond-the-code/cooking",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
    imgAlt: "Handmade bakes and cooking in a warm kitchen",
    accent: "#C4593C",
    portrait: false,
  },
  {
    id: "exploring",
    title: "Exploring",
    note: "Finding something new, wherever I go.",
    tag: "Map Fragment · 42°N 71°W",
    href: "/beyond-the-code/exploring",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
    imgAlt: "Scenic open road cutting through a wide landscape",
    accent: "#18352A",
    portrait: true,
  },
];

// ─── Variants ───────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function HobbyCorkboard() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<string | null>(null);

  const handleCardClick = (e: React.MouseEvent, hobby: HobbyCard) => {
    if (shouldReduceMotion) return; // Let <Link> handle it natively
    e.preventDefault();
    router.push(hobby.href);
  };

  return (
    <section
      className="relative w-full bg-[#F3EDE3] text-[#211D18] overflow-hidden selection:bg-[#B87932] selection:text-white"
      aria-label="Beyond the Code — personal interests and hobbies"
    >
      <FilmGrainOverlay />

      {/* ── Intro text ──────────────────────────────────────────────────── */}
      <div className="relative z-10 px-1 pb-8 pt-2">
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-caveat text-xl md:text-2xl text-[#575043] leading-snug max-w-2xl"
        >
          A few things I enjoy, read, and explore outside of work.{" "}
          <span className="text-[#B87932]">
            Because code alone doesn&apos;t tell the whole story.
          </span>
        </motion.p>
      </div>

      {/* ── Photo card grid ─────────────────────────────────────────────── */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-5 pb-12 px-1"
        role="list"
        aria-label="Hobby categories"
      >
        {HOBBIES.map((hobby, i) => (
          <motion.div
            key={hobby.id}
            custom={i}
            variants={shouldReduceMotion ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            role="listitem"
          >
            <Link
              href={hobby.href}
              onClick={(e) => handleCardClick(e, hobby)}
              onMouseEnter={() => setHovered(hobby.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(hobby.id)}
              onBlur={() => setHovered(null)}
              aria-label={`Explore ${hobby.title}`}
              className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B87932] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EDE3]"
            >
              <motion.article
                className="bg-[#FEFCF8] rounded-2xl overflow-hidden border border-[#211D18]/[0.07] flex flex-col"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: hovered === hobby.id ? -7 : 0,
                        boxShadow:
                          hovered === hobby.id
                            ? `0 24px 56px -12px ${hobby.accent}38, 0 8px 20px -6px rgba(33,29,24,0.1)`
                            : "0 2px 12px -2px rgba(33,29,24,0.1)",
                      }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* Image --------------------------------------------------- */}
                <div
                  className={`relative w-full overflow-hidden ${
                    hobby.portrait ? "aspect-[3/4]" : "aspect-[16/9]"
                  }`}
                >
                  <Image
                    src={hobby.img}
                    alt={hobby.imgAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={i < 2}
                  />

                  {/* Bottom vignette so the card bg doesn't clash */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                  {/* Tag badge over image ----------------------------------- */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="inline-block font-mono text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full text-white/95 backdrop-blur-sm"
                      style={{ backgroundColor: `${hobby.accent}D0` }}
                    >
                      {hobby.tag}
                    </span>
                  </div>
                </div>

                {/* Text row ------------------------------------------------- */}
                <div className="p-5 flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <h3 className="font-fraunces italic text-2xl md:text-3xl text-[#1C1A17] leading-tight">
                      {hobby.title}
                    </h3>
                    <p className="font-caveat text-[1.05rem] text-[#6B6152]">
                      {hobby.note}
                    </p>
                  </div>

                  <motion.span
                    aria-hidden="true"
                    className="mt-1 shrink-0"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            x: hovered === hobby.id ? 3 : 0,
                            y: hovered === hobby.id ? -3 : 0,
                            opacity: hovered === hobby.id ? 1 : 0.35,
                          }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight
                      className="w-5 h-5"
                      style={{ color: hobby.accent }}
                    />
                  </motion.span>
                </div>
              </motion.article>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── "Let's build something thoughtful" CTA ──────────────────────── */}
      <motion.div
        className="relative z-10 mx-1 mb-10 rounded-2xl overflow-hidden"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        style={{
          background:
            "radial-gradient(ellipse at 15% 60%, #18352A 0%, #10251D 55%, #0C1E16 100%)",
        }}
        aria-label="Let's start a conversation"
      >
        {/* Ambient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full blur-3xl opacity-20"
          style={{ background: "#B87932" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -left-12 w-56 h-56 rounded-full blur-3xl opacity-10"
          style={{ background: "#4A8C5E" }}
        />

        {/* Grid-line texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #AFC5A9 1px, transparent 1px), linear-gradient(to bottom, #AFC5A9 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 text-[#FDF6E3]">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#AFC5A9] block mb-5">
            Let&apos;s connect
          </span>

          <h3 className="font-fraunces italic text-3xl md:text-5xl text-[#FDF6E3] leading-tight mb-4">
            Let&apos;s build something thoughtful.
          </h3>

          <p className="font-space text-sm md:text-base text-[#AAB8AD] leading-relaxed mb-8 max-w-md">
            I&apos;m always open to thoughtful conversations — about code,
            craft, ideas, or whatever you&apos;re currently building. Reach
            out and let&apos;s talk.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:juhi@example.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#FDF6E3] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B87932]"
              style={{ backgroundColor: "#B87932" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#C07A28")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#B87932")
              }
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              Say hello
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#FDF6E3] border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            >
              <GitBranch className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[#FDF6E3] border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            >
              <BriefcaseBusiness className="w-4 h-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Smooth fade-out into next section ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative z-10 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #DDD3C5 100%)",
        }}
      />
    </section>
  );
}
