"use client";

import { motion } from "framer-motion";
import { Search, Compass, Target, LineChart } from "lucide-react";

interface StepItem {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  activities: string[];
}

const processSteps: StepItem[] = [
  {
    number: "01",
    icon: <Search size={22} />,
    title: "Audit & Analysis",
    description: "Conducting a comprehensive audit of site structure, crawl errors, competitor keyword footprints, and backlinks profile.",
    activities: ["Screaming Frog Site Crawl", "Competitor Keyword Gap Review", "Backlink Risk Assessment"],
  },
  {
    number: "02",
    icon: <Compass size={22} />,
    title: "Strategy & Planning",
    description: "Developing a highly tailored roadmap targeting transactional keyword queries, topical content clusters, and CRO funnel touchpoints.",
    activities: ["Keyword Cluster Mapping", "Content Expansion Blueprint", "CRO Funnel Mapping"],
  },
  {
    number: "03",
    icon: <Target size={22} />,
    title: "Execution & Optimization",
    description: "Deploying high-impact on-page corrections, JSON-LD rich schemas, local directories NAP sync, and fast page caching optimizations.",
    activities: ["On-Page & Schema Integration", "Local Citation Building", "Core Web Vitals Optimization"],
  },
  {
    number: "04",
    icon: <LineChart size={22} />,
    title: "Monitoring & Reporting",
    description: "Analyzing search queries impressions, conversions, event flow, and providing detailed bi-weekly KPI growth dashboard insights.",
    activities: ["GA4 Conversion Attribution", "GSC Impressions Tracking", "Monthly Performance Review"],
  },
];

export default function Process() {
  return (
    <section id="process" className="relative bg-background-secondary/20">
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
            Strategic <span className="gradient-text">Workflow</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            A repeatable, data-backed methodology to uncover indexing blockades, capture market share, and ensure steady traffic growth.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Timeline Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent/20 via-purple-500/20 to-accent/20 z-0 pointer-events-none" />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Timeline Node Icon */}
              <div className="w-16 h-16 rounded-2xl bg-background border border-card-border flex items-center justify-center text-accent shadow-lg mb-6 group-hover:border-accent/40 group-hover:scale-105 transition-all duration-300 relative">
                {step.icon}
                {/* Node Step Number Label */}
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-accent hover:bg-accent-hover text-white font-black text-[10px] flex items-center justify-center shadow-md">
                  {step.number}
                </div>
              </div>

              {/* Title & Body */}
              <h3 className="text-base font-bold mb-3 group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-foreground-muted text-[12px] leading-relaxed mb-5 max-w-xs px-2">
                {step.description}
              </p>

              {/* Bullet Activities */}
              <div className="w-full pt-4 border-t border-accent/5 flex flex-col items-center gap-1.5">
                {step.activities.map((act) => (
                  <span
                    key={act}
                    className="text-[10px] font-semibold text-foreground-muted/70 bg-white/5 border border-card-border px-2 py-0.5 rounded-full"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
