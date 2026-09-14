"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FilmGrainOverlay from "@/components/FilmGrainOverlay";
import EditorialJournalSection from "@/components/EditorialJournalSection";

export default function BeyondTheCodePage() {
  return (
    <div className="min-h-screen bg-[#F3EDE3] text-[#211D18] relative flex flex-col font-sans selection:bg-[#B87932] selection:text-white">
      <FilmGrainOverlay />

      {/* Header */}
      <header className="p-6 md:p-10 flex items-center justify-between border-b border-[#211D18]/15 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B87932] hover:text-[#211D18] transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="font-serif italic text-lg text-[#211D18]">
          Juhi Vibhakar
        </span>
      </header>

      {/* Main Editorial Section */}
      <main className="flex-1 w-full relative z-10">
        <EditorialJournalSection />
      </main>
    </div>
  );
}



