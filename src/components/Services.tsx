"use client";

import { motion } from "framer-motion";
import {
  Search,
  Key,
  Activity,
  FileText,
  Megaphone,
  MapPin,
  BarChart3,
  Mail,
} from "lucide-react";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
}

const servicesList: ServiceItem[] = [
  {
    icon: <Search size={24} />,
    title: "SEO Optimization",
    description: "Grow long-term search engine presence and drive organic, high-intent buyer traffic to your landing pages.",
    metric: "+120% Average Traffic Lift",
  },
  {
    icon: <Key size={24} />,
    title: "Keyword Research",
    description: "Map competitor search terms and uncover high-volume, low-difficulty queries to dominate search intent.",
    metric: "100+ Commercial Targets Identified",
  },
  {
    icon: <Activity size={24} />,
    title: "Technical SEO Audits",
    description: "Eliminate page bloat, fix search indexation barriers, optimize crawl budget, and accelerate site loading speeds.",
    metric: "Perfect 100/100 Lighthouse Speed Score",
  },
  {
    icon: <FileText size={24} />,
    title: "Content Strategy",
    description: "Formulate top-of-funnel content hubs and guides that establish topical authority and earn natural backlinks.",
    metric: "+85% Domain Authority Boost",
  },
  {
    icon: <Megaphone size={24} />,
    title: "Social Media Marketing",
    description: "Build robust, engaging brand voices and community channels across LinkedIn, Twitter, and other digital networks.",
    metric: "+65% Social Audience Engagement",
  },
  {
    icon: <MapPin size={24} />,
    title: "Local SEO & GBP",
    description: "Dominate Google Maps and local 3-Pack rankings. Clean citations and maximize geo-targeted search visibility.",
    metric: "+95% Local Map Leads & Directions",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Performance Analytics",
    description: "Construct Google Analytics 4 (GA4) reporting dashboards and Tag Manager events to track conversions.",
    metric: "100% Attribution Accuracy",
  },
  {
    icon: <Mail size={24} />,
    title: "Email Campaigns",
    description: "Draft high-converting copy for targeted lists, abandoned cart funnels, and automated nurture sequences.",
    metric: "28% Average Open Rate",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-background-secondary/20">
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
            Growth-Focused <span className="gradient-text">Services</span>
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Comprehensive SEO and digital strategy funnels designed to expand your audience, build authority, and boost organic conversions.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card p-6 flex flex-col justify-between hover:border-accent/30 hover:bg-white/[0.02] transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-115 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-foreground-muted text-[13px] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-accent/5 mt-auto">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest block mb-1">
                  Expected Impact
                </span>
                <span className="text-[13px] font-bold text-foreground group-hover:text-accent-hover transition-colors">
                  {service.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
