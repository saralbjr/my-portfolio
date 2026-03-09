"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { experiences } from "@/data/experience";

type ExperienceData = (typeof experiences)[0];

function ExperienceCard({ exp, index }: { exp: ExperienceData; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE = 2;
  const hasMore = exp.achievements.length > MAX_VISIBLE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background shadow-lg shadow-accent/30 z-10 mt-7" />

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />

      {/* Card */}
      <div className="flex-1 ml-14 md:ml-0">
        <div className="glass-card p-6 hover:border-accent/30 transition-all duration-300">
          <div className="flex items-center gap-2 text-accent mb-1">
            <Briefcase size={16} />
            <span className="text-sm font-semibold">{exp.company}</span>
          </div>
          <h3 className="text-lg font-bold mb-1">{exp.title}</h3>
          <div className="flex items-center gap-2 text-foreground-muted text-sm mb-4">
            <Calendar size={14} />
            {exp.dateRange}
          </div>
          <p className="text-foreground-muted text-sm leading-relaxed mb-4">{exp.description}</p>

          <ul className="space-y-2 relative">
            <AnimatePresence initial={false}>
              {exp.achievements.map((item, j) => {
                if (!isExpanded && j >= MAX_VISIBLE) return null;
                return (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-start gap-2 text-sm text-foreground-muted overflow-hidden"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="flex-1">{item}</span>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {hasMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors uppercase tracking-wider"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Show More <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative">
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
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent" />

          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
