"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  glowColor: string;
}

const certList: CertificationItem[] = [
  {
    title: "Fundamentals of Digital Marketing",
    issuer: "Google",
    year: "2026",
    glowColor: "group-hover:shadow-blue-500/10",
  },
  {
    title: "SEO Certification",
    issuer: "HubSpot Academy",
    year: "2026",
    glowColor: "group-hover:shadow-orange-500/10",
  },
  {
    title: "AI Visibility Essentials",
    issuer: "Semrush",
    year: "2026",
    glowColor: "group-hover:shadow-orange-600/10",
  },
  {
    title: "Get Started Using Google Analytics",
    issuer: "Google",
    year: "2026",
    glowColor: "group-hover:shadow-green-500/10",
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    year: "2026",
    glowColor: "group-hover:shadow-purple-500/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

export default function Certifications() {
  return (
    <section id="certifications" className="relative">
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
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Verified credentials and coursework completed to master online marketing, analytics tools, and AI integrations.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {certList.map((cert) => (
            <motion.div
              key={cert.title}
              variants={cardVariants}
              className={`glass-card p-6 hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 relative group flex flex-col justify-between ${cert.glowColor} hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]`}
            >
              <div>
                {/* Certification Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                    <Award size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-accent font-bold uppercase tracking-wider bg-accent/5 px-2.5 py-1 rounded-md border border-accent/10">
                    <ShieldCheck size={11} />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Certification Title */}
                <h3 className="text-base font-bold mb-2 group-hover:text-accent transition-colors leading-snug">
                  {cert.title}
                </h3>
                
                {/* Issuer */}
                <p className="text-sm text-foreground-muted font-medium mb-4">
                  {cert.issuer}
                </p>
              </div>

              {/* Footer Year */}
              <div className="pt-4 border-t border-accent/5 mt-auto flex items-center justify-between text-xs text-foreground-muted">
                <span className="flex items-center gap-1 text-[11px]">
                  <CheckCircle2 size={13} className="text-accent/60" />
                  Authorized Program
                </span>
                <span className="font-semibold">{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
