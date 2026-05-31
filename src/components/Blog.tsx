"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/app/actions/blog";
import { BlogPost } from "@/lib/blogUtils";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (err) {
        console.error("Failed to load blog posts", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

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
          <p className="text-foreground-muted max-w-xl mx-auto text-sm sm:text-base">
            Practical strategies, SEO diagnostics, and conversion optimization checklists to accelerate your digital channel visibility.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-purple-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 rounded-full border-2 border-accent/25 border-t-accent animate-spin" />
          </div>
        ) : blogPosts.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-card-border/60 flex items-center justify-center mx-auto mb-5 text-foreground-muted">
              <FileText size={24} />
            </div>
            <h3 className="text-base font-black tracking-tight mb-2">Coming Soon</h3>
            <p className="text-foreground-muted text-xs font-semibold leading-relaxed max-w-sm mx-auto">
              New articles on SEO, analytics, and growth strategy are being written. Stay tuned!
            </p>
          </div>
        ) : (
          <>
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="glass-card p-6 flex flex-col justify-between hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 relative group min-h-[280px]"
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
                  <div className="pt-4 border-t border-accent/5 mt-auto">
                    <Link
                      href={post.link}
                      className="flex justify-between items-center group/btn cursor-pointer"
                    >
                      <span className="text-[11px] font-bold text-foreground-muted group-hover:text-foreground transition-colors">
                        Read Article
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-accent flex items-center justify-center text-foreground-muted group-hover:text-white transition-all duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={14} />
                      </div>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] dark:bg-white/[0.02] border border-card-border/80 hover:border-accent/50 hover:text-accent rounded-full text-xs font-bold transition-all shadow-md group cursor-pointer outline-none"
          >
            Explore All Insights
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
