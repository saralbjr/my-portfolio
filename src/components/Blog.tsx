"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "GA4 Analytics: Critical Custom Tracking Metrics",
    excerpt: "Why standard setups fail to capture key lead capture submissions and how to properly configure custom tag triggers for attribution reporting.",
    date: "May 15, 2026",
    readTime: "5 min read",
    category: "Web Analytics",
    link: "https://example.com/blog/ga4-custom-events",
  },
  {
    title: "On-Page SEO Checklist: Dominating Search Rankings",
    excerpt: "A systematic review checklist covering semantic keyword placements, schema injection, heading structures, and media performance scores.",
    date: "April 28, 2026",
    readTime: "7 min read",
    category: "Search Strategy",
    link: "https://example.com/blog/onpage-seo-checklist",
  },
  {
    title: "Google Local 3-Pack: Dominate Geo-Targeted Search",
    excerpt: "How to clean directory inconsistencies, build localized FAQ pages, and automate review campaigns to secure prime placement in Google Maps.",
    date: "March 12, 2026",
    readTime: "6 min read",
    category: "Local SEO",
    link: "https://example.com/blog/local-maps-ranking",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="relative">
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
            Growth <span className="gradient-text">Insights</span> & Blog
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            Practical strategies, SEO diagnostics, and conversion optimization checklists to accelerate your digital channel visibility.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="glass-card p-6 flex flex-col justify-between hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 relative group"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 text-[9px] font-black uppercase text-accent bg-accent/15 border border-accent/20 rounded-md">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-foreground-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-3 leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-foreground-muted text-[12px] leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* View Article Link */}
              <div className="pt-4 border-t border-accent/5 mt-auto flex justify-between items-center">
                <span className="text-[11px] font-bold text-foreground-muted group-hover:text-foreground transition-colors">
                  Read Article
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-accent flex items-center justify-center text-foreground-muted group-hover:text-white transition-all duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
