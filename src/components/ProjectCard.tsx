"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Target, CheckCircle2 } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      className="glass-card p-6 flex flex-col justify-between hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 group"
    >
      <div>
        {/* Niche Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-wider">
            {project.niche}
          </span>
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent/60 group-hover:scale-110 transition-transform">
            <Target size={16} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-foreground-muted text-[13px] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Learnings / Topics Tag List */}
        <div className="mb-5 border-t border-accent/5 pt-4">
          <span className="text-[10px] font-black uppercase text-accent/80 tracking-widest block mb-2">
            Focus Areas
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="px-2 py-0.5 text-xs font-semibold rounded-md bg-white/5 text-foreground-muted border border-card-border"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>

        {/* Practical Strategies Applied */}
        <div>
          <span className="text-[10px] font-black uppercase text-accent/80 tracking-widest block mb-2">
            Practice Operations
          </span>
          <ul className="space-y-1.5">
            {project.strategies.map((strategy) => (
              <li key={strategy} className="flex items-center gap-2 text-xs text-foreground-muted">
                <CheckCircle2 size={13} className="text-accent/60 flex-shrink-0" />
                <span>{strategy}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Optional Link Block */}
      {project.liveUrl && (
        <div className="pt-6 border-t border-accent/5 mt-6">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg bg-accent hover:bg-accent-hover text-white shadow-md shadow-accent/15 transition-all duration-200"
          >
            <ExternalLink size={13} />
            Visit Live Site
          </a>
        </div>
      )}
    </motion.article>
  );
}
