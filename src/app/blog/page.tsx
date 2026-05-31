"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import blogPosts from "@/data/blogPosts.json";

export default function BlogListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];

  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-[var(--max-width)] mx-auto relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-black"
          >
            Growth <span className="gradient-text">Insights</span> & Articles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground-muted max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
          >
            Advanced guides, diagnostics, and step-by-step checklists covering Technical SEO, Web Analytics architectures, and Local search marketing.
          </motion.p>
        </div>

        {/* Search & Filter Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 glass-card p-4 rounded-2xl border border-card-border/50 bg-card-bg/40 backdrop-blur-md"
        >
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted/60" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 dark:bg-white/[0.02] border border-card-border/60 hover:border-accent/40 focus:border-accent rounded-xl py-2 pl-10 pr-4 text-sm font-semibold outline-none transition-all placeholder:text-foreground-muted/50"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all relative cursor-pointer outline-none ${
                    isSelected
                      ? "text-white bg-accent/90"
                      : "text-foreground-muted hover:text-foreground hover:bg-white/5 border border-card-border/30"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-card p-6 flex flex-col justify-between hover:border-accent/30 hover:bg-white/[0.01] transition-all duration-300 relative group min-h-[300px]"
              >
                <div>
                  {/* Meta details */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase text-accent bg-accent/15 border border-accent/20 rounded-md">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-foreground-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-black mb-3 leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-foreground-muted text-[13px] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* View Article Link */}
                <div className="pt-4 border-t border-card-border/50 mt-auto">
                  <Link
                    href={post.link}
                    className="flex justify-between items-center group/btn cursor-pointer"
                  >
                    <span className="text-[12px] font-bold text-foreground-muted group-hover:text-foreground transition-colors">
                      Read Article
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-accent flex items-center justify-center text-foreground-muted group-hover:text-white transition-all duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={15} />
                    </div>
                  </Link>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-foreground-muted text-sm mb-4">No articles found matching your query.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 bg-accent/20 border border-accent/30 hover:bg-accent/30 rounded-xl text-xs font-bold text-accent transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
