import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BeyondTheCode from "@/components/BeyondTheCode";

export default function BeyondTheCodePage() {
  return (
    <div className="min-h-screen bg-[#F3EDE3] text-[#10251D] relative flex flex-col font-sans selection:bg-[#18352A] selection:text-[#F3EDE3]">
      {/* Navigation Header */}
      <header className="p-6 md:p-10 flex items-center justify-between border-b border-[#18352A]/15 relative z-10 max-w-[1200px] w-full mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#18352A] hover:text-[#10251D] font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="font-sans font-bold text-lg tracking-tight text-[#10251D]">
          Juhi Vibhakar
        </span>
      </header>

      {/* Main Beyond the Code Gallery */}
      <main className="flex-1 w-full relative z-10">
        <BeyondTheCode />
      </main>
    </div>
  );
}
