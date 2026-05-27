"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Zap, Compass, MapPin } from "lucide-react";

interface PillarItem {
  icon: React.ReactNode;
  title: string;
  focus: string[];
  tools: string;
  metric: string;
  metricLabel: string;
  glowColor: string;
}

const pillars: PillarItem[] = [
  {
    icon: <Award className="text-blue-400" size={26} />,
    title: "On-Page SEO",
    focus: [
      "Topical Content Optimization",
      "Dynamic Meta Descriptions",
      "Heading Structure Optimization",
      "Image Compression & Alt Tags",
    ],
    tools: "SurferSEO, Clearscope, Yoast",
    metric: "95%",
    metricLabel: "Average Content Optimization Score",
    glowColor: "group-hover:shadow-blue-500/20",
  },
  {
    icon: <Zap className="text-amber-400" size={26} />,
    title: "Technical SEO",
    focus: [
      "Core Web Vitals & Speed Opt",
      "XML Sitemap Restructuring",
      "Canonicalization & Crawl Fixes",
      "JSON-LD Schema Markup Injection",
    ],
    tools: "Screaming Frog, Google Search Console",
    metric: "100/100",
    metricLabel: "Target Mobile Performance Score",
    glowColor: "group-hover:shadow-amber-500/20",
  },
  {
    icon: <Compass className="text-purple-400" size={26} />,
    title: "Off-Page SEO",
    focus: [
      "Top-tier Link Acquisition",
      "Competitor Backlink Analysis",
      "Digital PR Distribution",
      "Natural Resource Link Building",
    ],
    tools: "Ahrefs Link Explorer, SEMrush",
    metric: "+65%",
    metricLabel: "Referencing Domains Growth Rate",
    glowColor: "group-hover:shadow-purple-500/20",
  },
  {
    icon: <MapPin className="text-rose-400" size={26} />,
    title: "Local SEO",
    focus: [
      "Google Business Profile Sync",
      "NAP Citation Auditing",
      "Geo-targeted Landing Pages",
      "Review Automation Funnels",
    ],
    tools: "Whitespark, BrightLocal",
    metric: "1st Page",
    metricLabel: "Google Local Maps pack positioning",
    glowColor: "group-hover:shadow-rose-500/20",
  },
];

export default function SEOExpertise() {
  return (
    <section id="seo-expertise" className="relative">
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
            SEO <span className="gradient-text">Expertise</span> Pillars
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Deep vertical knowledge across critical search channels to formulate comprehensive organic growth.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Pillars Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-card p-6 md:p-8 hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 relative group flex flex-col justify-between ${pillar.glowColor} hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]`}
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-card-border group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold">{pillar.title}</h3>
                </div>

                <ul className="space-y-3 mb-6">
                  {pillar.focus.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground-muted">
                      <CheckCircle2 size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-card-border mt-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase text-accent tracking-widest block mb-1">
                      Preferred Tools
                    </span>
                    <span className="text-xs text-foreground-muted/70">{pillar.tools}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-2xl font-black gradient-text block leading-none mb-1">
                      {pillar.metric}
                    </span>
                    <span className="text-[10px] font-medium text-foreground-muted block">
                      {pillar.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
