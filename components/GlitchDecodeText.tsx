"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#@$&*[]<>/=";

interface GlitchDecodeTextProps {
  text: string;
  isHovered: boolean;
  shouldReduceMotion?: boolean;
  className?: string;
}

export default function GlitchDecodeText({
  text,
  isHovered,
  shouldReduceMotion = false,
  className = "",
}: GlitchDecodeTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);
  const prevHoveredRef = useRef(isHovered);

  const startDecode = useCallback(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    isAnimatingRef.current = true;
    const chars = text.split("");
    const totalChars = chars.length;
    const startTime = performance.now();
    const cycleIntervalMs = 40; // ~40ms cycle rate
    const staggerDelayMs = 28; // ~28ms per character stagger delay
    const minCycles = 3; // 3-4 random cycles before lock

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      let allLocked = true;

      const currentOutput = chars.map((targetChar, i) => {
        if (targetChar === " ") return " ";

        const lockTime = i * staggerDelayMs + minCycles * cycleIntervalMs;

        if (elapsed >= lockTime) {
          return targetChar;
        } else {
          allLocked = false;
          // Random glyph from set
          const randomIndex = Math.floor(Math.random() * GLYPHS.length);
          return GLYPHS[randomIndex];
        }
      });

      setDisplayText(currentOutput.join(""));

      if (!allLocked) {
        animId = requestAnimationFrame(tick);
      } else {
        isAnimatingRef.current = false;
        setDisplayText(text);
      }
    };

    animId = requestAnimationFrame(tick);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [text, shouldReduceMotion]);

  // Initial load decode
  useEffect(() => {
    const cleanup = startDecode();
    return () => {
      if (cleanup) cleanup();
    };
  }, [startDecode]);

  // Re-trigger on hover entering
  useEffect(() => {
    if (isHovered && !prevHoveredRef.current) {
      startDecode();
    }
    prevHoveredRef.current = isHovered;
  }, [isHovered, startDecode]);

  // Render text word by word or block
  const words = displayText.split(" ");
  const originalWords = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="block">
          {word.split("").map((char, cIdx) => {
            const origChar = originalWords[wIdx]?.[cIdx];
            const isDecoded = char === origChar;
            return (
              <span
                key={cIdx}
                className={
                  isDecoded
                    ? "transition-colors duration-100 opacity-90"
                    : "text-white/60 font-mono tracking-normal"
                }
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
