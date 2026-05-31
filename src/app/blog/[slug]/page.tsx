"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Check, Copy } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/app/actions/blog";
import { BlogPost } from "@/lib/blogUtils";

export default function BlogPostDetailsPage() {
  const { slug } = useParams();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Safely find the post when slug hydrates on the client side
  useEffect(() => {
    async function loadPost() {
      if (slug) {
        try {
          const allPosts = await getBlogPosts();
          const foundPost = allPosts.find((item) => item.slug === slug);
          setPost(foundPost || null);
        } catch (err) {
          console.error("Failed to load blog post", err);
        } finally {
          setIsLoaded(true);
        }
      }
    }
    loadPost();
  }, [slug]);

  // Calculate reading progress scrollbar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <div className="w-12 h-12 rounded-full border-2 border-accent/25 border-t-accent animate-spin mb-4" />
        <p className="text-foreground-muted text-sm font-semibold">Loading article details...</p>
      </div>
    );
  }

  if (isLoaded && !post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="mb-4">Article Not Found</h1>
        <p className="text-foreground-muted mb-8 max-w-md">
          The blog post you are looking for does not exist or may have been relocated.
        </p>
        <Link
          href="/blog"
          className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-full font-bold transition-all shadow-md shadow-accent/15 cursor-pointer"
        >
          Return to Articles
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative overflow-hidden">
      {/* Scroll Reading Progress Bar at the absolute top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/[0.04] z-50">
        <div
          className="h-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Decorative Nebula Background Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[90px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 translate-x-1/2 w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[90px] -z-10 pointer-events-none" />

      <div className="max-w-[var(--max-width)] mx-auto relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>
        </motion.div>

        {/* Article Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article Content Column */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 flex flex-col"
          >
            {/* Category Pill */}
            <div className="mb-4">
              <span className="px-3 py-1 text-xs font-black uppercase text-accent bg-accent/15 border border-accent/25 rounded-md">
                {post!.category}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 leading-tight">
              {post!.title}
            </h1>

            {/* Content block renderer */}
            <div className="prose prose-invert max-w-none text-foreground-muted">
              {post!.content.map((block: any, index: number) => {
                if (block.type === "p") {
                  return (
                    <p key={index} className="text-sm sm:text-base leading-relaxed mb-6 text-foreground-muted/90 font-medium">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "h2") {
                  return (
                    <h2
                      key={index}
                      className="text-lg sm:text-xl font-extrabold mb-4 mt-8 text-foreground border-b border-card-border/60 pb-2 gradient-text"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "h3") {
                  return (
                    <h3 key={index} className="text-base sm:text-lg font-bold mb-3 mt-6 text-foreground">
                      {block.text}
                    </h3>
                  );
                }

                if (block.type === "ul" && "items" in block) {
                  return (
                    <ul key={index} className="space-y-3 mb-6 pl-1">
                      {block.items.map((item: string, itemIdx: number) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground-muted/90 font-semibold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0 animate-pulse-glow" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "code" && "code" in block) {
                  return (
                    <div
                      key={index}
                      className="glass-card rounded-2xl overflow-hidden border border-card-border/60 bg-black/45 dark:bg-black/30 my-8 shadow-inner"
                    >
                      <div className="bg-black/35 px-4 py-2.5 border-b border-card-border/60 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-foreground-muted">
                          {block.language}
                        </span>
                        <button
                          onClick={() => handleCopyCode(block.code, index)}
                          className="text-[11px] font-bold text-accent hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 outline-none"
                        >
                          {copiedCodeIndex === index ? (
                            <>
                              <Check size={12} /> Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Copy Code
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-400/90 leading-relaxed bg-black/10">
                        <code>{block.code}</code>
                      </pre>
                    </div>
                  );
                }

                if (block.type === "quote" && "text" in block) {
                  return (
                    <div
                      key={index}
                      className="border-l-4 border-accent bg-accent/5 py-5 px-6 rounded-r-2xl my-8 font-medium italic relative overflow-hidden border border-card-border/30"
                    >
                      <div className="absolute -top-3 right-2 text-accent/5 font-serif text-8xl pointer-events-none select-none leading-none">
                        &ldquo;
                      </div>
                      <p className="text-foreground text-xs sm:text-sm leading-relaxed mb-2 relative z-10">
                        &ldquo;{block.text}&rdquo;
                      </p>
                      {"author" in block && block.author && (
                        <span className="text-[11px] font-extrabold text-foreground-muted">
                          — {block.author}
                        </span>
                      )}
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </motion.article>

          {/* Sticky Sidebar Metadata Column */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-24 space-y-6">
              {/* Info Card */}
              <div className="glass-card p-6 rounded-2xl border border-card-border/70 shadow-lg shadow-black/10 bg-card-bg/25">
                <h3 className="text-xs uppercase font-extrabold tracking-widest mb-4 text-foreground-muted">
                  Article Info
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                    <Calendar size={16} className="text-accent" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-foreground-muted leading-tight font-bold">PUBLISHED</span>
                      <span className="text-foreground/90">{post!.date}</span>
                    </div>
                  </li>

                  <li className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                    <Clock size={16} className="text-accent" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-foreground-muted leading-tight font-bold">READ TIME</span>
                      <span className="text-foreground/90">{post!.readTime}</span>
                    </div>
                  </li>
                </ul>

                <hr className="my-5 border-card-border/50" />

                {/* Share CTA Button */}
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-accent/15 border border-accent/25 text-accent hover:text-white hover:bg-accent rounded-xl text-xs font-bold transition-all cursor-pointer outline-none active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check size={14} /> Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 size={14} /> Share Article
                    </>
                  )}
                </button>
              </div>

              {/* Author Prompt Box */}
              <div className="glass-card p-6 rounded-2xl border border-card-border/60 bg-gradient-to-br from-accent/5 to-purple-500/5 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                <h4 className="font-bold text-sm mb-2 text-foreground">Need SEO Optimization?</h4>
                <p className="text-foreground-muted text-[12px] leading-relaxed mb-4">
                  Let&apos;s audit your data tracking architecture and scale organic channel search traffic.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block py-2 px-4 bg-white/[0.04] dark:bg-white/[0.02] border border-card-border/70 hover:border-accent hover:text-accent rounded-xl text-[11px] font-bold text-foreground transition-all cursor-pointer outline-none"
                >
                  Let&apos;s Connect
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
