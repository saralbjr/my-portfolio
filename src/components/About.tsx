"use client";

import { motion } from "framer-motion";
import { User, Code, Database, Wrench, Download } from "lucide-react";
import { skillCategories } from "@/data/skills";

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code size={20} />,
  Backend: <Wrench size={20} />,
  Database: <Database size={20} />,
  "DevOps & Tools": <Wrench size={20} />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left: Profile Image + Bio */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Avatar placeholder */}
            <div className="w-40 h-40 mx-auto lg:mx-0 mb-8 rounded-full bg-gradient-to-br from-accent/30 to-purple-500/30 flex items-center justify-center border-2 border-accent/20">
              <User size={64} className="text-accent/60" />
            </div>

            <p className="text-foreground-muted leading-relaxed mb-6">
              I&apos;m a passionate full-stack developer based in Nepal. I specialize in building
              modern web applications using the MERN stack and Next.js. I love clean architecture,
              writing efficient code, and creating seamless user experiences that solve real
              problems.
            </p>
            <p className="text-foreground-muted leading-relaxed">
              When I&apos;m not coding, I&apos;m exploring new technologies, contributing to
              open-source projects, and constantly leveling up my development skills.
            </p>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:scale-[1.03] text-sm"
            >
              <Download size={16} />
              Download CV
            </a>
          </motion.div>

          {/* Right: Skills Grid */}
          <motion.div
            className="flex-1 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillCategories.map((cat) => (
                <motion.div
                  key={cat.category}
                  variants={itemVariants}
                  className="glass-card p-5 hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-accent group-hover:scale-110 transition-transform">
                      {categoryIcons[cat.category] || <Code size={20} />}
                    </span>
                    <h3 className="text-base font-semibold">{cat.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/10 hover:border-accent/30 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
