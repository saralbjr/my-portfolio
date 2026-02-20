"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { experiences } from "@/data/experience";

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
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
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
                  <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-foreground-muted"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
