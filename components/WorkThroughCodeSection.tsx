"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FilmGrainOverlay from "./FilmGrainOverlay";

interface WorkProject {
  title: string;
  category: string;
  description: string;
  tech: string[];
}

const PROFESSIONAL_PROJECTS: WorkProject[] = [
  {
    title: "Enterprise Design System & Platform",
    category: "Full Stack / Architecture",
    description: "Scalable frontend micro-architecture and design system components built for high-throughput production applications.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Node.js"],
  },
  {
    title: "High-Performance Data Dashboard",
    category: "Systems & Performance",
    description: "Real-time stream visualization interface handling multi-region telemetry data with sub-100ms latency.",
    tech: ["React", "WebSockets", "GraphQL", "PostgreSQL"],
  },
];

const PERSONAL_PROJECTS: WorkProject[] = [
  {
    title: "Generative Canvas & Shader Playground",
    category: "Creative Engineering",
    description: "An experimental interactive web space exploring WebGL fragment shaders and generative math patterns.",
    tech: ["Three.js", "WebGL", "TypeScript"],
  },
  {
    title: "Minimalist Markdown Knowledge Engine",
    category: "Open Source Tooling",
    description: "Local-first note-taking engine with graph visualization and fast full-text vector index.",
    tech: ["Next.js", "Rust / Wasm", "TailwindCSS"],
  },
];

export default function WorkThroughCodeSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative w-full py-20 md:py-32 px-6 md:px-16 bg-[#DDD3C5] text-[#10251D] overflow-hidden selection:bg-[#18352A] selection:text-[#DDD3C5] font-sans border-t border-[#18352A]/15">
      <FilmGrainOverlay />

      {/* Blueprint Grid Subtle Background Overlay */}
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(24, 53, 42, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(24, 53, 42, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16 md:mb-24 border-b border-[#18352A]/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[#18352A] uppercase tracking-[0.25em] block mb-3 font-semibold">
            [ SYSTEM // WORK &amp; EXPERIMENTS ]
          </span>
          <h2 className="font-sans font-bold text-4xl md:text-6xl text-[#10251D] tracking-tight leading-none">
            THROUGH THE CODE
          </h2>
        </div>
        <p className="font-sans text-sm text-[#2D4A3E] max-w-sm font-normal leading-relaxed">
          What I engineer, enterprise platforms I contribute to, and open-source projects I build.
        </p>
      </div>

      {/* 01 & 02: PROFESSIONAL & PERSONAL WORK SECTION */}
      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        {/* 01 - PROFESSIONAL WORK */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-[#18352A] tracking-widest font-semibold">[ 01 ]</span>
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[#10251D] font-bold">
              PROFESSIONAL WORK
            </h3>
            <div className="h-[1px] flex-1 bg-[#18352A]/15" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROFESSIONAL_PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#10251D] rounded border border-[#18352A]/30 hover:border-[#10251D] transition-all duration-300 flex flex-col justify-between group shadow-md text-[#FDF6E3]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs text-[#AFC5A9] tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-[#AFC5A9] group-hover:text-[#FDF6E3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <h4 className="font-sans font-semibold text-xl text-[#FDF6E3] mb-3">
                    {project.title}
                  </h4>
                  <p className="font-sans text-sm text-[#AAB8AD] font-normal leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap pt-4 border-t border-[#AFC5A9]/15">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase text-[#FDF6E3] bg-[#18352A] px-2.5 py-1 rounded border border-[#AFC5A9]/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 02 - PERSONAL WORK */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs text-[#18352A] tracking-widest font-semibold">[ 02 ]</span>
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[#10251D] font-bold">
              PERSONAL EXPERIMENTS
            </h3>
            <div className="h-[1px] flex-1 bg-[#18352A]/15" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PERSONAL_PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#10251D] rounded border border-[#18352A]/30 hover:border-[#10251D] transition-all duration-300 flex flex-col justify-between group shadow-md text-[#FDF6E3]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs text-[#AFC5A9] tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-[#AFC5A9] group-hover:text-[#FDF6E3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <h4 className="font-sans font-semibold text-xl text-[#FDF6E3] mb-3">
                    {project.title}
                  </h4>
                  <p className="font-sans text-sm text-[#AAB8AD] font-normal leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap pt-4 border-t border-[#AFC5A9]/15">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase text-[#FDF6E3] bg-[#18352A] px-2.5 py-1 rounded border border-[#AFC5A9]/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 03 - LEARNING JOURNEY */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-xs text-[#18352A] tracking-widest font-semibold">[ 03 ]</span>
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[#10251D] font-bold">
              LEARNING JOURNEY &amp; EVOLUTION
            </h3>
            <div className="h-[1px] flex-1 bg-[#18352A]/15" />
          </div>

          {/* Blueprint style vertical progression pipeline */}
          <div className="relative border-l border-[#18352A]/30 pl-6 md:pl-10 ml-3 md:ml-6 space-y-12">
            {[
              {
                stage: "JavaScript",
                learned: "ES6+, Event Loop, DOM API, Asynchronous Promises & Closures",
                built: "Interactive UI widgets & vanilla JS DOM manipulation engines",
                understood: "Single-threaded execution stack and browser event dispatch mechanics",
                exploreNext: "Component-driven declarative architectures",
              },
              {
                stage: "React",
                learned: "Virtual DOM reconciliation, custom hooks & state synchronization",
                built: "Complex dynamic forms, dashboard interfaces & reusable design systems",
                understood: "Declarative UI trees and immutability principles in web apps",
                exploreNext: "Server-side rendering, routing & full-stack frameworks",
              },
              {
                stage: "Next.js",
                learned: "Server Components, App Router, SSR/SSG/ISR rendering & route handlers",
                built: "Editorial storytelling websites, portfolio architectures & static blogs",
                understood: "Hybrid client-server execution boundaries & web performance metrics",
                exploreNext: "Distributed backend microservices & databases",
              },
              {
                stage: "Backend & Databases",
                learned: "Node.js REST/GraphQL APIs, PostgreSQL schema design & ORMs",
                built: "Authenticated REST services, data streaming endpoints & SQL databases",
                understood: "Data persistence, index optimization & API protocol contracts",
                exploreNext: "Full Stack end-to-end architecture & AI agents",
              },
              {
                stage: "Full Stack & AI",
                learned: "LLM orchestration, vector embeddings, agentic workflows & deployment",
                built: "AI-assisted developer tooling, RAG search engines & intelligent UI apps",
                understood: "Human-AI pair programming workflows & autonomous agent systems",
                exploreNext: "High-performance distributed systems & generative WebGL shaders",
              },
            ].map((node, i, arr) => (
              <div key={node.stage} className="relative group">
                {/* Pin dot indicator */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#10251D] border border-[#18352A] group-hover:bg-[#18352A] transition-colors" />

                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#18352A] tracking-wider font-semibold">
                      0{i + 1}
                    </span>
                    <h4 className="font-sans font-bold text-xl md:text-2xl text-[#10251D] tracking-wide">
                      {node.stage}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#10251D] text-[#FDF6E3] p-6 rounded border border-[#18352A]/30 shadow-md">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#AFC5A9] uppercase tracking-widest block font-semibold">
                        WHAT I LEARNED
                      </span>
                      <p className="font-sans text-xs text-[#AAB8AD] font-normal">
                        {node.learned}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#AFC5A9] uppercase tracking-widest block font-semibold">
                        WHAT I BUILT
                      </span>
                      <p className="font-sans text-xs text-[#AAB8AD] font-normal">
                        {node.built}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#AFC5A9] uppercase tracking-widest block font-semibold">
                        WHAT I UNDERSTOOD
                      </span>
                      <p className="font-sans text-xs text-[#AAB8AD] font-normal">
                        {node.understood}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#AFC5A9] uppercase tracking-widest block font-semibold">
                        WHAT I WANT TO EXPLORE NEXT
                      </span>
                      <p className="font-sans text-xs text-[#AAB8AD] font-normal">
                        {node.exploreNext}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow down connector */}
                {i < arr.length - 1 && (
                  <div className="font-mono text-xs text-[#18352A]/50 my-3 select-none">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
