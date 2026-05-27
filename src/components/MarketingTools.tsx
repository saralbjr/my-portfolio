"use client";

import { motion } from "framer-motion";
import { AreaChart, Search, Terminal, BarChart2, Mail, Layers } from "lucide-react";

interface ToolItem {
  icon: React.ReactNode;
  name: string;
  category: string;
  description: string;
  usage: string;
  proficiency: number;
}

const toolset: ToolItem[] = [
  {
    icon: <Search className="text-blue-400" size={24} />,
    name: "SEMrush Suite",
    category: "Market Research",
    description: "Competitor research, paid-search intelligence, and domain authority analysis.",
    usage: "Competitor gap analysis & tracking organic visibility trends.",
    proficiency: 90,
  },
  {
    icon: <Layers className="text-orange-400" size={24} />,
    name: "Ahrefs Webmaster",
    category: "Backlink Analysis",
    description: "Backlink auditing, link profiling, anchor text analysis, and global rank tracking.",
    usage: "Link profile building & target content indexing visibility.",
    proficiency: 85,
  },
  {
    icon: <AreaChart className="text-yellow-500" size={24} />,
    name: "Google Analytics 4",
    category: "Analytics & Tracking",
    description: "Multi-channel funnel attribution, traffic flow monitoring, and custom goal setup.",
    usage: "User journey mapping & tracking macro-conversions.",
    proficiency: 95,
  },
  {
    icon: <BarChart2 className="text-green-400" size={24} />,
    name: "Google Search Console",
    category: "Search Metrics",
    description: "Organic queries tracking, indexing health checks, core web vitals, and crawl stats.",
    usage: "Sitemap submission, crawl audit review, and organic CTR tracking.",
    proficiency: 95,
  },
  {
    icon: <Terminal className="text-emerald-500" size={24} />,
    name: "Screaming Frog",
    category: "Crawl Diagnostic",
    description: "Desktop website crawler that analyzes redirection errors, meta tags, and alt tag coverage.",
    usage: "Technical crawl audits & redirects mapping.",
    proficiency: 88,
  },
  {
    icon: <Mail className="text-sky-400" size={24} />,
    name: "Mailchimp",
    category: "Email Marketing",
    description: "Newsletter templates, list segmentations, automated welcome flows, and analytics.",
    usage: "Automating customer retention & warm nurture funnels.",
    proficiency: 85,
  },
];

export default function MarketingTools() {
  return (
    <section id="marketing-tools" className="relative bg-background-secondary/20">
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
            Marketing <span className="gradient-text">Tools</span> Set
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Deep experience with enterprise tools to audit websites, map search visibility, and monitor core traffic indicators.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolset.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card p-6 flex flex-col justify-between hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase text-accent tracking-widest">
                    {tool.category}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                  {tool.name}
                </h3>
                <p className="text-foreground-muted text-[13px] leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-card-border mt-auto">
                <p className="text-[11px] text-foreground-muted/80 leading-relaxed mb-3">
                  <span className="font-bold text-foreground">Core Action:</span> {tool.usage}
                </p>

                {/* Styled Progress Bar */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold mb-1.5 uppercase text-foreground-muted">
                    <span>Expertise level</span>
                    <span className="text-accent">{tool.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
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
