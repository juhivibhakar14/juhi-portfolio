"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function FilmGrainOverlay() {
  const shouldReduceMotion = useReducedMotion();
  const [grainSeed, setGrainSeed] = useState(1);
  const [transformOffset, setTransformOffset] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let lastTime = 0;
    const animate = (time: number) => {
      // Update grain seed/offset every ~60ms (~16fps grain refresh rate)
      if (time - lastTime > 60) {
        lastTime = time;
        setGrainSeed(Math.floor(Math.random() * 100));
        setTransformOffset({
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 8,
        });
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-overlay opacity-[0.08]">
      <svg className="w-[120%] h-[120%] -left-[10%] -top-[10%] absolute pointer-events-none">
        <filter id={`film-grain-filter-${grainSeed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            seed={grainSeed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#film-grain-filter-${grainSeed})`}
          style={{
            transform: `translate3d(${transformOffset.x}px, ${transformOffset.y}px, 0)`,
          }}
        />
      </svg>
    </div>
  );
}
