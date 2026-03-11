"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], label, input[type="button"], input[type="submit"], input[type="reset"], .cursor-interactive';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect touch / coarse pointer devices – use default cursor/behavior there
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (coarse) {
      setIsCoarsePointer(true);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = !!target.closest(INTERACTIVE_SELECTOR);
      const isTextInput = !!target.closest('input, textarea, [contenteditable="true"]');

      setIsActive(isInteractive);
      setIsHidden(isTextInput);
    };

    const handleMouseOut = () => {
      setIsActive(false);
      setIsHidden(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (isCoarsePointer) {
    // On touch / coarse devices, keep the native behavior
    return null;
  }

  const commonVisibility =
    !isVisible || isHidden
      ? { opacity: 0 }
      : {
          opacity: 1,
        };

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent"
        style={{ width: 6, height: 6 }}
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          scale: isActive ? 0.8 : 1,
          ...commonVisibility,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.3,
        }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-accent/70 bg-accent/5 backdrop-blur-sm"
        style={{ width: 28, height: 28 }}
        animate={{
          x: position.x - 14,
          y: position.y - 14,
          scale: isActive ? 1.2 : 1,
          ...commonVisibility,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 26,
          mass: 0.4,
        }}
      />
    </>
  );
}
