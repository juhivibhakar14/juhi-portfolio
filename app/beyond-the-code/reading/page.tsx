"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";

export default function ReadingPage() {
  return (
    <div className="min-h-screen bg-[#F3EDE3] text-[#211D18] relative font-sans selection:bg-[#B87932] selection:text-white pb-24">
      <FilmGrainOverlay />

      {/* Header */}
      <header className="p-6 md:p-10 flex items-center justify-between border-b border-[#211D18]/15 relative z-10">
        <Link
          href="/beyond-the-code"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B87932] hover:text-[#211D18] transition-colors group font-semibold"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← back to Beyond the Code</span>
        </Link>
        <span className="font-mono text-xs tracking-widest uppercase text-[#B87932] font-semibold">
          01 // READING
        </span>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 pt-16 relative z-10">
        <div className="mb-16 border-b border-[#211D18]/15 pb-12">
          <span className="font-mono text-xs text-[#B87932] uppercase tracking-[0.25em] block mb-3 font-semibold">
            [ Personal Journal // 01 ]
          </span>
          <h1 className="font-serif italic text-4xl md:text-6xl text-[#211D18] font-normal tracking-wide mb-4">
            READING
          </h1>
          <p className="font-serif text-xl md:text-2xl text-[#524639] italic max-w-2xl leading-relaxed">
            Stories, ideas, and perspectives that stay with me.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-7 relative aspect-[4/5] overflow-hidden rounded-xs border border-[#211D18]/15 bg-[#F8E8B2] shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000"
              alt="Reading"
              fill
              className="object-cover contrast-105"
            />
          </div>

          <div className="md:col-span-5 flex flex-col gap-8 md:pt-12">
            <div className="border-l-2 border-[#B87932] pl-6 space-y-3">
              <span className="font-mono text-xs text-[#B87932] uppercase tracking-widest block font-semibold">
                Library & Notes
              </span>
              <h3 className="font-serif text-2xl text-[#211D18] italic">
                Invisible Cities &mdash; Italo Calvino
              </h3>
              <p className="font-sans text-sm text-[#473D33] font-normal leading-relaxed">
                Essays, fiction, design theory, and philosophy that shape how I think about craft and human experience.
              </p>
            </div>

            <div className="p-6 bg-[#F8E8B2] rounded border border-[#211D18]/15 shadow-sm">
              <p className="font-serif text-base text-[#211D18] italic">
                &ldquo;Memory&apos;s images, once fixed in words, are erased. Perhaps I am afraid of losing Venice all at once, if I speak of it.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

