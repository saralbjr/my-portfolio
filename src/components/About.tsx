"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, MapPin, BookOpen } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="section-inner">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            A creative BCA graduate passionate about digital marketing, SEO, and visual storytelling.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Profile Image Column */}
          <motion.div
            className="flex-shrink-0 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Profile Image Wrapper */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto group">
              {/* Animated ambient glow behind profile */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-accent/20 group-hover:border-accent/50 transition-colors bg-background-secondary shadow-2xl z-10">
                <Image
                  src="/images/profile.jpg"
                  alt="Saral Bajracharya Profile Picture"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 192px, 224px"
                  priority
                  quality={90}
                />
              </div>
            </div>
          </motion.div>

          {/* Biography Column */}
          <motion.div
            className="flex-1 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold">
              Hi, I&apos;m <span className="text-accent">Saral Bajracharya</span>
            </h3>

            <p className="text-foreground-muted leading-relaxed text-base">
              I am a creative and motivated{" "}
              <strong className="text-foreground font-semibold">Bachelor of Computer Application (BCA)</strong>{" "}
              graduate with a strong passion for digital marketing and online communication channels. I love exploring search engine optimization (SEO), developing content, planning social media feeds, and building cohesive online brands.
            </p>

            <p className="text-foreground-muted leading-relaxed text-sm">
              My background mixes technical foundational understandings from computer studies with digital promotion tactics. I am eager to apply positive customer interactions, caption writing, and post-scheduling skills to expand organic audiences and learn continuously in fast-paced workspaces.
            </p>

            <div className="pt-4 flex justify-center lg:justify-start">
              <a
                href="/Saral-Bajracharya-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl shadow-lg shadow-accent/15 hover:shadow-accent/30 transition-all duration-300 hover:scale-[1.02] text-sm"
              >
                <Download size={16} />
                View CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
