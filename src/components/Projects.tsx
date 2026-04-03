"use client";

import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="relative">
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
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            A selection of projects I&apos;ve built to solve real problems and sharpen my skills.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* View More on GitHub Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center p-12 glass-card border-dashed border-card-border hover:border-accent/40 rounded-[2rem] bg-gradient-to-b from-white/[0.01] to-transparent transition-all duration-500"
        >
          <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center text-accent/60 mb-6 group-hover:scale-110 transition-transform">
             <Github size={32} />
          </div>
          <h4 className="text-xl font-bold mb-3">Looking for more?</h4>
          <p className="text-foreground-muted text-center mb-8 max-w-md">
            I&apos;m constantly building and experimenting. Explore my full collection of projects, open-source contributions, and late-night experiments on GitHub.
          </p>
          <a
            href="https://github.com/saralbjr"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-accent text-foreground hover:text-white border border-card-border hover:border-accent rounded-full font-bold transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]"
          >
            <Github size={20} className="group-hover:rotate-12 transition-transform" />
            <span>Explore All Repositories</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
