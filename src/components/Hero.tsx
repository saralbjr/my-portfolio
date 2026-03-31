"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, FolderOpen } from "lucide-react";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="section-inner w-full flex flex-col items-center justify-center pt-[var(--nav-height)]">
        {/* Centered Text Content */}
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="mb-4 tracking-tight text-5xl md:text-6xl lg:text-7xl font-bold">
            Hey 👋 I&apos;m <span className="gradient-text">Saral</span>
          </h1>

          <div className="text-xl md:text-2xl text-foreground-muted font-medium mb-3 min-h-[40px]">
            <Typewriter
              options={{
                strings: [
                  'Software Developer',
                  'Software Architecture',
                  'Keen Learner',
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>

          <p className="text-foreground-muted max-w-lg mx-auto mb-8 text-base leading-relaxed">
            I build clean, performant, and scalable web applications. Passionate about turning ideas
            into real products with modern technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 justify-center">
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
