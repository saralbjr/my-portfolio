"use client";

import { useEffect, useRef } from "react";

/**
 * CosmicBackground — a lightweight, GPU-accelerated starfield + nebula + shooting stars.
 * Uses a single <canvas> for the star particles (performant) and CSS-animated
 * elements for nebula glows and shooting stars.
 */

const STAR_COUNT = 180;
const SHOOTING_STAR_COUNT = 4;

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const drawStars = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.fill();

        // Subtle glow for larger stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140, 180, 255, ${alpha * 0.1})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(drawStars);
    };

    resize();
    initStars();
    animFrameRef.current = requestAnimationFrame(drawStars);

    const handleResize = () => {
      resize();
      initStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Nebula Glows — soft radial gradients that drift slowly */}
      <div
        className="cosmic-nebula cosmic-nebula-1"
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "45vw",
          height: "45vw",
          maxWidth: 600,
          maxHeight: 600,
          background:
            "radial-gradient(circle, rgba(14,165,233,0.06) 0%, rgba(14,165,233,0.02) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "nebula-drift-1 25s ease-in-out infinite",
        }}
      />
      <div
        className="cosmic-nebula cosmic-nebula-2"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "40vw",
          height: "40vw",
          maxWidth: 550,
          maxHeight: 550,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, rgba(139,92,246,0.02) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "nebula-drift-2 30s ease-in-out infinite",
        }}
      />
      <div
        className="cosmic-nebula cosmic-nebula-3"
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          width: "35vw",
          height: "35vw",
          maxWidth: 450,
          maxHeight: 450,
          background:
            "radial-gradient(circle, rgba(14,165,233,0.04) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          animation: "nebula-drift-3 20s ease-in-out infinite",
        }}
      />

      {/* Shooting Stars — pure CSS animated streaks */}
      {Array.from({ length: SHOOTING_STAR_COUNT }).map((_, i) => (
        <div
          key={i}
          className="shooting-star"
          style={{
            position: "absolute",
            top: `${8 + Math.random() * 40}%`,
            left: `${Math.random() * 70}%`,
            width: `${60 + Math.random() * 80}px`,
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(200,220,255,0.8), transparent)",
            borderRadius: "1px",
            opacity: 0,
            transform: "rotate(-35deg)",
            animation: `shooting-star ${3 + i * 2}s ease-in-out ${i * 4}s infinite`,
          }}
        />
      ))}

      {/* Subtle vignette overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(11,17,33,0.4) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
