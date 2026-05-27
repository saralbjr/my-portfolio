"use client";

import { motion } from "framer-motion";
import { TrendingUp, Share2, Feather, Cpu, MessageSquare, Award } from "lucide-react";
import { skillCategories } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  "Digital Marketing": <TrendingUp size={20} />,
  "Social Media": <Share2 size={20} />,
  "Content Creation": <Feather size={20} />,
  "Technical Skills": <Cpu size={20} />,
  "Communication": <MessageSquare size={20} />,
  "Soft Skills": <Award size={20} />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

export default function Skills() {
  return (
    <section id="skills" className="relative bg-background-secondary/20">
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
            Professional <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            A comprehensive mapping of my verified qualifications, creative abilities, and digital capabilities.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.category}
              variants={cardVariants}
              className="glass-card p-6 hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category.category] || <Award size={20} />}
                  </div>
                  <h3 className="text-base font-bold group-hover:text-accent transition-colors">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/5 text-foreground-muted border border-card-border hover:border-accent/30 hover:text-foreground transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
