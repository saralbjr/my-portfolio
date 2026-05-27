"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, CheckCircle } from "lucide-react";

export default function Education() {
  const learnings = [
    "Practical communication, teamwork, and structured problem-solving through academic projects.",
    "Fundamental understanding of digital tools, web platforms, and online communication workflows.",
    "Data structure analysis, database systems, and baseline software interface principles.",
  ];

  return (
    <section id="education" className="relative">
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
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Academic pathways that shaped my analytical thinking, digital fundamentals, and communications.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Education Card Layout */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 md:p-8 hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 relative group"
          >
            {/* Top Row: Icon + Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                    Bachelor of Computer Application (BCA)
                  </h3>
                  <p className="text-sm text-foreground-muted font-medium">
                    Bhaktapur Multiple Campus
                  </p>
                </div>
              </div>
              
              {/* Date Badge */}
              <div className="flex flex-col sm:items-end gap-1 text-xs text-foreground-muted">
                <div className="flex items-center gap-1.5 font-bold">
                  <Calendar size={14} className="text-accent" />
                  <span>2021 – 2025</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] sm:justify-end">
                  <MapPin size={12} className="text-accent/60" />
                  <span>Bhaktapur, Nepal</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-foreground-muted leading-relaxed mb-6 border-b border-card-border pb-5">
              Gained a structured academic foundation in computing theory, relational databases, web methodologies, and collaborative projects, building a high-tech approach to digital marketing and web assets strategy.
            </p>

            {/* Core Learnings */}
            <div>
              <h4 className="text-xs font-black uppercase text-accent tracking-widest block mb-4">
                Key Curricular Takeaways
              </h4>
              <ul className="space-y-3">
                {learnings.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm text-foreground-muted"
                  >
                    <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
