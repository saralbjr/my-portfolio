"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, FolderOpen } from "lucide-react";

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-grid">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-inner w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-[var(--nav-height)]">
        {/* Left: Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Open to opportunities
          </motion.div>

          <h1 className="mb-4 tracking-tight">
            Hi, I&apos;m{" "}
            <span className="gradient-text">Saral</span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground-muted font-medium mb-3">
            Full Stack Developer{" "}
            <span className="text-accent">|</span> MERN{" "}
            <span className="text-accent">|</span> Next.js
          </p>

          <p className="text-foreground-muted max-w-lg mx-auto lg:mx-0 mb-8 text-base leading-relaxed">
            I build clean, performant, and scalable web applications.
            Passionate about turning ideas into real products with modern
            technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
            <button
              onClick={() => handleScroll("#projects")}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:scale-[1.03]"
            >
              <FolderOpen size={18} />
              View Projects
            </button>
            <button
              onClick={() => handleScroll("#contact")}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground font-semibold rounded-xl border border-card-border hover:border-accent/30 transition-all duration-300 hover:scale-[1.03]"
            >
              <Mail size={18} />
              Contact Me
            </button>
          </div>
        </motion.div>

        {/* Right: Hero Visual */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-accent/20 animate-pulse-glow" />
            {/* Inner gradient orb */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent/20 via-purple-500/10 to-transparent backdrop-blur-sm" />
            {/* Code decoration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-card p-6 text-sm font-mono text-foreground-muted space-y-2 animate-float">
                <p>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-accent">developer</span>{" "}
                  <span className="text-foreground-muted">=</span> {"{"}
                </p>
                <p className="pl-4">
                  <span className="text-green-400">name</span>:{" "}
                  <span className="text-amber-300">&quot;Saral&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-green-400">stack</span>:{" "}
                  <span className="text-amber-300">&quot;MERN&quot;</span>,
                </p>
                <p className="pl-4">
                  <span className="text-green-400">passion</span>:{" "}
                  <span className="text-amber-300">&quot;Building&quot;</span>,
                </p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.button
          onClick={() => handleScroll("#about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-foreground-muted hover:text-accent transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown size={22} />
        </motion.button>
      </motion.div>
    </section>
  );
}
