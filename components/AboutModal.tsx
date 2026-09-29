"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Mail, GitBranch, BriefcaseBusiness, FileText } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string;
}

export default function AboutModal({
  isOpen,
  onClose,
  imageSrc = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000",
}: AboutModalProps) {
  const shouldReduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent background body scroll while modal is open & listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      // Basic focus trapping inside modal
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none">
          {/* Dark semi-transparent backdrop (~250ms fade) */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-0"
          />

          {/* Modal Container */}
          <motion.div
            key="modal-content"
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-modal-title"
            initial={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0, scale: 1 }
                : { opacity: 0, scale: 0.95, y: 10 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative z-10 w-full max-w-md bg-[#121212] border border-white/10 text-white rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              {/* Larger Photo Reveal (Full Color) */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/20 mb-5 shadow-lg bg-neutral-900">
                <Image
                  src={imageSrc}
                  alt="Juhi Vibhakar profile photo"
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* Name & Title */}
              <h2
                id="about-modal-title"
                className="text-2xl md:text-3xl font-serif italic text-white mb-1"
              >
                Juhi Vibhakar
              </h2>
              <p className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
                Software Engineer &amp; Creative Explorer
              </p>

              {/* Bio Intro */}
              <p className="text-sm leading-relaxed text-neutral-300 mb-6 font-sans">
                Building software, making things, and collecting ideas along the way.
                Driven by clean code, thoughtful interface design, and quiet curiosity.
              </p>

              {/* Quick Links */}
              <div className="flex items-center justify-center gap-3 w-full pt-2 border-t border-white/10">
                <a
                  href="mailto:juhi@example.com"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <BriefcaseBusiness className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg transition-colors text-white/80 hover:text-white"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
