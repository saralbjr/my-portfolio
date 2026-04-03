"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ChevronDown, ChevronUp, GraduationCap, BookOpen } from "lucide-react";
import { experiences } from "@/data/experience";

type ExperienceData = (typeof experiences)[0];

const education = [
  {
    id: "bca",
    degree: "Bachelor of Computer Application — BCA",
    institution: "Bhaktapur Multiple Campus, Bhaktapur",
    university: "Tribhuvan University",
    period: "2020 – 2025",
    coursework: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Web Development",
      "Software Engineering",
      "Operating Systems",
    ],
  },
];

function ExperienceCard({ exp, index }: { exp: ExperienceData; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE = 2;
  const hasMore = exp.achievements.length > MAX_VISIBLE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 border-accent/10 hover:border-accent/30 hover:bg-white/[0.02] hover:translate-y-[-4px] transition-all duration-300 relative group flex flex-col"
    >
      <div className="flex flex-col gap-5 mb-6 flex-1">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent transition-transform duration-500 group-hover:scale-110">
            <Briefcase size={20} />
          </div>
          <div className="text-[11px] font-bold px-3 py-1 rounded-full bg-accent/5 text-accent border border-accent/10 flex items-center gap-1.5 uppercase tracking-wider">
            <Calendar size={12} />
            {exp.dateRange}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
            {exp.title}
          </h4>
          <p className="text-accent font-semibold text-sm mb-2">{exp.company}</p>
          <p className="text-foreground-muted text-[13px] leading-relaxed">
            {exp.description}
          </p>
        </div>
      </div>

      <div className="pt-5 border-t border-accent/5 mt-auto">
        <ul className="space-y-3 relative mb-4">
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
                  className="flex items-start gap-3 text-[13px] text-foreground-muted overflow-hidden"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                  <span className="flex-1 leading-relaxed">{item}</span>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-[10px] font-black text-accent/60 hover:text-accent transition-all uppercase tracking-widest cursor-interactive"
          >
            {isExpanded ? (
              <>
                Collapse <ChevronUp size={12} />
              </>
            ) : (
              <>
                Read More <ChevronDown size={12} />
              </>
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  // Combine or find max length to align rows
  const rowCount = Math.max(experiences.length, education.length);

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
            My <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Experience & Education Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 items-start">

          {/* Header Row (Desktop) */}
          <div className="hidden lg:block lg:mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Briefcase size={20} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Work Experience
              </h3>
            </div>
          </div>
          <div className="hidden lg:block lg:mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Education
              </h3>
            </div>
          </div>

          {/* Mobile Headers (will only show when stacked) */}
          <div className="lg:hidden">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Briefcase size={20} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">Work Experience</h3>
             </div>
          </div>

          {/* Correct Grid Layout for Items to ensure equal row heights */}
          {Array.from({ length: rowCount }).map((_, rowIndex) => {
            const exp = experiences[rowIndex];
            const edu = education[rowIndex];

            return (
              <div key={rowIndex} className="contents">
                {/* Exp Item */}
                <div className="flex flex-col self-start">
                  {exp ? (
                    <ExperienceCard exp={exp} index={rowIndex} />
                  ) : (
                    // Optional: keep space if education continues below
                    <div className="hidden lg:block" />
                  )}
                </div>

                {/* Edu Item (Mobile header if first) */}
                {rowIndex === 0 && (
                  <div className="lg:hidden mt-12 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                        <GraduationCap size={20} />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight text-foreground">Education</h3>
                    </div>
                  </div>
                )}

                <div className="flex flex-col self-start">
                  {edu ? (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                      className="glass-card p-6 border-accent/10 hover:border-accent/30 hover:bg-white/[0.02] hover:translate-y-[-4px] transition-all duration-300 relative group flex flex-col"
                    >
                      <div className="flex flex-col gap-5 mb-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500">
                            <GraduationCap size={20} />
                          </div>
                          <div className="text-[11px] font-bold px-3 py-1 rounded-full bg-accent/5 text-accent border border-accent/10 flex items-center gap-1.5 uppercase tracking-wider">
                            <Calendar size={12} />
                            {edu.period}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors">
                            {edu.degree}
                          </h4>
                          <p className="text-foreground-muted font-medium text-sm">
                            {edu.institution}
                          </p>
                          <p className="text-foreground-muted/60 text-[13px]">
                            {edu.university}
                          </p>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-accent/5 mt-auto">
                        <div className="flex items-center gap-2 text-accent mb-3">
                          <BookOpen size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Core Coursework
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1 rounded-lg bg-background-secondary text-foreground-muted text-[11px] border border-card-border hover:border-accent/20 hover:text-foreground transition-all duration-300"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
