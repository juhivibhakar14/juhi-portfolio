"use client";

import React, { useEffect, useState, useRef } from "react";

interface JitterTextProps {
  text: string;
  isHovered: boolean;
  shouldReduceMotion?: boolean;
  className?: string;
}

export default function JitterText({
  text,
  isHovered,
  shouldReduceMotion = false,
  className = "",
}: JitterTextProps) {
  const words = text.split(" ");
  const animFrameRef = useRef<number | null>(null);

  // Store letter offsets: array of { x: number, y: number, rot: number }
  const [offsets, setOffsets] = useState<Array<{ x: number; y: number; rot: number }>>(() =>
    text.split("").map(() => ({ x: 0, y: 0, rot: 0 }))
  );

  useEffect(() => {
    if (!isHovered || shouldReduceMotion) {
      setOffsets(text.split("").map(() => ({ x: 0, y: 0, rot: 0 })));
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const seeds = text.split("").map((_, i) => ({
      freqX: 0.003 + (i % 5) * 0.0012,
      freqY: 0.004 + (i % 7) * 0.0011,
      freqR: 0.0025 + (i % 3) * 0.0015,
      phaseX: i * 1.7,
      phaseY: i * 2.3,
      phaseR: i * 0.9,
    }));

    const updateJitter = (time: number) => {
      const newOffsets = seeds.map((s) => {
        // Continuous sine wave superposition for smooth organic handheld jitter
        const x = Math.sin(time * s.freqX + s.phaseX) * 0.45 + Math.cos(time * s.freqX * 1.5) * 0.1;
        const y = Math.cos(time * s.freqY + s.phaseY) * 0.45 + Math.sin(time * s.freqY * 1.3) * 0.1;
        const rot = Math.sin(time * s.freqR + s.phaseR) * 0.28;

        return {
          x: Math.max(-0.5, Math.min(0.5, x)),
          y: Math.max(-0.5, Math.min(0.5, y)),
          rot: Math.max(-0.3, Math.min(0.3, rot)),
        };
      });

      setOffsets(newOffsets);
      animFrameRef.current = requestAnimationFrame(updateJitter);
    };

    animFrameRef.current = requestAnimationFrame(updateJitter);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, shouldReduceMotion, text]);

  let globalCharIdx = 0;

  return (
    <span className={className}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="block whitespace-nowrap">
          {word.split("").map((char) => {
            const charIdx = globalCharIdx++;
            const offset = offsets[charIdx] || { x: 0, y: 0, rot: 0 };

            return (
              <span
                key={charIdx}
                className="inline-block transition-transform duration-75 ease-out"
                style={{
                  transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${offset.rot}deg)`,
                  willChange: "transform",
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
