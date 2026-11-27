"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FilmGrainOverlay from "./FilmGrainOverlay";
import styles from "./BeyondTheCode.module.css";

interface Chapter {
  number: string;
  category: string;
  title: string;
  text: string;
  link: string;
  href: string;
  image: string;
  alt: string;
  showCaption?: boolean;
  captionText?: string;
}

// ─── Chapters Data ────────────────────────────────────────────────────────────
const chapters: Chapter[] = [
  {
    number: "01",
    category: "Sketchbook Studies",
    title: "Drawing",
    text: "Ink and graphite studies. Slow lines, mostly plants and things on my desk.",
    link: "Open the sketchbook",
    href: "/beyond-the-code/drawing",
    image: "/images/sketch.jpg",
    alt: "Graphite and ink studies of plants and everyday objects on a studio desk",
    showCaption: false,
    captionText: "",
  },
  {
    number: "02",
    category: "Notes & Quotes",
    title: "Reading",
    text: "Currently reading Invisible Cities. I keep the lines that stay with me.",
    link: "Read my notes and quotes",
    href: "/beyond-the-code/reading",
    image: "/images/book.jpg",
    alt: "Open edition of Invisible Cities surrounded by book notes and thoughts",
    showCaption: true,
    captionText: "Invisible Cities · Italo Calvino",
  },
  {
    number: "03",
    category: "Bakes & Recipes",
    title: "Cooking",
    text: "Latest bake: a wild berry galette. Twenty-five minutes of prep, thirty-five in the oven.",
    link: "See the recipes",
    href: "/beyond-the-code/cooking",
    image: "/images/galette.jpg",
    alt: "A rustic wild berry galette warm from the oven on dark parchment paper",
    showCaption: false,
    captionText: "",
  },
];

// Lightweight blur data URL
const BLUR_DATA_URL =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Crect width='4' height='5' fill='%2310251D'/%3E%3C/svg%3E";

interface ChapterPhotoProps {
  chapter: Chapter;
  index: number;
  isRhythm: boolean;
}

// ─── Photo Component with Scroll Reveal ───────────────────────────────────────
function ChapterPhoto({ chapter, index, isRhythm }: ChapterPhotoProps) {
  const photoRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = photoRef.current;
    if (!el) return;

    // Reduced motion is also handled via CSS @media (prefers-reduced-motion: reduce)
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={photoRef}
      className={`${styles.photoFrame} ${isRevealed ? styles.photoRevealed : ""} ${
        isRhythm ? styles.photoRhythm : ""
      }`}
    >
      <Image
        src={chapter.image}
        alt={chapter.alt}
        fill
        sizes="(max-width: 820px) 100vw, (max-width: 1200px) 50vw, 560px"
        style={{ objectFit: "cover" }}
        className={styles.image}
        priority={index === 0}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />

      {/* Film Grain Texture Overlay */}
      <div className={styles.grainOverlay} aria-hidden="true">
        <svg
          className={styles.grainSvg}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <filter id={`btc-grain-${index}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter={`url(#btc-grain-${index})`}
          />
        </svg>
      </div>

      {/* Optional Caption Overlay */}
      {chapter.showCaption && chapter.captionText && (
        <span className={styles.photoCaption}>{chapter.captionText}</span>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BeyondTheCode() {
  return (
    <section className={styles.section} aria-label="Beyond the Code">
      <FilmGrainOverlay />

      <div className={styles.container}>
        {/* Header matched to Through the Code */}
        <div className={styles.header}>
          <div>
            <span className={styles.headerEyebrow}>
              Personal Notes &amp; Interests
            </span>
            <h2 className={styles.headerTitle}>BEYOND THE CODE</h2>
          </div>
          <p className={styles.headerDescription}>
            A few things I enjoy, read, and explore outside of work. A personal
            creative diary behind the engineering.
          </p>
        </div>

        {/* 01, 02, 03 Chapters List */}
        <div className={styles.chaptersList}>
          {chapters.map((chapter, index) => {
            const isReversed = index % 2 === 1;
            const isRhythm = index === 1;

            return (
              <article
                key={chapter.title}
                className={`${styles.chapter} ${
                  isReversed ? styles.chapterReversed : styles.chapterNormal
                }`}
              >
                <div className={styles.photoColumn}>
                  <ChapterPhoto
                    chapter={chapter}
                    index={index}
                    isRhythm={isRhythm}
                  />
                </div>

                <div className={styles.textColumn}>
                  <div className={styles.chapterMeta}>
                    <span className={styles.chapterNumber}>
                      {chapter.number}
                    </span>
                    <h3 className={styles.chapterCategory}>
                      {chapter.category}
                    </h3>
                    <div className={styles.dividerLine} />
                  </div>

                  <h4 className={styles.chapterTitle}>{chapter.title}</h4>

                  <p className={styles.chapterText}>{chapter.text}</p>

                  <Link href={chapter.href} className={styles.chapterLink}>
                    <span>{chapter.link}</span>
                    <ArrowUpRight className={styles.linkIcon} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
