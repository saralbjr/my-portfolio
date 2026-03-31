"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], label, input[type="button"], input[type="submit"], input[type="reset"], .cursor-interactive';

/* ── CSS keyframes injected once ── */
const CURSOR_STYLES = `
@keyframes cursor-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes cursor-spin-reverse {
  from { transform: translate(-50%, -50%) rotate(360deg); }
  to   { transform: translate(-50%, -50%) rotate(0deg); }
}
@keyframes cursor-breathe {
  0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
  50%      { opacity: 0.3;  transform: translate(-50%, -50%) scale(1.15); }
}
@keyframes cursor-core-pulse {
  0%, 100% { box-shadow: 0 0 6px 2px var(--accent), 0 0 12px 4px rgba(14,165,233,0.3); }
  50%      { box-shadow: 0 0 10px 3px var(--accent), 0 0 20px 8px rgba(14,165,233,0.15); }
}
@keyframes cursor-orbit {
  from { transform: rotate(0deg) translateX(20px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(20px) rotate(-360deg); }
}
@keyframes cursor-orbit-active {
  from { transform: rotate(0deg) translateX(12px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
}
`;

export default function CustomCursor() {
  const cursorWrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const stylesInjected = useRef(false);

  const state = useRef({
    visible: false,
    active: false,
    hidden: false,
  });

  // Inject keyframe styles once
  useEffect(() => {
    if (stylesInjected.current || typeof document === "undefined") return;
    const style = document.createElement("style");
    style.textContent = CURSOR_STYLES;
    document.head.appendChild(style);
    stylesInjected.current = true;
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const applyVisualEffects = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const innerRing = innerRingRef.current;
    const glow = glowRef.current;
    const particles = particlesRef.current;

    if (!dot || !ring || !innerRing || !glow || !particles) return;

    const { visible, active, hidden } = state.current;
    const opacity = !visible || hidden ? 0 : 1;

    if (active) {
      // Hover: everything contracts, intensifies
      dot.style.opacity = String(opacity);
      dot.style.width = "10px";
      dot.style.height = "10px";

      ring.style.opacity = String(opacity * 0.9);
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.borderColor = "var(--accent)";
      ring.style.animationDuration = "2s";

      innerRing.style.opacity = String(opacity * 0.6);
      innerRing.style.width = "20px";
      innerRing.style.height = "20px";

      glow.style.animation = `cursor-breathe 1.5s ease-in-out infinite`;
      glow.style.opacity = String(opacity * 0.35);

      // Tighten orbits
      const orbs = particles.children;
      for (let i = 0; i < orbs.length; i++) {
        (orbs[i] as HTMLElement).style.animation =
          `cursor-orbit-active ${2.5 + i * 0.8}s linear infinite`;
        (orbs[i] as HTMLElement).style.opacity = String(opacity * 0.9);
        (orbs[i] as HTMLElement).style.width = "4px";
        (orbs[i] as HTMLElement).style.height = "4px";
      }
    } else {
      // Default state
      dot.style.opacity = String(opacity);
      dot.style.width = "6px";
      dot.style.height = "6px";

      ring.style.opacity = String(opacity * 0.45);
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "var(--foreground-muted)";
      ring.style.animationDuration = "6s";

      innerRing.style.opacity = String(opacity * 0.25);
      innerRing.style.width = "24px";
      innerRing.style.height = "24px";

      glow.style.animation = `cursor-breathe 3s ease-in-out infinite`;
      glow.style.opacity = String(opacity * 0.15);

      const orbs = particles.children;
      for (let i = 0; i < orbs.length; i++) {
        (orbs[i] as HTMLElement).style.animation =
          `cursor-orbit ${3.5 + i * 1.2}s linear infinite`;
        (orbs[i] as HTMLElement).style.opacity = String(opacity * 0.6);
        (orbs[i] as HTMLElement).style.width = "3px";
        (orbs[i] as HTMLElement).style.height = "3px";
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (coarse) {
      setIsCoarsePointer(true);
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const wrapper = cursorWrapperRef.current;
      if (!wrapper) return;

      // Instant 1:1 position tracking — zero lag
      wrapper.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      if (!state.current.visible) {
        state.current.visible = true;
        applyVisualEffects();
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = !!target.closest(INTERACTIVE_SELECTOR);
      const isTextInput = !!target.closest(
        'input, textarea, [contenteditable="true"]'
      );

      state.current.active = isInteractive;
      state.current.hidden = isTextInput;
      applyVisualEffects();
    };

    const handleMouseOut = () => {
      state.current.active = false;
      state.current.hidden = false;
      applyVisualEffects();
    };

    // Hide cursor when mouse leaves the browser window
    const handleDocLeave = () => {
      const wrapper = cursorWrapperRef.current;
      if (wrapper) wrapper.style.opacity = "0";
    };

    const handleDocEnter = () => {
      const wrapper = cursorWrapperRef.current;
      if (wrapper) wrapper.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleDocLeave);
    document.documentElement.addEventListener("mouseenter", handleDocEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleDocLeave);
      document.documentElement.removeEventListener("mouseenter", handleDocEnter);
    };
  }, [applyVisualEffects]);

  if (isCoarsePointer) return null;

  return (
    <div
      ref={cursorWrapperRef}
      className="fixed top-0 left-0 z-[10000] pointer-events-none"
      style={{ willChange: "transform", transition: "opacity 0.2s ease" }}
    >
      {/* 1. Breathing Ambient Glow */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: 90,
          height: 90,
          opacity: 0,
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(18px)",
          transform: "translate(-50%, -50%)",
          animation: "cursor-breathe 3s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* 2. Outer Spinning Dashed Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: 36,
          height: 36,
          opacity: 0,
          border: "1.5px dashed var(--foreground-muted)",
          animation: "cursor-spin 6s linear infinite",
          willChange: "transform, opacity",
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, opacity 0.3s ease",
        }}
      />

      {/* 3. Inner Counter-Spinning Ring */}
      <div
        ref={innerRingRef}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: 24,
          height: 24,
          opacity: 0,
          border: "1px solid var(--accent)",
          animation: "cursor-spin-reverse 4s linear infinite",
          willChange: "transform, opacity",
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
        }}
      />

      {/* 4. Orbiting Particles */}
      <div
        ref={particlesRef}
        className="absolute top-0 left-0"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent"
            style={{
              width: 3,
              height: 3,
              top: "50%",
              left: "50%",
              marginTop: -1.5,
              marginLeft: -1.5,
              opacity: 0,
              boxShadow: "0 0 6px 1px var(--accent)",
              animation: `cursor-orbit ${3.5 + i * 1.2}s linear infinite`,
              animationDelay: `${i * -1.2}s`,
              willChange: "transform",
              transition: "opacity 0.3s ease, width 0.2s ease, height 0.2s ease",
            }}
          />
        ))}
      </div>

      {/* 5. Luminous Core with Pulse */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full bg-white"
        style={{
          width: 6,
          height: 6,
          opacity: 0,
          transform: "translate(-50%, -50%)",
          animation: "cursor-core-pulse 2s ease-in-out infinite",
          willChange: "transform, opacity",
          transition:
            "width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease",
        }}
      />
    </div>
  );
}
